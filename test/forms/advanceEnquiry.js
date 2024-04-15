// eslint-disable-next-line import/prefer-default-export
export const advanceEnquiry = {
  total: 13,
  offset: 0,
  limit: 13,
  data: [{
    Name: 'startDate', Type: 'date', Placeholder: '', Label: 'Start Date', Mandatory: 'true', Value: '45360', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '',
  }, {
    Name: 'endDate', Type: 'date', Placeholder: '', Label: 'End Date', Mandatory: 'true', Value: '45363', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '',
  }, {
    Name: 'destination', Type: 'select', Placeholder: 'Select your destination', Label: 'Destination', Mandatory: '', Value: 'US', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: 'https://main--test-xwalk--jalagari.hlx.page/enquiry.json?sheet=country', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '',
  }, {
    Name: 'class', Type: 'select', Placeholder: 'Please Select', Label: 'Class of service', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: 'Economy, Business, First', OptionNames: 'Economy Class, Business Class, First Class', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '',
  }, {
    Name: 'budget', Type: 'number', Placeholder: '', Label: 'Room Budget', Mandatory: '', Value: '1000', Visible: '', Min: '500', Max: '10000', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '500', ReadOnly: '', Describe: '',
  }, {
    Name: 'amount', Type: 'number', Placeholder: '', Label: 'Estimated Trip Cost', Mandatory: '', Value: '3000', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '=G6*DAYS(G3,G2)', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: 'true', Describe: '',
  }, {
    Name: 'panel-1', Type: 'fieldset', Placeholder: '', Label: 'Traveler Info', Mandatory: '', Value: '', Visible: '', Min: '1', Max: '3', Fieldset: '', Repeatable: 'true', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '12', Checked: '', Step: '', ReadOnly: '', Describe: '',
  }, {
    Name: 'name', Type: 'text', Placeholder: '', Label: 'Name', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: 'panel-1', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '',
  }, {
    Name: 'age', Type: 'number', Placeholder: '', Label: 'Age', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: 'panel-1', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '6', Checked: '', Step: '', ReadOnly: '', Describe: '',
  }, {
    Name: 'subscribe', Type: 'checkbox', Placeholder: '', Label: 'Do you like subscribe for Magazine & Activities?', Mandatory: '', Value: 'true', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '', Checked: 'false', Step: '', ReadOnly: '', Describe: '',
  }, {
    Name: 'email', Type: 'email', Placeholder: '', Label: 'Email', Mandatory: '', Value: '', Visible: 'false', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '=R11=TRUE()', 'Column Span': '', Checked: '', Step: '', ReadOnly: '', Describe: '',
  }, {
    Name: 'submit', Type: 'submit', Placeholder: '', Label: 'Submit', Mandatory: '', Value: '', Visible: '', Min: '', Max: '', Fieldset: '', Repeatable: '', Options: '', OptionNames: '', 'Value Expression': '', 'Visible Expression': '', 'Column Span': '', Checked: '', Step: '', ReadOnly: '', Describe: '',
  }],
  ':type': 'sheet',
};
