/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as v}from"@dropins/tools/lib.js";import{f as i,h as p}from"./chunks/fetch-graphql.js";import{g as K,r as W,s as X,a as Y,b as Z}from"./chunks/fetch-graphql.js";import{h}from"./chunks/fetch-error.js";import{P as d,t as l}from"./chunks/rejectPurchaseOrders.js";import{a as er,r as sr}from"./chunks/rejectPurchaseOrders.js";import{events as I}from"@dropins/tools/event-bus.js";import{c as ar,p as or}from"./chunks/placeOrderForPurchaseOrder.js";import{a as ur}from"./chunks/addPurchaseOrderComment.js";import{a as ir,c as pr,g as hr,u as dr}from"./chunks/currencyInfo.js";import{d as _r,g as Or}from"./chunks/getPurchaseOrderApprovalRules.js";import{g as Pr}from"./chunks/getPurchaseOrders.js";import{g as mr}from"./chunks/getPurchaseOrderApprovalRule.js";import{P as gr}from"./chunks/permissions.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-purchase-order-approval-rule.js";import"./chunks/case-converter.js";const y=`
  query GET_PURCHASE_ORDER($uid: ID!) {
    customer {
      purchase_order(uid: $uid) {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${d}
`,T=async r=>{if(!r||r.trim()==="")throw new Error("Purchase Order UID is required");return i(y,{variables:{uid:r}}).then(o=>{var a,s,e;(a=o.errors)!=null&&a.length&&h(o.errors);const u=(e=(s=o.data)==null?void 0:s.customer)==null?void 0:e.purchase_order;if(!u)throw new Error("Failed to get purchase order");return{purchaseOrder:l(u)}}).catch(p)},w=new v({init:async r=>{var a,s;const o={};if(w.config.setConfig({...o,...r}),typeof(r==null?void 0:r.poRef)=="string"&&r.poRef.trim()!==""){const e=await T(r.poRef);(a=e==null?void 0:e.purchaseOrder)!=null&&a.quote&&I.emit("order/data",{...e.purchaseOrder.quote,poNumber:(s=e==null?void 0:e.purchaseOrder)==null?void 0:s.number})}},listeners:()=>[]}),k=w.config,U=`
  mutation VALIDATE_PURCHASE_ORDERS($input: ValidatePurchaseOrdersInput!) {
    validatePurchaseOrders(input: $input) {
      errors {
        message
        type
      }
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${d}
`,L=async r=>{const o=Array.isArray(r)?r:[r];if(!o||o.length===0)throw new Error("Purchase Order UID(s) are required");if(o.some(a=>!a||a.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return i(U,{variables:{input:{purchase_order_uids:o}}}).then(a=>{var e,n;(e=a.errors)!=null&&e.length&&h(a.errors);const s=(n=a.data)==null?void 0:n.validatePurchaseOrders;return{errors:((s==null?void 0:s.errors)??[]).map(c=>({message:(c==null?void 0:c.message)??"",type:(c==null?void 0:c.type)??""})),purchaseOrders:((s==null?void 0:s.purchase_orders)||[]).map(l)}}).catch(p)},H=r=>{var u,a,s,e,n,c,_,O,R,P,E,m,f,g,A;const o=((a=(u=r==null?void 0:r.cart)==null?void 0:u.itemsV2)==null?void 0:a.items)??[];return{cart:{id:((s=r==null?void 0:r.cart)==null?void 0:s.id)??"",items:o.map(t=>{var C,D,S;return{uid:(t==null?void 0:t.uid)??"",quantity:(t==null?void 0:t.quantity)??0,product:{uid:((C=t==null?void 0:t.product)==null?void 0:C.uid)??"",name:((D=t==null?void 0:t.product)==null?void 0:D.name)??"",sku:((S=t==null?void 0:t.product)==null?void 0:S.sku)??""}}}),pagination:{currentPage:((c=(n=(e=r==null?void 0:r.cart)==null?void 0:e.itemsV2)==null?void 0:n.page_info)==null?void 0:c.current_page)??1,pageSize:((R=(O=(_=r==null?void 0:r.cart)==null?void 0:_.itemsV2)==null?void 0:O.page_info)==null?void 0:R.page_size)??20,totalPages:((m=(E=(P=r==null?void 0:r.cart)==null?void 0:P.itemsV2)==null?void 0:E.page_info)==null?void 0:m.total_pages)??0,totalCount:((g=(f=r==null?void 0:r.cart)==null?void 0:f.itemsV2)==null?void 0:g.total_count)??0}},userErrors:((A=r==null?void 0:r.user_errors)==null?void 0:A.map(t=>({message:(t==null?void 0:t.message)??""})))??[]}},$=`
  mutation ADD_PURCHASE_ORDER_ITEMS_TO_CART(
    $purchaseOrderUid: ID!
    $cartId: String!
    $replaceExistingCartItems: Boolean!
  ) {
    addPurchaseOrderItemsToCart(
      input: {
        purchase_order_uid: $purchaseOrderUid
        cart_id: $cartId
        replace_existing_cart_items: $replaceExistingCartItems
      }
    ) {
      cart {
        id
        itemsV2 {
          items {
            uid
            quantity
            product {
              uid
              name
              sku
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
          total_count
        }
      }
    }
  }
`,Q=async(r,o,u=!1)=>{if(!r)throw new Error("Purchase Order UID is required");if(!o)throw new Error("Cart ID is required");return i($,{variables:{purchaseOrderUid:r,cartId:o,replaceExistingCartItems:u}}).then(s=>{var n,c;(n=s.errors)!=null&&n.length&&h(s.errors);const e=(c=s.data)==null?void 0:c.addPurchaseOrderItemsToCart;if(!(e!=null&&e.cart))throw new Error("Failed to add purchase order items to cart");return H(e)}).catch(p)},x=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${d}
`,j=async r=>{if(!r||r.trim()==="")throw new Error("Cart ID is required");return i(x,{variables:{input:{cart_id:r}}}).then(u=>{var e,n,c;(e=u.errors)!=null&&e.length&&h(u.errors);const a=(c=(n=u.data)==null?void 0:n.placePurchaseOrder)==null?void 0:c.purchase_order,s=l(a);return I.emit("purchase-order/placed",s),{purchaseOrder:s}}).catch(p)};export{gr as PO_PERMISSIONS,ur as addPurchaseOrderComment,Q as addPurchaseOrderItemsToCart,er as approvePurchaseOrders,ar as cancelPurchaseOrders,k as config,ir as createPurchaseOrderApprovalRule,pr as currencyInfo,_r as deletePurchaseOrderApprovalRule,i as fetchGraphQl,K as getConfig,T as getPurchaseOrder,mr as getPurchaseOrderApprovalRule,hr as getPurchaseOrderApprovalRuleMetadata,Or as getPurchaseOrderApprovalRules,Pr as getPurchaseOrders,w as initialize,or as placeOrderForPurchaseOrder,j as placePurchaseOrder,sr as rejectPurchaseOrders,W as removeFetchGraphQlHeader,X as setEndpoint,Y as setFetchGraphQlHeader,Z as setFetchGraphQlHeaders,dr as updatePurchaseOrderApprovalRule,L as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
