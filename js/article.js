document.addEventListener('DOMContentLoaded', () => {
  initLayout('articles');

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const article = slug && ARTICLES[slug];

  if (!article) {
    document.getElementById('article-content').classList.add('hidden');
    document.getElementById('article-not-found').classList.remove('hidden');
    return;
  }

  document.title = `${article.title} — Swapio`;
  document.querySelector('meta[name="description"]')?.setAttribute(
    'content',
    article.title
  );

  document.getElementById('article-category').textContent = article.category;
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-read-time').textContent = article.readTime;
  document.getElementById('article-body').innerHTML = article.content;
});