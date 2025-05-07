import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'store-cards-card-image';
      else div.className = 'store-cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
  
  // Add specific styling for "FREE TO PLAY" text
  setTimeout(() => {
    const cardBodies = block.querySelectorAll('.store-cards-card-body');
    cardBodies.forEach(body => {
      // Find paragraphs that contain exactly "FREE TO PLAY" text
      const paragraphs = body.querySelectorAll('p');
      paragraphs.forEach(p => {
        if (p.textContent.trim() === 'FREE TO PLAY') {
          p.style.textAlign = 'right';
          p.style.fontWeight = '500';
          p.style.fontSize = '1.25rem';
          p.style.letterSpacing = '1px';
          p.style.fontFamily = "'Hitmarker Condensed Black', sans-serif";
          p.style.marginTop = 'auto';
          
          // Add a class for easier CSS targeting
          p.classList.add('free-to-play');
        }
      });
      
      // Make sure platform icons are left-aligned
      const iconParagraphs = Array.from(paragraphs).filter(p => 
        p.querySelector('.icon') && !p.classList.contains('free-to-play')
      );
      
      iconParagraphs.forEach(p => {
        p.style.textAlign = 'left';
      });
    });
  }, 100); // Small delay to ensure DOM is fully processed
}
