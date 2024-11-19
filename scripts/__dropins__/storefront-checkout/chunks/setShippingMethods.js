/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as a,M as p,d as r}from"./fetch-graphql.js";import"./store-config.js";import"./ServerErrorSignal.js";import{b as o}from"./synchronizeCheckout.js";import"@dropins/tools/lib.js";import{events as n}from"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as e}from"../fragments.js";const h=`
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

  ${e}
`,f=async s=>{const t=a.cartId;if(!t)throw new p;const i=await r({type:"mutation",query:h,options:{variables:{cartId:t,shippingMethods:s}},path:"setShippingMethodsOnCart.cart",signalType:"cart",transformer:o});return n.emit("checkout/updated",i||null),i};export{f as s};
