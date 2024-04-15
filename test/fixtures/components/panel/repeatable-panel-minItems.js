export const fieldDef = {
  items: [
    {
      fieldType: 'panel',
      id: 'panel1',
      name: 'panel1',
      label: {
        value: 'Panel Label',
      },
      repeatable: true,
      minOccur: 2,
      events: {
        'custom:setProperty': [
          '$event.payload',
        ],
      },
      items: [
        {
          id: 'textinput1',
          fieldType: 'text-input',
          name: 'textinput1',
          type: 'string',
          label: {
            value: 'Insured Property Address (Optional)',
          },
          events: {
            'custom:setProperty': [
              '$event.payload',
            ],
          },
        },
        {
          id: 'textinput2',
          fieldType: 'text-input',
          name: 'TextInput2',
          type: 'string',
          label: {
            value: 'City (Optional)',
          },
          properties: {
            'fd:dor': {
              dorExclusion: false,
            },
            'fd:path': '/content/forms/af/Claims_Form1701932419220/jcr:content/guideContainer/tabsOnTop1701932611697/panel_2/Insured_Property_City1701932419752',
          },
          events: {
            'custom:setProperty': [
              '$event.payload',
            ],
          },
          ':type': 'formsninja/components/adaptiveForm/textinput',
        },
      ],
    },
  ],
};

export const expectedDiffs = [
  {
    node: 'FORM/FIELDSET',
    attribute: 'data-id',
  },
  {
    node: 'FORM/FIELDSET',
    attribute: 'id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']',
    attribute: 'data-id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']',
    attribute: 'id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/LEGEND',
    attribute: 'for',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/DIV[1]',
    attribute: 'data-id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/DIV[1]/LABEL',
    attribute: 'for',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/DIV[1]/INPUT',
    attribute: 'id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/DIV[2]',
    attribute: 'data-id',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/DIV[2]/LABEL',
    attribute: 'for',
  },
  {
    node: 'FORM/FIELDSET/DIV/FIELDSET[@id=\'uniqueId2\']/DIV[2]/INPUT',
    attribute: 'id',
  },
];
