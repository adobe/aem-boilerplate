/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as d}from"@dropins/tools/lib.js";import{f,h,a as u}from"./fetch-error.js";import{P as R,t as p}from"./transform-purchase-order.js";import{events as a}from"@dropins/tools/event-bus.js";const l=`
  query GET_PURCHASE_ORDER($uid: ID!) {
    customer {
      purchase_order(uid: $uid) {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${R}
`,m=async r=>{if(!r||r.trim()==="")throw new Error("Purchase Order UID is required");return f(l,{variables:{uid:r}}).then(e=>{var s,i,c;(s=e.errors)!=null&&s.length&&h(e.errors);const t=(c=(i=e.data)==null?void 0:i.customer)==null?void 0:c.purchase_order;if(!t)throw new Error("Failed to get purchase order");return{purchaseOrder:p(t)}}).catch(u)},n=async r=>{var t;const e=await m(r);(t=e==null?void 0:e.purchaseOrder)!=null&&t.quote?(a.emit("order/data",{...e.purchaseOrder.quote}),a.emit("purchase-order/data",{...e.purchaseOrder})):console.error("Failed to fetch purchase order data.")},o=new d({init:async r=>{const e={};o.config.setConfig({...e,...r}),typeof(r==null?void 0:r.poRef)=="string"&&r.poRef.trim()!==""&&await n(r.poRef)},listeners:()=>[a.on("purchase-order/refresh",async()=>{const r=o.config.getConfig();typeof(r==null?void 0:r.poRef)=="string"&&r.poRef.trim()!==""&&await n(r.poRef)})]}),w=o.config;export{w as c,m as g,o as i};
//# sourceMappingURL=initialize.js.map
