/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as o,h as r}from"./chunks/updateRequisitionList.js";import{e as R,g as y,r as F,s as L,a as b,b as E,u as G}from"./chunks/updateRequisitionList.js";import{events as a}from"@dropins/tools/event-bus.js";import{g as Q}from"./chunks/getRequisitionLists.js";import{a as x,d as O,b as w,g as z,u as H}from"./chunks/addRequisitionListItemsToCart.js";import{d as T}from"./chunks/deleteRequisitionList.js";import{Initializer as c}from"@dropins/tools/lib.js";import{s as t}from"./chunks/state.js";import"@dropins/tools/fetch-graphql.js";const f=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
    company_enabled
  }
}
`,u=async()=>{try{const{errors:e,data:i}=await o(f,{cache:"force-cache"});return e?e.some(s=>s.message&&s.message.includes('Cannot query field "is_requisition_list_active"')||s.message.includes('Cannot query field "company_enabled"'))?!1:r(e):i==null?void 0:i.storeConfig}catch{return{is_requisition_list_active:"0",company_enabled:!1}}},n=new c({init:async e=>{const i={};t.config||(t.config=await u(),a.emit("requisitionList/initialized",t.config)),n.config.setConfig({...i,...e})},listeners:()=>[a.on("authenticated",e=>{t.authenticated=e})]}),_=n.config;export{x as addRequisitionListItemsToCart,_ as config,T as deleteRequisitionList,O as deleteRequisitionListItems,R as enrichConfigurableProducts,o as fetchGraphQl,y as getConfig,w as getProductData,z as getRequisitionList,Q as getRequisitionLists,u as getStoreConfig,n as initialize,F as removeFetchGraphQlHeader,L as setEndpoint,b as setFetchGraphQlHeader,E as setFetchGraphQlHeaders,G as updateRequisitionList,H as updateRequisitionListItems};
//# sourceMappingURL=api.js.map
