/* eslint-env mocha */
import assert from 'assert';

export const sample = {
  items: [
    {
      id: 'file-max-2',
      fieldType: 'file-input',
      name: 'file-max-2',
      visible: false,
      description: '<p>You can upload any PDF file which is less than 1 MB</p>',
      tooltip: '<p>Please upload any PDF file.</p>',
      type: 'file[]',
      required: true,
      enabled: true,
      readOnly: false,
      maxFileSize: '2MB',
      accept: [
        'application/pdf',
      ],
      maxItems: 2,
      label: {
        visible: false,
        value: 'Identity Proof',
      },
      ':type': 'forms-components-examples/components/form/fileinput',
    },
    {
      id: 'file-min-2',
      fieldType: 'file-input',
      name: 'file-min-2',
      visible: false,
      description: '<p>You can upload any PDF file which is less than 1 MB</p>',
      tooltip: '<p>Please upload any PDF file.</p>',
      type: 'file[]',
      required: true,
      enabled: true,
      readOnly: false,
      minItems: 2,
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
  let input = block.querySelector('#file-max-2');
  const file1 = new File([new ArrayBuffer(512)], 'file1.png', { type: 'application/pdf' });
  const file2 = new File([new ArrayBuffer(512)], 'file2.png', { type: 'application/pdf' });
  const file3 = new File([new ArrayBuffer(512)], 'file3.png', { type: 'application/pdf' });
  let event = new Event('change', {
    bubbles: true,
    cancelable: true,
  });
  input.files = [file1, file2, file3];
  input.dispatchEvent(event);

  input = block.querySelector('#file-min-2');
  const file4 = new File([new ArrayBuffer(512)], 'file1.png', { type: 'application/pdf' });
  event = new Event('change', {
    bubbles: true,
    cancelable: true,
  });
  input.files = [file4];
  input.dispatchEvent(event);
}

export function expect(block) {
  let input = block.querySelector('#file-max-2');
  assert.equal(input.validity.valid, false, 'should be invalid');
  assert.equal(input.validationMessage, 'Specify a number of items equal to or less than 2.', 'should show proper error');

  input = block.querySelector('#file-min-2');
  assert.equal(input.validity.valid, false, 'should be invalid');
  assert.equal(input.validationMessage, 'Specify a number of items equal to or greater than 2.', 'should show proper error');
}
