// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  total: 3,
  offset: 0,
  limit: 11,
  ':type': 'sheet',
  data: [
    {
      Type: 'text',
      Name: 'f2',
      Fieldset: 'panel1',
    },
    {
      Type: 'text',
      Name: 'f1',
      Fieldset: 'panel1',
    },
    {
      Type: 'fieldset',
      Name: 'panel1',
      Repeatable: 'true',
    },
    {
      Type: 'checkbox',
      Name: 'f3',
      Value: 'checkbox',
    },
    {
      Type: 'radio',
      Name: 'f4',
      Value: 'radio-on',
    },
    {
      Type: 'radio',
      Name: 'f4',
      Value: 'radio-off',
    },
    {
      Type: 'submit',
      Name: 'submit',
      Label: 'Submit',
    },
  ],
};

export const ignore = true;
