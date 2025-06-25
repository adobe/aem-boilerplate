/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as re,r as te}from"./chunks/requestGuestOrderCancel.js";import{f as m,h as T}from"./chunks/fetch-graphql.js";import{g as oe,r as ne,s as se,a as ce,b as ie}from"./chunks/fetch-graphql.js";import{g as de}from"./chunks/getAttributesForm.js";import{g as pe,a as Ee,r as _e}from"./chunks/requestGuestReturn.js";import{g as Te,a as Re}from"./chunks/getGuestOrder.js";import{g as ge}from"./chunks/getCustomerOrdersReturn.js";import{a as f}from"./chunks/initialize.js";import{c as he,g as De,d as Me,i as fe}from"./chunks/initialize.js";import{g as Ce}from"./chunks/getStoreConfig.js";import{h as R}from"./chunks/network-error.js";import{events as d}from"@dropins/tools/event-bus.js";import{ADDRESS_FRAGMENT as G,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as C,GIFT_CARD_DETAILS_FRAGMENT as N,ORDER_ITEM_DETAILS_FRAGMENT as x,ORDER_SUMMARY_FRAGMENT as y,PRICE_DETAILS_FRAGMENT as F,PRODUCT_DETAILS_FRAGMENT as I,ORDER_ITEM_FRAGMENT as P,GIFT_WRAPPING_FRAGMENT as b,GIFT_MESSAGE_FRAGMENT as S,APPLIED_GIFT_CARDS_FRAGMENT as v}from"./fragments.js";import{c as xe,a as ye,r as Fe}from"./chunks/confirmCancelOrder.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-attributes-form.js";import"@dropins/tools/lib.js";const A=(r,t)=>r+t.amount.value,L=(r,t)=>({id:r,totalQuantity:t.totalQuantity,possibleOnepageCheckout:!0,items:t.items.map(e=>{var a,o,n,s,c,i,u,l;return{canApplyMsrp:!0,formattedPrice:"",id:e.id,quantity:e.totalQuantity,product:{canonicalUrl:(a=e.product)==null?void 0:a.canonicalUrl,mainImageUrl:((o=e.product)==null?void 0:o.image)??"",name:((n=e.product)==null?void 0:n.name)??"",productId:0,productType:(s=e.product)==null?void 0:s.productType,sku:((c=e.product)==null?void 0:c.sku)??"",topLevelSku:(i=e.product)==null?void 0:i.sku},prices:{price:{value:e.price.value,currency:e.price.currency,regularPrice:((u=e.regularPrice)==null?void 0:u.value)??e.price.value}},configurableOptions:((l=e.selectedOptions)==null?void 0:l.map(p=>({optionLabel:p.label,valueLabel:p.value})))||[]}}),prices:{subtotalExcludingTax:{value:t.subtotalExclTax.value,currency:t.subtotalExclTax.currency},subtotalIncludingTax:{value:t.subtotalInclTax.value,currency:t.subtotalInclTax.currency}},discountAmount:t.discounts.reduce(A,0)}),$=r=>{var a,o,n;const t=r.coupons[0],e=(a=r.payments)==null?void 0:a[0];return{appliedCouponCode:(t==null?void 0:t.code)??"",email:r.email,grandTotal:r.grandTotal.value,orderId:r.number,orderType:"checkout",otherTax:0,salesTax:r.totalTax.value,shipping:{shippingMethod:((o=r.shipping)==null?void 0:o.code)??"",shippingAmount:((n=r.shipping)==null?void 0:n.amount)??0},subtotalExcludingTax:r.subtotalExclTax.value,subtotalIncludingTax:r.subtotalInclTax.value,payments:e?[{paymentMethodCode:(e==null?void 0:e.code)||"",paymentMethodName:(e==null?void 0:e.name)||"",total:r.grandTotal.value,orderId:r.number}]:[],discountAmount:r.discounts.reduce(A,0),taxAmount:r.totalTax.value}},g=r=>{var e,a;const t=(a=(e=r==null?void 0:r.data)==null?void 0:e.placeOrder)==null?void 0:a.orderV2;return t?f(t):null},E={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext"},w={PLACE_ORDER:"place-order"};function O(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function _(r,t){const e=O();e.push({[r]:null}),e.push({[r]:t})}function k(r){O().push(e=>{const a=e.getState?e.getState():{};e.push({event:r,eventInfo:{...a}})})}function h(r,t){const e=$(t),a=L(r,t);_(E.ORDER_CONTEXT,{...e}),_(E.SHOPPING_CART_CONTEXT,{...a}),k(w.PLACE_ORDER)}class U extends Error{constructor(t){super(t),this.name="PlaceOrderError"}}const D=r=>{const t=r.map(e=>e.message).join(" ");throw new U(t)},M=`
  fragment PLACE_ORDER_FRAGMENT on CustomerOrder {
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

  ${G}
  ${C}
  ${N}
  ${x}
  ${y}
  ${F}
  ${I}
  ${P}
  ${b}
  ${S}
  ${v}
`,Q=`
  mutation PLACE_ORDER_MUTATION($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      errors {
        code
        message
      }
      orderV2 {
        ...PLACE_ORDER_FRAGMENT
      }
    }
  }

  ${M}
`,J=async r=>{if(!r)throw new Error("No cart ID found");return m(Q,{variables:{cartId:r}}).then(t=>{var a,o,n,s,c;(a=t.errors)!=null&&a.length&&T(t.errors),(s=(n=(o=t.data)==null?void 0:o.placeOrder)==null?void 0:n.errors)!=null&&s.length&&D((c=t.data.placeOrder)==null?void 0:c.errors);const e=g(t);return e&&(d.emit("order/placed",e),d.emit("cart/reset",void 0),h(r,e)),e}).catch(R)},H=`
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
      errors {
        code
        message
      }
      orderV2 {
        ...PLACE_ORDER_FRAGMENT
      }
    }
  }

  ${M}
`,K=async(r,t)=>{if(!r)throw new Error("No cart ID found");if(!t)throw new Error("No payment method found");return m(H,{variables:{cartId:r,paymentMethod:t}}).then(e=>{var o,n,s,c,i,u;(o=e.errors)!=null&&o.length&&T(e.errors),(c=(s=(n=e.data)==null?void 0:n.placeOrder)==null?void 0:s.errors)!=null&&c.length&&D((i=e.data.placeOrder)==null?void 0:i.errors);const a=g({data:{placeOrder:(u=e.data)==null?void 0:u.placeOrder}});return a&&(d.emit("order/placed",a),d.emit("cart/reset",void 0),h(r,a)),a}).catch(R)};export{re as cancelOrder,he as config,xe as confirmCancelOrder,ye as confirmGuestReturn,m as fetchGraphQl,de as getAttributesForm,pe as getAttributesList,oe as getConfig,Te as getCustomer,ge as getCustomerOrdersReturn,Re as getGuestOrder,De as getOrderDetailsById,Ce as getStoreConfig,Me as guestOrderByToken,fe as initialize,J as placeOrder,ne as removeFetchGraphQlHeader,Fe as reorderItems,te as requestGuestOrderCancel,Ee as requestGuestReturn,_e as requestReturn,se as setEndpoint,ce as setFetchGraphQlHeader,ie as setFetchGraphQlHeaders,K as setPaymentMethodAndPlaceOrder};
