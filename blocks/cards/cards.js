export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    if (li.children.length === 1 && li.querySelector('picture')) li.className = 'cards-card-image';
    else li.className('cards-card-body');
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
