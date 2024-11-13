/*! Copyright 2024 Adobe
All Rights Reserved. */
import{h as R}from"./network-error.js";import{f as E,h as _}from"./fetch-graphql.js";import{R as T,P as o,a as s,G as c,O as u,t as h}from"./transform-order-details.js";const n=`
query GET_CUSTOMER_ORDERS_RETURN($pageSize: Int) {
 customer {
  returns(pageSize: $pageSize) {
    page_info {
      page_size
      total_pages
      current_page
    }
    ...OrderReturns
  }
 }
}
${T}
${o}
${s}
${c}
${u}
`,G=async(e=50)=>await E(n,{method:"GET",cache:"force-cache",variables:{pageSize:e}}).then(r=>{var t,a;return(t=r.errors)!=null&&t.length?_(r.errors):h((a=r==null?void 0:r.data)==null?void 0:a.customer.returns)}).catch(R);export{G as g};
