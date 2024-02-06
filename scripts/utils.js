/**
 * Returns the true origin of the current page in the browser.
 * If the page is running in a iframe with srcdoc, the ancestor origin is returned.
 * @returns {String} The true origin
 */
export function getOrigin() {
    return window.location.href === 'about:srcdoc' ? window.parent.location.origin : window.location.origin;
}

/**
* Add a listener for clicks outside an element, and execute the callback when they happen.
* useful for closing menus when they are clicked outside of.
* @param {Element} elem the element
* @param {function} callback the callback function
*/
export function addOutsideClickListener(elem, callback) {
    let outsideClickListener;
    const removeClickListener = (() => {
        document.removeEventListener('click', outsideClickListener);
    });
    outsideClickListener = ((event) => {
        if (!elem.contains(event.target)) {
            callback();
            removeClickListener();
        }
    });
    document.addEventListener('click', outsideClickListener);
}

export const PRODUCTION_DOMAINS = ['www.mysite.com'];

/**
 * 
 * @param {string | URL} url the url to check
 * @returns an object containing properties indicating the type domain of the url addresses
 */
export function checkDomain(url) {
    const urlToCheck = typeof url === 'string' ? new URL(url) : url;
  
    const isProd = PRODUCTION_DOMAINS.some((host) => urlToCheck.hostname.includes(host));
    const isHlx = ['hlx.page', 'hlx.live', 'aem.page', 'aem.live'].some((host) => urlToCheck.hostname.includes(host));
    const isLocal = urlToCheck.hostname.includes('localhost');
    const isPreview = isLocal || urlToCheck.hostname.includes('hlx.page') || urlToCheck.hostname.includes('aem.page');
    const isKnown = isProd || isHlx || isLocal;
    const isExternal = !isKnown;
    return {
      isProd,
      isHlx,
      isLocal,
      isKnown,
      isExternal,
      isPreview,
    };
  }
  
  let browserDomainCheck;
  /**
   * A convenienve wrapper around `checkDomain` for the current browser url
   * @returns n object containing properties indicating the type domain of the current url addresses
   */
  export function checkBrowserDomain() {
    if (!browserDomainCheck) {
      browserDomainCheck = checkDomain(window.location);
    }
    return browserDomainCheck;
  }