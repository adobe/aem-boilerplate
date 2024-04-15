// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  items: [{
    id: 'datepicker-6dd0c75352',
    fieldType: 'date-input',
    name: 'dob',
    visible: true,
    description: '<p>Your date of birth should be between 1980 to 2022.</p>',
    tooltip: '<p>Please enter your date of birth.</p>',
    type: 'string',
    required: true,
    enabled: true,
    readOnly: false,
    placeholder: '2000-02-13',
    label: {
      visible: true,
      value: 'Date Of Birth',
    },
    events: {
      'custom:setProperty': [
        '$event.payload',
      ],
    },
    properties: {
      'afs:layout': {
        tooltipVisible: false,
      },
      'fd:dor': {
        dorExclusion: false,
      },
      'fd:path': '/content/forms/af/all-in-one/jcr:content/guideContainer/datepicker',
    },
    format: 'date',
    minimum: '1980-01-30',
    maximum: '2022-01-30',
    ':type': 'forms-components-examples/components/form/datepicker',
  },
  ],
};
