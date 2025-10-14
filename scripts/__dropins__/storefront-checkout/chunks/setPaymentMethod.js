/*! Copyright 2025 Adobe
All Rights Reserved. */
import{CHECKOUT_DATA_FRAGMENT as d,NEGOTIABLE_QUOTE_FRAGMENT as i}from"../fragments.js";import{e as p,a as M,b as y}from"./guards.js";import{t as c,e as h}from"./synchronizeCheckout.js";import{s as e,k as I,d as P,Q as C}from"./fetch-graphql.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";const T=`
  mutation setPaymentMethodOnCart(
    $cartId: String!
    $input: PaymentMethodInput!
  ) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: $input }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${d}
`,O=`
  mutation setPaymentMethodOnQuote(
    $quoteId: ID!
    $input: NegotiableQuotePaymentMethodInput!
  ) {
    setNegotiableQuotePaymentMethod(
      input: { quote_uid: $quoteId, payment_method: $input }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${i}
`,n=(t,a,o,r,s,u)=>async m=>await P({type:"mutation",query:o,options:{variables:{[a]:t,input:s(m)}},path:u,queueName:C.Updates,transformer:r}),E=t=>{if(!t.code)throw new I},f=async t=>(p(),E(t),await(!!e.cartId?n(e.cartId,"cartId",T,c,M,"setPaymentMethodOnCart.cart"):n(e.quoteId,"quoteId",O,h,y,"setNegotiableQuotePaymentMethod.quote"))(t));export{f as s};
//# sourceMappingURL=setPaymentMethod.js.map
