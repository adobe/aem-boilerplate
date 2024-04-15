// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [
    {
      id: 'radiobutton-abace222cd',
      fieldType: 'radio-group',
      name: 'radiobutton1705050944702',
      visible: true,
      type: 'string',
      required: true,
      enabled: true,
      constraintMessages: {
        required: 'required message',
      },
      readOnly: false,
      enforceEnum: true,
      enumNames: [
        'Item 1',
        'Item 2',
      ],
      label: {
        visible: true,
        value: 'Radio Button',
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
        'fd:path': '/content/forms/af/xzzxzx/jcr:content/guideContainer/radiobutton',
      },
      enum: [
        '0',
        '1',
      ],
      ':type': 'forms-components-examples/components/form/radiobutton',
    },
  ],
};
