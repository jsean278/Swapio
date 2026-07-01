/* Form validation utilities */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BTC_LEGACY_REGEX = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
const BTC_BECH32_REGEX = /^bc1[a-z0-9]{25,89}$/i;

function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email).trim());
}

function isValidBitcoinAddress(address) {
  const trimmed = String(address).trim();
  return BTC_LEGACY_REGEX.test(trimmed) || BTC_BECH32_REGEX.test(trimmed);
}

function isValidUrl(value) {
  try {
    const url = new URL(String(value).trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidCodeOrLink(value) {
  const trimmed = String(value).trim();
  if (!trimmed) return false;
  if (/^https?:\/\//i.test(trimmed)) return isValidUrl(trimmed);
  return trimmed.length >= 4;
}

function setupEmailValidation(inputEl, errorMessage = 'Please enter valid email') {
  const wrapper = inputEl.closest('.field-wrapper') || createFieldWrapper(inputEl);
  let errorEl = wrapper.querySelector('.field-error');

  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.className = 'field-error hidden';
    wrapper.appendChild(errorEl);
  }

  errorEl.textContent = errorMessage;

  function validate(requireValue = false) {
    const value = inputEl.value.trim();

    if (!value) {
      if (requireValue) {
        setFieldError(inputEl, 'Please enter your email');
        return false;
      }
      clearFieldError(inputEl);
      return false;
    }

    if (!isValidEmail(value)) {
      setFieldError(inputEl, errorMessage);
      return false;
    }

    clearFieldError(inputEl);
    return true;
  }

  inputEl.addEventListener('blur', () => {
    if (inputEl.value.trim()) validate(false);
  });

  inputEl.addEventListener('input', () => {
    if (inputEl.classList.contains('form-input-invalid')) validate(false);
  });

  return (requireValue = true) => validate(requireValue);
}

function setupBitcoinValidation(inputEl, errorMessage = 'Please enter a valid Bitcoin address') {
  const wrapper = inputEl.closest('.field-wrapper') || createFieldWrapper(inputEl);
  let errorEl = wrapper.querySelector('.field-error');

  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.className = 'field-error hidden';
    wrapper.appendChild(errorEl);
  }

  errorEl.textContent = errorMessage;

  function validate(requireValue = false) {
    const value = inputEl.value.trim();

    if (!value) {
      if (requireValue) {
        setFieldError(inputEl, 'Please enter your Bitcoin address');
        return false;
      }
      clearFieldError(inputEl);
      return false;
    }

    if (!isValidBitcoinAddress(value)) {
      setFieldError(inputEl, errorMessage);
      return false;
    }

    clearFieldError(inputEl);
    return true;
  }

  inputEl.addEventListener('blur', () => {
    if (inputEl.value.trim()) validate(false);
  });

  inputEl.addEventListener('input', () => {
    if (inputEl.classList.contains('form-input-invalid')) validate(false);
  });

  return (requireValue = true) => validate(requireValue);
}

function setupRequiredValidation(inputEl, emptyMessage) {
  const wrapper = inputEl.closest('.field-wrapper') || createFieldWrapper(inputEl);

  function validate() {
    const value = inputEl.value.trim();
    if (!value) {
      setFieldError(inputEl, emptyMessage);
      return false;
    }
    clearFieldError(inputEl);
    return true;
  }

  inputEl.addEventListener('blur', () => {
    if (!inputEl.value.trim() && inputEl.classList.contains('form-input-invalid')) validate();
  });

  inputEl.addEventListener('input', () => {
    if (inputEl.classList.contains('form-input-invalid') && inputEl.value.trim()) {
      clearFieldError(inputEl);
    }
  });

  return validate;
}

function createFieldWrapper(inputEl) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field-wrapper';
  inputEl.parentNode.insertBefore(wrapper, inputEl);
  wrapper.appendChild(inputEl);
  return wrapper;
}

function setFieldError(inputEl, message) {
  const wrapper = inputEl.closest('.field-wrapper') || createFieldWrapper(inputEl);
  inputEl.classList.add('form-input-invalid');
  inputEl.setAttribute('aria-invalid', 'true');
  let errorEl = wrapper.querySelector('.field-error');
  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.className = 'field-error';
    wrapper.appendChild(errorEl);
  }
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
}

function clearFieldError(inputEl) {
  const wrapper = inputEl.closest('.field-wrapper');
  inputEl.classList.remove('form-input-invalid');
  inputEl.removeAttribute('aria-invalid');
  wrapper?.querySelector('.field-error')?.classList.add('hidden');
}

function validateFormFields(formEl) {
  let valid = true;
  formEl.querySelectorAll('[data-validate]').forEach((input) => {
    const type = input.dataset.validate;
    if (type === 'email') {
      const value = input.value.trim();
      if (!value) {
        setFieldError(input, 'Please enter your email');
        valid = false;
      } else if (!isValidEmail(value)) {
        setFieldError(input, 'Please enter valid email');
        valid = false;
      } else {
        clearFieldError(input);
      }
    } else if (type === 'required') {
      if (!input.value.trim()) {
        setFieldError(input, input.dataset.errorMessage || 'Please fill out this field');
        valid = false;
      } else {
        clearFieldError(input);
      }
    } else if (type === 'bitcoin') {
      const value = input.value.trim();
      if (!value) {
        setFieldError(input, 'Please enter your Bitcoin address');
        valid = false;
      } else if (!isValidBitcoinAddress(value)) {
        setFieldError(input, input.dataset.errorMessage || 'Please enter a valid Bitcoin address');
        valid = false;
      } else {
        clearFieldError(input);
      }
    } else if (type === 'url') {
      const value = input.value.trim();
      if (!value) {
        setFieldError(input, 'Please paste the full gift link');
        valid = false;
      } else if (!isValidUrl(value)) {
        setFieldError(input, input.dataset.errorMessage || 'Please enter a valid gift link (https://...)');
        valid = false;
      } else {
        clearFieldError(input);
      }
    } else if (type === 'codeOrLink') {
      const value = input.value.trim();
      if (!value) {
        setFieldError(input, 'Please enter a gift card code or redemption link');
        valid = false;
      } else if (!isValidCodeOrLink(value)) {
        setFieldError(input, input.dataset.errorMessage || 'Please enter a valid code or redemption link');
        valid = false;
      } else {
        clearFieldError(input);
      }
    }
  });
  return valid;
}