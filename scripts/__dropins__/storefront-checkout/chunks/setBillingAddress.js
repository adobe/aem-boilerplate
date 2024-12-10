/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as e,M as d,f as o,d as l}from"./fetch-graphql.js";import{CHECKOUT_DATA_FRAGMENT as p}from"../fragments.js";import{a as u,b as c}from"./synchronizeCheckout.js";import"./store-config.js";import"./ServerErrorSignal.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const f=`
  mutation setBillingAddress($input: SetBillingAddressOnCartInput!) {
    setBillingAddressOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${p}
`,h=async({address:i,customerAddressId:t,sameAsShipping:s=!1,useForShipping:n=!1})=>{const r=e.cartId;if(!r)throw new d;const a={cart_id:r,billing_address:{same_as_shipping:s,use_for_shipping:n}};if(!s&&t&&(a.billing_address.customer_address_id=t),!s&&!t){if(!i)throw new o;a.billing_address.address=u(i)}return await l({options:{variables:{input:a}},path:"setBillingAddressOnCart.cart",query:f,queueName:"cartUpdate",signalType:"cart",transformer:c,type:"mutation"})};export{f as a,h as s};
