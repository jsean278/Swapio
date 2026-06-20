/* Reusable searchable dropdown */

function initSearchableDropdown({
  inputEl,
  listEl,
  items,
  getValue,
  setValue,
  onSelect,
  dataAttr = 'value',
}) {
  let highlightedIndex = -1;
  let isScrolling = false;

  function renderList(filter = '') {
    const query = filter.toLowerCase().trim();
    const selected = getValue();
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      listEl.innerHTML = '<div class="dropdown-item dropdown-empty">No results found</div>';
      listEl.classList.add('open');
      inputEl.setAttribute('aria-expanded', 'true');
      return;
    }

    listEl.innerHTML = filtered
      .map(
        (item) =>
          `<div class="dropdown-item${selected === item ? ' selected' : ''}" data-${dataAttr}="${item}">${item}</div>`
      )
      .join('');

    listEl.classList.add('open');
    inputEl.setAttribute('aria-expanded', 'true');
    highlightedIndex = -1;
  }

  function closeList() {
    listEl.classList.remove('open');
    inputEl.setAttribute('aria-expanded', 'false');
  }

  function selectItem(value) {
    setValue(value);
    inputEl.value = value;
    inputEl.classList.add('form-input-selected');
    closeList();
    onSelect?.(value);
  }

  function clearSelection() {
    inputEl.classList.remove('form-input-selected');
  }

  inputEl.addEventListener('focus', () => renderList(inputEl.value));
  inputEl.addEventListener('click', () => renderList(inputEl.value));

  inputEl.addEventListener('input', () => {
    if (inputEl.value !== getValue()) {
      setValue(null);
      clearSelection();
    }
    renderList(inputEl.value);
  });

  listEl.addEventListener('click', (e) => {
    const item = e.target.closest(`.dropdown-item[data-${dataAttr}]`);
    if (item) selectItem(item.dataset[dataAttr]);
  });

  listEl.addEventListener('mousedown', (e) => e.preventDefault());

  listEl.addEventListener('touchstart', () => {
    isScrolling = false;
  }, { passive: true });

  listEl.addEventListener('touchmove', () => {
    isScrolling = true;
  }, { passive: true });

  listEl.addEventListener('touchend', (e) => {
    if (isScrolling) return;
    const item = e.target.closest(`.dropdown-item[data-${dataAttr}]`);
    if (item) {
      e.preventDefault();
      selectItem(item.dataset[dataAttr]);
    }
  });

  inputEl.addEventListener('keydown', (e) => {
    const optionItems = listEl.querySelectorAll(`.dropdown-item[data-${dataAttr}]`);
    if (!optionItems.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!listEl.classList.contains('open')) renderList(inputEl.value);
      highlightedIndex = Math.min(highlightedIndex + 1, optionItems.length - 1);
      optionItems.forEach((el, i) => el.classList.toggle('highlighted', i === highlightedIndex));
      optionItems[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = Math.max(highlightedIndex - 1, 0);
      optionItems.forEach((el, i) => el.classList.toggle('highlighted', i === highlightedIndex));
      optionItems[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      selectItem(optionItems[highlightedIndex].dataset[dataAttr]);
    } else if (e.key === 'Escape') {
      closeList();
    }
  });

  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.dropdown-wrapper')) {
      closeList();
    }
  });

  return { selectItem, clearSelection, renderList, closeList };
}