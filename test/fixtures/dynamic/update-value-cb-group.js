import assert from 'assert';

export const sample = {
  items: [{
    fieldType: 'checkbox-group',
    id: 'cb-id',
    name: 'cb',
    enum: [0, 1, 2],
    default: [1],
  },
  {
    fieldType: 'text-input',
    id: 'text-input',
    name: 'f1',
    rules: {
      value: 'join(\',\', cb.$value)',
    },
  },
  {
    fieldType: 'number-input',
    id: 'number-input-f2',
    name: 'f2',
  },
  {
    fieldType: 'checkbox-group',
    id: 'cb-id-2',
    name: 'cb2',
    enum: [true, false],
    rules: {
      value: 'if(f2 > 2, true(), false())',
    },
  }],
};

export function op(block) {
  assert.equal(block.querySelector('#cb-1').checked, true, 'checkbox 1 is selected');
  assert.equal(block.querySelector('#text-input').value, '1', 'text-input initial value is 1');
  assert.equal(block.querySelector('#cb2-1').checked, true, 'second checkbox (false) is selected');
  const radio = block.querySelector('#cb-2');
  radio.click();
  radio.dispatchEvent(new Event('change', { bubbles: true }));
  const numberInput = block.querySelector('#number-input-f2');
  numberInput.click();
  numberInput.value = 3;
  numberInput.dispatchEvent(new Event('change', { bubbles: true }));
}

export function expect(block) {
  assert.equal(block.querySelector('#cb-1').checked, true, 'checkbox 1 is still selected');
  assert.equal(block.querySelector('#cb-2').checked, true, 'checkbox 2 is also selected');
  assert.equal(block.querySelector('#text-input').value, '1,2', 'text-input value is 1,2 now');
  assert.equal(block.querySelector('#cb2').checked, true, 'second checkbox (true) is not selected');
  assert.equal(block.querySelector('#cb2-1').checked, false, 'second checkbox (false) is selected');
}
