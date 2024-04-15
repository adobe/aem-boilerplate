import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'emailinput-93c6f2da4d',
      fieldType: 'email',
      name: 'emailInputTest',
      visible: true,
      type: 'string',
      displayValueExpression: '($field.$value & \'@adobe.com\')',
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
  const Ele = block.querySelector('#emailinput-93c6f2da4d');
  Ele.dispatchEvent(new Event('focus'));
  Ele.value = 'test';
  Ele.dispatchEvent(new Event('change', { bubbles: true }));
  // Dispatch blur event
  Ele.dispatchEvent(new Event('blur'));
}

export function expect(block) {
  assert.equal(getValue(block, '#emailinput-93c6f2da4d'), 'test@adobe.com');
}
