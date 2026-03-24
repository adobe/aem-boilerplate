/*! Copyright 2026 Adobe
All Rights Reserved. */
import{h as E}from"./network-error.js";import{f as i,h}from"./fetch-graphql.js";import{GUEST_ORDER_FRAGMENT as o,RETURNS_FRAGMENT as n}from"../fragments.js";import{b as G}from"./initialize.js";const R=t=>{var r,a,m,e,c,u;return{email:((a=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:a.email)||"",firstname:((e=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:e.firstname)||"",lastname:((u=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:u.lastname)||""}},T=`
  query GET_CUSTOMER {
    customer {
      firstname
      lastname
      email
    }
  }
`,g=async()=>await i(T,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):R(t)}).catch(E),f=`
  query GET_GUEST_ORDER($input: GuestOrderInformationInput!) {
    guestOrder(input: $input) {
      ...GUEST_ORDER_FRAGMENT
      returns {
        ...RETURNS_FRAGMENT
      }
    }
  }
  ${o}
  ${n}
`,S=async t=>await i(f,{method:"GET",cache:"no-cache",variables:{input:t}}).then(r=>{var a;return(a=r.errors)!=null&&a.length&&r.errors[0].message==="Please login to view the order."?h(r.errors):G(r)}).catch(E);export{S as a,g};
//# sourceMappingURL=getGuestOrder.js.map
