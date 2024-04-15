// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'numberinput-40db827550',
    fieldType: 'number-input',
    name: 'zipcode',
    visible: true,
    type: 'integer',
    required: false,
    enabled: true,
    readOnly: false,
    placeholder: '50065',
    label: {
      visible: true,
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
