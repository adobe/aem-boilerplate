/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as R,h as p}from"./fetch-graphql.js";import{h as P}from"./fetch-error.js";import{P as S,t as s}from"./rejectPurchaseOrders.js";import"@dropins/tools/lib.js";import{t as h}from"./case-converter.js";const $=`
  query GET_PURCHASE_ORDERS(
    $filter: PurchaseOrdersFilterInput
    $pageSize: Int
    $currentPage: Int
  ) {
    customer {
      purchase_orders(
        filter: $filter
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        total_count
        page_info {
          current_page
          page_size
          total_pages
        }
        items {
          ...PURCHASE_ORDERS_FRAGMENT
        }
      }
    }
  }
  ${S}
`,I=async(f,l=20,m=1)=>R($,{variables:{filter:h(f),pageSize:l,currentPage:m}}).then(e=>{var r,o,a,i,n,g,_,c;if((r=e.errors)!=null&&r.length&&P(e.errors),!((a=(o=e.data)==null?void 0:o.customer)!=null&&a.purchase_orders))throw new Error("Failed to get purchase orders");const t=(n=(i=e==null?void 0:e.data)==null?void 0:i.customer)==null?void 0:n.purchase_orders,u=(t==null?void 0:t.total_count)??0,E={currentPage:((g=t==null?void 0:t.page_info)==null?void 0:g.current_page)??1,pageSize:((_=t==null?void 0:t.page_info)==null?void 0:_.page_size)??20,totalPages:((c=t==null?void 0:t.page_info)==null?void 0:c.total_pages)??1};return{totalCount:u,pageInfo:E,purchaseOrderItems:((t==null?void 0:t.items)||[]).map(s)}}).catch(p);export{I as g};
//# sourceMappingURL=getPurchaseOrders.js.map
