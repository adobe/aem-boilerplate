/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as S,R as p,t as l}from"./updateRequisitionList.js";import{f as T,h as E}from"./fetch-graphql.js";import{events as f}from"@dropins/tools/event-bus.js";const R=`
  query GET_REQUISITION_LIST_QUERY(
    $requisitionListUid: String,
    $currentPage: Int = 1,
    $pageSize: Int = 10,
  ) {
    customer {
      requisition_lists (
        filter: {
          uids: {
            eq: $requisitionListUid
          }
        }
      ){
        items {
          ...REQUISITION_LIST_FRAGMENT
          items(pageSize: $pageSize, currentPage: $currentPage) {
            ...REQUISITION_LIST_ITEMS_FRAGMENT
          }
        }
      }
    }
  }
${S}
${p}
`,$=`
  query GET_REQUISITION_LISTS_QUERY(
    $currentPage: Int = 1
    $pageSize: Int = 10,
    $listItemsPageSize: Int = 100,
    $listItemsCurrentPage: Int = 1,
  ) {
    customer {
      requisition_lists(pageSize: $pageSize, currentPage: $currentPage) {
        items {
          ...REQUISITION_LIST_FRAGMENT
          items(pageSize: $listItemsPageSize, currentPage: $listItemsCurrentPage) {
            ...REQUISITION_LIST_ITEMS_FRAGMENT
          }
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
${p}
${S}
`;function L(e){return!e||typeof e!="string"||e.length<2||!/^[A-Za-z0-9+/]+(==|=)?$/.test(e)?!1:e.length%4===0}async function U(e,g){var r,o,I,_;const i=e.page_info;if(!i||i.total_pages<=1||i.current_page>=i.total_pages)return e;const n=String(e.uid);if(!L(n))return e;const t=[...e.items??[]];for(let a=i.current_page+1;a<=i.total_pages;a+=1){const{errors:u,data:s}=await T(R,{variables:{requisitionListUid:n,currentPage:a,pageSize:g}});u&&E(u);const c=(I=(o=(r=s==null?void 0:s.customer)==null?void 0:r.requisition_lists)==null?void 0:o.items)==null?void 0:I[0];if(!c)break;const m=l(c);(_=m==null?void 0:m.items)!=null&&_.length&&t.push(...m.items)}return{...e,items:t,page_info:{current_page:1,total_pages:1,page_size:t.length}}}const Q=async(e,g,i=100)=>{var o,I,_,a,u;const{errors:n,data:t}=await T($,{variables:{currentPage:e,pageSize:g,listItemsPageSize:i,listItemsCurrentPage:1}});if(n)return E(n);if(!((o=t==null?void 0:t.customer)!=null&&o.requisition_lists))return null;let r=t.customer.requisition_lists.items.map(s=>l(s));return r=await Promise.all(r.map(s=>s==null?Promise.resolve(s):U(s,i))),f.emit("requisitionLists/data",r),{items:r,page_info:(_=(I=t.customer)==null?void 0:I.requisition_lists)==null?void 0:_.page_info,total_count:(u=(a=t.customer)==null?void 0:a.requisition_lists)==null?void 0:u.total_count}};export{R as G,Q as g,L as i};
//# sourceMappingURL=getRequisitionLists.js.map
