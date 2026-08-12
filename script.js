const search = document.querySelector('#search');
const details = [...document.querySelectorAll('.modules details')];
details.forEach((group) => { group.open = true; });

search.addEventListener('input', (event) => {
  const term = event.target.value.trim().toLowerCase();
  details.forEach((group) => {
    const matches = [...group.querySelectorAll('.feature')].some((item) => item.textContent.toLowerCase().includes(term));
    group.hidden = Boolean(term) && !matches;
    if (term && matches) group.open = true;
  });
});

document.querySelectorAll('.add-data').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = 'Add source link to begin';
  });
});
