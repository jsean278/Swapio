/* Swapio — Fake live support chat (site-scoped assistant) */

const SUPPORT_CHAT = {
  agentName: 'Sophie R.',
  agentFirstName: 'Sophie',
  agentInitials: 'SR',
  welcomeDelay: 900,
  typingMin: 700,
  typingMax: 1800,
};

const OFF_TOPIC_REPLY =
  "I can only help with general Swapio questions here — things like how swaps work, fees, and payout options. For personal order help, email support@swapio.cc with your order code (SWP-XXXXXX) and the team will take a look.";

function normalizeText(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s$%]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function formatBrandList(limit = 12) {
  const brands = SWAPIO.giftCards.slice(0, limit);
  return `${brands.join(', ')}, and more`;
}

function generateSupportReply(message) {
  const text = normalizeText(message);
  const { agentFirstName } = SUPPORT_CHAT;

  if (!text) {
    return `Go ahead and ask — happy to help with anything about how Swapio works.`;
  }

  const personalPatterns = [
    'my order', 'my account', 'my email', 'my password', 'my card number',
    'my payout', 'track my', 'where is my', 'status of my', 'login issue',
    'sign in', 'sign up', 'reset password', 'my submission', 'my swap',
    'order code swp', 'swp-', 'phone number', 'address', 'ssn', 'social security',
    'credit card', 'debit card', 'bank account number', 'routing number',
  ];

  if (includesAny(text, personalPatterns)) {
    return OFF_TOPIC_REPLY;
  }

  const offTopicPatterns = [
    'weather', 'recipe', 'joke', 'poem', 'stock', 'crypto price', 'bitcoin price',
    'who are you', 'what is ai', 'write code', 'homework', 'dating', 'relationship',
    'politics', 'president', 'movie', 'song', 'sport', 'football', 'basketball',
    'valorant', 'riot shop', 'fortnite vbucks', 'roblox hack',
  ];

  if (includesAny(text, offTopicPatterns)) {
    return `I'm only able to help with Swapio — gift card swaps, payouts, fees, and that kind of thing. What would you like to know about the site?`;
  }

  if (includesAny(text, ['hello', 'hi ', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
    return `Hey! I'm ${agentFirstName} from Swapio support. Ask me anything about how swaps work, payout options, fees, or accepted brands.`;
  }

  if (includesAny(text, ['thank', 'thanks', 'thx', 'appreciate'])) {
    return `Of course! Let me know if anything else comes up. When you're ready, you can start a swap on the homepage or at /sell-gift-card/.`;
  }

  if (includesAny(text, ['contact', 'email', 'reach', 'human', 'real person', 'talk to someone', 'speak to'])) {
    return `You can reach the team at ${SWAPIO.supportEmail} or through our Reach Us page at /contact. If you have an active swap, include your order code (SWP-XXXXXX).`;
  }

  if (includesAny(text, ['fee', 'percent', '5%', '95%', 'how much', 'rate', 'offer', 'payout amount', 'cut', 'take'])) {
    return `Swapio pays ${SWAPIO.payoutPercent}% of your card balance — there's a flat ${SWAPIO.serviceFeePercent}% service fee, and you see the exact amount before you submit. So a $100 card pays out $${SWAPIO.payoutPercent}.`;
  }

  if (includesAny(text, ['payout', 'paypal', 'cash app', 'zelle', 'venmo', 'bitcoin', 'bank transfer', 'ach', 'get paid', 'payment method'])) {
    return `We offer ${SWAPIO.payoutMethods.join(', ')}. Pick whichever you prefer when you start a swap — most payouts go through within a few hours after verification.`;
  }

  if (includesAny(text, ['how long', 'timing', 'time', 'hours', 'fast', 'speed', 'when do i get', 'wait', 'long does'])) {
    return `Most swaps are verified and paid within hours. You'll get an order code (SWP-XXXXXX) right after submitting so you can reference it. Occasionally it can take up to 24 hours if verification needs a closer look.`;
  }

  if (includesAny(text, ['safe', 'scam', 'legit', 'trust', 'secure', 'verify', 'verification'])) {
    return `Every card is verified before we send a payout, and all submissions go over encrypted HTTPS. Your exact cash offer is shown upfront — no surprises on the fee. We don't sell your personal info either.`;
  }

  if (includesAny(text, ['minimum', 'maximum', 'limit', 'balance', '$10', '$5000', '10 dollar', '5000'])) {
    return `We accept balances from $10 up to $5,000. Just enter your amount on the homepage and you'll see your exact offer before committing to anything.`;
  }

  if (includesAny(text, ['brand', 'accept', 'which card', 'what card', 'amazon', 'apple', 'steam', 'visa', 'gift card'])) {
    return `We take 60+ brands — ${formatBrandList()}. You can search for yours on the homepage swap box to make sure it's listed.`;
  }

  if (includesAny(text, ['how does', 'how it work', 'how do i', 'process', 'steps', 'start', 'submit', 'swap'])) {
    return `Pretty straightforward: pick your brand and balance, see your 95% cash offer, submit your card and payout details, then get paid after verification — usually within hours. You can start on the homepage or at /sell-gift-card/.`;
  }

  if (includesAny(text, ['order code', 'swp', 'track', 'reference', 'confirmation'])) {
    return `After you submit, you'll get an order code like SWP-XXXXXX — hang onto that. For anything order-specific, email support@swapio.cc with the code and they'll help you out.`;
  }

  if (includesAny(text, ['account', 'dashboard', 'log in', 'login', 'sign up', 'signup', 'register'])) {
    return `You can create a free account to track submissions in your dashboard at /dashboard.html, but it's optional — you can swap without one and use your order code to follow up.`;
  }

  if (includesAny(text, ['what is swapio', 'about swapio', 'who is swapio', 'swapio'])) {
    return `Swapio lets you turn unused gift cards into real cash. You get ${SWAPIO.payoutPercent}% of your card value via PayPal, Cash App, Zelle, Venmo, Bitcoin, or bank transfer. We accept 60+ brands with transparent fees and fast payouts.`;
  }

  if (includesAny(text, ['guide', 'faq', 'article', 'help'])) {
    return `We've got a full Guide at /guide, an FAQ at /faq, and Articles at /articles/ if you want to dig deeper into selling gift cards safely and getting the best value.`;
  }

  return `Hmm, not totally sure on that one. I can help with how swaps work, payout methods, fees, timing, accepted brands, and safety. For order-specific stuff, email support@swapio.cc.`;
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
        aria-label="Open support chat"
      >
        <svg class="support-chat-toggle-icon support-chat-toggle-icon--open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
        <svg class="support-chat-toggle-icon support-chat-toggle-icon--close hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        <span class="support-chat-toggle-pulse" aria-hidden="true"></span>
      </button>

      <div id="support-chat-panel" class="support-chat-panel hidden" role="dialog" aria-label="Swapio support chat">
        <div class="support-chat-header">
          <div class="support-chat-header-info">
            <div class="support-chat-avatar" aria-hidden="true">${SUPPORT_CHAT.agentInitials}</div>
            <div>
              <p class="support-chat-agent">${SUPPORT_CHAT.agentName}</p>
              <p class="support-chat-status"><span class="support-chat-online-dot" aria-hidden="true"></span> Online now</p>
            </div>
          </div>
          <button type="button" id="support-chat-close" class="support-chat-close" aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div id="support-chat-messages" class="support-chat-messages" role="log" aria-relevant="additions"></div>

        <form id="support-chat-form" class="support-chat-form">
          <input
            type="text"
            id="support-chat-input"
            class="support-chat-input"
            placeholder="Type a message..."
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
        <span class="support-chat-typing" aria-label="${SUPPORT_CHAT.agentFirstName} is typing">
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
    .replace(/"/g, '&quot;');
}

function randomTypingDelay() {
  return SUPPORT_CHAT.typingMin + Math.random() * (SUPPORT_CHAT.typingMax - SUPPORT_CHAT.typingMin);
}

function setChatOpen(isOpen) {
  const toggle = document.getElementById('support-chat-toggle');
  const panel = document.getElementById('support-chat-panel');
  const iconOpen = toggle?.querySelector('.support-chat-toggle-icon--open');
  const iconClose = toggle?.querySelector('.support-chat-toggle-icon--close');
  if (!toggle || !panel) return;

  panel.classList.toggle('hidden', !isOpen);
  panel.classList.toggle('support-chat-panel--open', isOpen);
  toggle.classList.toggle('support-chat-toggle--active', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close support chat' : 'Open support chat');
  iconOpen?.classList.toggle('hidden', isOpen);
  iconClose?.classList.toggle('hidden', !isOpen);
  toggle.querySelector('.support-chat-toggle-pulse')?.classList.toggle('hidden', isOpen);

  if (isOpen) {
    document.getElementById('support-chat-input')?.focus();
  }
}

function initSupportChat() {
  if (document.getElementById('support-chat-root')) return;

  document.body.insertAdjacentHTML('beforeend', getSupportChatHtml());

  const toggle = document.getElementById('support-chat-toggle');
  const closeBtn = document.getElementById('support-chat-close');
  const panel = document.getElementById('support-chat-panel');
  const messages = document.getElementById('support-chat-messages');
  const form = document.getElementById('support-chat-form');
  const input = document.getElementById('support-chat-input');

  let welcomed = false;
  let responding = false;

  const sendAgentReply = (text) => {
    const typingRow = appendChatMessage(messages, { sender: 'agent', isTyping: true });

    setTimeout(() => {
      typingRow.remove();
      appendChatMessage(messages, { sender: 'agent', text });
      responding = false;
      input.disabled = false;
      input.focus();
    }, randomTypingDelay());
  };

  const handleUserMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || responding) return;

    appendChatMessage(messages, { sender: 'user', text: trimmed });
    input.value = '';
    input.disabled = true;
    responding = true;

    const reply = generateSupportReply(trimmed);
    sendAgentReply(reply);
  };

  const maybeWelcome = () => {
    if (welcomed) return;
    welcomed = true;
    setTimeout(() => {
      sendAgentReply(`Hey there! I'm ${SUPPORT_CHAT.agentFirstName} — happy to help with any Swapio questions. What's on your mind?`);
    }, SUPPORT_CHAT.welcomeDelay);
  };

  toggle?.addEventListener('click', () => {
    const isOpen = panel?.classList.contains('support-chat-panel--open');
    setChatOpen(!isOpen);
    if (!isOpen) maybeWelcome();
  });

  closeBtn?.addEventListener('click', () => setChatOpen(false));

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserMessage(input.value);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel?.classList.contains('support-chat-panel--open')) {
      setChatOpen(false);
    }
  });
}