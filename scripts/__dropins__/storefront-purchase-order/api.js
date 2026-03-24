/*! Copyright 2026 Adobe
All Rights Reserved. */
import{c as z,g as L,i as Q}from"./chunks/initialize.js";import{f as n,h as i,a as h}from"./chunks/fetch-error.js";import{g as B,r as J,s as K,b as W,c as X}from"./chunks/fetch-error.js";import{a as Z,r as rr}from"./chunks/rejectPurchaseOrders.js";import{c as sr,p as ar}from"./chunks/placeOrderForPurchaseOrder.js";import{P as S,t as D}from"./chunks/transform-purchase-order.js";import{a as cr}from"./chunks/addPurchaseOrderComment.js";import{a as ur,c as pr,g as nr,u as ir}from"./chunks/currencyInfo.js";import{d as dr,g as lr}from"./chunks/getPurchaseOrderApprovalRules.js";import{g as Pr}from"./chunks/getPurchaseOrders.js";import{events as I}from"@dropins/tools/event-bus.js";import{g as gr}from"./chunks/getPurchaseOrderApprovalRule.js";import{P as Rr}from"./chunks/permissions.js";import"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-purchase-order-approval-rule.js";import"./chunks/case-converter.js";const v=`
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
  ${S}
`,G=async r=>{const u=Array.isArray(r)?r:[r];if(!u||u.length===0)throw new Error("Purchase Order UID(s) are required");if(u.some(c=>!c||c.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return n(v,{variables:{input:{purchase_order_uids:u}}}).then(c=>{var t,o;(t=c.errors)!=null&&t.length&&i(c.errors);const s=(o=c.data)==null?void 0:o.validatePurchaseOrders;return{errors:((s==null?void 0:s.errors)??[]).map(a=>({message:(a==null?void 0:a.message)??"",type:(a==null?void 0:a.type)??""})),purchaseOrders:((s==null?void 0:s.purchase_orders)||[]).map(D)}}).catch(h)},w=r=>{var p,c,s,t,o,a,d,l,_,P,O,g,E,R,m;const u=((c=(p=r==null?void 0:r.cart)==null?void 0:p.itemsV2)==null?void 0:c.items)??[];return{cart:{id:((s=r==null?void 0:r.cart)==null?void 0:s.id)??"",items:u.map(e=>{var f,A,C;return{uid:(e==null?void 0:e.uid)??"",quantity:(e==null?void 0:e.quantity)??0,product:{uid:((f=e==null?void 0:e.product)==null?void 0:f.uid)??"",name:((A=e==null?void 0:e.product)==null?void 0:A.name)??"",sku:((C=e==null?void 0:e.product)==null?void 0:C.sku)??""}}}),pagination:{currentPage:((a=(o=(t=r==null?void 0:r.cart)==null?void 0:t.itemsV2)==null?void 0:o.page_info)==null?void 0:a.current_page)??1,pageSize:((_=(l=(d=r==null?void 0:r.cart)==null?void 0:d.itemsV2)==null?void 0:l.page_info)==null?void 0:_.page_size)??20,totalPages:((g=(O=(P=r==null?void 0:r.cart)==null?void 0:P.itemsV2)==null?void 0:O.page_info)==null?void 0:g.total_pages)??0,totalCount:((R=(E=r==null?void 0:r.cart)==null?void 0:E.itemsV2)==null?void 0:R.total_count)??0}},userErrors:((m=r==null?void 0:r.user_errors)==null?void 0:m.map(e=>({message:(e==null?void 0:e.message)??""})))??[]}},x=`
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
`,M=async(r,u,p=!1)=>{if(!r)throw new Error("Purchase Order UID is required");if(!u)throw new Error("Cart ID is required");return n(x,{variables:{purchaseOrderUid:r,cartId:u,replaceExistingCartItems:p}}).then(s=>{var o,a;(o=s.errors)!=null&&o.length&&i(s.errors);const t=(a=s.data)==null?void 0:a.addPurchaseOrderItemsToCart;if(!(t!=null&&t.cart))throw new Error("Failed to add purchase order items to cart");return w(t)}).catch(h)},T=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${S}
`,b=async r=>{if(!r||r.trim()==="")throw new Error("Cart ID is required");return n(T,{variables:{input:{cart_id:r}}}).then(p=>{var t,o,a;(t=p.errors)!=null&&t.length&&i(p.errors);const c=(a=(o=p.data)==null?void 0:o.placePurchaseOrder)==null?void 0:a.purchase_order,s=D(c);return I.emit("purchase-order/placed",s),{purchaseOrder:s}}).catch(h)};export{Rr as PO_PERMISSIONS,cr as addPurchaseOrderComment,M as addPurchaseOrderItemsToCart,Z as approvePurchaseOrders,sr as cancelPurchaseOrders,z as config,ur as createPurchaseOrderApprovalRule,pr as currencyInfo,dr as deletePurchaseOrderApprovalRule,n as fetchGraphQl,B as getConfig,L as getPurchaseOrder,gr as getPurchaseOrderApprovalRule,nr as getPurchaseOrderApprovalRuleMetadata,lr as getPurchaseOrderApprovalRules,Pr as getPurchaseOrders,Q as initialize,ar as placeOrderForPurchaseOrder,b as placePurchaseOrder,rr as rejectPurchaseOrders,J as removeFetchGraphQlHeader,K as setEndpoint,W as setFetchGraphQlHeader,X as setFetchGraphQlHeaders,ir as updatePurchaseOrderApprovalRule,G as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
