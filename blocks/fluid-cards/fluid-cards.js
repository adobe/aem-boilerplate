import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Process each card
  [...block.children].forEach((card) => {
    // Extract data from the first div (hidden data)
    const dataDiv = card.children[0];
    if (dataDiv && dataDiv.textContent) {
      const dataParts = dataDiv.textContent.trim().split(' ');
      if (dataParts.length >= 2) {
        const width = dataParts[0]; // e.g., "50" or "100"
        const alignment = dataParts[1]; // e.g., "center" or "right"
        
        // Set data attributes on the card
        card.setAttribute('data-width', width);
        card.setAttribute('data-alignment', alignment);
      }
    }
    
    // Optimize images
    const pictures = card.querySelectorAll('picture');
    pictures.forEach((picture) => {
      const img = picture.querySelector('img');
      if (img) {
        picture.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]));
      }
    });
    
    // Make the entire card clickable
    const contentDiv = card.children[2];
    if (contentDiv) {
      // Find the link in the content div - now it's directly in a paragraph
      const link = contentDiv.querySelector('a');
      if (link) {
        const href = link.getAttribute('href');
        const title = link.getAttribute('title') || '';
        
        // Make the entire card clickable
        card.addEventListener('click', (e) => {
          // Only trigger if the click wasn't on the link itself
          if (!e.target.closest('a')) {
            window.location.href = href;
          }
        });
        
        // Add cursor pointer to indicate clickability
        card.style.cursor = 'pointer';
      }
    }
  });
  
  // Apply responsive layout
  const applyResponsiveLayout = () => {
    const cards = [...block.children];
    
    if (window.innerWidth < 768) {
      // On mobile, all cards are 100% width
      cards.forEach(card => {
        card.style.width = '100%';
      });
    } else {
      // On desktop, respect the data-width attribute
      cards.forEach(card => {
        const width = card.getAttribute('data-width');
        if (width === '50') {
          card.style.width = 'calc(50% - 18px)';
        } else if (width === '100') {
          card.style.width = '100%';
        }
      });
    }
  };
  
  // Apply layout initially and on resize
  applyResponsiveLayout();
  window.addEventListener('resize', applyResponsiveLayout);
}