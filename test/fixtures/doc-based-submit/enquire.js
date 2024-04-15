import assert from 'assert';
import nock from 'nock';
import { fieldDef } from '../form/enquire.js';

const thankYouMessage = 'Thanks for your submission';

const scope = nock('http://localhost:3000')
  .post('/enquire', function test(body) {
    // using a function syntax here instead of array because the this parameter is
    // set during the call
    const contentType = this.headers['content-type'];
    assert.equal(contentType, 'application/json', 'content type not set to application/json');
    const { data } = body;
    const expected = {
      'quote[destination]': 'Select your destination',
      'quote[destinationState]': 'Select your state',
      'quote[departureDate]': '',
      'quote[returnDate]': '',
      'quote[residence]': 'Select your residence',
      'quote[citizenship]': '',
      'quote[tripCostAmount]': '2',
      'quote[initialTripPaymentDate]': '',
      name: '',
      age: '',
    };
    // eslint-disable-next-line no-underscore-dangle
    assert.equal(data.__id__ > 0, true, 'id is not empty');
    Object.entries(expected).forEach(([key, value]) => {
      assert.equal(data[key], value, `${key} do not match`);
    });
    return true;
  })
  .reply(200, {
    thankYouMessage,
  });

export const sample = fieldDef;

export const formPath = 'http://localhost:3000/enquire.json';

export function op(block) {
  const range = block.querySelector('input[name="quote[tripCostAmount]"]');
  range.value = 2;
  const btn = block.querySelector('button[type="submit"');
  btn.click();
  const form = block.querySelector('form');
  form.dispatchEvent(new Event('submit'));
}

export function expect() {
  assert.equal(scope.isDone(), true, 'submit call was not made');
  // const el = block.querySelector('.form-message.success-message');
  // assert.equal(el.textContent, thankYouMessage);
}

export const opDelay = 200;
