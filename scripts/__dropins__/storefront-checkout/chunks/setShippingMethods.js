/*! Copyright 2025 Adobe
All Rights Reserved. */
import{CHECKOUT_DATA_FRAGMENT as r,NEGOTIABLE_QUOTE_FRAGMENT as h}from"../fragments.js";import{e as d,t as u}from"./guards.js";import{t as M,e as g}from"./synchronizeCheckout.js";import{s as e,M as m,d as c,Q as I}from"./fetch-graphql.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";const S=`
  mutation setShippingMethodsOnCart(
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

  ${r}
`,A=`
  mutation setShippingMethodsOnQuote(
    $quoteId: ID!
    $shippingMethods: [ShippingMethodInput]!
  ) {
    setNegotiableQuoteShippingMethods(
      input: { quote_uid: $quoteId, shipping_methods: $shippingMethods }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${h}
`,o=(t,s,i,n,p)=>async a=>await c({type:"mutation",query:i,queueName:I.Updates,options:{variables:{[s]:t,shippingMethods:u(a)}},path:p,transformer:n}),C=t=>{if(!Array.isArray(t)||t.length===0)throw new m},Q=async t=>(d(),C(t),await(!!e.cartId?o(e.cartId,"cartId",S,M,"setShippingMethodsOnCart.cart"):o(e.quoteId,"quoteId",A,g,"setNegotiableQuoteShippingMethods.quote"))(t));export{Q as s};
//# sourceMappingURL=setShippingMethods.js.map
