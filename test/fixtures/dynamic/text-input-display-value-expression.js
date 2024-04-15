import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'textinput-40db827550',
      fieldType: 'text-input',
      name: 'textInputTest',
      visible: true,
      type: 'string',
      displayValueExpression: '($field.$value & \'adobe\')',
      required: false,
      enabled: true,
      readOnly: false,
      label: {
        visible: true,
        value: 'Test displayValueExpression',
      },
    },
  ],
};

function getValue(block, id, property = 'value') {
  const input = block.querySelector(id);
  return input[property];
}

export function op(block) {
  const textEle = block.querySelector('#textinput-40db827550');
  textEle.dispatchEvent(new Event('focus'));
  textEle.value = 'test';
  textEle.dispatchEvent(new Event('change', { bubbles: true }));
  // Dispatch blur event
  textEle.dispatchEvent(new Event('blur'));
}

export function expect(block) {
  assert.equal(getValue(block, '#textinput-40db827550'), 'testadobe');
}
