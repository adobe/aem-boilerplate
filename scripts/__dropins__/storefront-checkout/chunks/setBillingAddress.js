/*! Copyright 2025 Adobe
All Rights Reserved. */
import{CHECKOUT_DATA_FRAGMENT as e}from"../fragments.js";import{a as d,b as l}from"./synchronizeCheckout.js";import{s as o,M as p,p as u,d as _,Q as f}from"./errors.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const m=`
  mutation setBillingAddress($input: SetBillingAddressOnCartInput!) {
    setBillingAddressOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${e}
`,M=async({address:a,customerAddressId:s,sameAsShipping:t=!1,useForShipping:n=!1})=>{const r=o.cartId;if(!r)throw new p;const i={cart_id:r,billing_address:{same_as_shipping:t,use_for_shipping:n}};if(!t&&s&&(i.billing_address.customer_address_id=s),!t&&!s){if(!a)throw new u;i.billing_address.address=d(a)}return await _({options:{variables:{input:i}},path:"setBillingAddressOnCart.cart",query:m,queueName:f.CartUpdate,transformer:l,type:"mutation"})};export{M as s};
