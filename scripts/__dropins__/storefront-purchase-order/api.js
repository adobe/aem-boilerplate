/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as v}from"@dropins/tools/lib.js";import{f as p,h,a as d}from"./chunks/fetch-graphql.js";import{g as K,r as W,s as X,b as Y,c as Z}from"./chunks/fetch-graphql.js";import{P as R,t as _}from"./chunks/rejectPurchaseOrders.js";import{a as er,r as sr}from"./chunks/rejectPurchaseOrders.js";import{events as i}from"@dropins/tools/event-bus.js";import{c as ar,p as or}from"./chunks/placeOrderForPurchaseOrder.js";import{a as ur}from"./chunks/addPurchaseOrderComment.js";import{a as ir,c as pr,g as hr,u as dr}from"./chunks/currencyInfo.js";import{d as Rr,g as _r}from"./chunks/getPurchaseOrderApprovalRules.js";import{g as Or}from"./chunks/getPurchaseOrders.js";import{g as Er}from"./chunks/getPurchaseOrderApprovalRule.js";import{P as gr}from"./chunks/permissions.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-purchase-order-approval-rule.js";import"./chunks/case-converter.js";const T=`
  query GET_PURCHASE_ORDER($uid: ID!) {
    customer {
      purchase_order(uid: $uid) {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${R}
`,U=async r=>{if(!r||r.trim()==="")throw new Error("Purchase Order UID is required");return p(T,{variables:{uid:r}}).then(e=>{var c,s,o;(c=e.errors)!=null&&c.length&&h(e.errors);const a=(o=(s=e.data)==null?void 0:s.customer)==null?void 0:o.purchase_order;if(!a)throw new Error("Failed to get purchase order");return{purchaseOrder:_(a)}}).catch(d)},y=async r=>{var a;const e=await U(r);(a=e==null?void 0:e.purchaseOrder)!=null&&a.quote?(i.emit("order/data",{...e.purchaseOrder.quote}),i.emit("purchase-order/data",{...e.purchaseOrder})):console.error("Failed to fetch purchase order data.")},l=new v({init:async r=>{const e={};l.config.setConfig({...e,...r}),typeof(r==null?void 0:r.poRef)=="string"&&r.poRef.trim()!==""&&await y(r.poRef)},listeners:()=>[i.on("purchase-order/refresh",async()=>{const r=l.config.getConfig();typeof(r==null?void 0:r.poRef)=="string"&&r.poRef.trim()!==""&&await y(r.poRef)})]}),k=l.config,H=`
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
  ${R}
`,L=async r=>{const e=Array.isArray(r)?r:[r];if(!e||e.length===0)throw new Error("Purchase Order UID(s) are required");if(e.some(c=>!c||c.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return p(H,{variables:{input:{purchase_order_uids:e}}}).then(c=>{var o,n;(o=c.errors)!=null&&o.length&&h(c.errors);const s=(n=c.data)==null?void 0:n.validatePurchaseOrders;return{errors:((s==null?void 0:s.errors)??[]).map(u=>({message:(u==null?void 0:u.message)??"",type:(u==null?void 0:u.type)??""})),purchaseOrders:((s==null?void 0:s.purchase_orders)||[]).map(_)}}).catch(d)},$=r=>{var a,c,s,o,n,u,P,O,f,E,m,g,A,C,D;const e=((c=(a=r==null?void 0:r.cart)==null?void 0:a.itemsV2)==null?void 0:c.items)??[];return{cart:{id:((s=r==null?void 0:r.cart)==null?void 0:s.id)??"",items:e.map(t=>{var S,I,w;return{uid:(t==null?void 0:t.uid)??"",quantity:(t==null?void 0:t.quantity)??0,product:{uid:((S=t==null?void 0:t.product)==null?void 0:S.uid)??"",name:((I=t==null?void 0:t.product)==null?void 0:I.name)??"",sku:((w=t==null?void 0:t.product)==null?void 0:w.sku)??""}}}),pagination:{currentPage:((u=(n=(o=r==null?void 0:r.cart)==null?void 0:o.itemsV2)==null?void 0:n.page_info)==null?void 0:u.current_page)??1,pageSize:((f=(O=(P=r==null?void 0:r.cart)==null?void 0:P.itemsV2)==null?void 0:O.page_info)==null?void 0:f.page_size)??20,totalPages:((g=(m=(E=r==null?void 0:r.cart)==null?void 0:E.itemsV2)==null?void 0:m.page_info)==null?void 0:g.total_pages)??0,totalCount:((C=(A=r==null?void 0:r.cart)==null?void 0:A.itemsV2)==null?void 0:C.total_count)??0}},userErrors:((D=r==null?void 0:r.user_errors)==null?void 0:D.map(t=>({message:(t==null?void 0:t.message)??""})))??[]}},x=`
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
`,Q=async(r,e,a=!1)=>{if(!r)throw new Error("Purchase Order UID is required");if(!e)throw new Error("Cart ID is required");return p(x,{variables:{purchaseOrderUid:r,cartId:e,replaceExistingCartItems:a}}).then(s=>{var n,u;(n=s.errors)!=null&&n.length&&h(s.errors);const o=(u=s.data)==null?void 0:u.addPurchaseOrderItemsToCart;if(!(o!=null&&o.cart))throw new Error("Failed to add purchase order items to cart");return $(o)}).catch(d)},V=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${R}
`,j=async r=>{if(!r||r.trim()==="")throw new Error("Cart ID is required");return p(V,{variables:{input:{cart_id:r}}}).then(a=>{var o,n,u;(o=a.errors)!=null&&o.length&&h(a.errors);const c=(u=(n=a.data)==null?void 0:n.placePurchaseOrder)==null?void 0:u.purchase_order,s=_(c);return i.emit("purchase-order/placed",s),{purchaseOrder:s}}).catch(d)};export{gr as PO_PERMISSIONS,ur as addPurchaseOrderComment,Q as addPurchaseOrderItemsToCart,er as approvePurchaseOrders,ar as cancelPurchaseOrders,k as config,ir as createPurchaseOrderApprovalRule,pr as currencyInfo,Rr as deletePurchaseOrderApprovalRule,p as fetchGraphQl,K as getConfig,U as getPurchaseOrder,Er as getPurchaseOrderApprovalRule,hr as getPurchaseOrderApprovalRuleMetadata,_r as getPurchaseOrderApprovalRules,Or as getPurchaseOrders,l as initialize,or as placeOrderForPurchaseOrder,j as placePurchaseOrder,sr as rejectPurchaseOrders,W as removeFetchGraphQlHeader,X as setEndpoint,Y as setFetchGraphQlHeader,Z as setFetchGraphQlHeaders,dr as updatePurchaseOrderApprovalRule,L as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
