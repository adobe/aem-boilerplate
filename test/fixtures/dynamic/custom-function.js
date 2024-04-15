import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'textinput-9ae7fb61e4',
      fieldType: 'text-input',
      name: 'firstname',
      visible: true,
      type: 'string',
      enabled: true,
      readOnly: false,
      label: {
        visible: true,
        value: 'firstname',
      },
      events: {
        change: [
          "if(contains($event.payload.changes[].propertyName, 'value'), dispatchEvent(FullName, 'custom:setProperty', {value : getFullName($field.$value,lastname.$value)}), {})",
        ],
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
    {
      id: 'textinput-8eca50b734',
      fieldType: 'text-input',
      name: 'lastname',
      visible: true,
      type: 'string',
      enabled: true,
      readOnly: false,
      label: {
        visible: true,
        value: 'lastname',
      },
      events: {
        change: [
          "if(contains($event.payload.changes[].propertyName, 'value'), dispatchEvent(FullName, 'custom:setProperty', {value : getFullName(firstname.$value,$field.$value)}), {})",
        ],
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
    {
      id: 'textinput-a01ceb1c74',
      fieldType: 'text-input',
      name: 'FullName',
      visible: true,
      type: 'string',
      enabled: true,
      readOnly: false,
      label: {
        visible: true,
        value: 'FullName',
      },
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
  ],
};

function getValue(block, id, property = 'value') {
  const input = block.querySelector(id);
  return input[property];
}

export function op(block) {
  const inputEle1 = block.querySelector('#textinput-9ae7fb61e4');
  inputEle1.dispatchEvent(new Event('focus'));
  inputEle1.value = 'fname';
  inputEle1.dispatchEvent(new Event('change', { bubbles: true }));
  inputEle1.dispatchEvent(new Event('blur'));
  const inputEle2 = block.querySelector('#textinput-8eca50b734');
  inputEle2.dispatchEvent(new Event('focus'));
  inputEle2.value = 'lname';
  inputEle2.dispatchEvent(new Event('change', { bubbles: true }));
  inputEle2.dispatchEvent(new Event('blur'));
}

export function expect(block) {
  assert.equal(getValue(block, '#textinput-a01ceb1c74'), 'fname lname');
}
