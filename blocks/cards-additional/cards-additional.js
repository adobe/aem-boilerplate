export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-additional-card-image';
      else div.className = 'cards-additional-card-body';
    });
    ul.append(li);
  });
  /*
   * The images here are small vector/line icons (SVGs and proxied icon URLs).
   * Re-rasterising them via createOptimizedPicture is wrong for icons and breaks
   * proxied _next/image URLs whose query string carries the asset path, so the
   * authored <picture> is preserved as-is. Ensure the icons stay lazy.
   */
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
  });
  block.replaceChildren(ul);
}
