/*! Copyright 2024 Adobe
All Rights Reserved. */
import{M as r,d as i}from"./fetch-graphql.js";import{CHECKOUT_DATA_FRAGMENT as s}from"../fragments.js";import{s as m}from"./store-config.js";import{t as o}from"./synchronizeCheckout.js";import"./ServerErrorSignal.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const e=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${s}
`,d=async a=>{const t=m.cartId;if(!t)throw new r;return await i({type:"mutation",query:e,options:{variables:{cartId:t,email:a}},path:"setGuestEmailOnCart.cart",signalType:"cart",transformer:o})};export{d as s};
