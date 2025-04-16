import { events } from '@dropins/tools/event-bus.js';
import * as Cart from '@dropins/storefront-cart/api.js';
import { fetchGraphQl, setFetchGraphQlHeader } from '@dropins/tools/fetch-graphql.js';
import { getHeaders } from '../../configs.js';
import { getUserTokenCookie } from '../../initializers/index.js';

const addCartHeaders = async () => {
  const cartHeaders = getHeaders('cart');
  Object.keys(cartHeaders).forEach((key) => {
    if (cartHeaders[key] !== undefined) {
      setFetchGraphQlHeader(key, cartHeaders[key]);
    }
  });
};

const getCustomerGroups = async () => {
  try {
    await addCartHeaders();
    const response = await fetchGraphQl(
      `query {
          customerGroup {
            name
          }
        }
      `,
      {
        method: 'GET',
      },
    );
    return response.data?.customerGroup?.name;
  } catch (error) {
    console.error('Could not retrieve customer groups', error);
  }
  return [];
};

const getCustomerSegments = async () => {
  try {
    await addCartHeaders();
    const response = await fetchGraphQl(
      `query {
          customer {
            segments {
              name
            }
          }
          customerGroup {
            name
          }
        }
      `,
      {
        method: 'GET',
      },
    );
    return response.data || [];
  } catch (error) {
    console.error('Could not retrieve customer segments', error);
  }
  return [];
};

const getCartRules = async (cartId) => {
  try {
    await addCartHeaders();
    const response = await fetchGraphQl(
      `query TB_GET_CUSTOMER_SEGMENTS_CART_RULES($cartId: String!){
          customerSegments(cartId: $cartId) {
            name
          }
          cart(cart_id: $cartId) {
            rules {
              name
            }
          }
          customerGroup {
            name
          }
        }
      `,
      {
        method: 'GET',
        variables: { cartId },
      },
    );
    return response.data || [];
  } catch (error) {
    console.error('Could not retrieve customer cart rules', error);
  }
  return [];
};

const getCatalogPriceRules = async (sku) => {
  try {
    const query = `query TB_GET_CATALOG_PRICE_RULES($sku: String!) {
          products(filter: {
            sku: {
              eq: $sku
            }
          })
          {
            items {
              rules {
                name
              }
            }
          }
        }
      `;
    await addCartHeaders();
    const response = await fetchGraphQl(
      query,
      {
        method: 'GET',
        variables: { sku },
      },
    );
    return response.data?.products?.items[0];
  } catch (error) {
    console.error(`Could not retrieve catalog price rules for ${sku}`, error);
  }
  return [];
};

const getActiveRules = async () => {
  const activeRules = {
    customerSegments: [],
    customerGroup: null,
    cart: [],
    catalogPriceRules: [],
  };

  // Cart initialised
  if (Cart.getCartDataFromCache() !== null) {
    const cartId = Cart.getCartDataFromCache().id || null;
    if (cartId) {
      const response = await getCartRules(cartId);
      activeRules.cart = response.cart?.rules || [];
      activeRules.customerGroup = response.customerGroup?.name || '';
      activeRules.customerSegments = response.customerSegments || [];
    }
  }

  // Cart not initialised, but Authenticated user
  if (Cart.getCartDataFromCache() === null && getUserTokenCookie()) {
    const response = await getCustomerSegments();
    activeRules.customerGroup = response.customerGroup?.name || '';
    activeRules.customerSegments = response.customer?.segments || [];
  }

  // Cart not initialized AND user is not Authenticated
  if (Cart.getCartDataFromCache() === null && !getUserTokenCookie()) {
    activeRules.customerGroup = await getCustomerGroups();
  }

  // eslint-disable-next-line no-underscore-dangle
  const productData = events._lastEvent?.['pdp/data']?.payload ?? null;
  if (productData?.sku) {
    activeRules.catalogPriceRules = await getCatalogPriceRules(productData.sku);
  }

  return activeRules;
};

export {
  getActiveRules,
  getCustomerGroups,
  getCustomerSegments,
  getCartRules,
  getCatalogPriceRules,
};
