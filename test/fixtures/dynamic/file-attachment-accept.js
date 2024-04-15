/* eslint-env mocha */
import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'fileinput-fc4d042b5e',
      fieldType: 'file-input',
      name: 'idProof',
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
    {
      id: 'file-input-no-accept',
      fieldType: 'file-input',
      name: 'file-input-no-accept',
      description: '<p>You can upload any file which is less than 1 MB</p>',
      tooltip: '<p>Please upload any file.</p>',
      type: 'file',
      enabled: true,
      readOnly: false,
      accept: [
        'image/*',
      ],
      maxFileSize: '1MB',
      label: {
        visible: false,
        value: 'Identity Proof',
      },
      ':type': 'forms-components-examples/components/form/fileinput',
    },
  ],
};

export function op(block) {
  let input = block.querySelector('#fileinput-fc4d042b5e');
  let file1 = new File([new ArrayBuffer(512)], 'file1.png', { type: 'image/png' });
  let event = new Event('change', {
    bubbles: true,
    cancelable: true,
  });
  input.files = [file1];
  input.dispatchEvent(event);

  input = block.querySelector('#file-input-no-accept');
  file1 = new File([new ArrayBuffer(512)], 'file1.png', { type: 'image/png' });
  event = new Event('change', {
    bubbles: true,
    cancelable: true,
  });
  input.files = [file1];
  input.dispatchEvent(event);
}

export function expect(block) {
  let input = block.querySelector('#fileinput-fc4d042b5e');
  assert.equal(input.validity.valid, false, 'should be invalid');
  assert.equal(input.validationMessage, 'The specified file type not supported.', 'should show proper error');

  input = block.querySelector('#file-input-no-accept');
  assert.equal(input.validity.valid, true, 'second field should be valid');
  assert.equal(input.validationMessage, '', 'second field should have no error');
}
