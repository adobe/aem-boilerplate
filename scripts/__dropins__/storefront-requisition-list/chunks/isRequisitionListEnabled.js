/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as r,h as n}from"./updateRequisitionList.js";import"@dropins/tools/event-bus.js";const o=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
  }
}
`,_=async()=>{var s;try{const{errors:i,data:e}=await r(o,{method:"GET",cache:"force-cache"});return i?i.some(t=>t.message&&t.message.includes('Cannot query field "is_requisition_list_active"'))?!1:n(i):((s=e==null?void 0:e.storeConfig)==null?void 0:s.is_requisition_list_active)==="1"||!1}catch{return!1}};export{_ as i};
//# sourceMappingURL=isRequisitionListEnabled.js.map
