/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as r}from"./store-config.js";import"./ServerErrorSignal.js";import{M as s,d as p}from"./fetch-graphql.js";import{t as a}from"./synchronizeCheckout.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as o}from"../fragments.js";const n=`
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
`,C=async i=>{const t=r.cartId;if(!t)throw new s;return await p({type:"mutation",query:n,options:{variables:{cartId:t,shippingMethods:i}},path:"setShippingMethodsOnCart.cart",signalType:"cart",transformer:a})};export{C as s};
