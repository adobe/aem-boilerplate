/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as r}from"./store-config.js";import{j as e}from"./transform-store-config.js";import{c as s,M as l}from"./errors.js";import{j as o,d as m,b as n}from"./synchronizeCheckout.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as c}from"../fragments.js";const u=a=>!!(a!=null&&a.is_email_available),p=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,E=a=>{if(!(!a||a.length===0))throw Error(a.map(t=>t.message).join(" "))},_=async a=>{if(!a)throw new s;const{data:t,errors:i}=await e(p,{method:"GET",cache:"no-cache",variables:{email:a}}).catch(o);return i&&E(i),u(t.isEmailAvailable)},h=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${c}
`,g=async a=>{const t=r.cartId;if(!t)throw new l;return await m({options:{variables:{cartId:t,email:a}},path:"setGuestEmailOnCart.cart",query:h,queueName:"cartUpdate",signalType:"cart",transformer:n,type:"mutation"})};export{_ as i,g as s};
