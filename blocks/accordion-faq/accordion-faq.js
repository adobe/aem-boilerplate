/*
 * accordion-faq block
 * Single-open FAQ accordion (matches source behaviour: opening one item
 * closes the others). Built on native <details>/<summary> for accessible,
 * keyboard-friendly expand/collapse; a toggle listener enforces single-open.
 * https://www.aem.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  const items = [];

  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-faq-item-label';
    summary.append(...label.childNodes);

    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-faq-item-body';

    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-faq-item';
    details.append(summary, body);
    row.replaceWith(details);
    items.push(details);
  });

  // single-open behaviour: when one item opens, close the others
  items.forEach((details) => {
    details.addEventListener('toggle', () => {
      if (details.open) {
        items.forEach((other) => {
          if (other !== details) other.open = false;
        });
      }
    });
  });
}
