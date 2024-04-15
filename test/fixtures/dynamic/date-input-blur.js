import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'datepicker-6dd0c75352',
      fieldType: 'date-input',
      name: 'dob',
      visible: true,
      type: 'string',
      enabled: true,
      readOnly: false,
      displayFormat: 'd MMMM, y',
      default: '2000-02-13',
      label: {
        visible: true,
        value: 'Date Of Birth',
      },
      events: {
        'custom:setProperty': ['$event.payload'],
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
  const inputEle = block.querySelector('#datepicker-6dd0c75352');
  inputEle.dispatchEvent(new Event('focus'));
  inputEle.value = '2000-02-14';
  inputEle.dispatchEvent(new Event('change', { bubbles: true }));
  inputEle.dispatchEvent(new Event('blur'));
}

export function expect(block) {
  assert.equal(getValue(block, '#datepicker-6dd0c75352'), '14 February, 2000');
}
