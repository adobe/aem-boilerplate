/*! Copyright 2026 Adobe
All Rights Reserved. */
import{h as i}from"./network-error.js";import{f as h,h as o}from"./fetch-graphql.js";import{GUEST_ORDER_FRAGMENT as E}from"../fragments.js";import{b as n}from"./initialize.js";const G=t=>{var r,a,m,c,e,u;return{email:((a=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:a.email)||"",firstname:((c=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:c.firstname)||"",lastname:((u=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:u.lastname)||""}},f=`
  query GET_CUSTOMER {
    customer {
      firstname
      lastname
      email
    }
  }
`,_=async()=>await h(f,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?o(t.errors):G(t)}).catch(i),l=`
  query GET_GUEST_ORDER($input: GuestOrderInformationInput!) {
    guestOrder(input: $input) {
      ...GUEST_ORDER_FRAGMENT
    }
  }
  ${E}
`,g=async t=>await h(l,{method:"GET",cache:"no-cache",variables:{input:t}}).then(r=>{var a;return(a=r.errors)!=null&&a.length&&r.errors[0].message==="Please login to view the order."?o(r.errors):n(r)}).catch(i);export{g as a,_ as g};
//# sourceMappingURL=getGuestOrder.js.map
