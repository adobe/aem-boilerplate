/*! Copyright 2024 Adobe
All Rights Reserved. */
import{c as V,r as Y}from"./chunks/requestGuestOrderCancel.js";import{f as R,h as A}from"./chunks/fetch-graphql.js";import{g as j,r as J,s as K,a as W,b as Z}from"./chunks/fetch-graphql.js";import{g as te}from"./chunks/getAttributesForm.js";import{g as oe,a as ae,r as ne}from"./chunks/requestGuestReturn.js";import{g as ue,a as ce}from"./chunks/getGuestOrder.js";import{g as le}from"./chunks/getCustomerOrdersReturn.js";import{a as D}from"./chunks/initialize.js";import{c as de,g as Te,b as Ee,i as me}from"./chunks/initialize.js";import{g as Re}from"./chunks/getStoreConfig.js";import{h as g}from"./chunks/network-error.js";import{events as d}from"@dropins/tools/event-bus.js";import{PRODUCT_DETAILS_FRAGMENT as O,PRICE_DETAILS_FRAGMENT as h,GIFT_CARD_DETAILS_FRAGMENT as f,ORDER_ITEM_DETAILS_FRAGMENT as x,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as C,ORDER_SUMMARY_FRAGMENT as b,ADDRESS_FRAGMENT as G}from"./fragments.js";import{a as De,c as ge,r as Oe}from"./chunks/confirmCancelOrder.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-attributes-form.js";import"@dropins/tools/lib.js";const m=(t,r)=>t+r.amount.value,M=(t,r)=>({id:t,totalQuantity:r.totalQuantity,possibleOnepageCheckout:!0,items:r.items.map(e=>{var o,a,n,s,u,c,i,l;return{canApplyMsrp:!0,formattedPrice:"",id:e.id,quantity:e.totalQuantity,product:{canonicalUrl:(o=e.product)==null?void 0:o.canonicalUrl,mainImageUrl:((a=e.product)==null?void 0:a.image)??"",name:((n=e.product)==null?void 0:n.name)??"",productId:0,productType:(s=e.product)==null?void 0:s.productType,sku:((u=e.product)==null?void 0:u.sku)??"",topLevelSku:(c=e.product)==null?void 0:c.sku},prices:{price:{value:e.price.value,currency:e.price.currency,regularPrice:((i=e.regularPrice)==null?void 0:i.value)??e.price.value}},configurableOptions:((l=e.selectedOptions)==null?void 0:l.map(p=>({optionLabel:p.label,valueLabel:p.value})))||[]}}),prices:{subtotalExcludingTax:{value:r.subtotalExclTax.value,currency:r.subtotalExclTax.currency},subtotalIncludingTax:{value:r.subtotalInclTax.value,currency:r.subtotalInclTax.currency}},discountAmount:r.discounts.reduce(m,0)}),I=t=>{var o,a,n;const r=t.coupons[0],e=(o=t.payments)==null?void 0:o[0];return{appliedCouponCode:(r==null?void 0:r.code)??"",email:t.email,grandTotal:t.grandTotal.value,orderId:t.number,orderType:"checkout",otherTax:0,salesTax:t.totalTax.value,shipping:{shippingMethod:((a=t.shipping)==null?void 0:a.code)??"",shippingAmount:((n=t.shipping)==null?void 0:n.amount)??0},subtotalExcludingTax:t.subtotalExclTax.value,subtotalIncludingTax:t.subtotalInclTax.value,payments:e?[{paymentMethodCode:(e==null?void 0:e.code)||"",paymentMethodName:(e==null?void 0:e.name)||"",total:t.grandTotal.value,orderId:t.number}]:[],discountAmount:t.discounts.reduce(m,0),taxAmount:t.totalTax.value}},N=t=>{var e,o;const r=(o=(e=t==null?void 0:t.data)==null?void 0:e.placeOrder)==null?void 0:o.orderV2;return r?D(r):null},T={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext"},v={PLACE_ORDER:"place-order"};function _(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function E(t,r){const e=_();e.push({[t]:null}),e.push({[t]:r})}function L(t){_().push(e=>{const o=e.getState?e.getState():{};e.push({event:t,eventInfo:{...o}})})}function y(t,r){const e=I(r),o=M(t,r);E(T.ORDER_CONTEXT,{...e}),E(T.SHOPPING_CART_CONTEXT,{...o}),L(v.PLACE_ORDER)}const S=`
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
          ...ORDER_ITEM_DETAILS_FRAGMENT
          ... on BundleOrderItem {
            ...BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT
          }
          ... on GiftCardOrderItem {
            ...GIFT_CARD_DETAILS_FRAGMENT
            product {
              ...PRODUCT_DETAILS_FRAGMENT
            }
          }
          ... on DownloadableOrderItem {
            product_name
            downloadable_links {
              sort_order
              title
            }
          }
        }
        total {
          ...ORDER_SUMMARY_FRAGMENT
        }
      }
    }
  }
  ${O}
  ${h}
  ${f}
  ${x}
  ${C}
  ${b}
  ${G}
`,H=async t=>{if(!t)throw new Error("No cart ID found");return R(S,{variables:{cartId:t}}).then(r=>{var o;(o=r.errors)!=null&&o.length&&A(r.errors);const e=N(r);return e&&(d.emit("order/placed",e),d.emit("cart/reset",void 0),y(t,e)),e}).catch(g)};export{V as cancelOrder,de as config,De as confirmCancelOrder,ge as confirmGuestReturn,R as fetchGraphQl,te as getAttributesForm,oe as getAttributesList,j as getConfig,ue as getCustomer,le as getCustomerOrdersReturn,ce as getGuestOrder,Te as getOrderDetailsById,Re as getStoreConfig,Ee as guestOrderByToken,me as initialize,H as placeOrder,J as removeFetchGraphQlHeader,Oe as reorderItems,Y as requestGuestOrderCancel,ae as requestGuestReturn,ne as requestReturn,K as setEndpoint,W as setFetchGraphQlHeader,Z as setFetchGraphQlHeaders};
