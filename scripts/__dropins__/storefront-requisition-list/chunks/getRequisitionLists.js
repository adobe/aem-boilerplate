/*! Copyright 2025 Adobe
All Rights Reserved. */
import{R as I,f as a,h as c,t as g}from"./updateRequisitionList.js";import{events as m}from"@dropins/tools/event-bus.js";const p=`
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
${I}
`,l=async(o,u)=>a(p,{variables:{currentPage:o,pageSize:u}}).then(({errors:t,data:e})=>{var s,r,n;if(t)return c(t);if(!((s=e==null?void 0:e.customer)!=null&&s.requisition_lists))return null;const i=e.customer.requisition_lists.items.map(_=>g(_));return m.emit("requisitionLists/data",i),{items:i,page_info:(n=(r=e.customer)==null?void 0:r.requisition_lists)==null?void 0:n.page_info}});export{l as g};
//# sourceMappingURL=getRequisitionLists.js.map
