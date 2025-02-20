/* eslint-disable import/no-cycle */
import { getSignInToken, performMonolithGraphQLQuery } from '../commerce.js';

const trackViewedProductMutation = `
mutation trackViewedProduct($sku: String!) {
  trackViewedProduct(sku: $sku)
}
`;

/**
 * Track a product was viewed
 * @param sku SKU of the product viewed
 * @returns {Promise<void>}
 */
export default async function trackViewedProduct(sku) {
  const token = getSignInToken();

  return performMonolithGraphQLQuery(
    trackViewedProductMutation,
    { sku },
    false,
    token,
  );
}
