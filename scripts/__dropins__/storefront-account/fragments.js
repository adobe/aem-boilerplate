/*! Copyright 2026 Adobe
All Rights Reserved. */
const e=`
  fragment BASIC_CUSTOMER_INFO_FRAGMENT on Customer {
    date_of_birth
    email
    firstname
    gender
    lastname
    middlename
    prefix
    suffix
    created_at
  }
`,t=`
  fragment ADDRESS_FRAGMENT on OrderAddress {
    city
    company
    country_code
    fax
    firstname
    lastname
    middlename
    postcode
    prefix
    region
    region_id
    street
    suffix
    telephone
    vat_id
  }
`,r=`
  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    grand_total {
      value
      currency
    }
    grand_total_excl_tax {
      value
      currency
    }
    total_giftcard {
      currency
      value
    }
    subtotal_excl_tax {
      currency
      value
    }
    subtotal_incl_tax {
      currency
      value
    }
    taxes {
      amount {
        currency
        value
      }
      rate
      title
    }
    total_tax {
      currency
      value
    }
    total_shipping {
      currency
      value
    }
    discounts {
      amount {
        currency
        value
      }
      label
    }
  }
`,a=`
  fragment CUSTOMER_ORDER_FRAGMENT on CustomerOrder {
    token
    email
    shipping_method
    payment_methods {
      name
      type
    }
    shipments {
      id
      number
      tracking {
        title
        number
        carrier
      }
    }
    number
    id
    order_date
    carrier
    status
    items {
      status
      product_name
      id
      quantity_ordered
      quantity_shipped
      quantity_invoiced
      product_sku
      product_url_key
      product {
        sku
        small_image {
          url
        }
      }
    }
  }
`;export{t as ADDRESS_FRAGMENT,e as BASIC_CUSTOMER_INFO_FRAGMENT,a as CUSTOMER_ORDER_FRAGMENT,r as ORDER_SUMMARY_FRAGMENT};
//# sourceMappingURL=fragments.js.map
