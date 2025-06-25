/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as g}from"@dropins/tools/lib.js";import{events as a}from"@dropins/tools/event-bus.js";import{a as f,f as m,h as d,b as p,s as I,c as A}from"./chunks/type-registry.js";import{k as w,g as z,i as C,d as b,e as G,j as Q}from"./chunks/type-registry.js";import"@dropins/tools/fetch-graphql.js";const r="DROPIN__PERSONALIZATION__REQUIRE_UPDATE__DATA",n="DROPIN__PERSONALIZATION__AUTH",i=async e=>{const t=await S(e);t!==null&&l(t)},o=async()=>{const e=await f();return(e==null?void 0:e.shareActiveSegments)&&e.shareCustomerGroup&&e.shareAppliedCartRule},u=new g({init:async e=>{const t={};u.config.setConfig({...t,...e})},listeners:()=>[a.on("authenticated",async e=>{if(!await o())return;const s=sessionStorage.getItem(n);s!==null&&s==="true"===e||(e?(localStorage.setItem(r,"true"),sessionStorage.setItem(n,"true")):(sessionStorage.setItem(n,"false"),l({segments:[],groups:[],cartRules:[]})))},{eager:!0}),a.on("cart/updated",async e=>{const t=await o();e===null||!t||i(e.id)},{eager:!0}),a.on("cart/initialized",async e=>{const t=await o();if(e===null||!t)return;const s=localStorage.getItem(r);(s!==null?s==="true":!1)&&(i(e.id),localStorage.setItem(r,JSON.stringify(!1)))},{eager:!0})]}),O=u.config;function h(e){return e?{groups:[e.customerGroup.uid],segments:c(e.customerSegments),cartRules:c(e.cart.rules)}:{groups:[],segments:[],cartRules:[]}}function c(e){return e.length?e.map(t=>t.uid):[]}const _=`
query PERSONALIZATION_DATA(
      $cartId: String!
    ) {
      customerGroup {
        uid
      }
      customerSegments(cartId: $cartId) {
        uid
      }
      cart(cart_id: $cartId) {
        rules {
          uid
        }
      }
    }
`,S=async e=>m(_,{variables:{cartId:e}}).then(({errors:t,data:s})=>t?d(t):h(s)),l=async e=>{A();const t=p(),s=JSON.stringify(e);t!==s&&(await I(s),a.emit("personalization/updated",e))};export{O as config,m as fetchGraphQl,S as fetchPersonalizationData,w as getConfig,z as getPersonalizationData,f as getStoreConfig,u as initialize,C as removeFetchGraphQlHeader,l as savePersonalizationData,b as setEndpoint,G as setFetchGraphQlHeader,Q as setFetchGraphQlHeaders};
