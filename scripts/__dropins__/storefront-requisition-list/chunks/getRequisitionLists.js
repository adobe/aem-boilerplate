/*! Copyright 2025 Adobe
All Rights Reserved. */
import{R as a,f as m,h as g,t as l}from"./updateRequisitionList.js";import{events as p}from"@dropins/tools/event-bus.js";const S=`
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
${a}
`,R=async(_,c)=>m(S,{variables:{currentPage:_,pageSize:c}}).then(({errors:e,data:t})=>{var s,r,n,o,u;if(e)return g(e);if(!((s=t==null?void 0:t.customer)!=null&&s.requisition_lists))return null;const i=t.customer.requisition_lists.items.map(I=>l(I));return p.emit("requisitionLists/data",i),{items:i,page_info:(n=(r=t.customer)==null?void 0:r.requisition_lists)==null?void 0:n.page_info,total_count:(u=(o=t.customer)==null?void 0:o.requisition_lists)==null?void 0:u.total_count}});export{R as g};
//# sourceMappingURL=getRequisitionLists.js.map
