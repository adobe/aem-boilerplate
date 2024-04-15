import assert from 'assert';
import nock from 'nock';
import sinon from 'sinon';
import { fireEvent } from '@testing-library/dom';

const scope = nock('http://localhost:3000')
  .post('/submit-success-redirect', function test(body) {
    // using a function syntax here instead of array because the this parameter is
    // set during the call
    const contentType = this.headers['content-type'];
    assert.equal(contentType, 'application/json', 'content type not set to application/json');
    const { data } = body;
    assert.equal(Object.keys(data).length, 3, 'more data received than expected');
    assert.equal(data.f1, '10');
    assert.equal(data.f2, '102');
    // eslint-disable-next-line no-underscore-dangle
    assert.equal(data.__id__.toString().length > 0, true, 'id not present');
    return true;
  })
  .reply(200, {
    redirectUrl: 'http://localhost:3000/abc.html',
  });

export const formPath = 'http://localhost:3000/submit-success-redirect.json';

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
const mock = sinon.fake();

export function op(block) {
  global.window = Object.create(window);
  Object.defineProperty(global.window, 'location', {
    value: {
      assign: mock,
    },
    writable: true,
  });
  const f1 = block.querySelector('input[name="f1"]');
  f1.value = '10';
  const f2 = block.querySelector('input[name="f2"]');
  f2.value = '102';

  const btn = block.querySelector('button');
  btn.addEventListener('click', () => {
    fireEvent.submit(btn.form);
  });
  // btn.click();
  fireEvent(btn, new MouseEvent('click', { bubbles: true, cancelable: true }));
}

export function expect() {
  assert.equal(scope.isDone(), true, 'submit call was not made');
  // assert(mock.calledOnce);
  // assert(mock.calledWith('http://localhost:3000/abc.html'));
}

export const opDelay = 200;
