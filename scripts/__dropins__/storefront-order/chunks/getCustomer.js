import{d as w,f as $,h as B,a as Q}from"./fetch-graphql.js";const L=`
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
}`,F=`
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
}`,K=`
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
}`,P=n=>n||0,Y=n=>{var a,u,i;return{canonicalUrl:(n==null?void 0:n.canonical_url)||"",id:(n==null?void 0:n.uid)||"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((a=n==null?void 0:n.image)==null?void 0:a.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((u=n==null?void 0:n.thumbnail)==null?void 0:u.label)||"",url:((i=n==null?void 0:n.thumbnail)==null?void 0:i.url)||""}}},j=n=>{if(!n||!("selected_options"in n))return;const a={};for(const u of n.selected_options)a[u.label]=u.value;return a},z=n=>n==null?void 0:n.map(a=>{var u,i,c,t,l,_,y,s,g,f,e,h,O,p,b,q,E,T,G,R,C,S,x,k,N,A,U,D,M;return{type:a==null?void 0:a.__typename,productName:a.product_name,quantityCanceled:a==null?void 0:a.quantity_canceled,quantityInvoiced:a==null?void 0:a.quantity_invoiced,quantityOrdered:a==null?void 0:a.quantity_ordered,quantityRefunded:a==null?void 0:a.quantity_refunded,quantityReturned:a==null?void 0:a.quantity_returned,quantityShipped:a==null?void 0:a.quantity_shipped,id:a==null?void 0:a.id,discounted:((t=(c=(i=(u=a==null?void 0:a.product)==null?void 0:u.price_range)==null?void 0:i.maximum_price)==null?void 0:c.regular_price)==null?void 0:t.value)*(a==null?void 0:a.quantity_ordered)!==((l=a==null?void 0:a.product_sale_price)==null?void 0:l.value)*(a==null?void 0:a.quantity_ordered),total:{value:((_=a==null?void 0:a.product_sale_price)==null?void 0:_.value)*(a==null?void 0:a.quantity_ordered),currency:(y=a==null?void 0:a.product_sale_price)==null?void 0:y.currency},totalInclTax:{value:((s=a==null?void 0:a.product_sale_price)==null?void 0:s.value)*(a==null?void 0:a.quantity_ordered),currency:(g=a==null?void 0:a.product_sale_price)==null?void 0:g.currency},price:{value:(f=a==null?void 0:a.product_sale_price)==null?void 0:f.value,currency:(e=a==null?void 0:a.product_sale_price)==null?void 0:e.currency},priceInclTax:{value:(h=a==null?void 0:a.product_sale_price)==null?void 0:h.value,currency:(O=a==null?void 0:a.product_sale_price)==null?void 0:O.currency},totalQuantity:P(a==null?void 0:a.quantity_ordered),regularPrice:{value:(E=(q=(b=(p=a==null?void 0:a.product)==null?void 0:p.price_range)==null?void 0:b.maximum_price)==null?void 0:q.regular_price)==null?void 0:E.value,currency:(C=(R=(G=(T=a==null?void 0:a.product)==null?void 0:T.price_range)==null?void 0:G.maximum_price)==null?void 0:R.regular_price)==null?void 0:C.currency},product:Y(a==null?void 0:a.product),thumbnail:{label:((x=(S=a==null?void 0:a.product)==null?void 0:S.thumbnail)==null?void 0:x.label)||"",url:((N=(k=a==null?void 0:a.product)==null?void 0:k.thumbnail)==null?void 0:N.url)||""},giftCard:(a==null?void 0:a.__typename)==="GiftCardOrderItem"?{senderName:((A=a.gift_card)==null?void 0:A.sender_name)||"",senderEmail:((U=a.gift_card)==null?void 0:U.sender_email)||"",recipientEmail:((D=a.gift_card)==null?void 0:D.recipient_email)||"",recipientName:((M=a.gift_card)==null?void 0:M.recipient_name)||""}:void 0,configurableOptions:j(a)}}),v=n=>{var s,g,f,e,h;const a=z(n.items),{total:u,...i}=w({...n,items:a},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),c=(s=n==null?void 0:n.payment_methods)==null?void 0:s[0],t=(c==null?void 0:c.type)||"",l=(c==null?void 0:c.name)||"",_=(g=i==null?void 0:i.items)==null?void 0:g.reduce((O,p)=>O+p.totalQuantity,0);return{...u,...i,totalQuantity:_,shipping:{amount:((f=i==null?void 0:i.total)==null?void 0:f.totalShipping.value)??0,currency:((h=(e=i.total)==null?void 0:e.totalShipping)==null?void 0:h.currency)||"",code:i.shippingMethod??""},payments:[{code:t,name:l}]}},m=(n,a)=>{var u,i,c,t,l,_,y;if((t=(c=(i=(u=a==null?void 0:a.data)==null?void 0:u.customer)==null?void 0:i.orders)==null?void 0:c.items)!=null&&t.length&&n==="orderData"){const s=(y=(_=(l=a==null?void 0:a.data)==null?void 0:l.customer)==null?void 0:_.orders)==null?void 0:y.items[0];return v(s)}return null},H=n=>{var u,i;if(!((u=n==null?void 0:n.data)!=null&&u.guestOrder))return null;const a=(i=n==null?void 0:n.data)==null?void 0:i.guestOrder;return v(a)},d=n=>{var u,i;if(!((u=n==null?void 0:n.data)!=null&&u.guestOrderByToken))return null;const a=(i=n==null?void 0:n.data)==null?void 0:i.guestOrderByToken;return v(a)},J=n=>{var a,u,i,c,t,l;return{email:((u=(a=n==null?void 0:n.data)==null?void 0:a.customer)==null?void 0:u.email)||"",firstname:((c=(i=n==null?void 0:n.data)==null?void 0:i.customer)==null?void 0:c.firstname)||"",lastname:((l=(t=n==null?void 0:n.data)==null?void 0:t.customer)==null?void 0:l.lastname)||""}},V=`
  fragment guestOrderData on CustomerOrder {
    email
    id
    number
    order_date
    status
    token
    carrier
    shipping_method
    printed_card_included
    gift_receipt_included
    available_actions
    is_virtual
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
      ...OrderItems
      ... on GiftCardOrderItem {
        gift_card {
          recipient_name
          recipient_email
          sender_name
          sender_email
          message
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
    ...OrderItems
    ... on GiftCardOrderItem {
      __typename
      gift_card {
        recipient_name
        recipient_email
        sender_name
        sender_email
        message
      }
    }
  }
  total {
  ...OrderSummary
    }
  }
${L}
${F}
${K}
`,W=`
  query GET_GUEST_ORDER($input: OrderInformationInput!) {
  guestOrder(input:$input) {
    ...guestOrderData
    }
  }
${V}
`,r=async n=>await $(W,{method:"GET",cache:"no-cache",variables:{input:n}}).then(a=>{var u;return(u=a.errors)!=null&&u.length?B(a.errors):H(a)}).catch(Q),X=`
  query GET_CUSTOMER {
    customer {
     firstname
     lastname
     email
    }
  }
`,o=async()=>await $(X,{method:"GET",cache:"force-cache"}).then(n=>{var a;return(a=n.errors)!=null&&a.length?B(n.errors):J(n)}).catch(Q);export{F as A,L as O,K as a,d as b,o as c,r as g,m as t};
