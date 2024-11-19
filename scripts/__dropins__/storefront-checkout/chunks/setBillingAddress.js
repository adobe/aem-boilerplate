/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as o,M as d,f as l,d as p}from"./fetch-graphql.js";import{CHECKOUT_DATA_FRAGMENT as u}from"../fragments.js";import{a as c,b as f}from"./synchronizeCheckout.js";import"./store-config.js";import"./ServerErrorSignal.js";import{events as m}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const _=`
  mutation setBillingAddress($input: SetBillingAddressOnCartInput!) {
    setBillingAddressOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${u}
`,b=async({address:a,customerAddressId:t,sameAsShipping:s=!1,useForShipping:e=!1})=>{const r=o.cartId;if(!r)throw new d;const i={cart_id:r,billing_address:{same_as_shipping:s,use_for_shipping:e}};if(!s&&t&&(i.billing_address.customer_address_id=t),!s&&!t){if(!a)throw new l;i.billing_address.address=c(a)}const n=await p({type:"mutation",query:_,options:{variables:{input:i}},path:"setBillingAddressOnCart.cart",signalType:"cart",transformer:f});return m.emit("checkout/updated",n||null),n};export{_ as a,b as s};
