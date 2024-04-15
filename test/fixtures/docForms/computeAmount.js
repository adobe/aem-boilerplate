import assert from 'assert';
import { advanceEnquiry } from '../../forms/advanceEnquiry.js';

export const sample = advanceEnquiry;
export const formPath = 'http://localhost:3000/enquiry.json';

export function op(block) {
  const startDate = block.querySelector('#startdate');
  startDate.value = '2024-03-10';
  startDate.dispatchEvent(new Event('change', { bubbles: true }));
  const endDate = block.querySelector('#enddate');
  endDate.value = '2024-03-12';
  endDate.dispatchEvent(new Event('change', { bubbles: true }));
}

export function expect(block) {
  const amount = block.querySelector('#amount');
  assert.equal(amount.value, '2000', 'Expected amoun to computed');
  const budget = block.querySelector('#budget');
  budget.value = '3000';
  budget.dispatchEvent(new Event('change', { bubbles: true }));
  assert.equal(amount.value, '6000', 'Expected amount to be set');
}

export const opDelay = 100;
