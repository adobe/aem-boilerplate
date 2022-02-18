import {
  decorateMain,
  loadBlocks,
} from '../../scripts/scripts.js';

export default async function decorate(block) {
  const ref = block.textContent.trim();
  const path = new URL(ref, window.location.href).pathname.split('.')[0];
  const resp = await fetch(`${path}.plain.html`);
  if (resp.ok) {
    const main = document.createElement('main');
    main.innerHTML = await resp.text();
    const img = main.querySelector('img');
    if (img) img.setAttribute('loading', 'lazy');
    decorateMain(main);
    await loadBlocks(main);
    const sections = [...main.children];
    const blockSection = block.closest('.section');
    sections.forEach((section, i) => {
      if (!i) {
        while (sections[0].firstChild) {
          blockSection.insertBefore(sections[0].firstChild, block.closest('.fragment-wrapper'));
        }
      } else {
        blockSection.insertBefore(section, blockSection.nextElementSibling);
      }
    });
  }
  block.closest('.fragment-wrapper').remove();
}
