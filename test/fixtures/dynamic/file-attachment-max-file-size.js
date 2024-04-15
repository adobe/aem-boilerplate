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
      required: true,
      enabled: true,
      readOnly: false,
      maxFileSize: '1MB',
      accept: [
        'audio/*',
        ' video/*',
        ' image/*',
        ' application/pdf',
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
  const file1 = new File([new ArrayBuffer(2 * 1024 * 1024)], 'file1.png', { type: 'image/png' });
  const event = new Event('change', {
    bubbles: true,
    cancelable: true,
  });
  input.files = [file1];
  input.dispatchEvent(event);
}

export function expect(block) {
  const input = block.querySelector('input');
  assert.equal(input.validity.valid, false, 'should be invalid');
  assert.equal(input.validationMessage, 'File too large. Reduce size and try again.', 'should show proper error');
}
