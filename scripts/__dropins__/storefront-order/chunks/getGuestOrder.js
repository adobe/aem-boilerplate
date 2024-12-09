/*! Copyright 2024 Adobe
All Rights Reserved. */
import{h as E}from"./network-error.js";import{f as i,h}from"./fetch-graphql.js";import{GUEST_ORDER_FRAGMENT as n}from"../fragments.js";import{d as o}from"./initialize.js";const G=t=>{var a,r,m,c,u,e;return{email:((r=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:r.email)||"",firstname:((c=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:c.firstname)||"",lastname:((e=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:e.lastname)||""}},f=`
  query GET_CUSTOMER {
    customer {
      firstname
      lastname
      email
    }
  }
`,_=async()=>await i(f,{method:"GET",cache:"force-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?h(t.errors):G(t)}).catch(E),T=`
  query GET_GUEST_ORDER($input: GuestOrderInformationInput!) {
    guestOrder(input: $input) {
      ...GUEST_ORDER_FRAGMENT
    }
  }
  ${n}
`,S=async t=>await i(T,{method:"GET",cache:"no-cache",variables:{input:t}}).then(a=>o(a)).catch(E);export{S as a,_ as g};
