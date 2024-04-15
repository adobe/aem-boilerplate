import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'datepicker-ff38b6d2af',
      fieldType: 'date-input',
      name: 'dateInputTest',
      visible: true,
      type: 'string',
      displayValueExpression: '(toString($field.$value) & \' today\')',
      displayFormat: 'EEEE, MMMM d, y',
      required: false,
      enabled: true,
      readOnly: false,
      label: {
        visible: true,
        value: 'Test displayValueExpression',
      },
      format: 'date',
    },
  ],
};

function getValue(block, id, property = 'value') {
  const input = block.querySelector(id);
  return input[property];
}

export function op(block) {
  const Ele = block.querySelector('#datepicker-ff38b6d2af');
  Ele.dispatchEvent(new Event('focus'));
  Ele.value = '1999-12-12';
  Ele.dispatchEvent(new Event('change', { bubbles: true }));
  // Dispatch blur event
  Ele.dispatchEvent(new Event('blur'));
}

export function expect(block) {
  assert.equal(getValue(block, '#datepicker-ff38b6d2af'), '1999-12-12 today');
}
