/*! Copyright 2026 Adobe
All Rights Reserved. */
import{h as E}from"./network-error.js";import{RETURNS_FRAGMENT as a,PRODUCT_DETAILS_FRAGMENT as T,PRICE_DETAILS_FRAGMENT as _,GIFT_CARD_DETAILS_FRAGMENT as o,ORDER_ITEM_DETAILS_FRAGMENT as c,GIFT_MESSAGE_FRAGMENT as G,GIFT_WRAPPING_FRAGMENT as n}from"../fragments.js";import{t as u}from"./initialize.js";import{f as A}from"./fetch-graphql.js";const S=`
  query GET_CUSTOMER_ORDERS_RETURN($currentPage: Int, $pageSize: Int) {
    customer {
      returns(currentPage: $currentPage, pageSize: $pageSize) {
        page_info {
          page_size
          total_pages
          current_page
        }
        ...RETURNS_FRAGMENT
      }
    }
  }
  ${a}
  ${T}
  ${_}
  ${o}
  ${c}
  ${G}
  ${n}
`,I=async(e=10,R=1)=>await A(S,{method:"GET",cache:"force-cache",variables:{pageSize:e,currentPage:R}}).then(r=>{var t;return u((t=r==null?void 0:r.data)==null?void 0:t.customer.returns)}).catch(E);export{I as g};
//# sourceMappingURL=getCustomerOrdersReturn.js.map
