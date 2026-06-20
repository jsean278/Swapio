/* Reusable searchable dropdown */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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

  const wrapper = inputEl.closest('.dropdown-wrapper');
  const fieldEl = wrapper?.parentElement;

  function setOpenState(isOpen) {
    wrapper?.classList.toggle('dropdown-wrapper-open', isOpen);
    fieldEl?.classList.toggle('dropdown-field-open', isOpen);
  }

  function renderList(filter = '') {
    const query = filter.toLowerCase().trim();
    const selected = getValue();
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      listEl.innerHTML = '<div class="dropdown-item dropdown-empty">No results found</div>';
      listEl.classList.add('open');
      setOpenState(true);
      inputEl.setAttribute('aria-expanded', 'true');
      return;
    }

    listEl.innerHTML = filtered
      .map(
        (item, index) =>
          `<button type="button" class="dropdown-item${selected === item ? ' selected' : ''}" data-${dataAttr}-index="${index}">${escapeHtml(item)}</button>`
      )
      .join('');

    listEl._filteredItems = filtered;

    listEl.classList.add('open');
    setOpenState(true);
    inputEl.setAttribute('aria-expanded', 'true');
    highlightedIndex = -1;
  }

  function closeList() {
    listEl.classList.remove('open');
    setOpenState(false);
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

  function getItemFromEvent(e) {
    const item = e.target.closest(`button.dropdown-item[data-${dataAttr}-index]`);
    if (!item || item.classList.contains('dropdown-empty')) return null;
    const index = Number(item.getAttribute(`data-${dataAttr}-index`));
    return listEl._filteredItems?.[index] ?? null;
  }

  let lastSelectAt = 0;

  function handleItemSelect(e) {
    const value = getItemFromEvent(e);
    if (!value) return;

    const now = Date.now();
    if (now - lastSelectAt < 400) return;
    lastSelectAt = now;

    e.preventDefault();
    e.stopPropagation();
    selectItem(value);
  }

  listEl.addEventListener('click', handleItemSelect);
  listEl.addEventListener('touchend', handleItemSelect, { passive: false });

  listEl.addEventListener('mousedown', (e) => {
    if (e.target.closest('button.dropdown-item')) e.preventDefault();
  });

  inputEl.addEventListener('keydown', (e) => {
    const optionItems = listEl.querySelectorAll(`.dropdown-item[data-${dataAttr}-index]`);
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
      const value = listEl._filteredItems?.[highlightedIndex];
      if (value) selectItem(value);
    } else if (e.key === 'Escape') {
      closeList();
    }
  });

  document.addEventListener('pointerdown', (e) => {
    if (!wrapper?.contains(e.target)) {
      closeList();
    }
  });

  return { selectItem, clearSelection, renderList, closeList };
}