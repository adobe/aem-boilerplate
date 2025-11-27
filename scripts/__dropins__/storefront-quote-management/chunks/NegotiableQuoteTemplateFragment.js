/*! Copyright 2025 Adobe
All Rights Reserved. */
const e=`
  fragment NegotiableQuoteTemplateFragment on NegotiableQuoteTemplate {
    # uid
    template_id
    name
    # created_at
    # updated_at
    status
    # sales_rep_name
    expiration_date
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
    items {
      __typename
      uid
      product {
        name
        sku
        uid
        stock_status
        quantity
        thumbnail {
          label
          url
        }
        price_range {
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
      prices {
        price {
          currency
          value
        }
        price_including_tax {
          value
          currency
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
        row_total_including_tax {
          value
          currency
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
      is_available
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
      ... on SimpleCartItem {
        customizable_options {
          type
          label
          values {
            label
            value
          }
        }
      }
      ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
        configured_variant {
          uid
          sku
          stock_status
          thumbnail {
            label
            url
          }
          price_range {
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
          type
          label
          values {
            label
            value
          }
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
      ... on DownloadableCartItem {
        links {
          sort_order
          title
        }
        customizable_options {
          type
          label
          values {
            label
            value
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
    reference_document_links {
      link_id
      document_name
      document_identifier
      reference_document_url
    }
  }
`;export{e as N};
//# sourceMappingURL=NegotiableQuoteTemplateFragment.js.map
