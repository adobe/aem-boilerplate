import assert from 'assert';
import { setValue } from '../../testUtils.js';

export const sample = {
  items: [{
    fieldType: 'text-input',
    id: 'text-input',
    name: 'f2',
    rules: {
      value: 'f1 & \'2\'',
    },
  },
  {
    fieldType: 'text-input',
    id: 'text-input-2',
    name: 'f1',
  }],
};

function getValue(block, id, property = 'value') {
  const input = block.querySelector(id);
  return input[property];
}

export function op(block) {
  setValue(block, '#text-input-2', '5');
}

export function expect(block) {
  assert.equal(getValue(block, '#text-input'), '52');
}
