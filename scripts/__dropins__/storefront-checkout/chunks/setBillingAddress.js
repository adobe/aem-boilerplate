/*! Copyright 2026 Adobe
All Rights Reserved. */
import{CHECKOUT_DATA_FRAGMENT as A,NEGOTIABLE_QUOTE_FRAGMENT as I}from"../fragments.js";import{e as g,c as p,d as c}from"./guards.js";import{t as m,e as B}from"./synchronizeCheckout.js";import{s as r,d as f,Q as C,I as o,m as a}from"./fetch-graphql.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";const Q=`
  mutation setBillingAddress(
    $cartId: String!
    $billingAddress: BillingAddressInput!
  ) {
    setBillingAddressOnCart(
      input: { cart_id: $cartId, billing_address: $billingAddress }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${A}
`,T=`
  mutation setBillingAddressOnQuote(
    $quoteId: ID!
    $billingAddress: NegotiableQuoteBillingAddressInput!
  ) {
    setNegotiableQuoteBillingAddress(
      input: { quote_uid: $quoteId, billing_address: $billingAddress }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${I}
`,n=(t,s,e,i,d,l)=>async u=>await f({type:"mutation",query:e,options:{variables:{[s]:t,billingAddress:d(u)}},path:l,queueName:C.Updates,transformer:i}),b=({address:t,customerAddressId:s,customerAddressUid:e,sameAsShipping:i=!1})=>{if(!s&&e)throw new o("customerAddressUid is not supported");if(!i&&!s&&!t)throw new a},E=({address:t,customerAddressId:s,customerAddressUid:e,sameAsShipping:i=!1})=>{if(!e&&s)throw new o("customerAddressId is not supported");if(!i&&!e&&!t)throw new a},N=t=>{const s=!!r.cartId,e=!!r.quoteId;s?b(t):e&&E(t)},G=async t=>(g(),N(t),await(!!r.cartId?n(r.cartId,"cartId",Q,m,p,"setBillingAddressOnCart.cart"):n(r.quoteId,"quoteId",T,B,c,"setNegotiableQuoteBillingAddress.quote"))(t));export{G as s};
//# sourceMappingURL=setBillingAddress.js.map
