/*! Copyright 2025 Adobe
All Rights Reserved. */
import"@dropins/tools/event-bus.js";import{f as n,b as s}from"./transform-quote.js";import{s as i}from"./state.js";const u=`
  fragment NegotiableQuoteListFragment on NegotiableQuote {
    uid
    name
    created_at
    updated_at
    status
    buyer {
      firstname
      lastname
    }
    template_name
    prices {
      grand_total {
        value
        currency
      }
    }
    history {
      change_type
      changes {
        statuses {
          changes {
            new_status
            old_status
          }
        }
      }
    }
  }
`,g=`
  fragment SearchResultPageInfoFragment on SearchResultPageInfo {
    current_page
    page_size
    total_pages
  }
`,l=`
  fragment SortFieldsFragment on SortFields {
    default
    options {
      label
      value
    }
  }
`,c=`
  query negotiableQuotes(
    $filter: NegotiableQuoteFilterInput
    $pageSize: Int
    $currentPage: Int
    $sort: NegotiableQuoteSortInput
  ) {
    negotiableQuotes(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      items {
        ...NegotiableQuoteListFragment
      }
      page_info {
        ...SearchResultPageInfoFragment
      }
      sort_fields {
        ...SortFieldsFragment
      }
      total_count
    }
  }

  ${u}
  ${g}
  ${l}
`;var _=(e=>(e.FULL="FULL",e.PARTIAL="PARTIAL",e))(_||{}),E=(e=>(e.ASC="ASC",e.DESC="DESC",e))(E||{}),f=(e=>(e.QUOTE_NAME="QUOTE_NAME",e.CREATED_AT="CREATED_AT",e.UPDATED_AT="UPDATED_AT",e))(f||{});const S=async(e={})=>{var r;if(!i.authenticated)return Promise.reject(new Error("Unauthorized"));const o={filter:e.filter||null,pageSize:e.pageSize||20,currentPage:e.currentPage||1,sort:e.sort||null};try{const t=await n(c,{variables:o});if(!((r=t==null?void 0:t.data)!=null&&r.negotiableQuotes))throw new Error("No quotes data received");const a=s(t.data.negotiableQuotes);if(!a)throw new Error("Failed to transform quotes data");return a}catch(t){return Promise.reject(t)}};export{_ as F,f as N,E as S,S as n};
//# sourceMappingURL=negotiableQuotes.js.map
