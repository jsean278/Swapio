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
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <div id="mobile-menu" class="mobile-menu hidden md:hidden border-t border-gray-100 bg-white">
        <nav class="flex flex-col px-4 py-4 gap-2" aria-label="Mobile navigation">
          ${navItems
            .map(
              (item) =>
                `<a href="${item.href}" class="${navBtnClass(item.id)} w-full text-center">${item.label}</a>`
            )
            .join('')}
        </nav>
      </div>
    </header>
  `;
}

function getFooter() {
  return `
    <footer class="bg-swapio-dark text-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div class="md:col-span-1">
            <div class="flex items-center gap-2.5 mb-4">
              <img src="assets/logo-footer.png" alt="Swapio" class="site-logo site-logo--footer" width="40" height="40">
              <span class="text-xl font-bold">Swapio</span>
            </div>
            <p class="text-white/70 text-sm leading-relaxed">Turn unused gift cards into real cash. Safe, simple, and paid quickly.</p>
          </div>

          <div>
            <h4 class="font-semibold mb-4 text-white/90">Explore</h4>
            <ul class="space-y-2 text-sm text-white/70">
              <li><a href="process.html" class="hover:text-white transition-colors">The Process</a></li>
              <li><a href="faq.html" class="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="articles.html" class="hover:text-white transition-colors">Articles</a></li>
              <li><a href="contact.html" class="hover:text-white transition-colors">Reach Us</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4 text-white/90">Legal</h4>
            <ul class="space-y-2 text-sm text-white/70">
              <li><a href="terms.html" class="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="privacy.html" class="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4 text-white/90">Payout Methods</h4>
            <ul class="space-y-2 text-sm text-white/70">
              <li>PayPal</li>
              <li>Cash App</li>
              <li>Zelle</li>
              <li>Bank Transfer</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/10 mt-10 pt-8 text-center">
          <p class="text-sm text-white/50">&copy; ${new Date().getFullYear()} Swapio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

function getStatsBar() {
  return `
    <section class="bg-white border-y border-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

function initLayout(activePage = '') {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = getHeader(activePage);
  if (footerEl) footerEl.innerHTML = getFooter();
  initMobileMenu();
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