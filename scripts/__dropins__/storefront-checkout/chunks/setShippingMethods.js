/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as i,M as p,d as s}from"./fetch-graphql.js";import"./store-config.js";import"./ServerErrorSignal.js";import{b as r}from"./synchronizeCheckout.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as o}from"../fragments.js";const e=`
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
`,C=async a=>{const t=i.cartId;if(!t)throw new p;return await s({type:"mutation",query:e,queueName:"cartUpdate",options:{variables:{cartId:t,shippingMethods:a}},path:"setShippingMethodsOnCart.cart",signalType:"cart",transformer:r})};export{C as s};
