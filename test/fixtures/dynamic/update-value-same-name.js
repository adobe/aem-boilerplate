import assert from 'assert';

export const sample = {
  items: [{
    fieldType: 'text-input',
    id: 'text-input',
    name: 'f2',
  },
  {
    fieldType: 'text-input',
    id: 'text-input-2',
    name: 'f1',
  },
  {
    fieldType: 'text-input',
    id: 'text-input-3',
    name: 'f2',
  }],
};

function setValue(block, id, value) {
  const input = block.querySelector(id);
  input.value = value;
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

function getValue(block, id, property = 'value') {
  const input = block.querySelector(id);
  return input[property];
}

export function op(block) {
  setValue(block, '#text-input', '5');
}

export function expect(block) {
  assert.equal(getValue(block, '#text-input-3'), '5');
}
