/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as ce,r as ie}from"./chunks/requestGuestOrderCancel.js";import{s as f,f as m,h as T}from"./chunks/fetch-graphql.js";import{g as de,r as le,a as pe,b as Ee}from"./chunks/fetch-graphql.js";import{g as me}from"./chunks/getAttributesForm.js";import{g as Re,a as Ae,r as he}from"./chunks/requestGuestReturn.js";import{g as Oe,a as Ce}from"./chunks/getGuestOrder.js";import{g as fe}from"./chunks/getCustomerOrdersReturn.js";import{a as M}from"./chunks/initialize.js";import{c as Ne,g as Ge,d as xe,i as ye}from"./chunks/initialize.js";import{g as Fe}from"./chunks/getStoreConfig.js";import{h as R}from"./chunks/network-error.js";import{events as d}from"@dropins/tools/event-bus.js";import{ADDRESS_FRAGMENT as N,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as G,GIFT_CARD_DETAILS_FRAGMENT as x,ORDER_ITEM_DETAILS_FRAGMENT as y,ORDER_SUMMARY_FRAGMENT as b,PRICE_DETAILS_FRAGMENT as F,PRODUCT_DETAILS_FRAGMENT as P,ORDER_ITEM_FRAGMENT as I,GIFT_WRAPPING_FRAGMENT as L,GIFT_MESSAGE_FRAGMENT as S,APPLIED_GIFT_CARDS_FRAGMENT as v}from"./fragments.js";import{verifyReCaptcha as $}from"@dropins/tools/recaptcha.js";import{c as Ie,a as Le,r as Se}from"./chunks/confirmCancelOrder.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-attributes-form.js";import"@dropins/tools/lib.js";const A=(t,r)=>t+r.amount.value,w=(t,r)=>({id:t,totalQuantity:r.totalQuantity,possibleOnepageCheckout:!0,items:r.items.map(e=>{var a,o,n,s,c,i,u,E;return{canApplyMsrp:!0,formattedPrice:"",id:e.id,quantity:e.totalQuantity,product:{canonicalUrl:(a=e.product)==null?void 0:a.canonicalUrl,mainImageUrl:((o=e.product)==null?void 0:o.image)??"",name:((n=e.product)==null?void 0:n.name)??"",productId:0,productType:(s=e.product)==null?void 0:s.productType,sku:((c=e.product)==null?void 0:c.sku)??"",topLevelSku:(i=e.product)==null?void 0:i.sku},prices:{price:{value:e.price.value,currency:e.price.currency,regularPrice:((u=e.regularPrice)==null?void 0:u.value)??e.price.value}},configurableOptions:((E=e.selectedOptions)==null?void 0:E.map(_=>({optionLabel:_.label,valueLabel:_.value})))||[]}}),prices:{subtotalExcludingTax:{value:r.subtotalExclTax.value,currency:r.subtotalExclTax.currency},subtotalIncludingTax:{value:r.subtotalInclTax.value,currency:r.subtotalInclTax.currency}},discountAmount:r.discounts.reduce(A,0)}),k=t=>{var a,o,n;const r=t.coupons[0],e=(a=t.payments)==null?void 0:a[0];return{appliedCouponCode:(r==null?void 0:r.code)??"",email:t.email,grandTotal:t.grandTotal.value,orderId:t.number,orderType:"checkout",otherTax:0,salesTax:t.totalTax.value,shipping:{shippingMethod:((o=t.shipping)==null?void 0:o.code)??"",shippingAmount:((n=t.shipping)==null?void 0:n.amount)??0},subtotalExcludingTax:t.subtotalExclTax.value,subtotalIncludingTax:t.subtotalInclTax.value,payments:e?[{paymentMethodCode:(e==null?void 0:e.code)||"",paymentMethodName:(e==null?void 0:e.name)||"",total:t.grandTotal.value,orderId:t.number}]:[],discountAmount:t.discounts.reduce(A,0),taxAmount:t.totalTax.value}},h=t=>{var e,a;const r=(a=(e=t==null?void 0:t.data)==null?void 0:e.placeOrder)==null?void 0:a.orderV2;return r?M(r):null},l={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext",CHANNEL_CONTEXT:"channelContext"},U={PLACE_ORDER:"place-order"};function g(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function p(t,r){const e=g();e.push({[t]:null}),e.push({[t]:r})}function H(t){g().push(e=>{const a=e.getState?e.getState():{};e.push({event:t,eventInfo:{...a}})})}function Q(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function X(){p(l.CHANNEL_CONTEXT,Q())}function O(t,r){const e=k(r),a=w(t,r);p(l.ORDER_CONTEXT,{...e}),p(l.SHOPPING_CART_CONTEXT,{...a}),X(),H(U.PLACE_ORDER)}class q extends Error{constructor(r){super(r),this.name="PlaceOrderError"}}const C=t=>{const r=t.map(e=>e.message).join(" ");throw new q(r)},D=`
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

  ${N}
  ${G}
  ${x}
  ${y}
  ${b}
  ${F}
  ${P}
  ${I}
  ${L}
  ${S}
  ${v}
`,B=`
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

  ${D}
`,V=async()=>{const t=await $();t&&f("X-ReCaptcha",t)},ae=async t=>{if(!t)throw new Error("No cart ID found");return await V(),m(B,{method:"POST",variables:{cartId:t}}).then(r=>{var a,o,n,s,c;(a=r.errors)!=null&&a.length&&T(r.errors),(s=(n=(o=r.data)==null?void 0:o.placeOrder)==null?void 0:n.errors)!=null&&s.length&&C((c=r.data.placeOrder)==null?void 0:c.errors);const e=h(r);return e&&(d.emit("order/placed",e),d.emit("cart/reset",void 0),O(t,e)),e}).catch(R)},Y=`
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

  ${D}
`,oe=async(t,r)=>{if(!t)throw new Error("No cart ID found");if(!r)throw new Error("No payment method found");return m(Y,{variables:{cartId:t,paymentMethod:r}}).then(e=>{var o,n,s,c,i,u;(o=e.errors)!=null&&o.length&&T(e.errors),(c=(s=(n=e.data)==null?void 0:n.placeOrder)==null?void 0:s.errors)!=null&&c.length&&C((i=e.data.placeOrder)==null?void 0:i.errors);const a=h({data:{placeOrder:(u=e.data)==null?void 0:u.placeOrder}});return a&&(d.emit("order/placed",a),d.emit("cart/reset",void 0),O(t,a)),a}).catch(R)};export{ce as cancelOrder,Ne as config,Ie as confirmCancelOrder,Le as confirmGuestReturn,m as fetchGraphQl,me as getAttributesForm,Re as getAttributesList,de as getConfig,Oe as getCustomer,fe as getCustomerOrdersReturn,Ce as getGuestOrder,Ge as getOrderDetailsById,Fe as getStoreConfig,xe as guestOrderByToken,ye as initialize,ae as placeOrder,le as removeFetchGraphQlHeader,Se as reorderItems,ie as requestGuestOrderCancel,Ae as requestGuestReturn,he as requestReturn,pe as setEndpoint,f as setFetchGraphQlHeader,Ee as setFetchGraphQlHeaders,oe as setPaymentMethodAndPlaceOrder};
//# sourceMappingURL=api.js.map
