import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'numberinput-40db827550',
      fieldType: 'number-input',
      name: 'numberInputTest',
      visible: true,
      type: 'integer',
      displayValueExpression: '(toString($field.$value) & \'adobe\')',
      displayFormat: '¤#,##0.00',
      required: false,
      enabled: true,
      readOnly: false,
      default: '123',
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
  const inputEle = block.querySelector('#numberinput-40db827550');
  inputEle.dispatchEvent(new Event('focus'));
  inputEle.value = '1234';
  inputEle.dispatchEvent(new Event('change', { bubbles: true }));
  // Dispatch blur event
  inputEle.dispatchEvent(new Event('blur'));
}

export function expect(block) {
  assert.equal(getValue(block, '#numberinput-40db827550'), '1234adobe');
}
