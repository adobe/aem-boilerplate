/*! Copyright 2025 Adobe
All Rights Reserved. */
import{R as L,f as T,h as q,t as R}from"./updateRequisitionList.js";import{events as E}from"@dropins/tools/event-bus.js";const a=`
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
${L}
`,p=async t=>T(a,{variables:{requisitionListUid:t}}).then(({errors:e,data:i})=>{var n,o,r,u,_,l;if(!t)return null;if(e)return q(e);if(!((n=i==null?void 0:i.deleteRequisitionList)!=null&&n.requisition_lists))return null;const s=((r=(o=i.deleteRequisitionList.requisition_lists)==null?void 0:o.items)==null?void 0:r.map(I=>R(I)))||[];return E.emit("requisitionLists/data",s),{items:s,page_info:(_=(u=i.deleteRequisitionList)==null?void 0:u.requisition_lists)==null?void 0:_.page_info,status:(l=i.deleteRequisitionList)==null?void 0:l.status}});export{p as d};
//# sourceMappingURL=deleteRequisitionList.js.map
