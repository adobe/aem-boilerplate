/*! Copyright 2026 Adobe
All Rights Reserved. */
import{PRODUCT_DETAILS_FRAGMENT as s,PRICE_DETAILS_FRAGMENT as i,GIFT_CARD_DETAILS_FRAGMENT as A,ORDER_ITEM_DETAILS_FRAGMENT as d,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as c,ORDER_SUMMARY_FRAGMENT as D,ADDRESS_FRAGMENT as G,ORDER_ITEM_FRAGMENT as u,GIFT_WRAPPING_FRAGMENT as M,GIFT_MESSAGE_FRAGMENT as N,GUEST_ORDER_FRAGMENT as O}from"../fragments.js";import{f as R,h as a}from"./fetch-graphql.js";import{a as T}from"./initialize.js";const m=`
  mutation CANCEL_ORDER_MUTATION($orderId: ID!, $reason: String!) {
    cancelOrder(input: { order_id: $orderId, reason: $reason }) {
      error
      order {
        email
        available_actions
        status
        number
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
  ${s}
  ${i}
  ${A}
  ${d}
  ${c}
  ${D}
  ${G}
  ${u}
  ${M}
  ${N}
`,p=async(r,e,n,t)=>{if(!r)throw new Error("No order ID found");if(!e)throw new Error("No reason found");return R(m,{variables:{orderId:r,reason:e}}).then(({errors:E,data:_})=>{if(E)return a(E);if(_.cancelOrder.error!=null){t();return}const o=T(_.cancelOrder.order);n(o)}).catch(()=>t())},I=`
  mutation REQUEST_GUEST_ORDER_CANCEL_MUTATION(
    $token: String!
    $reason: String!
  ) {
    requestGuestOrderCancel(input: { token: $token, reason: $reason }) {
      error
      order {
        ...GUEST_ORDER_FRAGMENT
      }
    }
  }
  ${O}
`,f=async(r,e,n,t)=>{if(!r)throw new Error("No order token found");if(!e)throw new Error("No reason found");return R(I,{variables:{token:r,reason:e}}).then(({errors:E,data:_})=>{if(E)return a(E);_.requestGuestOrderCancel.error!=null&&t();const o=T(_.requestGuestOrderCancel.order);n(o)}).catch(()=>t())};export{p as c,f as r};
//# sourceMappingURL=requestGuestOrderCancel.js.map
