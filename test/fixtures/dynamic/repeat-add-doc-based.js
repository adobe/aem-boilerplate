import assert from 'assert';

import { fieldDef } from '../form/enquire.js';

export const sample = fieldDef;

export function op(block) {
  const btn = block.querySelector('.repeat-wrapper > .item-add');
  btn.click();
}

export function expect(block) {
  const instances = block.querySelectorAll('.repeat-wrapper > fieldset');
  assert.equal(instances.length, 2);
}
