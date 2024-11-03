/*! Copyright 2024 Adobe
All Rights Reserved. */
import{a as F}from"./convertCase.js";const J=`
  fragment ProductDetails on ProductInterface {
    __typename
    canonical_url
    uid
    name
    sku
    only_x_left_in_stock
    stock_status
    thumbnail {
      label
      url
    }
    price_range {
      maximum_price {
        regular_price {
          currency
          value
        }
      }
    }
  }
`,V=`
  fragment PriceDetails on OrderItemInterface {
    prices {
      price_including_tax {
        value
        currency
      }
      original_price {
        value
        currency
      }
      original_price_including_tax {
        value
        currency
      }
      price {
        value
        currency
      }
    }
  }
`,W=`
  fragment GiftCardDetails on GiftCardOrderItem {
    ...PriceDetails
    gift_message {
      message
    }
    gift_card {
      recipient_name
      recipient_email
      sender_name
      sender_email
      message
    }
  }
`,X=`
  fragment OrderItemDetails on OrderItemInterface {
    __typename
    status
    product_name
    id
    quantity_ordered
    quantity_shipped
    quantity_canceled
    quantity_invoiced
    quantity_refunded
    quantity_returned
    product_sale_price {
      value
      currency
    }
    selected_options {
      label
      value
    }
    product {
      ...ProductDetails
    }
    ...PriceDetails
  }
`,Y=`
  fragment BundleOrderItemDetails on BundleOrderItem {
    ...PriceDetails
    bundle_options {
      uid
      label
      values {
        uid
        product_name
      }
    }
  }
`,Z=`
  fragment OrderReturns on Returns {
  __typename
   items {
    number
    status
    created_at
    shipping {
      tracking {
        status {
          text
          type
        }
        carrier {
          uid
          label
        }
        tracking_number
      }
    }
    order {
      number
      token
    }
    items {
     uid
     quantity
     status
     request_quantity
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
  }
`,B=n=>{var t;if(!((t=n==null?void 0:n.items)!=null&&t.length))return null;const a=n==null?void 0:n.items,c=n==null?void 0:n.page_info;return{ordersReturn:a.map(_=>{var q,v;const{order:u,status:l,number:p,created_at:y}=_,e=((v=(q=_==null?void 0:_.shipping)==null?void 0:q.tracking)==null?void 0:v.map(i=>{const{status:g,carrier:f,tracking_number:b}=i;return{status:g,carrier:f,trackingNumber:b}}))??[],h=_.items.map(i=>{var E;const g=i==null?void 0:i.quantity,f=i==null?void 0:i.status,b=i==null?void 0:i.request_quantity,O=i==null?void 0:i.uid,R=i==null?void 0:i.order_item,N=((E=M([R]))==null?void 0:E.reduce((C,T)=>T,{}))??{};return{uid:O,quantity:g,status:f,requestQuantity:b,...N}});return{createdReturnAt:y,returnStatus:l,token:u==null?void 0:u.token,orderNumber:u==null?void 0:u.number,returnNumber:p,items:h,tracking:e}}),...c?{pageInfo:{pageSize:c.page_size,totalPages:c.total_pages,currentPage:c.current_page}}:{}}},Q=n=>n||0,U=n=>{var a,c,s;return{...n,canonicalUrl:(n==null?void 0:n.canonical_url)||"",id:(n==null?void 0:n.uid)||"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((a=n==null?void 0:n.image)==null?void 0:a.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((c=n==null?void 0:n.thumbnail)==null?void 0:c.label)||"",url:((s=n==null?void 0:n.thumbnail)==null?void 0:s.url)||""}}},j=n=>{if(!n||!("selected_options"in n))return;const a={};for(const c of n.selected_options)a[c.label]=c.value;return a},w=n=>{const a=n==null?void 0:n.map(s=>({uid:s.uid,label:s.label,values:s.values.map(t=>t.product_name).join(", ")})),c={};return a==null||a.forEach(s=>{c[s.label]=s.values}),Object.keys(c).length>0?c:null},z=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(a=>a.title).join(", ")}:null,M=n=>n==null?void 0:n.filter(a=>a.__typename).map(a=>{var c,s,t,_,u,l,p,y,e,h,q,v,i,g,f,b,O,R,N,E,C,T,D,P,A,G,k,x,S,L;return{type:a==null?void 0:a.__typename,productName:a.product_name,quantityCanceled:(a==null?void 0:a.quantity_canceled)||0,quantityInvoiced:(a==null?void 0:a.quantity_invoiced)||0,quantityOrdered:(a==null?void 0:a.quantity_ordered)||0,quantityRefunded:(a==null?void 0:a.quantity_refunded)||0,quantityReturned:(a==null?void 0:a.quantity_returned)||0,quantityShipped:(a==null?void 0:a.quantity_shipped)||0,id:a==null?void 0:a.id,discounted:((_=(t=(s=(c=a==null?void 0:a.product)==null?void 0:c.price_range)==null?void 0:s.maximum_price)==null?void 0:t.regular_price)==null?void 0:_.value)*(a==null?void 0:a.quantity_ordered)!==((u=a==null?void 0:a.product_sale_price)==null?void 0:u.value)*(a==null?void 0:a.quantity_ordered),total:{value:((l=a==null?void 0:a.product_sale_price)==null?void 0:l.value)*(a==null?void 0:a.quantity_ordered)||0,currency:((p=a==null?void 0:a.product_sale_price)==null?void 0:p.currency)||""},totalInclTax:{value:((y=a==null?void 0:a.product_sale_price)==null?void 0:y.value)*(a==null?void 0:a.quantity_ordered)||0,currency:(e=a==null?void 0:a.product_sale_price)==null?void 0:e.currency},price:{value:((h=a==null?void 0:a.product_sale_price)==null?void 0:h.value)||0,currency:(q=a==null?void 0:a.product_sale_price)==null?void 0:q.currency},priceInclTax:{value:((v=a==null?void 0:a.product_sale_price)==null?void 0:v.value)||0,currency:(i=a==null?void 0:a.product_sale_price)==null?void 0:i.currency},totalQuantity:Q(a==null?void 0:a.quantity_ordered),regularPrice:{value:(O=(b=(f=(g=a==null?void 0:a.product)==null?void 0:g.price_range)==null?void 0:f.maximum_price)==null?void 0:b.regular_price)==null?void 0:O.value,currency:(C=(E=(N=(R=a==null?void 0:a.product)==null?void 0:R.price_range)==null?void 0:N.maximum_price)==null?void 0:E.regular_price)==null?void 0:C.currency},product:U(a==null?void 0:a.product),thumbnail:{label:((D=(T=a==null?void 0:a.product)==null?void 0:T.thumbnail)==null?void 0:D.label)||"",url:((A=(P=a==null?void 0:a.product)==null?void 0:P.thumbnail)==null?void 0:A.url)||""},giftCard:(a==null?void 0:a.__typename)==="GiftCardOrderItem"?{senderName:((G=a.gift_card)==null?void 0:G.sender_name)||"",senderEmail:((k=a.gift_card)==null?void 0:k.sender_email)||"",recipientEmail:((x=a.gift_card)==null?void 0:x.recipient_email)||"",recipientName:((S=a.gift_card)==null?void 0:S.recipient_name)||"",message:((L=a.gift_card)==null?void 0:L.message)||""}:void 0,configurableOptions:j(a),bundleOptions:a.__typename==="BundleOrderItem"?w(a.bundle_options):null,itemPrices:a.prices,downloadableLinks:a.__typename==="DownloadableOrderItem"?z(a==null?void 0:a.downloadable_links):null}}),K=(n,a)=>{var q,v,i,g,f,b;const c=M(n.items),s=((q=B(n==null?void 0:n.returns))==null?void 0:q.ordersReturn)??[],t=a?s.filter(O=>O.returnNumber===a):s,{total:_,...u}=F({...n,items:c,returns:t},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),l=(v=n==null?void 0:n.payment_methods)==null?void 0:v[0],p=(l==null?void 0:l.type)||"",y=(l==null?void 0:l.name)||"",e=(i=u==null?void 0:u.items)==null?void 0:i.reduce((O,R)=>O+(R==null?void 0:R.totalQuantity),0);return{..._,...u,totalQuantity:e,shipping:{amount:((g=u==null?void 0:u.total)==null?void 0:g.totalShipping.value)??0,currency:((b=(f=u.total)==null?void 0:f.totalShipping)==null?void 0:b.currency)||"",code:u.shippingMethod??""},payments:[{code:p,name:y}]}},$=(n,a,c)=>{var s,t,_,u,l,p,y;if((u=(_=(t=(s=a==null?void 0:a.data)==null?void 0:s.customer)==null?void 0:t.orders)==null?void 0:_.items)!=null&&u.length&&n==="orderData"){const e=(y=(p=(l=a==null?void 0:a.data)==null?void 0:l.customer)==null?void 0:p.orders)==null?void 0:y.items[0];return K(e,c)}return null};export{Y as B,W as G,X as O,J as P,Z as R,V as a,$ as b,B as c,K as t};
