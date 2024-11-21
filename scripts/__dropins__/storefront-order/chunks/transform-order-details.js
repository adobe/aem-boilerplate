/*! Copyright 2024 Adobe
All Rights Reserved. */
import{a as z}from"./convertCase.js";const d=`
  fragment ProductDetails on ProductInterface {
    __typename
    canonical_url
    url_key
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
`,r=`
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
`,m=`
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
`,I=`
  fragment OrderItemDetails on OrderItemInterface {
    __typename
    status
    product_sku
    eligible_for_return
    product_name
    product_url_key
    id
    quantity_ordered
    quantity_shipped
    quantity_canceled
    quantity_invoiced
    quantity_refunded
    quantity_return_requested
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
`,nn=`
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
`,an=`
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
`,H=a=>{var t;if(!((t=a==null?void 0:a.items)!=null&&t.length))return null;const n=a==null?void 0:a.items,s=a==null?void 0:a.page_info;return{ordersReturn:[...n].sort((l,u)=>+u.number-+l.number).map(l=>{var q,R;const{order:u,status:_,number:e,created_at:y}=l,b=((R=(q=l==null?void 0:l.shipping)==null?void 0:q.tracking)==null?void 0:R.map(i=>{const{status:p,carrier:g,tracking_number:f}=i;return{status:p,carrier:g,trackingNumber:f}}))??[],h=l.items.map(i=>{var E;const p=i==null?void 0:i.quantity,g=i==null?void 0:i.status,f=i==null?void 0:i.request_quantity,v=i==null?void 0:i.uid,O=i==null?void 0:i.order_item,N=((E=K([O]))==null?void 0:E.reduce((T,k)=>k,{}))??{};return{uid:v,quantity:p,status:g,requestQuantity:f,...N}});return{createdReturnAt:y,returnStatus:_,token:u==null?void 0:u.token,orderNumber:u==null?void 0:u.number,returnNumber:e,items:h,tracking:b}}),...s?{pageInfo:{pageSize:s.page_size,totalPages:s.total_pages,currentPage:s.current_page}}:{}}},J=a=>a||0,V=a=>{var n,s,c;return{...a,canonicalUrl:(a==null?void 0:a.canonical_url)||"",urlKey:(a==null?void 0:a.url_key)||"",id:(a==null?void 0:a.uid)||"",name:(a==null?void 0:a.name)||"",sku:(a==null?void 0:a.sku)||"",image:((n=a==null?void 0:a.image)==null?void 0:n.url)||"",productType:(a==null?void 0:a.__typename)||"",thumbnail:{label:((s=a==null?void 0:a.thumbnail)==null?void 0:s.label)||"",url:((c=a==null?void 0:a.thumbnail)==null?void 0:c.url)||""}}},W=a=>{if(!a||!("selected_options"in a))return;const n={};for(const s of a.selected_options)n[s.label]=s.value;return n},X=a=>{const n=a==null?void 0:a.map(c=>({uid:c.uid,label:c.label,values:c.values.map(t=>t.product_name).join(", ")})),s={};return n==null||n.forEach(c=>{s[c.label]=c.values}),Object.keys(s).length>0?s:null},Y=a=>(a==null?void 0:a.length)>0?{count:a.length,result:a.map(n=>n.title).join(", ")}:null,Z=a=>({quantityCanceled:(a==null?void 0:a.quantity_canceled)??0,quantityInvoiced:(a==null?void 0:a.quantity_invoiced)??0,quantityOrdered:(a==null?void 0:a.quantity_ordered)??0,quantityRefunded:(a==null?void 0:a.quantity_refunded)??0,quantityReturned:(a==null?void 0:a.quantity_returned)??0,quantityShipped:(a==null?void 0:a.quantity_shipped)??0,quantityReturnRequested:(a==null?void 0:a.quantity_return_requested)??0}),K=a=>a==null?void 0:a.filter(n=>n.__typename).map(n=>{var y,b,h,q,R,i,p,g,f,v,O,N,E,T,k,C,D,P,A,G,S,x,L,F,M,B,Q,U,j,w;const{quantityCanceled:s,quantityInvoiced:c,quantityOrdered:t,quantityRefunded:l,quantityReturned:u,quantityShipped:_,quantityReturnRequested:e}=Z(n);return{type:n==null?void 0:n.__typename,eligibleForReturn:n==null?void 0:n.eligible_for_return,productSku:n==null?void 0:n.product_sku,productName:n.product_name,productUrlKey:n.product_url_key,quantityCanceled:s,quantityInvoiced:c,quantityOrdered:t,quantityRefunded:l,quantityReturned:u,quantityShipped:_,quantityReturnRequested:e,id:n==null?void 0:n.id,discounted:((q=(h=(b=(y=n==null?void 0:n.product)==null?void 0:y.price_range)==null?void 0:b.maximum_price)==null?void 0:h.regular_price)==null?void 0:q.value)*(n==null?void 0:n.quantity_ordered)!==((R=n==null?void 0:n.product_sale_price)==null?void 0:R.value)*(n==null?void 0:n.quantity_ordered),total:{value:((i=n==null?void 0:n.product_sale_price)==null?void 0:i.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((p=n==null?void 0:n.product_sale_price)==null?void 0:p.currency)||""},totalInclTax:{value:((g=n==null?void 0:n.product_sale_price)==null?void 0:g.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(f=n==null?void 0:n.product_sale_price)==null?void 0:f.currency},price:{value:((v=n==null?void 0:n.product_sale_price)==null?void 0:v.value)||0,currency:(O=n==null?void 0:n.product_sale_price)==null?void 0:O.currency},priceInclTax:{value:((N=n==null?void 0:n.product_sale_price)==null?void 0:N.value)||0,currency:(E=n==null?void 0:n.product_sale_price)==null?void 0:E.currency},totalQuantity:J(n==null?void 0:n.quantity_ordered),regularPrice:{value:(D=(C=(k=(T=n==null?void 0:n.product)==null?void 0:T.price_range)==null?void 0:k.maximum_price)==null?void 0:C.regular_price)==null?void 0:D.value,currency:(S=(G=(A=(P=n==null?void 0:n.product)==null?void 0:P.price_range)==null?void 0:A.maximum_price)==null?void 0:G.regular_price)==null?void 0:S.currency},product:V(n==null?void 0:n.product),thumbnail:{label:((L=(x=n==null?void 0:n.product)==null?void 0:x.thumbnail)==null?void 0:L.label)||"",url:((M=(F=n==null?void 0:n.product)==null?void 0:F.thumbnail)==null?void 0:M.url)||""},giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?{senderName:((B=n.gift_card)==null?void 0:B.sender_name)||"",senderEmail:((Q=n.gift_card)==null?void 0:Q.sender_email)||"",recipientEmail:((U=n.gift_card)==null?void 0:U.recipient_email)||"",recipientName:((j=n.gift_card)==null?void 0:j.recipient_name)||"",message:((w=n.gift_card)==null?void 0:w.message)||""}:void 0,configurableOptions:W(n),bundleOptions:n.__typename==="BundleOrderItem"?X(n.bundle_options):null,itemPrices:n.prices,downloadableLinks:n.__typename==="DownloadableOrderItem"?Y(n==null?void 0:n.downloadable_links):null}}),$=(a,n)=>{var q,R,i,p,g,f;const s=K(a.items),c=((q=H(a==null?void 0:a.returns))==null?void 0:q.ordersReturn)??[],t=n?c.filter(v=>v.returnNumber===n):c,{total:l,...u}=z({...a,items:s,returns:t},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),_=(R=a==null?void 0:a.payment_methods)==null?void 0:R[0],e=(_==null?void 0:_.type)||"",y=(_==null?void 0:_.name)||"",b=(i=u==null?void 0:u.items)==null?void 0:i.reduce((v,O)=>v+(O==null?void 0:O.totalQuantity),0);return{...l,...u,totalQuantity:b,shipping:{amount:((p=u==null?void 0:u.total)==null?void 0:p.totalShipping.value)??0,currency:((f=(g=u.total)==null?void 0:g.totalShipping)==null?void 0:f.currency)||"",code:u.shippingMethod??""},payments:[{code:e,name:y}]}},un=(a,n,s)=>{var c,t,l,u,_,e,y;if((u=(l=(t=(c=n==null?void 0:n.data)==null?void 0:c.customer)==null?void 0:t.orders)==null?void 0:l.items)!=null&&u.length&&a==="orderData"){const b=(y=(e=(_=n==null?void 0:n.data)==null?void 0:_.customer)==null?void 0:e.orders)==null?void 0:y.items[0];return $(b,s)}return null};export{nn as B,m as G,I as O,d as P,an as R,r as a,$ as b,un as c,H as t};
