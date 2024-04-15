import assert from 'assert';

export const fieldDef = {
  items: [{
    id: 'default-checkbox-group-id',
    fieldType: 'checkbox-group',
    name: 'default-checkbox-group',
    visible: true,
    type: 'number[]',
    enumNames: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
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
      2,
      3,
    ],
    default: [1, 2],
    ':type': 'forms-components-examples/components/form/checkboxgroup',
  }],
};

export const extraChecks = [(block) => {
  assert.equal(block.querySelector('#default-checkbox-group').checked, false);
  assert.equal(block.querySelector('#default-checkbox-group-1').checked, true);
  assert.equal(block.querySelector('#default-checkbox-group-2').checked, true);
  assert.equal(block.querySelector('#default-checkbox-group-3').checked, false);
}];
