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

export {
  getBlockConfig,
  lowercaseObj,
};
