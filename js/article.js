document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (slug && typeof ARTICLES !== 'undefined' && ARTICLES[slug]) {
    window.location.replace(getArticleUrl(slug));
    return;
  }

  initLayout('articles');
  document.getElementById('article-content')?.classList.add('hidden');
  document.getElementById('article-not-found')?.classList.remove('hidden');
  document.title = 'Article Not Found — Swapio';
});