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
    
    // Create the hero section container
    const heroSection = document.createElement('div');
    heroSection.className = 'section hero-container';
    heroSection.setAttribute('data-section-status', 'loaded');
    
    // Create the default content wrapper (this will contain all content)
    const defaultContentWrapper = document.createElement('div');
    defaultContentWrapper.className = 'default-content-wrapper';
    
    // Create a paragraph for the picture
    const picturePara = document.createElement('p');
    
    // Clone the picture with all its content
    const pictureClone = picture.cloneNode(true);
    
    // Make sure the img inside has the proper attributes
    const img = pictureClone.querySelector('img');
    if (img) {
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.setAttribute('loading', 'eager');
    }
    
    picturePara.appendChild(pictureClone);
    defaultContentWrapper.appendChild(picturePara);
    
    // Get all elements in the same section
    const h1s = section.querySelectorAll('h1');
    const paragraphs = section.querySelectorAll('p:not(:has(picture))');
    const links = section.querySelectorAll('a:not(p a)');
    
    // Elements to remove after processing
    const elementsToRemove = [];
    
    // Process h1s
    h1s.forEach((h1) => {
        const clonedH1 = h1.cloneNode(true);
        defaultContentWrapper.appendChild(clonedH1);
        elementsToRemove.push(h1);
    });
  
    // Process p tags (excluding those with pictures)
    paragraphs.forEach((p) => {
        const clonedP = p.cloneNode(true);
        defaultContentWrapper.appendChild(clonedP);
        elementsToRemove.push(p);
    });
  
    // Process standalone links
    links.forEach((link) => {
        // Create a button container paragraph
        const buttonContainer = document.createElement('p');
        buttonContainer.className = 'button-container';
        
        const clonedLink = link.cloneNode(true);
        clonedLink.className = 'button';
        buttonContainer.appendChild(clonedLink);
        
        defaultContentWrapper.appendChild(buttonContainer);
        elementsToRemove.push(link);
    });
    
    // Add the default content wrapper to the hero section
    heroSection.appendChild(defaultContentWrapper);
    
    // Create the empty hero structure
    const heroWrapper = document.createElement('div');
    heroWrapper.className = 'hero-wrapper';
    
    const heroBlock = document.createElement('div');
    heroBlock.className = 'hero block';
    heroBlock.setAttribute('data-block-name', 'hero');
    heroBlock.setAttribute('data-block-status', 'loaded');
    
    // Create the nested divs (empty)
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    
    // Build the empty hero structure
    div1.appendChild(div2);
    heroBlock.appendChild(div1);
    heroWrapper.appendChild(heroBlock);
    heroSection.appendChild(heroWrapper);
    
    // Add to the page
    main.prepend(heroSection);
    
    // Remove the original elements to prevent duplication
    if (picture.parentNode) {
        if (picture.parentNode.childNodes.length === 1) {
            // If picture is the only child of its parent, remove the parent
            elementsToRemove.push(picture.parentNode);
        } else {
            // Otherwise just remove the picture
            elementsToRemove.push(picture);
        }
    }
    
    // Remove all elements that need to be removed
    elementsToRemove.forEach(element => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
}