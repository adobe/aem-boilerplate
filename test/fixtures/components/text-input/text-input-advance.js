// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  action: '/adobe/forms/af/form1.json',
  items: [{
    id: 'textinput-ccedc502ec',
    fieldType: 'text-input',
    name: 'displayName',
    visible: false,
    type: 'string',
    enabled: true,
    readOnly: true,
    autoComplete: 'off',
    placeholder: 'Aya Tan',
    description: '<p>Hint - First name should be minimum 3 characters and a maximum of 10 characters.</p>',
    tooltip: '<p>Enter your first name.</p>',
    label: {
      visible: false,
      value: 'Display Name',
    },
    events: {
      'custom:setProperty': [
        '$event.payload',
      ],
    },
    properties: {
      'fd:dor': {
        dorExclusion: false,
      },
      'fd:path': '/content/forms/af/all-in-one/jcr:content/guideContainer/textinput_1215745486',
    },
    ':type': 'forms-components-examples/components/form/textinput',
  },
  ],
};

export const formPath = 'http://localhost:3000/adobe/forms/af/form1.json';
