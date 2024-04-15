import assert from 'assert';

export const sample = {
  total: 2,
  offset: 0,
  limit: 2,
  data: [{
    Name: 'maritalStatus',
    Type: 'select',
    Description: '',
    Label: 'Marital Status',
    Mandatory: '',
    Value: '',
    Visible: '',
    'Visible Expression': '',
    Options: 'married,single,divorced',
  }, {
    Name: 'spouseName',
    Type: 'text',
    Description: '',
    Label: 'Spouse',
    Mandatory: '',
    Value: '',
    Visible: 'false',
    'Visible Expression': '=F2="married"',
    Options: '',
  }],
  ':type': 'sheet',
};

export function op(block) {
  const ms = block.querySelector('select');
  ms.value = 'married';
  ms.dispatchEvent(new Event('change', { bubbles: true }));
}

export const formPath = 'http://localhost:3000/spouse.json';

export function expect(block) {
  const spouse = block.querySelector('.field-spousename');
  assert.equal(spouse.dataset.visible, 'true', 'field was not made visible');

  const ms = block.querySelector('select');
  ms.value = 'single';
  ms.dispatchEvent(new Event('change', { bubbles: true }));
  assert.equal(spouse.dataset.visible, 'false', 'field was not made hidden');
}

export const opDelay = 100;
