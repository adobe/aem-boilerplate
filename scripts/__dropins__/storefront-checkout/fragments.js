/*! Copyright 2024 Adobe
All Rights Reserved. */
const e=`
  fragment BILLING_CART_ADDRESS_FRAGMENT on BillingCartAddress {
    id
    city
    country {
      code
      label
    }
    firstname
    lastname
    company
    postcode
    vat_id
    region {
      region_id
      code
      label
    }
    street
    telephone
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    prefix
    suffix
    middlename
    fax
  }
`,t=`
  fragment SHIPPING_CART_ADDRESS_FRAGMENT on ShippingCartAddress {
    id
    firstname
    lastname
    company
    street
    city
    postcode
    vat_id
    region {
      region_id
      code
      label
    }
    country {
      code
      label
    }
    telephone
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    available_shipping_methods {
      amount {
        currency
        value
      }
      available
      carrier_code
      carrier_title
      error_message
      method_code
      method_title
      price_excl_tax {
        value
        currency
      }
      price_incl_tax {
        value
        currency
      }
    }
    selected_shipping_method {
      amount {
        value
        currency
      }
      carrier_code
      carrier_title
      method_code
      method_title
      price_excl_tax {
        value
        currency
      }
      price_incl_tax {
        value
        currency
      }
    }
    same_as_billing
    prefix
    suffix
    middlename
    fax
  }
`,d=`
  fragment CHECKOUT_DATA_FRAGMENT on Cart {
    id
    is_virtual
    email
    total_quantity
    billing_address {
      ...BILLING_CART_ADDRESS_FRAGMENT
    }
    shipping_addresses {
      ...SHIPPING_CART_ADDRESS_FRAGMENT
    }
    available_payment_methods {
      code
      title
    }
    selected_payment_method {
      code
      title
    }
  }

  ${e}
  ${t}
`,l=`
  fragment CUSTOMER_FRAGMENT on Customer {
    firstname
    lastname
    email
  }
`,r=`
  fragment ORDER_ADDRESS_FRAGMENT on OrderAddress {
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
    custom_attributesV2 {
      code
      ... on AttributeValue {
        value
      }
    }
  }
`,a=`
  fragment PRODUCT_FRAGMENT on ProductInterface {
    __typename
    canonical_url
    uid
    name
    sku
    only_x_left_in_stock
    stock_status
    image {
      url
    }
    thumbnail {
      label
      url
    }
    price_range {
      maximum_price {
        regular_price {
          currency
          value
        }
      }
    }
  }
`,_=`
  fragment PRICE_FRAGMENT on OrderItemInterface {
    prices {
      price_including_tax {
        value
        currency
      }
      original_price {
        value
        currency
      }
      original_price_including_tax {
        value
        currency
      }
      price {
        value
        currency
      }
    }
  }
`,n=`
  fragment GIFT_CARD_FRAGMENT on GiftCardOrderItem {
    ...PRICE_FRAGMENT
    gift_message {
      message
    }
    gift_card {
      recipient_name
      recipient_email
      sender_name
      sender_email
      message
    }
  }
`,i=`
  fragment ORDER_ITEM_FRAGMENT on OrderItemInterface {
    __typename
    status
    product_name
    id
    quantity_ordered
    quantity_shipped
    quantity_canceled
    quantity_invoiced
    quantity_refunded
    quantity_returned
    product_sale_price {
      value
      currency
    }
    selected_options {
      label
      value
    }
    product {
      ...PRODUCT_FRAGMENT
    }
    ...PRICE_FRAGMENT
  }
`,c=`
  fragment BUNDLE_ORDER_ITEM_FRAGMENT on BundleOrderItem {
    ...PRICE_FRAGMENT
    bundle_options {
      uid
      label
      values {
        uid
        product_name
      }
    }
  }
`,o=`
  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    grand_total {
      value
      currency
    }
    total_giftcard {
      currency
      value
    }
    subtotal {
      currency
      value
    }
    taxes {
      title
      amount {
        currency
        value
      }
      rate
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
`,u=`
  fragment ORDER_FRAGMENT on CustomerOrder {
    email
    id
    number
    order_date
    order_status_change_date
    status
    token
    carrier
    shipping_method
    printed_card_included
    gift_receipt_included
    available_actions
    is_virtual
    payment_methods {
      name
      type
    }
    applied_coupons {
      code
    }
    shipments {
      id
      tracking {
        title
        number
        carrier
      }
      comments {
        message
        timestamp
      }
      items {
        id
        product_sku
        product_name
        order_item {
          ...ORDER_ITEM_FRAGMENT
          ... on GiftCardOrderItem {
            ...GIFT_CARD_FRAGMENT
            product {
              ...PRODUCT_FRAGMENT
            }
          }
        }
      }
    }
    payment_methods {
      name
      type
    }
    shipping_address {
      ...ORDER_ADDRESS_FRAGMENT
    }
    billing_address {
      ...ORDER_ADDRESS_FRAGMENT
    }
    items {
      ...ORDER_ITEM_FRAGMENT
      ... on BundleOrderItem {
        ...BUNDLE_ORDER_ITEM_FRAGMENT
      }
      ... on GiftCardOrderItem {
        ...GIFT_CARD_FRAGMENT
        product {
          ...PRODUCT_FRAGMENT
        }
      }
      ... on DownloadableOrderItem {
        product_name
        downloadable_links {
          sort_order
          title
        }
      }
    }
    total {
      ...ORDER_SUMMARY_FRAGMENT
    }
  }
  ${c}
  ${n}
  ${r}
  ${i}
  ${o}
  ${_}
  ${a}
`;export{d as CHECKOUT_DATA_FRAGMENT,l as CUSTOMER_FRAGMENT,u as ORDER_FRAGMENT,i as ORDER_ITEM_FRAGMENT};
