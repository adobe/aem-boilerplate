/*! Copyright 2024 Adobe
All Rights Reserved. */
import{M as e,e as o}from"./errors.js";import{CHECKOUT_DATA_FRAGMENT as d}from"../fragments.js";import{a as l,d as p,b as u}from"./synchronizeCheckout.js";import{s as m}from"./store-config.js";import"./transform-store-config.js";import"./ServerErrorSignal.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const c=`
  mutation setBillingAddress($input: SetBillingAddressOnCartInput!) {
    setBillingAddressOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${d}
`,b=async({address:i,customerAddressId:t,sameAsShipping:s=!1,useForShipping:n=!1})=>{const r=m.cartId;if(!r)throw new e;const a={cart_id:r,billing_address:{same_as_shipping:s,use_for_shipping:n}};if(!s&&t&&(a.billing_address.customer_address_id=t),!s&&!t){if(!i)throw new o;a.billing_address.address=l(i)}return await p({options:{variables:{input:a}},path:"setBillingAddressOnCart.cart",query:c,queueName:"cartUpdate",signalType:"cart",transformer:u,type:"mutation"})};export{c as a,b as s};
