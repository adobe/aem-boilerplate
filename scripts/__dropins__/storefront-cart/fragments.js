/*! Copyright 2025 Adobe
All Rights Reserved. */
const e=`
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
`,t=`
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
`,a=`
  fragment DOWNLOADABLE_CART_ITEMS_FRAGMENT on DownloadableCartItem {
    links {
      sort_order
      title
    }
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
`,r=`
  fragment CART_ITEM_FRAGMENT on CartItemInterface {
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
      custom_attributesV2(filters: { is_visible_on_front: true }) {
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
      customizable_options {
        ...CUSTOMIZABLE_OPTIONS_FRAGMENT
      }
    }
    ... on ConfigurableCartItem {
      configurable_options {
        configurable_product_option_uid
        option_label
        value_label
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
      }
      customizable_options {
        ...CUSTOMIZABLE_OPTIONS_FRAGMENT
      }
    }
    ...DOWNLOADABLE_CART_ITEMS_FRAGMENT
    ... on BundleCartItem {
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
  ${t}
  ${a}
`,n=`
  fragment CART_FRAGMENT on Cart {
    id
    total_quantity
    is_virtual
    prices {
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
    itemsV2(
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $itemsSortInput
    ) {
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

  ${r}
`;export{n as CART_FRAGMENT,r as CART_ITEM_FRAGMENT,a as DOWNLOADABLE_CART_ITEMS_FRAGMENT};
