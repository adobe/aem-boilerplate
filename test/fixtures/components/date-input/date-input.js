import { formatDate } from '../../../../blocks/form/rules/model/afb-formatters.min.js';

export const fieldDef = {
  items: [{
    id: 'datepicker-6dd0c75352',
    fieldType: 'date-input',
    name: 'dob',
    visible: true,
    type: 'string',
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
    format: 'date',
  },
  ],
};

const { locale } = new Intl.DateTimeFormat().resolvedOptions();
const today = formatDate(new Date(), locale, 'short');

export const markUp = `
<div class="date-wrapper field-dob field-wrapper" data-id="datepicker-6dd0c75352" data-description="To enter today's date use ${today}" data-required="false">
<label for="datepicker-6dd0c75352" class="field-label">Date Of Birth</label>
<input type="text" placeholder="2000-02-13" id="datepicker-6dd0c75352" name="dob" edit-value="" display-value="" autocomplete="off" aria-describedby="datepicker-6dd0c75352-description">
<div class="field-description" aria-live="polite" id="datepicker-6dd0c75352-description">To enter today's date use ${today}</div>
</div>`.replace(/\n/g, '');
