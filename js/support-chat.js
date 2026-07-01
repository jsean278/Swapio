/* Swapio — AI support chatbot (site-scoped) */

const SUPPORT_CHAT = {
  agentName: 'Swapio AI',
  agentLabel: 'AI Assistant',
  welcomeDelay: 700,
  typingMin: 500,
  typingMax: 2200,
  closeDuration: 320,
  suggestions: [
    'Is Swapio legit?',
    'How much will I get?',
    'What cards do you accept?',
  ],
};

const OFF_TOPIC_REPLY =
  "I can only help with general Swapio questions — how swaps work, fees, payout options, and accepted brands. For personal order help, email support@swapio.cc with your order code (SWP-XXXXXX).";

const BRAND_ALIASES = {
  'american express': 'American Express',
  amex: 'American Express',
  'app store': 'Apple',
  itunes: 'Apple',
  'battle.net': 'Battle.net',
  battlenet: 'Battle.net',
  'best buy': 'Best Buy',
  'cash app': 'Cash App',
  'chick fil a': 'Chick-fil-A',
  'discord nitro': 'Discord Nitro',
  discord: 'Discord Nitro',
  doordash: 'DoorDash',
  'door dash': 'DoorDash',
  'google play': 'Google Play',
  'home depot': 'Home Depot',
  'nintendo eshop': 'Nintendo eShop',
  eshop: 'Nintendo eShop',
  nitro: 'Discord Nitro',
  paysafe: 'Paysafecard',
  paysafecard: 'Paysafecard',
  playstation: 'PlayStation',
  psn: 'PlayStation',
  'ps4': 'PlayStation',
  'ps5': 'PlayStation',
  'razer gold': 'Razer Gold',
  'riot games': 'Riot Games',
  'tj maxx': 'TJ Maxx',
  'uber eats': 'Uber Eats',
  'ulta beauty': 'Ulta Beauty',
  'youtube premium': 'YouTube Premium',
  amazon: 'Amazon',
  amzn: 'Amazon',
  apple: 'Apple',
  ebay: 'eBay',
  fortnite: 'Fortnite',
  google: 'Google Play',
  minecraft: 'Minecraft',
  netflix: 'Netflix',
  nintendo: 'Nintendo eShop',
  paypal: 'PayPal',
  razer: 'Razer Gold',
  riot: 'Riot Games',
  roblox: 'Roblox',
  spotify: 'Spotify',
  starbucks: 'Starbucks',
  steam: 'Steam',
  target: 'Target',
  twitch: 'Twitch',
  uber: 'Uber',
  valorant: 'Valorant',
  venmo: 'Venmo',
  visa: 'Visa',
  walmart: 'Walmart',
  xbox: 'Xbox',
  zelle: 'Zelle',
};

const REQUIREMENT_FALLBACK = {
  prepaid: 'card number, expiration date, and CVV',
  paysafecard: '16-digit PIN',
  amazon: 'claim code (XXXX-XXXXXX-XXXX)',
  apple: 'gift card code (plus 4-digit PIN for physical cards)',
  google: 'Google Play gift code',
  giftLink: 'full gift link URL (e.g. https://discord.gift/...)',
  codeOrLink: 'gift card code or redemption link',
  steam: 'Steam Wallet code (XXXXX-XXXXX-XXXXX)',
  playstation: '12-character PSN code',
  xbox: '25-character Xbox code',
  nintendo: '16-character eShop download code',
  riot: 'Riot Access Code',
  roblox: 'Roblox gift card code',
  ebay: '13-digit redemption code + 4-digit security code',
  razerGold: 'Razer Gold PIN',
  deliveryCode: 'gift card code from your email or app',
  code: 'digital redemption code',
  retail: 'card number + PIN from the back of the card',
};

const chatState = {
  history: [],
  lastIntent: null,
  lastBrand: null,
  lastReply: '',
  userMessageCount: 0,
};

function normalizeText(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s$%]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function expandSlang(text) {
  return text
    .replace(/\bu\b/g, 'you')
    .replace(/\bur\b/g, 'your')
    .replace(/\br\b/g, 'are')
    .replace(/\bpls\b/g, 'please')
    .replace(/\bplz\b/g, 'please')
    .replace(/\bthx\b/g, 'thanks')
    .replace(/\bidk\b/g, 'i do not know')
    .replace(/\bwdym\b/g, 'what do you mean')
    .replace(/\btbh\b/g, 'to be honest')
    .replace(/\bimo\b/g, 'in my opinion')
    .replace(/\bngl\b/g, 'not gonna lie');
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function includesAll(text, terms) {
  return terms.every((term) => text.includes(term));
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function isTrustQuestion(text) {
  const trustPatterns = [
    'scam', 'legit', 'legitimate', 'fake', 'sketchy', 'sketch', 'fraud', 'ripoff', 'rip off',
    'trustworthy', 'can i trust', 'is this real', 'is swapio real', 'are you real',
    'is this safe', 'is it safe', 'too good to be true', 'pyramid', 'ponzi',
    'steal', 'stolen', 'rob me', 'cheat', 'cheating', 'suspicious', 'con artist',
    'is this legit', 'not a scam', 'no scam', 'actually legit', 'actually real',
    'sketch af', 'seems fake', 'seems sketchy', 'feel sketchy', 'worried', 'nervous',
    'sketch af', 'shady', 'dodgy', 'hoax', 'bs', 'cap',
  ];

  if (includesAny(text, trustPatterns)) return true;

  return /^(is this|are you|this|swapio)?\s*(a\s+)?(scam|fake|legit|real|safe)\??$/.test(text);
}

function isPersonalQuestion(text) {
  const personalPatterns = [
    'my order', 'my submission', 'my swap', 'track my', 'where is my', 'status of my',
    'my payout', 'my password', 'reset password', 'order code swp', 'swp-',
    'phone number', 'ssn', 'social security', 'credit card', 'debit card',
    'bank account number', 'routing number', 'login issue', 'cant log in', "can't log in",
    'locked out', 'wrong email on my', 'change my email', 'update my email',
    'my card was rejected', 'my card got rejected', 'my payout is late', 'my payout hasnt',
    "my payout hasn't", 'still waiting on my', 'haven t been paid', 'havent been paid',
  ];

  if (includesAny(text, personalPatterns)) return true;
  if (/\bswp[\s-]?\d{4,}\b/.test(text)) return true;

  return false;
}

function isAcknowledgment(text) {
  return /^(ok|okay|cool|got it|gotcha|k|nice|sounds good|perfect|great|alright|bet|ty|tysm|thanks|thank you|thx|appreciate it|that helps|makes sense|understood|i see|fair enough|good to know)\.?!?$/i.test(text);
}

function isGreeting(text) {
  return includesAny(text, [
    'hello', 'hi ', 'hey', 'howdy', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo ',
  ]) || /^(hi|hey|hello|yo|sup)\??$/.test(text);
}

function isFarewell(text) {
  return includesAny(text, ['bye', 'goodbye', 'see you', 'later', 'gotta go', 'have a good']);
}

function detectBrand(text) {
  const aliases = Object.entries(BRAND_ALIASES).sort((a, b) => b[0].length - a[0].length);
  for (const [alias, brand] of aliases) {
    if (text.includes(alias)) return brand;
  }

  if (typeof SWAPIO !== 'undefined' && Array.isArray(SWAPIO.giftCards)) {
    const brands = [...SWAPIO.giftCards].sort((a, b) => b.length - a.length);
    for (const brand of brands) {
      if (text.includes(brand.toLowerCase())) return brand;
    }
  }

  return null;
}

function parseDollarAmount(text) {
  const patterns = [
    /\$\s*(\d{1,4}(?:\.\d{1,2})?)/,
    /(\d{1,4}(?:\.\d{1,2})?)\s*(?:dollar|buck|usd)/,
    /(?:worth|balance|value|for)\s*(\d{1,4}(?:\.\d{1,2})?)/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match) continue;
    const amount = Number.parseFloat(match[1]);
    if (Number.isFinite(amount) && amount >= 10 && amount <= 5000) return amount;
  }

  return null;
}

function formatBrandList(limit = 10) {
  const brands = SWAPIO.giftCards.slice(0, limit);
  return `${brands.join(', ')}, and more`;
}

function getPayoutForBalance(balance) {
  if (typeof calculatePayout === 'function') return calculatePayout(balance);
  return Math.round(balance * (SWAPIO.payoutPercent / 100) * 100) / 100;
}

function getBrandRequirementSummary(brand) {
  if (typeof getCardRequirements === 'function') {
    const req = getCardRequirements(brand);
    const fields = req.fields.map((field) => field.label).join(' + ');
    let reply = `For ${brand}: ${req.hint}`;
    if (fields) reply += ` Enter your ${fields}.`;
    if (req.note) reply += ` ${req.note}`;
    return `${reply} Start at /sell-gift-card/ — the form shows exactly what your brand needs.`;
  }

  const type = {
    Visa: 'prepaid', Mastercard: 'prepaid', 'American Express': 'prepaid',
    Paysafecard: 'paysafecard', Amazon: 'amazon', Apple: 'apple', 'Google Play': 'google',
    Steam: 'steam', PlayStation: 'playstation', Xbox: 'xbox', 'Nintendo eShop': 'nintendo',
    Roblox: 'roblox', 'Discord Nitro': 'giftLink', Twitch: 'code', 'Riot Games': 'riot',
    Valorant: 'riot', 'Battle.net': 'code', Fortnite: 'code', EA: 'code', 'Razer Gold': 'razerGold',
    Minecraft: 'code', Netflix: 'codeOrLink', Spotify: 'code', 'YouTube Premium': 'code',
    Hulu: 'code', eBay: 'ebay', Uber: 'deliveryCode', 'Uber Eats': 'deliveryCode',
    DoorDash: 'deliveryCode', Airbnb: 'deliveryCode',
  }[brand] || 'retail';

  const fields = REQUIREMENT_FALLBACK[type] || REQUIREMENT_FALLBACK.retail;
  return `For ${brand}, you'll need your ${fields}. The sell form at /sell-gift-card/ walks you through it step by step.`;
}

function getPayoutMethodDetails(method) {
  const details = {
    PayPal: 'Enter the PayPal email where you want your payout sent. Most PayPal payouts complete within a day after verification.',
    'Cash App': 'Enter your $Cashtag (e.g. $YourName). Make sure it matches your active Cash App account.',
    Zelle: 'Enter the email linked to your Zelle account. Payouts go directly bank-to-bank.',
    Venmo: 'Enter the phone number linked to your Venmo account.',
    Bitcoin: 'Enter your Bitcoin wallet address (bc1..., 1..., or 3... format). Double-check it — crypto transfers cannot be reversed.',
    'Bank Transfer': 'Enter your routing number and account number for an ACH deposit. Verify both carefully before submitting.',
  };

  return details[method] || null;
}

function scoreIntent(text, rules) {
  let score = 0;

  for (const keyword of rules.keywords || []) {
    if (text.includes(keyword)) score += rules.keywordWeight || 2;
  }

  for (const pattern of rules.patterns || []) {
    if (pattern.test(text)) score += rules.patternWeight || 3;
  }

  if (rules.requires && !includesAny(text, rules.requires)) score = 0;
  if (rules.requiresAll && !includesAll(text, rules.requiresAll)) score = 0;

  for (const exclude of rules.exclude || []) {
    if (text.includes(exclude)) score -= 4;
  }

  if (rules.custom) score += rules.custom(text) || 0;

  return Math.max(0, score);
}

function getHelpMenu() {
  return [
    'I can help with:',
    '• Is Swapio legit / safe?',
    '• Fees and payout amounts (95% of balance)',
    '• Payout methods — PayPal, Cash App, Zelle, Venmo, Bitcoin, bank',
    '• Timing — most payouts within a day',
    '• Accepted brands and what info each one needs',
    '• How the swap process works',
    '',
    'Try: "How much for a $100 Amazon card?" or "What do I need for Discord Nitro?"',
  ].join('\n');
}

function buildTrustReply() {
  return [
    `No — Swapio is not a scam. We're a legitimate gift-card cash-out service.`,
    `Here's why people trust us:`,
    `• You see your exact ${SWAPIO.payoutPercent}% payout and ${SWAPIO.serviceFeePercent}% fee before submitting`,
    `• Every submission uses encrypted HTTPS`,
    `• Every card is verified before payout`,
    `• You get an order code (SWP-XXXXXX) immediately`,
    `• We never sell your personal information`,
    '',
    `Still unsure? Check /faq, read seller reviews on the homepage, or email ${SWAPIO.supportEmail}.`,
  ].join('\n');
}

function buildFeeReply(amount) {
  if (amount) {
    const payout = getPayoutForBalance(amount);
    const fee = Math.round((amount - payout) * 100) / 100;
    return `A $${amount} card pays out $${payout} — that's ${SWAPIO.payoutPercent}% of your balance. The ${SWAPIO.serviceFeePercent}% service fee ($${fee}) is shown upfront before you submit. No hidden charges.`;
  }

  return `Swapio pays ${SWAPIO.payoutPercent}% of your card balance. There's a flat ${SWAPIO.serviceFeePercent}% service fee shown upfront — a $100 card pays out $${SWAPIO.payoutPercent}, a $50 card pays $${getPayoutForBalance(50)}, a $200 card pays $${getPayoutForBalance(200)}. Enter your balance on the homepage for your exact offer.`;
}

function buildPayoutMethodsReply(method) {
  if (method && SWAPIO.payoutMethods.includes(method)) {
    const detail = getPayoutMethodDetails(method);
    return `${method} is one of our six payout options. ${detail}`;
  }

  return `We support ${SWAPIO.payoutMethods.join(', ')}. Pick your preferred method when starting a swap — most payouts go through within a day after verification. Each method has its own field on the sell form (PayPal email, $Cashtag, Zelle email, Venmo phone, Bitcoin address, or bank details).`;
}

function buildTimingReply() {
  return [
    'Most swaps are verified and paid within a day.',
    `Right after submitting you'll get an order code (SWP-XXXXXX) to reference your swap.`,
    'Occasionally verification takes a little longer — for example, if a card needs a closer look or balance confirmation.',
    'For order-specific timing, email support@swapio.cc with your order code.',
  ].join('\n');
}

function buildProcessReply() {
  return [
    'Here\'s how a Swapio swap works:',
    '1. Pick your brand and balance ($10–$5,000)',
    `2. See your ${SWAPIO.payoutPercent}% cash offer instantly`,
    '3. Submit your card details and payout info',
    '4. Get paid after verification — usually within a day',
    '',
    'Start on the homepage or go straight to /sell-gift-card/.',
  ].join('\n');
}

function buildProblemReply(text) {
  if (includesAny(text, ['reject', 'invalid', 'denied', 'declined', 'not accepted', 'wont work', "won't work"])) {
    return [
      'If a card can\'t be verified, common reasons are:',
      '• Already redeemed or partially used',
      '• Incorrect card number, PIN, or code',
      '• Balance doesn\'t match what was submitted',
      '• Card is expired or region-locked',
      '',
      'We\'ll reach out via the email you provided if there\'s an issue. You can also contact support@swapio.cc with your order code (SWP-XXXXXX).',
    ].join('\n');
  }

  if (includesAny(text, ['late', 'delayed', 'slow', 'hasnt arrived', "hasn't arrived", 'not received', 'still waiting', 'where is my money', 'when will i get paid'])) {
    return [
      'Most payouts complete within a day after verification.',
      'If it\'s been longer, email support@swapio.cc with your order code (SWP-XXXXXX) and payout method — the team can check status for you.',
      'I can\'t look up individual orders here, but support responds quickly.',
    ].join('\n');
  }

  if (includesAny(text, ['wrong', 'mistake', 'typo', 'incorrect payout', 'wrong paypal', 'wrong email', 'wrong address'])) {
    return 'If you submitted wrong payout details, email support@swapio.cc immediately with your order code (SWP-XXXXXX) and the correct info. The sooner you reach out, the better — especially before verification completes.';
  }

  if (includesAny(text, ['cancel', 'refund', 'undo', 'take back'])) {
    return 'To cancel or change a submission, email support@swapio.cc right away with your order code (SWP-XXXXXX). If verification hasn\'t started yet, changes are usually possible.';
  }

  return null;
}

const INTENTS = [
  {
    id: 'trust',
    priority: 100,
    keywords: ['scam', 'legit', 'fake', 'sketchy', 'fraud', 'trust', 'safe', 'real', 'shady'],
    custom: (text) => (isTrustQuestion(text) ? 12 : 0),
    reply: () => buildTrustReply(),
  },
  {
    id: 'personal',
    priority: 99,
    custom: (text) => (isPersonalQuestion(text) ? 20 : 0),
    reply: () => OFF_TOPIC_REPLY,
  },
  {
    id: 'off_topic',
    priority: 98,
    keywords: ['weather', 'recipe', 'joke', 'poem', 'homework', 'dating', 'politics', 'movie', 'song', 'sport', 'football', 'roblox hack', 'free vbucks'],
    patterns: [/bitcoin price/, /crypto price/, /stock price/, /who are you/, /what is ai/, /write (me )?code/],
    reply: () => "I'm only able to answer questions about Swapio and gift card swaps. What would you like to know about the site?",
  },
  {
    id: 'greeting',
    priority: 10,
    custom: (text) => (isGreeting(text) ? 8 : 0),
    reply: () => pickRandom([
      "Hey! I'm Swapio AI — ask me about fees, payout methods, accepted brands, or how swaps work.",
      "Hi there! I can walk you through how Swapio works, what cards we accept, and what you'll get paid.",
      "Hey! Happy to help with Swapio questions — payouts, timing, safety, or what info your card needs.",
    ]),
  },
  {
    id: 'farewell',
    priority: 10,
    custom: (text) => (isFarewell(text) ? 8 : 0),
    reply: () => pickRandom([
      'Take care! Start a swap anytime on the homepage or at /sell-gift-card/.',
      'Good luck with your swap! Reach out here or email support@swapio.cc if you need anything.',
      "Bye! Hope I could help — we're here whenever you're ready to swap.",
    ]),
  },
  {
    id: 'thanks',
    priority: 10,
    keywords: ['thank', 'thanks', 'thx', 'appreciate', 'helpful', 'awesome', 'amazing'],
    reply: () => pickRandom([
      "You're welcome! Start a swap on the homepage or at /sell-gift-card/ whenever you're ready.",
      'Glad I could help! Let me know if anything else comes up.',
      'Anytime! Good luck with your swap.',
    ]),
  },
  {
    id: 'help_menu',
    priority: 15,
    keywords: ['help', 'options', 'what can you', 'what do you know', 'commands', 'menu'],
    patterns: [/^(help|\?)$/],
    custom: (text) => (includesAny(text, ['i do not know', 'not sure what']) ? 6 : 0),
    reply: () => getHelpMenu(),
  },
  {
    id: 'brand_offer',
    priority: 85,
    custom: (text) => {
      const brand = detectBrand(text);
      const amount = parseDollarAmount(text);
      if (!brand || !amount) return 0;
      if (includesAny(text, ['how much', 'get', 'pay', 'worth', 'offer', 'receive', 'payout', 'for', 'sell'])) return 14;
      return 0;
    },
    reply: (text) => {
      const brand = detectBrand(text);
      const amount = parseDollarAmount(text);
      const payout = getPayoutForBalance(amount);
      return `A $${amount} ${brand} card pays out $${payout} (${SWAPIO.payoutPercent}% of balance). ${getBrandRequirementSummary(brand)}`;
    },
  },
  {
    id: 'brand_requirements',
    priority: 80,
    custom: (text) => {
      const brand = detectBrand(text);
      if (!brand) return 0;
      if (includesAny(text, ['need', 'require', 'enter', 'submit', 'info', 'what do i', 'pin', 'code', 'link', 'claim', 'format', 'how do i sell', 'sell my'])) return 10;
      if (includesAny(text, ['accept', 'take', 'swap', 'sell', 'cash'])) return 5;
      return 0;
    },
    reply: (text) => {
      const brand = detectBrand(text);
      chatState.lastBrand = brand;
      if (SWAPIO.giftCards.includes(brand)) {
        return `${getBrandRequirementSummary(brand)} We accept ${brand} — search for it on the homepage to confirm and see your offer.`;
      }
      return getBrandRequirementSummary(brand);
    },
  },
  {
    id: 'fee_calc',
    priority: 75,
    keywords: ['fee', 'percent', '5%', '95%', 'rate', 'offer', 'payout amount', 'cut', 'take', 'how much', 'worth', 'receive', 'get for'],
    exclude: ['bitcoin price', 'stock'],
    custom: (text) => (parseDollarAmount(text) ? 6 : 0),
    reply: (text) => buildFeeReply(parseDollarAmount(text)),
  },
  {
    id: 'payout_method',
    priority: 70,
    keywords: ['payout', 'paypal', 'cash app', 'zelle', 'venmo', 'bitcoin', 'bank transfer', 'ach', 'get paid', 'payment method', 'paid through', 'paid via'],
    exclude: ['bitcoin price'],
    custom: (text) => {
      for (const method of SWAPIO.payoutMethods) {
        if (text.includes(method.toLowerCase())) return 5;
      }
      return 0;
    },
    reply: (text) => {
      for (const method of SWAPIO.payoutMethods) {
        if (text.includes(method.toLowerCase())) return buildPayoutMethodsReply(method);
      }
      return buildPayoutMethodsReply();
    },
  },
  {
    id: 'timing',
    priority: 65,
    keywords: ['how long', 'timing', 'when do i get', 'how fast', 'how quick', 'speed', 'wait', 'long does', 'within a day', 'same day', 'instant'],
    exclude: ['bitcoin price'],
    patterns: [/\bhow long\b/, /\bwhen.*paid\b/, /\bwhen.*payout\b/],
    reply: () => buildTimingReply(),
  },
  {
    id: 'security',
    priority: 60,
    keywords: ['secure', 'security', 'encrypted', 'https', 'privacy', 'data', 'information sell', 'sell my data', 'personal info'],
    reply: () => [
      'All submissions use encrypted HTTPS.',
      'Your exact offer is shown before you commit, every card is verified before payout, and we do not sell your personal information.',
      'Read more at /privacy or /faq.',
    ].join('\n'),
  },
  {
    id: 'verification',
    priority: 55,
    keywords: ['card verification', 'verify my card', 'how do you verify', 'verification process', 'why verify', 'what is verification', 'check balance', 'validate'],
    reply: () => [
      'We verify every gift card before sending your payout.',
      'That means checking the balance, validity, and whether it\'s already been redeemed.',
      'This protects both you and us. Most verified swaps pay out within a day.',
    ].join('\n'),
  },
  {
    id: 'limits',
    priority: 50,
    keywords: ['minimum', 'maximum', 'limit', '$10', '$5000', '10 dollar', '5000', 'too small', 'too big'],
    patterns: [/\bmin(?:imum)?\b/, /\bmax(?:imum)?\b/],
    custom: (text) => (text.includes('balance') && !includesAny(text, ['check', 'wrong', 'incorrect']) ? 3 : 0),
    reply: () => 'Accepted balances range from $10 to $5,000. Enter your amount on the homepage to see your exact offer before committing — no surprises.',
  },
  {
    id: 'problems',
    priority: 72,
    keywords: ['reject', 'invalid', 'denied', 'declined', 'late', 'delayed', 'not received', 'still waiting', 'wrong', 'mistake', 'cancel', 'refund', 'undo', 'already redeemed', 'doesnt work', "doesn't work", 'expired'],
    reply: (text) => buildProblemReply(text) || buildTimingReply(),
  },
  {
    id: 'comparison',
    priority: 45,
    keywords: ['better than', 'vs ', 'versus', 'cardcash', 'raise', 'gameflip', 'other site', 'why swapio', 'why use', 'difference', 'compared to', 'best site'],
    reply: () => [
      'What sets Swapio apart:',
      `• ${SWAPIO.payoutPercent}% payout — shown upfront before you submit`,
      `• Flat ${SWAPIO.serviceFeePercent}% fee — no hidden charges`,
      '• 60+ accepted brands',
      `• Six payout methods: ${SWAPIO.payoutMethods.join(', ')}`,
      '• Most payouts within a day',
      '• Clean, simple process with order codes for tracking',
      '',
      'Try the homepage calculator to see your exact offer — it takes under a minute.',
    ].join('\n'),
  },
  {
    id: 'account',
    priority: 40,
    keywords: ['account', 'dashboard', 'log in', 'login', 'sign up', 'signup', 'register', 'guest', 'without account', 'no account', 'optional'],
    reply: (text) => {
      if (includesAny(text, ['guest', 'without account', 'no account', 'optional'])) {
        return 'An account is completely optional. You can swap as a guest and track everything with your order code (SWP-XXXXXX). Create a free account at /signup if you want submissions saved to your /dashboard.';
      }
      return 'You can create a free account at /signup to track submissions on your /dashboard — but it\'s optional. Guest swaps work fine; just save your order code (SWP-XXXXXX) to follow up with support.';
    },
  },
  {
    id: 'multiple_cards',
    priority: 40,
    keywords: ['multiple', 'more than one', 'two cards', 'several', 'bulk', 'lot of cards'],
    reply: () => 'You can submit cards one at a time through the swap form. Each submission gets its own order code (SWP-XXXXXX). If you have several cards, just run through the process for each — same payout method works for all of them.',
  },
  {
    id: 'physical_digital',
    priority: 40,
    keywords: ['physical', 'digital', 'egift', 'e-gift', 'email card', 'plastic', 'in hand'],
    reply: () => 'We accept both physical and digital gift cards. The info needed is the same — card number and PIN, or the digital code/link from your email. The sell form shows exactly what your brand requires.',
  },
  {
    id: 'process',
    priority: 35,
    keywords: ['how does', 'how it work', 'how do i', 'process', 'steps', 'start', 'submit', 'swap', 'sell', 'work'],
    exclude: ['sell my data'],
    reply: () => buildProcessReply(),
  },
  {
    id: 'order_code',
    priority: 35,
    keywords: ['order code', 'swp', 'track', 'reference', 'confirmation', 'confirmation number'],
    exclude: ['swp-'],
    reply: () => "After submitting you'll get an order code like SWP-XXXXXX. Save it — that's your reference for support. For order-specific help, email support@swapio.cc with that code.",
  },
  {
    id: 'contact',
    priority: 30,
    keywords: ['contact', 'email', 'reach', 'human', 'real person', 'talk to someone', 'speak to', 'support team', 'customer service'],
    reply: () => `Reach us at ${SWAPIO.supportEmail} or through /contact. Include your order code (SWP-XXXXXX) if you have an active swap — that helps us find your submission fast.`,
  },
  {
    id: 'about',
    priority: 25,
    keywords: ['what is swapio', 'about swapio', 'who is swapio', 'tell me about'],
    custom: (text) => (/^swapio\??$/.test(text) ? 9 : 0),
    reply: () => [
      `Swapio turns unused gift cards into real cash.`,
      `You get ${SWAPIO.payoutPercent}% of your card value via ${SWAPIO.payoutMethods.join(', ')}.`,
      '60+ brands, transparent fees, and most payouts within a day.',
      'Start at the homepage or read the full walkthrough at /guide.',
    ].join('\n'),
  },
  {
    id: 'brands_general',
    priority: 20,
    keywords: ['brand', 'accept', 'which card', 'what card', 'gift card', 'cards do you', 'do you take', 'do you buy'],
    reply: () => `We accept 60+ brands including ${formatBrandList()}. Search for yours on the homepage swap box — if it's listed, you're good to go.`,
  },
  {
    id: 'resources',
    priority: 15,
    keywords: ['guide', 'faq', 'article', 'read more', 'learn more', 'documentation'],
    reply: () => 'Dig deeper at /guide (step-by-step walkthrough), /faq (common questions), and /articles/ (tips on selling gift cards safely).',
  },
];

function handleFollowUp(text) {
  const { lastIntent, lastBrand } = chatState;
  const amount = parseDollarAmount(text);

  if (amount && lastBrand && includesAny(text, ['how much', 'worth', 'get', 'pay', 'offer', 'for'])) {
    const payout = getPayoutForBalance(amount);
    return `A $${amount} ${lastBrand} card pays out $${payout} (${SWAPIO.payoutPercent}% of balance). ${getBrandRequirementSummary(lastBrand)}`;
  }

  if (includesAny(text, ['fee', 'fees', 'percent', '5%', '95%', 'how much'])) {
    return buildFeeReply(amount);
  }

  if (includesAny(text, ['long', 'timing', 'when', 'fast', 'speed', 'wait'])) {
    return buildTimingReply();
  }

  if (isTrustQuestion(text) || includesAny(text, ['safe', 'scam', 'legit'])) {
    return buildTrustReply();
  }

  if (includesAny(text, ['how', 'process', 'steps', 'work'])) {
    return buildProcessReply();
  }

  if (includesAny(text, ['need', 'require', 'info', 'enter']) && lastBrand) {
    return getBrandRequirementSummary(lastBrand);
  }

  if (lastIntent === 'brand_requirements' && lastBrand) {
    return getBrandRequirementSummary(lastBrand);
  }

  for (const method of SWAPIO.payoutMethods) {
    if (text.includes(method.toLowerCase()) || (text.length < 20 && lastIntent === 'payout_method')) {
      return buildPayoutMethodsReply(method);
    }
  }

  if (includesAny(text, ['yes', 'yeah', 'yep', 'sure', 'please', 'tell me', 'more', 'go on', 'continue'])) {
    const expanders = {
      trust: buildTrustReply,
      fee_calc: () => buildFeeReply(100),
      payout_method: () => buildPayoutMethodsReply(),
      timing: buildTimingReply,
      process: buildProcessReply,
      brand_requirements: () => (lastBrand ? getBrandRequirementSummary(lastBrand) : buildProcessReply()),
    };
    if (expanders[lastIntent]) return expanders[lastIntent]();
  }

  if (includesAny(text, ['why', 'reason', 'explain'])) {
    const explainers = {
      trust: () => 'We show your exact payout before you submit anything — no bait-and-switch. Verification protects against fraud on both sides. Order codes give you a paper trail. And we never sell your data.',
      fee_calc: () => `The ${SWAPIO.serviceFeePercent}% fee covers verification, processing, and payout handling. You always see it upfront — what you see is what you get.`,
      verification: () => 'Verification confirms your card is real, has the stated balance, and hasn\'t been redeemed. Without it, neither side is protected.',
      timing: () => 'Verification usually takes a few hours. Once approved, payout is sent right away — most people see funds within a day total.',
    };
    if (explainers[lastIntent]) return explainers[lastIntent]();
  }

  return null;
}

function getFallbackReply(text) {
  const hints = [];

  if (text.includes('card') || text.includes('brand')) hints.push('accepted brands');
  if (text.includes('pay') || text.includes('money') || text.includes('cash')) hints.push('payout methods');
  if (text.includes('long') || text.includes('when')) hints.push('timing');
  if (isTrustQuestion(text) || text.includes('safe')) hints.push('safety');

  if (hints.length) {
    return `I'm not sure I caught that. I can help with ${hints.join(', ')}, fees, and how swaps work. Try asking something like "How much for a $100 card?" or "Is Swapio legit?"`;
  }

  return [
    "I didn't quite get that one.",
    'Try asking about:',
    '• "Is this a scam?"',
    '• "How much for a $50 Amazon card?"',
    '• "What payout methods do you have?"',
    '• "What do I need for Discord Nitro?"',
    '',
    'For order-specific help, email support@swapio.cc with your order code.',
  ].join('\n');
}

function matchIntents(text) {
  return INTENTS
    .map((intent) => ({
      intent,
      score: scoreIntent(text, intent) + (intent.priority || 0) * 0.01,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
}

function generateSupportReply(message) {
  const raw = String(message).trim();
  let text = normalizeText(expandSlang(raw));

  if (!text) {
    return 'Ask me anything about Swapio — payouts, fees, accepted brands, timing, or how the swap process works.';
  }

  chatState.userMessageCount += 1;
  chatState.history.push({ role: 'user', text: raw });
  if (chatState.history.length > 8) chatState.history.shift();

  if (isAcknowledgment(text)) {
    const reply = pickRandom([
      'Glad I could help! Let me know if anything else comes up.',
      'Anytime! Good luck with your swap.',
      'Happy to help — start whenever you\'re ready at /sell-gift-card/.',
    ]);
    chatState.lastReply = reply;
    return reply;
  }

  const followUp = handleFollowUp(text);
  if (followUp && chatState.lastIntent && (text.length < 40 || includesAny(text, ['what about', 'and', 'also', 'ok but', 'yeah but']))) {
    chatState.lastReply = followUp;
    return followUp;
  }

  const matches = matchIntents(text);

  if (matches.length === 0) {
    const fallback = getFallbackReply(text);
    chatState.lastReply = fallback;
    return fallback;
  }

  const top = matches[0];
  const second = matches[1];
  let reply = top.intent.reply(text);
  let intentId = top.intent.id;

  if (second && top.score - second.score < 3 && second.score >= 5 && top.intent.id !== second.intent.id) {
    const secondReply = second.intent.reply(text);
    if (secondReply && secondReply !== reply) {
      reply = `${reply}\n\n${secondReply}`;
      intentId = `${top.intent.id}+${second.intent.id}`;
    }
  }

  const brand = detectBrand(text);
  if (brand) chatState.lastBrand = brand;

  chatState.lastIntent = intentId;
  chatState.lastReply = reply;
  chatState.history.push({ role: 'agent', text: reply, intent: intentId });

  return reply;
}

function getTypingDelay(text) {
  const words = String(text).split(/\s+/).length;
  const base = SUPPORT_CHAT.typingMin + Math.min(words * 40, 800);
  const jitter = Math.random() * (SUPPORT_CHAT.typingMax - SUPPORT_CHAT.typingMin);
  return base + jitter * 0.5;
}

function getSupportChatHtml() {
  return `
    <div id="support-chat-root" class="support-chat-root" aria-live="polite">
      <button
        type="button"
        id="support-chat-toggle"
        class="support-chat-toggle"
        aria-expanded="false"
        aria-controls="support-chat-panel"
        aria-label="Open AI chat"
      >
        <svg class="support-chat-toggle-icon support-chat-toggle-icon--open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
        <svg class="support-chat-toggle-icon support-chat-toggle-icon--close hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        <span class="support-chat-toggle-pulse" aria-hidden="true"></span>
      </button>

      <div id="support-chat-panel" class="support-chat-panel" role="dialog" aria-label="Swapio AI chat" aria-hidden="true">
        <div class="support-chat-header">
          <div class="support-chat-header-info">
            <div class="support-chat-avatar support-chat-avatar--ai" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.59.659H9.06a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V17a2 2 0 01-2 2H7a2 2 0 01-2-2v-2.5"/>
              </svg>
            </div>
            <div>
              <p class="support-chat-agent">${SUPPORT_CHAT.agentName}</p>
              <p class="support-chat-status"><span class="support-chat-online-dot" aria-hidden="true"></span> ${SUPPORT_CHAT.agentLabel}</p>
            </div>
          </div>
          <button type="button" id="support-chat-close" class="support-chat-close" aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div id="support-chat-messages" class="support-chat-messages" role="log" aria-relevant="additions"></div>

        <div id="support-chat-suggestions" class="support-chat-suggestions" hidden></div>

        <form id="support-chat-form" class="support-chat-form">
          <input
            type="text"
            id="support-chat-input"
            class="support-chat-input"
            placeholder="Ask Swapio AI..."
            autocomplete="off"
            maxlength="500"
            aria-label="Message"
          >
          <button type="submit" class="support-chat-send" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  `;
}

function appendChatMessage(container, { text, sender, isTyping = false }) {
  const row = document.createElement('div');
  row.className = `support-chat-message support-chat-message--${sender}${isTyping ? ' support-chat-message--typing' : ''}`;

  if (isTyping) {
    row.innerHTML = `
      <div class="support-chat-bubble support-chat-bubble--agent">
        <span class="support-chat-typing" aria-label="Swapio AI is typing">
          <span></span><span></span><span></span>
        </span>
      </div>
    `;
  } else {
    row.innerHTML = `
      <div class="support-chat-bubble support-chat-bubble--${sender === 'user' ? 'user' : 'agent'}">${escapeChatHtml(text)}</div>
    `;
  }

  container.appendChild(row);
  container.scrollTop = container.scrollHeight;
  return row;
}

function escapeChatHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

function renderSuggestions(container, onSelect) {
  if (!container || chatState.userMessageCount > 0) {
    container.hidden = true;
    container.innerHTML = '';
    return;
  }

  container.hidden = false;
  container.innerHTML = SUPPORT_CHAT.suggestions
    .map(
      (label) =>
        `<button type="button" class="support-chat-suggestion" data-suggestion="${label.replace(/"/g, '&quot;')}">${escapeChatHtml(label)}</button>`
    )
    .join('');

  container.querySelectorAll('[data-suggestion]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-suggestion');
      if (value) onSelect(value);
    });
  });
}

let chatAnimating = false;

function updateChatToggleUi(isOpen) {
  const toggle = document.getElementById('support-chat-toggle');
  if (!toggle) return;

  const iconOpen = toggle.querySelector('.support-chat-toggle-icon--open');
  const iconClose = toggle.querySelector('.support-chat-toggle-icon--close');
  const pulse = toggle.querySelector('.support-chat-toggle-pulse');

  toggle.classList.toggle('support-chat-toggle--active', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close AI chat' : 'Open AI chat');
  iconOpen?.classList.toggle('hidden', isOpen);
  iconClose?.classList.toggle('hidden', !isOpen);
  pulse?.classList.toggle('hidden', isOpen);
}

function setChatOpen(isOpen) {
  const panel = document.getElementById('support-chat-panel');
  if (!panel || chatAnimating) return;

  const isCurrentlyOpen = panel.classList.contains('support-chat-panel--open');
  if (isOpen === isCurrentlyOpen) return;

  if (isOpen) {
    panel.classList.remove('support-chat-panel--closing');
    panel.setAttribute('aria-hidden', 'false');
    updateChatToggleUi(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.classList.add('support-chat-panel--open');
      });
    });
    setTimeout(() => document.getElementById('support-chat-input')?.focus(), 360);
    return;
  }

  chatAnimating = true;
  updateChatToggleUi(false);
  panel.classList.remove('support-chat-panel--open');
  panel.classList.add('support-chat-panel--closing');

  let finished = false;
  const finishClose = () => {
    if (finished) return;
    finished = true;
    panel.classList.remove('support-chat-panel--closing');
    panel.setAttribute('aria-hidden', 'true');
    chatAnimating = false;
  };

  const onEnd = (event) => {
    if (event.target !== panel || event.propertyName !== 'opacity') return;
    panel.removeEventListener('transitionend', onEnd);
    finishClose();
  };

  panel.addEventListener('transitionend', onEnd);
  setTimeout(finishClose, SUPPORT_CHAT.closeDuration + 100);
}

function initSupportChat() {
  if (document.getElementById('support-chat-root')) return;

  document.body.insertAdjacentHTML('beforeend', getSupportChatHtml());

  const root = document.getElementById('support-chat-root');
  const toggle = document.getElementById('support-chat-toggle');
  const closeBtn = document.getElementById('support-chat-close');
  const panel = document.getElementById('support-chat-panel');
  const messages = document.getElementById('support-chat-messages');
  const suggestions = document.getElementById('support-chat-suggestions');
  const form = document.getElementById('support-chat-form');
  const input = document.getElementById('support-chat-input');

  let welcomed = false;
  let responding = false;

  const isOpen = () => panel.classList.contains('support-chat-panel--open');

  const sendAgentReply = (text) => {
    const typingRow = appendChatMessage(messages, { sender: 'agent', isTyping: true });

    setTimeout(() => {
      typingRow.remove();
      appendChatMessage(messages, { sender: 'agent', text });
      responding = false;
      input.disabled = false;
      renderSuggestions(suggestions, handleUserMessage);
      if (isOpen()) input.focus();
    }, getTypingDelay(text));
  };

  const handleUserMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || responding) return;

    appendChatMessage(messages, { sender: 'user', text: trimmed });
    input.value = '';
    input.disabled = true;
    responding = true;
    renderSuggestions(suggestions, handleUserMessage);

    sendAgentReply(generateSupportReply(trimmed));
  };

  const maybeWelcome = () => {
    if (welcomed) return;
    welcomed = true;
    setTimeout(() => {
      sendAgentReply(
        "Hi! I'm Swapio AI. Ask me about fees, payout methods, accepted brands, timing, or whether Swapio is legit — I'm here to help."
      );
    }, SUPPORT_CHAT.welcomeDelay);
  };

  renderSuggestions(suggestions, handleUserMessage);

  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !isOpen();
    setChatOpen(willOpen);
    if (willOpen) maybeWelcome();
  });

  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setChatOpen(false);
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserMessage(input.value);
  });

  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    if (root?.contains(e.target)) return;
    setChatOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setChatOpen(false);
    }
  });
}