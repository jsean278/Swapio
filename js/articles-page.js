document.addEventListener('DOMContentLoaded', () => {
  initLayout('articles');
  renderArticleGrid();
});

function renderArticleGrid() {
  const grid = document.getElementById('article-grid');
  if (!grid || typeof ARTICLES === 'undefined') return;

  const slugs = Object.keys(ARTICLES);
  grid.innerHTML = slugs
    .map((slug) => {
      const article = ARTICLES[slug];
      const seo = typeof ARTICLE_SEO !== 'undefined' ? ARTICLE_SEO[slug] : null;
      const excerpt = seo?.metaDescription || getArticleExcerpt(article);
      const href = getArticleUrl(slug);
      const shortExcerpt =
        excerpt.length > 140 ? `${excerpt.slice(0, 137)}…` : excerpt;

      return `
        <a href="${href}" class="article-card scroll-reveal scroll-reveal--card">
          <div class="h-40 bg-gradient-to-br ${article.gradient} flex items-center justify-center">
            ${getArticleBookIcon()}
          </div>
          <div class="p-6">
            <span class="text-xs font-medium text-swapio-light uppercase tracking-wider">${article.category}</span>
            <h2 class="text-lg font-bold text-swapio-dark mt-2 mb-2">${article.title}</h2>
            <p class="text-gray-500 text-sm leading-relaxed">${shortExcerpt}</p>
            <p class="read-more mt-4">Read article →</p>
          </div>
        </a>`;
    })
    .join('');

  initScrollReveal(grid);
}