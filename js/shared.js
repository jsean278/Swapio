/* Swapio — Shared utilities */

const SWAPIO = {
  colors: {
    darkBlue: '#2D467B',
    lightBlue: '#78A5D3',
    background: '#F8FAFC',
  },

  serviceFeePercent: 5,
  payoutPercent: 95,

  payoutMethods: ['PayPal', 'Cash App', 'Zelle', 'Bank Transfer'],

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

  stats: {
    cardsSwapped: '48,200+',
    totalCashPaid: '$2.1M+',
    activeUsers: '12,400+',
  },
};

function generateOrderCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SWP-${code}`;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function calculatePayout(balance) {
  const fee = balance * (SWAPIO.serviceFeePercent / 100);
  return Math.round((balance - fee) * 100) / 100;
}

function getHeader(activePage = '') {
  const navItems = [
    { href: 'index.html', label: 'Home', id: 'home' },
    { href: 'process.html', label: 'The Process', id: 'process' },
    { href: 'faq.html', label: 'FAQ', id: 'faq' },
    { href: 'articles.html', label: 'Articles', id: 'articles' },
    { href: 'contact.html', label: 'Reach Us', id: 'contact' },
  ];

  const navBtnClass = (id) =>
    activePage === id ? 'nav-btn nav-btn-active' : 'nav-btn';

  const navLinks = navItems
    .map(
      (item) =>
        `<a href="${item.href}" class="${navBtnClass(item.id)}">${item.label}</a>`
    )
    .join('');

  return `
    <header class="site-header sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 site-header-inner">
        <div class="relative flex items-center justify-center h-16 md:h-18">
          <nav class="hidden md:flex items-center gap-2 flex-wrap justify-center" aria-label="Main navigation">
            ${navLinks}
          </nav>

          <button id="mobile-menu-btn" class="md:hidden absolute right-0 p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Open menu" aria-expanded="false">
            <svg class="w-6 h-6 text-swapio-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="mobile-menu hidden md:hidden bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t site-divider">
        <nav class="flex flex-col py-4 gap-2" aria-label="Mobile navigation">
          ${navItems
            .map(
              (item) =>
                `<a href="${item.href}" class="${navBtnClass(item.id)} w-full text-center">${item.label}</a>`
            )
            .join('')}
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
              <li><a href="process.html" class="footer-link">The Process</a></li>
              <li><a href="faq.html" class="footer-link">FAQ</a></li>
              <li><a href="articles.html" class="footer-link">Articles</a></li>
              <li><a href="contact.html" class="footer-link">Reach Us</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-heading">Legal</h4>
            <ul class="footer-list">
              <li><a href="terms.html" class="footer-link">Terms of Service</a></li>
              <li><a href="privacy.html" class="footer-link">Privacy Policy</a></li>
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

function getStatsBar() {
  return `
    <section class="stats-bar bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 stats-bar-inner">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p class="text-3xl md:text-4xl font-bold text-swapio-dark">${SWAPIO.stats.cardsSwapped}</p>
            <p class="text-gray-500 mt-1 text-sm">Cards Swapped</p>
          </div>
          <div>
            <p class="text-3xl md:text-4xl font-bold text-swapio-dark">${SWAPIO.stats.totalCashPaid}</p>
            <p class="text-gray-500 mt-1 text-sm">Total Cash Paid</p>
          </div>
          <div>
            <p class="text-3xl md:text-4xl font-bold text-swapio-dark">${SWAPIO.stats.activeUsers}</p>
            <p class="text-gray-500 mt-1 text-sm">Active Users</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function getTrustSignals() {
  return `
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-swapio-dark">Why People Trust Swapio</h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto">We built a platform that's calm, transparent, and focused on getting you paid fast.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="trust-card">
            <div class="w-12 h-12 rounded-2xl bg-swapio-light/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-swapio-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="font-semibold text-swapio-dark mb-2">Secure Verification</h3>
            <p class="text-gray-500 text-sm leading-relaxed">Every card is verified before payout. Your data is encrypted end-to-end.</p>
          </div>
          <div class="trust-card">
            <div class="w-12 h-12 rounded-2xl bg-swapio-light/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-swapio-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 class="font-semibold text-swapio-dark mb-2">Real Cash Payouts</h3>
            <p class="text-gray-500 text-sm leading-relaxed">Get paid via PayPal, Cash App, Zelle, or bank transfer — money you can use anywhere.</p>
          </div>
          <div class="trust-card">
            <div class="w-12 h-12 rounded-2xl bg-swapio-light/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-swapio-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 class="font-semibold text-swapio-dark mb-2">Fast Payouts</h3>
            <p class="text-gray-500 text-sm leading-relaxed">Most swaps are verified and paid within hours, not days.</p>
          </div>
          <div class="trust-card">
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

function getProcessSteps() {
  return `
    <section class="py-16 bg-swapio-bg">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-swapio-dark">How It Works</h2>
          <p class="text-gray-500 mt-3">Four simple steps from gift card to cash in your pocket.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="process-step">
            <div class="step-number">1</div>
            <h3 class="font-semibold text-swapio-dark mb-2">Choose Your Card</h3>
            <p class="text-gray-500 text-sm">Search from 60+ accepted brands and enter your card balance.</p>
          </div>
          <div class="process-step">
            <div class="step-number">2</div>
            <h3 class="font-semibold text-swapio-dark mb-2">Get Your Offer</h3>
            <p class="text-gray-500 text-sm">See exactly how much cash you'll receive before you commit.</p>
          </div>
          <div class="process-step">
            <div class="step-number">3</div>
            <h3 class="font-semibold text-swapio-dark mb-2">Submit Details</h3>
            <p class="text-gray-500 text-sm">Enter your card info and preferred payout method securely.</p>
          </div>
          <div class="process-step">
            <div class="step-number">4</div>
            <h3 class="font-semibold text-swapio-dark mb-2">Get Paid</h3>
            <p class="text-gray-500 text-sm">We verify your card and send cash within hours.</p>
          </div>
        </div>
        <div class="text-center mt-10">
          <a href="process.html" class="text-swapio-dark font-medium hover:text-swapio-light transition-colors inline-flex items-center gap-1">
            Learn more about the process
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  `;
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('mobile-menu-open');
    menu.classList.toggle('mobile-menu-open');
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', String(!isOpen));
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
      'body > section, body > article, body > #stats-bar, body > #process-steps, body > #trust-signals'
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

function initLayout(activePage = '') {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = getHeader(activePage);
  if (footerEl) footerEl.innerHTML = getFooter();
  initMobileMenu();
  initHeaderScroll();
  initPageAnimations();
}

async function submitToTelegram(data) {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Submission failed. Please try again.');
  }

  return response.json();
}