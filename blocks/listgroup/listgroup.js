/* eslint prefer-destructuring: 0 */
/* eslint no-plusplus: 0 */
import {
  doEquals,
  doNotEquals,
  getBlockConfig,
  lowercaseObj,
  doContainsString,
  doNotContainsString,
  doDateBefore,
  doDateAfter,
  doDateEquals,
  sortPageList,
} from './listgroup-utilities.js';

import {
  getQueryIndex
} from '../../scripts/utilities.js';

function evaluateRule(page, rule) {
  const fieldName = rule.field.toLowerCase();
  const operator = rule.operator;
  const fieldValue = rule.value;

  switch (operator) {
    case 'equal':
      if (!page[fieldName] && rule.type === 'date') {
        return doDateEquals(page[fieldName], fieldValue);
      }
      return !page[fieldName] ? false : doEquals(page[fieldName], fieldValue);
    case 'not_equal':
      return !page[fieldName] ? false : doNotEquals(page[fieldName], fieldValue);
    case 'contains':
      return doContainsString(page[fieldName], fieldValue);
    case 'not_contains':
      return doNotContainsString(page[fieldName], fieldValue);
    case 'is_null':
      return page[fieldName] === null;
    case 'is_not_null':
      return page[fieldName] !== null;
    case 'is_not_empty':
      return !page[fieldName] ? true : page[fieldName].length === 0;
    case 'before':
      return doDateBefore(page[fieldName], fieldValue);
    case 'after':
      return doDateAfter(page[fieldName], fieldValue);
    default:
      return false;
  }
}

function doAnd(page, filterRules) {
  let pageMatch = true;
  for (let i = 0; i < filterRules.length; i++) {
    if (!pageMatch) {
      break;
    }
    const currRule = filterRules[i];
    if (currRule.condition) {
      // eslint-disable-next-line no-use-before-define
      pageMatch = pageMatches(page, currRule);
    } else {
      console.debug(`Running rule #${i}`);
      // eslint-disable-next-line no-use-before-define
      pageMatch = evaluateRule(page, currRule);
    }
  }
  return pageMatch;
}

function doOr(page, filterRules) {
  let pageMatch = false;
  for (let i = 0; i < filterRules.length; i++) {
    if (pageMatch) {
      break;
    }
    const currRule = filterRules[i];
    if (currRule.condition) {
      // eslint-disable-next-line no-use-before-define
      pageMatch = pageMatches(page, currRule);
    } else {
      console.debug(`Running rule #${i}`);
      // eslint-disable-next-line no-use-before-define
      pageMatch = evaluateRule(page, currRule);
    }
  }
  return pageMatch;
}

function pageMatches(page, filterObj) {
  if (filterObj.condition) {
    if (filterObj.condition === 'AND') {
      return doAnd(page, filterObj.rules);
    }
    return doOr(page, filterObj.rules);
  }
  return null;
}

function writeResults(matching, config) {
  const wrapper = document.createElement('ul');
  wrapper.classList = 'list-of-items';

  matching?.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList = `${item.resourceOptions}`;
    const cardLink = document.createElement('a');
    if (item.redirectTarget?.length > 0) {
      cardLink.href = item.redirectTarget;
      cardLink.target = '_blank';
    } else {
      cardLink.href = item.path;
      cardLink.target = '_self';
    }

    const htmlOutput = [];

    config.displayProperties.forEach((prop) => {
      let span;
      if (prop === 'image' && item[prop]) {
        span = `<span class="image"><img src="${item[prop]}"/></span>`;
      } else {
        span = `<span class="${prop}">${item[prop]}</span>`;
      }
      htmlOutput.push(span);
    });
    cardLink.innerHTML = htmlOutput.join('');

    listItem.append(cardLink);
    wrapper.append(listItem);
  });

  return wrapper;
}

export default async function decorate(block) {
  const config = getBlockConfig(block);
  block.textContent = '';

  const indexUrl = config.indexUrl;
  const { data: allPages } = await getQueryIndex(indexUrl);

  const filterField = config.filter;
  const filterObj = JSON.parse(filterField);
  const lcFilter = lowercaseObj(filterObj);

  const matching = [];
  allPages.forEach((page) => {
    const lcPage = lowercaseObj(page);
    if (pageMatches(lcPage, lcFilter)) {
      matching.push(page);
    }
  });

  let adjustedList = matching;
  // Sort List
  const sortBy = config.sortBy;
  const sortOrder = config.sortOrder;
  if (sortBy) {
    adjustedList = sortPageList(adjustedList, sortBy, sortOrder);
  }

  const wrapper = writeResults(adjustedList, config);
  block.append(wrapper);
}
