// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'checkbox-7b8a92de4e',
    fieldType: 'checkbox',
    name: 'subscribe',
    visible: true,
    description: '<p>Check, If you wish to subscribe to activities</p>',
    tooltip: '<p>subscribe is optional</p>',
    type: 'string',
    required: true,
    enabled: true,
    readOnly: true,
    enforceEnum: true,
    default: 'yes',
    label: {
      visible: false,
      value: 'Do you like to subscribe to activity?',
    },
    events: {
      'custom:setProperty': [
        '$event.payload',
      ],
    },
    properties: {
      'afs:layout': {
        tooltipVisible: false,
        orientation: 'horizontal',
      },
      'fd:dor': {
        dorExclusion: false,
      },
      'fd:path': '/content/forms/af/all-in-one/jcr:content/guideContainer/checkbox',
    },
    enum: [
      'yes',
      'no',
    ],
    ':type': 'forms-components-examples/components/form/checkbox',
  },
  ],
};
