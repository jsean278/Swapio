import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SITE = 'https://swapio.cc';

const loadData = (filename) =>
  new Function(
    `${fs.readFileSync(path.join(ROOT, 'js', filename), 'utf8')}; return ${filename === 'articles-data.js' ? 'ARTICLES' : 'ARTICLE_SEO'};`
  )();

const ARTICLES = loadData('articles-data.js');
const ARTICLE_SEO = loadData('articles-seo-meta.js');

function mergeArticle(slug) {
  return { ...ARTICLES[slug], ...(ARTICLE_SEO[slug] || {}) };
}

function getExcerpt(article) {
  if (article.metaDescription) return article.metaDescription;
  const match = article.content.match(/<p>(.*?)<\/p>/s);
  if (!match) return article.title;
  return match[1].replace(/<[^>]+>/g, '').trim().slice(0, 160);
}

function getArticleUrl(slug) {
  return `${SITE}/articles/${slug}`;
}

function normalizeContent(html) {
  return html
    .replace(/href="index\.html#swap"/g, 'href="/sell-gift-card/"')
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="contact\.html"/g, 'href="/contact.html"');
}

function buildRelatedSection(slug, article) {
  const related = (article.relatedSlugs || [])
    .filter((s) => s !== slug && ARTICLES[s])
    .slice(0, 3);

  if (!related.length) return '';

  const links = related
    .map((s) => {
      const a = ARTICLES[s];
      return `<li><a href="/articles/${s}" class="text-swapio-dark hover:text-swapio-light transition-colors font-medium">${a.title}</a></li>`;
    })
    .join('\n            ');

  return `
    <section class="py-10 md:py-14 border-t border-gray-100">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-xl font-bold text-swapio-dark mb-4">Related Articles</h2>
        <ul class="space-y-2 text-gray-600">
            ${links}
        </ul>
      </div>
    </section>`;
}

function buildArticlePage(slug, article) {
  const canonical = getArticleUrl(slug);
  const title = article.metaTitle || `${article.title} | Swapio`;
  const description = getExcerpt(article);
  const content = normalizeContent(article.content.trim());
  const related = buildRelatedSection(slug, article);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description,
    author: { '@type': 'Organization', name: 'Swapio' },
    publisher: {
      '@type': 'Organization',
      name: 'Swapio',
      logo: { '@type': 'ImageObject', url: `${SITE}/assets/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    url: canonical,
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Swapio',
    url: SITE,
    email: 'support@swapio.cc',
    logo: `${SITE}/assets/logo.png`,
    description:
      'Turn unused gift cards into cash. Get 95% of your card value via PayPal, Cash App, Zelle, Venmo, Bitcoin, or bank transfer.',
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description.replace(/"/g, '&quot;')}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${title.replace(/"/g, '&quot;')}">
  <meta property="og:description" content="${description.replace(/"/g, '&quot;')}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE}/assets/logo.png">
  <meta property="og:site_name" content="Swapio">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}">
  <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">
  <meta name="twitter:image" content="${SITE}/assets/logo.png">
  <link rel="icon" href="/assets/logo.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/logo.png">
  <title>${title.replace(/</g, '&lt;')}</title>
  <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(orgSchema)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'swapio-dark': '#2D467B',
            'swapio-light': '#78A5D3',
            'swapio-bg': '#F8FAFC',
          },
        },
      },
    };
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
        <p class="text-xs font-medium text-swapio-light uppercase tracking-wider mb-2">${article.category}</p>
        <h1 class="text-3xl md:text-4xl font-bold text-swapio-dark tracking-tight leading-tight">${article.title}</h1>
        <p class="text-gray-400 text-sm mt-3">${article.readTime}</p>
      </div>
    </section>

    <section class="py-10 md:py-14">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-swapio article-body">
        ${content}
        <p class="mt-8"><a href="/sell-gift-card/" class="text-swapio-dark font-medium hover:text-swapio-light transition-colors">Sell your gift card for cash on Swapio →</a></p>
      </div>
    </section>
    ${related}
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
</body>
</html>
`;
}

function buildSitemap() {
  const staticPages = [
    { loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE}/sell-gift-card/`, priority: '0.9', changefreq: 'monthly' },
    { loc: `${SITE}/guide.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/faq.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/articles/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${SITE}/feedback.html`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${SITE}/contact.html`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${SITE}/terms.html`, priority: '0.4', changefreq: 'yearly' },
    { loc: `${SITE}/privacy.html`, priority: '0.4', changefreq: 'yearly' },
  ];

  const articlePages = Object.keys(ARTICLES).map((slug) => ({
    loc: getArticleUrl(slug),
    priority: '0.7',
    changefreq: 'monthly',
  }));

  const urls = [...staticPages, ...articlePages];

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function buildRedirects() {
  const lines = [
    '# Canonical homepage',
    '/index.html  /  301',
    '',
    '# Articles index',
    '/articles.html  /articles/  301',
    '',
    '# Legacy article URLs → SEO-friendly paths',
    '/article.html?slug=:slug  /articles/:slug  301',
    '/article?slug=:slug  /articles/:slug  301',
    '/article.html  /articles/  301',
    '/article  /articles/  301',
  ];

  for (const slug of Object.keys(ARTICLES)) {
    lines.push(`/articles/${slug}/  /articles/${slug}  301`);
  }

  return `${lines.join('\n')}\n`;
}

let count = 0;
for (const slug of Object.keys(ARTICLES)) {
  const article = mergeArticle(slug);
  const dir = path.join(ROOT, 'articles', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildArticlePage(slug, article));
  count += 1;
}

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap());
fs.writeFileSync(path.join(ROOT, '_redirects'), buildRedirects());

console.log(`Generated ${count} article pages, sitemap.xml, and _redirects`);