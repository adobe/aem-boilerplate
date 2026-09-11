export default function decorate(block) {
  const img = block.querySelector(':scope > div:first-child picture img');
  if (!img) {
    block.classList.add('no-image');
    return;
  }
  // This banner is the LCP element — prioritize it and never lazy-load it.
  img.setAttribute('fetchpriority', 'high');
  img.setAttribute('loading', 'eager');
}
