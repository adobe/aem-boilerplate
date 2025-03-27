/* eslint prefer-destructuring: 0 */
/* eslint no-plusplus: 0 */
import {
  doEquals,
  doNotEquals,
  doContains,
  getBlockConfig,
  lowercaseObj,
} from './listgroup-utilities.js';

async function getQueryIndex(url) {
  try {
    const response = await window.fetch(url);
    if (!response.ok) return null;
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed to get query index', { error });
  }
  return null;
}

function evaluateRule(page, rule) {
  const fieldName = rule.field.toLowerCase();
  const operator = rule.operator;
  const fieldValue = rule.value;

  switch (operator) {
    case 'equal':
      return !page[fieldName] ? false : doEquals(page[fieldName], fieldValue);
    case 'not_equal':
      return !page[fieldName] ? false : doNotEquals(page[fieldName], fieldValue);
    case 'contains':
      return doContains(page, rule);
    case 'not_contains':
      return doNotContains(page, rule);
    case 'is_null':
      return page[fieldName] === null;
    case 'is_not_null':
      return page[fieldName] !== null;
    case 'is_not_empty':
      return !page[fieldName] ? true : page[fieldName].length === 0;
    default:
      return false;
  }
}

function doAnd(page, filterRules) {
  console.log('in and');
  // assume multiple rules to do.
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
      console.log(`Running rule #${i}`);
      // eslint-disable-next-line no-use-before-define
      pageMatch = evaluateRule(page, currRule);
    }
  }
  return pageMatch;
}

function doOr(page, filterRules) {
  console.log('in or');
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
      console.log(`Running rule #${i}`);
      // eslint-disable-next-line no-use-before-define
      pageMatch = evaluateRule(page, currRule);
    }
  }
  return pageMatch;
}

function pageMatches(page, filterObj) {
  console.log(filterObj.condition);
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
  wrapper.classList = 'listOfItems';

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
  console.log(config);
  block.textContent = '';

  const indexUrl = config.indexUrl;
  console.log(indexUrl);
  const { data: allPages } = await getQueryIndex(indexUrl);
  console.log(allPages);

  const filterField = config.filter;
  const filterObj = JSON.parse(filterField);
  const lcFilter = lowercaseObj(filterObj);
  console.log(filterObj);

  const matching = [];
  allPages.forEach((page) => {
    const lcPage = lowercaseObj(page);
    if (pageMatches(lcPage, lcFilter)) {
      matching.push(page);
    }
  });
  console.log(matching);
  const wrapper = writeResults(matching, config);
  block.append(wrapper);
}
