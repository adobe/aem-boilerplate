import{Initializer as u}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import{f as n,h as m}from"./chunks/fetch-graphql.js";import{g as S,r as w,s as A,a as N,b as x}from"./chunks/fetch-graphql.js";import{h as o}from"./chunks/network-error.js";import{O as _,a as c,A as p,b as h}from"./chunks/transform-order-details.js";import{t as O}from"./chunks/getCustomer.js";import{g as M,a as Y}from"./chunks/getCustomer.js";import{g as Q}from"./chunks/getAttributesForm.js";import{g as z}from"./chunks/getStoreConfig.js";import"@dropins/tools/fetch-graphql.js";const g=`
query ORDER_BY_NUMBER($orderNumber: String!) {
  customer {
    orders(
    filter: {number: {eq: $orderNumber}},
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
            ...OrderItems
            ... on GiftCardOrderItem {
              gift_card {
                recipient_name
                recipient_email
                sender_name
                sender_email
                message
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
          ...OrderItems
          ... on GiftCardOrderItem {
            __typename
            gift_card {
              recipient_name
              recipient_email
              sender_name
              sender_email
              message
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
${_}
${c}
${p}
`,f=async(e,r)=>await n(g,{method:"GET",cache:"force-cache",variables:{orderNumber:e}}).then(t=>{var a;return(a=t.errors)!=null&&a.length?m(t.errors):h(r??"orderData",t)}).catch(o),y=`
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
          ...OrderItems
          ... on GiftCardOrderItem {
            gift_card {
              recipient_name
              recipient_email
              sender_name
              sender_email
              message
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
      ...OrderItems
      ... on GiftCardOrderItem {
        __typename
        gift_card {
          recipient_name
          recipient_email
          sender_name
          sender_email
          message
        }
      }
    }
    total {
      ...OrderSummary
    }
  }
}
${_}
${c}
${p}
`,R=async e=>await n(y,{method:"GET",cache:"no-cache",variables:{token:e}}).then(r=>{var t;return(t=r.errors)!=null&&t.length?m(r.errors):O(r)}).catch(o),b=async e=>{var d;const r=(e==null?void 0:e.orderRef)??"",t=r&&typeof(e==null?void 0:e.orderRef)=="string"&&((d=e==null?void 0:e.orderRef)==null?void 0:d.length)>20,a=(e==null?void 0:e.orderData)??null;if(a){s.emit("order/data",a);return}if(!r){console.error("Order Token or number not received.");return}const i=t?await R(r):await f(r);i?s.emit("order/data",i):s.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},l=new u({init:async e=>{const r={};l.config.setConfig({...r,...e}),b(e).catch(console.error)},listeners:()=>[]}),B=l.config;export{B as config,n as fetchGraphQl,Q as getAttributesForm,S as getConfig,M as getCustomer,Y as getGuestOrder,f as getOrderDetailsById,z as getStoreConfig,R as guestOrderByToken,l as initialize,w as removeFetchGraphQlHeader,A as setEndpoint,N as setFetchGraphQlHeader,x as setFetchGraphQlHeaders};
