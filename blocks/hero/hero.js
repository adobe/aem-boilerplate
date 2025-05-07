/**
 * Builds hero block based on the Adobe Document Authoring structure.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
    // Find all hero containers
    const heroContainers = main.querySelectorAll('.hero-container');
    if (!heroContainers.length) return;
    
    heroContainers.forEach(container => {
      // Get the original hero block
      const originalBlock = container.querySelector('.hero');
      if (!originalBlock) return;
      
      // Create new structure
      const heroWrapper = document.createElement('div');
      heroWrapper.className = 'hero-wrapper';
      
      const heroBlock = document.createElement('div');
      heroBlock.className = 'hero block';
      heroBlock.setAttribute('data-block-name', 'hero');
      heroBlock.setAttribute('data-block-status', 'loaded');
      
      // Create content container
      const contentContainer = document.createElement('div');
      contentContainer.className = 'hero-content-container';
      
      // Extract content from original structure
      let imageElement = null;
      let titleElement = null;
      let buttonElement = null;
      let descriptionElement = null;
      
      // Process each content div
      const contentDivs = originalBlock.querySelectorAll(':scope > div');
      contentDivs.forEach(div => {
        const labelDiv = div.querySelector(':scope > div:first-child');
        const contentDiv = div.querySelector(':scope > div:last-child');
        
        if (!labelDiv || !contentDiv) return;
        
        const labelText = labelDiv.textContent.trim().toLowerCase();
        
        switch (labelText) {
          case 'image':
            imageElement = contentDiv.querySelector('picture');
            break;
          case 'title':
            titleElement = contentDiv;
            break;
          case 'button-link':
            buttonElement = contentDiv;
            break;
          case 'description':
            descriptionElement = contentDiv;
            break;
        }
      });
      
      // Add image
      if (imageElement) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'hero-image-container';
        imageContainer.appendChild(imageElement.cloneNode(true));
        heroBlock.appendChild(imageContainer);
      }
      
      // Add title
      if (titleElement) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'hero-title-container';
        titleContainer.innerHTML = titleElement.innerHTML;
        contentContainer.appendChild(titleContainer);
      }
      
      // Add description
      if (descriptionElement) {
        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'hero-description-container';
        descriptionContainer.innerHTML = descriptionElement.innerHTML;
        contentContainer.appendChild(descriptionContainer);
      }
      
      // Add button
      if (buttonElement) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'hero-button-container';
        buttonContainer.innerHTML = buttonElement.innerHTML;
        contentContainer.appendChild(buttonContainer);
      }
      
      // Add content container to hero block
      heroBlock.appendChild(contentContainer);
      
      // Add gradients for better text visibility
      const gradients = document.createElement('div');
      gradients.className = 'gradients';
      
      const leftGradient = document.createElement('div');
      leftGradient.className = 'left';
      
      const rightGradient = document.createElement('div');
      rightGradient.className = 'right';
      
      gradients.appendChild(leftGradient);
      gradients.appendChild(rightGradient);
      
      heroBlock.appendChild(gradients);
      
      // Add hero block to wrapper
      heroWrapper.appendChild(heroBlock);
      
      // Replace original content with new structure
      container.innerHTML = '';
      container.appendChild(heroWrapper);
    });
  }
  
  // Add the block to the blocks object for initialization
  (function() {
    const { buildBlock, loadBlocks } = window.nx;
    
    // Define the hero block builder
    buildBlock('hero', buildHeroBlock);
    
    // Run on document load
    document.addEventListener('DOMContentLoaded', () => {
      loadBlocks(document.querySelector('main'));
    });
  })();