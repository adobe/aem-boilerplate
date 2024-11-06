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
`,B=n=>{var s;if(!((s=n==null?void 0:n.items)!=null&&s.length))return null;const a=n==null?void 0:n.items,u=n==null?void 0:n.page_info;return{ordersReturn:a.map(l=>{var f,b;const{order:_,status:t,number:y}=l,v=((b=(f=l==null?void 0:l.shipping)==null?void 0:f.tracking)==null?void 0:b.map(i=>{const{status:p,carrier:g,tracking_number:q}=i;return{status:p,carrier:g,trackingNumber:q}}))??[],O=l.items.map(i=>{var h;const p=i==null?void 0:i.quantity,g=i==null?void 0:i.status,q=i==null?void 0:i.request_quantity,e=i==null?void 0:i.uid,R=i==null?void 0:i.order_item,E=((h=M([R]))==null?void 0:h.reduce((T,N)=>N,{}))??{};return{uid:e,quantity:p,status:g,requestQuantity:q,orderItem:E}});return{returnStatus:t,token:_==null?void 0:_.token,orderNumber:_==null?void 0:_.number,returnNumber:y,items:O,tracking:v}}),...u?{pageInfo:{pageSize:u.page_size,totalPages:u.total_pages,currentPage:u.current_page}}:{}}},U=n=>n||0,Q=n=>{var a,u,c;return{...n,canonicalUrl:(n==null?void 0:n.canonical_url)||"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)||"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((a=n==null?void 0:n.image)==null?void 0:a.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((u=n==null?void 0:n.thumbnail)==null?void 0:u.label)||"",url:((c=n==null?void 0:n.thumbnail)==null?void 0:c.url)||""}}},j=n=>{if(!n||!("selected_options"in n))return;const a={};for(const u of n.selected_options)a[u.label]=u.value;return a},w=n=>{const a=n==null?void 0:n.map(c=>({uid:c.uid,label:c.label,values:c.values.map(s=>s.product_name).join(", ")})),u={};return a==null||a.forEach(c=>{u[c.label]=c.values}),Object.keys(u).length>0?u:null},K=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(a=>a.title).join(", ")}:null,M=n=>n==null?void 0:n.filter(a=>a.__typename).map(a=>{var u,c,s,l,_,t,y,v,O,f,b,i,p,g,q,e,R,E,h,T,N,k,C,D,P,G,A,x,S,L;return{type:a==null?void 0:a.__typename,productName:a.product_name,productUrlKey:a.product_url_key,quantityCanceled:(a==null?void 0:a.quantity_canceled)||0,quantityInvoiced:(a==null?void 0:a.quantity_invoiced)||0,quantityOrdered:(a==null?void 0:a.quantity_ordered)||0,quantityRefunded:(a==null?void 0:a.quantity_refunded)||0,quantityReturned:(a==null?void 0:a.quantity_returned)||0,quantityShipped:(a==null?void 0:a.quantity_shipped)||0,id:a==null?void 0:a.id,discounted:((l=(s=(c=(u=a==null?void 0:a.product)==null?void 0:u.price_range)==null?void 0:c.maximum_price)==null?void 0:s.regular_price)==null?void 0:l.value)*(a==null?void 0:a.quantity_ordered)!==((_=a==null?void 0:a.product_sale_price)==null?void 0:_.value)*(a==null?void 0:a.quantity_ordered),total:{value:((t=a==null?void 0:a.product_sale_price)==null?void 0:t.value)*(a==null?void 0:a.quantity_ordered)||0,currency:((y=a==null?void 0:a.product_sale_price)==null?void 0:y.currency)||""},totalInclTax:{value:((v=a==null?void 0:a.product_sale_price)==null?void 0:v.value)*(a==null?void 0:a.quantity_ordered)||0,currency:(O=a==null?void 0:a.product_sale_price)==null?void 0:O.currency},price:{value:((f=a==null?void 0:a.product_sale_price)==null?void 0:f.value)||0,currency:(b=a==null?void 0:a.product_sale_price)==null?void 0:b.currency},priceInclTax:{value:((i=a==null?void 0:a.product_sale_price)==null?void 0:i.value)||0,currency:(p=a==null?void 0:a.product_sale_price)==null?void 0:p.currency},totalQuantity:U(a==null?void 0:a.quantity_ordered),regularPrice:{value:(R=(e=(q=(g=a==null?void 0:a.product)==null?void 0:g.price_range)==null?void 0:q.maximum_price)==null?void 0:e.regular_price)==null?void 0:R.value,currency:(N=(T=(h=(E=a==null?void 0:a.product)==null?void 0:E.price_range)==null?void 0:h.maximum_price)==null?void 0:T.regular_price)==null?void 0:N.currency},product:Q(a==null?void 0:a.product),thumbnail:{label:((C=(k=a==null?void 0:a.product)==null?void 0:k.thumbnail)==null?void 0:C.label)||"",url:((P=(D=a==null?void 0:a.product)==null?void 0:D.thumbnail)==null?void 0:P.url)||""},giftCard:(a==null?void 0:a.__typename)==="GiftCardOrderItem"?{senderName:((G=a.gift_card)==null?void 0:G.sender_name)||"",senderEmail:((A=a.gift_card)==null?void 0:A.sender_email)||"",recipientEmail:((x=a.gift_card)==null?void 0:x.recipient_email)||"",recipientName:((S=a.gift_card)==null?void 0:S.recipient_name)||"",message:((L=a.gift_card)==null?void 0:L.message)||""}:void 0,configurableOptions:j(a),bundleOptions:a.__typename==="BundleOrderItem"?w(a.bundle_options):null,itemPrices:a.prices,downloadableLinks:a.__typename==="DownloadableOrderItem"?K(a==null?void 0:a.downloadable_links):null}}),z=n=>{var O,f,b,i,p,g;const a=M(n.items),u=((O=B(n==null?void 0:n.returns))==null?void 0:O.ordersReturn)??[],{total:c,...s}=F({...n,items:a,returns:u},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),l=(f=n==null?void 0:n.payment_methods)==null?void 0:f[0],_=(l==null?void 0:l.type)||"",t=(l==null?void 0:l.name)||"",y=(b=s==null?void 0:s.items)==null?void 0:b.reduce((q,e)=>q+(e==null?void 0:e.totalQuantity),0);return{...c,...s,totalQuantity:y,shipping:{amount:((i=s==null?void 0:s.total)==null?void 0:i.totalShipping.value)??0,currency:((g=(p=s.total)==null?void 0:p.totalShipping)==null?void 0:g.currency)||"",code:s.shippingMethod??""},payments:[{code:_,name:t}]}},$=(n,a)=>{var u,c,s,l,_,t,y;if((l=(s=(c=(u=a==null?void 0:a.data)==null?void 0:u.customer)==null?void 0:c.orders)==null?void 0:s.items)!=null&&l.length&&n==="orderData"){const v=(y=(t=(_=a==null?void 0:a.data)==null?void 0:_.customer)==null?void 0:t.orders)==null?void 0:y.items[0];return z(v)}return null};export{Y as B,W as G,X as O,J as P,Z as R,V as a,z as b,$ as c,B as t};
