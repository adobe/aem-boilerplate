/* eslint prefer-destructuring: 0 */
/**
 * Customized version of readBlockConfig from aem.js
 * Adds options for ordered and unordered lists and
 * preserves html elements if no match found.
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

function lowercaseObj(obj) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key.toLowerCase()] = obj[key];
  });
  return newObj;
}

/*
 * Check if an array includes all values of another array
Are all of the values in Array B included in Array A?
Is B contained within A?
 */
function arrayIncludesAllValues(arrayA, arrayB) {
  return arrayB.every((val) => arrayA.includes(val));
}

/*
 * Check if an array contains any of the values of another array.
 */
function arrayIncludesSomeValues(filterValues, pageValues) {
  return pageValues.some((val) => filterValues.includes(val));
}

function doEquals(pageValue, searchValue) {
  const lcPageValue = pageValue.toLowerCase();
  const lcSearchValue = searchValue.toLowerCase();
  return lcPageValue === lcSearchValue;
}

function doNotEquals(pageValue, searchValue) {
  const lcPageValue = pageValue.toLowerCase();
  const lcSearchValue = searchValue.toLowerCase();
  return lcPageValue !== lcSearchValue;
}

function doContainsString(pageValue, searchValue) {
  const lcPageValue = pageValue.toLowerCase();
  const lcSearchValue = searchValue.toLowerCase();
  return lcPageValue.indexOf(lcSearchValue) > -1;
}

function doNotContainsString(pageValue, searchValue) {
  const lcPageValue = pageValue.toLowerCase();
  const lcSearchValue = searchValue.toLowerCase();
  return lcPageValue.indexOf(lcSearchValue) === -1;
}

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

function doDateBefore(pageValue, searchValue) {
  const datePageValue = Date.parse(pageValue);
  const dateSearchValue = Date.parse(searchValue);
  return datePageValue < dateSearchValue;
}

function doDateAfter(pageValue, searchValue) {
  const datePageValue = Date.parse(pageValue);
  const dateSearchValue = Date.parse(searchValue);
  return datePageValue > dateSearchValue;
}

function doDateEquals(pageValue, searchValue) {
  const datePageValue = Date.parse(pageValue);
  const dateSearchValue = Date.parse(searchValue);
  return datePageValue === dateSearchValue;
}

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
