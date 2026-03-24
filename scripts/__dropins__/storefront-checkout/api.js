/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as G,c as S,g as T,b as k,i as y,d as O,r as F,s as M}from"./chunks/synchronizeCheckout.js";import{e as H,s as N}from"./chunks/setShippingAddress.js";import{d as o}from"./chunks/fetch-graphql.js";import{D as U,S as R,f as q,g as v,e as z,j as D,r as K,a as L,b as j,c as w}from"./chunks/fetch-graphql.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{A as s}from"./chunks/checkout.js";import{g as I}from"./chunks/getCompanyCredit.js";import{g as V,i as Y,s as J}from"./chunks/setGuestEmailOnCart.js";import{s as X}from"./chunks/setBillingAddress.js";import{s as $}from"./chunks/setPaymentMethod.js";import{s as et,s as ot}from"./chunks/setShippingMethods.js";import"./fragments.js";import"./chunks/transform-shipping-methods.js";import"./chunks/classifiers.js";import"./chunks/transform-shipping-estimate.js";import"./chunks/cjs.js";import"./chunks/values.js";import"./chunks/guards.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const r=e=>e?e.filter(t=>!!t).map(t=>({id:t.agreement_id,name:t.name,mode:s[t.mode],text:t.checkbox_text,content:{value:t.content,html:t.is_html,height:t.content_height??null}})):[],a=`
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
`,_=async()=>await o({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:a,transformer:r,type:"query"});export{U as DEFAULT_COUNTRY,R as STORE_CONFIG_DEFAULTS,G as authenticateCustomer,S as config,H as estimateShippingMethods,q as fetchGraphQl,T as getCart,_ as getCheckoutAgreements,I as getCompanyCredit,v as getConfig,V as getCustomer,k as getNegotiableQuote,z as getStoreConfig,D as getStoreConfigCache,y as initialize,O as initializeCheckout,Y as isEmailAvailable,K as removeFetchGraphQlHeader,F as resetCheckout,X as setBillingAddress,L as setEndpoint,j as setFetchGraphQlHeader,w as setFetchGraphQlHeaders,J as setGuestEmailOnCart,$ as setPaymentMethod,N as setShippingAddress,et as setShippingMethods,ot as setShippingMethodsOnCart,M as synchronizeCheckout};
//# sourceMappingURL=api.js.map
