import assert from 'assert';
import { setValue } from '../../testUtils.js';

export const sample = {
  action: 'http://localhost:3000/submit',
  items: [
    {
      fieldType: 'text-input',
      id: 'f1',
      name: 'f1_text',
      required: true,
      constraintMessages: {
        required: 'Please fill in this field.',
      },
    },
    {
      fieldType: 'number-input',
      id: 'f2',
      name: 'f2_number',
      required: true,
      maximum: 10,
      minimum: 2,
      constraintMessages: {
        required: 'Please fill in this field.',
      },
    },
    {
      fieldType: 'radio-group',
      id: 'f3',
      name: 'f3_radio',
      required: true,
      enum: ['a', 'b'],
      enumNames: ['a', 'b'],
      constraintMessages: {
        required: 'Please fill in this field.',
      },
    },
    {
      fieldType: 'checkbox-group',
      id: 'f4',
      name: 'f4_checkbox',
      required: true,
      enum: ['a', 'b'],
      enumNames: ['a', 'b'],
      constraintMessages: {
        required: 'Please fill in this field.',
      },
    },
    {
      id: 'f5',
      fieldType: 'file-input',
      name: 'f5_file',
      type: 'file',
      required: true,
      accept: [
        'audio/*',
        ' video/*',
        ' image/*',
        ' application/pdf',
      ],
      constraintMessages: {
        required: 'Please fill in this field.',
      },
    },
    {
      fieldType: 'button',
      id: 'button',
      buttonType: 'submit',
      events: {
        click: 'submitForm()',
      },
    },
  ],
};

export function op(block) {
  const btn = block.querySelector('#button');
  btn.click();
  const form = block.querySelector('form');
  form.dispatchEvent(new Event('submit'));
}

export function expect(block) {
  // text input error message
  const f1 = block.querySelector('#f1').parentElement;
  const f1Message = f1.querySelector('.field-invalid .field-description');
  assert.equal(f1Message.textContent, 'Please fill in this field.', 'Required error message for text input');
  setValue(block, '#f1', 'a');
  assert.equal(f1.querySelector('.field-description.field-invalid'), undefined, 'Not required error message for text input');

  // number input error message
  const f2 = block.querySelector('#f2').parentElement;
  const f2Message = f2.querySelector('.field-invalid .field-description');
  assert.equal(f2Message.textContent, 'Please fill in this field.', 'Required error message for number input');
  setValue(block, '#f2', 1);
  assert.equal(f2Message.querySelector('.field-description.field-invalid'), undefined, 'Not Required error message for number input');

  // radio buttons error message
  const f3 = block.querySelector('#f3');
  const f3Message = f3.querySelector('.field-invalid .field-description');
  assert.equal(f3Message.textContent, 'Please fill in this field.', 'Required error message for radio buttons');
  const radio = f3.querySelectorAll('input')[0];
  radio.click();
  radio.dispatchEvent(new Event('change', { bubbles: true }));
  assert.equal(f3.querySelector('.field-invalid .field-description'), undefined, 'Not required error message for radio buttons');

  // checkbox group error message
  const f4 = block.querySelector('#f4');
  const f4Message = f4.querySelector('.field-invalid .field-description');
  assert.equal(f4Message.textContent, 'Please fill in this field.', 'Required error message for checkbox group');
  const checkbox = f4.querySelectorAll('input')[0];
  checkbox.click();
  checkbox.dispatchEvent(new Event('change', { bubbles: true }));
  assert.equal(f4.querySelector('.field-invalid .field-description'), undefined, 'Not required error message for checkbox group');

  // file input error message
  const f5 = block.querySelector('#f5').closest('.field-wrapper');
  const f5Message = f5.querySelector('.field-invalid .field-description');
  assert.equal(f5Message.textContent, 'Please fill in this field.', 'Required error message for file input');
  const input = block.querySelector('#f5');
  const file = new File([new ArrayBuffer(1024)], 'file1.png', { type: 'image/png' });
  const event = new Event('change', {
    bubbles: true,
    cancelable: true,
  });
  event.files = [file];
  input.dispatchEvent(event);
}

export const opDelay = 100;
