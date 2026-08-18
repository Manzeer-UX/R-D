const search = document.querySelector('#search');
const details = [...document.querySelectorAll('.modules > details')];
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function selectTab(tab, moveFocus = false) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (moveFocus) tab.focus();
}

details.forEach((group) => { group.open = true; });

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    selectTab(tabs[nextIndex], true);
  });
});

search.addEventListener('input', (event) => {
  const term = event.target.value.trim().toLowerCase();
  let firstMatchingPanel = null;
  details.forEach((group) => {
    const matches = [...group.querySelectorAll('.feature')].some((item) => item.textContent.toLowerCase().includes(term));
    group.hidden = Boolean(term) && !matches;
    if (term && matches) group.open = true;
    if (term && matches && !firstMatchingPanel) firstMatchingPanel = group.closest('[role="tabpanel"]');
  });
  if (firstMatchingPanel) selectTab(document.getElementById(firstMatchingPanel.getAttribute('aria-labelledby')));
});

document.querySelectorAll('.add-data').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = 'Add source link to begin';
  });
});
