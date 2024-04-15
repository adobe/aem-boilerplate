import assert from 'assert';

const data = {
  data: {
    afData: {
      afBoundData: {
        f1: 10,
      },
    },
  },
};

export const sample = {
  action: 'http://localhost:3000/submit',
  id: 'someid',
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
  global.fetch.mockData['http://localhost:3000/adobe/forms/af/data/someid'] = data;
}

export function op() {
}

export function expect(block) {
  const textInput = block.querySelector('#text-input');
  const textInput2 = block.querySelector('#text-input-2');
  assert.equal(textInput.value, '102');
  assert.equal(textInput2.value, '10');
}

export function after() {
  global.fetch.mockData = {};
}
