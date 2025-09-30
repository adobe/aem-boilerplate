const e = `
  fragment PRICE_RANGE_FRAGMENT on PriceRange {
    minimum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
    }
    maximum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
    }
  }
`, _ = `
  fragment CUSTOMIZABLE_OPTIONS_FRAGMENT on SelectedCustomizableOption {
    type
    customizable_option_uid
    label
    is_required
    values {
      label
      value
      price {
        type
        units
        value
      }
    }
  }
`, a = ``, t = `fragment APPLIED_GIFT_CARDS_FRAGMENT on AppliedGiftCard {
  __typename
  code
  applied_balance {
    value
    currency
  }
  current_balance {
    value
    currency
  }
  expiration_date
}`, i = `fragment GIFT_MESSAGE_FRAGMENT on GiftMessage {
  __typename
  from
  to
  message
}`, r = (`fragment GIFT_WRAPPING_FRAGMENT on GiftWrapping {
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
}`), n = `fragment AVAILABLE_GIFT_WRAPPING_FRAGMENT on GiftWrapping {
  __typename
  uid
  design
  image {
    url
    label
  }
  price {
    currency
    value
  }
}`, u = `fragment CART_ITEM_FRAGMENT on CartItemInterface {
  __typename
  uid
  quantity
  is_available
  not_available_message
  errors {
    code
    message
  }
  prices {
    price {
      value
      currency
    }
    discounts {
      amount {
        value
        currency
      }
      label
    }
    total_item_discount {
      value
      currency
    }
    row_total {
      value
      currency
    }
    row_total_including_tax {
      value
      currency
    }
    price_including_tax {
      value
      currency
    }
    fixed_product_taxes {
      amount {
        value
        currency
      }
      label
    }
    original_item_price {
      value
      currency
    }
    original_row_total {
      value
      currency
    }
  }
  product {
    name
    sku
    price_tiers {
      quantity
      final_price {
        value
      }
      discount {
        amount_off
        percent_off
      }
    }
    quantity
    gift_message_available
    gift_wrapping_available
    gift_wrapping_price {
      currency
      value
    }
    thumbnail {
      url
      label
    }
    url_key
    canonical_url
    categories {
      url_path
      url_key
      name
    }
    custom_attributesV2(filters: {is_visible_on_front: true}) {
      items {
        code
        ... on AttributeValue {
          value
        }
        ... on AttributeSelectedOptions {
          selected_options {
            value
            label
          }
        }
      }
    }
    only_x_left_in_stock
    stock_status
    price_range {
      ...PRICE_RANGE_FRAGMENT
    }
  }
  ... on SimpleCartItem {
    available_gift_wrapping {
      ...AVAILABLE_GIFT_WRAPPING_FRAGMENT
    }
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    gift_wrapping {
      ...GIFT_WRAPPING_FRAGMENT
    }
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  ... on ConfigurableCartItem {
    available_gift_wrapping {
      ...AVAILABLE_GIFT_WRAPPING_FRAGMENT
    }
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    gift_wrapping {
      ...GIFT_WRAPPING_FRAGMENT
    }
    configurable_options {
      configurable_product_option_uid
      option_label
      value_label
      configurable_product_option_value_uid
    }
    configured_variant {
      uid
      sku
      only_x_left_in_stock
      stock_status
      thumbnail {
        label
        url
      }
      price_range {
        ...PRICE_RANGE_FRAGMENT
      }
      price_tiers {
        quantity
        final_price {
          value
        }
        discount {
          amount_off
          percent_off
        }
      }
    }
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  ... on BundleCartItem {
    available_gift_wrapping {
      ...AVAILABLE_GIFT_WRAPPING_FRAGMENT
    }
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    gift_wrapping {
      ...GIFT_WRAPPING_FRAGMENT
    }
    bundle_options {
      uid
      label
      values {
        uid
        label
      }
    }
  }
  ... on GiftCardCartItem {
    message
    recipient_email
    recipient_name
    sender_email
    sender_name
    amount {
      currency
      value
    }
    is_available
  }
}
${e}
${_}
${a}
${r}
${i}
${n}`, c = `fragment CART_FRAGMENT on Cart {
  id
  total_quantity
  is_virtual
  applied_gift_cards {
    ...APPLIED_GIFT_CARDS_FRAGMENT
  }
  gift_receipt_included
  printed_card_included
  gift_message {
    ...GIFT_MESSAGE_FRAGMENT
  }
  gift_wrapping {
    ...GIFT_WRAPPING_FRAGMENT
  }
  available_gift_wrappings {
    ...AVAILABLE_GIFT_WRAPPING_FRAGMENT
  }
  prices {
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
    subtotal_with_discount_excluding_tax {
      currency
      value
    }
    subtotal_including_tax {
      currency
      value
    }
    subtotal_excluding_tax {
      currency
      value
    }
    grand_total {
      currency
      value
    }
    grand_total_excluding_tax {
      currency
      value
    }
    applied_taxes {
      label
      amount {
        value
        currency
      }
    }
    discounts {
      amount {
        value
        currency
      }
      label
      coupon {
        code
      }
      applied_to
    }
  }
  applied_coupons {
    code
  }
  itemsV2(pageSize: $pageSize, currentPage: $currentPage, sort: $itemsSortInput) {
    items {
      ...CART_ITEM_FRAGMENT
    }
  }
  shipping_addresses {
    country {
      code
    }
    region {
      code
    }
    postcode
  }
}
${u}
${t}`;
export {
t as APPLIED_GIFT_CARDS_FRAGMENT,
n as AVAILABLE_GIFT_WRAPPING_FRAGMENT,
c as CART_FRAGMENT,
u as CART_ITEM_FRAGMENT,
a as DOWNLOADABLE_CART_ITEMS_FRAGMENT,
i as GIFT_MESSAGE_FRAGMENT,
r as GIFT_WRAPPING_FRAGMENT
};