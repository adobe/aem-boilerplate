import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'p1',
      fieldType: 'panel',
      name: 'panel1',
      type: 'object',
      items: [{
        id: 'rb1id',
        fieldType: 'radio-group',
        name: 'rb1-same-name',
        enum: [0, 1],
        enumNames: [
          'Item 1',
          'Item 2',
        ],
      }],
    },
    {
      id: 'rb1id2',
      fieldType: 'radio-group',
      name: 'rb1-same-name',
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
  const radio = block.querySelector('#rb1-same-name');
  radio.click();
  radio.dispatchEvent(new Event('change', { bubbles: true }));
}

export function expect(block) {
  assert.equal(block.querySelector('#rb1-same-name-2').checked, false, 'radio in other group is not selected');
  assert.equal(block.querySelector('#rb1-same-name-3').checked, false, 'radio in other group is not selected');
}
