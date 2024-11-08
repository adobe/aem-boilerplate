/*! Copyright 2024 Adobe
All Rights Reserved. */
import{a as M}from"./convertCase.js";const J=`
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
`,B=a=>{var y;if(!((y=a==null?void 0:a.items)!=null&&y.length))return null;const n=a==null?void 0:a.items,u=a==null?void 0:a.page_info;return{ordersReturn:n.sort((c,_)=>+_.number-+c.number).map(c=>{var O,N;const{order:_,status:p,number:s,created_at:t}=c,q=((N=(O=c==null?void 0:c.shipping)==null?void 0:O.tracking)==null?void 0:N.map(i=>{const{status:g,carrier:f,tracking_number:b}=i;return{status:g,carrier:f,trackingNumber:b}}))??[],E=c.items.map(i=>{var e;const g=i==null?void 0:i.quantity,f=i==null?void 0:i.status,b=i==null?void 0:i.request_quantity,R=i==null?void 0:i.uid,h=i==null?void 0:i.order_item,v=((e=C([h]))==null?void 0:e.reduce((T,k)=>k,{}))??{};return{uid:R,quantity:g,status:f,requestQuantity:b,...v}});return{createdReturnAt:t,returnStatus:p,token:_==null?void 0:_.token,orderNumber:_==null?void 0:_.number,returnNumber:s,items:E,tracking:q}}),...u?{pageInfo:{pageSize:u.page_size,totalPages:u.total_pages,currentPage:u.current_page}}:{}}},U=a=>a||0,Q=a=>{var n,u,l;return{...a,canonicalUrl:(a==null?void 0:a.canonical_url)||"",urlKey:(a==null?void 0:a.url_key)||"",id:(a==null?void 0:a.uid)||"",name:(a==null?void 0:a.name)||"",sku:(a==null?void 0:a.sku)||"",image:((n=a==null?void 0:a.image)==null?void 0:n.url)||"",productType:(a==null?void 0:a.__typename)||"",thumbnail:{label:((u=a==null?void 0:a.thumbnail)==null?void 0:u.label)||"",url:((l=a==null?void 0:a.thumbnail)==null?void 0:l.url)||""}}},j=a=>{if(!a||!("selected_options"in a))return;const n={};for(const u of a.selected_options)n[u.label]=u.value;return n},w=a=>{const n=a==null?void 0:a.map(l=>({uid:l.uid,label:l.label,values:l.values.map(y=>y.product_name).join(", ")})),u={};return n==null||n.forEach(l=>{u[l.label]=l.values}),Object.keys(u).length>0?u:null},K=a=>(a==null?void 0:a.length)>0?{count:a.length,result:a.map(n=>n.title).join(", ")}:null,C=a=>a==null?void 0:a.filter(n=>n.__typename).map(n=>{var u,l,y,c,_,p,s,t,q,E,O,N,i,g,f,b,R,h,v,e,T,k,P,A,G,S,x,D,F,L;return{type:n==null?void 0:n.__typename,eligibleForReturn:n==null?void 0:n.eligible_for_return,productSku:n==null?void 0:n.product_sku,productName:n.product_name,productUrlKey:n.product_url_key,quantityCanceled:(n==null?void 0:n.quantity_canceled)||0,quantityInvoiced:(n==null?void 0:n.quantity_invoiced)||0,quantityOrdered:(n==null?void 0:n.quantity_ordered)||0,quantityRefunded:(n==null?void 0:n.quantity_refunded)||0,quantityReturned:(n==null?void 0:n.quantity_returned)||0,quantityShipped:(n==null?void 0:n.quantity_shipped)||0,id:n==null?void 0:n.id,discounted:((c=(y=(l=(u=n==null?void 0:n.product)==null?void 0:u.price_range)==null?void 0:l.maximum_price)==null?void 0:y.regular_price)==null?void 0:c.value)*(n==null?void 0:n.quantity_ordered)!==((_=n==null?void 0:n.product_sale_price)==null?void 0:_.value)*(n==null?void 0:n.quantity_ordered),total:{value:((p=n==null?void 0:n.product_sale_price)==null?void 0:p.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((s=n==null?void 0:n.product_sale_price)==null?void 0:s.currency)||""},totalInclTax:{value:((t=n==null?void 0:n.product_sale_price)==null?void 0:t.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(q=n==null?void 0:n.product_sale_price)==null?void 0:q.currency},price:{value:((E=n==null?void 0:n.product_sale_price)==null?void 0:E.value)||0,currency:(O=n==null?void 0:n.product_sale_price)==null?void 0:O.currency},priceInclTax:{value:((N=n==null?void 0:n.product_sale_price)==null?void 0:N.value)||0,currency:(i=n==null?void 0:n.product_sale_price)==null?void 0:i.currency},totalQuantity:U(n==null?void 0:n.quantity_ordered),regularPrice:{value:(R=(b=(f=(g=n==null?void 0:n.product)==null?void 0:g.price_range)==null?void 0:f.maximum_price)==null?void 0:b.regular_price)==null?void 0:R.value,currency:(T=(e=(v=(h=n==null?void 0:n.product)==null?void 0:h.price_range)==null?void 0:v.maximum_price)==null?void 0:e.regular_price)==null?void 0:T.currency},product:Q(n==null?void 0:n.product),thumbnail:{label:((P=(k=n==null?void 0:n.product)==null?void 0:k.thumbnail)==null?void 0:P.label)||"",url:((G=(A=n==null?void 0:n.product)==null?void 0:A.thumbnail)==null?void 0:G.url)||""},giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?{senderName:((S=n.gift_card)==null?void 0:S.sender_name)||"",senderEmail:((x=n.gift_card)==null?void 0:x.sender_email)||"",recipientEmail:((D=n.gift_card)==null?void 0:D.recipient_email)||"",recipientName:((F=n.gift_card)==null?void 0:F.recipient_name)||"",message:((L=n.gift_card)==null?void 0:L.message)||""}:void 0,configurableOptions:j(n),bundleOptions:n.__typename==="BundleOrderItem"?w(n.bundle_options):null,itemPrices:n.prices,downloadableLinks:n.__typename==="DownloadableOrderItem"?K(n==null?void 0:n.downloadable_links):null}}),z=(a,n)=>{var i,g,f,b,R,h;const u=C(a.items),l=C(a==null?void 0:a.items_eligible_for_return),y=u,c=((i=B(a==null?void 0:a.returns))==null?void 0:i.ordersReturn)??[],_=n?c.filter(v=>v.returnNumber===n):c,{total:p,...s}=M({...a,items:u,returns:_,itemsEligibleForReturn:y,itemsEligibleForReturn2:l},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),t=(g=a==null?void 0:a.payment_methods)==null?void 0:g[0],q=(t==null?void 0:t.type)||"",E=(t==null?void 0:t.name)||"",O=(f=s==null?void 0:s.items)==null?void 0:f.reduce((v,e)=>v+(e==null?void 0:e.totalQuantity),0);return{...p,...s,totalQuantity:O,shipping:{amount:((b=s==null?void 0:s.total)==null?void 0:b.totalShipping.value)??0,currency:((h=(R=s.total)==null?void 0:R.totalShipping)==null?void 0:h.currency)||"",code:s.shippingMethod??""},payments:[{code:q,name:E}]}},$=(a,n,u)=>{var l,y,c,_,p,s,t;if((_=(c=(y=(l=n==null?void 0:n.data)==null?void 0:l.customer)==null?void 0:y.orders)==null?void 0:c.items)!=null&&_.length&&a==="orderData"){const q=(t=(s=(p=n==null?void 0:n.data)==null?void 0:p.customer)==null?void 0:s.orders)==null?void 0:t.items[0];return z(q,u)}return null};export{Y as B,W as G,X as O,J as P,Z as R,V as a,z as b,$ as c,B as t};
