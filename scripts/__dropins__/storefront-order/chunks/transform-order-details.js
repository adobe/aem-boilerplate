import{d as G}from"./fetch-graphql.js";const z=`
fragment OrderSummary on OrderTotal {
  grand_total {
    value
    currency
  }
  subtotal {
    currency
    value
  }
  taxes {
    amount {
      currency
      value
    }
    rate
    title
  }
  total_tax {
    currency
    value
  }
  total_shipping {
    currency
    value
  }
  discounts {
    amount {
      currency
      value
    }
    label
  }
}`,B=`
fragment AddressesList on OrderAddress {
  city
  company
  country_code
  fax
  firstname
  lastname
  middlename
  postcode
  prefix
  region
  region_id
  street
  suffix
  telephone
  vat_id
}`,F=`
fragment OrderItems on OrderItem {
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
    __typename
    canonical_url
    uid
    name
    sku
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
}`,K=n=>n||0,L=n=>{var a,u,i;return{canonicalUrl:(n==null?void 0:n.canonical_url)||"",id:(n==null?void 0:n.uid)||"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((a=n==null?void 0:n.image)==null?void 0:a.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((u=n==null?void 0:n.thumbnail)==null?void 0:u.label)||"",url:((i=n==null?void 0:n.thumbnail)==null?void 0:i.url)||""}}},P=n=>{if(!n||!("selected_options"in n))return;const a={};for(const u of n.selected_options)a[u.label]=u.value;return a},Y=n=>n==null?void 0:n.map(a=>{var u,i,l,c,_,s,p,y,t,f,g,v,q,b,h,O,x,C,N,R,S,E,A,T,k,M,Q,U,D;return{type:a==null?void 0:a.__typename,productName:a.product_name,quantityCanceled:a==null?void 0:a.quantity_canceled,quantityInvoiced:a==null?void 0:a.quantity_invoiced,quantityOrdered:a==null?void 0:a.quantity_ordered,quantityRefunded:a==null?void 0:a.quantity_refunded,quantityReturned:a==null?void 0:a.quantity_returned,quantityShipped:a==null?void 0:a.quantity_shipped,id:a==null?void 0:a.id,discounted:((c=(l=(i=(u=a==null?void 0:a.product)==null?void 0:u.price_range)==null?void 0:i.maximum_price)==null?void 0:l.regular_price)==null?void 0:c.value)*(a==null?void 0:a.quantity_ordered)!==((_=a==null?void 0:a.product_sale_price)==null?void 0:_.value)*(a==null?void 0:a.quantity_ordered),total:{value:((s=a==null?void 0:a.product_sale_price)==null?void 0:s.value)*(a==null?void 0:a.quantity_ordered),currency:(p=a==null?void 0:a.product_sale_price)==null?void 0:p.currency},totalInclTax:{value:((y=a==null?void 0:a.product_sale_price)==null?void 0:y.value)*(a==null?void 0:a.quantity_ordered),currency:(t=a==null?void 0:a.product_sale_price)==null?void 0:t.currency},price:{value:(f=a==null?void 0:a.product_sale_price)==null?void 0:f.value,currency:(g=a==null?void 0:a.product_sale_price)==null?void 0:g.currency},priceInclTax:{value:(v=a==null?void 0:a.product_sale_price)==null?void 0:v.value,currency:(q=a==null?void 0:a.product_sale_price)==null?void 0:q.currency},totalQuantity:K(a==null?void 0:a.quantity_ordered),regularPrice:{value:(x=(O=(h=(b=a==null?void 0:a.product)==null?void 0:b.price_range)==null?void 0:h.maximum_price)==null?void 0:O.regular_price)==null?void 0:x.value,currency:(S=(R=(N=(C=a==null?void 0:a.product)==null?void 0:C.price_range)==null?void 0:N.maximum_price)==null?void 0:R.regular_price)==null?void 0:S.currency},product:L(a==null?void 0:a.product),thumbnail:{label:((A=(E=a==null?void 0:a.product)==null?void 0:E.thumbnail)==null?void 0:A.label)||"",url:((k=(T=a==null?void 0:a.product)==null?void 0:T.thumbnail)==null?void 0:k.url)||""},giftCard:(a==null?void 0:a.__typename)==="GiftCardOrderItem"?{senderName:((M=a.gift_card)==null?void 0:M.sender_name)||"",senderEmail:((Q=a.gift_card)==null?void 0:Q.sender_email)||"",recipientEmail:((U=a.gift_card)==null?void 0:U.recipient_email)||"",recipientName:((D=a.gift_card)==null?void 0:D.recipient_name)||""}:void 0,configurableOptions:P(a)}}),j=n=>{var y,t,f,g,v;const a=Y(n.items),{total:u,...i}=G({...n,items:a},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),l=(y=n==null?void 0:n.payment_methods)==null?void 0:y[0],c=(l==null?void 0:l.type)||"",_=(l==null?void 0:l.name)||"",s=(t=i==null?void 0:i.items)==null?void 0:t.reduce((q,b)=>q+b.totalQuantity,0);return{...u,...i,totalQuantity:s,shipping:{amount:((f=i==null?void 0:i.total)==null?void 0:f.totalShipping.value)??0,currency:((v=(g=i.total)==null?void 0:g.totalShipping)==null?void 0:v.currency)||"",code:i.shippingMethod??""},payments:[{code:c,name:_}]}},H=(n,a)=>{var u,i,l,c,_,s,p;if((c=(l=(i=(u=a==null?void 0:a.data)==null?void 0:u.customer)==null?void 0:i.orders)==null?void 0:l.items)!=null&&c.length&&n==="orderData"){const y=(p=(s=(_=a==null?void 0:a.data)==null?void 0:_.customer)==null?void 0:s.orders)==null?void 0:p.items[0];return j(y)}return null};export{B as A,z as O,F as a,H as b,j as t};
