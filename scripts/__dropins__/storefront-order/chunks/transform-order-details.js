/*! Copyright 2024 Adobe
All Rights Reserved. */
import{a as F}from"./convertCase.js";const J=`
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
    product_name
    product_url_key
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
`,B=n=>{var t;if(!((t=n==null?void 0:n.items)!=null&&t.length))return null;const a=n==null?void 0:n.items,s=n==null?void 0:n.page_info;return{ordersReturn:a.map(l=>{var q,v;const{order:i,status:_,number:y,created_at:p}=l,b=((v=(q=l==null?void 0:l.shipping)==null?void 0:q.tracking)==null?void 0:v.map(u=>{const{status:g,carrier:f,tracking_number:e}=u;return{status:g,carrier:f,trackingNumber:e}}))??[],h=l.items.map(u=>{var N;const g=u==null?void 0:u.quantity,f=u==null?void 0:u.status,e=u==null?void 0:u.request_quantity,O=u==null?void 0:u.uid,R=u==null?void 0:u.order_item,E=((N=M([R]))==null?void 0:N.reduce((k,T)=>T,{}))??{};return{uid:O,quantity:g,status:f,requestQuantity:e,...E}});return{createdReturnAt:p,returnStatus:_,token:i==null?void 0:i.token,orderNumber:i==null?void 0:i.number,returnNumber:y,items:h,tracking:b}}).sort((l,i)=>+i.returnNumber-+l.returnNumber),...s?{pageInfo:{pageSize:s.page_size,totalPages:s.total_pages,currentPage:s.current_page}}:{}}},U=n=>n||0,Q=n=>{var a,s,c;return{...n,canonicalUrl:(n==null?void 0:n.canonical_url)||"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)||"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((a=n==null?void 0:n.image)==null?void 0:a.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((s=n==null?void 0:n.thumbnail)==null?void 0:s.label)||"",url:((c=n==null?void 0:n.thumbnail)==null?void 0:c.url)||""}}},j=n=>{if(!n||!("selected_options"in n))return;const a={};for(const s of n.selected_options)a[s.label]=s.value;return a},w=n=>{const a=n==null?void 0:n.map(c=>({uid:c.uid,label:c.label,values:c.values.map(t=>t.product_name).join(", ")})),s={};return a==null||a.forEach(c=>{s[c.label]=c.values}),Object.keys(s).length>0?s:null},K=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(a=>a.title).join(", ")}:null,M=n=>n==null?void 0:n.filter(a=>a.__typename).map(a=>{var s,c,t,l,i,_,y,p,b,h,q,v,u,g,f,e,O,R,E,N,k,T,C,D,P,A,G,x,S,L;return{type:a==null?void 0:a.__typename,productName:a.product_name,productUrlKey:a.product_url_key,quantityCanceled:(a==null?void 0:a.quantity_canceled)||0,quantityInvoiced:(a==null?void 0:a.quantity_invoiced)||0,quantityOrdered:(a==null?void 0:a.quantity_ordered)||0,quantityRefunded:(a==null?void 0:a.quantity_refunded)||0,quantityReturned:(a==null?void 0:a.quantity_returned)||0,quantityShipped:(a==null?void 0:a.quantity_shipped)||0,id:a==null?void 0:a.id,discounted:((l=(t=(c=(s=a==null?void 0:a.product)==null?void 0:s.price_range)==null?void 0:c.maximum_price)==null?void 0:t.regular_price)==null?void 0:l.value)*(a==null?void 0:a.quantity_ordered)!==((i=a==null?void 0:a.product_sale_price)==null?void 0:i.value)*(a==null?void 0:a.quantity_ordered),total:{value:((_=a==null?void 0:a.product_sale_price)==null?void 0:_.value)*(a==null?void 0:a.quantity_ordered)||0,currency:((y=a==null?void 0:a.product_sale_price)==null?void 0:y.currency)||""},totalInclTax:{value:((p=a==null?void 0:a.product_sale_price)==null?void 0:p.value)*(a==null?void 0:a.quantity_ordered)||0,currency:(b=a==null?void 0:a.product_sale_price)==null?void 0:b.currency},price:{value:((h=a==null?void 0:a.product_sale_price)==null?void 0:h.value)||0,currency:(q=a==null?void 0:a.product_sale_price)==null?void 0:q.currency},priceInclTax:{value:((v=a==null?void 0:a.product_sale_price)==null?void 0:v.value)||0,currency:(u=a==null?void 0:a.product_sale_price)==null?void 0:u.currency},totalQuantity:U(a==null?void 0:a.quantity_ordered),regularPrice:{value:(O=(e=(f=(g=a==null?void 0:a.product)==null?void 0:g.price_range)==null?void 0:f.maximum_price)==null?void 0:e.regular_price)==null?void 0:O.value,currency:(k=(N=(E=(R=a==null?void 0:a.product)==null?void 0:R.price_range)==null?void 0:E.maximum_price)==null?void 0:N.regular_price)==null?void 0:k.currency},product:Q(a==null?void 0:a.product),thumbnail:{label:((C=(T=a==null?void 0:a.product)==null?void 0:T.thumbnail)==null?void 0:C.label)||"",url:((P=(D=a==null?void 0:a.product)==null?void 0:D.thumbnail)==null?void 0:P.url)||""},giftCard:(a==null?void 0:a.__typename)==="GiftCardOrderItem"?{senderName:((A=a.gift_card)==null?void 0:A.sender_name)||"",senderEmail:((G=a.gift_card)==null?void 0:G.sender_email)||"",recipientEmail:((x=a.gift_card)==null?void 0:x.recipient_email)||"",recipientName:((S=a.gift_card)==null?void 0:S.recipient_name)||"",message:((L=a.gift_card)==null?void 0:L.message)||""}:void 0,configurableOptions:j(a),bundleOptions:a.__typename==="BundleOrderItem"?w(a.bundle_options):null,itemPrices:a.prices,downloadableLinks:a.__typename==="DownloadableOrderItem"?K(a==null?void 0:a.downloadable_links):null}}),z=(n,a)=>{var q,v,u,g,f,e;const s=M(n.items),c=((q=B(n==null?void 0:n.returns))==null?void 0:q.ordersReturn)??[],t=a?c.filter(O=>O.returnNumber===a):c,{total:l,...i}=F({...n,items:s,returns:t},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),_=(v=n==null?void 0:n.payment_methods)==null?void 0:v[0],y=(_==null?void 0:_.type)||"",p=(_==null?void 0:_.name)||"",b=(u=i==null?void 0:i.items)==null?void 0:u.reduce((O,R)=>O+(R==null?void 0:R.totalQuantity),0);return{...l,...i,totalQuantity:b,shipping:{amount:((g=i==null?void 0:i.total)==null?void 0:g.totalShipping.value)??0,currency:((e=(f=i.total)==null?void 0:f.totalShipping)==null?void 0:e.currency)||"",code:i.shippingMethod??""},payments:[{code:y,name:p}]}},$=(n,a,s)=>{var c,t,l,i,_,y,p;if((i=(l=(t=(c=a==null?void 0:a.data)==null?void 0:c.customer)==null?void 0:t.orders)==null?void 0:l.items)!=null&&i.length&&n==="orderData"){const b=(p=(y=(_=a==null?void 0:a.data)==null?void 0:_.customer)==null?void 0:y.orders)==null?void 0:p.items[0];return z(b,s)}return null};export{Y as B,W as G,X as O,J as P,Z as R,V as a,z as b,$ as c,B as t};
