/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as R}from"./network-error.js";import{RETURNS_FRAGMENT as E,PRODUCT_DETAILS_FRAGMENT as T,PRICE_DETAILS_FRAGMENT as _,GIFT_CARD_DETAILS_FRAGMENT as o,ORDER_ITEM_DETAILS_FRAGMENT as c}from"../fragments.js";import{t as n}from"./initialize.js";import{f as u}from"./fetch-graphql.js";const m=`
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
  ${E}
  ${T}
  ${_}
  ${o}
  ${c}
`,A=async(e=10,a=1)=>await u(m,{method:"GET",cache:"force-cache",variables:{pageSize:e,currentPage:a}}).then(r=>{var t;return n((t=r==null?void 0:r.data)==null?void 0:t.customer.returns)}).catch(R);export{A as g};
