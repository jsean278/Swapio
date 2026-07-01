/* Gift card field requirements by brand */

const CARD_FIELD_TYPES = {
  prepaid: {
    label: 'Prepaid Card',
    hint: 'Open-loop prepaid card — we need the full card details to verify balance.',
    fields: [
      { name: 'cardNumber', label: 'Card Number', placeholder: '16-digit card number', required: true },
      { name: 'expirationDate', label: 'Expiration Date', placeholder: 'MM/YY', required: true, inputMode: 'numeric' },
      { name: 'cvv', label: 'CVV', placeholder: '3 or 4 digit security code', required: true, inputMode: 'numeric' },
    ],
  },
  paysafecard: {
    label: 'Paysafecard',
    hint: 'Paysafecard uses a 16-digit PIN — not a traditional card number.',
    fields: [
      { name: 'pin', label: '16-Digit PIN', placeholder: 'Enter your Paysafecard PIN', required: true },
    ],
  },
  amazon: {
    label: 'Amazon',
    hint: 'Amazon gift cards use a claim code, not a card number.',
    fields: [
      { name: 'claimCode', label: 'Claim Code', placeholder: 'XXXX-XXXXXX-XXXX', required: true },
    ],
  },
  apple: {
    label: 'Apple',
    hint: 'Apple gift cards use a code from the back of the card.',
    note: 'Digital code by email? Leave PIN blank. Physical card? Include the 4-digit PIN from the back.',
    fields: [
      { name: 'cardCode', label: 'Gift Card Code', placeholder: 'Enter code from back of card', required: true },
      { name: 'pin', label: 'PIN', placeholder: '4-digit PIN (physical cards only)', required: false },
    ],
  },
  google: {
    label: 'Google Play',
    hint: 'Google Play gift cards use a redemption code from your email or receipt.',
    fields: [
      { name: 'giftCode', label: 'Gift Code', placeholder: 'Enter Google Play gift code', required: true },
    ],
  },
  giftLink: {
    label: 'Gift Link',
    hint: 'This brand uses a gift link — not a redemption code. Paste the full URL from your email.',
    fields: [
      { name: 'giftLink', label: 'Gift Link', placeholder: 'https://discord.gift/xxxxxxxx', required: true, validate: 'url' },
    ],
  },
  codeOrLink: {
    label: 'Code or Redemption Link',
    hint: 'Paste the gift card code from the back of the card, your email, or the SMS redemption link.',
    fields: [
      { name: 'redemptionCode', label: 'Gift Card Code or Link', placeholder: 'Code or https://... redemption link', required: true, validate: 'codeOrLink' },
    ],
  },
  steam: {
    label: 'Steam',
    hint: 'Steam Wallet codes look like XXXXX-XXXXX-XXXXX.',
    fields: [
      { name: 'redemptionCode', label: 'Steam Wallet Code', placeholder: 'XXXXX-XXXXX-XXXXX', required: true },
    ],
  },
  playstation: {
    label: 'PlayStation',
    hint: 'PlayStation Store codes are 12 characters (letters and numbers).',
    fields: [
      { name: 'redemptionCode', label: 'PSN Code', placeholder: '12-character code', required: true },
    ],
  },
  xbox: {
    label: 'Xbox',
    hint: 'Microsoft/Xbox gift cards use a 25-character redemption code.',
    fields: [
      { name: 'redemptionCode', label: 'Xbox Code', placeholder: '25-character code', required: true },
    ],
  },
  nintendo: {
    label: 'Nintendo eShop',
    hint: 'Nintendo eShop download codes are 16 characters.',
    fields: [
      { name: 'redemptionCode', label: 'eShop Download Code', placeholder: '16-character code', required: true },
    ],
  },
  riot: {
    label: 'Riot Games',
    hint: 'Riot prepaid cards use a Riot Access Code redeemed at redeem.riotgames.com.',
    fields: [
      { name: 'redemptionCode', label: 'Riot Access Code', placeholder: 'Enter your Riot prepaid code', required: true },
    ],
  },
  roblox: {
    label: 'Roblox',
    hint: 'Roblox gift cards use a code from the back of the card or your digital receipt.',
    fields: [
      { name: 'redemptionCode', label: 'Roblox Code', placeholder: 'Enter Roblox gift card code', required: true },
    ],
  },
  ebay: {
    label: 'eBay',
    hint: 'eBay gift cards need the redemption code and security code from the back of the card.',
    fields: [
      { name: 'redemptionCode', label: 'Redemption Code', placeholder: '13-digit redemption code', required: true },
      { name: 'pin', label: 'Security Code', placeholder: '4-digit security code', required: true, inputMode: 'numeric' },
    ],
  },
  razerGold: {
    label: 'Razer Gold',
    hint: 'Razer Gold PINs are redeemed at gold.razer.com — not a store gift card number.',
    fields: [
      { name: 'pin', label: 'Razer Gold PIN', placeholder: 'Enter your Razer Gold PIN', required: true },
    ],
  },
  deliveryCode: {
    label: 'Delivery Gift Card',
    hint: 'Enter the gift card code from your email or the app — not a share link unless that is all you received.',
    fields: [
      { name: 'redemptionCode', label: 'Gift Card Code', placeholder: 'Enter gift card code', required: true },
    ],
  },
  code: {
    label: 'Digital Code',
    hint: 'Paste the digital redemption code from your card, email, or receipt.',
    fields: [
      { name: 'redemptionCode', label: 'Redemption Code', placeholder: 'Enter your gift card code', required: true },
    ],
  },
  retail: {
    label: 'Retail Gift Card',
    hint: 'Physical or digital store gift card — we need the card number and PIN from the back.',
    fields: [
      { name: 'cardNumber', label: 'Card Number', placeholder: 'Number on front or back of card', required: true },
      { name: 'pin', label: 'PIN / Security Code', placeholder: 'Scratch-off PIN on back of card', required: true },
    ],
  },
};

const BRAND_REQUIREMENT_MAP = {
  'Visa': 'prepaid',
  'Mastercard': 'prepaid',
  'American Express': 'prepaid',
  'Paysafecard': 'paysafecard',
  'Amazon': 'amazon',
  'Apple': 'apple',
  'Google Play': 'google',
  'Steam': 'steam',
  'PlayStation': 'playstation',
  'Xbox': 'xbox',
  'Nintendo eShop': 'nintendo',
  'Roblox': 'roblox',
  'Discord Nitro': 'giftLink',
  'Twitch': 'code',
  'Riot Games': 'riot',
  'Valorant': 'riot',
  'Battle.net': 'code',
  'Fortnite': 'code',
  'EA': 'code',
  'Razer Gold': 'razerGold',
  'Minecraft': 'code',
  'Netflix': 'codeOrLink',
  'Spotify': 'code',
  'YouTube Premium': 'code',
  'Hulu': 'code',
  'eBay': 'ebay',
  'Uber': 'deliveryCode',
  'Uber Eats': 'deliveryCode',
  'DoorDash': 'deliveryCode',
  'Airbnb': 'deliveryCode',
  'Hotels.com': 'code',
  'Expedia': 'code',
  'Walmart': 'retail',
  'Target': 'retail',
  'Best Buy': 'retail',
  'Costco': 'retail',
  'Nike': 'retail',
  'Adidas': 'retail',
  'Sephora': 'retail',
  'Ulta Beauty': 'retail',
  "Macy's": 'retail',
  'Nordstrom': 'retail',
  'H&M': 'retail',
  'Zara': 'retail',
  'Starbucks': 'retail',
  "McDonald's": 'retail',
  'Chipotle': 'retail',
  'Chick-fil-A': 'retail',
  'Subway': 'retail',
  "Domino's": 'retail',
  'CVS': 'retail',
  'Walgreens': 'retail',
  "Kohl's": 'retail',
  'TJ Maxx': 'retail',
  'Marshalls': 'retail',
  'GameStop': 'retail',
  'Newegg': 'retail',
  'IKEA': 'retail',
  "Lowe's": 'retail',
  'Home Depot': 'retail',
};

function getCardRequirements(brand) {
  const type = BRAND_REQUIREMENT_MAP[brand] || 'retail';
  return CARD_FIELD_TYPES[type];
}

const PAYOUT_FIELDS = {
  'PayPal': [
    { name: 'paypalEmail', label: 'PayPal Email', placeholder: 'yourname@email.com', type: 'email', required: true },
  ],
  'Cash App': [
    { name: 'cashtag', label: 'Cash App $Cashtag', placeholder: '$YourCashtag', required: true },
  ],
  'Zelle': [
    { name: 'zelleEmail', label: 'Zelle Email', placeholder: 'Email linked to your Zelle account', type: 'email', required: true },
  ],
  'Venmo': [
    { name: 'venmoPhone', label: 'Venmo Phone Number', placeholder: '(555) 123-4567', inputMode: 'tel', required: true },
  ],
  'Bitcoin': [
    { name: 'bitcoinAddress', label: 'Bitcoin Address', placeholder: 'bc1... or 1... or 3...', type: 'bitcoin', required: true },
  ],
  'Bank Transfer': [
    { name: 'routingNumber', label: 'Routing Number', placeholder: '9-digit routing number', inputMode: 'numeric', required: true },
    { name: 'accountNumber', label: 'Account Number', placeholder: 'Your bank account number', inputMode: 'numeric', required: true },
  ],
};

function getPayoutFields(method) {
  return PAYOUT_FIELDS[method] || [];
}