import assert from 'assert';
import { advanceEnquiry } from '../../forms/advanceEnquiry.js';

export const sample = advanceEnquiry;
export const formPath = 'http://localhost:3000/enquiry.json';

export function op(block) {
  const subscribe = block.querySelector('#subscribe');
  subscribe.checked = true;
  subscribe.dispatchEvent(new Event('change', { bubbles: true }));
}

export function expect(block) {
  const email = block.querySelector('.field-email');
  assert.equal(email.dataset.visible, 'true', 'field was not made visible');

  const subscribe = block.querySelector('#subscribe');
  subscribe.checked = false;
  subscribe.dispatchEvent(new Event('change', { bubbles: true }));
  assert.equal(email.dataset.visible, 'false', 'field was not made hidden');
}

export const opDelay = 100;
