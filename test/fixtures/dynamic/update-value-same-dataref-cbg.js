import assert from 'assert';

// checkbox group with same name should affect other checkbox group
// if they have same dataRef

export const sample = {
  items: [
    {
      id: 'p1',
      fieldType: 'panel',
      items: [{
        id: 'cb1id',
        fieldType: 'checkbox-group',
        name: 'cb1-uv',
        type: 'number[]',
        enum: [0, 1],
      }],
    },
    {
      id: 'cb1id2',
      fieldType: 'checkbox-group',
      name: 'cb1-uv',
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
  const radio = block.querySelector('#cb1-uv');
  radio.click();
  radio.dispatchEvent(new Event('change', { bubbles: true }));
}

export function expect(block) {
  assert.equal(block.querySelector('#cb1-uv-2').checked, true, 'checkbox in other group is selected');
  assert.equal(block.querySelector('#cb1-uv-3').checked, false, 'checkbox in other group is selected');
}
