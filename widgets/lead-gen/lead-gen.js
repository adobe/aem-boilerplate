const TOTAL_STEPS = 4;

const REVIEW_FIELDS = [
  { name: 'firstName', label: 'First name' },
  { name: 'lastName', label: 'Last name' },
  { name: 'email', label: 'Work email' },
  { name: 'phone', label: 'Phone' },
  { name: 'company', label: 'Company' },
  { name: 'jobTitle', label: 'Job title' },
  { name: 'companySize', label: 'Company size' },
  { name: 'industry', label: 'Industry' },
  { name: 'primaryInterest', label: 'Primary interest' },
  { name: 'timeline', label: 'Timeline' },
  { name: 'deployment', label: 'Deployment' },
  { name: 'currentSolution', label: 'Current solution' },
  { name: 'message', label: 'Goals' },
];

/**
 * Returns the display text for a form field value.
 * @param {HTMLFormElement} form
 * @param {string} name
 * @returns {string}
 */
function getFieldDisplayValue(form, name) {
  const field = form.elements.namedItem(name);
  if (!field) return '—';
  if (field instanceof RadioNodeList) {
    const selected = [...field].find((el) => el.checked);
    return selected?.labels?.[0]?.textContent?.trim() || selected?.value || '—';
  }
  if (field instanceof HTMLSelectElement) {
    return field.selectedOptions[0]?.textContent?.trim() || field.value || '—';
  }
  return field.value?.trim() || '—';
}

/**
 * Populates the review summary on the final step.
 * @param {HTMLElement} widget
 * @param {HTMLFormElement} form
 */
function updateReviewSummary(widget, form) {
  const summary = widget.querySelector('.review-summary');
  if (!summary) return;

  summary.innerHTML = REVIEW_FIELDS.map(({ name, label }) => {
    const value = getFieldDisplayValue(form, name);
    if (value === '—') return '';
    return `<div><dt>${label}</dt><dd>${value}</dd></div>`;
  }).filter(Boolean).join('');
}

/**
 * Validates required fields in the active fieldset.
 * @param {HTMLFieldSetElement} fieldset
 * @returns {boolean}
 */
function validateStep(fieldset) {
  const fields = [...fieldset.querySelectorAll('input, select, textarea')];
  return fields.every((field) => {
    if (!(field instanceof HTMLInputElement
      || field instanceof HTMLSelectElement
      || field instanceof HTMLTextAreaElement)) {
      return true;
    }
    if (!field.required) return true;
    if (field.type === 'checkbox') return field.checked;
    return field.checkValidity();
  });
}

/**
 * Shows or hides the form error message.
 * @param {HTMLElement} widget
 * @param {string} [message]
 */
function setFormError(widget, message) {
  const errorEl = widget.querySelector('.form-error');
  if (!errorEl) return;
  if (message) {
    errorEl.textContent = message;
    errorEl.removeAttribute('hidden');
  } else {
    errorEl.textContent = '';
    errorEl.setAttribute('hidden', '');
  }
}

/**
 * Submits the lead gen form to FormSubmit.
 * @param {HTMLElement} widget
 * @param {HTMLFormElement} form
 */
async function submitForm(widget, form) {
  const submitBtn = widget.querySelector('.submit');
  const nextBtn = widget.querySelector('.next');
  const originalLabel = submitBtn?.textContent;
  const pageUrlField = form.querySelector('input[name="pageUrl"]');
  if (pageUrlField instanceof HTMLInputElement) {
    pageUrlField.value = window.location.href;
  }

  [...form.elements].forEach((el) => { el.disabled = true; });
  if (submitBtn) submitBtn.textContent = 'Sending…';
  if (nextBtn) nextBtn.disabled = true;

  try {
    const resp = await fetch(form.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
    });

    if (!resp.ok) {
      throw new Error(`FormSubmit responded with ${resp.status}`);
    }

    widget.dataset.stage = 'success';
    const successSection = widget.querySelector('.success');
    if (successSection) successSection.focus();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Lead gen form submission failed', error);
    setFormError(widget, 'Something went wrong. Please try again or contact us directly.');
    [...form.elements].forEach((el) => { el.disabled = false; });
    if (submitBtn) submitBtn.textContent = originalLabel || 'Submit request';
    if (nextBtn) nextBtn.disabled = false;
  }
}

/**
 * Loads and decorates the lead gen widget.
 * @param {HTMLElement} widget
 */
export default function decorate(widget) {
  const form = widget.querySelector('.lead-gen-form');
  if (!form) return;

  form.id = 'lead-gen-form-id';

  const progressEl = widget.querySelector('progress');
  const stepCounterEl = widget.querySelector('.step-counter .step-label');
  const stepIndicators = widget.querySelectorAll('.step-indicator [data-step]');
  const steps = widget.querySelectorAll('fieldset[data-step]');
  const prevBtn = widget.querySelector('.prev');
  const nextBtn = widget.querySelector('.next');
  const submitBtn = widget.querySelector('.submit');
  const startBtn = widget.querySelector('.start');
  const restartBtn = widget.querySelector('.restart');

  let currentStep = 0;

  const updateNav = (step) => {
    const isFirst = step === 1;
    const isLast = step === TOTAL_STEPS;

    prevBtn[isFirst ? 'setAttribute' : 'removeAttribute']('hidden', '');
    nextBtn[isLast ? 'setAttribute' : 'removeAttribute']('hidden', '');
    submitBtn[isLast ? 'removeAttribute' : 'setAttribute']('hidden', '');

    if (stepCounterEl) stepCounterEl.textContent = step;
    if (progressEl) progressEl.value = step;

    stepIndicators.forEach((indicator) => {
      const indicatorStep = Number(indicator.dataset.step);
      indicator.classList.toggle('complete', indicatorStep < step);
      indicator.classList.toggle('active', indicatorStep === step);
      if (indicatorStep === step) {
        indicator.setAttribute('aria-current', 'step');
      } else {
        indicator.removeAttribute('aria-current');
      }
    });
  };

  const showStep = (step) => {
    steps.forEach((fieldset) => fieldset.setAttribute('hidden', ''));

    const fieldset = widget.querySelector(`fieldset[data-step="${step}"]`);
    if (!fieldset) return;

    fieldset.removeAttribute('hidden');
    fieldset.focus();

    if (step === TOTAL_STEPS) {
      updateReviewSummary(widget, form);
    }

    updateNav(step);
    setFormError(widget);
  };

  const resetForm = () => {
    form.reset();
    currentStep = 0;
    if (progressEl) progressEl.value = 0;
    widget.dataset.stage = 'intro';
    setFormError(widget);
  };

  widget.dataset.stage = 'intro';

  startBtn?.addEventListener('click', () => {
    widget.dataset.stage = 'form';
    currentStep = 1;
    showStep(1);
  });

  nextBtn?.addEventListener('click', () => {
    const fieldset = widget.querySelector(`fieldset[data-step="${currentStep}"]`);
    if (!fieldset || !validateStep(fieldset)) {
      fieldset?.reportValidity();
      return;
    }
    showStep(currentStep += 1);
  });

  prevBtn?.addEventListener('click', () => {
    if (currentStep > 1) showStep(currentStep -= 1);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fieldset = widget.querySelector(`fieldset[data-step="${TOTAL_STEPS}"]`);
    if (!fieldset || !validateStep(fieldset)) {
      fieldset?.reportValidity();
      return;
    }
    submitForm(widget, form);
  });

  restartBtn?.addEventListener('click', resetForm);
}
