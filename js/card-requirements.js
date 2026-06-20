/* Gift card field requirements by brand */

const CARD_FIELD_TYPES = {
  prepaid: {
    label: 'Prepaid Card',
    fields: [
      { name: 'cardNumber', label: 'Card Number', placeholder: '16-digit card number', required: true },
      { name: 'expirationDate', label: 'Expiration Date', placeholder: 'MM/YY', required: true, inputMode: 'numeric' },
      { name: 'cvv', label: 'CVV', placeholder: '3 or 4 digit security code', required: true, inputMode: 'numeric' },
    ],
  },
  paysafecard: {
    label: 'Paysafecard',
    fields: [
      { name: 'pin', label: '16-Digit PIN', placeholder: 'Enter your Paysafecard PIN', required: true },
    ],
  },
  code: {
    label: 'Digital Code',
    fields: [
      { name: 'redemptionCode', label: 'Redemption Code', placeholder: 'Enter your gift card code', required: true },
    ],
  },
  amazon: {
    label: 'Amazon',
    fields: [
      { name: 'claimCode', label: 'Claim Code', placeholder: 'XXXX-XXXXXX-XXXX', required: true },
    ],
  },
  apple: {
    label: 'Apple',
    fields: [
      { name: 'cardCode', label: 'Gift Card Code', placeholder: 'Enter code from back of card', required: true },
      { name: 'pin', label: 'PIN', placeholder: '4-digit PIN (if physical card)', required: false },
    ],
  },
  google: {
    label: 'Google Play',
    fields: [
      { name: 'giftCode', label: 'Gift Code', placeholder: 'Enter Google Play gift code', required: true },
    ],
  },
  retail: {
    label: 'Retail Gift Card',
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
  'Steam': 'code',
  'PlayStation': 'code',
  'Xbox': 'code',
  'Nintendo eShop': 'code',
  'Roblox': 'code',
  'Discord Nitro': 'code',
  'Twitch': 'code',
  'Riot Games': 'code',
  'Valorant': 'code',
  'Battle.net': 'code',
  'Fortnite': 'code',
  'EA': 'code',
  'Razer Gold': 'code',
  'Minecraft': 'code',
  'Netflix': 'code',
  'Spotify': 'code',
  'YouTube Premium': 'code',
  'Hulu': 'code',
  'eBay': 'code',
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
    { name: 'bitcoinAddress', label: 'Bitcoin Address', placeholder: 'Your BTC wallet address', required: true },
  ],
  'Bank Transfer': [
    { name: 'routingNumber', label: 'Routing Number', placeholder: '9-digit routing number', inputMode: 'numeric', required: true },
    { name: 'accountNumber', label: 'Account Number', placeholder: 'Your bank account number', inputMode: 'numeric', required: true },
  ],
};

function getPayoutFields(method) {
  return PAYOUT_FIELDS[method] || [];
}