/*! Copyright 2025 Adobe
All Rights Reserved. */
import{CHECKOUT_DATA_FRAGMENT as e}from"../fragments.js";import{b as r}from"./synchronizeCheckout.js";import{s as o,M as n,o as s,d as m,Q as i}from"./errors.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const d=`
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

  ${e}
`,u=async t=>{const a=o.cartId;if(!a)throw new n;if(!t)throw new s;return await m({options:{variables:{cartId:a,paymentMethod:t}},path:"setPaymentMethodOnCart.cart",query:d,queueName:i.CartUpdate,transformer:r,type:"mutation"})};export{u as s};
