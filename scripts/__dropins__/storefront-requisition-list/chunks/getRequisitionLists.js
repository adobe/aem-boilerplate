/*! Copyright 2026 Adobe
All Rights Reserved. */
import{R as m,t as a}from"./updateRequisitionList.js";import{f as p,h as g}from"./fetch-graphql.js";import{events as l}from"@dropins/tools/event-bus.js";const S=`
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
${m}
`,R=async(_,c)=>p(S,{variables:{currentPage:_,pageSize:c}}).then(({errors:e,data:t})=>{var s,r,o,n,u;if(e)return g(e);if(!((s=t==null?void 0:t.customer)!=null&&s.requisition_lists))return null;const i=t.customer.requisition_lists.items.map(I=>a(I));return l.emit("requisitionLists/data",i),{items:i,page_info:(o=(r=t.customer)==null?void 0:r.requisition_lists)==null?void 0:o.page_info,total_count:(u=(n=t.customer)==null?void 0:n.requisition_lists)==null?void 0:u.total_count}});export{R as g};
//# sourceMappingURL=getRequisitionLists.js.map
