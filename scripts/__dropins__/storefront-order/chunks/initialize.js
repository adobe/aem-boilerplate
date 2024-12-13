/*! Copyright 2024 Adobe
All Rights Reserved. */
import{merge as Q,Initializer as na}from"@dropins/tools/lib.js";import{events as v}from"@dropins/tools/event-bus.js";import{a as ta,h as x}from"./network-error.js";import{PRODUCT_DETAILS_FRAGMENT as K,PRICE_DETAILS_FRAGMENT as j,GIFT_CARD_DETAILS_FRAGMENT as H,ORDER_ITEM_DETAILS_FRAGMENT as J,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as V,ORDER_SUMMARY_FRAGMENT as W,ADDRESS_FRAGMENT as X,RETURNS_FRAGMENT as Z}from"../fragments.js";import{f as m,h as _a}from"./fetch-graphql.js";const ua=a=>a||0,ia=a=>{var n,t,_;return{...a,canonicalUrl:(a==null?void 0:a.canonical_url)||"",urlKey:(a==null?void 0:a.url_key)||"",id:(a==null?void 0:a.uid)||"",name:(a==null?void 0:a.name)||"",sku:(a==null?void 0:a.sku)||"",image:((n=a==null?void 0:a.image)==null?void 0:n.url)||"",productType:(a==null?void 0:a.__typename)||"",thumbnail:{label:((t=a==null?void 0:a.thumbnail)==null?void 0:t.label)||"",url:((_=a==null?void 0:a.thumbnail)==null?void 0:_.url)||""}}},sa=a=>{if(!a||!("selected_options"in a))return;const n={};for(const t of a.selected_options)n[t.label]=t.value;return n},la=a=>{const n=a==null?void 0:a.map(_=>({uid:_.uid,label:_.label,values:_.values.map(i=>i.product_name).join(", ")})),t={};return n==null||n.forEach(_=>{t[_.label]=_.values}),Object.keys(t).length>0?t:null},ea=a=>(a==null?void 0:a.length)>0?{count:a.length,result:a.map(n=>n.title).join(", ")}:null,ca=a=>({quantityCanceled:(a==null?void 0:a.quantity_canceled)??0,quantityInvoiced:(a==null?void 0:a.quantity_invoiced)??0,quantityOrdered:(a==null?void 0:a.quantity_ordered)??0,quantityRefunded:(a==null?void 0:a.quantity_refunded)??0,quantityReturned:(a==null?void 0:a.quantity_returned)??0,quantityShipped:(a==null?void 0:a.quantity_shipped)??0,quantityReturnRequested:(a==null?void 0:a.quantity_return_requested)??0}),I=a=>a==null?void 0:a.filter(n=>n.__typename).map(n=>{var T,c,R,O,N,b,h,g,r,D,u,A,y,p,G,f,F,S,C,q,d,k,B,$,U,w,o,P,z,Y;const{quantityCanceled:t,quantityInvoiced:_,quantityOrdered:i,quantityRefunded:s,quantityReturned:l,quantityShipped:e,quantityReturnRequested:E}=ca(n);return{type:n==null?void 0:n.__typename,eligibleForReturn:n==null?void 0:n.eligible_for_return,productSku:n==null?void 0:n.product_sku,productName:n.product_name,productUrlKey:n.product_url_key,quantityCanceled:t,quantityInvoiced:_,quantityOrdered:i,quantityRefunded:s,quantityReturned:l,quantityShipped:e,quantityReturnRequested:E,id:n==null?void 0:n.id,discounted:((O=(R=(c=(T=n==null?void 0:n.product)==null?void 0:T.price_range)==null?void 0:c.maximum_price)==null?void 0:R.regular_price)==null?void 0:O.value)*(n==null?void 0:n.quantity_ordered)!==((N=n==null?void 0:n.product_sale_price)==null?void 0:N.value)*(n==null?void 0:n.quantity_ordered),total:{value:((b=n==null?void 0:n.product_sale_price)==null?void 0:b.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((h=n==null?void 0:n.product_sale_price)==null?void 0:h.currency)||""},totalInclTax:{value:((g=n==null?void 0:n.product_sale_price)==null?void 0:g.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(r=n==null?void 0:n.product_sale_price)==null?void 0:r.currency},price:{value:((D=n==null?void 0:n.product_sale_price)==null?void 0:D.value)||0,currency:(u=n==null?void 0:n.product_sale_price)==null?void 0:u.currency},priceInclTax:{value:((A=n==null?void 0:n.product_sale_price)==null?void 0:A.value)||0,currency:(y=n==null?void 0:n.product_sale_price)==null?void 0:y.currency},totalQuantity:ua(n==null?void 0:n.quantity_ordered),regularPrice:{value:(F=(f=(G=(p=n==null?void 0:n.product)==null?void 0:p.price_range)==null?void 0:G.maximum_price)==null?void 0:f.regular_price)==null?void 0:F.value,currency:(d=(q=(C=(S=n==null?void 0:n.product)==null?void 0:S.price_range)==null?void 0:C.maximum_price)==null?void 0:q.regular_price)==null?void 0:d.currency},product:ia(n==null?void 0:n.product),thumbnail:{label:((B=(k=n==null?void 0:n.product)==null?void 0:k.thumbnail)==null?void 0:B.label)||"",url:((U=($=n==null?void 0:n.product)==null?void 0:$.thumbnail)==null?void 0:U.url)||""},giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?{senderName:((w=n.gift_card)==null?void 0:w.sender_name)||"",senderEmail:((o=n.gift_card)==null?void 0:o.sender_email)||"",recipientEmail:((P=n.gift_card)==null?void 0:P.recipient_email)||"",recipientName:((z=n.gift_card)==null?void 0:z.recipient_name)||"",message:((Y=n.gift_card)==null?void 0:Y.message)||""}:void 0,configurableOptions:sa(n),bundleOptions:n.__typename==="BundleOrderItem"?la(n.bundle_options):null,itemPrices:n.prices,downloadableLinks:n.__typename==="DownloadableOrderItem"?ea(n==null?void 0:n.downloadable_links):null}}),L=(a,n)=>{var O,N,b,h,g,r,D,u,A;const t=I(a.items),_=((O=Ea(a==null?void 0:a.returns))==null?void 0:O.ordersReturn)??[],i=n?_.filter(y=>y.returnNumber===n):_,{total:s,...l}=ta({...a,items:t,returns:i},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),e=(N=a==null?void 0:a.payment_methods)==null?void 0:N[0],E=(e==null?void 0:e.type)||"",T=(e==null?void 0:e.name)||"",c=(b=l==null?void 0:l.items)==null?void 0:b.reduce((y,p)=>y+(p==null?void 0:p.totalQuantity),0),R={...s,...l,totalQuantity:c,shipping:{amount:((h=s==null?void 0:s.totalShipping)==null?void 0:h.value)??0,currency:((g=s==null?void 0:s.totalShipping)==null?void 0:g.currency)||"",code:l.shippingMethod??""},payments:[{code:E,name:T}]};return Q(R,(A=(u=(D=(r=M==null?void 0:M.getConfig())==null?void 0:r.models)==null?void 0:D.OrderDataModel)==null?void 0:u.transformer)==null?void 0:A.call(u,a))},Ra=(a,n,t)=>{var _,i,s,l,e,E,T;if((l=(s=(i=(_=n==null?void 0:n.data)==null?void 0:_.customer)==null?void 0:i.orders)==null?void 0:s.items)!=null&&l.length&&a==="orderData"){const c=(T=(E=(e=n==null?void 0:n.data)==null?void 0:e.customer)==null?void 0:E.orders)==null?void 0:T.items[0];return L(c,t)}return null},Ea=a=>{var s,l,e,E,T;if(!((s=a==null?void 0:a.items)!=null&&s.length))return null;const n=a==null?void 0:a.items,t=a==null?void 0:a.page_info,i={ordersReturn:[...n].sort((c,R)=>+R.number-+c.number).map(c=>{var r,D;const{order:R,status:O,number:N,created_at:b}=c,h=((D=(r=c==null?void 0:c.shipping)==null?void 0:r.tracking)==null?void 0:D.map(u=>{const{status:A,carrier:y,tracking_number:p}=u;return{status:A,carrier:y,trackingNumber:p}}))??[],g=c.items.map(u=>{var S;const A=u==null?void 0:u.quantity,y=u==null?void 0:u.status,p=u==null?void 0:u.request_quantity,G=u==null?void 0:u.uid,f=u==null?void 0:u.order_item,F=((S=I([f]))==null?void 0:S.reduce((C,q)=>q,{}))??{};return{uid:G,quantity:A,status:y,requestQuantity:p,...F}});return{createdReturnAt:b,returnStatus:O,token:R==null?void 0:R.token,orderNumber:R==null?void 0:R.number,returnNumber:N,items:g,tracking:h}}),...t?{pageInfo:{pageSize:t.page_size,totalPages:t.total_pages,currentPage:t.current_page}}:{}};return Q(i,(T=(E=(e=(l=M==null?void 0:M.getConfig())==null?void 0:l.models)==null?void 0:e.CustomerOrdersReturnModel)==null?void 0:E.transformer)==null?void 0:T.call(E,{...n,...t}))},Sa=(a,n)=>{var _,i;if(!((_=a==null?void 0:a.data)!=null&&_.guestOrder))return null;const t=(i=a==null?void 0:a.data)==null?void 0:i.guestOrder;return L(t,n)},Ta=(a,n)=>{var _,i;if(!((_=a==null?void 0:a.data)!=null&&_.guestOrderByToken))return null;const t=(i=a==null?void 0:a.data)==null?void 0:i.guestOrderByToken;return L(t,n)},ya=`
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
`,pa=async({orderId:a,returnRef:n,queryType:t,returnsPageSize:_=50})=>await m(ya,{method:"GET",cache:"force-cache",variables:{orderNumber:a,pageSize:_}}).then(i=>Ra(t??"orderData",i,n)).catch(x),Aa=`
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
`,ra=async(a,n)=>await m(Aa,{method:"GET",cache:"no-cache",variables:{token:a}}).then(t=>{var _;return(_=t.errors)!=null&&_.length&&t.errors[0].message==="Please login to view the order."?_a(t.errors):Ta(t,n)}).catch(x),Da="orderData",Oa=async a=>{var l;const n=typeof(a==null?void 0:a.orderRef)=="string"?a==null?void 0:a.orderRef:"",t=typeof(a==null?void 0:a.returnRef)=="string"?a==null?void 0:a.returnRef:"",_=n&&typeof(a==null?void 0:a.orderRef)=="string"&&((l=a==null?void 0:a.orderRef)==null?void 0:l.length)>20,i=(a==null?void 0:a.orderData)??null;if(i){v.emit("order/data",{...i,returnNumber:t});return}if(!n)return;const s=_?await ra(n,t):await pa({orderId:n,returnRef:t,queryType:Da});s?v.emit("order/data",{...s,returnNumber:t}):v.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},aa=new na({init:async a=>{const n={};aa.config.setConfig({...n,...a}),Oa(a).catch(console.error)},listeners:()=>[]}),M=aa.config;export{L as a,Sa as b,ra as c,M as d,pa as g,aa as i,Ea as t};
