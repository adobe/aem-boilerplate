/*! Copyright 2025 Adobe
All Rights Reserved. */
import{M as e,d as r}from"./errors.js";import{CHECKOUT_DATA_FRAGMENT as o}from"../fragments.js";import{d as n,b as s}from"./synchronizeCheckout.js";import{s as m}from"./state.js";import"./transform-store-config.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const i=`
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

  ${o}
`,f=async t=>{const a=m.cartId;if(!a)throw new e;if(!t)throw new r;return await n({options:{variables:{cartId:a,paymentMethod:t}},path:"setPaymentMethodOnCart.cart",query:i,queueName:"cartUpdate",signalType:"cart",transformer:s,type:"mutation"})};export{f as s};
