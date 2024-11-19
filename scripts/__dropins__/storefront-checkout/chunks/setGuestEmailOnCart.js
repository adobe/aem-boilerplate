/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as i,M as s,d as e}from"./fetch-graphql.js";import{CHECKOUT_DATA_FRAGMENT as o}from"../fragments.js";import{b as m}from"./synchronizeCheckout.js";import"./store-config.js";import"./ServerErrorSignal.js";import{events as n}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const c=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${o}
`,A=async r=>{const t=i.cartId;if(!t)throw new s;const a=await e({type:"mutation",query:c,options:{variables:{cartId:t,email:r}},path:"setGuestEmailOnCart.cart",signalType:"cart",transformer:m});return n.emit("checkout/updated",a||null),a};export{A as s};
