/*! Copyright 2025 Adobe
All Rights Reserved. */
import{CHECKOUT_DATA_FRAGMENT as e}from"../fragments.js";import{a as o,b as d}from"./synchronizeCheckout.js";import{s as l}from"./subscription-email-statuses.js";import{M as p,o as m,d as u,Q as f}from"./IsBillToShippingSignal.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const _=`
  mutation setBillingAddress($input: SetBillingAddressOnCartInput!) {
    setBillingAddressOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${e}
`,T=async({address:r,customerAddressId:t,sameAsShipping:s=!1,useForShipping:n=!1})=>{const a=l.cartId;if(!a)throw new p;const i={cart_id:a,billing_address:{same_as_shipping:s,use_for_shipping:n}};if(!s&&t&&(i.billing_address.customer_address_id=t),!s&&!t){if(!r)throw new m;i.billing_address.address=o(r)}return await u({options:{variables:{input:i}},path:"setBillingAddressOnCart.cart",query:_,queueName:f.CartUpdate,transformer:d,type:"mutation"})};export{T as s};
