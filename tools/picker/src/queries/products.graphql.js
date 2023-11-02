const query = `query getProductsInCategory($id: String!, $currentPage: Int = 1) {
    productSearch(phrase: "", filter: { attribute: "categoryIds", eq: $id }, current_page: $currentPage, page_size: 20) {
        items {
            productView {
                sku
                name
                images(roles: "thumbnail") {
                    url
                }
                urlKey
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

export default query.replaceAll(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ');
