/*! Copyright 2024 Adobe
All Rights Reserved. */
import{merge as Q,Initializer as na}from"@dropins/tools/lib.js";import{events as L}from"@dropins/tools/event-bus.js";import{a as ta,h as x}from"./network-error.js";import{PRODUCT_DETAILS_FRAGMENT as K,PRICE_DETAILS_FRAGMENT as j,GIFT_CARD_DETAILS_FRAGMENT as H,ORDER_ITEM_DETAILS_FRAGMENT as J,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as V,ORDER_SUMMARY_FRAGMENT as W,ADDRESS_FRAGMENT as X,RETURNS_FRAGMENT as Z}from"../fragments.js";import{f as m}from"./fetch-graphql.js";const _a=a=>a||0,ua=a=>{var n,t,_;return{...a,canonicalUrl:(a==null?void 0:a.canonical_url)||"",urlKey:(a==null?void 0:a.url_key)||"",id:(a==null?void 0:a.uid)||"",name:(a==null?void 0:a.name)||"",sku:(a==null?void 0:a.sku)||"",image:((n=a==null?void 0:a.image)==null?void 0:n.url)||"",productType:(a==null?void 0:a.__typename)||"",thumbnail:{label:((t=a==null?void 0:a.thumbnail)==null?void 0:t.label)||"",url:((_=a==null?void 0:a.thumbnail)==null?void 0:_.url)||""}}},ia=a=>{if(!a||!("selected_options"in a))return;const n={};for(const t of a.selected_options)n[t.label]=t.value;return n},sa=a=>{const n=a==null?void 0:a.map(_=>({uid:_.uid,label:_.label,values:_.values.map(i=>i.product_name).join(", ")})),t={};return n==null||n.forEach(_=>{t[_.label]=_.values}),Object.keys(t).length>0?t:null},la=a=>(a==null?void 0:a.length)>0?{count:a.length,result:a.map(n=>n.title).join(", ")}:null,ca=a=>({quantityCanceled:(a==null?void 0:a.quantity_canceled)??0,quantityInvoiced:(a==null?void 0:a.quantity_invoiced)??0,quantityOrdered:(a==null?void 0:a.quantity_ordered)??0,quantityRefunded:(a==null?void 0:a.quantity_refunded)??0,quantityReturned:(a==null?void 0:a.quantity_returned)??0,quantityShipped:(a==null?void 0:a.quantity_shipped)??0,quantityReturnRequested:(a==null?void 0:a.quantity_return_requested)??0}),I=a=>a==null?void 0:a.filter(n=>n.__typename).map(n=>{var T,e,R,N,b,r,M,S,D,O,u,A,p,y,G,f,F,h,C,q,v,d,B,$,U,w,P,o,z,Y;const{quantityCanceled:t,quantityInvoiced:_,quantityOrdered:i,quantityRefunded:s,quantityReturned:l,quantityShipped:c,quantityReturnRequested:E}=ca(n);return{type:n==null?void 0:n.__typename,eligibleForReturn:n==null?void 0:n.eligible_for_return,productSku:n==null?void 0:n.product_sku,productName:n.product_name,productUrlKey:n.product_url_key,quantityCanceled:t,quantityInvoiced:_,quantityOrdered:i,quantityRefunded:s,quantityReturned:l,quantityShipped:c,quantityReturnRequested:E,id:n==null?void 0:n.id,discounted:((N=(R=(e=(T=n==null?void 0:n.product)==null?void 0:T.price_range)==null?void 0:e.maximum_price)==null?void 0:R.regular_price)==null?void 0:N.value)*(n==null?void 0:n.quantity_ordered)!==((b=n==null?void 0:n.product_sale_price)==null?void 0:b.value)*(n==null?void 0:n.quantity_ordered),total:{value:((r=n==null?void 0:n.product_sale_price)==null?void 0:r.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((M=n==null?void 0:n.product_sale_price)==null?void 0:M.currency)||""},totalInclTax:{value:((S=n==null?void 0:n.product_sale_price)==null?void 0:S.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(D=n==null?void 0:n.product_sale_price)==null?void 0:D.currency},price:{value:((O=n==null?void 0:n.product_sale_price)==null?void 0:O.value)||0,currency:(u=n==null?void 0:n.product_sale_price)==null?void 0:u.currency},priceInclTax:{value:((A=n==null?void 0:n.product_sale_price)==null?void 0:A.value)||0,currency:(p=n==null?void 0:n.product_sale_price)==null?void 0:p.currency},totalQuantity:_a(n==null?void 0:n.quantity_ordered),regularPrice:{value:(F=(f=(G=(y=n==null?void 0:n.product)==null?void 0:y.price_range)==null?void 0:G.maximum_price)==null?void 0:f.regular_price)==null?void 0:F.value,currency:(v=(q=(C=(h=n==null?void 0:n.product)==null?void 0:h.price_range)==null?void 0:C.maximum_price)==null?void 0:q.regular_price)==null?void 0:v.currency},product:ua(n==null?void 0:n.product),thumbnail:{label:((B=(d=n==null?void 0:n.product)==null?void 0:d.thumbnail)==null?void 0:B.label)||"",url:((U=($=n==null?void 0:n.product)==null?void 0:$.thumbnail)==null?void 0:U.url)||""},giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?{senderName:((w=n.gift_card)==null?void 0:w.sender_name)||"",senderEmail:((P=n.gift_card)==null?void 0:P.sender_email)||"",recipientEmail:((o=n.gift_card)==null?void 0:o.recipient_email)||"",recipientName:((z=n.gift_card)==null?void 0:z.recipient_name)||"",message:((Y=n.gift_card)==null?void 0:Y.message)||""}:void 0,configurableOptions:ia(n),bundleOptions:n.__typename==="BundleOrderItem"?sa(n.bundle_options):null,itemPrices:n.prices,downloadableLinks:n.__typename==="DownloadableOrderItem"?la(n==null?void 0:n.downloadable_links):null}}),k=(a,n)=>{var N,b,r,M,S,D,O,u,A;const t=I(a.items),_=((N=Ra(a==null?void 0:a.returns))==null?void 0:N.ordersReturn)??[],i=n?_.filter(p=>p.returnNumber===n):_,{total:s,...l}=ta({...a,items:t,returns:i},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),c=(b=a==null?void 0:a.payment_methods)==null?void 0:b[0],E=(c==null?void 0:c.type)||"",T=(c==null?void 0:c.name)||"",e=(r=l==null?void 0:l.items)==null?void 0:r.reduce((p,y)=>p+(y==null?void 0:y.totalQuantity),0),R={...s,...l,totalQuantity:e,shipping:{amount:((M=s==null?void 0:s.totalShipping)==null?void 0:M.value)??0,currency:((S=s==null?void 0:s.totalShipping)==null?void 0:S.currency)||"",code:l.shippingMethod??""},payments:[{code:E,name:T}]};return Q(R,(A=(u=(O=(D=g==null?void 0:g.getConfig())==null?void 0:D.models)==null?void 0:O.OrderDataModel)==null?void 0:u.transformer)==null?void 0:A.call(u,a))},ea=(a,n,t)=>{var _,i,s,l,c,E,T;if((l=(s=(i=(_=n==null?void 0:n.data)==null?void 0:_.customer)==null?void 0:i.orders)==null?void 0:s.items)!=null&&l.length&&a==="orderData"){const e=(T=(E=(c=n==null?void 0:n.data)==null?void 0:c.customer)==null?void 0:E.orders)==null?void 0:T.items[0];return k(e,t)}return null},Ra=a=>{var s,l,c,E,T;if(!((s=a==null?void 0:a.items)!=null&&s.length))return null;const n=a==null?void 0:a.items,t=a==null?void 0:a.page_info,i={ordersReturn:[...n].sort((e,R)=>+R.number-+e.number).map(e=>{var D,O;const{order:R,status:N,number:b,created_at:r}=e,M=((O=(D=e==null?void 0:e.shipping)==null?void 0:D.tracking)==null?void 0:O.map(u=>{const{status:A,carrier:p,tracking_number:y}=u;return{status:A,carrier:p,trackingNumber:y}}))??[],S=e.items.map(u=>{var h;const A=u==null?void 0:u.quantity,p=u==null?void 0:u.status,y=u==null?void 0:u.request_quantity,G=u==null?void 0:u.uid,f=u==null?void 0:u.order_item,F=((h=I([f]))==null?void 0:h.reduce((C,q)=>q,{}))??{};return{uid:G,quantity:A,status:p,requestQuantity:y,...F}});return{createdReturnAt:r,returnStatus:N,token:R==null?void 0:R.token,orderNumber:R==null?void 0:R.number,returnNumber:b,items:S,tracking:M}}),...t?{pageInfo:{pageSize:t.page_size,totalPages:t.total_pages,currentPage:t.current_page}}:{}};return Q(i,(T=(E=(c=(l=g==null?void 0:g.getConfig())==null?void 0:l.models)==null?void 0:c.CustomerOrdersReturnModel)==null?void 0:E.transformer)==null?void 0:T.call(E,{...n,...t}))},ga=(a,n)=>{var _,i;if(!((_=a==null?void 0:a.data)!=null&&_.guestOrder))return null;const t=(i=a==null?void 0:a.data)==null?void 0:i.guestOrder;return k(t,n)},Ea=(a,n)=>{var _,i;if(!((_=a==null?void 0:a.data)!=null&&_.guestOrderByToken))return null;const t=(i=a==null?void 0:a.data)==null?void 0:i.guestOrderByToken;return k(t,n)},Ta=`
  query ORDER_BY_NUMBER($orderNumber: String!, $pageSize: Int) {
    customer {
      orders(filter: { number: { eq: $orderNumber } }) {
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
            ...RETURNS_FRAGMENT
          }
          items_eligible_for_return {
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
  }
  ${K}
  ${j}
  ${H}
  ${J}
  ${V}
  ${W}
  ${X}
  ${Z}
`,pa=async({orderId:a,returnRef:n,queryType:t,returnsPageSize:_=50})=>await m(Ta,{method:"GET",cache:"force-cache",variables:{orderNumber:a,pageSize:_}}).then(i=>ea(t??"orderData",i,n)).catch(x),ya=`
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
        ...ORDER_ITEM_DETAILS_FRAGMENT
      }
      returns(pageSize: 50) {
        ...RETURNS_FRAGMENT
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
  ${K}
  ${j}
  ${H}
  ${J}
  ${V}
  ${W}
  ${X}
  ${Z}
`,Aa=async(a,n)=>await m(ya,{method:"GET",cache:"no-cache",variables:{token:a}}).then(t=>Ea(t,n)).catch(x),Da="orderData",Oa=async a=>{var l;const n=typeof(a==null?void 0:a.orderRef)=="string"?a==null?void 0:a.orderRef:"",t=typeof(a==null?void 0:a.returnRef)=="string"?a==null?void 0:a.returnRef:"",_=n&&typeof(a==null?void 0:a.orderRef)=="string"&&((l=a==null?void 0:a.orderRef)==null?void 0:l.length)>20,i=(a==null?void 0:a.orderData)??null;if(i){L.emit("order/data",{...i,returnNumber:t});return}if(!n)return;const s=_?await Aa(n,t):await pa({orderId:n,returnRef:t,queryType:Da});s?L.emit("order/data",{...s,returnNumber:t}):L.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},aa=new na({init:async a=>{const n={};aa.config.setConfig({...n,...a}),Oa(a).catch(console.error)},listeners:()=>[]}),g=aa.config;export{k as a,Aa as b,g as c,ga as d,pa as g,aa as i,Ra as t};
