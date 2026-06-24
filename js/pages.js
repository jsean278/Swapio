/* Swapio — Shared page utilities */

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || '';
  initLayout(page);
  initFaqAccordion();
  initContactForm();

  document.querySelectorAll('[data-validate="email"]').forEach((el) => {
    setupEmailValidation(el);
  });
});

function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = answer.classList.contains('open');

      document.querySelectorAll('.faq-answer').forEach((a) => a.classList.remove('open'));
      document.querySelectorAll('.faq-icon').forEach((i) => i.classList.remove('rotate-180'));
      document.querySelectorAll('.faq-question').forEach((q) => q.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        answer.classList.add('open');
        icon?.classList.add('rotate-180');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateFormFields(form)) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Sending...';

    const formData = new FormData(form);
    const orderCode = generateOrderCode();

    try {
      await submitToTelegram({
        type: 'contact',
        orderCode,
        email: formData.get('email'),
        fullName: formData.get('name'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString(),
      });

      const panel = document.getElementById('contact-form-panel');
      panel?.classList.add('is-hiding');
      setTimeout(() => {
        panel?.classList.add('hidden');
        const success = document.getElementById('contact-success');
        success?.classList.remove('hidden');
        success?.classList.add('fade-in');
      }, 300);
    } catch (err) {
      const errEl = document.getElementById('contact-error');
      if (errEl) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
      }
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  });
}