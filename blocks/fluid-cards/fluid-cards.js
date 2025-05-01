import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Process each card
  [...block.children].forEach((card) => {
    // Extract data from the first div (hidden data)
    const meta = card.firstElementChild;
    if (meta && meta.textContent) {
      const data = meta.textContent.trim().split(' ');
      if (data.length >= 2) {
        const [width, align] = data;
        card.setAttribute('data-width', width);
        card.setAttribute('data-alignment', align);
      }
    }
    meta.remove();
    
    // Optimize images
    const pictures = card.querySelectorAll('picture');
    pictures.forEach((picture) => {
      const img = picture.querySelector('img');
      if (img) {
        picture.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]));
      }
    });
    
    // Make the entire card clickable
    const bg = card.firstElementChild;
    if (bg) {
      bg.className = 'background';
      // Find the link in the content div - now it's directly in a paragraph
      const link = bg.querySelector('a');
      if (link) {
        const href = link.getAttribute('href');
        const title = link.getAttribute('title') || '';
        card.setAttribute('title', title);
        
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

    const fg = card.lastElementChild;
    fg.className = 'foreground';
  });
}
