/* Swapio — Shared utilities */

const SWAPIO = {
  siteName: 'Swapio',
  siteUrl: 'https://swapio.cc',
  logoPath: '/assets/logo-180.png',
  ogImagePath: '/assets/logo-512.png',
  faviconPath: '/assets/logo-180.png',
  appleTouchIconPath: '/assets/logo-180.png',
  supportEmail: 'support@swapio.cc',

  seoKeywords: [
    'gift card to cash', 'sell gift cards', 'sell gift cards online', 'swap gift cards',
    'exchange gift cards', 'gift card exchange', 'cash for gift cards', 'unused gift cards',
    'turn gift cards into cash', 'gift card buyer', 'sell unused gift cards', 'gift card payout',
    'instant gift card payout', 'fast gift card cash', 'gift card cash out', 'redeem gift cards for cash',
    'Swapio', 'swapio.cc', 'sell gift cards for cash', 'best gift card exchange',
    'sell Amazon gift card', 'sell Apple gift card', 'sell Steam gift card', 'sell Visa gift card',
    'sell Mastercard gift card', 'sell Google Play gift card', 'sell PlayStation gift card',
    'sell Xbox gift card', 'sell Nintendo gift card', 'sell Roblox gift card', 'sell Target gift card',
    'sell Walmart gift card', 'sell Best Buy gift card', 'sell Starbucks gift card',
    'sell Netflix gift card', 'sell Spotify gift card', 'sell Uber gift card', 'sell DoorDash gift card',
    'sell Airbnb gift card', 'sell Nike gift card', 'sell Sephora gift card', 'sell GameStop gift card',
    'sell eBay gift card', 'sell Costco gift card', 'sell Home Depot gift card', "sell Lowe's gift card",
    'sell American Express gift card', 'sell Paysafecard', 'sell Riot Games gift card',
    'sell Valorant gift card', 'sell Battle.net gift card', 'sell Fortnite gift card',
    'sell Discord Nitro gift card', 'sell Twitch gift card', 'sell Hulu gift card',
    'sell YouTube Premium gift card', 'sell Hotels.com gift card', 'sell Expedia gift card',
    'sell Chipotle gift card', 'sell Chick-fil-A gift card', "sell McDonald's gift card",
    'sell Subway gift card', "sell Domino's gift card", 'sell Uber Eats gift card',
    'sell CVS gift card', 'sell Walgreens gift card', "sell Kohl's gift card",
    'sell TJ Maxx gift card', 'sell Marshalls gift card', 'sell IKEA gift card',
    'sell Newegg gift card', 'sell Zara gift card', 'sell H&M gift card',
    "sell Macy's gift card", 'sell Nordstrom gift card', 'sell Ulta gift card',
    'sell Adidas gift card', 'sell Razer Gold gift card', 'sell Minecraft gift card',
    'sell EA gift card', 'sell Nintendo eShop gift card',
    'PayPal gift card payout', 'Cash App gift card payout', 'Zelle gift card payout',
    'Venmo gift card payout', 'Bitcoin gift card payout', 'bank transfer gift card payout',
    'gift card to PayPal', 'gift card to Cash App', 'gift card to Zelle', 'gift card to Venmo',
    'gift card to Bitcoin', 'gift card to bank account', '95 percent gift card payout',
    'gift card verification', 'safe gift card selling', 'legit gift card exchange',
    'gift card scam protection', 'gift card balance check', 'electronic gift card cash',
    'physical gift card cash', 'e-gift card to cash', 'digital gift card exchange',
    'sell partially used gift card', 'sell full balance gift card', 'gift card liquidation',
    'convert gift cards to money', 'monetize gift cards', 'gift card resale',
    'online gift card marketplace', 'trusted gift card buyer', 'same day gift card payout',
    'quick gift card cash', 'gift card swap platform', 'gift card trade for cash',
    'holiday gift card cash', 'birthday gift card cash', 'corporate gift card cash',
    'reward gift card cash', 'store credit to cash', 'prepaid card to cash',
    'Visa prepaid to cash', 'Mastercard prepaid to cash', 'open loop gift card cash',
    'closed loop gift card cash', 'retail gift card cash', 'restaurant gift card cash',
    'gaming gift card cash', 'streaming gift card cash', 'travel gift card cash',
    'fashion gift card cash', 'beauty gift card cash', 'grocery gift card cash',
    'sell gift card USA', 'sell gift cards fast', 'sell gift cards safely',
    'gift card exchange rates', 'best rate gift card selling', 'low fee gift card exchange',
    'transparent gift card fees', 'gift card order tracking', 'gift card submission',
    'how to sell gift cards', 'where to sell gift cards', 'gift card cash guide',
  ].join(', '),

  colors: {
    darkBlue: '#2D467B',
    lightBlue: '#78A5D3',
    background: '#F8FAFC',
  },

  serviceFeePercent: 5,
  payoutPercent: 95,

  payoutMethods: ['PayPal', 'Cash App', 'Zelle', 'Venmo', 'Bitcoin', 'Bank Transfer'],

  giftCards: [
    'Amazon', 'Apple', 'Google Play', 'Steam', 'PlayStation', 'Xbox',
    'Nintendo eShop', 'Roblox', 'Visa', 'Mastercard', 'American Express',
    'Paysafecard', 'eBay', 'Walmart', 'Target', 'Best Buy', 'Costco',
    'Nike', 'Adidas', 'Sephora', 'Ulta Beauty', "Macy's", 'Nordstrom',
    'H&M', 'Zara', 'Starbucks', "McDonald's", 'Chipotle', 'Chick-fil-A',
    'Subway', "Domino's", 'Uber', 'Uber Eats', 'DoorDash', 'Airbnb',
    'Hotels.com', 'Expedia', 'Netflix', 'Spotify', 'YouTube Premium',
    'Hulu', 'Discord Nitro', 'Twitch', 'Riot Games', 'Valorant',
    'Battle.net', 'Fortnite', 'EA', 'Razer Gold', 'Minecraft', 'CVS',
    'Walgreens', "Kohl's", 'TJ Maxx', 'Marshalls', 'GameStop', 'Newegg',
    'IKEA', "Lowe's", 'Home Depot',
  ],

  stats: [
    { label: 'Cards Swapped', value: 13400, prefix: '', suffix: '+', format: 'number' },
    { label: 'Total Cash Paid', value: 487, prefix: '$', suffix: 'K+', format: 'compact' },
    { label: 'Active Sellers', value: 3200, prefix: '', suffix: '+', format: 'number' },
  ],

  sellerReviews: [
    {
      text: 'Had a $120 Amazon card I wasn\'t going to use. Submitted it around lunch and had $114 in my PayPal before dinner. Straightforward process with no surprises on the fee.',
      name: 'Marcus T.',
      meta: 'Amazon · PayPal',
    },
    {
      text: 'I was skeptical at first, but seeing my exact offer before submitting made a big difference. Zelle payout hit the same day. Would use again.',
      name: 'Priya K.',
      meta: 'Target · Zelle',
    },
    {
      text: 'Clean site, easy to follow. I swapped a Visa gift card from a work reward and got paid through Cash App. The order code made it easy to track everything.',
      name: 'Jordan M.',
      meta: 'Visa · Cash App',
    },
    {
      text: 'Needed cash instead of another store card. Swapio showed the 5% fee upfront so I knew exactly what I\'d get. Venmo payout was quick after verification.',
      name: 'Elena R.',
      meta: 'Apple · Venmo',
    },
    {
      text: 'Swapped two cards in one evening, a Steam card and a Walmart card. Same payout method for both, both paid out within hours. Simple and professional.',
      name: 'David L.',
      meta: 'Steam & Walmart · PayPal',
    },
    {
      text: 'Better experience than other sites I\'ve tried. No pressure, clear steps, and support replied when I had a question about my order code. Solid service.',
      name: 'Aisha N.',
      meta: 'Best Buy · Bank Transfer',
    },
  ],
};

function generateOrderCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SWP-${code}`;
}

function getSiteOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null') {
    return window.location.origin;
  }
  return 'https://swapio.cc';
}

function getArticleUrl(slug) {
  return `/articles/${slug}/`;
}

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function initSeo() {
  if (typeof window === 'undefined') return;

  const origin = getSiteOrigin();
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  const url = canonicalLink?.href || `${origin}${window.location.pathname}`;

  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', `${origin}${SWAPIO.ogImagePath}`);
  setMeta('property', 'og:site_name', SWAPIO.siteName);
  setMeta('property', 'og:locale', 'en_US');
  setMeta('name', 'twitter:image', `${origin}${SWAPIO.ogImagePath}`);
  setMeta('name', 'keywords', SWAPIO.seoKeywords);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  if (!document.querySelector('script[type="application/ld+json"]')) {
    const script = document.createElement('script');
    script.id = 'swapio-org-schema';
    script.type = 'application/ld+json';
    const reviews = SWAPIO.sellerReviews || [];
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: SWAPIO.siteName,
          url: origin,
          description: 'Turn unused gift cards into cash. Get 95% of your card value via PayPal, Cash App, Zelle, Venmo, Bitcoin, or bank transfer.',
          inLanguage: 'en-US',
          publisher: {
            '@type': 'Organization',
            name: SWAPIO.siteName,
            url: origin,
            email: SWAPIO.supportEmail,
            logo: `${origin}${SWAPIO.ogImagePath}`,
          },
        },
        {
          '@type': 'Service',
          '@id': `${origin}/#service`,
          name: 'Swapio Gift Card Exchange',
          provider: { '@type': 'Organization', name: SWAPIO.siteName, url: origin },
          url: origin,
          description: 'Sell unused gift cards for cash with 95% payout via PayPal, Cash App, Zelle, Venmo, Bitcoin, or bank transfer.',
          areaServed: 'US',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: reviews.length,
            bestRating: '5',
            worstRating: '1',
          },
          review: reviews.slice(0, 3).map((review) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: review.name },
            reviewBody: review.text,
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          })),
        },
      ],
    });
    document.head.appendChild(script);
  }
}

function scrollToHashTarget() {
  if (document.body.dataset.page !== 'home') return;
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (target) {
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function getArticleExcerpt(article) {
  if (article.excerpt) return article.excerpt;
  const match = article.content.match(/<p>(.*?)<\/p>/s);
  if (!match) return article.title;
  return match[1].replace(/<[^>]+>/g, '').trim().slice(0, 160);
}

function formatCurrency(amount) {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(amount);
}

function calculatePayout(balance) {
  const fee = balance * (SWAPIO.serviceFeePercent / 100);
  return Math.round((balance - fee) * 100) / 100;
}

const SWAP_SESSION_KEY = 'swapioSwapState';

function saveSwapSession(state) {
  sessionStorage.setItem(SWAP_SESSION_KEY, JSON.stringify(state));
}

function loadSwapSession() {
  try {
    const raw = sessionStorage.getItem(SWAP_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearSwapSession() {
  sessionStorage.removeItem(SWAP_SESSION_KEY);
}

function isValidSwapSession(saved) {
  if (!saved?.offerConfirmed) return false;
  if (!saved.brand || !SWAPIO.giftCards.includes(saved.brand)) return false;
  if (!saved.payoutMethod || !SWAPIO.payoutMethods.includes(saved.payoutMethod)) return false;

  const balance = Number(saved.balance);
  if (!Number.isFinite(balance) || balance < 10 || balance > 5000) return false;

  const expectedPayout = calculatePayout(balance);
  if (typeof saved.payout !== 'number' || Math.abs(saved.payout - expectedPayout) > 0.01) {
    return false;
  }

  return true;
}

function getHeader(activePage = '') {
  const navItems = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/guide', label: 'Guide', id: 'guide' },
    { href: '/faq', label: 'FAQ', id: 'faq' },
    { href: '/articles/', label: 'Articles', id: 'articles' },
    { href: '/feedback', label: 'Feedback', id: 'feedback' },
    { href: '/contact', label: 'Reach Us', id: 'contact' },
  ];

  const navBtnClass = (id) =>
    activePage === id ? 'nav-btn nav-btn-active' : 'nav-btn';

  const navLinks = navItems
    .map(
      (item) =>
        `<a href="${item.href}" class="${navBtnClass(item.id)}">${item.label}</a>`
    )
    .join('');

  const dashboardNavClass = activePage === 'dashboard' ? 'nav-btn nav-btn-active' : 'nav-btn';

  return `
    <header class="site-header sticky top-0 z-50 bg-white transition-shadow duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 site-header-inner">
        <div class="relative flex items-center justify-center h-16 md:h-18">
          <nav class="hidden md:flex items-center gap-2 flex-wrap justify-center" aria-label="Main navigation">
            ${navLinks}
            <span class="auth-nav-slot inline-flex items-center gap-2">
              <span id="auth-nav-guest" class="hidden inline-flex items-center gap-2">
                <a href="/login.html" class="nav-btn nav-btn-accent">Log In</a>
              </span>
              <span id="auth-nav-user" class="hidden inline-flex items-center gap-2">
                <a href="/dashboard.html" id="auth-dashboard-link" class="${dashboardNavClass}">Dashboard</a>
                <button type="button" data-sign-out class="nav-btn nav-btn-signout">Sign Out</button>
              </span>
            </span>
          </nav>

          <button id="mobile-menu-btn" class="mobile-menu-btn md:hidden absolute right-0 p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Open menu" aria-expanded="false">
            <svg id="mobile-menu-icon-open" class="w-6 h-6 text-swapio-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg id="mobile-menu-icon-close" class="w-6 h-6 text-swapio-dark hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="mobile-menu hidden md:hidden bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex flex-col py-4 gap-2" aria-label="Mobile navigation">
          ${navItems
            .map(
              (item) =>
                `<a href="${item.href}" class="${navBtnClass(item.id)} w-full text-center">${item.label}</a>`
            )
            .join('')}
          <span class="auth-nav-slot flex flex-col gap-2">
            <span id="auth-nav-guest-mobile" class="hidden flex flex-col gap-2">
              <a href="/login.html" class="nav-btn nav-btn-accent w-full text-center">Log In</a>
            </span>
            <span id="auth-nav-user-mobile" class="hidden flex flex-col gap-2">
              <a href="/dashboard.html" class="${dashboardNavClass} w-full text-center">Dashboard</a>
              <button type="button" data-sign-out class="nav-btn nav-btn-signout w-full text-center">Sign Out</button>
            </span>
          </span>
        </nav>
        </div>
      </div>
    </header>
  `;
}

function getFooter() {
  return `
    <footer class="site-footer bg-swapio-dark text-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div class="footer-links">
          <div class="footer-col">
            <h4 class="footer-heading">Explore</h4>
            <ul class="footer-list">
              <li><a href="/guide" class="footer-link">Guide</a></li>
              <li><a href="/faq" class="footer-link">FAQ</a></li>
              <li><a href="/articles/" class="footer-link">Articles</a></li>
              <li><a href="/feedback" class="footer-link">Feedback</a></li>
              <li><a href="/contact" class="footer-link">Reach Us</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-heading">Legal</h4>
            <ul class="footer-list">
              <li><a href="/terms" class="footer-link">Terms of Service</a></li>
              <li><a href="/privacy" class="footer-link">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-copy mt-8 sm:mt-10 pt-6 sm:pt-8 text-center">
          <p class="text-sm text-white/50">&copy; ${new Date().getFullYear()} Swapio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

function formatStatValue(stat, amount) {
  const rounded = Math.round(amount);
  if (stat.format === 'compact') {
    return `${stat.prefix}${rounded}${stat.suffix}`;
  }
  return `${stat.prefix}${rounded.toLocaleString('en-US')}${stat.suffix}`;
}

function getStatsBar() {
  const cards = SWAPIO.stats
    .map(
      (stat) => `
          <div class="scroll-reveal scroll-reveal--card rounded-2xl bg-white p-6">
            <p
              class="text-3xl md:text-4xl font-bold text-swapio-dark stat-counter"
              data-stat-value="${stat.value}"
              data-stat-prefix="${stat.prefix}"
              data-stat-suffix="${stat.suffix}"
              data-stat-format="${stat.format}"
            >${stat.prefix}0${stat.suffix}</p>
            <p class="text-gray-500 mt-1 text-sm">${stat.label}</p>
          </div>`
    )
    .join('');

  return `
    <section class="stats-bar bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 stats-bar-inner">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

function initStatsCounters(root = document) {
  const counters = root.querySelectorAll('.stat-counter[data-stat-value]');
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const runCounter = (el) => {
    const target = Number(el.dataset.statValue);
    const stat = {
      value: target,
      prefix: el.dataset.statPrefix || '',
      suffix: el.dataset.statSuffix || '',
      format: el.dataset.statFormat || 'number',
    };

    if (!Number.isFinite(target) || prefersReducedMotion) {
      el.textContent = formatStatValue(stat, target);
      return;
    }

    const duration = 1400;
    const startValue = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startValue) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatStatValue(stat, target * eased);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatStatValue(stat, target);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.statAnimated === 'true') return;
        entry.target.dataset.statAnimated = 'true';
        runCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.35, rootMargin: '0px 0px -40px 0px' }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function getTrustSignals() {
  return `
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-swapio-dark scroll-reveal">Why People Trust Swapio</h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto scroll-reveal">We built a platform that's calm, transparent, and focused on getting you paid fast.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="trust-card scroll-reveal scroll-reveal--card">
            <div class="w-12 h-12 rounded-2xl bg-swapio-light/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-swapio-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="font-semibold text-swapio-dark mb-2">Secure Verification</h3>
            <p class="text-gray-500 text-sm leading-relaxed">Every card is verified before payout. All submissions are sent over encrypted HTTPS connections.</p>
          </div>
          <div class="trust-card scroll-reveal scroll-reveal--card">
            <div class="w-12 h-12 rounded-2xl bg-swapio-light/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-swapio-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 class="font-semibold text-swapio-dark mb-2">Real Cash Payouts</h3>
            <p class="text-gray-500 text-sm leading-relaxed">Get paid via PayPal, Cash App, Zelle, Venmo, Bitcoin, or bank transfer — money you can use anywhere.</p>
          </div>
          <div class="trust-card scroll-reveal scroll-reveal--card">
            <div class="w-12 h-12 rounded-2xl bg-swapio-light/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-swapio-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 class="font-semibold text-swapio-dark mb-2">Fast Payouts</h3>
            <p class="text-gray-500 text-sm leading-relaxed">Most swaps are verified and paid within hours, not days.</p>
          </div>
          <div class="trust-card scroll-reveal scroll-reveal--card">
            <div class="w-12 h-12 rounded-2xl bg-swapio-light/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-swapio-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <h3 class="font-semibold text-swapio-dark mb-2">24/7 Support</h3>
            <p class="text-gray-500 text-sm leading-relaxed">Our team is here whenever you need help with your swap.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function getArticleBookIcon(className = 'article-card-book-icon') {
  return `<svg class="${className}" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11 3.99995C12.8839 2.91716 14.9355 2.15669 17.07 1.74995C17.551 1.63467 18.0523 1.63283 18.5341 1.74458C19.016 1.85632 19.4652 2.07852 19.8464 2.39375C20.2276 2.70897 20.5303 3.10856 20.7305 3.56086C20.9307 4.01316 21.0229 4.50585 21 4.99995V13.9999C20.9699 15.117 20.5666 16.1917 19.8542 17.0527C19.1419 17.9136 18.1617 18.5112 17.07 18.7499C14.9355 19.1567 12.8839 19.9172 11 20.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.9995 3.99995C9.1156 2.91716 7.06409 2.15669 4.92957 1.74995C4.44856 1.63467 3.94731 1.63283 3.46546 1.74458C2.98362 1.85632 2.53439 2.07852 2.15321 2.39375C1.77203 2.70897 1.46933 3.10856 1.26911 3.56086C1.0689 4.01316 0.976598 4.50585 0.999521 4.99995V13.9999C1.0296 15.117 1.433 16.1917 2.14533 17.0527C2.85767 17.9136 3.83793 18.5112 4.92957 18.7499C7.06409 19.1567 9.1156 19.9172 10.9995 20.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11 21V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function renderReviewCard(review) {
  return `
    <article class="review-card scroll-reveal scroll-reveal--card">
      <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
      <p class="review-text">"${review.text}"</p>
      <div class="review-author">
        <span class="review-name">${review.name}</span>
        <span class="review-meta">${review.meta}</span>
      </div>
    </article>
  `;
}

function getFeedbackPreview(limit = 4) {
  const reviews = SWAPIO.sellerReviews.slice(0, limit).map(renderReviewCard).join('');
  return `
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-bold text-swapio-dark scroll-reveal">Seller Feedback</h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto scroll-reveal">See what sellers say about swapping gift cards for cash with Swapio.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${reviews}
        </div>
        <div class="text-center mt-8">
          <a href="/feedback" class="text-swapio-dark font-medium hover:text-swapio-light transition-colors inline-flex items-center gap-1">
            View more
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  `;
}

function getProcessSteps() {
  return `
    <section class="py-16 bg-swapio-bg">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-swapio-dark">How It Works</h2>
          <p class="text-gray-500 mt-3">Four simple steps from gift card to cash in your pocket.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="process-step scroll-reveal">
            <div class="step-number">1</div>
            <h3 class="font-semibold text-swapio-dark mb-2">Choose Your Card</h3>
            <p class="text-gray-500 text-sm">Search from 60+ accepted brands and enter your card balance.</p>
          </div>
          <div class="process-step scroll-reveal">
            <div class="step-number">2</div>
            <h3 class="font-semibold text-swapio-dark mb-2">Get Your Offer</h3>
            <p class="text-gray-500 text-sm">See exactly how much cash you'll receive before you commit.</p>
          </div>
          <div class="process-step scroll-reveal">
            <div class="step-number">3</div>
            <h3 class="font-semibold text-swapio-dark mb-2">Submit Details</h3>
            <p class="text-gray-500 text-sm">Enter your card info and preferred payout method securely.</p>
          </div>
          <div class="process-step scroll-reveal">
            <div class="step-number">4</div>
            <h3 class="font-semibold text-swapio-dark mb-2">Get Paid</h3>
            <p class="text-gray-500 text-sm">We verify your card and send cash within hours.</p>
          </div>
        </div>
        <div class="text-center mt-10">
          <a href="/guide.html" class="text-swapio-dark font-medium hover:text-swapio-light transition-colors inline-flex items-center gap-1">
            Read the full guide
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  `;
}

function setMobileMenuOpen(isOpen) {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('mobile-menu-icon-open');
  const iconClose = document.getElementById('mobile-menu-icon-close');
  if (!btn || !menu) return;

  menu.classList.toggle('mobile-menu-open', isOpen);
  menu.classList.toggle('hidden', !isOpen);
  btn.setAttribute('aria-expanded', String(isOpen));
  btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  iconOpen?.classList.toggle('hidden', isOpen);
  iconClose?.classList.toggle('hidden', !isOpen);
  document.body.classList.toggle('mobile-menu-body-lock', isOpen);
}

function closeMobileMenu() {
  setMobileMenuOpen(false);
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('mobile-menu-open');
    setMobileMenuOpen(!isOpen);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  menu.querySelectorAll('[data-sign-out]').forEach((btn) => {
    btn.addEventListener('click', closeMobileMenu);
  });
}

let scrollRevealObserver = null;

function initScrollReveal(root = document) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = root.querySelectorAll('.scroll-reveal:not(.is-visible)');
  if (!elements.length) return;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  if (!scrollRevealObserver) {
    scrollRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          scrollRevealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
  }

  elements.forEach((el) => {
    const parent = el.parentElement;
    if (parent) {
      const siblings = [...parent.querySelectorAll(':scope > .scroll-reveal')];
      const index = siblings.indexOf(el);
      if (index >= 0) {
        el.style.setProperty('--reveal-delay', `${index * 0.08}s`);
      }
    }
    scrollRevealObserver.observe(el);
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 8);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initPageAnimations() {
  const targets = Array.from(
    document.querySelectorAll(
      'body > section, body > article, body > #stats-bar, body > #process-steps, body > #trust-signals, body > #feedback-preview'
    )
  ).filter((el) => !el.classList.contains('hidden'));

  let delayIndex = 0;
  targets.forEach((el) => {
    if (el.classList.contains('page-animate')) return;

    if (!el.classList.contains('page-enter')) {
      el.classList.add('page-animate');
      el.style.setProperty('--page-enter-delay', `${delayIndex * 0.08}s`);
    }
    delayIndex += 1;
  });
}

function loadSupportChat() {
  if (typeof initSupportChat === 'function') {
    initSupportChat();
    return;
  }

  if (document.querySelector('script[data-support-chat]')) return;

  const script = document.createElement('script');
  script.src = '/js/support-chat.js';
  script.dataset.supportChat = 'true';
  script.onload = () => {
    if (typeof initSupportChat === 'function') initSupportChat();
  };
  document.body.appendChild(script);
}

function initLayout(activePage = '') {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = getHeader(activePage);
  if (footerEl) footerEl.innerHTML = getFooter();
  initSeo();
  initMobileMenu();
  initHeaderScroll();
  initPageAnimations();
  initScrollReveal();
  scrollToHashTarget();
  loadSupportChat();
  if (typeof initAuth === 'function') {
    initAuth();
  } else {
    finishAuthNavLoading(false);
  }
}

function finishAuthNavLoading(isLoggedIn) {
  const header = document.querySelector('.site-header');
  if (!header) return;
  header.classList.add('auth-ready');
  const guest = document.getElementById('auth-nav-guest');
  const user = document.getElementById('auth-nav-user');
  const guestMobile = document.getElementById('auth-nav-guest-mobile');
  const userMobile = document.getElementById('auth-nav-user-mobile');
  if (isLoggedIn) {
    guest?.classList.add('hidden');
    user?.classList.remove('hidden');
    guestMobile?.classList.add('hidden');
    userMobile?.classList.remove('hidden');
  } else {
    guest?.classList.remove('hidden');
    user?.classList.add('hidden');
    guestMobile?.classList.remove('hidden');
    userMobile?.classList.add('hidden');
  }
}

async function submitToTelegram(data) {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Submission failed. Please try again.');
  }

  return response.json();
}