/*! Copyright 2026 Adobe
All Rights Reserved. */
import{c as at,r as ot}from"./chunks/requestGuestOrderCancel.js";import{s as v,f as E,h as O}from"./chunks/fetch-graphql.js";import{g as ct,r as ut,a as st,b as it}from"./chunks/fetch-graphql.js";import{g as dt}from"./chunks/getAttributesForm.js";import{g as mt,a as Et,r as Ot}from"./chunks/requestGuestReturn.js";import{g as Tt,a as gt}from"./chunks/getGuestOrder.js";import{g as _t}from"./chunks/getCustomerOrdersReturn.js";import{a as N}from"./chunks/initialize.js";import{c as At,g as xt,d as Nt,i as Rt}from"./chunks/initialize.js";import{g as bt}from"./chunks/getStoreConfig.js";import{h}from"./chunks/network-error.js";import{events as l}from"@dropins/tools/event-bus.js";import{PLACE_ORDER_FRAGMENT as R,PLACE_NEGOTIABLE_QUOTE_ORDER_FRAGMENT as L}from"./fragments.js";import{verifyReCaptcha as D}from"@dropins/tools/recaptcha.js";import{c as vt,a as Lt,r as Dt}from"./chunks/confirmCancelOrder.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-attributes-form.js";import"@dropins/tools/lib.js";const m=(e,r)=>e+r.amount.value,M=(e,r)=>({id:e,totalQuantity:r.totalQuantity,possibleOnepageCheckout:!0,items:r.items.map(t=>{var a,o,n,c,u,s,i,f,_,C,A;return{canApplyMsrp:!0,formattedPrice:"",id:t.id,quantity:t.totalQuantity,product:{canonicalUrl:(a=t.product)==null?void 0:a.canonicalUrl,mainImageUrl:((o=t.product)==null?void 0:o.image)??"",name:((n=t.product)==null?void 0:n.name)??"",productId:0,productType:(c=t.product)==null?void 0:c.productType,sku:((u=t.product)==null?void 0:u.sku)??"",topLevelSku:(s=t.product)==null?void 0:s.sku},prices:{price:{value:t.price.value,currency:t.price.currency,regularPrice:((i=t.regularPrice)==null?void 0:i.value)??t.price.value}},configurableOptions:((f=t.selectedOptions)==null?void 0:f.map(x=>({optionLabel:x.label,valueLabel:x.value})))||[],discountAmount:((A=((_=t.itemPrices)==null?void 0:_.discounts)??((C=t.prices)==null?void 0:C.discounts))==null?void 0:A.reduce(m,0))??0}}),prices:{subtotalExcludingTax:{value:r.subtotalExclTax.value,currency:r.subtotalExclTax.currency},subtotalIncludingTax:{value:r.subtotalInclTax.value,currency:r.subtotalInclTax.currency}},discountAmount:r.discounts.reduce(m,0)}),w=e=>{var a,o,n;const r=e.coupons[0],t=(a=e.payments)==null?void 0:a[0];return{appliedCouponCode:(r==null?void 0:r.code)??"",email:e.email,grandTotal:e.grandTotal.value,orderId:e.number,orderType:"checkout",otherTax:0,salesTax:e.totalTax.value,shipping:{shippingMethod:((o=e.shipping)==null?void 0:o.code)??"",shippingAmount:((n=e.shipping)==null?void 0:n.amount)??0},subtotalExcludingTax:e.subtotalExclTax.value,subtotalIncludingTax:e.subtotalInclTax.value,payments:t?[{paymentMethodCode:(t==null?void 0:t.code)||"",paymentMethodName:(t==null?void 0:t.name)||"",total:e.grandTotal.value,orderId:e.number}]:[],discountAmount:e.discounts.reduce(m,0),taxAmount:e.totalTax.value,paymentAmount:e.grandTotal.value,priceTotal:e.grandTotal.value}},y=e=>{var t,a;const r=(a=(t=e==null?void 0:e.data)==null?void 0:t.placeOrder)==null?void 0:a.orderV2;return r?N(r):null},G=e=>{var t,a;const r=(a=(t=e==null?void 0:e.data)==null?void 0:t.placeNegotiableQuoteOrderV2)==null?void 0:a.order;return r?N(r):null},d={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext",CHANNEL_CONTEXT:"channelContext",PERSONAL_EMAIL_CONTEXT:"personalEmail"},I={PLACE_ORDER:"place-order"};function b(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function p(e,r){const t=b();t.push({[e]:null}),t.push({[e]:r})}function Q(e){b().push(t=>{const a=t.getState?t.getState():{};t.push({event:e,eventInfo:{...a}})})}function S(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function U(){p(d.CHANNEL_CONTEXT,S())}function T(e,r){const t=w(r),a=M(e,r);p(d.ORDER_CONTEXT,{...t}),p(d.SHOPPING_CART_CONTEXT,{...a}),p(d.PERSONAL_EMAIL_CONTEXT,{address:r.email}),U(),Q(I.PLACE_ORDER)}class $ extends Error{constructor(r){super(r),this.name="PlaceOrderError"}}const g=e=>{const r=e.map(t=>t.message).join(" ");throw new $(r)},k=`
  mutation PLACE_ORDER_MUTATION($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      ...PLACE_ORDER_FRAGMENT
    }
  }

  ${R}
`,P=async()=>{const e=await D();e&&v("X-ReCaptcha",e)},W=async e=>{if(!e)throw new Error("No cart ID found");return await P(),E(k,{method:"POST",variables:{cartId:e}}).then(r=>{var a,o,n,c,u;(a=r.errors)!=null&&a.length&&O(r.errors),(c=(n=(o=r.data)==null?void 0:o.placeOrder)==null?void 0:n.errors)!=null&&c.length&&g((u=r.data.placeOrder)==null?void 0:u.errors);const t=y(r);return t&&(l.emit("order/placed",t),l.emit("cart/reset",void 0),T(e,t)),t}).catch(h)},F=`
  mutation setPaymentMethodAndPlaceOrder($cartId: String!, $paymentMethod: PaymentMethodInput!) {
    setPaymentMethodOnCart(
      input: {
        cart_id: $cartId
        payment_method: $paymentMethod
      }
    ) {
      cart {
        selected_payment_method {
          code
          title
        }
      }
    }
    placeOrder(input: { cart_id: $cartId }) {
      ...PLACE_ORDER_FRAGMENT
    }
  }

  ${R}
`,Z=async(e,r)=>{if(!e)throw new Error("No cart ID found");if(!r)throw new Error("No payment method found");return E(F,{variables:{cartId:e,paymentMethod:r}}).then(t=>{var o,n,c,u,s,i;(o=t.errors)!=null&&o.length&&O(t.errors),(u=(c=(n=t.data)==null?void 0:n.placeOrder)==null?void 0:c.errors)!=null&&u.length&&g((s=t.data.placeOrder)==null?void 0:s.errors);const a=y({data:{placeOrder:(i=t.data)==null?void 0:i.placeOrder}});return a&&(l.emit("order/placed",a),l.emit("cart/reset",void 0),T(e,a)),a}).catch(h)},X=`
  mutation PLACE_NEGOTIABLE_QUOTE_ORDER_MUTATION($quoteUid: ID!) {
    placeNegotiableQuoteOrderV2(input: { quote_uid: $quoteUid }) {
      ...PLACE_NEGOTIABLE_QUOTE_ORDER_FRAGMENT
    }
  }

  ${L}
`,tt=async e=>{if(!e)throw new Error("No quote UID found");return await P(),E(X,{method:"POST",variables:{quoteUid:e}}).then(r=>{var a,o,n,c,u;(a=r.errors)!=null&&a.length&&O(r.errors),(c=(n=(o=r.data)==null?void 0:o.placeNegotiableQuoteOrderV2)==null?void 0:n.errors)!=null&&c.length&&g((u=r.data.placeNegotiableQuoteOrderV2)==null?void 0:u.errors);const t=G(r);return t&&(l.emit("order/placed",t),T(e,t)),t}).catch(h)};export{at as cancelOrder,At as config,vt as confirmCancelOrder,Lt as confirmGuestReturn,E as fetchGraphQl,dt as getAttributesForm,mt as getAttributesList,ct as getConfig,Tt as getCustomer,_t as getCustomerOrdersReturn,gt as getGuestOrder,xt as getOrderDetailsById,bt as getStoreConfig,Nt as guestOrderByToken,Rt as initialize,tt as placeNegotiableQuoteOrder,W as placeOrder,ut as removeFetchGraphQlHeader,Dt as reorderItems,ot as requestGuestOrderCancel,Et as requestGuestReturn,Ot as requestReturn,st as setEndpoint,v as setFetchGraphQlHeader,it as setFetchGraphQlHeaders,Z as setPaymentMethodAndPlaceOrder};
//# sourceMappingURL=api.js.map
