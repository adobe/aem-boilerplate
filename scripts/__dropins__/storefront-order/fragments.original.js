/*! Copyright 2026 Adobe
All Rights Reserved. */
const u=`
  fragment REQUEST_RETURN_ORDER_FRAGMENT on Return {
    __typename
    uid
    status
    number
    created_at
  }
`,e=`
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
`,_=`
  fragment PRODUCT_DETAILS_FRAGMENT on ProductInterface {
    __typename
    canonical_url
    url_key
    uid
    name
    sku
    only_x_left_in_stock
    gift_wrapping_available
    gift_wrapping_price {
      currency
      value
    }
    stock_status
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
`,t=`
  fragment PRICE_DETAILS_FRAGMENT on OrderItemInterface {
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
`,r=`
  fragment GIFT_CARD_DETAILS_FRAGMENT on GiftCardOrderItem {
    ...PRICE_DETAILS_FRAGMENT
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    gift_card {
      recipient_name
      recipient_email
      sender_name
      sender_email
      message
    }
  }
`,a=`
  fragment ORDER_ITEM_DETAILS_FRAGMENT on OrderItemInterface {
    gift_wrapping {
      ...GIFT_WRAPPING_FRAGMENT
    }
    __typename
    status
    product_sku
    eligible_for_return
    product_name
    product_url_key
    id
    quantity_ordered
    quantity_shipped
    quantity_canceled
    quantity_invoiced
    quantity_refunded
    quantity_return_requested
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    product_sale_price {
      value
      currency
    }
    selected_options {
      label
      value
    }
    product {
      ...PRODUCT_DETAILS_FRAGMENT
    }
    ...PRICE_DETAILS_FRAGMENT
  }
`,n=`
  fragment BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT on BundleOrderItem {
    ...PRICE_DETAILS_FRAGMENT
    bundle_options {
      uid
      label
      values {
        uid
        product_name
      }
    }
  }
`,s=`
  fragment DOWNLOADABLE_ORDER_ITEMS_FRAGMENT on DownloadableOrderItem {
    product_name
    downloadable_links {
      sort_order
      title
    }
  }
`,E=`
  fragment ORDER_ITEM_FRAGMENT on OrderItemInterface {
    ...ORDER_ITEM_DETAILS_FRAGMENT
    ... on BundleOrderItem {
      ...BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT
    }
    ... on GiftCardOrderItem {
      ...GIFT_CARD_DETAILS_FRAGMENT
      product {
        ...PRODUCT_DETAILS_FRAGMENT
      }
    }
    ...DOWNLOADABLE_ORDER_ITEMS_FRAGMENT
  }

  ${s}
`,i=`
  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    gift_options {
      gift_wrapping_for_items {
        currency
        value
      }
      gift_wrapping_for_items_incl_tax {
        currency
        value
      }
      gift_wrapping_for_order {
        currency
        value
      }
      gift_wrapping_for_order_incl_tax {
        currency
        value
      }
      printed_card {
        currency
        value
      }
      printed_card_incl_tax {
        currency
        value
      }
    }
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
`,d=`
  fragment RETURNS_FRAGMENT on Returns {
    __typename
    items {
      number
      status
      created_at
      shipping {
        tracking {
          status {
            text
            type
          }
          carrier {
            uid
            label
          }
          tracking_number
        }
      }
      order {
        number
        token
      }
      items {
        uid
        quantity
        status
        request_quantity
        order_item {
          ...ORDER_ITEM_DETAILS_FRAGMENT
          ... on GiftCardOrderItem {
            ...GIFT_CARD_DETAILS_FRAGMENT
            product {
              ...PRODUCT_DETAILS_FRAGMENT
            }
          }
        }
      }
    }
  }
`,R=`
  fragment APPLIED_GIFT_CARDS_FRAGMENT on ApplyGiftCardToOrder {
    __typename
    code
    applied_balance {
      value
      currency
    }
  }
`,T=`
  fragment GIFT_MESSAGE_FRAGMENT on GiftMessage {
    __typename
    from
    to
    message
  }
`,c=`
  fragment GIFT_WRAPPING_FRAGMENT on GiftWrapping {
    __typename
    uid
    design
    image {
      url
    }
    price {
      value
      currency
    }
  }
`,A=`
  fragment GUEST_ORDER_FRAGMENT on CustomerOrder {
    printed_card_included
    gift_receipt_included
    gift_wrapping {
      ...GIFT_WRAPPING_FRAGMENT
    }
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    applied_gift_cards {
      ...APPLIED_GIFT_CARDS_FRAGMENT
    }
    items_eligible_for_return {
      ...ORDER_ITEM_DETAILS_FRAGMENT
    }
    email
    id
    number
    order_date
    order_status_change_date
    status
    token
    carrier
    shipping_method
    available_actions
    is_virtual
    comments {
      message
      timestamp
    }
    payment_methods {
      name
      type
    }
    applied_coupons {
      code
    }
    shipments {
      id
      number
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
        __typename
        id
        product_sku
        product_name
        quantity_shipped
        order_item {
          ...ORDER_ITEM_DETAILS_FRAGMENT
          ... on GiftCardOrderItem {
            ...GIFT_CARD_DETAILS_FRAGMENT
            product {
              ...PRODUCT_DETAILS_FRAGMENT
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
      ...ADDRESS_FRAGMENT
    }
    billing_address {
      ...ADDRESS_FRAGMENT
    }
    items {
      ...ORDER_ITEM_FRAGMENT
    }
    total {
      ...ORDER_SUMMARY_FRAGMENT
    }
  }
  ${e}
  ${R}
  ${n}
  ${r}
  ${T}
  ${c}
  ${a}
  ${E}
  ${i}
  ${t}
  ${_}
`,o=`
  fragment CUSTOMER_ORDER_FRAGMENT on CustomerOrder {
    printed_card_included
    gift_receipt_included
    gift_wrapping {
      ...GIFT_WRAPPING_FRAGMENT
    }
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    applied_gift_cards {
      ...APPLIED_GIFT_CARDS_FRAGMENT
    }
    items_eligible_for_return {
      ...ORDER_ITEM_DETAILS_FRAGMENT
    }
    email
    id
    number
    order_date
    order_status_change_date
    status
    carrier
    shipping_method
    available_actions
    is_virtual
    comments {
      message
      timestamp
    }
    payment_methods {
      name
      type
    }
    applied_coupons {
      code
    }
    shipments {
      id
      number
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
        __typename
        id
        product_sku
        product_name
        quantity_shipped
        order_item {
          ...ORDER_ITEM_DETAILS_FRAGMENT
          ... on GiftCardOrderItem {
            ...GIFT_CARD_DETAILS_FRAGMENT
            product {
              ...PRODUCT_DETAILS_FRAGMENT
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
      ...ADDRESS_FRAGMENT
    }
    billing_address {
      ...ADDRESS_FRAGMENT
    }
    items {
      ...ORDER_ITEM_FRAGMENT
    }
    total {
      ...ORDER_SUMMARY_FRAGMENT
    }
  }
  ${e}
  ${R}
  ${n}
  ${r}
  ${T}
  ${c}
  ${a}
  ${E}
  ${i}
  ${t}
  ${_}
`,m=`
  fragment PLACE_ORDER_FRAGMENT on PlaceOrderOutput {
    errors {
      code
      message
    }
    orderV2 {
      ...GUEST_ORDER_FRAGMENT
    }
  }

  ${A}
`,G=`
  fragment PLACE_NEGOTIABLE_QUOTE_ORDER_FRAGMENT on PlaceNegotiableQuoteOrderOutputV2 {
    errors {
      code
      message
    }
    order {
      ...GUEST_ORDER_FRAGMENT
    }
  }

  ${A}
`;export{e as ADDRESS_FRAGMENT,R as APPLIED_GIFT_CARDS_FRAGMENT,n as BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT,o as CUSTOMER_ORDER_FRAGMENT,s as DOWNLOADABLE_ORDER_ITEMS_FRAGMENT,r as GIFT_CARD_DETAILS_FRAGMENT,T as GIFT_MESSAGE_FRAGMENT,c as GIFT_WRAPPING_FRAGMENT,A as GUEST_ORDER_FRAGMENT,a as ORDER_ITEM_DETAILS_FRAGMENT,E as ORDER_ITEM_FRAGMENT,i as ORDER_SUMMARY_FRAGMENT,G as PLACE_NEGOTIABLE_QUOTE_ORDER_FRAGMENT,m as PLACE_ORDER_FRAGMENT,t as PRICE_DETAILS_FRAGMENT,_ as PRODUCT_DETAILS_FRAGMENT,u as REQUEST_RETURN_ORDER_FRAGMENT,d as RETURNS_FRAGMENT};
//# sourceMappingURL=fragments.js.map
