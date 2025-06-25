/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as i}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:d,setFetchGraphQlHeader:C,removeFetchGraphQlHeader:E,setFetchGraphQlHeaders:S,fetchGraphQl:u,getConfig:k}=new i().getMethods();function m(e){return e?{shareActiveSegments:e.share_active_segments,shareCustomerGroup:e.graphql_share_customer_group,shareAppliedCartRule:e.share_applied_cart_rule,customerAccessTokenLifetime:e.customer_access_token_lifetime}:null}const l=e=>{const t=e.map(s=>s.message).join(" ");throw Error(t)},h=`
query STORE_CONFIG_QUERY {
  storeConfig {
    share_active_segments
    graphql_share_customer_group
    share_applied_cart_rule
    customer_access_token_lifetime
  }
}
`,p=async()=>{const e=sessionStorage.getItem("personalizationStoreConfig");return e!==null?JSON.parse(e):u(h,{method:"GET",cache:"force-cache"}).then(({errors:t,data:s})=>{if(t)return l(t);const r=m(s.storeConfig);return sessionStorage.setItem("personalizationStoreConfig",JSON.stringify(r)),r})},n=1,a="personalization_dropin_data",T=async e=>{const t=await f();document.cookie=`${a}=${encodeURIComponent(e)}; path=/; ${t}; `},g=()=>{const e=document.cookie.split(";");let t;return e.forEach(s=>{const[r,c]=s.trim().split("=");r===a&&(t=decodeURIComponent(c))}),t},f=async()=>{try{const e=await p();return`Max-Age=${((e==null?void 0:e.customerAccessTokenLifetime)||n)*3600}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${n*3600}`}},O=()=>{const e=g();if(e===void 0)return{segments:[],groups:[],cartRules:[]};const t=JSON.parse(e);return t||{segments:[],groups:[],cartRules:[]}},o=[],I=e=>e===void 0?!0:o.includes(e)?!1:(o.push(e),!0),R=()=>{o.length=0};export{p as a,g as b,R as c,d,C as e,u as f,O as g,l as h,E as i,S as j,k,I as r,T as s};
