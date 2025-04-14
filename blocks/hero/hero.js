/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
    const picture = main.querySelector('picture');
    if (!picture) return;
  
    // Find the closest section or div that contains the picture
    const section = picture.closest('div') || picture.parentElement;
    if (!section) return;
    
    const heroElements = [picture.cloneNode(true)];
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'hero-content-wrapper';
    
    // Get all elements in the same section
    const h1s = section.querySelectorAll('h1');
    const paragraphs = section.querySelectorAll('p');
    const links = section.querySelectorAll('a:not(p a)'); // Get links that aren't inside paragraphs
    
    // Elements to remove after processing
    const elementsToRemove = [picture];
    
    // Process h1s
    h1s.forEach((h1) => {
      // eslint-disable-next-line no-bitwise
      if (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING) {
        contentWrapper.appendChild(h1.cloneNode(true));
        elementsToRemove.push(h1);
      }
    });
  
    // Process p tags
    paragraphs.forEach((p) => {
      // eslint-disable-next-line no-bitwise
      if (p.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING) {
        contentWrapper.appendChild(p.cloneNode(true));
        elementsToRemove.push(p);
      }
    });
  
    // Process standalone links
    links.forEach((link) => {
      // eslint-disable-next-line no-bitwise
      if (link.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING) {
        const clonedLink = link.cloneNode(true);
        clonedLink.className = 'button';
        contentWrapper.appendChild(clonedLink);
        elementsToRemove.push(link);
      }
    });
  
    // Add all collected elements to heroElements in order
    if (contentWrapper.children.length > 0) {
      heroElements.push(contentWrapper);
      const heroSection = document.createElement('div');
      heroSection.append(buildBlock('hero', { elems: heroElements }));
      main.prepend(heroSection);
      
      // Remove the original elements to prevent duplication
      elementsToRemove.forEach(element => element.remove());
    }
  }
  