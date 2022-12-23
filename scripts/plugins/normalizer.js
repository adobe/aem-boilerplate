/**
 * Normalizes all headings within a container element.
 * @param {Element} el The container element
 * @param {[string]} allowedHeadings The list of allowed headings (h1 ... h6)
 */
function normalizeHeadings(el, allowedHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
  const allowed = allowedHeadings.map((h) => h.toLowerCase());
  el.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((tag) => {
    const h = tag.tagName.toLowerCase();
    if (allowed.indexOf(h) === -1) {
      // current heading is not in the allowed list -> try first to "promote" the heading
      let level = parseInt(h.charAt(1), 10) - 1;
      while (allowed.indexOf(`h${level}`) === -1 && level > 0) {
        level -= 1;
      }
      if (level === 0) {
        // did not find a match -> try to "downgrade" the heading
        while (allowed.indexOf(`h${level}`) === -1 && level < 7) {
          level += 1;
        }
      }
      if (level !== 7) {
        tag.outerHTML = `<h${level} id="${tag.id}">${tag.textContent}</h${level}>`;
      }
    }
  });
}

/**
 * The plugin API
 */
export const api = {
  normalizeHeadings,
};

/**
 * Logic to execute in the pre lazy phase
 */
export async function preLazy(doc, options = {}) {
  doc.normalize();
  doc.querySelectorAll('*:empty').forEach((el) => {
    if (!el.classList.length && !el.attributes.length) {
      el.remove();
    }
  });
  normalizeHeadings(doc, options.allowedHeadings);
}
