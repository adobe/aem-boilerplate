/*! Copyright 2024 Adobe
All Rights Reserved. */
import{M as L,i as k,l as $,F as B,U as Q}from"./fetch-graphql.js";import{s as P}from"./store-config.js";import"./ServerErrorSignal.js";import{events as q}from"@dropins/tools/event-bus.js";import{merge as j}from"@dropins/tools/lib.js";import{e as V}from"./synchronizeCheckout.js";const X=e=>({id:P.cartId,totalQuantity:e.totalQuantity,possibleOnepageCheckout:!0,items:e.items.map(n=>{var t;return{canApplyMsrp:!0,formattedPrice:"",id:n.id,quantity:n.totalQuantity,product:{canonicalUrl:n.product.canonicalUrl||"",mainImageUrl:n.product.image||"",name:n.product.name,productId:0,productType:n.product.productType,sku:n.product.sku},prices:{price:{value:n.price.value,currency:n.price.currency}},configurableOptions:((t=n.selectedOptions)==null?void 0:t.map(a=>({optionLabel:a.label,valueLabel:a.value})))||[]}})}),Y=e=>{var a,r,i;const n=e.coupons[0],t=(a=e.payments)==null?void 0:a[0];return{appliedCouponCode:(n==null?void 0:n.code)||"",email:e.email,grandTotal:e.total,orderId:e.number,orderType:"checkout",otherTax:0,salesTax:e.totalTax,shipping:{shippingMethod:((r=e.shipping)==null?void 0:r.code)||"",shippingAmount:((i=e.shipping)==null?void 0:i.amount)||0},subtotalExcludingTax:e.subtotal,subtotalIncludingTax:0,payments:t?[{paymentMethodCode:(t==null?void 0:t.code)||"",paymentMethodName:(t==null?void 0:t.name)||"",total:e.total}]:[]}},H=e=>e.replace(/_([a-z])/g,(n,t)=>t.toUpperCase()),g=(e,n,t)=>{const a=["string","boolean","number"],r=H;return Array.isArray(e)?e.map(i=>a.includes(typeof i)||i===null?i:typeof i=="object"?g(i,n,t):i):e!==null&&typeof e=="object"?Object.entries(e).reduce((i,[s,c])=>{const l=t&&t[s]?t[s]:r(s);return i[l]=a.includes(typeof c)||c===null?c:g(c,n,t),i},{}):e},K=e=>e||0,z=e=>{var n,t,a;return{...e,canonicalUrl:(e==null?void 0:e.canonical_url)||"",id:(e==null?void 0:e.uid)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",image:((n=e==null?void 0:e.image)==null?void 0:n.url)||"",productType:(e==null?void 0:e.__typename)||"",thumbnail:{label:((t=e==null?void 0:e.thumbnail)==null?void 0:t.label)||"",url:((a=e==null?void 0:e.thumbnail)==null?void 0:a.url)||""}}},J=e=>{if(!e||!("selected_options"in e))return;const n={};for(const t of e.selected_options)n[t.label]=t.value;return n},W=e=>{const n=e==null?void 0:e.map(a=>({uid:a.uid,label:a.label,values:a.values.map(r=>r.product_name).join(", ")})),t={};return n==null||n.forEach(a=>{t[a.label]=a.values}),Object.keys(t).length>0?t:null},Z=e=>(e==null?void 0:e.length)>0?{count:e.length,result:e.map(n=>n.title).join(", ")}:null,I=e=>e==null?void 0:e.filter(n=>typeof n.__typename<"u").map(n=>{var t,a,r,i,s,c,l,_,p,d,m,y,u,R,E,o,f,T,O,b,h,A,v,C,M,N,D,G,F,x;return{type:n.__typename,productName:n.product_name,quantityCanceled:n.quantity_canceled||0,quantityInvoiced:n.quantity_invoiced||0,quantityOrdered:n.quantity_ordered||0,quantityRefunded:n.quantity_refunded||0,quantityReturned:n.quantity_returned||0,quantityShipped:n.quantity_shipped||0,id:n.id,discounted:((i=(r=(a=(t=n.product)==null?void 0:t.price_range)==null?void 0:a.maximum_price)==null?void 0:r.regular_price)==null?void 0:i.value)*n.quantity_ordered!==((s=n.product_sale_price)==null?void 0:s.value)*n.quantity_ordered,total:{value:((c=n.product_sale_price)==null?void 0:c.value)*n.quantity_ordered||0,currency:((l=n.product_sale_price)==null?void 0:l.currency)||""},totalInclTax:{value:((_=n.product_sale_price)==null?void 0:_.value)*n.quantity_ordered||0,currency:(p=n.product_sale_price)==null?void 0:p.currency},price:{value:((d=n.product_sale_price)==null?void 0:d.value)||0,currency:(m=n.product_sale_price)==null?void 0:m.currency},priceInclTax:{value:((y=n.product_sale_price)==null?void 0:y.value)||0,currency:(u=n.product_sale_price)==null?void 0:u.currency},totalQuantity:K(n.quantity_ordered),regularPrice:{value:(f=(o=(E=(R=n.product)==null?void 0:R.price_range)==null?void 0:E.maximum_price)==null?void 0:o.regular_price)==null?void 0:f.value,currency:(h=(b=(O=(T=n.product)==null?void 0:T.price_range)==null?void 0:O.maximum_price)==null?void 0:b.regular_price)==null?void 0:h.currency},product:z(n.product),thumbnail:{label:((v=(A=n.product)==null?void 0:A.thumbnail)==null?void 0:v.label)||"",url:((M=(C=n.product)==null?void 0:C.thumbnail)==null?void 0:M.url)||""},giftCard:n.__typename==="GiftCardOrderItem"?{senderName:((N=n.gift_card)==null?void 0:N.sender_name)||"",senderEmail:((D=n.gift_card)==null?void 0:D.sender_email)||"",recipientEmail:((G=n.gift_card)==null?void 0:G.recipient_email)||"",recipientName:((F=n.gift_card)==null?void 0:F.recipient_name)||"",message:((x=n.gift_card)==null?void 0:x.message)||""}:void 0,configurableOptions:J(n),bundleOptions:n.__typename==="BundleOrderItem"?W(n.bundle_options):null,itemPrices:n.prices,downloadableLinks:n.__typename==="DownloadableOrderItem"?Z(n.downloadable_links):null}}),ee=e=>{var _,p,d,m,y,u,R;const n=I(e.items),{total:t,...a}=g({...e,items:n},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),r=(_=e==null?void 0:e.payment_methods)==null?void 0:_[0],i=(r==null?void 0:r.type)||"",s=(r==null?void 0:r.name)||"",c=(p=a==null?void 0:a.items)==null?void 0:p.reduce((E,o)=>E+(o==null?void 0:o.totalQuantity),0),l={...t,...a,totalQuantity:c,shipping:{amount:((d=t==null?void 0:t.totalShipping)==null?void 0:d.value)??0,currency:((m=t==null?void 0:t.totalShipping)==null?void 0:m.currency)||"",code:a.shippingMethod??""},payments:[{code:i,name:s}]};return j(l,(R=(u=(y=V.getConfig().models)==null?void 0:y.OrderModel)==null?void 0:u.transformer)==null?void 0:R.call(u,e))},ne=`
  fragment ORDER_ADDRESS_FRAGMENT on OrderAddress {
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
    custom_attributesV2 {
      code
      ... on AttributeValue {
        value
      }
    }
  }
`,te=`
  fragment PRODUCT_FRAGMENT on ProductInterface {
    __typename
    canonical_url
    uid
    name
    sku
    only_x_left_in_stock
    stock_status
    image {
      url
    }
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
`,ae=`
  fragment PRICE_FRAGMENT on OrderItemInterface {
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
`,re=`
  fragment GIFT_CARD_FRAGMENT on GiftCardOrderItem {
    ...PRICE_FRAGMENT
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
`,ie=`
  fragment ORDER_ITEM_FRAGMENT on OrderItemInterface {
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
      ...PRODUCT_FRAGMENT
    }
    ...PRICE_FRAGMENT
  }
`,ce=`
  fragment BUNDLE_ORDER_ITEM_FRAGMENT on BundleOrderItem {
    ...PRICE_FRAGMENT
    bundle_options {
      uid
      label
      values {
        uid
        product_name
      }
    }
  }
`,se=`
  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    grand_total {
      value
      currency
    }
    total_giftcard {
      currency
      value
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
  }
`,ue=`
  fragment ORDER_FRAGMENT on CustomerOrder {
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
          ...ORDER_ITEM_FRAGMENT
          ... on GiftCardOrderItem {
            ...GIFT_CARD_FRAGMENT
            product {
              ...PRODUCT_FRAGMENT
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
      ...ORDER_ADDRESS_FRAGMENT
    }
    billing_address {
      ...ORDER_ADDRESS_FRAGMENT
    }
    items {
      ...ORDER_ITEM_FRAGMENT
      ... on BundleOrderItem {
        ...BUNDLE_ORDER_ITEM_FRAGMENT
      }
      ... on GiftCardOrderItem {
        ...GIFT_CARD_FRAGMENT
        product {
          ...PRODUCT_FRAGMENT
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
  ${ce}
  ${re}
  ${ne}
  ${ie}
  ${se}
  ${ae}
  ${te}
`,le=`
  mutation placeOrder($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      errors {
        code
        message
      }
      orderV2 {
        ...ORDER_FRAGMENT
      }
    }
  }

  ${ue}
`,w={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext"},oe={PLACE_ORDER:"place-order"};function U(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function S(e,n){const t=U();t.push({[e]:null}),t.push({[e]:n})}function _e(e,n){U().push(a=>{const r=a.getState?a.getState():{};a.push({event:e,eventInfo:{...r,...n}})})}function pe(e){const n=X(e),t=Y(e);S(w.SHOPPING_CART_CONTEXT,{...n}),S(w.ORDER_CONTEXT,{...t}),_e(oe.PLACE_ORDER)}function de(e){throw e.every(t=>{var a;return(a=t.extensions)==null?void 0:a.category})?new B(e):new Q(e[0].message)}const Te=async()=>{const e=P.cartId;if(!e)throw new L;const{data:n,errors:t}=await k(le,{variables:{cartId:e}}).catch($);t&&de(t);const a=ee(n.placeOrder.orderV2);return pe(a),q.emit("checkout/order",a),q.emit("cart/reset",void 0),a};export{Te as p};
