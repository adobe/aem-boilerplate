import { createButton } from '../util.js';

export class WizardLayout {
  inputFields = 'input,textarea,select';

  constructor(includePrevBtn = true, includeNextBtn = true) {
    this.includePrevBtn = includePrevBtn;
    this.includeNextBtn = includeNextBtn;
  }

  // eslint-disable-next-line class-methods-use-this
  getSteps(panel) {
    return [...panel.children].filter((step) => step.tagName.toLowerCase() === 'fieldset');
  }

  assignIndexToSteps(panel) {
    const steps = this.getSteps(panel);
    panel.style.setProperty('--wizard-step-count', steps.length);
    steps.forEach((step, index) => {
      step.dataset.index = index;
      step.style.setProperty('--wizard-step-index', index);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getEligibleSibling(current, forward = true) {
    const direction = forward ? 'nextElementSibling' : 'previousElementSibling';

    for (let sibling = current[direction]; sibling; sibling = sibling[direction]) {
      if (sibling.dataset.visible !== 'false' && sibling.tagName === 'FIELDSET') {
        return sibling;
      }
    }
    return null;
  }

  /**
 * @param {FormElement | Fieldset} container
 * @returns return false, if there are invalid fields
 */
  validateContainer(container) {
    const fieldElements = [...container.querySelectorAll(this.inputFields)];
    const isValid = fieldElements.reduce((valid, fieldElement) => {
      const isFieldValid = fieldElement.checkValidity();
      return valid && isFieldValid;
    }, true);

    if (!isValid) {
      container.querySelector(':invalid')?.focus();
    }
    return isValid;
  }

  navigate(panel, forward = true) {
    const current = panel.querySelector('.current-wizard-step');
    const currentMenuItem = panel.querySelector('.wizard-menu-active-item');

    let valid = true;
    if (forward) {
      valid = this.validateContainer(current);
    }
    const navigateTo = valid ? this.getEligibleSibling(current, forward) : current;

    if (navigateTo && current !== navigateTo) {
      current.classList.remove('current-wizard-step');
      navigateTo.classList.add('current-wizard-step');
      // add/remove active class from menu item
      const navigateToMenuItem = panel.querySelector(`li[data-index="${navigateTo.dataset.index}"]`);
      currentMenuItem.classList.remove('wizard-menu-active-item');
      navigateToMenuItem.classList.add('wizard-menu-active-item');
      const event = new CustomEvent('wizard:navigate', {
        detail: {
          prevStep: { id: current.id, index: +current.dataset.index },
          currStep: { id: navigateTo.id, index: +navigateTo.dataset.index },
        },
        bubbles: false,
      });
      panel.dispatchEvent(event);
    }
  }

  static handleMutation(panel, mutationsList) {
    mutationsList.forEach((mutation) => {
      // Check if the mutation is a change in attributes(data-visible)
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-visible') {
        const element = mutation.target;
        const menuItem = panel.querySelector(`li[data-index="${element.dataset.index}"]`);
        menuItem.dataset.visible = element.dataset.visible;
      }
    });
  }

  static attachMutationObserver(panel) {
    const children = panel.querySelectorAll(':scope > .panel-wrapper');
    // Options for the observer (attributes to observe for)
    const config = { attributes: true, subtree: false };
    // Create an observer instance linked to the callback function
    const observer = new window.MutationObserver((mutationsList) => {
      WizardLayout.handleMutation(panel, mutationsList);
    });
    // Start observing each target node for configured mutations
    children.forEach((targetNode) => {
      observer.observe(targetNode, config);
    });
  }

  static createMenu(children) {
    const ul = document.createElement('ul');
    ul.className = 'wizard-menu-items';
    children.forEach((child, index) => {
      const li = document.createElement('li');
      li.innerHTML = child.querySelector('legend')?.innerHTML || '';
      li.className = 'wizard-menu-item';
      li.dataset.index = index;
      if (child.hasAttribute('data-visible')) {
        li.dataset.visible = child.dataset.visible;
      }
      ul.append(li);
    });
    return ul;
  }

  addButton(wrapper, panel, buttonDef, forward = true) {
    const button = createButton(buttonDef);
    button.classList.add(buttonDef.id);
    button.addEventListener('click', () => this.navigate(panel, forward));
    wrapper.append(button);
  }

  applyLayout(panel) {
    const children = panel.querySelectorAll(':scope > .panel-wrapper');
    if (children.length) {
      // create wizard menu
      const wizardMenu = WizardLayout.createMenu(Array.from(children));
      wizardMenu.querySelector('li').classList.add('wizard-menu-active-item');
      // Insert the menu before the first child of the wizard
      panel.insertBefore(wizardMenu, children[0]);
      WizardLayout.attachMutationObserver(panel);
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'wizard-button-wrapper';
    if (this.includePrevBtn && children.length) {
      this.addButton(wrapper, panel, {
        label: { value: 'Back' }, fieldType: 'button', name: 'back', id: 'wizard-button-prev',
      }, false);
    }

    if (this.includeNextBtn && children.length) {
      this.addButton(wrapper, panel, {
        label: { value: 'Next' }, fieldType: 'button', name: 'next', id: 'wizard-button-next',
      });
    }

    const submitBtn = panel.querySelector('.submit-wrapper');
    if (submitBtn) {
      wrapper.append(submitBtn);
    }
    this.assignIndexToSteps(panel);
    panel.append(wrapper);
    panel.querySelector('fieldset')?.classList.add('current-wizard-step');
    panel.classList.add('wizard');
    // panel.classList.add('left');
  }
}

const layout = new WizardLayout();

export default function wizardLayout(panel) {
  layout.applyLayout(panel);
  return panel;
}

export const navigate = layout.navigate.bind(layout);
export const validateContainer = layout.validateContainer.bind(layout);
