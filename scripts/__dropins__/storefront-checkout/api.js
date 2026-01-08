/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as A,c as G,g as S,b as T,i as k,d as y,r as O,s as F}from"./chunks/synchronizeCheckout.js";import{e as b,s as H}from"./chunks/setShippingAddress.js";import{d as o}from"./chunks/fetch-graphql.js";import{D as Q,S as U,f as R,g as q,e as v,j as z,r as D,a as K,b as L,c as j}from"./chunks/fetch-graphql.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{A as s}from"./chunks/checkout.js";import{g as B}from"./chunks/getCompanyCredit.js";import{g as P,i as V,s as Y}from"./chunks/setGuestEmailOnCart.js";import{s as W}from"./chunks/setBillingAddress.js";import{s as Z}from"./chunks/setPaymentMethod.js";import{s as ee,s as te}from"./chunks/setShippingMethods.js";import"./fragments.js";import"./chunks/transform-shipping-methods.js";import"./chunks/classifiers.js";import"./chunks/transform-shipping-estimate.js";import"./chunks/values.js";import"./chunks/guards.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const r=t=>t?t.filter(e=>!!e).map(e=>({id:e.agreement_id,name:e.name,mode:s[e.mode],text:e.checkbox_text,content:{value:e.content,html:e.is_html,height:e.content_height??null}})):[],a=`
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
`,E=async()=>await o({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:a,transformer:r,type:"query"});export{Q as DEFAULT_COUNTRY,U as STORE_CONFIG_DEFAULTS,A as authenticateCustomer,G as config,b as estimateShippingMethods,R as fetchGraphQl,S as getCart,E as getCheckoutAgreements,B as getCompanyCredit,q as getConfig,P as getCustomer,T as getNegotiableQuote,v as getStoreConfig,z as getStoreConfigCache,k as initialize,y as initializeCheckout,V as isEmailAvailable,D as removeFetchGraphQlHeader,O as resetCheckout,W as setBillingAddress,K as setEndpoint,L as setFetchGraphQlHeader,j as setFetchGraphQlHeaders,Y as setGuestEmailOnCart,Z as setPaymentMethod,H as setShippingAddress,ee as setShippingMethods,te as setShippingMethodsOnCart,F as synchronizeCheckout};
//# sourceMappingURL=api.js.map
