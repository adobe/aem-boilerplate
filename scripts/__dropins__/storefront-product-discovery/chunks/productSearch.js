/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as o}from"@dropins/tools/lib.js";import{ProductView as n,Facet as c}from"../fragments.js";import{FetchGraphQL as s}from"@dropins/tools/fetch-graphql.js";const a=new o({init:async t=>{const e={};a.config.setConfig({...e,...t})},listeners:()=>[]}),l=a.config,{setEndpoint:f,setFetchGraphQlHeader:d,removeFetchGraphQlHeader:$,setFetchGraphQlHeaders:m,fetchGraphQl:i,getConfig:S}=new s().getMethods(),p=`
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
  ${n}
  ${c}
`,_=async t=>i(p,{method:"GET",variables:t}).then(({errors:e,data:r})=>{if(e&&!r)throw console.log("error",e),new Error("Error fetching product search");return r});export{d as a,m as b,l as c,i as f,S as g,a as i,_ as p,$ as r,f as s};
//# sourceMappingURL=productSearch.js.map
