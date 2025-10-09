/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as s}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:u,setFetchGraphQlHeader:n,removeFetchGraphQlHeader:_,setFetchGraphQlHeaders:l,fetchGraphQl:p,getConfig:c}=new s().getMethods(),d=r=>{const o=r.map(e=>e.message).join(" ");throw Error(o)},b=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`;function f(r){var o,e;return{uid:r.uid,name:r.name,description:r.description,updated_at:r.updated_at,items_count:r.items_count,items:a((o=r.items)==null?void 0:o.items),page_info:(e=r.items)==null?void 0:e.page_info}}function a(r){return r!=null&&r.length?r.map(o=>({uid:o.uid,sku:o.product.sku,quantity:o.quantity,customizable_options:o.customizable_options?o.customizable_options.map(e=>({uid:e.customizable_option_uid,is_required:e.is_required,label:e.label,sort_order:e.sort_order,type:e.type,values:e.values.map(t=>({uid:t.customizable_option_value_uid,label:t.label,price:t.price,value:t.value}))})):[],bundle_options:o.bundle_options||[],configurable_options:o.configurable_options?o.configurable_options.map(e=>({option_uid:e.configurable_product_option_uid,option_label:e.option_label,value_uid:e.configurable_product_option_value_uid,value_label:e.value_label})):[],samples:o.samples?o.samples.map(e=>({url:e.sample_url,sort_order:e.sort_order,title:e.title})):[],gift_card_options:o.gift_card_options||{}})):[]}export{b as R,n as a,l as b,p as f,c as g,d as h,_ as r,u as s,f as t};
//# sourceMappingURL=transform-requisition-list.js.map
