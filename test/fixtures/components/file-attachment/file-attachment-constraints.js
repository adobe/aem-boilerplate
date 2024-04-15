// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'fileinput-fc4d042b5e',
    fieldType: 'file-input',
    name: 'idProof',
    visible: true,
    description: '<p>You can upload any PDF file which is less than 1 MB</p>',
    tooltip: '<p>Please upload any PDF file.</p>',
    type: 'file',
    required: true,
    enabled: true,
    readOnly: false,
    maxFileSize: '1MB',
    accept: [
      'audio/*',
      ' video/*',
      ' image/*',
      ' application/pdf',
    ],
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
      'afs:layout': {
        tooltipVisible: false,
      },
      'fd:dor': {
        dorExclusion: false,
      },
      'fd:path': '/content/forms/af/all-in-one/jcr:content/guideContainer/fileinput',
    },
    ':type': 'forms-components-examples/components/form/fileinput',
  },
  ],
};
