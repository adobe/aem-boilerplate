/*! Copyright 2024 Adobe
All Rights Reserved. */
import{Initializer as I}from"@dropins/tools/lib.js";import{events as d}from"@dropins/tools/event-bus.js";import{f as n,h as m}from"./chunks/fetch-graphql.js";import{g as P,r as U,s as Y,a as q,b as Q}from"./chunks/fetch-graphql.js";import{h as l}from"./chunks/network-error.js";import{P as u,a as _,G as c,O as p,B as O,R as h,c as T}from"./chunks/transform-order-details.js";import{O as D,A as R}from"./chunks/getGuestOrder.graphql.js";import{t as G}from"./chunks/getCustomer.js";import{a as H,g as K}from"./chunks/getCustomer.js";import{g as J}from"./chunks/getAttributesForm.js";import{g as W}from"./chunks/getStoreConfig.js";import{g as Z}from"./chunks/getCustomerOrdersReturn.js";import{c as re,r as te}from"./chunks/requestGuestOrderCancel.js";import{r as se}from"./chunks/reorderItems.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/convertCase.js";const b=`
query ORDER_BY_NUMBER($orderNumber: String!) {
 customer {
    orders(
      filter: { number: { eq: $orderNumber } }
    ) {
      items {
        email
        available_actions
        status
        number
        id
        order_date
        order_status_change_date
        carrier
        shipping_method
        is_virtual
        returns {
          ...OrderReturns
        }
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
}
${u}
${_}
${c}
${p}
${O}
${D}
${R}
${h}
`,f=async(e,r,t)=>await n(b,{method:"GET",cache:"force-cache",variables:{orderNumber:e}}).then(a=>{var s;return(s=a.errors)!=null&&s.length?m(a.errors):T(t??"orderData",a,r)}).catch(l),y=`
query ORDER_BY_TOKEN($token: String!) {
  guestOrderByToken(input: { token: $token }) {
    email
    id
    number
    order_date
    order_status_change_date
    status
    token
    carrier
    shipping_method
    printed_card_included
    gift_receipt_included
    available_actions
    is_virtual
    returns {
      ...OrderReturns
    }
    payment_methods {
      name
      type
    }
    applied_coupons {
      code
    }
    shipments {
      id
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
${u}
${_}
${c}
${p}
${O}
${D}
${R}
${h}
`,A=async(e,r)=>await n(y,{method:"GET",cache:"no-cache",variables:{token:e}}).then(t=>{var a;return(a=t.errors)!=null&&a.length?m(t.errors):G(t,r)}).catch(l),$=async e=>{var i;const r=(e==null?void 0:e.orderRef)??"",t=(e==null?void 0:e.returnRef)??"",a=r&&typeof(e==null?void 0:e.orderRef)=="string"&&((i=e==null?void 0:e.orderRef)==null?void 0:i.length)>20,s=(e==null?void 0:e.orderData)??null;if(s){d.emit("order/data",{...s,returnNumber:t});return}if(!r){console.error("Order Token or number not received.");return}const o=a?await A(r,t):await f(r,t,"orderData");o?d.emit("order/data",{...o,returnNumber:t}):d.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},E=new I({init:async e=>{const r={};E.config.setConfig({...r,...e}),$(e).catch(console.error)},listeners:()=>[]}),v=E.config;export{re as cancelOrder,v as config,n as fetchGraphQl,J as getAttributesForm,P as getConfig,H as getCustomer,Z as getCustomerOrdersReturn,K as getGuestOrder,f as getOrderDetailsById,W as getStoreConfig,A as guestOrderByToken,E as initialize,U as removeFetchGraphQlHeader,se as reorderItems,te as requestGuestOrderCancel,Y as setEndpoint,q as setFetchGraphQlHeader,Q as setFetchGraphQlHeaders};
