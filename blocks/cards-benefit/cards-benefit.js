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
   * The images are small ~60px icons. The EDS pipeline auto-generates a
   * <picture> requesting width=2000/750 renditions, which Lighthouse flags as
   * "properly size images". Cap every icon rendition to width=150 (~2.5x the
   * 60px display for retina) on all <source srcset> and <img src>, add explicit
   * width/height to reserve layout (avoid CLS), and keep them lazy.
   */
  const capWidth = (v) => (v ? v.replace(/width=\d+/g, 'width=150') : v);
  ul.querySelectorAll('source').forEach((s) => {
    const ss = s.getAttribute('srcset');
    if (ss) s.setAttribute('srcset', capWidth(ss));
  });
  ul.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (src) img.setAttribute('src', capWidth(src));
    img.setAttribute('loading', 'lazy');
    if (!img.getAttribute('width')) img.setAttribute('width', '60');
    if (!img.getAttribute('height')) img.setAttribute('height', '60');
  });
  block.replaceChildren(ul);
}