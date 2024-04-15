// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  action: '/adobe/forms/af/form1.json',
  items: [{
    id: 'textinput-b101bbcdfb',
    fieldType: 'text-input',
    name: 'firstName',
    visible: true,
    type: 'string',
    required: true,
    enabled: false,
    readOnly: false,
    minLength: 3,
    maxLength: 10,
    pattern: '/^[a-zA-Z\\s]+$/',
    autoComplete: 'given-name',
    placeholder: 'Aya',
    description: '<p>Hint - First name should be minimum 3 characters and a maximum of 10 characters.</p>',
    tooltip: '<p>Enter your first name.</p>',
    label: {
      visible: true,
      value: 'First Name',
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
      'fd:path': '/content/forms/af/all-in-one/jcr:content/guideContainer/textinput',
    },
    ':type': 'forms-components-examples/components/form/textinput',
  },
  ],
};

export const formPath = 'http://localhost:3000/adobe/forms/af/form1.json';
