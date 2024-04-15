/* eslint-env mocha */
import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'fileinput-fc4d042b5e',
      fieldType: 'file-input',
      name: 'idProof',
      visible: false,
      description: '<p>You can upload any PDF file which is lessthan 1 MB</p>',
      tooltip: '<p>Please upload any PDF file.</p>',
      type: 'file',
      enabled: true,
      readOnly: false,
      maxFileSize: '1MB',
      accept: [
        'application/pdf',
      ],
      label: {
        visible: false,
        value: 'Identity Proof',
      },
      ':type': 'forms-components-examples/components/form/fileinput',
    },
  ],
};

export function op(block) {
  const input = block.querySelector('input');
  const file1 = new File([new ArrayBuffer(512)], 'file1.png', { type: 'image/png' });
  const event = new Event('change', {
    bubbles: true,
    cancelable: true,
  });
  input.files = [file1];
  input.dispatchEvent(event);

  const removeButton = block.querySelector('.files-list button');
  const event2 = new Event('click', {
    bubbles: true,
    cancelable: true,
  });
  removeButton.dispatchEvent(event2);
}

export function expect(block) {
  const input = block.querySelector('input');
  const wrapper = input.closest('.field-wrapper');
  assert.equal(wrapper.classList.contains('field-invalid'), false, 'should not have invalid css');
  assert.equal(input.validity.valid, true, 'should be valid');
  assert.equal(input.validationMessage, '', 'should not have any error');
}
