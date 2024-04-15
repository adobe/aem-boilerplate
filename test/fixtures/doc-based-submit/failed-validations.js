import assert from 'assert';
import nock from 'nock';
import { fireEvent } from '@testing-library/dom';

const thankYouMessage = 'thank you for submitting the form';

const scope = nock('http://localhost:3000')
  .post('/submit')
  .reply(200, {
    thankYouMessage,
  });

export const formPath = 'http://localhost:3000/submit.json';

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
      Mandatory: true,
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
  assert.equal(scope.isDone(), false, 'submit call was made');
  const t3 = block.querySelector('input[name="f1"]').parentElement;
  const message = t3.querySelector('.field-invalid .field-description');
  assert.equal(message.textContent, 'Please fill in this field.', 'no error message shown');
}

export const opDelay = 100;
