// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [
    {
      id: 'p1',
      fieldType: 'panel',
      name: 'panel1',
      type: 'object',
      items: [{
        id: 'rb1id',
        fieldType: 'radio-group',
        name: 'rb1',
        enum: [0, 1],
      }],
    },
    {
      id: 'rb1id2',
      fieldType: 'radio-group',
      name: 'rb1',
      visible: true,
      type: 'number[]',
      enumNames: [
        'Item 1',
        'Item 2',
      ],
      label: {
        value: 'Check Box Group',
      },
      enum: [
        0,
        1,
      ],
    }],
};
