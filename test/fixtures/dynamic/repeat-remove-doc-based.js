import assert from 'assert';

import { fieldDef } from '../form/enquire.js';

export const sample = fieldDef;

export function op(block) {
  const repeatablePanel = block.querySelector('.repeat-wrapper');
  const addButton = repeatablePanel.querySelector('.item-add');
  addButton.click();
  const removeButton = repeatablePanel.querySelectorAll('fieldset')?.[1]?.querySelector('.item-remove');
  removeButton.click();
}

export function expect(block) {
  const instances = block.querySelectorAll('.repeat-wrapper > fieldset');
  assert.equal(instances.length, 1);
}
