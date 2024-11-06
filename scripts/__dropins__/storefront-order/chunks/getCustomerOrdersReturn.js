import{h as R}from"./network-error.js";import{f as e,h as E}from"./fetch-graphql.js";import{R as _,P as T,a as o,G as s,O as c,t as u}from"./transform-order-details.js";const h=`
query GET_CUSTOMER_ORDERS_RETURN {
 customer {
  returns {
    page_info {
      page_size
      total_pages
      current_page
    }
    ...OrderReturns
  }
 }
}
${_}
${T}
${o}
${s}
${c}
`,A=async()=>await e(h,{method:"GET",cache:"force-cache"}).then(r=>{var t,a;return(t=r.errors)!=null&&t.length?E(r.errors):u((a=r==null?void 0:r.data)==null?void 0:a.customer.returns)}).catch(R);export{A as g};
