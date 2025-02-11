import { fetchGraphQl } from '@dropins/tools/fetch-graphql.js';

export const getActiveRules = async (cartId) => {
  try {
    const response = await fetchGraphQl(
      `query CUSTOMER_SEGMENTS($cartId: String!){
          customerSegments(cartId: $cartId) {
            name
          }
          customerGroup {
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
    return response.data;
  } catch (error) {
    console.error('Could not retrieve customer segments', error);
  }
  return [];
};

export const getCatalogPriceRules = async (sku) => {
  try {
    const query = `query CATALOG_PRICE_RULES($sku: String!) {
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
    const response = await fetchGraphQl(
      query,
      {
        method: 'GET',
        variables: { sku },
      },
    );
    return response.data?.products?.items[0];
  } catch (error) {
    console.error(`Could not retrieve catalog rules for ${sku}`, error);
  }
  return [];
};
