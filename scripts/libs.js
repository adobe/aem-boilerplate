export const config = {
  elementBlocks: ['header', 'footer'],
  breakpoints: {
    s: 0,
    m: 768,
    l: 1024,
    xl: 1280,
    xxl: 1920,
  },
  joinParams: ['class'],
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
};

export function getBreakPoints() {
  window.raqnBreakpoints = window.raqnBreakpoints || {};
  const breakpoints = Object.keys(config.breakpoints);
  window.raqnBreakpoints = breakpoints.filter(
    (bp) => matchMedia(`(min-width: ${config.breakpoints[bp]}px)`).matches,
  );
  return window.raqnBreakpoints;
}

export function getBreakPoint() {
  const b = getBreakPoints();
  return b[b.length - 1];
}

export const debounce = (func, wait, immediate) => {
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      if (!immediate) {
        func(...args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func(...args);
    }
  };
};

export const eagerImage = (block, length = 1) => {
  const imgs = Array.from(block.querySelectorAll('img')).slice(0, length);
  imgs.forEach((img) => {
    const width = img.getAttribute('width');
    const height = img.getAttribute('height');
    const ratio = Math.floor((width / height) * 100) / 100;
    img.style.aspectRatio = ratio;
    img.setAttribute('loading', 'eager');
  });
};
