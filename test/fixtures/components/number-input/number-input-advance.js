// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'numberinput-40db827550',
    fieldType: 'number-input',
    name: 'zipcode',
    visible: false,
    description: '<p>Hint - Zipcode should be a 5 digit number.</p>',
    tooltip: '<p>Please enter 5 digit zipcode number.</p>',
    type: 'integer',
    required: true,
    enabled: false,
    readOnly: true,
    step: 2,
    maximum: 99999,
    minimum: 11111,
    exclusiveMinimum: 11111,
    exclusiveMaximum: 99999,
    placeholder: '50065',
    label: {
      visible: false,
      value: 'Zip Code',
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
      'fd:path': '/content/forms/af/all-in-one/jcr:content/guideContainer/numberinput',
    },
    ':type': 'forms-components-examples/components/form/numberinput',
  },
  ],
};
