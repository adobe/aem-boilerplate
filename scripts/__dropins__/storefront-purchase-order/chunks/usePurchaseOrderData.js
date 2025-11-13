/*! Copyright 2025 Adobe
All Rights Reserved. */
import{useState as a,useEffect as s}from"@dropins/tools/preact-hooks.js";import{events as u}from"@dropins/tools/event-bus.js";const h=()=>{const[o,t]=a(!0),[n,c]=a(null);return s(()=>{const r=u.on("purchase-order/data",e=>{e!=null&&e.uid&&c(e),t(!1)},{eager:!0});return()=>{r==null||r.off()}},[]),s(()=>{const r=u.on("purchase-order/refresh",()=>t(!0),{eager:!0});return()=>{r==null||r.off()}},[]),{poDataLoading:o,purchaseOrderData:n}};export{h as u};
//# sourceMappingURL=usePurchaseOrderData.js.map
