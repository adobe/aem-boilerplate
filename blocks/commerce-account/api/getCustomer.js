import { getConfigValue, getCookie } from '../../../scripts/configs.js';

const getCustomer = async () => {
  const query = `
    {
      customer {
        firstname
        lastname
        email
        is_subscribed
        wishlist {
          id
          items_count
          sharing_code
          updated_at
          items {
            id
            qty
            description
            added_at
            product {
              id
              sku
              name
              url_key
              price {
                regularPrice {
                    amount {
                        currency
                        value
                    }
                }
            }
            image {
              url
              label
             }
            }
          }
        }
        addresses {
          firstname
          lastname
          city
          company
          country_code
          region{
            region
            region_code
            region_id
          }
          region_id
          telephone
          id
          vat_id
          postcode
          street
          default_shipping
          default_billing
        }
        orders {
          page_info {
            current_page
            page_size
            total_pages
          }
          items {
            id
            status
            order_date
            number
            shipping_method
            payment_methods {
              type
              name
            }
            billing_address {
              firstname
              lastname
              city
              country_code
              region
              telephone
              postcode
              telephone
              street
            }
            shipping_address {
              region
              firstname
              lastname
              city
              country_code
              region_id
              telephone
              postcode
              street
            }
            items {
              product_name
              product_type
              product_url_key
              id
              quantity_invoiced
              quantity_canceled
              quantity_ordered
              quantity_refunded
              quantity_returned
              quantity_shipped
              status
              product_sku
              product_sale_price {
                currency
                value
              }
            }
          }
        }
      }
    }
`;

  const token = getCookie('auth_dropin_user_token');

  try {
    const response = await fetch(await getConfigValue('commerce-core-endpoint'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    return await response.json();
  } catch (error) {
    return null;
  }
};

export default getCustomer;
