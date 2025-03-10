/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as r}from"./state.js";import{g as e}from"./transform-store-config.js";import{c as s,M as l}from"./errors.js";import{j as o,d as m,b as n}from"./synchronizeCheckout.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as c}from"../fragments.js";const u=a=>!!(a!=null&&a.is_email_available),p=a=>{if(!(!a||a.length===0))throw Error(a.map(t=>t.message).join(" "))},E=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,G=async a=>{if(!a)throw new s;const{data:t,errors:i}=await e(E,{method:"GET",cache:"no-cache",variables:{email:a}}).catch(o);return i&&p(i),u(t.isEmailAvailable)},h=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${c}
`,_=async a=>{const t=r.cartId;if(!t)throw new l;return await m({options:{variables:{cartId:t,email:a}},path:"setGuestEmailOnCart.cart",query:h,queueName:"cartUpdate",signalType:"cart",transformer:n,type:"mutation"})};export{p as h,G as i,_ as s};
