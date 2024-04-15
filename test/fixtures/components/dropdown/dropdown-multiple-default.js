// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'dropdown-c6f396a9b8',
    fieldType: 'drop-down',
    name: 'country',
    visible: true,
    description: '<p>Please select the country</p>',
    tooltip: 'Please select country',
    type: 'string[]',
    required: true,
    enabled: true,
    readOnly: true,
    enforceEnum: true,
    enumNames: [
      'India',
      'United States',
    ],
    placeholder: 'Please select',
    default: ['IN', 'US'],
    label: {
      visible: false,
      value: 'Country',
    },
    events: {
      'custom:setProperty': [
        '$event.payload',
      ],
    },
    enum: [
      'IN',
      'US',
    ],
    ':type': 'forms-components-examples/components/form/dropdown',
  },
  ],
};

// export const extraChecks = [
//   (html) => {
//     assert.equal(html.querySelector('#dropdown-c6f396a9b8').value, 'IN');
//   },
// ];
