import { fetchPlaceholders } from './placeholders.js';

export const PATH_PREFIX = '/language-masters';
export const SUPPORTED_LANGUAGES = ['en'];
export const INTERNAL_PAGES = ['/footer', '/nav', '/fragments', '/data', '/drafts'];
let lang;

export function isAuthorEnvironment() {
  if (window?.location?.origin?.includes('author')) {
    return true;
  }
  return false;
}

/**
 * Extracts the site name from the current URL pathname
 * @description Extracts the site name from paths following the pattern /content/site-name/...
 * For example:
 * @returns {string} The site name extracted from the path, or empty string if not found
 */
export async function getSiteName() {
  try {
    if (isAuthorEnvironment()) {
      // Fallback to extracting from pathname
      const { pathname } = window.location;
      const siteNameFromPath = pathname.split('/content/')[1]?.split('/')[0] || '';
      return siteNameFromPath;
    }
    const listOfAllPlaceholdersData = await fetchPlaceholders();
    const siteName = listOfAllPlaceholdersData?.siteName;
    if (siteName) {
      return siteName;
    }
    return '';
  } catch (error) {
    console.warn('Error fetching placeholders for siteName:', error);
    return '';
  }
}

/**
 * Get Inherited Page Properties
 * Considers pathnames like /en/path/to/content and
 */
export function getInheritedPageProperties() {
  const { pathname } = window.location;
  const isContentPath = pathname.startsWith('/content');
  const parts = pathname.split('/');
  const safeLangGet = (index) => (parts.length > index ? parts[index] : 'en');
  /* 5 is the index of the language in the path for AEM content paths like
     2 is the index of the language in the path for EDS paths like /en/path/to/content
    */

  let langCode = isContentPath ? safeLangGet(3) : safeLangGet(0);

  // remove suffix from lang if any
  if (langCode.indexOf('.') > -1) {
    langCode = langCode.substring(0, langCode.indexOf('.'));
  }

  if (!langCode) langCode = 'en'; // default to en
  // substring before lang
  const prefix = pathname.substring(0, pathname.indexOf(`/${langCode}`)) || '';
  const suffix = pathname.substring(pathname.indexOf(`/${langCode}`) + langCode.length + 1) || '';
  return {
    prefix,
    suffix,
    langCode,
    isContentPath,
  };
}

/**
 * Process current pathname and return details for use in language switching
 * Considers pathnames like /en/path/to/content and
 */
export function getPathDetails() {
  const { pathname } = window.location;
  const isContentPath = pathname.startsWith('/content');
  const parts = pathname.split('/');
  const safeLangGet = (index) => (parts.length > index ? parts[index] : 'en');
  /* 5 is the index of the language in the path for AEM content paths like
     2 is the index of the language in the path for EDS paths like /en/path/to/content
    */
  let langCode = isContentPath ? safeLangGet(3) : safeLangGet(0);
  // remove suffix from lang if any
  if (langCode.indexOf('.') > -1) {
    langCode = langCode.substring(0, langCode.indexOf('.'));
  }
  if (!langCode) langCode = 'en'; // default to en
  // substring before lang
  const prefix = pathname.substring(0, pathname.indexOf(`/${langCode}`)) || '';
  const suffix = pathname.substring(pathname.indexOf(`/${langCode}`) + langCode.length + 1) || '';
  return {
    prefix,
    suffix,
    langCode,
    isContentPath,
  };
}

/**
 * Fetch and return language of current page.
 * @returns language of current page
 */
export function getLanguage() {
  if (!lang) {
    lang = getPathDetails().langCode;
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      lang = 'en';
    }
  }
  return lang;
}

export function setPageLanguage() {
  const currentLang = getLanguage();
  document.documentElement.lang = currentLang;
}

export function formatDate(dObjStr) {
  if (dObjStr) {
    const dObj = new Date(dObjStr);
    const yyyy = dObj.getFullYear();
    let mm = dObj.getMonth() + 1;
    let dd = dObj.getDate();

    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;

    const formatted = `${mm}-${dd}-${yyyy}`;
    return formatted;
  }
  return '';
}

/**
 *
 * Helper function to create a <source> element
 *
 * @returns imageSource
 */
export function createSource(src, width, mediaQuery) {
  const { pathname } = new URL(src, window.location.href);
  const source = document.createElement('source');
  source.type = 'image/webp';
  source.srcset = `${pathname}?width=${width}&format=webply&optimize=medium`;
  source.media = mediaQuery;

  return source;
}

/**
 * Return the placeholder file specific to language
 * @returns
 */
export async function fetchLanguageNavigation(langCode) {
  window.navigationData = window.navigationData || {};

  if (!window.navigationData[langCode]) {
    window.navigationData[langCode] = new Promise((resolve) => {
      fetch(`${PATH_PREFIX}${langCode}/navigation.json`)
        .then((resp) => (resp.ok ? resp.json() : {}))
        .then((json) => {
          window.navigationData[langCode] = json.data;
          resolve(window.navigationData[langCode]);
        })
        .catch(() => {
          window.navigationData[langCode] = {};
          resolve(window.navigationData[langCode]);
        });
    });
  }
  await window.navigationData[langCode];
}

export async function fetchData(url, method = 'GET', headers = {}, body = null) {
  try {
    const options = { method, headers: { ...headers } };
    if (method === 'POST' && body) { options.headers['Content-Type'] = 'application/json'; options.body = JSON.stringify(body); }
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
}

/**
 * Returns the true of the current page in the browser.
 * If the page is running in a iframe with srcdoc,
 * the ancestor origin + the path query param is returned.
 * @returns {String} The href of the current page or the href of the block running in the library
 */
export function getHref() {
  if (window.location.href !== 'about:srcdoc') return window.location.href;

  const urlParams = new URLSearchParams(window.parent.location.search);
  return `${window.parent.location.origin}${urlParams.get('path')}`;
}

/**
 * Check if a page is internal or not
 */
export function isInternalPage() {
  const pageUrl = getHref();
  // eslint-disable-next-line consistent-return
  INTERNAL_PAGES.forEach((element) => { if (pageUrl.indexOf(element) > 0) return true; });
  return false;
}

/**
 * Get the query string value
 * @param {*} key
 * @returns
 */
export function getQueryString(key = 'tip', path = window.location.href) {
  const pageUrl = new URL(path);
  return pageUrl.searchParams.get(key);
}

/**
 * Process Dynamic media image to append query param
 * @param {*} pictureElement
 * @param {*} qParam
 */
export function dynamicMediaAssetProcess(pictureElement, qParam) {
  const queryParams = qParam.textContent.trim();
  if (queryParams.length > 0) {
    Array.from(pictureElement.children).forEach((child) => {
      const baseUrl = child.tagName === 'SOURCE' ? child.srcset.split('?')[0] : child.src.split('?')[0];
      if (child.tagName === 'SOURCE' && child.srcset) {
        child.srcset = `${baseUrl}?${queryParams}`;
      } else if (child.tagName === 'IMG' && child.src) {
        child.src = `${baseUrl}?${queryParams}`;
      }
    });
  }
}
