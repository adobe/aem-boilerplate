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
      type: 'file[]',
      required: true,
      enabled: true,
      minItems: 2,
      maxItems: 4,
      readOnly: false,
      maxFileSize: '1',
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
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
      properties: {
        'afs:layout': {
          tooltipVisible: false,
        },
        'fd:dor': {
          dorExclusion: false,
        },
        'fd:path': '/content/forms/af/all-in-one/jcr:content/guideContainer/fileinput',
      },
      ':type': 'forms-components-examples/components/form/fileinput',
    },
  ],
};

export function op(block) {
  const input = block.querySelector('input');
  const fileList = block.querySelector('.files-list');
  const file1 = new File([new ArrayBuffer(1024)], 'file1.png', { type: 'image/png' });
  const file2 = new File([new ArrayBuffer(2048)], 'file2.png', { type: 'image/png' });
  const event = new Event('change', {
    bubbles: true,
    cancelable: true,
  });
  input.files = [file1, file2];
  input.dispatchEvent(event);
  assert.equal(fileList.children.length, 2, 'Should render two files');
  assert.equal(fileList.innerHTML.includes('file1.png'), true, 'Should show file1.png');
  assert.equal(fileList.innerHTML.includes('file2.png'), true, 'Should show file2.png');

  const removeButton = fileList.querySelector('button');
  const event2 = new Event('click', {
    bubbles: true,
    cancelable: true,
  });
  removeButton.dispatchEvent(event2);
}

export function expect(block) {
  const fileList = block.querySelector('.files-list');
  assert.equal(fileList.children.length, 1, 'Should render one file');
  assert.equal(fileList.innerHTML.includes('file1.png'), false, 'Should not show file1.png');
  assert.equal(fileList.innerHTML.includes('file2.png'), true, 'Should show file2.png');
}
