/* Swapio — AI support chatbot (site-scoped) */

const SUPPORT_CHAT = {
  agentName: 'Swapio AI',
  agentLabel: 'AI Assistant',
  welcomeDelay: 700,
  typingMin: 600,
  typingMax: 1600,
  closeDuration: 320,
};

const OFF_TOPIC_REPLY =
  "I can only help with general Swapio questions — how swaps work, fees, payout options, and accepted brands. For personal order help, email support@swapio.cc with your order code (SWP-XXXXXX).";

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

function isTrustQuestion(text) {
  const trustPatterns = [
    'scam', 'legit', 'legitimate', 'fake', 'sketchy', 'sketch', 'fraud', 'ripoff', 'rip off',
    'trustworthy', 'can i trust', 'is this real', 'is swapio real', 'are you real',
    'is this safe', 'is it safe', 'too good to be true', 'pyramid', 'ponzi',
    'steal', 'stolen', 'rob me', 'cheat', 'cheating', 'suspicious', 'con artist',
    'is this legit', 'not a scam', 'no scam', 'actually legit', 'actually real',
  ];

  if (includesAny(text, trustPatterns)) return true;

  return /^(is this|are you|this|swapio)?\s*(a\s+)?(scam|fake|legit|real|safe)\??$/.test(text);
}

function formatBrandList(limit = 12) {
  const brands = SWAPIO.giftCards.slice(0, limit);
  return `${brands.join(', ')}, and more`;
}

function generateSupportReply(message) {
  const text = normalizeText(message);

  if (!text) {
    return 'Ask me anything about Swapio — payouts, fees, accepted brands, or how the swap process works.';
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
    return "I'm only able to answer questions about Swapio and gift card swaps. What would you like to know about the site?";
  }

  if (includesAny(text, ['hello', 'hi ', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
    return "Hey! I'm Swapio AI. I can help with how swaps work, payout options, fees, and accepted brands — what can I help with?";
  }

  if (includesAny(text, ['thank', 'thanks', 'thx', 'appreciate'])) {
    return "You're welcome! Let me know if anything else comes up. You can start a swap on the homepage or at /sell-gift-card/ whenever you're ready.";
  }

  if (isTrustQuestion(text)) {
    return `No — Swapio is not a scam. We're a legitimate gift-card cash-out service. You see your exact payout (${SWAPIO.payoutPercent}%) and fees upfront before you submit anything. All submissions use encrypted HTTPS, every card is verified before payout, and you get an order code (SWP-XXXXXX) right away. We never sell your personal information. Read more on our FAQ at /faq or email ${SWAPIO.supportEmail} if you still have concerns.`;
  }

  if (includesAny(text, ['contact', 'email', 'reach', 'human', 'real person', 'talk to someone', 'speak to'])) {
    return `You can reach the team at ${SWAPIO.supportEmail} or through our Reach Us page at /contact. Include your order code (SWP-XXXXXX) if you have an active swap.`;
  }

  if (includesAny(text, ['fee', 'percent', '5%', '95%', 'how much', 'rate', 'offer', 'payout amount', 'cut', 'take'])) {
    return `Swapio pays ${SWAPIO.payoutPercent}% of your card balance — there's a flat ${SWAPIO.serviceFeePercent}% service fee shown upfront before you submit. A $100 card pays out $${SWAPIO.payoutPercent}.`;
  }

  if (includesAny(text, ['payout', 'paypal', 'cash app', 'zelle', 'venmo', 'bitcoin', 'bank transfer', 'ach', 'get paid', 'payment method'])) {
    return `We support ${SWAPIO.payoutMethods.join(', ')}. Pick your preferred method when starting a swap — most payouts go through within a day after verification.`;
  }

  if (includesAny(text, ['how long', 'timing', 'time', 'hours', 'fast', 'speed', 'when do i get', 'wait', 'long does'])) {
    return "Most swaps are verified and paid within a day. You'll get an order code (SWP-XXXXXX) right after submitting. Occasionally it may take a little longer if verification needs a closer look.";
  }

  if (includesAny(text, ['secure', 'security', 'encrypted', 'https', 'privacy', 'data'])) {
    return 'All submissions use encrypted HTTPS. Your exact offer is shown before you commit, every card is verified before payout, and we do not sell your personal information. See /privacy for details.';
  }

  if (includesAny(text, ['card verification', 'verify my card', 'how do you verify', 'verification process', 'why verify', 'what is verification'])) {
    return 'We verify every gift card before sending your payout — checking balance, validity, and that it has not already been redeemed. This protects both you and us. Most verified swaps pay out within a day.';
  }

  if (includesAny(text, ['minimum', 'maximum', 'limit', 'balance', '$10', '$5000', '10 dollar', '5000'])) {
    return 'Accepted balances range from $10 to $5,000. Enter your amount on the homepage to see your exact offer before committing.';
  }

  if (includesAny(text, ['discord', 'nitro', 'gift link'])) {
    return 'Discord Nitro gifts use a gift link (like https://discord.gift/...), not a redemption code. Paste the full link from your email when submitting.';
  }

  if (includesAny(text, ['what do i need', 'what info', 'card number', 'pin', 'redemption', 'submit', 'requirements', 'claim code', 'what to enter'])) {
    return 'Required info depends on the brand: retail cards need card number + PIN, Amazon needs a claim code, Visa/Mastercard need card number + expiry + CVV, Discord Nitro needs a gift link, Steam/PlayStation/Xbox need digital codes, and Riot/Valorant need a Riot Access Code. The sell form shows exactly what your brand needs.';
  }

  if (includesAny(text, ['brand', 'accept', 'which card', 'what card', 'amazon', 'apple', 'steam', 'visa', 'gift card'])) {
    return `We accept 60+ brands including ${formatBrandList()}. Search for yours on the homepage swap box to confirm it's listed.`;
  }

  if (includesAny(text, ['how does', 'how it work', 'how do i', 'process', 'steps', 'start', 'submit', 'swap'])) {
    return 'Four steps: pick your brand and balance, see your 95% cash offer, submit card and payout details, then get paid after verification — usually within a day. Start on the homepage or at /sell-gift-card/.';
  }

  if (includesAny(text, ['order code', 'swp', 'track', 'reference', 'confirmation'])) {
    return "After submitting you'll get an order code like SWP-XXXXXX. For order-specific help, email support@swapio.cc with that code.";
  }

  if (includesAny(text, ['account', 'dashboard', 'log in', 'login', 'sign up', 'signup', 'register'])) {
    return 'You can create a free account to track submissions at /dashboard, but it is optional — you can swap without one and use your order code to follow up.';
  }

  if (includesAny(text, ['what is swapio', 'about swapio', 'who is swapio', 'swapio'])) {
    return `Swapio turns unused gift cards into real cash. You get ${SWAPIO.payoutPercent}% of your card value via PayPal, Cash App, Zelle, Venmo, Bitcoin, or bank transfer. 60+ brands, transparent fees, fast payouts.`;
  }

  if (includesAny(text, ['guide', 'faq', 'article', 'help'])) {
    return 'Check our Guide at /guide, FAQ at /faq, and Articles at /articles/ for more detail on selling gift cards safely.';
  }

  return "I'm not sure about that one. I can help with swaps, payout methods, fees, timing, accepted brands, and safety. For order-specific help, email support@swapio.cc.";
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
    .replace(/"/g, '&quot;');
}

function randomTypingDelay() {
  return SUPPORT_CHAT.typingMin + Math.random() * (SUPPORT_CHAT.typingMax - SUPPORT_CHAT.typingMin);
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
      if (isOpen()) input.focus();
    }, randomTypingDelay());
  };

  const handleUserMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || responding) return;

    appendChatMessage(messages, { sender: 'user', text: trimmed });
    input.value = '';
    input.disabled = true;
    responding = true;

    sendAgentReply(generateSupportReply(trimmed));
  };

  const maybeWelcome = () => {
    if (welcomed) return;
    welcomed = true;
    setTimeout(() => {
      sendAgentReply("Hi! I'm Swapio AI — ask me anything about how swaps work, payout methods, fees, or accepted brands.");
    }, SUPPORT_CHAT.welcomeDelay);
  };

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