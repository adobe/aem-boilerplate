import { createOptimizedPicture } from '../../scripts/aem.js';

export default class Cards extends HTMLDivElement {
  connectedCallback() {
    /* change to ul, li */
    const ul = document.createElement('ul');
    [...this.children].forEach((row) => {
      const li = document.createElement('li');
      while (row.firstElementChild) li.append(row.firstElementChild);
      [...li.children].forEach((div) => {
        if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
        else div.className = 'cards-card-body';
      });
      ul.append(li);
    });
    ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
    this.textContent = '';
    this.append(ul);
  }
}
