/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as r,M as i,d as n,Q as e}from"./errors.js";import{b as s}from"./synchronizeCheckout.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as p}from"../fragments.js";const g=t=>({countryCode:t.country_id,postCode:t.postcode||"",...t.region_id?{regionId:Number(t.region_id)}:{...t.region?{region:t.region}:{}}}),C=t=>({carrierCode:t.carrier.code||"",methodCode:t.code||"",amount:t.amount,amountExclTax:t.amountExclTax,amountInclTax:t.amountInclTax}),a=`
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

  ${p}
`,M=async t=>{const o=r.cartId;if(!o)throw new i;return await n({type:"mutation",query:a,queueName:e.CartUpdate,options:{variables:{cartId:o,shippingMethods:t}},path:"setShippingMethodsOnCart.cart",transformer:s})};export{g as a,M as s,C as t};
