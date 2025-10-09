/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as r,h as a}from"./chunks/transform-requisition-list.js";import{g as q,r as R,s as C,a as E,b as F}from"./chunks/transform-requisition-list.js";import{g as L}from"./chunks/getRequisitionLists.js";import{a as Q,d as x,g as y,b as v,u as O}from"./chunks/deleteRequisitionListItems.js";import{d as b}from"./chunks/deleteRequisitionList.js";import{Initializer as n}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/RequisitionListItemsFragment.graphql.js";const o=new n({init:async i=>{const e={};o.config.setConfig({...e,...i})},listeners:()=>[]}),g=o.config,c=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
  }
}
`,h=async()=>{var i;try{const{errors:e,data:t}=await r(c,{method:"GET",cache:"force-cache"});return e?e.some(s=>s.message&&s.message.includes('Cannot query field "is_requisition_list_active"'))?!1:a(e):((i=t==null?void 0:t.storeConfig)==null?void 0:i.is_requisition_list_active)==="1"||!1}catch{return!1}};export{Q as addRequisitionListItemsToCart,g as config,b as deleteRequisitionList,x as deleteRequisitionListItems,r as fetchGraphQl,q as getConfig,y as getProductData,v as getRequisitionList,L as getRequisitionLists,o as initialize,h as isRequisitionListEnabled,R as removeFetchGraphQlHeader,C as setEndpoint,E as setFetchGraphQlHeader,F as setFetchGraphQlHeaders,O as updateRequisitionListItems};
//# sourceMappingURL=api.js.map
