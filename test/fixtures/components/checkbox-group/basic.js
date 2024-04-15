// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'checkboxgroup-id',
    fieldType: 'checkbox-group',
    name: 'checkboxgroup-name',
    visible: true,
    type: 'number[]',
    enumNames: [
      'Item 1',
      ' Item 2',
    ],
    label: {
      visible: true,
      value: 'Check Box Group',
    },
    properties: {
      'afs:layout': {
        orientation: 'vertical',
      },
      'fd:dor': {
        dorExclusion: false,
      },
      'fd:path': '/content/forms/af/aaa/jcr:content/guideContainer/checkboxgroup',
    },
    enum: [
      0,
      1,
    ],
    ':type': 'forms-components-examples/components/form/checkboxgroup',
  }],
};
