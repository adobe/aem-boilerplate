/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as a,h as r}from"./chunks/updateRequisitionList.js";import{g as R,r as y,s as F,a as L,b as E,u as G}from"./chunks/updateRequisitionList.js";import{events as n}from"@dropins/tools/event-bus.js";import{g as Q}from"./chunks/getRequisitionLists.js";import{a as x,d as b,g as O,u as w}from"./chunks/addRequisitionListItemsToCart.js";import{d as H}from"./chunks/deleteRequisitionList.js";import{Initializer as c}from"@dropins/tools/lib.js";import{s as t}from"./chunks/state.js";import"@dropins/tools/fetch-graphql.js";const f=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
    company_enabled
  }
}
`,m=async()=>{try{const{errors:e,data:i}=await a(f,{cache:"force-cache"});return e?e.some(s=>s.message&&s.message.includes('Cannot query field "is_requisition_list_active"')||s.message.includes('Cannot query field "company_enabled"'))?!1:r(e):i==null?void 0:i.storeConfig}catch{return{is_requisition_list_active:"0",company_enabled:!1}}},o=new c({init:async e=>{const i={};t.config||(t.config=await m(),n.emit("requisitionList/initialized",t.config)),o.config.setConfig({...i,...e})},listeners:()=>[n.on("authenticated",e=>{t.authenticated=e})]}),_=o.config;export{x as addRequisitionListItemsToCart,_ as config,H as deleteRequisitionList,b as deleteRequisitionListItems,a as fetchGraphQl,R as getConfig,O as getRequisitionList,Q as getRequisitionLists,m as getStoreConfig,o as initialize,y as removeFetchGraphQlHeader,F as setEndpoint,L as setFetchGraphQlHeader,E as setFetchGraphQlHeaders,G as updateRequisitionList,w as updateRequisitionListItems};
//# sourceMappingURL=api.js.map
