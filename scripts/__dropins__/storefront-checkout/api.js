/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as A,c as x,g as G,b as S,i as T,d as k,r as O,s as y}from"./chunks/synchronizeCheckout.js";import{e as M,s as b}from"./chunks/setShippingAddress.js";import{d as s}from"./chunks/fetch-graphql.js";import{D as N,S as Q,f as U,g as R,i as q,j as v,r as z,b as D,c as K,e as L}from"./chunks/fetch-graphql.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{A as o}from"./chunks/checkout.js";import{g as w,i as B,s as I}from"./chunks/setGuestEmailOnCart.js";import{s as V}from"./chunks/setBillingAddress.js";import{s as J}from"./chunks/setPaymentMethod.js";import{s as X,s as Z}from"./chunks/setShippingMethods.js";import"./fragments.js";import"./chunks/transform-shipping-methods.js";import"./chunks/transform-shipping-estimate.js";import"./chunks/values.js";import"./chunks/guards.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const r=t=>t?t.filter(e=>!!e).map(e=>({id:e.agreement_id,name:e.name,mode:o[e.mode],text:e.checkbox_text,content:{value:e.content,html:e.is_html,height:e.content_height??null}})):[],a=`
  query GET_CHECKOUT_AGREEMENTS {
    checkoutAgreements {
      agreement_id
      checkbox_text
      content
      content_height
      is_html
      mode
      name
    }
  }
`,f=async()=>await s({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:a,transformer:r,type:"query"});export{N as DEFAULT_COUNTRY,Q as STORE_CONFIG_DEFAULTS,A as authenticateCustomer,x as config,M as estimateShippingMethods,U as fetchGraphQl,G as getCart,f as getCheckoutAgreements,R as getConfig,w as getCustomer,S as getNegotiableQuote,q as getStoreConfig,v as getStoreConfigCache,T as initialize,k as initializeCheckout,B as isEmailAvailable,z as removeFetchGraphQlHeader,O as resetCheckout,V as setBillingAddress,D as setEndpoint,K as setFetchGraphQlHeader,L as setFetchGraphQlHeaders,I as setGuestEmailOnCart,J as setPaymentMethod,b as setShippingAddress,X as setShippingMethods,Z as setShippingMethodsOnCart,y as synchronizeCheckout};
//# sourceMappingURL=api.js.map
