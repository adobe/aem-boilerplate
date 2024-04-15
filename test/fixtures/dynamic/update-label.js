/* eslint-env mocha */
import assert from 'assert';
import { setValue } from '../../testUtils.js';

export const sample = {
  items: [
    {
      fieldType: 'text-input',
      id: 'text-input-1',
      name: 'firstName',
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
    {
      fieldType: 'text-input',
      id: 'text-input-2',
      name: 'lastName',
      events: {
        change: [
          "if(contains($event.payload.changes[].propertyName, 'value'),[dispatchEvent(firstName, 'custom:setProperty', {label : {value : 'Updated First Name'}})],{})",
          "if(contains($event.payload.changes[].propertyName, 'value'),[dispatchEvent(button, 'custom:setProperty', {label : {value : 'New Button Label'}})],{})",
        ],
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
    {
      fieldType: 'button',
      id: 'button',
      name: 'button',
      label: {
        value: 'button label',
        visible: true,
      },
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
    },
  ],
};

function getLabel(block, id, fieldType) {
  const fieldEl = block.querySelector(id);
  if (fieldType === 'button') {
    return fieldEl.textContent;
  }
  const labelEl = fieldEl.closest('.field-wrapper').querySelector('.field-label');
  return labelEl.textContent;
}

export function op(block) {
  setValue(block, '#text-input-2', 'abc'); // change last name
}

export function expect(block) {
  assert.equal(getLabel(block, '#text-input-1'), 'Updated First Name'); // firstName's label (create new)
  assert.equal(getLabel(block, '#button', 'button'), 'New Button Label'); // button's label (update existing)
}
