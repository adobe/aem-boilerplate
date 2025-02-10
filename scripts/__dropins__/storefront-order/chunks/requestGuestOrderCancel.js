/*! Copyright 2025 Adobe
All Rights Reserved. */
import{PRODUCT_DETAILS_FRAGMENT as T,PRICE_DETAILS_FRAGMENT as i,GIFT_CARD_DETAILS_FRAGMENT as d,ORDER_ITEM_DETAILS_FRAGMENT as A,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as c,ORDER_SUMMARY_FRAGMENT as D,ADDRESS_FRAGMENT as u,ORDER_ITEM_FRAGMENT as M,GUEST_ORDER_FRAGMENT as N}from"../fragments.js";import{f as a,h as R}from"./fetch-graphql.js";import{a as s}from"./initialize.js";const G=`
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
  ${T}
  ${i}
  ${d}
  ${A}
  ${c}
  ${D}
  ${u}
  ${M}
`,I=async(r,e,E,t)=>{if(!r)throw new Error("No order ID found");if(!e)throw new Error("No reason found");return a(G,{variables:{orderId:r,reason:e}}).then(({errors:n,data:o})=>{if(n)return R(n);if(o.cancelOrder.error!=null){t();return}const _=s(o.cancelOrder.order);E(_)}).catch(()=>t())},O=`
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
  ${N}
`,p=async(r,e,E,t)=>{if(!r)throw new Error("No order token found");if(!e)throw new Error("No reason found");return a(O,{variables:{token:r,reason:e}}).then(({errors:n,data:o})=>{if(n)return R(n);o.requestGuestOrderCancel.error!=null&&t();const _=s(o.requestGuestOrderCancel.order);E(_)}).catch(()=>t())};export{I as c,p as r};
