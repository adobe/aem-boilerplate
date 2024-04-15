import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'numberinput-40db827550',
      fieldType: 'number-input',
      name: 'currency',
      visible: true,
      type: 'integer',
      displayFormat: '¤#,##0.00',
      required: false,
      enabled: true,
      readOnly: false,
      default: '123',
      label: {
        visible: true,
        value: 'Currency',
      },
    },
  ],
};

function getValue(block, id, property = 'value') {
  const input = block.querySelector(id);
  return input[property];
}

export function op(block) {
  const inputEle = block.querySelector('#numberinput-40db827550');
  inputEle.dispatchEvent(new Event('focus'));
}

export function expect(block) {
  assert.equal(getValue(block, '#numberinput-40db827550'), '123');
}
