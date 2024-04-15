import assert from 'assert';
import nock from 'nock';
import multipart from 'parse-multipart-data';

const thankYouMessage = 'thank you for submitting the form';

const scope = nock('http://localhost:3000')
  .post('/submit', function parseBody(body) {
    // using a function syntax here instead of array because the this parameter is
    // set during the call
    const contentType = this.headers['content-type'];
    const boundary = contentType.match('multipart/form-data; boundary=(.+)')?.[1];
    const parts = multipart.parse(Buffer.from(body), boundary);
    assert.equal(parts.length, 2);
    const data = parts.reduce((acc, part) => ({
      ...acc,
      [part.name]: JSON.parse(part.data.toString()),
    }), {});
    assert.deepStrictEqual(data.data, { f1: '10', f2: '102' });
    return true;
  })
  .reply(200, {
    thankYouMessage,
  });

export const sample = {
  action: 'http://localhost:3000/submit',
  items: [{
    fieldType: 'text-input',
    id: 'text-input',
    name: 'f2',
    rules: {
      value: "f1 & '2'",
    },
  },
  {
    fieldType: 'text-input',
    id: 'text-input-2',
    name: 'f1',
    default: '10',
  },
  {
    fieldType: 'text-input',
    id: 'text-input-3',
    name: 'f3',
    required: true,
    constraintMessages: {
      required: 'Please fill in this field.',
    },
  },
  {
    fieldType: 'button',
    id: 'button',
    buttonType: 'submit',
    events: {
      click: 'submitForm()',
    },
  }],
};

export function op(block) {
  const btn = block.querySelector('#button');
  btn.click();
  const form = block.querySelector('form');
  form.dispatchEvent(new Event('submit'));
}

export function expect(block) {
  assert.equal(scope.isDone(), false);
  const t3 = block.querySelector('#text-input-3').parentElement;
  const message = t3.querySelector('.field-invalid .field-description');
  assert.equal(message.textContent, 'Please fill in this field.', 'no error message shown');
}

export const opDelay = 100;
