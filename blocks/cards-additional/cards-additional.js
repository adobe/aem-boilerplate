/**
 * cards-additional — "Additional Benefits with ETERNA"
 * The source renders these benefits in a horizontal slider with prev/next
 * arrows. We rebuild that as an accessible, dependency-free carousel: a
 * scroll-snap track (native touch/trackpad swipe + keyboard) plus prev/next
 * buttons that scroll by one card. No auto-play (source has none).
 */

function updateArrows(track, prev, next) {
  const maxScroll = track.scrollWidth - track.clientWidth;
  const x = Math.round(track.scrollLeft);
  prev.disabled = x <= 0;
  next.disabled = x >= maxScroll - 1;
}

export default function decorate(block) {
  // Convert the authored rows into ul > li cards (same content model as before).
  const ul = document.createElement('ul');
  ul.className = 'cards-additional-track';
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-additional-card-image';
      else div.className = 'cards-additional-card-body';
    });
    ul.append(li);
  });

  // The images are small vector/line icons; keep the authored <picture> as-is
  // (re-rasterising breaks proxied icon URLs) and keep them lazy.
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
  });

  // Build the carousel shell: prev button, scroll track, next button.
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'cards-additional-arrow cards-additional-prev';
  prev.setAttribute('aria-label', 'Previous benefits');

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'cards-additional-arrow cards-additional-next';
  next.setAttribute('aria-label', 'Next benefits');

  const scrollByCard = (dir) => {
    const card = ul.querySelector('li');
    const gap = parseInt(getComputedStyle(ul).columnGap, 10) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : ul.clientWidth;
    ul.scrollBy({ left: dir * step, behavior: 'smooth' });
  };
  prev.addEventListener('click', () => scrollByCard(-1));
  next.addEventListener('click', () => scrollByCard(1));

  ul.addEventListener('scroll', () => updateArrows(ul, prev, next), { passive: true });
  window.addEventListener('resize', () => updateArrows(ul, prev, next));

  block.replaceChildren(prev, ul, next);

  // Set initial arrow state after layout settles.
  requestAnimationFrame(() => updateArrows(ul, prev, next));
}
