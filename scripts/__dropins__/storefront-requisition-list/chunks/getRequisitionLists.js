/*! Copyright 2025 Adobe
All Rights Reserved. */
import{R as _,f as I,h as a,t as c}from"./transform-requisition-list.js";const g=`
  query GET_REQUISITION_LISTS_QUERY(
    $currentPage: Int = 1
    $pageSize: Int = 10,
  ) {
    customer {
      requisition_lists(pageSize: $pageSize, currentPage: $currentPage) {
        items {
          ...REQUISITION_LIST_FRAGMENT
        }
        page_info {
          page_size
          current_page
          total_pages
        }
        total_count
      }
    }
  }
${_}
`,S=async(n,o)=>I(g,{variables:{currentPage:n,pageSize:o}}).then(({errors:i,data:e})=>{var t,s,r;return i?a(i):(t=e==null?void 0:e.customer)!=null&&t.requisition_lists?{items:e.customer.requisition_lists.items.map(u=>c(u)),page_info:(r=(s=e.customer)==null?void 0:s.requisition_lists)==null?void 0:r.page_info}:null});export{S as g};
//# sourceMappingURL=getRequisitionLists.js.map
