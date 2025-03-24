async function getQueryIndex(url) {
  try {
    const response = await window.fetch(url);
    if (!response.ok) return null;
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed to get query index', { error });
  }
  return null;
}

/**
 * From Adobe blog: https://github.com/adobe/blog/
 * Create an element with ID, class, children, and attributes
 * @param {String} tag the tag nav of the element
 * @param {Object} attributes the attributes of the tag
 * @param {HTMLElement} html the content of the element
 * @returns {HTMLElement} the element created
 */
function createTag(tag, attributes, html) {
  const el = document.createElement(tag);
  if (html) {
    if (html instanceof HTMLElement) {
      el.append(html);
    } else {
      el.insertAdjacentHTML('beforeend', html);
    }
  }
  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      el.setAttribute(key, attributes[key]);
    });
  }
  return el;
}

export {
  createTag,
  getQueryIndex,
};
