/* eslint-disable import/no-unresolved */
import { ProgressSpinner, provider as UI } from '@dropins/tools/components.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import { ORDER_DETAILS_PATH, rootLink } from '../../scripts/commerce.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';
import createModal from '../modal/modal.js';

/**
 * Displays an overlay spinner in the specified container
 * @param {Object} loaderRef - Ref object to store the spinner component
 * @param {HTMLElement} $loader - DOM element to render the spinner in
 */
export const displayOverlaySpinner = async (loaderRef, $loader) => {
  if (loaderRef.current) return;

  loaderRef.current = await UI.render(ProgressSpinner, {
    className: '.checkout__overlay-spinner',
  })($loader);
};

/**
 * Removes the overlay spinner and cleans up references
 * @param {Object} loaderRef - Ref object containing the spinner component
 * @param {HTMLElement} $loader - DOM element containing the spinner
 */
export const removeOverlaySpinner = (loaderRef, $loader) => {
  if (!loaderRef.current) return;

  loaderRef.current.remove();
  loaderRef.current = null;
  $loader.innerHTML = '';
};

// Modal state management
let modal;

/**
 * Shows a modal with the specified content
 * @param {HTMLElement} content - DOM element to display in the modal
 */
export const showModal = async (content) => {
  modal = await createModal([content]);
  modal.showModal();
};

/**
 * Removes the currently displayed modal and cleans up references
 */
export const removeModal = () => {
  if (!modal) return;
  modal.removeModal();
  modal = null;
};

/**
 * Renders AEM asset images for gift option swatches
 * @param {Object} ctx - The context object containing imageSwatchContext and defaultImageProps
 */
export function swatchImageSlot(ctx) {
  const { imageSwatchContext, defaultImageProps } = ctx;
  tryRenderAemAssetsImage(ctx, {
    alias: imageSwatchContext.label,
    imageProps: defaultImageProps,
    wrapper: document.createElement('span'),
    params: {
      width: defaultImageProps.width,
      height: defaultImageProps.height,
    },
  });
}

/**
 * Builds the order details URL based on authentication status
 * @param {Object} orderData - Order data containing number and token
 * @param {string} orderDetailsPath - Path to the order details page
 * @returns {string} The constructed order details URL
 */
export function buildOrderDetailsUrl(orderData, orderDetailsPath = ORDER_DETAILS_PATH) {
  const token = getUserTokenCookie();
  const orderRef = token ? orderData.number : orderData.token;
  const orderNumber = orderData.number;
  const encodedOrderRef = encodeURIComponent(orderRef);
  const encodedOrderNumber = encodeURIComponent(orderNumber);

  return token
    ? rootLink(`${orderDetailsPath}?orderRef=${encodedOrderRef}`)
    : rootLink(`${orderDetailsPath}?orderRef=${encodedOrderRef}&orderNumber=${encodedOrderNumber}`);
}
