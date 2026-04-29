const SLIDE_INTERVAL = 5000;

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  block.textContent = '';

  const slidesWrapper = document.createElement('div');
  slidesWrapper.className = 'hero-carousel-slides';

  rows.forEach((row, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero-carousel-slide';
    if (i === 0) slide.classList.add('active');

    const cols = [...row.children];
    const imageCol = cols[0];
    const textCol = cols[1];

    const imgEl = imageCol?.querySelector('img');
    if (imgEl) {
      const bg = document.createElement('div');
      bg.className = 'hero-carousel-image';
      bg.style.backgroundImage = `url(${imgEl.src})`;
      slide.append(bg);
    }

    const overlay = document.createElement('div');
    overlay.className = 'hero-carousel-overlay';

    if (textCol) {
      const content = document.createElement('div');
      content.className = 'hero-carousel-content';
      content.innerHTML = textCol.innerHTML;
      overlay.append(content);
    }

    slide.append(overlay);
    slidesWrapper.append(slide);
  });

  const nav = document.createElement('div');
  nav.className = 'hero-carousel-nav';

  rows.forEach((_, i) => {
    const indicator = document.createElement('button');
    indicator.className = 'hero-carousel-indicator';
    if (i === 0) indicator.classList.add('active');
    indicator.textContent = String(i + 1).padStart(2, '0');
    indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
    indicator.addEventListener('click', () => goToSlide(i));
    nav.append(indicator);
  });

  const progressBar = document.createElement('div');
  progressBar.className = 'hero-carousel-progress';
  const progressFill = document.createElement('div');
  progressFill.className = 'hero-carousel-progress-fill';
  progressBar.append(progressFill);
  nav.append(progressBar);

  block.append(slidesWrapper);
  block.append(nav);

  let current = 0;
  let timer = null;
  let paused = false;

  function goToSlide(index) {
    const slides = block.querySelectorAll('.hero-carousel-slide');
    const indicators = block.querySelectorAll('.hero-carousel-indicator');

    slides[current]?.classList.remove('active');
    indicators[current]?.classList.remove('active');

    current = index;

    slides[current]?.classList.add('active');
    indicators[current]?.classList.add('active');

    resetProgress();
  }

  function nextSlide() {
    goToSlide((current + 1) % rows.length);
  }

  function resetProgress() {
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progressFill.style.transition = `width ${SLIDE_INTERVAL}ms linear`;
        progressFill.style.width = '100%';
      });
    });
  }

  function startAutoRotate() {
    stopAutoRotate();
    timer = setInterval(() => {
      if (!paused) nextSlide();
    }, SLIDE_INTERVAL);
    resetProgress();
  }

  function stopAutoRotate() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  block.addEventListener('mouseenter', () => { paused = true; });
  block.addEventListener('mouseleave', () => {
    paused = false;
    startAutoRotate();
  });

  startAutoRotate();
}
