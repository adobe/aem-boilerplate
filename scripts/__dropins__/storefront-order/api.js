/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as K,r as Z}from"./chunks/requestGuestOrderCancel.js";import{f as R,h as g}from"./chunks/fetch-graphql.js";import{g as re,r as te,s as ae,a as oe,b as ne}from"./chunks/fetch-graphql.js";import{g as ce}from"./chunks/getAttributesForm.js";import{g as ie,a as le,r as pe}from"./chunks/requestGuestReturn.js";import{g as Ee,a as Te}from"./chunks/getGuestOrder.js";import{g as me}from"./chunks/getCustomerOrdersReturn.js";import{a as A}from"./chunks/initialize.js";import{c as ge,g as Ae,d as De,i as he}from"./chunks/initialize.js";import{g as Ge}from"./chunks/getStoreConfig.js";import{h as D}from"./chunks/network-error.js";import{events as d}from"@dropins/tools/event-bus.js";import{PRODUCT_DETAILS_FRAGMENT as h,PRICE_DETAILS_FRAGMENT as O,GIFT_CARD_DETAILS_FRAGMENT as G,ORDER_ITEM_DETAILS_FRAGMENT as f,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as x,ORDER_SUMMARY_FRAGMENT as M,ADDRESS_FRAGMENT as C,ORDER_ITEM_FRAGMENT as N,GIFT_WRAPPING_FRAGMENT as b,GIFT_MESSAGE_FRAGMENT as F,APPLIED_GIFT_CARDS_FRAGMENT as I}from"./fragments.js";import{a as xe,c as Me,r as Ce}from"./chunks/confirmCancelOrder.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-attributes-form.js";import"@dropins/tools/lib.js";const _=(r,t)=>r+t.amount.value,S=(r,t)=>({id:r,totalQuantity:t.totalQuantity,possibleOnepageCheckout:!0,items:t.items.map(e=>{var a,o,n,s,c,u,i,l;return{canApplyMsrp:!0,formattedPrice:"",id:e.id,quantity:e.totalQuantity,product:{canonicalUrl:(a=e.product)==null?void 0:a.canonicalUrl,mainImageUrl:((o=e.product)==null?void 0:o.image)??"",name:((n=e.product)==null?void 0:n.name)??"",productId:0,productType:(s=e.product)==null?void 0:s.productType,sku:((c=e.product)==null?void 0:c.sku)??"",topLevelSku:(u=e.product)==null?void 0:u.sku},prices:{price:{value:e.price.value,currency:e.price.currency,regularPrice:((i=e.regularPrice)==null?void 0:i.value)??e.price.value}},configurableOptions:((l=e.selectedOptions)==null?void 0:l.map(p=>({optionLabel:p.label,valueLabel:p.value})))||[]}}),prices:{subtotalExcludingTax:{value:t.subtotalExclTax.value,currency:t.subtotalExclTax.currency},subtotalIncludingTax:{value:t.subtotalInclTax.value,currency:t.subtotalInclTax.currency}},discountAmount:t.discounts.reduce(_,0)}),v=r=>{var a,o,n;const t=r.coupons[0],e=(a=r.payments)==null?void 0:a[0];return{appliedCouponCode:(t==null?void 0:t.code)??"",email:r.email,grandTotal:r.grandTotal.value,orderId:r.number,orderType:"checkout",otherTax:0,salesTax:r.totalTax.value,shipping:{shippingMethod:((o=r.shipping)==null?void 0:o.code)??"",shippingAmount:((n=r.shipping)==null?void 0:n.amount)??0},subtotalExcludingTax:r.subtotalExclTax.value,subtotalIncludingTax:r.subtotalInclTax.value,payments:e?[{paymentMethodCode:(e==null?void 0:e.code)||"",paymentMethodName:(e==null?void 0:e.name)||"",total:r.grandTotal.value,orderId:r.number}]:[],discountAmount:r.discounts.reduce(_,0),taxAmount:r.totalTax.value}},y=r=>{var e,a;const t=(a=(e=r==null?void 0:r.data)==null?void 0:e.placeOrder)==null?void 0:a.orderV2;return t?A(t):null},E={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext"},L={PLACE_ORDER:"place-order"};function m(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function T(r,t){const e=m();e.push({[r]:null}),e.push({[r]:t})}function P(r){m().push(e=>{const a=e.getState?e.getState():{};e.push({event:r,eventInfo:{...a}})})}function $(r,t){const e=v(t),a=S(r,t);T(E.ORDER_CONTEXT,{...e}),T(E.SHOPPING_CART_CONTEXT,{...a}),P(L.PLACE_ORDER)}class w extends Error{constructor(t){super(t),this.name="PlaceOrderError"}}const k=r=>{const t=r.map(e=>e.message).join(" ");throw new w(t)},U=`
  mutation PLACE_ORDER_MUTATION($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      errors {
        code
        message
      }
      orderV2 {
        printed_card_included
        gift_receipt_included
        gift_wrapping {
          ...GIFT_WRAPPING_FRAGMENT
        }
        gift_message {
          ...GIFT_MESSAGE_FRAGMENT
        }
        applied_gift_cards {
          ...APPLIED_GIFT_CARDS_FRAGMENT
        }
        email
        available_actions
        status
        number
        token
        id
        order_date
        carrier
        shipping_method
        is_virtual
        applied_coupons {
          code
        }
        shipments {
          id
          number
          tracking {
            title
            number
            carrier
          }
          comments {
            message
            timestamp
          }
          items {
            id
            product_sku
            product_name
            order_item {
              ...ORDER_ITEM_DETAILS_FRAGMENT
              ... on GiftCardOrderItem {
                ...GIFT_CARD_DETAILS_FRAGMENT
                product {
                  ...PRODUCT_DETAILS_FRAGMENT
                }
              }
            }
          }
        }
        payment_methods {
          name
          type
        }
        shipping_address {
          ...ADDRESS_FRAGMENT
        }
        billing_address {
          ...ADDRESS_FRAGMENT
        }
        items {
          ...ORDER_ITEM_FRAGMENT
        }
        total {
          ...ORDER_SUMMARY_FRAGMENT
        }
      }
    }
  }
  ${h}
  ${O}
  ${G}
  ${f}
  ${x}
  ${M}
  ${C}
  ${N}
  ${b}
  ${F}
  ${I}
`,j=async r=>{if(!r)throw new Error("No cart ID found");return R(U,{variables:{cartId:r}}).then(t=>{var a,o,n,s,c;(a=t.errors)!=null&&a.length&&g(t.errors),(s=(n=(o=t.data)==null?void 0:o.placeOrder)==null?void 0:n.errors)!=null&&s.length&&k((c=t.data.placeOrder)==null?void 0:c.errors);const e=y(t);return e&&(d.emit("order/placed",e),d.emit("cart/reset",void 0),$(r,e)),e}).catch(D)};export{K as cancelOrder,ge as config,xe as confirmCancelOrder,Me as confirmGuestReturn,R as fetchGraphQl,ce as getAttributesForm,ie as getAttributesList,re as getConfig,Ee as getCustomer,me as getCustomerOrdersReturn,Te as getGuestOrder,Ae as getOrderDetailsById,Ge as getStoreConfig,De as guestOrderByToken,he as initialize,j as placeOrder,te as removeFetchGraphQlHeader,Ce as reorderItems,Z as requestGuestOrderCancel,le as requestGuestReturn,pe as requestReturn,ae as setEndpoint,oe as setFetchGraphQlHeader,ne as setFetchGraphQlHeaders};
