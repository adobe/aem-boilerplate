import assert from 'assert';

export const sample = {
  total: 2,
  offset: 0,
  limit: 2,
  data: [{
    Name: 'infoName',
    Type: 'text',
    Description: '',
    Label: 'Name',
    Mandatory: '',
    Value: '',
    Visible: '',
    'Visible Expression': '',
  }, {
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
    Name: 'maritalStatusText',
    Id: 'maritalStatusText',
    Type: 'text',
    Description: '',
    Label: 'Spouse',
    Mandatory: '',
    Value: '',
    Visible: 'false',
    'Value Expression': '=F2 & " is " & F3',
    Options: '',
  }],
  ':type': 'sheet',
};

export function op(block) {
  const name = block.querySelector('#infoname');
  name.value = 'john doe';
  name.dispatchEvent(new Event('change', { bubbles: true }));
  const ms = block.querySelector('select');
  ms.value = 'married';
  ms.dispatchEvent(new Event('change', { bubbles: true }));
}

export const formPath = 'http://localhost:3000/spouse.json';

export function expect(block) {
  const text = block.querySelector('#maritalStatusText');
  assert.equal(text.value, 'john doe is married', 'value is not set in the field');
}

export const opDelay = 100;
