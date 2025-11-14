/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as n}from"@dropins/tools/event-bus.js";import{t as s}from"./transform-quote-template.js";import{s as o}from"./state.js";import{f as i}from"./transform-quote.js";const l=`
  query QUOTE_TEMPLATES_QUERY(
    $filter: NegotiableQuoteTemplateFilterInput
    $pageSize: Int
    $currentPage: Int
    $sort: NegotiableQuoteTemplateSortInput
  ) {
    negotiableQuoteTemplates(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      items {
        # uid
        template_id
        name
        # created_at
        # updated_at
        # last_ordered_at
        status
        state
        min_negotiated_grand_total
        last_shared_at
        # expiration_date
        orders_placed
        # grand_total {
        #   currency
        #   value
        # }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
      sort_fields {
        default
        options {
          label
          value
        }
      }
    }
  }
`;var u=(e=>(e.ACTIVE="ACTIVE",e.IN_REVIEW="IN_REVIEW",e.INACTIVE="INACTIVE",e))(u||{}),E=(e=>(e.NAME="NAME",e.CREATED_AT="CREATED_AT",e.UPDATED_AT="UPDATED_AT",e))(E||{}),_=(e=>(e.ASC="ASC",e.DESC="DESC",e))(_||{});const T=async(e={})=>{var r;if(!o.authenticated)throw new Error("Unauthorized");try{const t=await i(l,{variables:{filter:e.filter||null,pageSize:e.pageSize||20,currentPage:e.currentPage||1,sort:e.sort||null}});if(!((r=t==null?void 0:t.data)!=null&&r.negotiableQuoteTemplates))throw new Error("No quote templates data received");const a=s(t.data.negotiableQuoteTemplates);if(!a)throw new Error("Failed to transform quote templates data");return n.emit("quote-management/quote-templates-data",{quoteTemplates:a,permissions:o.permissions}),a}catch(t){return Promise.reject(t)}};export{u as Q,_ as S,E as a,T as g};
//# sourceMappingURL=getQuoteTemplates.js.map
