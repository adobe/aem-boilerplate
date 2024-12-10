/*! Copyright 2024 Adobe
All Rights Reserved. */
import{c as e,j as r,m as s,s as l,M as o,d as n}from"./fetch-graphql.js";import"./store-config.js";import"./ServerErrorSignal.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as m}from"../fragments.js";import{b as c}from"./synchronizeCheckout.js";const u=a=>!!(a!=null&&a.is_email_available),p=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,E=a=>{if(!(!a||a.length===0))throw Error(a.map(t=>t.message).join(" "))},_=async a=>{if(!a)throw new e;const{data:t,errors:i}=await r(p,{method:"GET",cache:"no-cache",variables:{email:a}}).catch(s);return i&&E(i),u(t.isEmailAvailable)},h=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${m}
`,g=async a=>{const t=l.cartId;if(!t)throw new o;return await n({options:{variables:{cartId:t,email:a}},path:"setGuestEmailOnCart.cart",query:h,queueName:"cartUpdate",signalType:"cart",transformer:c,type:"mutation"})};export{_ as i,g as s};
