import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  // Add desktop-only class to hide on mobile
  block.classList.add('desktop-only');
  
  // Get the title from the first row if it exists
  let title = "Table of Contents";
  if (block.firstElementChild && block.firstElementChild.firstElementChild) {
    title = block.firstElementChild.textContent.trim();
  }
  
  // Create the sidebar content container
  const sidebarContent = document.createElement('div');
  sidebarContent.className = 'web-sidebar';
  
  // Create a title for the table of contents
  const titleDiv = document.createElement('div');
  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  titleDiv.appendChild(titleElement);
  sidebarContent.appendChild(titleDiv);
  
  // Create a wrapper to maintain position
  const wrapper = document.createElement('div');
  wrapper.className = 'web-sidebar-wrapper';
  wrapper.style.position = 'relative'; // Important for absolute positioning
  
  // Clear existing content
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }
  
  // Add the wrapper and sidebar to the block
  wrapper.appendChild(sidebarContent);
  block.appendChild(wrapper);
  
  // Decorate icons if any
  decorateIcons(block);
  
  // Initialize sidebar immediately instead of waiting for load event
  setTimeout(initWebSidebar, 500);
  
  function initWebSidebar() {
    console.log('Initializing web sidebar');
    
    // Find the parent section or main content area
    const parentSection = findParentSection(block);
    const mainContent = findMainContent();
    
    // Generate table of contents from H2 tags
    generateTableOfContents(sidebarContent, mainContent);
    
    // Get the sidebar's initial position and dimensions
    const rect = sidebarContent.getBoundingClientRect();
    const sidebarTop = rect.top + window.scrollY;
    const headerHeight = 80; // Estimated header height, adjust if needed
    
    // Get the wrapper width for proper sizing
    const wrapperWidth = wrapper.offsetWidth;
    
    // Store the original left position relative to the wrapper
    const originalLeft = rect.left;
    
    console.log('Initial sidebar position:', {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      wrapperWidth: wrapperWidth,
      height: rect.height,
      sidebarTop: sidebarTop
    });
    
    // Function to handle scrolling
    function handleScroll() {
      const scrollY = window.scrollY;
      const sidebarHeight = sidebarContent.offsetHeight;
      
      // Calculate the bottom boundary of the parent section
      const parentBottom = parentSection ? 
        parentSection.getBoundingClientRect().bottom + window.scrollY : 
        document.body.scrollHeight;
      
      // Calculate the point where the sidebar should stop (accounting for sidebar height)
      const stopPoint = parentBottom - sidebarHeight;
      
      // Determine if we should be sticky and how
      if (scrollY > sidebarTop - headerHeight) {
        // Check if we've hit the bottom boundary
        if (parentSection && scrollY > stopPoint - headerHeight) {
          // Switch to absolute positioning at the bottom
          sidebarContent.style.position = 'absolute';
          sidebarContent.style.top = `${stopPoint - sidebarTop}px`;
          sidebarContent.style.width = `${wrapperWidth}px`;
          sidebarContent.style.left = '0'; // Keep it aligned with the wrapper
        } else {
          // Normal fixed positioning
          sidebarContent.style.position = 'fixed';
          sidebarContent.style.top = `${headerHeight}px`;
          sidebarContent.style.width = `${wrapperWidth}px`;
          
          // Calculate the correct left position to keep it in its container
          const wrapperRect = wrapper.getBoundingClientRect();
          sidebarContent.style.left = `${wrapperRect.left}px`;
        }
      } else {
        // Reset sidebar to normal flow
        sidebarContent.style.position = '';
        sidebarContent.style.top = '';
        sidebarContent.style.width = '';
        sidebarContent.style.left = '';
      }
      
      // Highlight the current section in the table of contents
      highlightCurrentSection();
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Add click event handling for smooth scrolling
    sidebarContent.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link) {
        event.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          // Scroll to the target with smooth behavior and account for header
          const headerHeight = 80; // Match the header height used elsewhere
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Highlight this section in the TOC
          const allLinks = sidebarContent.querySelectorAll('.toc-entry a');
          allLinks.forEach(link => {
            link.classList.remove('active');
          });
          link.classList.add('active');
          
          console.log('Scrolling to section:', targetId);
        }
      }
    });
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
  
  // Helper function to find the main content area
  function findMainContent() {
    // Look for the parent section of the sidebar
    const parentSection = findParentSection(block);
    
    // If we found a parent section, use that
    if (parentSection) {
      console.log('Found parent section for sidebar:', parentSection);
      return parentSection;
    }
    
    // Fallback to main content container
    const mainContent = document.querySelector('main');
    if (mainContent) return mainContent;
    
    // Further fallback to article or content div
    return document.querySelector('article') || document.querySelector('.content');
  }
  
  // Function to generate table of contents from H2 and H3 tags
  function generateTableOfContents(sidebar, contentArea) {
    if (!contentArea) return;
    
    console.log('Generating TOC for content area:', contentArea);
    
    // Find all H2 and H3 headings in the content area
    const h2Headings = contentArea.querySelectorAll('h2');
    const h3Headings = contentArea.querySelectorAll('h3');
    console.log('Found H2 headings:', h2Headings.length);
    console.log('Found H3 headings:', h3Headings.length);
    
    if (h2Headings.length === 0 && h3Headings.length === 0) {
      const noHeadings = document.createElement('div');
      noHeadings.textContent = 'No sections found';
      sidebar.appendChild(noHeadings);
      return;
    }
    
    // Get the title text to avoid duplicating it
    const titleElement = sidebar.querySelector('h3');
    const titleText = titleElement ? titleElement.textContent.trim() : '';
    
    // First, handle any H3 headings that come before the first H2
    if (h3Headings.length > 0) {
      let firstH2 = h2Headings.length > 0 ? h2Headings[0] : null;
      
      // Process H3 headings that come before the first H2
      h3Headings.forEach((h3, index) => {
        // Skip if this H3 comes after the first H2
        if (firstH2 && h3.compareDocumentPosition(firstH2) & Node.DOCUMENT_POSITION_PRECEDING) {
          return;
        }
        
        // Skip if this H3 has the same text as the title
        if (h3.textContent.trim() === titleText) {
          return;
        }
        
        // Create a unique ID for the H3 heading if it doesn't have one
        if (!h3.id) {
          h3.id = `early-subsection-${index}`;
        }
        
        // Create a table of contents entry for H3
        const subTocEntry = document.createElement('div');
        subTocEntry.className = 'toc-entry toc-h3';
        
        const subLink = document.createElement('a');
        subLink.href = `#${h3.id}`;
        subLink.textContent = h3.textContent;
        subLink.setAttribute('data-section-id', h3.id);
        
        subTocEntry.appendChild(subLink);
        sidebar.appendChild(subTocEntry);
      });
    }
    
    // Process each H2 heading
    h2Headings.forEach((heading, index) => {
      // Create a unique ID for the heading if it doesn't have one
      if (!heading.id) {
        heading.id = `section-${index}`;
      }
      
      // Create a table of contents entry for H2
      const tocEntry = document.createElement('div');
      tocEntry.className = 'toc-entry toc-h2';
      
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.setAttribute('data-section-id', heading.id);
      
      tocEntry.appendChild(link);
      sidebar.appendChild(tocEntry);
      
      // Find all H3 headings that follow this H2 until the next H2
      // BUT only if they're still within our content area
      let nextElement = heading.nextElementSibling;
      while (nextElement && nextElement.tagName !== 'H2') {
        if (nextElement.tagName === 'H3' && contentArea.contains(nextElement)) {
          // Create a unique ID for the H3 heading if it doesn't have one
          if (!nextElement.id) {
            nextElement.id = `subsection-${index}-${nextElement.textContent.toLowerCase().replace(/\s+/g, '-')}`;
          }
          
          // Create a table of contents entry for H3
          const subTocEntry = document.createElement('div');
          subTocEntry.className = 'toc-entry toc-h3';
          
          const subLink = document.createElement('a');
          subLink.href = `#${nextElement.id}`;
          subLink.textContent = nextElement.textContent;
          subLink.setAttribute('data-section-id', nextElement.id);
          
          subTocEntry.appendChild(subLink);
          sidebar.appendChild(subTocEntry);
        }
        nextElement = nextElement.nextElementSibling;
      }
    });
  }
  
  // Function to highlight the current section in the table of contents
  function highlightCurrentSection() {
    // Get all section headings (both H2 and H3) within our content area
    const contentArea = findMainContent();
    const headings = Array.from(contentArea.querySelectorAll('h2[id], h3[id]'));
    if (headings.length === 0) return;
    
    // Get current scroll position with a small offset
    const scrollPosition = window.scrollY + 100;
    
    // Find the current heading
    let currentHeadingId = headings[0].id;
    
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const headingPosition = heading.getBoundingClientRect().top + window.scrollY;
      
      if (scrollPosition >= headingPosition) {
        currentHeadingId = heading.id;
      } else {
        break;
      }
    }
    
    // Remove active class from all links
    const allLinks = sidebarContent.querySelectorAll('.toc-entry a');
    allLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current section link
    const currentLink = sidebarContent.querySelector(`a[data-section-id="${currentHeadingId}"]`);
    if (currentLink) {
      currentLink.classList.add('active');
    }
  }
}