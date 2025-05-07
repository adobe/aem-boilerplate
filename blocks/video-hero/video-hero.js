// video hero block

function decorateHeroLayout(block) {
  const background = block.firstElementChild;
  let foreground = block.lastElementChild;
  background.className = 'background';
  foreground.className = 'foreground';
  if (block.children.length > 2) {
    const wrap = document.createElement('div', { className: 'foreground' });
    [...block.children].slice(1).forEach(b => wrap.appendChild(b));
    foreground = wrap;
  }
  return { background, foreground };
}

export default function decorate(block) {
    // Validate that we received a valid DOM element
    if (!block || !(block instanceof HTMLElement)) {
      console.warn('Invalid block parameter');
      return;
    }
  
    try {
      const { background, foreground } = decorateHeroLayout(block);
      const videoLink = background.querySelector('a');
      const videoUrl = videoLink?.href;
      
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
        // Insert the video
        background.replaceChildren(videoEl);
      }

      // create scrolling parallax
      if (block.classList.contains('parallax')) {
        window.onscroll = function(){
          // offset scrollposition by setting inset value
          const offset = window.pageYOffset * 0.8;
          background.firstChild.style.inset = `calc(1px + ${offset}px) 50%`;
        };
      }
    } catch (error) {
      // Log any errors that occur during execution
      console.error('Error in video-hero decoration:', error);
    }
  }