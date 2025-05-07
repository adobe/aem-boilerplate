import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the news list block
 * @param {Element} block The news list block element
 */
export default function decorate(block) {
  // Process each news item
  [...block.children].forEach((item, index) => {
    // Add class to identify first item vs others
    if (index === 0) {
      item.classList.add('news-item-featured');
      
      // Create metadata container for featured item
      createMetadataContainer(item);
      
      // Make image clickable
      makeImageClickable(item);
    } else {
      item.classList.add('news-item-regular');
      
      // For regular items, we need to ensure the content is in the right column
      // First div is the image column, second div is the content column
      const imageColumn = item.querySelector(':scope > div:first-child');
      const contentColumn = document.createElement('div');
      contentColumn.className = 'content-column';
      
      // Move all elements except the first div (image) to the content column
      const elementsToMove = [];
      [...item.children].forEach((child, childIndex) => {
        if (childIndex > 0) {
          elementsToMove.push(child);
        }
      });
      
      // Append elements to content column
      elementsToMove.forEach(element => {
        contentColumn.appendChild(element);
      });
      
      // Clear item and append image and content columns
      while (item.firstChild) {
        if (item.firstChild !== imageColumn) {
          item.removeChild(item.firstChild);
        } else {
          break;
        }
      }
      item.appendChild(contentColumn);
      
      // Create metadata container for regular item
      const tagsElement = contentColumn.querySelector(':scope > div:nth-child(2)');
      const dateElement = contentColumn.querySelector(':scope > div:nth-child(3)');
      
      if (tagsElement && dateElement) {
        // Create a metadata container
        const metadataContainer = document.createElement('div');
        metadataContainer.className = 'news-item-metadata';
        
        // Move tags and date into the metadata container
        tagsElement.classList.add('news-item-tags');
        dateElement.classList.add('news-item-date');
        
        // Insert the metadata container after the button container
        const buttonContainer = contentColumn.querySelector('.button-container');
        if (buttonContainer) {
          contentColumn.insertBefore(metadataContainer, tagsElement);
        } else {
          contentColumn.appendChild(metadataContainer);
        }
        
        // Move tags and date into the metadata container
        metadataContainer.appendChild(tagsElement);
        metadataContainer.appendChild(dateElement);
      }
      
      // Make image clickable
      makeImageClickable(item);
    }
    
    // Format tags to remove commas
    formatTags(item);
    
    // Optimize images if needed
    const pictures = item.querySelectorAll('picture');
    pictures.forEach((picture) => {
      const img = picture.querySelector('img');
      if (img) {
        // We're keeping the existing picture structure as it already has responsive sources
        // But we could replace with optimized pictures if needed:
        // picture.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]));
      }
    });
  });
  
  /**
   * Creates a metadata container for tags and date
   * @param {Element} container The container element
   */
  function createMetadataContainer(container) {
    const tagsElement = container.querySelector(':scope > div:nth-child(3)');
    const dateElement = container.querySelector(':scope > div:nth-child(4)');
    
    if (tagsElement && dateElement) {
      // Create a metadata container
      const metadataContainer = document.createElement('div');
      metadataContainer.className = 'news-item-metadata';
      
      // Move tags and date into the metadata container
      tagsElement.classList.add('news-item-tags');
      dateElement.classList.add('news-item-date');
      
      // Insert the metadata container before the tags element
      container.insertBefore(metadataContainer, tagsElement);
      
      // Move tags and date into the metadata container
      metadataContainer.appendChild(tagsElement);
      metadataContainer.appendChild(dateElement);
    }
  }
  
  /**
   * Makes the image clickable, linking to the same URL as the title
   * @param {Element} item The news item element
   */
  function makeImageClickable(item) {
    // Find the link in the button container
    const link = item.querySelector('.button-container a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    const title = link.getAttribute('title') || '';
    
    // Find the image container
    const imageContainer = item.querySelector('div:first-child');
    if (!imageContainer) return;
    
    // Make the image container clickable
    imageContainer.style.cursor = 'pointer';
    imageContainer.setAttribute('title', title);
    imageContainer.addEventListener('click', () => {
      window.location.href = href;
    });
  }
  
  /**
   * Formats tags to remove commas and improve structure
   * @param {Element} item The news item element
   */
  function formatTags(item) {
    const tagsContainer = item.querySelector('.news-item-tags');
    if (!tagsContainer) return;
    
    const tagsP = tagsContainer.querySelector('p');
    if (!tagsP) return;
    
    // Get the HTML content
    const html = tagsP.innerHTML;
    
    // Replace commas with empty string
    const cleanedHtml = html.replace(/,\s*/g, '');
    
    // Update the HTML
    tagsP.innerHTML = cleanedHtml;
  }
}