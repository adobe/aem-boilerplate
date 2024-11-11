/*! Copyright 2024 Adobe
All Rights Reserved. */
import{M as e,b as o,d as l}from"./fetch-graphql.js";import{CHECKOUT_DATA_FRAGMENT as d}from"../fragments.js";import{s as p}from"./store-config.js";import{a as f,t as m}from"./synchronizeCheckout.js";import"./ServerErrorSignal.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const _=`
  mutation setBillingAddress($input: SetBillingAddressOnCartInput!) {
    setBillingAddressOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${d}
`,M=async({address:r,customerAddressId:t,sameAsShipping:s=!1,useForShipping:n=!1})=>{const a=p.cartId;if(!a)throw new e;const i={cart_id:a,billing_address:{same_as_shipping:s,use_for_shipping:n}};if(!s&&t&&(i.billing_address.customer_address_id=t),!s&&!t){if(!r)throw new o;i.billing_address.address=f(r)}return await l({type:"mutation",query:_,options:{variables:{input:i}},path:"setBillingAddressOnCart.cart",signalType:"cart",transformer:m})};export{_ as a,M as s};
