/*! Copyright 2025 Adobe
All Rights Reserved. */
const e=`
  fragment PRODUCTS_VIEW_FRAGMENT on ProductView {
    __typename
    name
    sku
    queryType
    visibility
    images {
      url
    }
    urlKey
    ... on SimpleProductView {
      price {
        final {
          amount {
            currency
            value
          }
        }
      }
    }
    ... on ComplexProductView {
      priceRange {
        maximum {
          final {
            amount {
              currency
              value
            }
          }
        }
        minimum {
          final {
            amount {
              currency
              value
            }
          }
        }
      }
    }
  }
`,n=`
  fragment UNIT_FRAGMENT on RecommendationUnit {
    displayOrder
    pageType
    productsView {
      ...PRODUCTS_VIEW_FRAGMENT
    }
    storefrontLabel
    totalProducts
    typeId
    unitId
    unitName
  }

  ${e}
`;export{e as PRODUCTS_VIEW_FRAGMENT,n as UNIT_FRAGMENT};
//# sourceMappingURL=fragments.js.map
