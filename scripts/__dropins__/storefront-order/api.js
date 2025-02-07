/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as z,r as J}from"./chunks/requestGuestOrderCancel.js";import{f as _,h as g}from"./chunks/fetch-graphql.js";import{g as W,r as Z,s as ee,a as re,b as te}from"./chunks/fetch-graphql.js";import{g as oe}from"./chunks/getAttributesForm.js";import{g as se,a as ce,r as ue}from"./chunks/requestGuestReturn.js";import{g as le,a as pe}from"./chunks/getGuestOrder.js";import{g as me}from"./chunks/getCustomerOrdersReturn.js";import{a as h}from"./chunks/initialize.js";import{d as Te,g as Re,c as _e,i as ge}from"./chunks/initialize.js";import{g as Ae}from"./chunks/getStoreConfig.js";import{h as A}from"./chunks/network-error.js";import{events as d}from"@dropins/tools/event-bus.js";import{PRODUCT_DETAILS_FRAGMENT as O,PRICE_DETAILS_FRAGMENT as D,GIFT_CARD_DETAILS_FRAGMENT as x,ORDER_ITEM_DETAILS_FRAGMENT as f,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as C,ORDER_SUMMARY_FRAGMENT as b,ADDRESS_FRAGMENT as M,ORDER_ITEM_FRAGMENT as v}from"./fragments.js";import{a as De,c as xe,r as fe}from"./chunks/confirmCancelOrder.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-attributes-form.js";import"@dropins/tools/lib.js";const T=(r,t)=>r+t.amount.value,y=(r,t)=>({id:r,totalQuantity:t.totalQuantity,possibleOnepageCheckout:!0,items:t.items.map(e=>{var a,o,n,s,c,u,i,l;return{canApplyMsrp:!0,formattedPrice:"",id:e.id,quantity:e.totalQuantity,product:{canonicalUrl:(a=e.product)==null?void 0:a.canonicalUrl,mainImageUrl:((o=e.product)==null?void 0:o.image)??"",name:((n=e.product)==null?void 0:n.name)??"",productId:0,productType:(s=e.product)==null?void 0:s.productType,sku:((c=e.product)==null?void 0:c.sku)??"",topLevelSku:(u=e.product)==null?void 0:u.sku},prices:{price:{value:e.price.value,currency:e.price.currency,regularPrice:((i=e.regularPrice)==null?void 0:i.value)??e.price.value}},configurableOptions:((l=e.selectedOptions)==null?void 0:l.map(p=>({optionLabel:p.label,valueLabel:p.value})))||[]}}),prices:{subtotalExcludingTax:{value:t.subtotalExclTax.value,currency:t.subtotalExclTax.currency},subtotalIncludingTax:{value:t.subtotalInclTax.value,currency:t.subtotalInclTax.currency}},discountAmount:t.discounts.reduce(T,0)}),G=r=>{var a,o,n;const t=r.coupons[0],e=(a=r.payments)==null?void 0:a[0];return{appliedCouponCode:(t==null?void 0:t.code)??"",email:r.email,grandTotal:r.grandTotal.value,orderId:r.number,orderType:"checkout",otherTax:0,salesTax:r.totalTax.value,shipping:{shippingMethod:((o=r.shipping)==null?void 0:o.code)??"",shippingAmount:((n=r.shipping)==null?void 0:n.amount)??0},subtotalExcludingTax:r.subtotalExclTax.value,subtotalIncludingTax:r.subtotalInclTax.value,payments:e?[{paymentMethodCode:(e==null?void 0:e.code)||"",paymentMethodName:(e==null?void 0:e.name)||"",total:r.grandTotal.value,orderId:r.number}]:[],discountAmount:r.discounts.reduce(T,0),taxAmount:r.totalTax.value}},N=r=>{var e,a;const t=(a=(e=r==null?void 0:r.data)==null?void 0:e.placeOrder)==null?void 0:a.orderV2;return t?h(t):null},m={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext"},L={PLACE_ORDER:"place-order"};function R(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function E(r,t){const e=R();e.push({[r]:null}),e.push({[r]:t})}function S(r){R().push(e=>{const a=e.getState?e.getState():{};e.push({event:r,eventInfo:{...a}})})}function F(r,t){const e=G(t),a=y(r,t);E(m.ORDER_CONTEXT,{...e}),E(m.SHOPPING_CART_CONTEXT,{...a}),S(L.PLACE_ORDER)}class I extends Error{constructor(t){super(t),this.name="PlaceOrderError"}}const P=r=>{const t=r.map(e=>e.message).join(" ");throw new I(t)},k=`
  mutation PLACE_ORDER_MUTATION($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      errors {
        code
        message
      }
      orderV2 {
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
  ${O}
  ${D}
  ${x}
  ${f}
  ${C}
  ${b}
  ${M}
  ${v}
`,V=async r=>{if(!r)throw new Error("No cart ID found");return _(k,{variables:{cartId:r}}).then(t=>{var a,o,n,s,c;(a=t.errors)!=null&&a.length&&g(t.errors),(s=(n=(o=t.data)==null?void 0:o.placeOrder)==null?void 0:n.errors)!=null&&s.length&&P((c=t.data.placeOrder)==null?void 0:c.errors);const e=N(t);return e&&(d.emit("order/placed",e),d.emit("cart/reset",void 0),F(r,e)),e}).catch(A)};export{z as cancelOrder,Te as config,De as confirmCancelOrder,xe as confirmGuestReturn,_ as fetchGraphQl,oe as getAttributesForm,se as getAttributesList,W as getConfig,le as getCustomer,me as getCustomerOrdersReturn,pe as getGuestOrder,Re as getOrderDetailsById,Ae as getStoreConfig,_e as guestOrderByToken,ge as initialize,V as placeOrder,Z as removeFetchGraphQlHeader,fe as reorderItems,J as requestGuestOrderCancel,ce as requestGuestReturn,ue as requestReturn,ee as setEndpoint,re as setFetchGraphQlHeader,te as setFetchGraphQlHeaders};
