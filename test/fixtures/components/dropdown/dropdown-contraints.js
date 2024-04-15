// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'dropdown-c6f396a9b8',
    fieldType: 'drop-down',
    name: 'country',
    visible: true,
    description: '<p>Please select the country</p>',
    tooltip: '<p>Please select country</p>',
    type: 'string',
    required: true,
    enabled: true,
    readOnly: false,
    enforceEnum: true,
    enumNames: [
      'India',
      'United States',
    ],
    placeholder: 'Please select',
    label: {
      visible: true,
      value: 'Country',
    },
    events: {
      'custom:setProperty': [
        '$event.payload',
      ],
    },
    properties: {
      'afs:layout': {
        tooltipVisible: false,
      },
      'fd:dor': {
        dorExclusion: false,
      },
      'fd:path': '/content/forms/af/all-in-one/jcr:content/guideContainer/dropdown',
    },
    enum: [
      'IN',
      'US',
    ],
    ':type': 'forms-components-examples/components/form/dropdown',
  },
  ],
};
