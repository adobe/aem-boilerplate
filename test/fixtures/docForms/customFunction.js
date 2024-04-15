import assert from 'assert';

export const sample = {
  total: 2,
  offset: 0,
  limit: 2,
  data: [{
    Name: 'firstName',
    Type: 'text',
    Description: '',
    Label: 'First Name',
    Mandatory: '',
    Value: '',
    Visible: '',
    'Visible Expression': '',
  }, {
    Name: 'lastName',
    Type: 'text',
    Description: '',
    Label: 'Last Name',
    Mandatory: '',
    Value: '',
    Visible: '',
    'Visible Expression': '',
  }, {
    Name: 'fullName',
    Type: 'text',
    Description: '',
    Label: 'Full Name',
    Mandatory: '',
    Value: '',
    Visible: 'false',
    'Value Expression': '=getFullName(F2,F3)',
    Options: '',
  }],
  ':type': 'sheet',
};

export function op(block) {
  const firstName = block.querySelector('#firstname');
  firstName.value = 'Aya';
  firstName.dispatchEvent(new Event('change', { bubbles: true }));

  const lastName = block.querySelector('#lastname');
  lastName.value = 'Tan';
  lastName.dispatchEvent(new Event('change', { bubbles: true }));
}

export const formPath = 'http://localhost:3000/info.json';

export function expect(block) {
  const fullName = block.querySelector('#fullname');
  console.log('text', fullName);
  assert.equal(fullName.value, 'Aya Tan', 'value is not set in the field');

  const firstName = block.querySelector('#firstname');
  firstName.value = null;
  firstName.dispatchEvent(new Event('change', { bubbles: true }));
  assert.equal(fullName.value, 'Tan', 'value is not set in the field');
}

export const opDelay = 100;
