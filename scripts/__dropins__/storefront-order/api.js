import{Initializer as I}from"@dropins/tools/lib.js";import{events as d}from"@dropins/tools/event-bus.js";import{f as n,h as m}from"./chunks/fetch-graphql.js";import{g as U,r as q,s as z,a as Y,b as Q}from"./chunks/fetch-graphql.js";import{h as l}from"./chunks/network-error.js";import{P as u,a as _,G as p,O as c,B as O,R as D,c as b}from"./chunks/transform-order-details.js";import{O as h,A as R}from"./chunks/getGuestOrder.graphql.js";import{t as f}from"./chunks/getCustomer.js";import{g as K,a as j}from"./chunks/getCustomer.js";import{g as V}from"./chunks/getAttributesForm.js";import{g as X}from"./chunks/getStoreConfig.js";import{g as ee}from"./chunks/getCustomerOrdersReturn.js";import{g as te,r as ae}from"./chunks/requestReturn.js";import{c as de,r as oe}from"./chunks/requestGuestOrderCancel.js";import{r as ne}from"./chunks/reorderItems.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/convertCase.js";import"./chunks/transform-attributes-form.js";const G=`
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
        returns(pageSize: 50) {
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
${O}
${h}
${R}
${D}
`,T=async(e,r,t)=>await n(G,{method:"GET",cache:"force-cache",variables:{orderNumber:e}}).then(a=>{var s;return(s=a.errors)!=null&&s.length?m(a.errors):b(t??"orderData",a,r)}).catch(l),g=`
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
${O}
${h}
${R}
${D}
`,A=async(e,r)=>await n(g,{method:"GET",cache:"no-cache",variables:{token:e}}).then(t=>{var a;return(a=t.errors)!=null&&a.length?m(t.errors):f(t,r)}).catch(l),y=async e=>{var i;const r=(e==null?void 0:e.orderRef)??"",t=(e==null?void 0:e.returnRef)??"",a=r&&typeof(e==null?void 0:e.orderRef)=="string"&&((i=e==null?void 0:e.orderRef)==null?void 0:i.length)>20,s=(e==null?void 0:e.orderData)??null;if(s){d.emit("order/data",{...s,returnNumber:t});return}if(!r){console.error("Order Token or number not received.");return}const o=a?await A(r,t):await T(r,t,"orderData");o?d.emit("order/data",{...o,returnNumber:t}):d.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},E=new I({init:async e=>{const r={};E.config.setConfig({...r,...e}),y(e).catch(console.error)},listeners:()=>[]}),v=E.config;export{de as cancelOrder,v as config,n as fetchGraphQl,V as getAttributesForm,te as getAttributesList,U as getConfig,K as getCustomer,ee as getCustomerOrdersReturn,j as getGuestOrder,T as getOrderDetailsById,X as getStoreConfig,A as guestOrderByToken,E as initialize,q as removeFetchGraphQlHeader,ne as reorderItems,oe as requestGuestOrderCancel,ae as requestReturn,z as setEndpoint,Y as setFetchGraphQlHeader,Q as setFetchGraphQlHeaders};
