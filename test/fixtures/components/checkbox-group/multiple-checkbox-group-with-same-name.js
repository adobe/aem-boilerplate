// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [
    {
      id: 'p1',
      fieldType: 'panel',
      name: 'panel1',
      type: 'object',
      items: [{
        id: 'cbsamenameid1',
        fieldType: 'checkbox-group',
        name: 'cbsamename',
        enum: [0, 1],
      }],
    },
    {
      id: 'cbsamenameid2',
      fieldType: 'checkbox-group',
      name: 'cbsamename',
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
