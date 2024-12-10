/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as e,M as r,e as o,d as n}from"./fetch-graphql.js";import{CHECKOUT_DATA_FRAGMENT as s}from"../fragments.js";import{b as i}from"./synchronizeCheckout.js";import"./store-config.js";import"./ServerErrorSignal.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const m=`
  mutation setPaymentMethod(
    $cartId: String!
    $paymentMethod: PaymentMethodInput!
  ) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: $paymentMethod }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${s}
`,f=async t=>{const a=e.cartId;if(!a)throw new r;if(!t)throw new o;return await n({options:{variables:{cartId:a,paymentMethod:t}},path:"setPaymentMethodOnCart.cart",query:m,queueName:"cartUpdate",signalType:"cart",transformer:i,type:"mutation"})};export{f as s};
