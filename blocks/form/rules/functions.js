import { getSubmitBaseUrl } from '../constant.js';

/**
 * Converts a JSON string to an object.
 * @param {string} str - The JSON string to convert to an object.
 * @returns {object} - The parsed JSON object. Returns an empty object if an exception occurs.
 */
export function toObject(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}

/**
 * Prefixes the URL with the context path.
 * @param {string} url - The URL to externalize.
 * @returns {string} - The externalized URL.
 */
export function externalize(url) {
  const submitBaseUrl = getSubmitBaseUrl();
  if (submitBaseUrl) {
    return `${submitBaseUrl}${url}`;
  }
  return url;
}

/**
 * Validates if the given URL is correct.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
function validateURL(url) {
  try {
    const validatedUrl = new URL(url, window.location.href);
    return (validatedUrl.protocol === 'http:' || validatedUrl.protocol === 'https:');
  } catch (err) {
    return false;
  }
}

/**
 * Navigates to the specified URL.
 * @param {string} destinationURL - The URL to navigate to. If not specified,
 * a new blank window will be opened.
 * @param {string} destinationType - The type of destination. Supports the following
 * values: "_newwindow", "_blank", "_parent", "_self", "_top", or the name of the window.
 * @returns {Window} - The newly opened window.
 */
export function navigateTo(destinationURL, destinationType) {
  let param = null;
  const windowParam = window;
  let arg = null;
  // eslint-disable-next-line default-case
  switch (destinationType) {
    case '_newwindow':
      param = '_blank';
      arg = 'width=1000,height=800';
      break;
  }
  if (!param) {
    if (destinationType) {
      param = destinationType;
    } else {
      param = '_blank';
    }
  }
  if (validateURL(destinationURL)) {
    windowParam.open(externalize(destinationURL), param, arg);
  }
}

/**
 * Default error handler for the invoke service API in AEM Forms.
 * @param {object} response - The response body of the invoke service API.
 * @param {object} headers - The response headers of the invoke service API.
 * @param {object} globals - An object containing form instance and invoke method
 * to call other custom functions.
 * @returns {void}
 */
export function defaultErrorHandler(response, headers, globals) {
  if (response && response.validationErrors) {
    response.validationErrors?.forEach((violation) => {
      if (violation.details) {
        if (violation.fieldName) {
          globals.form.visit((f) => {
            if (f.qualifiedName === violation.fieldName) {
              f.markAsInvalid(violation.details.join('\n'));
            }
          });
        } else if (violation.dataRef) {
          globals.form.visit((f) => {
            if (f.dataRef === violation.dataRef) {
              f.markAsInvalid(violation.details.join('\n'));
            }
          });
        }
      }
    });
  }
}
