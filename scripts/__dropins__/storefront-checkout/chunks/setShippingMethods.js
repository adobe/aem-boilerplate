/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as r}from"./subscription-email-statuses.js";import{b as i}from"./synchronizeCheckout.js";import"@dropins/tools/lib.js";import{M as n,d as e,Q as s}from"./IsBillToShippingSignal.js";import"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as p}from"../fragments.js";const C=t=>({countryCode:t.country_id,postCode:t.postcode||"",...t.region_id?{regionId:Number(t.region_id)}:{...t.region?{region:t.region}:{}}}),M=t=>({carrierCode:t.carrier.code||"",methodCode:t.code||"",amount:t.amount,amountExclTax:t.amountExclTax,amountInclTax:t.amountInclTax}),a=`
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
`,S=async t=>{const o=r.cartId;if(!o)throw new n;return await e({type:"mutation",query:a,queueName:s.CartUpdate,options:{variables:{cartId:o,shippingMethods:t}},path:"setShippingMethodsOnCart.cart",transformer:i})};export{C as a,S as s,M as t};
