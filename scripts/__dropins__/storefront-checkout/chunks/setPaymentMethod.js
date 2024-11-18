/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as r,M as o,e as n,d as s}from"./fetch-graphql.js";import{CHECKOUT_DATA_FRAGMENT as i}from"../fragments.js";import{b as m}from"./synchronizeCheckout.js";import"./store-config.js";import"./ServerErrorSignal.js";import{events as d}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const p=`
  mutation setPaymentMethod($cartId: String!, $paymentMethod: String!) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: { code: $paymentMethod } }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${i}
`,A=async t=>{const a=r.cartId;if(!a)throw new o;if(!t)throw new n;const e=await s({type:"mutation",query:p,options:{variables:{cartId:a,paymentMethod:t}},path:"setPaymentMethodOnCart.cart",signalType:"cart",transformer:m});return d.emit("checkout/updated",e||null),e};export{A as s};
