const ARTICLE_SEO = {
  'real-value-from-gift-cards': {
    metaTitle: 'Getting Real Value From Unused Gift Cards | Swapio',
    metaDescription:
      'Turn forgotten gift cards into real cash. Learn why unused gift cards lose value and how Swapio pays 95% via PayPal, Cash App, Zelle, Venmo, or bank transfer.',
    relatedSlugs: ['safely-sell-gift-cards-online', 'declutter-gift-cards', 'best-cash-value-gift-cards'],
  },
  'safely-sell-gift-cards-online': {
    metaTitle: 'How to Safely Sell Gift Cards Online | Swapio Guide',
    metaDescription:
      'Learn how to safely sell gift cards online. Compare security signals, avoid scams, and get 95% cash payouts through Swapio\'s transparent platform.',
    relatedSlugs: ['gift-card-scams-to-avoid', 'sell-amazon-gift-card-for-cash', 'sell-visa-gift-card-for-cash'],
  },
  'best-cash-value-gift-cards': {
    metaTitle: '5 Gift Cards With the Best Cash Value | Swapio',
    metaDescription:
      'Discover which gift cards have the best cash value when you sell. Amazon, Visa, Apple, Target, and Steam top Swapio\'s most-swapped brands.',
    relatedSlugs: ['sell-amazon-gift-card-for-cash', 'sell-visa-gift-card-for-cash', 'real-value-from-gift-cards'],
  },
  'payout-methods-compared': {
    metaTitle: 'PayPal vs Cash App vs Zelle: Best Gift Card Payout | Swapio',
    metaDescription:
      'Compare PayPal, Cash App, Zelle, and bank transfer for gift card payouts. Same 95% rate on Swapio — pick the method that fits you.',
    relatedSlugs: ['venmo-bitcoin-payouts', 'how-long-do-payouts-take', 'after-you-submit'],
  },
  'after-you-submit': {
    metaTitle: 'What Happens After You Submit a Gift Card Swap? | Swapio',
    metaDescription:
      'Step-by-step guide to what happens after you submit a gift card on Swapio — from order code to verification and cash payout within hours.',
    relatedSlugs: ['how-long-do-payouts-take', 'payout-methods-compared', 'safely-sell-gift-cards-online'],
  },
  'declutter-gift-cards': {
    metaTitle: 'Declutter Your Wallet: Turn Unused Gift Cards Into Cash | Swapio',
    metaDescription:
      'Find hidden gift cards and convert them to cash. A 15-minute audit can uncover real money sitting in drawers, wallets, and email inboxes.',
    relatedSlugs: ['real-value-from-gift-cards', 'best-cash-value-gift-cards', 'safely-sell-gift-cards-online'],
  },
  'sell-amazon-gift-card-for-cash': {
    metaTitle: 'How to Sell an Amazon Gift Card for Cash | Swapio',
    metaDescription:
      'Sell your Amazon gift card for cash in minutes. Get 95% of your balance via PayPal, Venmo, Cash App, Zelle, Bitcoin, or bank transfer on Swapio.',
    relatedSlugs: ['sell-visa-gift-card-for-cash', 'safely-sell-gift-cards-online', 'best-cash-value-gift-cards'],
  },
  'venmo-bitcoin-payouts': {
    metaTitle: 'Venmo & Bitcoin Gift Card Payouts on Swapio | 95% Cash',
    metaDescription:
      'Get paid via Venmo or Bitcoin when you sell gift cards on Swapio. Same 95% payout rate — choose the method that fits how you use money.',
    relatedSlugs: ['payout-methods-compared', 'how-long-do-payouts-take', 'after-you-submit'],
  },
  'gift-card-scams-to-avoid': {
    metaTitle: '5 Gift Card Scams to Avoid When Selling Cards | Swapio',
    metaDescription:
      'Protect yourself from gift card scams when selling online. Learn the top 5 red flags and how Swapio keeps your swap safe with verification and order codes.',
    relatedSlugs: ['safely-sell-gift-cards-online', 'sell-amazon-gift-card-for-cash', 'after-you-submit'],
  },
  'sell-visa-gift-card-for-cash': {
    metaTitle: 'How to Sell a Visa Gift Card for Cash | Swapio',
    metaDescription:
      'Sell Visa gift cards for cash fast. Get 95% of your balance with Swapio — easy verification, instant offer, and payouts via PayPal, Venmo, or bank transfer.',
    relatedSlugs: ['sell-amazon-gift-card-for-cash', 'best-cash-value-gift-cards', 'safely-sell-gift-cards-online'],
  },
  'how-long-do-payouts-take': {
    metaTitle: 'How Long Do Gift Card Payouts Take? | Swapio Timeline',
    metaDescription:
      'Realistic timeline for Swapio gift card payouts — order code is instant, verification takes 1–4 hours, and PayPal, Venmo, and Zelle payouts follow quickly.',
    relatedSlugs: ['after-you-submit', 'payout-methods-compared', 'venmo-bitcoin-payouts'],
  },
  'sell-steam-gift-card-for-cash': {
    metaTitle: 'How to Sell a Steam Gift Card for Cash | Swapio',
    metaDescription:
      'Convert Steam gift cards to real cash. Get 95% of your wallet code value with Swapio — fast verification and payouts via your preferred method.',
    relatedSlugs: ['best-cash-value-gift-cards', 'sell-amazon-gift-card-for-cash', 'safely-sell-gift-cards-online'],
  },
};

function getArticleUrl(slug) {
  return `/articles/${slug}`;
}

function getMergedArticle(slug) {
  const article = ARTICLES[slug];
  const seo = ARTICLE_SEO[slug];
  if (!article) return null;
  return { ...article, ...seo, slug };
}