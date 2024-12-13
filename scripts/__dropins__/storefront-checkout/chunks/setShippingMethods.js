/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as i}from"./store-config.js";import"./transform-store-config.js";import"./ServerErrorSignal.js";import{M as p}from"./errors.js";import{d as r,b as s}from"./synchronizeCheckout.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as o}from"../fragments.js";const e=`
  mutation setShippingMethods(
    $cartId: String!
    $shippingMethods: [ShippingMethodInput]!
  ) {
    setShippingMethodsOnCart(
      input: { cart_id: $cartId, shipping_methods: $shippingMethods }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${o}
`,f=async a=>{const t=i.cartId;if(!t)throw new p;return await r({type:"mutation",query:e,queueName:"cartUpdate",options:{variables:{cartId:t,shippingMethods:a}},path:"setShippingMethodsOnCart.cart",signalType:"cart",transformer:s})};export{f as s};
