/*! Copyright 2024 Adobe
All Rights Reserved. */
import{Initializer as I}from"@dropins/tools/lib.js";import{events as o}from"@dropins/tools/event-bus.js";import{f as n,h as m}from"./chunks/fetch-graphql.js";import{g as q,r as U,s as Y,a as Q,b as H}from"./chunks/fetch-graphql.js";import{h as l}from"./chunks/network-error.js";import{P as u,a as _,G as p,O as c,B as D,R as O,c as b}from"./chunks/transform-order-details.js";import{O as R,A as h}from"./chunks/getGuestOrder.graphql.js";import{t as G}from"./chunks/getCustomer.js";import{g as j,a as J}from"./chunks/getCustomer.js";import{g as W}from"./chunks/getAttributesForm.js";import{g as Z}from"./chunks/getStoreConfig.js";import{g as re}from"./chunks/getCustomerOrdersReturn.js";import{g as ae,r as se}from"./chunks/requestReturn.js";import{c as oe,r as ie}from"./chunks/requestGuestOrderCancel.js";import{r as me}from"./chunks/reorderItems.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/convertCase.js";import"./chunks/transform-attributes-form.js";const T=`
query ORDER_BY_NUMBER($orderNumber: String!, $pageSize: Int) {
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
        returns(pageSize: $pageSize) {
          ...OrderReturns
        }
        items_eligible_for_return {
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
            quantity_shipped
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
${p}
${c}
${D}
${R}
${h}
${O}
`,y=async({orderId:e,returnRef:r,queryType:t,returnsPageSize:a=50})=>await n(T,{method:"GET",cache:"force-cache",variables:{orderNumber:e,pageSize:a}}).then(s=>{var d;return(d=s.errors)!=null&&d.length?m(s.errors):b(t??"orderData",s,r)}).catch(l),f=`
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
    items_eligible_for_return {
      ...OrderItemDetails
    }
    returns(pageSize: 50) {
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
${p}
${c}
${D}
${R}
${h}
${O}
`,$=async(e,r)=>await n(f,{method:"GET",cache:"no-cache",variables:{token:e}}).then(t=>{var a;return(a=t.errors)!=null&&a.length?m(t.errors):G(t,r)}).catch(l),A="orderData",C=async e=>{var i;const r=typeof(e==null?void 0:e.orderRef)=="string"?e==null?void 0:e.orderRef:"",t=typeof(e==null?void 0:e.returnRef)=="string"?e==null?void 0:e.returnRef:"",a=r&&typeof(e==null?void 0:e.orderRef)=="string"&&((i=e==null?void 0:e.orderRef)==null?void 0:i.length)>20,s=(e==null?void 0:e.orderData)??null;if(s){o.emit("order/data",{...s,returnNumber:t});return}if(!r)return;const d=a?await $(r,t):await y({orderId:r,returnRef:t,queryType:A});d?o.emit("order/data",{...d,returnNumber:t}):o.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},E=new I({init:async e=>{const r={};E.config.setConfig({...r,...e}),C(e).catch(console.error)},listeners:()=>[]}),x=E.config;export{oe as cancelOrder,x as config,n as fetchGraphQl,W as getAttributesForm,ae as getAttributesList,q as getConfig,j as getCustomer,re as getCustomerOrdersReturn,J as getGuestOrder,y as getOrderDetailsById,Z as getStoreConfig,$ as guestOrderByToken,E as initialize,U as removeFetchGraphQlHeader,me as reorderItems,ie as requestGuestOrderCancel,se as requestReturn,Y as setEndpoint,Q as setFetchGraphQlHeader,H as setFetchGraphQlHeaders};
