/*! Copyright 2025 Adobe
All Rights Reserved. */
import{useState as a,useEffect as n}from"@dropins/tools/preact-hooks.js";import{events as c}from"@dropins/tools/event-bus.js";const i=()=>{const[t,s]=a(!0),[u,o]=a(null);return n(()=>{const e=c.on("purchase-order/data",r=>{r!=null&&r.uid&&o(r),s(!1)},{eager:!0});return()=>{e==null||e.off()}},[]),{poDataLoading:t,purchaseOrderData:u}};export{i as u};
//# sourceMappingURL=usePurchaseOrderData.js.map
