import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'radiobutton-b8bdfa4485',
      fieldType: 'radio-group',
      name: 'propertyLocation',
      type: 'string',
      enumNames: [
        'Inside the U.S.',
        'Outside the U.S.',
      ],
      label: {
        value: 'Is this transaction regarding a property located in the United States?',
      },
      enum: [
        '0',
        '1',
      ],
      ':type': 'forms-components-examples/components/form/radiobutton',
    },
    {
      id: 'dropdown-1c1b7aadd1',
      fieldType: 'drop-down',
      name: 'transactionType',
      type: 'string',
      enumNames: [
        'Transaction 1',
        'Transaction 2',
      ],
      label: {
        value: 'Transaction Type',
      },
      rules: {
        visible: "!(propertyLocation.$value == '1')",
      },
      enum: [
        '0',
        '1',
      ],
      placeholder: 'Select a Transaction',
      ':type': 'forms-components-examples/components/form/dropdown',
    },
  ],
};

export function op(block) {
  assert.strictEqual(block.querySelector('#dropdown-1c1b7aadd1').dataset.visible, undefined);
  const radio = block.querySelector('#radiobutton-b8bdfa4485').querySelectorAll('input')[1];
  radio.click();
  radio.dispatchEvent(new Event('change', { bubbles: true }));
}

export function expect(block) {
  assert.equal(block.querySelector('#dropdown-1c1b7aadd1').closest('.field-wrapper').dataset.visible, 'false');
}
