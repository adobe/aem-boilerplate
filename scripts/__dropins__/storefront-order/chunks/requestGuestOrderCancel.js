/*! Copyright 2024 Adobe
All Rights Reserved. */
import{P as _,a as l,G as E,O as c,B as m,t as d}from"./transform-order-details.js";import{O,A as D,G as R}from"./getGuestOrder.graphql.js";import{f as i,h as u}from"./fetch-graphql.js";const T=`
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
            ...OrderItemDetails
            ... on GiftCardOrderItem {
              ...GiftCardDetails
              product {
                ...ProductDetails
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
        ...AddressesList
      }
      billing_address {
        ...AddressesList
      }
      items {
        ...OrderItemDetails
        ... on BundleOrderItem {
          ...BundleOrderItemDetails
        }
        ... on GiftCardOrderItem {
          ...GiftCardDetails
          product {
            ...ProductDetails
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
        ...OrderSummary
      }
    }
  }
}
${_}
${l}
${E}
${c}
${m}
${O}
${D}  
`,G=async(r,e,o,n)=>{if(!r)throw new Error("No order ID found");if(!e)throw new Error("No reason found");return i(T,{variables:{orderId:r,reason:e}}).then(({errors:t,data:a})=>{if(t)return u(t);if(a.cancelOrder.error!=null){n();return}const s=d(a.cancelOrder.order);o(s)})},A=`
mutation REQUEST_GUEST_ORDER_CANCEL_MUTATION($token: String!, $reason: String!) {
  requestGuestOrderCancel(input: { token: $token, reason: $reason }) {
    error
    order {
      ...guestOrderData
    }
  }
}
${R}
`,C=async(r,e,o,n)=>{if(!r)throw new Error("No order token found");if(!e)throw new Error("No reason found");return i(A,{variables:{token:r,reason:e}}).then(({errors:t,data:a})=>{if(t)return u(t);if(a.requestGuestOrderCancel.error!=null)return n(),!1;const s=d(a.requestGuestOrderCancel.order);return o(s),!0})};export{G as c,C as r};
