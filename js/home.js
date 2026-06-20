/* Swapio — Homepage swap flow */

const SWAP_STEPS = ['swap-box-step1', 'offer-preview', 'swap-form-section', 'success-screen'];

let swapState = {
  brand: null,
  balance: null,
  payoutMethod: null,
};

let brandDropdown;
let payoutDropdown;

document.addEventListener('DOMContentLoaded', () => {
  initLayout('home');
  initDropdowns();
  initSwapFlow();
  initSubmissionForm();

  const emailInput = document.getElementById('email');
  if (emailInput) setupEmailValidation(emailInput);

  const statsEl = document.getElementById('stats-bar');
  if (statsEl) statsEl.innerHTML = getStatsBar();

  const trustEl = document.getElementById('trust-signals');
  if (trustEl) trustEl.innerHTML = getTrustSignals();

  const processEl = document.getElementById('process-steps');
  if (processEl) processEl.innerHTML = getProcessSteps();

  initPageAnimations();
  initHomeSchema();
  updateGetOfferButton();
});

function initHomeSchema() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Swapio',
    url: getSiteOrigin(),
    description: 'Turn unused gift cards into cash fast. 95% payout, 60+ brands accepted.',
    publisher: { '@type': 'Organization', name: 'Swapio' },
  });
  document.head.appendChild(script);
}

function showSwapStep(stepId) {
  SWAP_STEPS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('swap-step-active', id === stepId);
  });
}

function initDropdowns() {
  const brandInput = document.getElementById('brand-search');
  const brandList = document.getElementById('brand-list');
  const payoutInput = document.getElementById('payout-search');
  const payoutList = document.getElementById('payout-list');

  if (brandInput && brandList) {
    brandDropdown = initSearchableDropdown({
      inputEl: brandInput,
      listEl: brandList,
      items: SWAPIO.giftCards,
      getValue: () => swapState.brand,
      setValue: (v) => {
        swapState.brand = v;
        updateGetOfferButton();
      },
      onSelect: () => {
        renderCardFields();
        updateGetOfferButton();
      },
      dataAttr: 'brand',
    });
  }

  if (payoutInput && payoutList) {
    payoutDropdown = initSearchableDropdown({
      inputEl: payoutInput,
      listEl: payoutList,
      items: SWAPIO.payoutMethods,
      getValue: () => swapState.payoutMethod,
      setValue: (v) => {
        swapState.payoutMethod = v;
        updateGetOfferButton();
      },
      onSelect: () => updateGetOfferButton(),
      dataAttr: 'payout',
    });
  }
}

function renderCardFields() {
  const container = document.getElementById('card-fields-container');
  if (!container || !swapState.brand) {
    if (container) container.innerHTML = '';
    return;
  }

  const req = getCardRequirements(swapState.brand);
  container.innerHTML = `
    ${req.fields.map((field) => `
      <div class="field-wrapper">
        <label class="form-label" for="card-${field.name}">${field.label}${field.required ? ' <span class="text-red-500">*</span>' : ''}</label>
        <input
          type="text"
          id="card-${field.name}"
          name="${field.name}"
          class="form-input"
          placeholder="${field.placeholder}"
          ${field.required ? `data-validate="required" data-error-message="Please enter ${field.label.toLowerCase()}"` : ''}
          ${field.inputMode ? `inputmode="${field.inputMode}"` : ''}
        >
      </div>
    `).join('')}
  `;
}

function renderPayoutFields() {
  const container = document.getElementById('payout-fields-container');
  if (!container || !swapState.payoutMethod) {
    if (container) container.innerHTML = '';
    return;
  }

  const fields = getPayoutFields(swapState.payoutMethod);
  container.innerHTML = fields.map((field) => {
    const validateType = field.type === 'email' ? 'email' : field.type === 'bitcoin' ? 'bitcoin' : 'required';
    const errorMessage = field.type === 'email'
      ? 'Please enter valid email'
      : field.type === 'bitcoin'
        ? 'Please enter a valid Bitcoin address (bc1, 1, or 3 format)'
        : `Please enter ${field.label.toLowerCase()}`;

    return `
    <div class="field-wrapper">
      <label class="form-label" for="payout-${field.name}">${field.label} <span class="text-red-500">*</span></label>
      <input
        type="text"
        id="payout-${field.name}"
        name="${field.name}"
        class="form-input"
        placeholder="${field.placeholder}"
        data-validate="${validateType}"
        data-error-message="${errorMessage}"
        ${field.inputMode || field.type === 'email' ? `inputmode="${field.inputMode || 'email'}"` : ''}
        ${field.type === 'bitcoin' ? 'autocapitalize="off" autocorrect="off" spellcheck="false"' : ''}
      >
    </div>
  `;
  }).join('');

  fields.forEach((field) => {
    const el = document.getElementById(`payout-${field.name}`);
    if (!el) return;
    if (field.type === 'email') setupEmailValidation(el);
    if (field.type === 'bitcoin') setupBitcoinValidation(el);
  });
}

function syncSwapStateFromInputs() {
  const brandInput = document.getElementById('brand-search');
  const payoutInput = document.getElementById('payout-search');
  const balanceInput = document.getElementById('balance-input');

  if (brandInput) {
    const brandValue = brandInput.value.trim();
    const brandMatch = SWAPIO.giftCards.find(
      (item) => item.toLowerCase() === brandValue.toLowerCase()
    );
    if (brandMatch) {
      swapState.brand = brandMatch;
      brandInput.classList.add('form-input-selected');
    }
  }

  if (payoutInput) {
    const payoutValue = payoutInput.value.trim();
    const payoutMatch = SWAPIO.payoutMethods.find(
      (item) => item.toLowerCase() === payoutValue.toLowerCase()
    );
    if (payoutMatch) {
      swapState.payoutMethod = payoutMatch;
      payoutInput.classList.add('form-input-selected');
    }
  }

  if (balanceInput) {
    const balance = parseFloat(balanceInput.value);
    swapState.balance = Number.isFinite(balance) ? balance : null;
  }
}

function initSwapFlow() {
  const balanceInput = document.getElementById('balance-input');
  const getOfferBtn = document.getElementById('get-offer-btn');
  const continueBtn = document.getElementById('continue-btn');

  const syncBalance = () => {
    syncSwapStateFromInputs();
    updateGetOfferButton();
  };

  balanceInput?.addEventListener('input', () => {
    balanceInput.value = balanceInput.value.replace(/[^\d]/g, '');
    syncBalance();
  });
  balanceInput?.addEventListener('change', syncBalance);
  balanceInput?.addEventListener('blur', syncBalance);

  getOfferBtn?.addEventListener('click', () => {
    if (!validateSwapSelection()) return;

    const payout = calculatePayout(swapState.balance);

    document.getElementById('preview-card').textContent =
      `${swapState.brand} ${formatCurrency(swapState.balance)}`;
    document.getElementById('preview-payout').textContent =
      `${formatCurrency(payout)} via ${swapState.payoutMethod}`;
    document.getElementById('preview-fee').textContent =
      `You receive ${SWAPIO.payoutPercent}% of your card value`;

    document.getElementById('form-payout-method').value = swapState.payoutMethod;

    renderCardFields();
    renderPayoutFields();

    showSwapStep('offer-preview');
  });

  continueBtn?.addEventListener('click', () => {
    showSwapStep('swap-form-section');
  });

  document.getElementById('back-to-swap')?.addEventListener('click', resetSwapFlow);
}

function validateSwapSelection() {
  syncSwapStateFromInputs();
  const balanceInput = document.getElementById('balance-input');
  const balance = parseFloat(balanceInput?.value);

  if (!swapState.brand) {
    showError('Please select a gift card brand.');
    return false;
  }
  if (!balance || balance < 10) {
    showError('Minimum balance is $10.');
    return false;
  }
  if (balance > 5000) {
    showError('Maximum balance is $5,000.');
    return false;
  }
  if (!swapState.payoutMethod) {
    showError('Please select a payout method.');
    return false;
  }

  swapState.balance = balance;
  hideError();
  return true;
}

function updateGetOfferButton() {
  const btn = document.getElementById('get-offer-btn');
  if (!btn) return;

  syncSwapStateFromInputs();

  const balance = parseFloat(document.getElementById('balance-input')?.value);
  const valid =
    swapState.brand &&
    Number.isFinite(balance) &&
    balance >= 10 &&
    balance <= 5000 &&
    swapState.payoutMethod;

  btn.disabled = !valid;
}

function showError(msg) {
  const el = document.getElementById('swap-error');
  if (el) {
    el.textContent = msg;
    el.classList.remove('hidden');
  }
}

function hideError() {
  document.getElementById('swap-error')?.classList.add('hidden');
}

function resetSwapFlow() {
  swapState = { brand: null, balance: null, payoutMethod: null };

  const brandInput = document.getElementById('brand-search');
  const payoutInput = document.getElementById('payout-search');
  if (brandInput) {
    brandInput.value = '';
    brandInput.classList.remove('form-input-selected');
  }
  if (payoutInput) {
    payoutInput.value = '';
    payoutInput.classList.remove('form-input-selected');
  }

  document.getElementById('balance-input').value = '';
  document.getElementById('submission-form').reset();
  document.getElementById('card-fields-container').innerHTML = '';
  document.getElementById('payout-fields-container').innerHTML = '';
  document.getElementById('form-error')?.classList.add('hidden');
  hideError();
  updateGetOfferButton();
  showSwapStep('swap-box-step1');
}

function collectCardDetails(formData) {
  const req = getCardRequirements(swapState.brand);
  const details = {};
  req.fields.forEach((field) => {
    details[field.name] = formData.get(field.name) || '';
  });
  return details;
}

function collectPayoutDetails(formData) {
  const fields = getPayoutFields(swapState.payoutMethod);
  const details = {};
  fields.forEach((field) => {
    details[field.name] = formData.get(field.name) || '';
  });
  return details;
}

function formatPayoutAccount(details) {
  switch (swapState.payoutMethod) {
    case 'PayPal':
      return details.paypalEmail;
    case 'Cash App':
      return details.cashtag;
    case 'Zelle':
      return details.zelleEmail;
    case 'Venmo':
      return details.venmoPhone;
    case 'Bitcoin':
      return details.bitcoinAddress;
    case 'Bank Transfer':
      return `Routing: ${details.routingNumber} · Account: ${details.accountNumber}`;
    default:
      return JSON.stringify(details);
  }
}

function initSubmissionForm() {
  const form = document.getElementById('submission-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateFormFields(form)) return;

    document.getElementById('form-error')?.classList.add('hidden');

    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';

    const orderCode = generateOrderCode();
    const payout = calculatePayout(swapState.balance);
    const formData = new FormData(form);
    const cardDetails = collectCardDetails(formData);
    const payoutDetails = collectPayoutDetails(formData);

    const payload = {
      orderCode,
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      cardBrand: swapState.brand,
      cardBalance: swapState.balance,
      payoutMethod: swapState.payoutMethod,
      payoutAmount: payout,
      payoutAccount: formatPayoutAccount(payoutDetails),
      payoutDetails,
      cardDetails,
      cardNumber: cardDetails.cardNumber || cardDetails.claimCode || cardDetails.redemptionCode || cardDetails.giftCode || cardDetails.cardCode || cardDetails.pin || '',
      securityPin: cardDetails.pin || cardDetails.cvv || '',
      timestamp: new Date().toISOString(),
    };

    try {
      await submitToTelegram(payload);

      document.getElementById('success-order-code').textContent = orderCode;
      document.getElementById('success-payout').textContent =
        `${formatCurrency(payout)} via ${swapState.payoutMethod}`;

      showSwapStep('success-screen');
    } catch (err) {
      showFormError(err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  document.getElementById('start-another-swap')?.addEventListener('click', resetSwapFlow);
}

function showFormError(msg) {
  const el = document.getElementById('form-error');
  if (el) {
    el.textContent = msg;
    el.classList.remove('hidden');
  }
}