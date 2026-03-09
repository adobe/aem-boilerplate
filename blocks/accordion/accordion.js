import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'accordion-item';
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);

    const [label, body] = [...li.children];
    if (label) {
      label.className = 'accordion-item-label';
      label.addEventListener('click', () => li.classList.toggle('active'));
    }
    if (body) body.className = 'accordion-item-body';

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
