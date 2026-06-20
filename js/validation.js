/* Form validation utilities */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email).trim());
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
    }
  });
  return valid;
}