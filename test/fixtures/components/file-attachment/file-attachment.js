// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'fileinput-fc4d042b5e',
    fieldType: 'file-input',
    name: 'idProof',
    visible: true,
    type: 'file',
    enabled: true,
    readOnly: false,
    label: {
      visible: true,
      value: 'Identity Proof',
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
      'fd:path': '/content/forms/af/all-in-one/jcr:content/guideContainer/fileinput',
    },
    ':type': 'forms-components-examples/components/form/fileinput',
  },
  ],
};
