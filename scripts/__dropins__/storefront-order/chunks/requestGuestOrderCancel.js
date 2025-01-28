/*! Copyright 2025 Adobe
All Rights Reserved. */
import{PRODUCT_DETAILS_FRAGMENT as d,PRICE_DETAILS_FRAGMENT as s,GIFT_CARD_DETAILS_FRAGMENT as i,ORDER_ITEM_DETAILS_FRAGMENT as A,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as D,ORDER_SUMMARY_FRAGMENT as c,ADDRESS_FRAGMENT as u,GUEST_ORDER_FRAGMENT as G}from"../fragments.js";import{f as a,h as R}from"./fetch-graphql.js";import{a as T}from"./initialize.js";const N=`
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
  ${d}
  ${s}
  ${i}
  ${A}
  ${D}
  ${c}
  ${u}
`,M=async(r,e,_,t)=>{if(!r)throw new Error("No order ID found");if(!e)throw new Error("No reason found");return a(N,{variables:{orderId:r,reason:e}}).then(({errors:o,data:n})=>{if(o)return R(o);if(n.cancelOrder.error!=null){t();return}const E=T(n.cancelOrder.order);_(E)}).catch(()=>t())},O=`
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
  ${G}
`,S=async(r,e,_,t)=>{if(!r)throw new Error("No order token found");if(!e)throw new Error("No reason found");return a(O,{variables:{token:r,reason:e}}).then(({errors:o,data:n})=>{if(o)return R(o);n.requestGuestOrderCancel.error!=null&&t();const E=T(n.requestGuestOrderCancel.order);_(E)}).catch(()=>t())};export{M as c,S as r};
