/*! Copyright 2025 Adobe
All Rights Reserved. */
const e=`
  fragment NegotiableQuoteFragment on NegotiableQuote {
    uid
    name
    created_at
    status
    sales_rep_name
    expiration_date
    updated_at
    buyer {
      firstname
      lastname
    }
    comments {
      uid
      created_at
      author {
        firstname
        lastname
      }
      text
      attachments {
          name
          url
      }
    }
    template_id
    template_name
    items {
      product {
        name
        sku
        uid
        stock_status
        quantity
        price_range {
          maximum_price {
            regular_price {
              value
            }
          }
        }
      }
      prices {
        price {
          currency
          value
        }
        original_item_price {
          currency
          value
        }
        original_row_total {
          currency
          value
        }
        row_total {
          currency
          value
        }
        catalog_discount {
          amount_off
          percent_off
        }
        discounts {
          label
          value
          amount {
            currency
            value
          }
        }
      }
      quantity
      note_from_buyer {
        created_at
        creator_id
        creator_type
        negotiable_quote_item_uid
        note
        note_uid
        __typename
      }
      note_from_seller {
        created_at
        creator_id
        creator_type
        negotiable_quote_item_uid
        note
        note_uid
        __typename
      }
      ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
      }
      ... on BundleCartItem {
        bundle_options {
          label
          values {
            label
            quantity
            original_price {
              currency
              value
            }
            priceV2 {
              currency
              value
            }
          }
        }
      }
    }
    history {
      uid
      created_at
      author {
        firstname
        lastname
      }
      change_type
      changes {
        comment_added {
          comment
        }
        custom_changes {
          new_value
          old_value
          title
        }
        statuses {
          changes {
            new_status
            old_status
          }
        }
        expiration {
          new_expiration
          old_expiration
        }
        total {
          new_price {
            currency
            value
          }
          old_price {
            currency
            value
          }
        }
        products_removed {
          products_removed_from_catalog
          products_removed_from_quote {
            uid
            name
            sku
            quantity
          }
        }
      }
    }
    prices {
      subtotal_excluding_tax {
        currency
        value
      }
      subtotal_including_tax {
        currency
        value
      }
      subtotal_with_discount_excluding_tax {
        currency
        value
      }
      applied_taxes {
        amount {
          currency
          value
        }
        label
      }
      grand_total {
        currency
        value
      }
    }
    shipping_addresses {
      uid
      firstname
      lastname
      company
      street
      city
      region {
        code
        label
        region_id
      }
      postcode
      country {
        code
        label
      }
      telephone
    }
  }
`;export{e as N};
//# sourceMappingURL=NegotiableQuoteFragment.js.map
