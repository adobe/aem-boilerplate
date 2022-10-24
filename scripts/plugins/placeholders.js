import {
  toCamelCase,
} from '../lib-franklin.js';

let placeholders = {};

/**
 * Gets placeholders object
 * @param {string} prefix
 */
async function fetchPlaceholders(prefix = 'default') {
  const loaded = placeholders[`${prefix}-loaded`];
  if (!loaded) {
    placeholders[`${prefix}-loaded`] = new Promise((resolve, reject) => {
      try {
        fetch(`${prefix === 'default' ? '' : prefix}/placeholders.json`)
          .then((resp) => resp.json())
          .then((json) => {
            placeholders = json.data.reduce((results, placeholder) => {
              results[toCamelCase(placeholder.Key)] = placeholder.Text;
              return results;
            }, {});
            resolve(placeholders);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        // error loading placeholders
        placeholders[prefix] = {};
        reject();
      }
    });
  }
  await placeholders[`${prefix}-loaded`];
  return placeholders[prefix];
}

/**
 * Gets the list of placeholders.
 */
function getPlaceholders() {
  return placeholders;
}

/**
 * The plugin API
 */
export const api = {
  getPlaceholders,
};

/**
 * Logic to execute in the pre lazy phase
 */
export async function preLazy(options) {
  try {
    placeholders = await fetchPlaceholders(options.prefix);
  } catch (err) {
    placeholders = {};
  }
}
