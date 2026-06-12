/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as n}from"@dropins/tools/event-bus.js";import{Initializer as E}from"@dropins/tools/lib.js";import{FetchGraphQL as A}from"@dropins/tools/fetch-graphql.js";const o="DROPIN__PERSONALIZATION__REQUIRE_UPDATE__DATA",i="DROPIN__PERSONALIZATION__AUTH",u=async e=>{const t=await y(e);t!==null&&I(t)},a=async()=>{const e=await p();return(e==null?void 0:e.shareActiveSegments)&&e.shareCustomerGroup&&e.shareAppliedCartRule},m=new E({init:async e=>{const t={};m.config.setConfig({...t,...e})},listeners:()=>[n.on("authenticated",async e=>{if(!await a())return;const r=sessionStorage.getItem(i);r!==null&&r==="true"===e||(e?(localStorage.setItem(o,"true"),sessionStorage.setItem(i,"true")):(sessionStorage.setItem(i,"false"),I({segments:[],groups:[],cartRules:[]})))},{eager:!0}),n.on("cart/updated",async e=>{const t=await a();e===null||!t||u(e.id)},{eager:!0}),n.on("cart/initialized",async e=>{const t=await a();if(e===null||!t)return;const r=localStorage.getItem(o);(r!==null?r==="true":!1)&&(u(e.id),localStorage.setItem(o,"false"))},{eager:!0}),n.on("order/placed",async()=>{await a()&&localStorage.setItem(o,"true")},{eager:!0})]}),L=m.config,{setEndpoint:P,setFetchGraphQlHeader:U,removeFetchGraphQlHeader:z,setFetchGraphQlHeaders:Q,fetchGraphQl:f,getConfig:b}=new A().getMethods();function R(e){return e?{shareActiveSegments:e.share_active_segments,shareCustomerGroup:e.graphql_share_customer_group,shareAppliedCartRule:e.share_applied_cart_rule,customerAccessTokenLifetime:e.customer_access_token_lifetime}:null}function T(e){return e?{groups:[e.customerGroup.uid],segments:l(e.customerSegments),cartRules:l(e.cart.rules)}:{groups:[],segments:[],cartRules:[]}}function l(e){return e.length?e.map(t=>t.uid):[]}const d=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},O=`
query STORE_CONFIG_QUERY {
  storeConfig {
    share_active_segments
    graphql_share_customer_group
    share_applied_cart_rule
    customer_access_token_lifetime
  }
}
`,p=async()=>{const e=sessionStorage.getItem("personalizationStoreConfig");return e!==null?JSON.parse(e):f(O,{method:"GET",cache:"force-cache"}).then(({errors:t,data:r})=>{if(t)return d(t);const s=R(r.storeConfig);return sessionStorage.setItem("personalizationStoreConfig",JSON.stringify(s)),s})},C=`
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
`,y=async e=>f(C,{variables:{cartId:e}}).then(({errors:t,data:r})=>t?d(t):T(r)),g=1,_="personalization_dropin_data",N=async e=>{const t=await D();document.cookie=`${_}=${encodeURIComponent(e)}; path=/; ${t}; `},h=()=>{const e=document.cookie.split(";");let t;return e.forEach(r=>{const[s,S]=r.trim().split("=");s===_&&(t=decodeURIComponent(S))}),t},D=async()=>{try{const e=await p();return`Max-Age=${((e==null?void 0:e.customerAccessTokenLifetime)||g)*3600}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${g*3600}`}},F=()=>{const e=h();if(e===void 0)return{segments:[],groups:[],cartRules:[]};const t=JSON.parse(e);return t||{segments:[],groups:[],cartRules:[]}},c=[],$=e=>e===void 0?!0:c.includes(e)?!1:(c.push(e),!0),k=()=>{c.length=0},I=async e=>{k();const t=h(),r=JSON.stringify(e);t!==r&&(await N(r),n.emit("personalization/updated",e))};export{L as config,f as fetchGraphQl,y as fetchPersonalizationData,b as getConfig,F as getPersonalizationData,p as getStoreConfig,m as initialize,$ as r,z as removeFetchGraphQlHeader,I as savePersonalizationData,P as setEndpoint,U as setFetchGraphQlHeader,Q as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
