// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  action: '/adobe/forms/af/form1.json',
  items: [{
    id: 'textinput-4e4f61cad9',
    fieldType: 'text-input',
    name: 'lastName',
    visible: false,
    type: 'string',
    label: {
      value: 'Last Name',
    },
    rules: {
      value: '5 + 2',
    },
    ':type': 'forms-components-examples/components/form/textinput',
  },
  ],
};

export const formPath = 'http://localhost:3000/adobe/forms/af/form1.json';
