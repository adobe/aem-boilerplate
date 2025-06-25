/*! Copyright 2025 Adobe
All Rights Reserved. */
import{CUSTOMER_FRAGMENT as o,CHECKOUT_DATA_FRAGMENT as n}from"../fragments.js";import{s as m,d as r,m as l,M as u,Q as c}from"./errors.js";import"@dropins/tools/event-bus.js";import{merge as E}from"@dropins/tools/lib.js";import{c as f,b as p}from"./synchronizeCheckout.js";const C=t=>{var i,e,s;if(!t)return null;const a={firstName:t.firstname||"",lastName:t.lastname||"",email:t.email||""};return E(a,(s=(e=(i=f.getConfig().models)==null?void 0:i.CustomerModel)==null?void 0:e.transformer)==null?void 0:s.call(e,t))},y=t=>!!(t!=null&&t.is_email_available),A=`
  query getCustomer {
    customer {
      ...CUSTOMER_FRAGMENT
    }
  }

  ${o}
`,v=async()=>m.authenticated?await r({options:{method:"GET",cache:"no-cache"},path:"customer",query:A,transformer:C,type:"query"}):null,g=`
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
`,N=async t=>{const a=m.cartId;if(!a)throw new u;return await r({options:{variables:{cartId:a,email:t}},path:"setGuestEmailOnCart.cart",query:h,queueName:c.CartUpdate,transformer:p,type:"mutation"})};export{v as g,q as i,N as s};
