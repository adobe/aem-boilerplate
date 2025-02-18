import { fetchGraphQl, setFetchGraphQlHeader } from '@dropins/tools/fetch-graphql.js';
import { getHeaders } from '../../scripts/configs.js';

const addCartHeaders = async () => {
  const cartHeaders = await getHeaders('cart');
  Object.keys(cartHeaders).forEach((key) => {
    if (cartHeaders[key] !== undefined) {
      setFetchGraphQlHeader(key, cartHeaders[key]);
    }
  });
};

const getCustomerGroups = async () => {
  try {
    addCartHeaders();
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
    return response.data?.customerGroup;
  } catch (error) {
    console.error('Could not retrieve customer groups', error);
  }
  return [];
};

const getCustomerSegments = async () => {
  try {
    addCartHeaders();
    const response = await fetchGraphQl(
      `query {
          customer {
            segments {
              name
            }
          }
        }
      `,
      {
        method: 'GET',
      },
    );
    return response.data?.customer?.segments || [];
  } catch (error) {
    console.error('Could not retrieve customer segments', error);
  }
  return [];
};

const getCartRules = async (cartId) => {
  try {
    addCartHeaders();
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
    addCartHeaders();
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

export {
  getCustomerGroups,
  getCustomerSegments,
  getCartRules,
  getCatalogPriceRules,
};
