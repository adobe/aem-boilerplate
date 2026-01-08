/*! Copyright 2026 Adobe
All Rights Reserved. */
import{CUSTOMER_FRAGMENT as o,CHECKOUT_DATA_FRAGMENT as n}from"../fragments.js";import{s as m,d as r,u as l,p as u,Q as c}from"./fetch-graphql.js";import{merge as E}from"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{c as p,t as f}from"./synchronizeCheckout.js";const C=t=>{var i,a,s;if(!t)return null;const e={firstName:t.firstname||"",lastName:t.lastname||"",email:t.email||""};return E(e,(s=(a=(i=p.getConfig().models)==null?void 0:i.CustomerModel)==null?void 0:a.transformer)==null?void 0:s.call(a,t))},y=t=>!!(t!=null&&t.is_email_available),A=`
  query getCustomer {
    customer {
      ...CUSTOMER_FRAGMENT
    }
  }

  ${o}
`,M=async()=>m.authenticated?await r({options:{method:"GET",cache:"no-cache"},path:"customer",query:A,transformer:C,type:"query"}):null,g=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,q=async t=>{if(!t)throw new l;return await r({options:{method:"GET",cache:"no-cache",variables:{email:t}},path:"isEmailAvailable",query:g,transformer:y,type:"query"})},h=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${n}
`,N=async t=>{const e=m.cartId;if(!e)throw new u;return await r({options:{variables:{cartId:e,email:t}},path:"setGuestEmailOnCart.cart",query:h,queueName:c.Updates,transformer:f,type:"mutation"})};export{M as g,q as i,N as s};
//# sourceMappingURL=setGuestEmailOnCart.js.map
