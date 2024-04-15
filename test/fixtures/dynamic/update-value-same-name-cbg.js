import assert from 'assert';

// checkbox group with same name should not affect other checkbox group
// if they have different dataRef

export const sample = {
  items: [
    {
      id: 'p1',
      fieldType: 'panel',
      name: 'panel1',
      type: 'object',
      items: [{
        id: 'cb1id',
        fieldType: 'checkbox-group',
        name: 'cb1-same-name',
        enum: [0, 1],
        enumNames: [
          'Item 1',
          'Item 2',
        ],
      }],
    },
    {
      id: 'cb1id2',
      fieldType: 'checkbox-group',
      name: 'cb1-same-name',
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

export function op(block) {
  const radio = block.querySelector('#cb1-same-name');
  radio.click();
  radio.dispatchEvent(new Event('change', { bubbles: true }));
}

export function expect(block) {
  assert.equal(block.querySelector('#cb1-same-name-2').checked, false, 'checkbox in other group is not selected');
  assert.equal(block.querySelector('#cb1-same-name-3').checked, false, 'checkbox in other group is not selected');
}
