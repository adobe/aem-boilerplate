/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as h,h as p,a as o}from"./fetch-error.js";import{P as i,t as E}from"./transform-purchase-order.js";const P=`
  mutation APPROVE_PURCHASE_ORDERS($input: PurchaseOrdersActionInput!) {
    approvePurchaseOrders(input: $input) {
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
      errors {
        message
        type
      }
    }
  }
  ${i}
`,A=async c=>{const s=Array.isArray(c)?c:[c];if(!s||s.length===0)throw new Error("Purchase Order UID(s) are required");if(s.some(e=>!e||e.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return h(P,{variables:{input:{purchase_order_uids:s}}}).then(e=>{var n,u,t;(n=e.errors)!=null&&n.length&&p(e.errors);const r=(u=e.data)==null?void 0:u.approvePurchaseOrders;if(!r)throw new Error("Failed to approve purchase orders");return{errors:((r==null?void 0:r.errors)??[]).map(a=>({message:(a==null?void 0:a.message)??"",type:(a==null?void 0:a.type)??""})),purchaseOrders:((t=r==null?void 0:r.purchase_orders)==null?void 0:t.map(a=>E(a)))??[]}}).catch(o)},O=`
  mutation REJECT_PURCHASE_ORDERS($input: PurchaseOrdersActionInput!) {
    rejectPurchaseOrders(input: $input) {
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
      errors {
        message
        type
      }
    }
  }
  ${i}
`,_=async c=>{const s=Array.isArray(c)?c:[c];if(!s||s.length===0)throw new Error("Purchase Order UID(s) are required");if(s.some(e=>!e||e.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return h(O,{variables:{input:{purchase_order_uids:s}}}).then(e=>{var n,u;(n=e.errors)!=null&&n.length&&p(e.errors);const r=(u=e.data)==null?void 0:u.rejectPurchaseOrders;return{errors:((r==null?void 0:r.errors)??[]).map(t=>({message:(t==null?void 0:t.message)??"",type:(t==null?void 0:t.type)??""})),purchaseOrders:((r==null?void 0:r.purchase_orders)??[]).map(E)}}).catch(o)};export{A as a,_ as r};
//# sourceMappingURL=rejectPurchaseOrders.js.map
