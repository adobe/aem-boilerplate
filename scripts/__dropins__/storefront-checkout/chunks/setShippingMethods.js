/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as r}from"./state.js";import"./transform-store-config.js";import{M as i}from"./errors.js";import{d as n,b as e}from"./synchronizeCheckout.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as s}from"../fragments.js";const M=t=>({countryCode:t.country_id,postCode:t.postcode||"",...t.region_id?{regionId:Number(t.region_id)}:{...t.region?{region:t.region}:{}}}),T=t=>({carrierCode:t.carrier.code||"",methodCode:t.code||"",amount:t.amount,amountExclTax:t.amountExclTax,amountInclTax:t.amountInclTax}),a=`
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

  ${s}
`,S=async t=>{const o=r.cartId;if(!o)throw new i;return await n({type:"mutation",query:a,queueName:"cartUpdate",options:{variables:{cartId:o,shippingMethods:t}},path:"setShippingMethodsOnCart.cart",signalType:"cart",transformer:e})};export{M as a,S as s,T as t};
