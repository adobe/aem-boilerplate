import assert from 'assert';
import nock from 'nock';
import multipart from 'parse-multipart-data';
import sinon from 'sinon';

const scope = nock('http://localhost:3000')
  .post('/submit-success', function test(body) {
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
    redirectUrl: 'http://localhost:3000/abc.html',
  });

export const sample = {
  action: 'http://localhost:3000/submit-success',
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
  }, {
    fieldType: 'button',
    id: 'button',
    events: {
      click: 'submitForm()',
    },
  }],
};
const mock = sinon.fake();
export function op(block) {
  global.window = Object.create(window);
  Object.defineProperty(global.window, 'location', {
    value: {
      assign: mock,
    },
    writable: true,
  });
  const btn = block.querySelector('#button');
  btn.click();
  const form = block.querySelector('form');
  form.dispatchEvent(new Event('submit'));
}

export function expect() {
  assert.equal(scope.isDone(), true, 'submit call was not made');
  assert(mock.calledOnce);
  assert(mock.calledWith('http://localhost:3000/abc.html'));
}

export const opDelay = 100;
