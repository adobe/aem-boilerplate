import assert from 'assert';
import nock from 'nock';
import multipart from 'parse-multipart-data';

const data = {
  f1: 10,
  id: 11,
};

const scope = nock('http://localhost:3005')
  .post('/submit-success', function test(body) {
    // using a function syntax here instead of array because the this parameter is
    // set during the call
    const contentType = this.headers['content-type'];
    const boundary = contentType.match('multipart/form-data; boundary=(.+)')?.[1];
    const parts = multipart.parse(Buffer.from(body), boundary);
    // eslint-disable-next-line no-unused-vars
    const data1 = parts.reduce((acc, part) => ({
      ...acc,
      [part.name]: JSON.parse(part.data.toString()),
    }), {});
    assert.deepStrictEqual(data1.data, { f1: 10, f2: '102', id: 11 });
    return true;
  })
  .reply(200, {
    thankYouMessage: 'thank you for submitting the form',
  });

export const sample = {
  action: 'http://localhost:3005/submit-success',
  id: 'someid2',
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

export function before() {
  global.fetch.mockData['http://localhost:3000/adobe/forms/af/data/someid2'] = data;
}

export function op(block) {
  const btn = block.querySelector('#button');
  btn.click();
}

export function expect() {
  assert.equal(scope.isDone(), true, 'submit was success');
}

export function after() {
  global.fetch.mockData = {};
}

export const opDelay = 100;
