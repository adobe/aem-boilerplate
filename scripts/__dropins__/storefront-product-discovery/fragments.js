/*! Copyright 2025 Adobe
All Rights Reserved. */
const e=`
  fragment Facet on Aggregation {
    title
    attribute
    buckets {
      title
      __typename
      ... on CategoryView {
        name
        count
        path
      }
      ... on ScalarBucket {
        count
      }
      ... on RangeBucket {
        from
        to
        count
      }
      ... on StatsBucket {
        min
        max
      }
    }
  }
`,t=`
  fragment ProductView on ProductSearchItem {
    productView {
      __typename
      sku
      name
      inStock
      url
      urlKey
      images {
        label
        url
        roles
      }
      ... on ComplexProductView {
        priceRange {
          maximum {
            final {
              amount {
                value
                currency
              }
            }
            regular {
              amount {
                value
                currency
              }
            }
          }
          minimum {
            final {
              amount {
                value
                currency
              }
            }
            regular {
              amount {
                value
                currency
              }
            }
          }
        }
        options {
          id
          title
          values {
            title
            ... on ProductViewOptionValueSwatch {
              id
              inStock
              type
              value
            }
          }
        }
      }
      ... on SimpleProductView {
        price {
          final {
            amount {
              value
              currency
            }
          }
          regular {
            amount {
              value
              currency
            }
          }
        }
      }
    }
    highlights {
      attribute
      value
      matched_words
    }
  }
`;export{e as Facet,t as ProductView};
//# sourceMappingURL=fragments.js.map
