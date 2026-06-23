/* Swapio — Auth client */

let currentUser = null;
let authChecked = false;

async function fetchCurrentUser() {
  try {
    const response = await fetch('/api/auth/me', { credentials: 'include' });
    if (!response.ok) {
      currentUser = null;
      return null;
    }
    const data = await response.json();
    currentUser = data.authenticated ? data.user : null;
    return currentUser;
  } catch {
    currentUser = null;
    return null;
  }
}

function getCurrentUser() {
  return currentUser;
}

function isAuthenticated() {
  return !!currentUser;
}

function updateAuthNav() {
  const guest = document.getElementById('auth-nav-guest');
  const user = document.getElementById('auth-nav-user');
  const guestMobile = document.getElementById('auth-nav-guest-mobile');
  const userMobile = document.getElementById('auth-nav-user-mobile');

  if (currentUser) {
    guest?.classList.add('hidden');
    user?.classList.remove('hidden');
    guestMobile?.classList.add('hidden');
    userMobile?.classList.remove('hidden');
  } else {
    guest?.classList.remove('hidden');
    user?.classList.add('hidden');
    guestMobile?.classList.remove('hidden');
    userMobile?.classList.add('hidden');
  }

  bindSignOutButtons();
  document.querySelector('.site-header')?.classList.add('auth-ready');
}

function bindSignOutButtons() {
  document.querySelectorAll('[data-sign-out]').forEach((btn) => {
    if (btn.dataset.signOutBound) return;
    btn.dataset.signOutBound = '1';
    btn.addEventListener('click', async () => {
      await logoutUser();
      window.location.href = '/';
    });
  });
}

async function initAuth() {
  if (authChecked) {
    updateAuthNav();
    return currentUser;
  }
  await fetchCurrentUser();
  authChecked = true;
  updateAuthNav();
  document.dispatchEvent(new CustomEvent('swapio:auth-ready', { detail: { user: currentUser } }));
  return currentUser;
}

async function loginUser(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }

  currentUser = data.user;
  updateAuthNav();
  return data.user;
}

async function signupUser(username, email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Sign up failed');
  }

  currentUser = data.user;
  updateAuthNav();
  return data.user;
}

async function logoutUser() {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  }).catch(() => {});

  currentUser = null;
  updateAuthNav();
}

function waitForAuth() {
  if (authChecked) return Promise.resolve(currentUser);
  return new Promise((resolve) => {
    document.addEventListener('swapio:auth-ready', () => resolve(currentUser), { once: true });
  });
}