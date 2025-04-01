/* eslint prefer-destructuring: 0 */
/**
 * Customized version of readBlockConfig from aem.js
 * Adds options for ordered and unordered lists and
 * preserves html elements if no match found.
 * @param {Element} block configuration table for a given block
 * @returns json object representing the block configuration
 */
function getBlockConfig(block) {
  const config = {};
  block.querySelectorAll(':scope > div').forEach((row) => {
    if (row.children) {
      const cols = [...row.children];
      if (cols[1]) {
        const col = cols[1];
        const name = cols[0].textContent;
        let value = '';
        if (col.querySelector('a')) {
          const as = [...col.querySelectorAll('a')];
          if (as.length === 1) {
            value = as[0].href;
          } else {
            value = as.map((a) => a.href);
          }
        } else if (col.querySelector('img')) {
          const imgs = [...col.querySelectorAll('img')];
          if (imgs.length === 1) {
            value = imgs[0].src;
          } else {
            value = imgs.map((img) => img.src);
          }
        } else if (col.querySelector('p')) {
          const ps = [...col.querySelectorAll('p')];
          if (ps.length === 1) {
            value = ps[0].textContent;
          } else {
            value = ps.map((p) => p.textContent);
          }
        } else if (col.querySelector('ul')) {
          const listItems = [...col.querySelectorAll('li')];
          value = listItems.map((item) => item.textContent);
        } else if (col.querySelector('ol')) {
          const listItems = [...col.querySelectorAll('li')];
          value = listItems.map((item) => item.textContent);
        } else value = row.children[1];
        config[name] = value;
      }
    }
  });
  return config;
}

/**
 * Given a json object, convert all the fields and values to lowercase.
 * @param {object} obj json object to transform
 * @returns transformed json object that is all lowercase
 */
function lowercaseObj(obj) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key.toLowerCase()] = obj[key];
  });
  return newObj;
}

/**
 * NOT CURRENTLY USED
 * Given 2 arrays, check if the first array contains the second array
 * Evaluates where all items of Array B are included in Array A.
 * @param {*} arrayA array of objects
 * @param {*} arrayB array of objects
 * @returns true if every item of Array B is in Array A, otherwise false.
 */
function arrayIncludesAllValues(arrayA, arrayB) {
  return arrayB.every((val) => arrayA.includes(val));
}

/**
 * NOT CURRENTLY USED
 * Given 2 arrays, check if the first array contains any items from the second array
 * Evaluates whether at least one item of Array B is included in Array A.
 * @param {*} arrayA array of objects
 * @param {*} arrayB array of objects
 * @returns true if at least one item of Array B is in Array A, otherwise false.
 */
function arrayIncludesSomeValues(filterValues, pageValues) {
  return pageValues.some((val) => filterValues.includes(val));
}

/**
 * Compare to string values to see if they are equal
 * @param {*} pageValue string value of page property to check
 * @param {*} searchValue expected value of page property
 * @returns true if the values match, case-insensitive. Otherwise false.
 */
function doEquals(pageValue, searchValue) {
  const lcPageValue = pageValue.toLowerCase();
  const lcSearchValue = searchValue.toLowerCase();
  return lcPageValue === lcSearchValue;
}

/**
 * Compare to string values to see if they are not equal
 * @param {*} pageValue string value of page property to check
 * @param {*} searchValue expected value of page property to not equal
 * @returns true if the values do not match, case-insensitive. Otherwise false.
 */
function doNotEquals(pageValue, searchValue) {
  return !doEquals(pageValue, searchValue);
}

/**
 * Check if string contains a different string.
 * @param {*} pageValue string value of page property to check
 * @param {*} searchValue substring to check for in pageValue
 * @returns true if the searchValue is in pageValue, case-insensitive. Otherwise false.
 */
function doContainsString(pageValue, searchValue) {
  const lcPageValue = pageValue.toLowerCase();
  const lcSearchValue = searchValue.toLowerCase();
  return lcPageValue.indexOf(lcSearchValue) > -1;
}

/**
 * Check if string does not contain a different string.
 * @param {*} pageValue string value of page property to check
 * @param {*} searchValue substring to check for in pageValue
 * @returns true if the searchValue is not in pageValue, case-insensitive. Otherwise false.
 */
function doNotContainsString(pageValue, searchValue) {
  const lcPageValue = pageValue.toLowerCase();
  const lcSearchValue = searchValue.toLowerCase();
  return lcPageValue.indexOf(lcSearchValue) === -1;
}

/**
 * NOT CURRENTLY USED.
 * Check if one or more values are found within an array.
 * The condObj may have a single value or a list of string values.
 * The pageObj could be a single value or an array of string values.
 * @param {obj} pageObj entire json object of the page
 * @param {obj} condObj object represent the search field and expected value(s)
 * @returns true if the pageObject contains all of the values in the condition
 * value. Otherwise false.
 */
function doContainsArray(pageObj, condObj) {
  let flag = true;
  const propertyName = condObj.field?.toLowerCase();
  const filterValue = condObj.value?.toLowerCase();
  const pageValue = pageObj[propertyName];
  try {
    // filterValue is an array
    if (filterValue.indexOf(',') > 0) {
      const filterValueArray = filterValue.split(',');
      const trimmedFilter = filterValueArray.map((str) => str.trim().toLowerCase());
      // filterValue is an array and pageValue is an array
      // in a comma-delimited filter value, the conditions should be OR.
      if (pageValue !== undefined && pageValue.indexOf(',') > -1) {
        const list = pageValue.split(',');
        const trimmedList = list.map((str) => str.trim().toLowerCase());
        if (!arrayIncludesAllValues(trimmedList, trimmedFilter)) {
          throw new Error('condition not met');
        }
      } else if (!trimmedFilter.includes(pageValue.toLowerCase())) {
        throw new Error('condition not met');
      }
    // filterValue is a single string but pageValue is array
    } else if (pageValue !== undefined && pageValue.indexOf(',') > -1) {
      const list = pageValue.split(',');
      const trimmedList = list.map((str) => str.trim().toLowerCase());
      if (!trimmedList.includes(filterValue)) {
        throw new Error('condition not met');
      }
    // both pageValue and filterValue are strings so test ===
    } else if (filterValue !== pageValue?.toLowerCase()) {
      throw new Error('condition not met');
    }
  } catch (e) {
    flag = false;
  }
  return flag;
}

/**
 * NOT CURRENTLY USED.
 * Check if one or more values are found within an array.
 * The condObj may have a single value or a list of string values.
 * The pageObj could be a single value or an array of string values.
 * @param {obj} pageObj entire json object of the page
 * @param {obj} condObj object represent the search field and expected value(s)
 * @returns true if the pageObject contains none of the values in the condition
 * value. Otherwise false.
 */
function doNotContainsArray(pageObj, condObj) {
  let flag = true;
  const propertyName = condObj.field?.toLowerCase();
  const filterValue = condObj.value.toLowerCase();
  const pageValue = pageObj[propertyName];
  try {
    // filterValue is an array
    if (filterValue.indexOf(',') > 0) {
      const filterValueArray = filterValue.split(',');
      const trimmedFilter = filterValueArray.map((str) => str.trim().toLowerCase());
      // filterValue is an array and pageValue is an array
      // in a comma-delimited filter value, the conditions should be OR.
      if (pageValue !== undefined && pageValue.indexOf(',') > -1) {
        const list = pageValue.split(',');
        const trimmedList = list.map((str) => str.trim().toLowerCase());
        if (arrayIncludesSomeValues(trimmedList, trimmedFilter)) {
          throw new Error('condition not met');
        }
      } else if (trimmedFilter.includes(pageValue.toLowerCase())) {
        throw new Error('condition not met');
      }
    // filterValue is a single string but pageValue is array
    } else if (pageValue !== undefined && pageValue.indexOf(',') > -1) {
      const list = pageValue.split(',');
      const trimmedList = list.map((str) => str.trim().toLowerCase());
      if (trimmedList.includes(filterValue)) {
        throw new Error('condition not met');
      }
    // both pageValue and filterValue are strings so test ===
    } else if (filterValue === pageValue?.toLowerCase()) {
      throw new Error('condition not met');
    }
  } catch (e) {
    flag = false;
  }
  return flag;
}

/**
 * Check if a page's date is before a provided date.
 * @param {string} pageValue string value of a date property from a page
 * @param {string} searchValue string value of a date property to compare against
 * @returns true if the pageValue date comes before the searchValue Date. Otherwise false.
 */
function doDateBefore(pageValue, searchValue) {
  const datePageValue = Date.parse(pageValue);
  const dateSearchValue = Date.parse(searchValue);
  return datePageValue < dateSearchValue;
}

/**
 * Check if a page's date is after a provided date.
 * @param {string} pageValue string value of a date property from a page
 * @param {string} searchValue string value of a date property to compare against
 * @returns true if the pageValue date comes after the searchValue Date. Otherwise false.
 */
function doDateAfter(pageValue, searchValue) {
  const datePageValue = Date.parse(pageValue);
  const dateSearchValue = Date.parse(searchValue);
  return datePageValue > dateSearchValue;
}

/**
 * Check if a page's date is equal to a provided date.
 * @param {string} pageValue string value of a date property from a page
 * @param {string} searchValue string value of a date property to compare against
 * @returns true if the pageValue date equals the searchValue Date
 */
function doDateEquals(pageValue, searchValue) {
  const datePageValue = Date.parse(pageValue);
  const dateSearchValue = Date.parse(searchValue);
  return datePageValue === dateSearchValue;
}

/**
 * Given a list of pages, sort them. Use the sortBy property
 * to determine which property to compare. By default, the order is
 * ascending. If the sortOrder property is not null and is descending, then
 * reverse the order.
 * Right now, only can sort by title or releasedate. This is customizable.
 * @param {*} pageList list of page objects
 * @param {*} sortBy property to sort the list by
 * @param {*} sortOrder descending or null (ascending)
 * @returns sorted list of page objects
 */
function sortPageList(pageList, sortBy, sortOrder) {
  const sortedList = pageList;
  switch (sortBy) {
    case 'title':
      sortedList.sort((a, b) => {
        if (sortOrder !== undefined && sortOrder === 'descending') {
          return (a.title < b.title ? 1 : -1);
        }
        return (a.title < b.title ? -1 : 1);
      });
      break;
    case 'releasedate':
      sortedList.sort((a, b) => {
        if (sortOrder !== undefined && sortOrder === 'descending') {
          return ((new Date(a.releaseDate) - new Date(b.releaseDate)) < 0
            ? 1 : -1);
        }
        return ((new Date(a.releaseDate) - new Date(b.releaseDate)) < 0
          ? -1 : 1);
      });
      break;
    default:
      sortedList.sort((a, b) => {
        if (sortOrder !== undefined && sortOrder === 'descending') {
          return (a[sortBy]).localeCompare(b[sortBy], undefined, { numeric: true }) * -1;
        }
        return (a[sortBy]).localeCompare(b[sortBy], undefined, { numeric: true });
      });
  }
  return sortedList;
}

export {
  doContainsArray,
  doNotContainsArray,
  doContainsString,
  doNotContainsString,
  doEquals,
  doNotEquals,
  doDateBefore,
  doDateAfter,
  doDateEquals,
  getBlockConfig,
  lowercaseObj,
  sortPageList,
};
