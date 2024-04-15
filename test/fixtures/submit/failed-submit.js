import assert from 'assert';
import nock from 'nock';

const scope = nock('http://localhost:3000')
  .post('/submit')
  .reply(500, {});

export const sample = {
  action: 'http://localhost:3000/submit',
  items: [{
    fieldType: 'text-input',
    id: 'text-input',
    name: 'f2',
    rules: {
      value: 'f1 & \'2\'',
    },
  },
  {
    fieldType: 'text-input',
    id: 'text-input-2',
    name: 'f1',
  }, {
    fieldType: 'button',
    id: 'button',
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
  assert.equal(scope.isDone(), true);
  const el = block.querySelector('.form-message.error-message');
  assert.equal(el.textContent, 'Some error occured while submitting the form');
}

export const opDelay = 100;
