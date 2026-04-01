const DEBOUNCE_MS = 300;

function clamp(value, lo, hi) {
  return Math.max(lo, Math.min(hi, value));
}

export function createNumericRangeSlider({
  label, min: initMin, max: initMax, leftMax, rightMin, unit = '', onChange,
}) {
  let min = initMin;
  let max = initMax;
  let lMax = Math.min(leftMax ?? max, max);
  let rMin = Math.max(rightMin ?? min, min);
  let curMin = min;
  let curMax = max;
  let enabled = false;
  let debounceTimer = null;

  const toPercent = (v) => ((v - min) / (max - min)) * 100;
  const fromPercent = (pct) => {
    const raw = min + ((max - min) * clamp(pct, 0, 100)) / 100;
    return Math.round(raw);
  };

  const fireChange = (newMin, newMax) => {
    enabled = true;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => onChange?.(newMin, newMax), DEBOUNCE_MS);
  };

  const el = document.createElement('div');
  el.className = 'numeric-range-slider';
  el.innerHTML = `
    <div class="numeric-range-slider__header">
      <span class="numeric-range-slider__label">${label}</span>
    </div>
    <div class="numeric-range-slider__body">
      <div class="numeric-range-slider__track-wrapper">
        <div class="numeric-range-slider__track">
          <div class="numeric-range-slider__fill numeric-range-slider__fill--left"></div>
          <div class="numeric-range-slider__fill numeric-range-slider__fill--locked"></div>
          <div class="numeric-range-slider__fill numeric-range-slider__fill--right"></div>
        </div>
        <div class="numeric-range-slider__handle numeric-range-slider__handle--min"
             role="slider" tabindex="0"
             aria-label="${label} minimum"
             aria-valuemin="${min}" aria-valuemax="${max}" aria-valuenow="${curMin}"></div>
        <div class="numeric-range-slider__handle numeric-range-slider__handle--max"
             role="slider" tabindex="0"
             aria-label="${label} maximum"
             aria-valuemin="${min}" aria-valuemax="${max}" aria-valuenow="${curMax}"></div>
      </div>
      <div class="numeric-range-slider__footer">
        <span class="numeric-range-slider__value numeric-range-slider__value--min">${curMin}${unit}</span>
        <span class="numeric-range-slider__value numeric-range-slider__value--max">${curMax}${unit}</span>
      </div>
    </div>
  `;

  const trackWrapper = el.querySelector('.numeric-range-slider__track-wrapper');
  const track = el.querySelector('.numeric-range-slider__track');
  const fillLeft = el.querySelector('.numeric-range-slider__fill--left');
  const fillLocked = el.querySelector('.numeric-range-slider__fill--locked');
  const fillRight = el.querySelector('.numeric-range-slider__fill--right');
  const handleMin = el.querySelector('.numeric-range-slider__handle--min');
  const handleMax = el.querySelector('.numeric-range-slider__handle--max');
  const valueMin = el.querySelector('.numeric-range-slider__value--min');
  const valueMax = el.querySelector('.numeric-range-slider__value--max');

  function render() {
    const minPct = toPercent(curMin);
    const maxPct = toPercent(curMax);
    const lMaxPct = toPercent(lMax);
    const rMinPct = toPercent(rMin);

    // Clamp fills so they never extend past the handles
    const fillLPct = Math.min(lMaxPct, maxPct);
    const fillRPct = Math.max(rMinPct, minPct);

    fillLeft.style.left = `${minPct}%`;
    fillLeft.style.right = `${100 - fillLPct}%`;

    // Locked zone between leftMax and rightMin (hidden when ranges overlap)
    if (lMax < rMin) {
      fillLocked.style.left = `${fillLPct}%`;
      fillLocked.style.right = `${100 - fillRPct}%`;
      fillLocked.style.display = '';
    } else {
      fillLocked.style.display = 'none';
    }

    fillRight.style.left = `${fillRPct}%`;
    fillRight.style.right = `${100 - maxPct}%`;

    handleMin.style.left = `${minPct}%`;
    handleMax.style.left = `${maxPct}%`;
    handleMin.setAttribute('aria-valuenow', curMin);
    handleMax.setAttribute('aria-valuenow', curMax);
    valueMin.textContent = `${curMin}${unit}`;
    valueMax.textContent = `${curMax}${unit}`;
  }

  function getPctFromEvent(clientX) {
    const rect = trackWrapper.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  function handlePointerDown(handle, e) {
    e.preventDefault();
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    const onMove = (ev) => {
      const val = fromPercent(getPctFromEvent(ev.clientX));
      if (handle === 'min') {
        curMin = clamp(val, min, curMax);
      } else {
        curMax = clamp(val, curMin, max);
      }
      render();
      fireChange(curMin, curMax);
    };

    const onUp = () => {
      target.removeEventListener('pointermove', onMove);
      target.removeEventListener('pointerup', onUp);
      target.removeEventListener('pointercancel', onUp);
      fireChange(curMin, curMax);
    };

    target.addEventListener('pointermove', onMove);
    target.addEventListener('pointerup', onUp);
    target.addEventListener('pointercancel', onUp);
  }

  handleMin.addEventListener('pointerdown', (e) => handlePointerDown('min', e));
  handleMax.addEventListener('pointerdown', (e) => handlePointerDown('max', e));

  function handleKeyDown(handle, e) {
    const step = e.shiftKey ? 10 : 1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      if (handle === 'min') curMin = clamp(curMin + step, min, curMax);
      else curMax = clamp(curMax + step, curMin, max);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      if (handle === 'min') curMin = clamp(curMin - step, min, curMax);
      else curMax = clamp(curMax - step, curMin, max);
      e.preventDefault();
    } else {
      return;
    }
    render();
    fireChange(curMin, curMax);
  }

  handleMin.addEventListener('keydown', (e) => handleKeyDown('min', e));
  handleMax.addEventListener('keydown', (e) => handleKeyDown('max', e));

  track.addEventListener('click', (e) => {
    const val = fromPercent(getPctFromEvent(e.clientX));
    if (Math.abs(val - curMin) <= Math.abs(val - curMax)) {
      curMin = clamp(val, min, curMax);
    } else {
      curMax = clamp(val, curMin, max);
    }
    render();
    fireChange(curMin, curMax);
  });

  render();

  el.updateBounds = (newMin, newMax, newLeftMax, newRightMin) => {
    min = newMin;
    max = newMax;
    lMax = Math.min(newLeftMax ?? max, max);
    rMin = Math.max(newRightMin ?? min, min);
    curMin = clamp(curMin, min, max);
    curMax = clamp(curMax, min, max);
    if (curMin > curMax) curMin = curMax;
    handleMin.setAttribute('aria-valuemin', min);
    handleMin.setAttribute('aria-valuemax', max);
    handleMax.setAttribute('aria-valuemin', min);
    handleMax.setAttribute('aria-valuemax', max);
    render();
    return { min: curMin, max: curMax };
  };

  el.setValues = (newMin, newMax) => {
    curMin = clamp(newMin, min, max);
    curMax = clamp(newMax, min, max);
    if (curMin > curMax) curMin = curMax;
    render();
    return { min: curMin, max: curMax };
  };

  el.reset = () => {
    enabled = false;
    curMin = min;
    curMax = max;
    render();
  };

  el.setEnabled = (on) => { enabled = on; };
  el.isEnabled = () => enabled;

  return el;
}
