#!/usr/bin/env python3
"""Inject crawlable static HTML into Swapio pages for non-JS crawlers."""

from __future__ import annotations

import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_JS = ROOT / "js" / "shared.js"
ARTICLES_JS = ROOT / "js" / "articles-data.js"
ARTICLES_SEO_JS = ROOT / "js" / "articles-seo-meta.js"

NAV = [
    ("/", "Home"),
    ("/guide", "Guide"),
    ("/faq", "FAQ"),
    ("/articles/", "Articles"),
    ("/feedback", "Feedback"),
    ("/contact", "Reach Us"),
]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_gift_cards(text: str) -> list[str]:
    match = re.search(r"giftCards:\s*\[(.*?)\],", text, re.S)
    if not match:
        return []
    return re.findall(r"'([^']+)'", match.group(1))


def parse_reviews(text: str) -> list[dict]:
    reviews = []
    for body, name, meta in re.findall(
        r"text:\s*'((?:\\'|[^'])*)',\s*name:\s*'([^']+)',\s*meta:\s*'([^']+)'",
        text,
    ):
        reviews.append(
            {
                "text": body.replace("\\'", "'"),
                "name": name,
                "meta": meta,
            }
        )
    return reviews


def parse_articles() -> list[dict]:
    text = read_text(ARTICLES_JS)
    articles = []
    for slug, block in re.findall(r"'([^']+)':\s*\{([^}]+title:[^}]+)\}", text, re.S):
        title_match = re.search(r"title:\s*'([^']+)'", block)
        category_match = re.search(r"category:\s*'([^']+)'", block)
        if title_match:
            articles.append(
                {
                    "slug": slug,
                    "title": title_match.group(1),
                    "category": category_match.group(1) if category_match else "Guide",
                }
            )
    return sorted(articles, key=lambda item: item["slug"])


def header(active_href: str = "/") -> str:
    links = []
    for href, label in NAV:
        current = ' aria-current="page"' if href == active_href else ""
        links.append(f'<a href="{href}"{current}>{label}</a>')
    return f"""<header class="site-header">
  <nav class="header-nav" aria-label="Main navigation">{"".join(links)}</nav>
</header>"""


def footer() -> str:
    return """<footer class="site-footer">
  <div class="footer-links">
    <a href="/guide">Guide</a>
    <a href="/faq">FAQ</a>
    <a href="/articles/">Articles</a>
    <a href="/feedback">Feedback</a>
    <a href="/contact">Reach Us</a>
    <a href="/terms">Terms</a>
    <a href="/privacy">Privacy</a>
  </div>
  <p class="footer-copy">Swapio — turn unused gift cards into cash. 95% payout via PayPal, Cash App, Zelle, Venmo, Bitcoin, or bank transfer.</p>
</footer>"""


def stats_bar() -> str:
    return """<section class="stats-bar" aria-label="Swapio stats">
  <p>13,400+ cards swapped · $487K+ cash paid · 3,200+ active sellers</p>
</section>"""


def process_steps() -> str:
    return """<section aria-label="How Swapio works">
  <h2>How It Works</h2>
  <ol>
    <li><strong>Choose Your Card</strong> — Search 60+ brands and enter your balance.</li>
    <li><strong>Get Your Offer</strong> — See your 95% cash payout before you submit.</li>
    <li><strong>Submit Details</strong> — Enter card and payout info securely.</li>
    <li><strong>Get Paid</strong> — Most swaps pay out within hours.</li>
  </ol>
</section>"""


def trust_signals() -> str:
    brands = parse_gift_cards(read_text(DATA_JS))
    sample = ", ".join(brands[:12])
    return f"""<section aria-label="Why people trust Swapio">
  <h2>Why People Trust Swapio</h2>
  <ul>
    <li>Secure verification before every payout</li>
    <li>Real cash via PayPal, Cash App, Zelle, Venmo, Bitcoin, or bank transfer</li>
    <li>Transparent 5% service fee shown upfront</li>
    <li>60+ accepted brands including {sample}, and more</li>
  </ul>
  <p><a href="/sell-gift-card/">Start your swap</a> · <a href="/faq">Read the FAQ</a></p>
</section>"""


def feedback_preview(reviews: list[dict], limit: int = 4) -> str:
    parts = ['<section aria-label="Seller feedback preview"><h2>Seller Feedback</h2>']
    for review in reviews[:limit]:
        parts.append(
            f'<article><p>{review["text"]}</p>'
            f'<p><strong>{review["name"]}</strong> — {review["meta"]}</p></article>'
        )
    parts.append('<p><a href="/feedback">View more seller feedback</a></p></section>')
    return "\n".join(parts)


def article_grid(articles: list[dict]) -> str:
    cards = []
    for article in articles:
        href = f"/articles/{article['slug']}/"
        cards.append(
            f"""<article>
  <h2><a href="{href}">{article["title"]}</a></h2>
  <p>{article["category"]}</p>
</article>"""
        )
    return "\n".join(cards)


def brands_list_html(brands: list[str]) -> str:
    items = "".join(f"<li>{brand}</li>" for brand in brands)
    return f'<section aria-label="Accepted gift card brands"><h2>Accepted Brands</h2><ul>{items}</ul></section>'


def replace_div(html: str, div_id: str, content: str) -> str:
    start_match = re.search(rf'<div[^>]*\bid="{re.escape(div_id)}"[^>]*>', html)
    if not start_match:
        return html

    start = start_match.start()
    pos = start_match.end()
    depth = 1
    end = None
    while pos < len(html) and depth:
        next_open = html.find("<div", pos)
        next_close = html.find("</div>", pos)
        if next_close == -1:
            raise RuntimeError(f"Unclosed div #{div_id}")
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
            continue
        depth -= 1
        pos = next_close + 6
        if depth == 0:
            end = pos

    if end is None:
        raise RuntimeError(f"Could not close div #{div_id}")

    opening = html[start_match.start() : start_match.end()]
    return html[:start] + opening + "\n" + content + "\n</div>" + html[end:]


def detect_active_href(path: Path, html: str) -> str:
    page_match = re.search(r'data-page="([^"]+)"', html)
    page = page_match.group(1) if page_match else ""
    mapping = {
        "home": "/",
        "guide": "/guide",
        "faq": "/faq",
        "articles": "/articles/",
        "feedback": "/feedback",
        "contact": "/contact",
        "sell": "/sell-gift-card/",
        "terms": "/terms",
        "privacy": "/privacy",
    }
    if page in mapping:
        return mapping[page]
    if path.parts[-2:-1] == ("articles",) and path.name == "index.html":
        return "/articles/"
    if "articles" in path.parts:
        return "/articles/"
    return "/"


def patch_file(path: Path, reviews: list[dict], articles: list[dict], brands: list[str]) -> None:
    html = read_text(path)
    active = detect_active_href(path, html)

    html = replace_div(html, "site-header", header(active))
    html = replace_div(html, "site-footer", footer())

    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        html = replace_div(html, "stats-bar", stats_bar())
        html = replace_div(html, "process-steps", process_steps())
        html = replace_div(html, "trust-signals", trust_signals())
        html = replace_div(html, "feedback-preview", feedback_preview(reviews))
    elif rel == "articles/index.html":
        html = replace_div(html, "article-grid", article_grid(articles))
    elif rel == "sell-gift-card/index.html":
        if 'id="accepted-brands"' in html:
            html = replace_div(html, "accepted-brands", brands_list_html(brands[:30]))

    path.write_text(html, encoding="utf-8")
    print(f"patched {rel}")


def main() -> None:
    shared = read_text(DATA_JS)
    reviews = parse_reviews(shared)
    articles = parse_articles()
    brands = parse_gift_cards(shared)

    for path in sorted(ROOT.rglob("*.html")):
        if path.name in {"article.html", "articles.html", "process.html"}:
            continue
        if "site-header" not in read_text(path):
            continue
        patch_file(path, reviews, articles, brands)


if __name__ == "__main__":
    main()