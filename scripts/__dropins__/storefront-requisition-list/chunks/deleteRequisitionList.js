/*! Copyright 2025 Adobe
All Rights Reserved. */
import{R as I,f as T,h as L,t as R}from"./transform-requisition-list.js";const q=`
  mutation DELETE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
    ) {
    deleteRequisitionList(
      requisitionListUid: $requisitionListUid
    ) {
      status
      requisition_lists {
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
`,a=async t=>T(q,{variables:{requisitionListUid:t}}).then(({errors:e,data:i})=>{var s,n,o,u,r,_;return t?e?L(e):(s=i==null?void 0:i.deleteRequisitionList)!=null&&s.requisition_lists?{items:((o=(n=i.deleteRequisitionList.requisition_lists)==null?void 0:n.items)==null?void 0:o.map(l=>R(l)))||[],page_info:(r=(u=i.deleteRequisitionList)==null?void 0:u.requisition_lists)==null?void 0:r.page_info,status:(_=i.deleteRequisitionList)==null?void 0:_.status}:null:null});export{a as d};
//# sourceMappingURL=deleteRequisitionList.js.map
