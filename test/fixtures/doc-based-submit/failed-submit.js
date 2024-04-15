import assert from 'assert';
import nock from 'nock';
import { fireEvent } from '@testing-library/dom';

const scope = nock('http://localhost:3000')
  .post('/adobe/forms/af/form1')
  .reply(500, {});

export const formPath = 'http://localhost:3000/adobe/forms/af/form1.json';

export const sample = {
  total: 3,
  offset: 0,
  limit: 11,
  ':type': 'sheet',
  data: [
    {
      Type: 'text',
      Name: 'f2',
    },
    {
      Type: 'text',
      Name: 'f1',
    },
    {
      Type: 'submit',
      Name: 'submit',
      Label: 'Submit',
    },
  ],
};

export function op(block) {
  const btn = block.querySelector('button');
  // the click handler doesn't submit the form in tests.
  // hence submitting manually
  btn.addEventListener('click', () => {
    fireEvent.submit(btn.form);
  });
  btn.click();
}

export function expect(block) {
  assert.equal(scope.isDone(), true, 'submit call was not made');
  const el = block.querySelector('.form-message.error-message');
  assert.equal(el.textContent, 'Some error occured while submitting the form');
}

export const opDelay = 200;
