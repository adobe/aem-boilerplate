import assert from 'assert';

export const sample = {
  items: [{
    fieldType: 'checkbox',
    id: 'checkbox-dynamic-test',
    name: 'checkbox-dynamic-test',
    enum: ['on'],
    label: {
      value: 'Checkbox dynamic test',
    },
  }],
};

export function op(block) {
  const cb = block.querySelector('#checkbox-dynamic-test');
  cb.click();
  cb.dispatchEvent(new Event('change', { bubbles: true })); // switch on
  cb.click();
  cb.dispatchEvent(new Event('change', { bubbles: true })); // switch off
}

export function expect(block) {
  const cb = block.querySelector('#checkbox-dynamic-test');
  assert.equal(cb.checked, false, 'checkbox is off');
  assert.equal(cb.value, 'on');
}
