import{Initializer as E}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import{f as i,h as n}from"./chunks/fetch-graphql.js";import{g as x,r as P,s as U,a as Y,b as q}from"./chunks/fetch-graphql.js";import{h as m}from"./chunks/network-error.js";import{P as l,a as u,G as c,O as _,B as p,R as O,c as f}from"./chunks/transform-order-details.js";import{O as h,A as D}from"./chunks/getGuestOrder.graphql.js";import{t as T}from"./chunks/getCustomer.js";import{a as z,g as H}from"./chunks/getCustomer.js";import{g as j}from"./chunks/getAttributesForm.js";import{g as V}from"./chunks/getStoreConfig.js";import{g as X}from"./chunks/getCustomerOrdersReturn.js";import{c as ee,r as re}from"./chunks/requestGuestOrderCancel.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/convertCase.js";const G=`
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
${l}
${u}
${c}
${_}
${p}
${h}
${D}
${O}
`,I=async(e,r)=>await i(G,{method:"GET",cache:"force-cache",variables:{orderNumber:e}}).then(t=>{var a;return(a=t.errors)!=null&&a.length?n(t.errors):f(r??"orderData",t)}).catch(m),b=`
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
${l}
${u}
${c}
${_}
${p}
${h}
${D}
${O}
`,g=async e=>await i(b,{method:"GET",cache:"no-cache",variables:{token:e}}).then(r=>{var t;return(t=r.errors)!=null&&t.length?n(r.errors):T(r)}).catch(m),y=async e=>{var o;const r=(e==null?void 0:e.orderRef)??"",t=r&&typeof(e==null?void 0:e.orderRef)=="string"&&((o=e==null?void 0:e.orderRef)==null?void 0:o.length)>20,a=(e==null?void 0:e.orderData)??null;if(a){s.emit("order/data",a);return}if(!r){console.error("Order Token or number not received.");return}const d=t?await g(r):await I(r);d?s.emit("order/data",d):s.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},R=new E({init:async e=>{const r={};R.config.setConfig({...r,...e}),y(e).catch(console.error)},listeners:()=>[]}),M=R.config;export{ee as cancelOrder,M as config,i as fetchGraphQl,j as getAttributesForm,x as getConfig,z as getCustomer,X as getCustomerOrdersReturn,H as getGuestOrder,I as getOrderDetailsById,V as getStoreConfig,g as guestOrderByToken,R as initialize,P as removeFetchGraphQlHeader,re as requestGuestOrderCancel,U as setEndpoint,Y as setFetchGraphQlHeader,q as setFetchGraphQlHeaders};
