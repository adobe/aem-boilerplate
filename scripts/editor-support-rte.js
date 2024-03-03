// group editable texts in single wrappers if applicable
//
// this script should execute after script.js by editor-support.js

// eslint-disable-next-line import/prefer-default-export
export function decorateRichtext(container = document) {
  function deleteInstrumentation(element) {
    delete element.dataset.richtextResource;
    delete element.dataset.richtextProp;
    delete element.dataset.richtextFilter;
  }

  let element;
  // eslint-disable-next-line no-cond-assign
  while (element = container.querySelector('[data-richtext-resource]')) {
    const { richtextResource, richtextProp, richtextFilter } = element.dataset;
    deleteInstrumentation(element);
    const siblings = [];
    let sibling = element;
    // eslint-disable-next-line no-cond-assign
    while (sibling = sibling.nextElementSibling) {
      if (sibling.dataset.richtextResource === richtextResource
        && sibling.dataset.richtextProp === richtextProp) {
        deleteInstrumentation(sibling);
        siblings.push(sibling);
      } else break;
    }
    const orphanElements = document.querySelectorAll(`[data-richtext-id="${richtextResource}"][data-richtext-prop="${richtextProp}"]`);
    if (orphanElements.length) {
      // eslint-disable-next-line no-console
      console.warn('Found orphan elements of a richtext, that were not consecutive siblings of '
        + 'the first paragraph.', orphanElements);
      orphanElements.forEach((el) => deleteInstrumentation(el));
    } else {
      const group = document.createElement('div');
      group.dataset.aueResource = richtextResource;
      group.dataset.aueProp = richtextProp;
      if (richtextFilter) group.dataset.aueFilter = richtextFilter;
      group.dataset.aueBehavior = 'component';
      group.dataset.aueType = 'richtext';
      element.replaceWith(group);
      group.append(element, ...siblings);
    }
  }
}

decorateRichtext();
