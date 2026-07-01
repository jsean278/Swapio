/* Swapio — Login & signup pages */

document.addEventListener('DOMContentLoaded', async () => {
  const page = document.body.dataset.page;
  initLayout(page === 'login' ? 'login' : 'signup');
  await initAuth();

  if (page === 'login') {
    initLoginPage();
  } else if (page === 'signup') {
    initSignupPage();
  }
});

function initLoginPage() {
  const form = document.getElementById('login-form');
  if (!form) return;

  if (isAuthenticated()) {
    window.location.replace('/dashboard');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAuthError('login-error');

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      showAuthError('login-error', 'Please enter your email and password.');
      return;
    }

    if (password.length < 6) {
      showAuthError('login-error', 'Password must be at least 6 characters.');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Logging in...';

    try {
      await loginUser(email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      showAuthError('login-error', err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = original;
    }
  });
}

function initSignupPage() {
  const form = document.getElementById('signup-form');
  if (!form) return;

  if (isAuthenticated()) {
    window.location.replace('/dashboard');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAuthError('signup-error');

    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!username || !email || !password) {
      showAuthError('signup-error', 'Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      showAuthError('signup-error', 'Password must be at least 6 characters.');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Creating account...';

    try {
      await signupUser(username, email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      showAuthError('signup-error', err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = original;
    }
  });
}

function showAuthError(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
}

function hideAuthError(id) {
  document.getElementById(id)?.classList.add('hidden');
}