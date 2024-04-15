/* eslint-disable */
import assert from 'assert';

export const sample = {
  total: 2,
  offset: 0,
  limit: 2,
  data: [
    {
      Name: 'radioFieldset',
      Type: 'fieldset',
      Description: '',
      Label: 'Fill Extra Fields',
      Mandatory: '',
      Visible: '',
      'Visible Expression': '',
    },
    {
      Name: 'radioOption',
      Type: 'radio',
      Description: '',
      Label: 'Yes',
      Mandatory: '',
      Value: 'yes',
      Visible: '',
      'Visible Expression': '',
      Fieldset: 'radioFieldset',
    },
    {
      Name: 'checkboxField',
      Type: 'checkbox',
      Description: '',
      Label: 'Extra Checkbox',
      Mandatory: '',
      Value: 'on',
      Visible: 'false',
      'Visible Expression': '=F3="yes"',
      Options: '',
    }],
  ':type': 'sheet',
};

export function op(block) {
  const radio = block.querySelector('input[type="radio"]');
  radio.click();
  radio.dispatchEvent(new Event('change', { bubbles: true }));
}

export const formPath = 'http://localhost:3000/spouse.json';

export function expect(block) {
  const checkbox = block.querySelector('input[type="checkbox"]').closest('.field-wrapper');
  assert.equal(checkbox.dataset.visible, 'true', 'field was not made visible');
}

export const opDelay = 100;
