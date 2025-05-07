import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  // Add desktop-only class to hide on mobile
  block.classList.add('desktop-only');
  
  // Create a wrapper to maintain position
  const wrapper = document.createElement('div');
  wrapper.className = 'sticky-battlepass-wrapper';
  wrapper.style.position = 'relative'; // Important for absolute positioning
  
  // Get the existing content
  const content = block.querySelector('div');
  
  // Clear existing content
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }
  
  // Add the wrapper and content to the block
  if (content) {
    wrapper.appendChild(content);
  }
  block.appendChild(wrapper);
  
  // Decorate icons if any
  decorateIcons(block);
  
  // Initialize battlepass immediately instead of waiting for load event
  setTimeout(initStickyBattlepass, 500);
  
  function initStickyBattlepass() {
    console.log('Initializing sticky battlepass');
    
    // Find the parent section or main content area
    const parentSection = findParentSection(block);
    
    // Get the battlepass's initial position and dimensions
    const rect = content.getBoundingClientRect();
    const contentTop = rect.top + window.scrollY;
    const headerHeight = 80; // Estimated header height, adjust if needed
    
    // Get the wrapper width for proper sizing
    const wrapperWidth = wrapper.offsetWidth;
    
    console.log('Initial battlepass position:', {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      wrapperWidth: wrapperWidth,
      height: rect.height,
      contentTop: contentTop
    });
    
    // Function to handle scrolling
    function handleScroll() {
      const scrollY = window.scrollY;
      const contentHeight = content.offsetHeight;
      
      // Calculate the bottom boundary of the parent section
      const parentBottom = parentSection ? 
        parentSection.getBoundingClientRect().bottom + window.scrollY : 
        document.body.scrollHeight;
      
      // Calculate the point where the battlepass should stop (accounting for content height)
      const stopPoint = parentBottom - contentHeight;
      
      // Determine if we should be sticky and how
      if (scrollY > contentTop - headerHeight) {
        // Check if we've hit the bottom boundary
        if (parentSection && scrollY > stopPoint - headerHeight) {
          // Switch to absolute positioning at the bottom
          content.style.position = 'absolute';
          content.style.top = `${stopPoint - contentTop}px`;
          content.style.width = `${wrapperWidth}px`;
        } else {
          // Normal fixed positioning
          content.style.position = 'fixed';
          content.style.top = `${headerHeight}px`;
          content.style.width = `${wrapperWidth}px`;
          
          // Calculate the correct left position to keep it in its container
          const wrapperRect = wrapper.getBoundingClientRect();
          content.style.left = `${wrapperRect.left}px`;
        }
      } else {
        // Reset content to normal flow
        content.style.position = '';
        content.style.top = '';
        content.style.width = '';
        content.style.left = '';
      }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
  }
  
  // Helper function to find the parent section or main content area
  function findParentSection(element) {
    // Look for parent section, main, or specific container classes
    let current = element.parentElement;
    while (current) {
      if (current.tagName === 'SECTION' || 
          current.tagName === 'MAIN' || 
          current.classList.contains('section') ||
          current.classList.contains('main-content')) {
        return current;
      }
      current = current.parentElement;
    }
    return null; // Fall back to document body if no suitable container found
  }
}