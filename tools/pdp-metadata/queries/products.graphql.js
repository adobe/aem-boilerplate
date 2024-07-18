export default `query productSearch($currentPage: Int = 1) {
  productSearch(current_page: $currentPage, page_size: 20, phrase: "") {
    items {
      productView {
        __typename
        sku
        name
        urlKey
        shortDescription
        description
        metaDescription
        metaKeyword
        metaTitle
      }
      product {
        image {
          url
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
}`;
