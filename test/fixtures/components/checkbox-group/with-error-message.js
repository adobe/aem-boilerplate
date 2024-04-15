// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [
    {
      id: 'checkboxgroup-71b8ae56cd',
      fieldType: 'checkbox-group',
      name: 'checkboxgroup1705052019500',
      visible: true,
      type: 'number[]',
      required: true,
      enabled: true,
      constraintMessages: {
        required: 'Required error message',
      },
      readOnly: false,
      enforceEnum: true,
      enumNames: [
        'Item 1',
        ' Item 2',
      ],
      label: {
        visible: true,
        value: 'Check Box Group',
      },
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
      properties: {
        'afs:layout': {
          orientation: 'horizontal',
        },
        'fd:dor': {
          dorExclusion: false,
        },
        'fd:path': '/content/forms/af/xzzxzx/jcr:content/guideContainer/checkboxgroup',
      },
      enum: [
        0,
        1,
      ],
      ':type': 'forms-components-examples/components/form/checkboxgroup',
    },
  ],
};
