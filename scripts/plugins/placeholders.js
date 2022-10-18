let placeholders = {};

/**
 * Gets placeholders object
 * @param {string} prefix
 */
async function fetchPlaceholders(prefix = 'default') {
  const placeholders = {};
  const loaded = placeholders[`${prefix}-loaded`];
  if (!loaded) {
    placeholders[`${prefix}-loaded`] = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${prefix === 'default' ? '' : prefix}/placeholders.json`);
        if (!response.ok) {
          reject();
        }
        const json = await resp.json();
        placeholders = json.data.reduce((results, placeholder) => {
          results[toCamelCase(placeholder.Key)] = placeholder.Text;
          return results;
        }, {});
        resolve(placeholders);
      } catch (error) {
        reject();
      }
    });
  }
  await placeholders[`${prefix}-loaded`];
  return placeholders[prefix];
}

function getPlaceholders() {
  return placeholders;
}

export const api = {
  getPlaceholders
}

export async function withLazy(document, options) {
  try {
    placeholders = await fetchPlaceholders(options.prefix);
  } catch (err) {
    placeholders = {};
  }
}
