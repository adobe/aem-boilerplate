const SLIDE_INTERVAL = 6000;

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  let heading = '';
  const quotes = [];

  rows.forEach((row) => {
    const cols = [...row.children];
    const firstCol = cols[0];
    const secondCol = cols[1];

    if (!secondCol) {
      const h2 = firstCol.querySelector('h2');
      if (h2) heading = h2.textContent;
      return;
    }

    const img = firstCol.querySelector('img');
    const paragraphs = [...secondCol.querySelectorAll('p')];
    const quoteText = paragraphs[0]?.textContent || '';
    const citeName = paragraphs[1]?.textContent || '';

    quotes.push({
      img: img?.src || '', alt: img?.alt || '', quoteText, citeName,
    });
  });

  if (quotes.length === 0) return;

  block.textContent = '';

  if (heading) {
    const h2 = document.createElement('h2');
    h2.className = 'carousel-quotes-heading';
    h2.textContent = heading;
    block.append(h2);
  }

  const slider = document.createElement('div');
  slider.className = 'carousel-quotes-slider';

  quotes.forEach((q, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-quotes-slide';
    if (i === 0) slide.classList.add('active');

    const imgWrap = document.createElement('div');
    imgWrap.className = 'carousel-quotes-image';
    const img = document.createElement('img');
    img.src = q.img;
    img.alt = q.alt || q.citeName;
    img.loading = 'lazy';
    imgWrap.append(img);

    const content = document.createElement('div');
    content.className = 'carousel-quotes-content';

    const quoteEl = document.createElement('blockquote');
    const p = document.createElement('p');
    p.textContent = q.quoteText;
    quoteEl.append(p);

    const cite = document.createElement('cite');
    cite.textContent = q.citeName;

    content.append(quoteEl, cite);
    slide.append(imgWrap, content);
    slider.append(slide);
  });

  const nav = document.createElement('div');
  nav.className = 'carousel-quotes-nav';

  let current = 0;
  let timer = null;
  let paused = false;

  function stopAutoRotate() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function goToSlide(index) {
    const slides = block.querySelectorAll('.carousel-quotes-slide');
    const dots = block.querySelectorAll('.carousel-quotes-dot');

    slides[current]?.classList.remove('active');
    dots[current]?.classList.remove('active');

    current = index;

    slides[current]?.classList.add('active');
    dots[current]?.classList.add('active');
  }

  function nextSlide() {
    goToSlide((current + 1) % quotes.length);
  }

  function startAutoRotate() {
    stopAutoRotate();
    timer = setInterval(() => {
      if (!paused) nextSlide();
    }, SLIDE_INTERVAL);
  }

  quotes.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-quotes-dot';
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to quote ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    nav.append(dot);
  });

  block.append(slider, nav);

  block.addEventListener('mouseenter', () => { paused = true; });
  block.addEventListener('mouseleave', () => {
    paused = false;
    startAutoRotate();
  });

  startAutoRotate();
}
