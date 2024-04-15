/* eslint-env mocha */
import assert from 'assert';

export const sample = {
  items: [
    {
      repeatable: true,
      type: 'object',
      fieldType: 'panel',
      name: 'panel1',
      minOccur: 1,
      items: [{
        fieldType: 'text-input',
        id: 'text-input',
        name: 'f2',
        rules: {
          value: 'f1 & \'2\'',
        },
      },
      {
        fieldType: 'text-input',
        id: 'text-input-2',
        name: 'f1',
      },
      {
        fieldType: 'button',
        id: 'remove-btn',
        name: 'remove-btn',
        events: {
          click: ['removeInstance(panel1, $parent.$index)'],
        },
      },
      ],
    },
    {
      fieldType: 'button',
      id: 'btn',
      name: 'btn',
      events: {
        click: ['addInstance(panel1)'],
      },
    },
  ],
};

export function op(block) {
  assert.equal(block.querySelectorAll('.repeat-wrapper  fieldset').length, 1);
  const btn = block.querySelector('#btn');
  btn.click();
  btn.click();
  const removeBtn = block.querySelector('#remove-btn');
  removeBtn.click();
}

export function expect(block) {
  assert.equal(block.querySelectorAll('.repeat-wrapper fieldset').length, 3);
}
