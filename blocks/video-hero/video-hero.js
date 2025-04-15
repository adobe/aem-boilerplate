// made with moon energy crystals by ur boy frank

export default function decorate(block) {
    // Validate that we received a valid DOM element
    if (!block || !(block instanceof HTMLElement)) {
      console.warn('Invalid block parameter');
      return;
    }
  
    try {
      // PART 1: VIDEO HANDLING
      // Find the first paragraph element in the block that contains our video
      const videoContainer = block.querySelector('p');
      
      if (videoContainer) {
        // Check if video URL is inside an <a> tag or direct text
        const videoLink = videoContainer.querySelector('a');
        // If there's an <a> tag, get href, otherwise get text content
        const videoUrl = videoLink ? videoLink.href : videoContainer.textContent?.trim();
  
        // Only process if it's a .mp4 video
        if (videoUrl?.endsWith('.mp4')) {
          // Create new video element with specific attributes
          const videoEl = document.createElement('video');
          // Set multiple attributes at once using Object.assign
          Object.assign(videoEl, {
            autoplay: true,    // Video plays automatically
            loop: true,        // Video will loop when finished
            muted: true,       // No sound by default
            playsInline: true  // iOS-specific: play inline instead of fullscreen
          });
          
          // Create and configure source element for the video
          const sourceEl = document.createElement('source');
          sourceEl.src = videoUrl;      // Set video source URL
          sourceEl.type = 'video/mp4'; // Set MIME type
          
          // Build video element structure
          videoEl.appendChild(sourceEl);
          // Clear existing content (link or text)
          videoContainer.innerHTML = '';
          // Insert the video
          videoContainer.appendChild(videoEl);
        }
      }
      
      // Add a background overlay to improve content visibility
      const overlayDiv = document.createElement('div');
      overlayDiv.classList.add('video-overlay');
      
      // Insert the overlay as the first child of the first div in the block
      const firstDiv = block.querySelector('div');
      if (firstDiv) {
        firstDiv.insertBefore(overlayDiv, firstDiv.firstChild);
      }
      
      // Make sure parent containers have proper height
      const parentSection = block.closest('.section');
      if (parentSection) {
        parentSection.style.height = '120vh';
      }
      
      // Ensure the video container has proper height
      const videoHeroWrapper = block.closest('.video-hero-wrapper');
      if (videoHeroWrapper) {
        videoHeroWrapper.style.height = '120vh';
      }
      
    } catch (error) {
      // Log any errors that occur during execution
      console.error('Error in video-hero decoration:', error);
    }
  }