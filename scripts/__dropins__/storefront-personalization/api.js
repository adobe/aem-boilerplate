/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as g}from"@dropins/tools/lib.js";import{events as r}from"@dropins/tools/event-bus.js";import{a as f,f as d,h as m,b as p,s as I,c as A}from"./chunks/type-registry.js";import{k as b,g as w,i as z,d as C,e as G,j as Q}from"./chunks/type-registry.js";import"@dropins/tools/fetch-graphql.js";const s="DROPIN__PERSONALIZATION__REQUIRE_UPDATE__DATA",o="DROPIN__PERSONALIZATION__AUTH",i=async e=>{const t=await S(e);t!==null&&l(t)},n=async()=>{const e=await f();return(e==null?void 0:e.shareActiveSegments)&&e.shareCustomerGroup&&e.shareAppliedCartRule},u=new g({init:async e=>{const t={};u.config.setConfig({...t,...e})},listeners:()=>[r.on("authenticated",async e=>{if(!await n())return;const a=sessionStorage.getItem(o);a!==null&&a==="true"===e||(e?(localStorage.setItem(s,"true"),sessionStorage.setItem(o,"true")):(sessionStorage.setItem(o,"false"),l({segments:[],groups:[],cartRules:[]})))},{eager:!0}),r.on("cart/updated",async e=>{const t=await n();e===null||!t||i(e.id)},{eager:!0}),r.on("cart/initialized",async e=>{const t=await n();if(e===null||!t)return;const a=localStorage.getItem(s);(a!==null?a==="true":!1)&&(i(e.id),localStorage.setItem(s,"false"))},{eager:!0}),r.on("order/placed",async()=>{await n()&&localStorage.setItem(s,"true")},{eager:!0})]}),T=u.config;function h(e){return e?{groups:[e.customerGroup.uid],segments:c(e.customerSegments),cartRules:c(e.cart.rules)}:{groups:[],segments:[],cartRules:[]}}function c(e){return e.length?e.map(t=>t.uid):[]}const _=`
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
`,S=async e=>d(_,{variables:{cartId:e}}).then(({errors:t,data:a})=>t?m(t):h(a)),l=async e=>{A();const t=p(),a=JSON.stringify(e);t!==a&&(await I(a),r.emit("personalization/updated",e))};export{T as config,d as fetchGraphQl,S as fetchPersonalizationData,b as getConfig,w as getPersonalizationData,f as getStoreConfig,u as initialize,z as removeFetchGraphQlHeader,l as savePersonalizationData,C as setEndpoint,G as setFetchGraphQlHeader,Q as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
