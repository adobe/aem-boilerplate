/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as a}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import{s as t}from"./state.js";import{f as c,h as r}from"./fetch-graphql.js";const f=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
    company_enabled
  }
}
`,l=async()=>{try{const{errors:i,data:e}=await c(f,{cache:"force-cache"});return i?i.some(n=>n.message&&n.message.includes('Cannot query field "is_requisition_list_active"')||n.message.includes('Cannot query field "company_enabled"'))?!1:r(i):e==null?void 0:e.storeConfig}catch{return{is_requisition_list_active:"0",company_enabled:!1}}},o=new a({init:async i=>{const e={};t.config||(t.config=await l(),s.emit("requisitionList/initialized",t.config)),o.config.setConfig({...e,...i})},listeners:()=>[s.on("authenticated",i=>{t.authenticated=i})]}),h=o.config;export{h as c,l as g,o as i};
//# sourceMappingURL=initialize.js.map
