/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as r,h as a}from"./chunks/transform-requisition-list.js";import{g as F,r as G,s as L,a as x,b as y}from"./chunks/transform-requisition-list.js";import{events as n}from"@dropins/tools/event-bus.js";import{g as Q}from"./chunks/getRequisitionLists.js";import{a as O,d as T,b,g as w,u as H}from"./chunks/addRequisitionListItemsToCart.js";import{d as N}from"./chunks/deleteRequisitionList.js";import{Initializer as c}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/RequisitionListItemsFragment.graphql.js";const f={authenticated:!1},u=new Proxy(f,{set(e,t,i){return Reflect.set(e,t,i)},get(e,t){return e[t]}}),o=new c({init:async e=>{const t={};o.config.setConfig({...t,...e})},listeners:()=>[n.on("authenticated",e=>{u.authenticated=e})]}),q=o.config,l=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
  }
}
`,R=async()=>{var e;try{const{errors:t,data:i}=await r(l,{method:"GET",cache:"force-cache"});return t?t.some(s=>s.message&&s.message.includes('Cannot query field "is_requisition_list_active"'))?!1:a(t):((e=i==null?void 0:i.storeConfig)==null?void 0:e.is_requisition_list_active)==="1"||!1}catch{return!1}};export{O as addRequisitionListItemsToCart,q as config,N as deleteRequisitionList,T as deleteRequisitionListItems,r as fetchGraphQl,F as getConfig,b as getProductData,w as getRequisitionList,Q as getRequisitionLists,o as initialize,R as isRequisitionListEnabled,G as removeFetchGraphQlHeader,L as setEndpoint,x as setFetchGraphQlHeader,y as setFetchGraphQlHeaders,H as updateRequisitionListItems};
//# sourceMappingURL=api.js.map
