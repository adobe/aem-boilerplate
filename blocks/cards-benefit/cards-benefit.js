export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-benefit-card-image';
      else div.className = 'cards-benefit-card-body';
    });
    ul.append(li);
  });
  /*
   * The images in this block are small vector/line icons (SVGs and proxied
   * icon URLs). Re-rasterising them via createOptimizedPicture is wrong for
   * icons and breaks proxied URLs whose query string carries the asset path,
   * so the authored <picture> is preserved as-is. Ensure images stay lazy.
   */
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
  });
  block.replaceChildren(ul);
}
