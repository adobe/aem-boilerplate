// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  action: '/adobe/forms/af/form1.json',
  items: [{
    id: 'textinput-4e4f61cad9',
    fieldType: 'text-input',
    name: 'lastName',
    visible: true,
    type: 'string',
    required: true,
    enabled: true,
    readOnly: false,
    autoComplete: 'family-name',
    default: 'Tan',
    label: {
      visible: true,
      richText: true,
      value: '<b>Last Name</b><script type="application/javascript">alert(1)</script>',
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
      'fd:path': '/content/forms/af/all-in-one/jcr:content/guideContainer/textinput_1442950437',
    },
    ':type': 'forms-components-examples/components/form/textinput',
  },
  ],
};

export const formPath = 'http://localhost:3000/adobe/forms/af/form1.json';
