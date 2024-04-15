// eslint-disable-next-line import/prefer-default-export
export const fieldDef = {
  total: 12,
  offset: 0,
  limit: 12,
  data: [{
    Name: 'startDate', Type: 'date', Placeholder: '', Label: 'Start Date', Mandatory: 'true', Value: '', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': 'This field is required',
  }, {
    Name: 'endDate', Type: 'date', Placeholder: '', Label: 'End Date', Mandatory: 'true', Value: '', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': '', 'Min Error Message': 'End date should be greater than start date', 'Max Error Message': 'End date should be less than 10 days',
  }, {
    Name: 'destination', Type: 'select', Placeholder: 'Select your destination', Label: 'Destination', Mandatory: '', Value: 'US', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: 'United States, India, Australia, United Kindom', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': '',
  }, {
    Name: 'class', Type: 'select', Placeholder: 'Please Select', Label: 'Class of service', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: 'Economy, Business, First', OptionNames: 'Economy Class, Business Class, First Class', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': '',
  }, {
    Name: 'budget', Type: 'number', Placeholder: '', Label: 'Room Budget', Mandatory: '', Value: '1000', Visible: '', Min: '500', Max: '10000', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '500', ReadOnly: '', Describe: '', 'Max Error Message': 'Maximum of Xyz', 'Min Error Message': 'Minimum of Xyz',
  }, {
    Name: 'amount', Type: 'number', Placeholder: '', Label: 'Estimated Trip Cost', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': '',
  }, {
    Name: 'panel-1', Type: 'fieldset', Placeholder: '', Label: 'Traveler Info', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '12', Checked: '', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': '', 'Min Error Message': 'Min should be 1 travler', 'Max Error Message': 'Max should be 3 travler',
  }, {
    Name: 'name', Type: 'text', Placeholder: '', Label: 'Name', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: 'panel-1', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': '',
  }, {
    Name: 'age', Type: 'number', Placeholder: '', Label: 'Age', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: 'panel-1', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': '',
  }, {
    Name: 'subscribe', Type: 'checkbox', Placeholder: '', Label: 'Do you like subscribe for Magazine & Activities?', Mandatory: '', Value: 'true', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '', Checked: 'false', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': '',
  }, {
    Name: 'email', Type: 'email', Placeholder: '', Label: 'Email', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '', Checked: '', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': '',
  }, {
    Name: 'submit', Type: 'submit', Placeholder: '', Label: 'Submit', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '', Checked: '', Step: '', ReadOnly: '', Describe: '', 'Required Error Message': '',
  },
  {
    Name: 'attach', Type: 'file', Placeholder: '', Label: 'Attach', Mandatory: '', Value: '', Visible: '', Min: '', Max: '1MB', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '', Checked: '', Step: '', ReadOnly: '', Description: '', 'Required Error Message': '', Accept: 'application/pdf',
  }],
  ':type': 'sheet',
};
