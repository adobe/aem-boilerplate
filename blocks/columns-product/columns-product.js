export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-product-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-product-img-col');
        }
      }

      // Buttonize standalone CTA links ("Apply Now", "Check MITC").
      // The project's global decorateButtons only styles links wrapped in
      // <strong>/<em>; within this product block every standalone paragraph
      // link is a primary CTA, so promote it to the global orange pill button.
      col.querySelectorAll('p > a[href]').forEach((a) => {
        const p = a.parentElement;
        if (p.childElementCount === 1 && p.textContent.trim() === a.textContent.trim()) {
          p.classList.add('button-wrapper');
          a.classList.add('button');
        }
      });
    });
  });
}
