#!/usr/bin/env python3
import json
import os
import re
import xml.etree.ElementTree as ET
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://swapio.cc'


def parse_slug_blocks(content):
    blocks = {}
    for match in re.finditer(r"'([^']+)':\s*\{", content):
        slug = match.group(1)
        block_start = match.end() - 1
        depth = 0
        block_end = block_start
        for i, ch in enumerate(content[block_start:], block_start):
            if ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    block_end = i + 1
                    break
        blocks[slug] = content[block_start:block_end]
    return blocks


def field_string(block, name):
    m = re.search(rf"{name}:\s*'((?:\\'|[^'])*)'", block)
    return m.group(1).replace("\\'", "'") if m else ''


def field_array(block, name):
    m = re.search(rf"{name}:\s*\[([^\]]*)\]", block)
    if not m:
        return []
    return re.findall(r"'([^']+)'", m.group(1))


def load_articles():
    path = os.path.join(ROOT, 'js', 'articles-data.js')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    articles = {}
    for slug, block in parse_slug_blocks(content).items():
        content_match = re.search(r'content:\s*`([\s\S]*?)`\s*,?\s*\}', block)
        articles[slug] = {
            'title': field_string(block, 'title'),
            'category': field_string(block, 'category'),
            'readTime': field_string(block, 'readTime'),
            'gradient': field_string(block, 'gradient'),
            'content': content_match.group(1) if content_match else '',
        }
    return articles


def load_seo_meta():
    path = os.path.join(ROOT, 'js', 'articles-seo-meta.js')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    seo = {}
    for slug, block in parse_slug_blocks(content).items():
        seo[slug] = {
            'metaTitle': field_string(block, 'metaTitle'),
            'metaDescription': field_string(block, 'metaDescription'),
            'relatedSlugs': field_array(block, 'relatedSlugs'),
        }
    return seo


ARTICLES = load_articles()
ARTICLE_SEO = load_seo_meta()


def merge_article(slug):
    return {**ARTICLES[slug], **ARTICLE_SEO.get(slug, {})}


def get_excerpt(article):
    if article.get('metaDescription'):
        return article['metaDescription']
    match = re.search(r'<p>(.*?)</p>', article['content'], re.S)
    if not match:
        return article['title']
    text = re.sub(r'<[^>]+>', '', match.group(1)).strip()
    return text[:160]


def normalize_content(html):
    return (
        html.replace('href="index.html#swap"', 'href="/sell-gift-card/"')
        .replace('href="index.html"', 'href="/"')
        .replace('href="contact.html"', 'href="/contact.html"')
        .strip()
    )


def build_related_section(slug, article):
    related = [s for s in article.get('relatedSlugs', []) if s != slug and s in ARTICLES][:3]
    if not related:
        return ''

    links = '\n            '.join(
        f'<li><a href="/articles/{s}/" class="text-swapio-dark hover:text-swapio-light transition-colors font-medium">{ARTICLES[s]["title"]}</a></li>'
        for s in related
    )

    return f'''
    <section class="py-10 md:py-14 border-t border-gray-100">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-xl font-bold text-swapio-dark mb-4">Related Articles</h2>
        <ul class="space-y-2 text-gray-600">
            {links}
        </ul>
      </div>
    </section>'''


def esc(text):
    return text.replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;')


def build_article_page(slug, article):
    canonical = f'{SITE}/articles/{slug}/'
    title = article.get('metaTitle') or f"{article['title']} | Swapio"
    description = get_excerpt(article)
    content = normalize_content(article['content'])
    related = build_related_section(slug, article)

    article_schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': article['title'],
        'description': description,
        'author': {'@type': 'Organization', 'name': 'Swapio'},
        'publisher': {
            '@type': 'Organization',
            'name': 'Swapio',
            'logo': {'@type': 'ImageObject', 'url': f'{SITE}/assets/logo.png'},
        },
        'mainEntityOfPage': {'@type': 'WebPage', '@id': canonical},
        'url': canonical,
    }

    org_schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Swapio',
        'url': SITE,
        'email': 'support@swapio.cc',
        'logo': f'{SITE}/assets/logo.png',
        'description': 'Turn unused gift cards into cash. Get 95% of your card value via PayPal, Cash App, Zelle, Venmo, Bitcoin, or bank transfer.',
    }

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{esc(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{canonical}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{SITE}/assets/logo.png">
  <meta property="og:site_name" content="Swapio">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="{esc(title)}">
  <meta name="twitter:description" content="{esc(description)}">
  <meta name="twitter:image" content="{SITE}/assets/logo.png">
  <link rel="icon" href="/assets/logo.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/logo.png">
  <title>{esc(title)}</title>
  <script type="application/ld+json">{json.dumps(article_schema)}</script>
  <script id="swapio-org-schema" type="application/ld+json">{json.dumps(org_schema)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          colors: {{
            'swapio-dark': '#2D467B',
            'swapio-light': '#78A5D3',
            'swapio-bg': '#F8FAFC',
          }},
        }},
      }},
    }};
  </script>
  <link rel="stylesheet" href="/css/custom.css">
</head>
<body class="text-gray-800" data-page="articles">

  <div id="site-header"></div>

  <article class="page-enter">
    <section class="page-hero article-hero">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <a href="/articles/" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-swapio-dark transition-colors mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          Back to Articles
        </a>
        <p class="text-xs font-medium text-swapio-light uppercase tracking-wider mb-2">{article['category']}</p>
        <h1 class="text-3xl md:text-4xl font-bold text-swapio-dark tracking-tight leading-tight">{article['title']}</h1>
        <p class="text-gray-400 text-sm mt-3">{article['readTime']}</p>
      </div>
    </section>

    <section class="py-10 md:py-14">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-swapio article-body">
        {content}
        <p class="mt-8"><a href="/sell-gift-card/" class="text-swapio-dark font-medium hover:text-swapio-light transition-colors">Sell your gift card for cash on Swapio →</a></p>
      </div>
    </section>
    {related}
    <section class="bg-swapio-bg">
      <div class="max-w-3xl mx-auto px-4 py-12 contained-divider-top text-center">
        <h2 class="text-xl font-bold text-swapio-dark mb-3">Ready to swap your gift card?</h2>
        <p class="text-gray-500 mb-4">Get 95% of your card value — paid via PayPal, Cash App, Zelle, Venmo, Bitcoin, or bank transfer.</p>
        <a href="/sell-gift-card/" class="btn-primary">Start Your Swap →</a>
      </div>
    </section>
  </article>

  <div id="site-footer"></div>

  <script src="/js/auth.js"></script>
  <script src="/js/shared.js"></script>
  <script src="/js/article-page.js"></script>
</body>
</html>
'''


def build_sitemap():
    today = date.today().isoformat()
    static_pages = [
        (f'{SITE}/', 'weekly', '1.0'),
        (f'{SITE}/sell-gift-card/', 'monthly', '0.9'),
        (f'{SITE}/guide', 'monthly', '0.8'),
        (f'{SITE}/faq', 'monthly', '0.8'),
        (f'{SITE}/articles/', 'weekly', '0.8'),
        (f'{SITE}/feedback', 'monthly', '0.7'),
        (f'{SITE}/contact', 'monthly', '0.7'),
        (f'{SITE}/terms', 'yearly', '0.4'),
        (f'{SITE}/privacy', 'yearly', '0.4'),
    ]

    urls = static_pages + [
        (f'{SITE}/articles/{slug}/', 'monthly', '0.7') for slug in sorted(ARTICLES)
    ]

    body = '\n'.join(
        f'''  <url>
    <loc>{loc}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>'''
        for loc, freq, priority in urls
    )

    return f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{body}
</urlset>
'''


def build_sitemap_function():
    xml = build_sitemap().replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    return f'''// Auto-generated by scripts/generate-articles.py — do not edit manually

const SITEMAP_XML = `{xml}`;

export async function onRequest() {{
  return new Response(SITEMAP_XML, {{
    status: 200,
    headers: {{
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    }},
  }});
}}
'''


def build_redirects():
    lines = [
        '# Sitemap canonical URL',
        '/sitemap.xml/  /sitemap.xml  301',
        '',
        '# Canonical homepage',
        '/index.html  /  301',
        '',
        '# Articles index',
        '/articles.html  /articles/  301',
        '',
        '# Canonical static pages',
        '/guide.html  /guide  301',
        '/faq.html  /faq  301',
        '/feedback.html  /feedback  301',
        '/contact.html  /contact  301',
        '/terms.html  /terms  301',
        '/privacy.html  /privacy  301',
        '',
        '# Legacy process page',
        '/process.html  /guide  301',
        '',
        '# Legacy article URLs → SEO-friendly paths (per-slug rules must come before catch-alls)',
    ]

    for slug in sorted(ARTICLES):
        dest = f'/articles/{slug}/'
        lines.append(f'/article.html?slug={slug}  {dest}  301')
        lines.append(f'/article?slug={slug}  {dest}  301')

    lines.extend([
        '',
        '# Catch-all for article URLs without a slug',
        '/article.html  /articles/  301',
        '/article  /articles/  301',
        '',
    ])

    return '\n'.join(lines) + '\n'


def verify_build():
    errors = []
    redirects = build_redirects().splitlines()
    catch_all_idx = next(
        (i for i, line in enumerate(redirects) if line.startswith('/article.html  ')),
        -1,
    )
    slug_idx = next(
        (i for i, line in enumerate(redirects) if '?slug=' in line),
        -1,
    )
    if catch_all_idx != -1 and slug_idx != -1 and catch_all_idx < slug_idx:
        errors.append('Redirect catch-alls must come after per-slug article rules')

    for slug in ARTICLES:
        page = os.path.join(ROOT, 'articles', slug, 'index.html')
        if not os.path.exists(page):
            errors.append(f'Missing article page: articles/{slug}/index.html')
            continue
        with open(page, 'r', encoding='utf-8') as f:
            html = f.read()
        if 'article-page.js' not in html:
            errors.append(f'Missing article-page.js on articles/{slug}/index.html')
        if 'id="site-header"' not in html:
            errors.append(f'Missing site-header on articles/{slug}/index.html')

    sitemap_path = os.path.join(ROOT, 'functions', 'sitemap.xml.js')
    if not os.path.exists(sitemap_path):
        errors.append('Missing functions/sitemap.xml.js')
    else:
        with open(sitemap_path, 'r', encoding='utf-8') as f:
            source = f.read()
        if 'SITEMAP_XML' not in source:
            errors.append('functions/sitemap.xml.js is missing SITEMAP_XML payload')
        xml_start = source.find('<?xml')
        xml_end = source.find('</urlset>', xml_start)
        if xml_start == -1 or xml_end == -1:
            errors.append('functions/sitemap.xml.js does not embed sitemap XML')
        else:
            xml = source[xml_start:xml_end + len('</urlset>')]
            if xml.startswith('\ufeff'):
                errors.append('sitemap XML must not include a UTF-8 BOM')
            try:
                tree = ET.ElementTree(ET.fromstring(xml))
                root = tree.getroot()
            except ET.ParseError as exc:
                errors.append(f'sitemap XML is not valid: {exc}')
            else:
                if root.tag != '{http://www.sitemaps.org/schemas/sitemap/0.9}urlset':
                    errors.append('sitemap root element must be urlset in the sitemaps.org namespace')
                ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
                for url_el in root.findall('sm:url', ns):
                    loc = url_el.find('sm:loc', ns)
                    if loc is None or not (loc.text or '').strip():
                        errors.append('sitemap contains a url entry without loc')
                    elif not loc.text.startswith(SITE):
                        errors.append(f'sitemap loc must use {SITE}: {loc.text}')

    if errors:
        raise SystemExit('Build verification failed:\n- ' + '\n- '.join(errors))


def main():
    count = 0
    for slug in sorted(ARTICLES):
        article = merge_article(slug)
        out_dir = os.path.join(ROOT, 'articles', slug)
        os.makedirs(out_dir, exist_ok=True)
        with open(os.path.join(out_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(build_article_page(slug, article))
        count += 1

    functions_dir = os.path.join(ROOT, 'functions')
    os.makedirs(functions_dir, exist_ok=True)
    with open(os.path.join(functions_dir, 'sitemap.xml.js'), 'w', encoding='utf-8') as f:
        f.write(build_sitemap_function())

    static_sitemap = os.path.join(ROOT, 'sitemap.xml')
    if os.path.exists(static_sitemap):
        os.remove(static_sitemap)

    with open(os.path.join(ROOT, '_redirects'), 'w', encoding='utf-8') as f:
        f.write(build_redirects())

    verify_build()
    print(f'Generated {count} article pages, functions/sitemap.xml.js, and _redirects')


if __name__ == '__main__':
    main()