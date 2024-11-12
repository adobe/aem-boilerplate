/*! Copyright 2024 Adobe
All Rights Reserved. */
import{M as r,a as o,d as e}from"./fetch-graphql.js";import{CHECKOUT_DATA_FRAGMENT as n}from"../fragments.js";import{s}from"./store-config.js";import{t as i}from"./synchronizeCheckout.js";import"./ServerErrorSignal.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const m=`
  mutation setPaymentMethod($cartId: String!, $paymentMethod: String!) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: { code: $paymentMethod } }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${n}
`,f=async t=>{const a=s.cartId;if(!a)throw new r;if(!t)throw new o;return await e({type:"mutation",query:m,options:{variables:{cartId:a,paymentMethod:t}},path:"setPaymentMethodOnCart.cart",signalType:"cart",transformer:i})};export{f as s};
