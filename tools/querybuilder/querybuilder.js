/* eslint no-undef: 0 */
/* eslint no-plusplus: 0 */
// eslint-disable-next-line import/no-unresolved
import DA_SDK from 'https://da.live/nx/utils/sdk.js';
import {
  getQueryIndex,
} from '../../scripts/utilities.js';

const datePropertiesEnum = {
  RELEASE_DATE: 'releasedate',
};

function getPropertyType(propName) {
  if (Object.values(datePropertiesEnum).includes(propName.toLowerCase())) {
    return 'date';
  }
  return 'string';
}

export async function getProperties() {
  const indexUrl = '/tools/querybuilder/sample-index.json';
  const { columns: properties } = await getQueryIndex(indexUrl);
  return properties;
}

async function buildFilters() {
  const properties = await getProperties();
  const filters = [];
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    const propType = getPropertyType(prop);
    console.log(propType);
    const propFilter = {
      id: `${prop}`,
      label: `${prop}`,
      type: `${propType !== 'date' ? 'string' : propType}`,
    };
    if (propType === 'date') {
      propFilter.operators = [
        { type: 'equal', optgroup: 'basic' },
        { type: 'not_equal', optgroup: 'basic' },
        { type: 'between', optgroup: 'basic'},
      ]
    } else {
      propFilter.operators = ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null'];
    }
    filters.push(propFilter);
  }
  return filters;
}

export function addForm(searchFilters) {
  $('#builder-basic').queryBuilder({
    plugins: ['bt-tooltip-errors'],
    filters: searchFilters,
  });
}

function initControls(actions) {
  $('#btn-reset').on('click', (e) => {
    e.preventDefault();
    $('#builder-basic').queryBuilder('reset');
  });

  $('#btn-get').on('click', (e) => {
    e.preventDefault();
    const result = $('#builder-basic').queryBuilder('getRules');
    console.log(result);

    if (!$.isEmptyObject(result)) {
      actions.sendText(JSON.stringify(result, null, 2));
      actions.closeLibrary();
    }
  });
}

(async function init() {
  const { actions } = await DA_SDK;

  const searchFilters = await buildFilters();
  addForm(searchFilters);
  initControls(actions);
}());
