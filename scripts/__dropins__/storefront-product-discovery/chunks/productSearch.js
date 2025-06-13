/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as a}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:l,setFetchGraphQlHeader:s,removeFetchGraphQlHeader:p,setFetchGraphQlHeaders:m,fetchGraphQl:n,getConfig:g}=new a().getMethods(),o=`
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
`,c=`
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
`,u=`
  query productSearch(
    $phrase: String!
    $pageSize: Int
    $currentPage: Int = 1
    $filter: [SearchClauseInput!]
    $sort: [ProductSearchSortInput!]
    $context: QueryContextInput
  ) {
    productSearch(
      phrase: $phrase
      page_size: $pageSize
      current_page: $currentPage
      filter: $filter
      sort: $sort
      context: $context
    ) {
      total_count
      items {
        ...ProductView
      }
      facets {
        ...Facet
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
    attributeMetadata {
      sortable {
        label
        attribute
        numeric
      }
    }
  }
  ${c}
  ${o}
`,h=async r=>n(u,{method:"GET",variables:r}).then(({errors:e,data:t})=>{if(e&&!t)throw console.log("error",e),new Error("Error fetching product search");return t});export{s as a,m as b,n as f,g,h as p,p as r,l as s};
//# sourceMappingURL=productSearch.js.map
