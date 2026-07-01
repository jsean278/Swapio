/* Swapio — Dashboard */

document.addEventListener('DOMContentLoaded', async () => {
  initLayout('dashboard');
  await initAuth();

  if (!isAuthenticated()) {
    window.location.replace('/login');
    return;
  }

  await loadDashboard();
});

async function loadDashboard() {
  const loading = document.getElementById('dashboard-loading');
  const content = document.getElementById('dashboard-content');
  const errorEl = document.getElementById('dashboard-error');

  try {
    const response = await fetch('/api/dashboard', { credentials: 'include' });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Failed to load dashboard');
    }

    const welcome = document.getElementById('dashboard-welcome');
    if (welcome) {
      welcome.textContent = `Welcome back, ${data.user.username}`;
    }

    document.getElementById('stat-total').textContent = data.stats.total;
    document.getElementById('stat-pending').textContent = data.stats.pending;
    document.getElementById('stat-approved').textContent = data.stats.approved;
    document.getElementById('stat-value').textContent = formatCurrency(data.stats.totalValue);

    renderSubmissions(data.submissions);

    loading?.classList.add('hidden');
    content?.classList.remove('hidden');
  } catch (err) {
    loading?.classList.add('hidden');
    if (errorEl) {
      errorEl.textContent = err.message;
      errorEl.classList.remove('hidden');
    }
  }
}

function renderSubmissions(submissions) {
  const empty = document.getElementById('submissions-empty');
  const list = document.getElementById('submissions-list');
  if (!empty || !list) return;

  if (!submissions.length) {
    empty.classList.remove('hidden');
    list.classList.add('hidden');
    list.innerHTML = '';
    return;
  }

  empty.classList.add('hidden');
  list.classList.remove('hidden');

  list.innerHTML = submissions.map((item) => {
    const statusClass = `submission-status submission-status--${item.status}`;
    const statusLabel = item.status.charAt(0).toUpperCase() + item.status.slice(1);
    const date = new Date(item.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return `
      <div class="submission-card scroll-reveal">
        <div class="submission-card-top">
          <div>
            <p class="submission-code">${item.order_code}</p>
            <p class="submission-meta">${item.card_brand} · ${formatCurrency(item.card_balance)}</p>
          </div>
          <span class="${statusClass}">${statusLabel}</span>
        </div>
        <div class="submission-card-bottom">
          <span>${formatCurrency(item.payout_amount)} via ${item.payout_method}</span>
          <span>${date}</span>
        </div>
      </div>
    `;
  }).join('');

  initScrollReveal(list);
}

