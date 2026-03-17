/*! Copyright 2026 Adobe
All Rights Reserved. */
import{FetchGraphQL as i}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:g,setFetchGraphQlHeader:d,removeFetchGraphQlHeader:C,setFetchGraphQlHeaders:E,fetchGraphQl:u,getConfig:S}=new i().getMethods();function h(e){return e?{shareActiveSegments:e.share_active_segments,shareCustomerGroup:e.graphql_share_customer_group,shareAppliedCartRule:e.share_applied_cart_rule,customerAccessTokenLifetime:e.customer_access_token_lifetime}:null}const m=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},l=`
query STORE_CONFIG_QUERY {
  storeConfig {
    share_active_segments
    graphql_share_customer_group
    share_applied_cart_rule
    customer_access_token_lifetime
  }
}
`,p=async()=>{const e=sessionStorage.getItem("personalizationStoreConfig");return e!==null?JSON.parse(e):u(l,{method:"GET",cache:"force-cache"}).then(({errors:t,data:r})=>{if(t)return m(t);const s=h(r.storeConfig);return sessionStorage.setItem("personalizationStoreConfig",JSON.stringify(s)),s})},n=1,a="personalization_dropin_data",k=async e=>{const t=await _();document.cookie=`${a}=${encodeURIComponent(e)}; path=/; ${t}; `},T=()=>{const e=document.cookie.split(";");let t;return e.forEach(r=>{const[s,c]=r.trim().split("=");s===a&&(t=decodeURIComponent(c))}),t},_=async()=>{try{const e=await p();return`Max-Age=${((e==null?void 0:e.customerAccessTokenLifetime)||n)*3600}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${n*3600}`}},o=[],I=e=>e===void 0?!0:o.includes(e)?!1:(o.push(e),!0),O=()=>{o.length=0};export{d as a,E as b,p as c,T as d,I as e,u as f,S as g,m as h,k as i,O as j,C as r,g as s};
//# sourceMappingURL=type-registry.js.map
