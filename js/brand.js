function getBrandSlugFromLocation() {
  const embeddedSlug = document.body.dataset.brandSlug;
  if (embeddedSlug && BRANDS[embeddedSlug]) return embeddedSlug;

  const querySlug = new URLSearchParams(window.location.search).get('slug');
  if (querySlug && BRANDS[querySlug]) return querySlug;

  const segment = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean).pop() || '';
  const match = segment.match(/^sell-(.+)-gift-card$/);
  if (match && BRANDS[match[1]]) return match[1];

  return null;
}

function getBrandPublicUrl(slug) {
  const origin = getSiteOrigin();
  return `${origin}/sell-${slug}-gift-card`;
}

document.addEventListener('DOMContentLoaded', () => {
  initLayout('');

  const slug = getBrandSlugFromLocation();
  const brand = slug && BRANDS[slug];

  if (!brand) {
    document.getElementById('brand-content').classList.add('hidden');
    document.getElementById('brand-not-found').classList.remove('hidden');
    document.title = 'Brand Not Found — Swapio';
    return;
  }

  const url = getBrandPublicUrl(slug);
  const swapUrl = `/index.html?brand=${encodeURIComponent(brand.name)}#swap`;

  document.title = `${brand.title} — Swapio`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', brand.description);
  setMeta('property', 'og:title', `${brand.title} — Swapio`);
  setMeta('property', 'og:description', brand.description);
  setMeta('property', 'og:url', url);
  setMeta('name', 'twitter:title', `${brand.title} — Swapio`);
  setMeta('name', 'twitter:description', brand.description);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = url;

  document.getElementById('brand-hero-bg').className =
    `h-48 sm:h-56 bg-gradient-to-br ${brand.gradient} rounded-2xl mb-8`;
  document.getElementById('brand-title').textContent = brand.title;
  document.getElementById('brand-intro').textContent = brand.intro;
  document.getElementById('brand-highlights').innerHTML = brand.highlights
    .map((item) => `<li>${item}</li>`)
    .join('');
  document.getElementById('brand-cta').href = swapUrl;
});