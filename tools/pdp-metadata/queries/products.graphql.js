export default `query productSearch($currentPage: Int = 1) {
  productSearch(current_page: $currentPage, page_size: 50, phrase: "") {
    items {
      productView {
        __typename
        sku
        name
        urlKey
        url
        shortDescription
        description
        metaDescription
        metaKeyword
        metaTitle
        inStock
        images(roles: ["image"]) {
          url
        }
        attributes(roles: []) {
          name
          value
        }
        ... on SimpleProductView {
          price {
            ...priceFields
          }
        }
        ... on ComplexProductView {
          priceRange {
            maximum {
              ...priceFields
            }
            minimum {
              ...priceFields
            }
          }
        }
      }
    }
    page_info {
      current_page
      page_size
      total_pages
    }
    total_count
  }
}
fragment priceFields on ProductViewPrice {
  regular {
      amount {
          currency
          value
      }
  }
  final {
      amount {
          currency
          value
      }
  }
}
`;
