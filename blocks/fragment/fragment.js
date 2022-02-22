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
    decorateMain(main);
    await loadBlocks(main);
    const blockSection = block.closest('.section');
    const fragmentSection = main.querySelector(':scope .section');
    while (fragmentSection && fragmentSection.firstChild) {
      blockSection.insertBefore(fragmentSection.firstChild, block.closest('.fragment-wrapper'));
    }
  }
  block.closest('.fragment-wrapper').remove();
}
