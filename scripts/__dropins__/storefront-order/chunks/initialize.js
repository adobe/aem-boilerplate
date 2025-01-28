/*! Copyright 2025 Adobe
All Rights Reserved. */
import{merge as z,Initializer as m}from"@dropins/tools/lib.js";import{events as L}from"@dropins/tools/event-bus.js";import{h as Y}from"./network-error.js";import{PRODUCT_DETAILS_FRAGMENT as Q,PRICE_DETAILS_FRAGMENT as K,GIFT_CARD_DETAILS_FRAGMENT as j,ORDER_ITEM_DETAILS_FRAGMENT as P,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as D,ORDER_SUMMARY_FRAGMENT as V,ADDRESS_FRAGMENT as X,RETURNS_FRAGMENT as H}from"../fragments.js";import{f as J,h as o}from"./fetch-graphql.js";const r=n=>n||0,I=n=>{var i,u,_,l,c,s,E,y,T;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((_=(u=(i=n==null?void 0:n.price_range)==null?void 0:i.maximum_price)==null?void 0:u.regular_price)==null?void 0:_.currency)??"",value:((s=(c=(l=n==null?void 0:n.price_range)==null?void 0:l.maximum_price)==null?void 0:c.regular_price)==null?void 0:s.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((E=n==null?void 0:n.image)==null?void 0:E.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((y=n==null?void 0:n.thumbnail)==null?void 0:y.label)||"",url:((T=n==null?void 0:n.thumbnail)==null?void 0:T.url)||""}}},d=n=>{if(!n||!("selected_options"in n))return;const i={};for(const u of n.selected_options)i[u.label]=u.value;return i},nn=n=>{const i=n==null?void 0:n.map(_=>({uid:_.uid,label:_.label,values:_.values.map(l=>l.product_name).join(", ")})),u={};return i==null||i.forEach(_=>{u[_.label]=_.values}),Object.keys(u).length>0?u:null},un=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(i=>i.title).join(", ")}:null,_n=n=>({quantityCanceled:(n==null?void 0:n.quantity_canceled)??0,quantityInvoiced:(n==null?void 0:n.quantity_invoiced)??0,quantityOrdered:(n==null?void 0:n.quantity_ordered)??0,quantityRefunded:(n==null?void 0:n.quantity_refunded)??0,quantityReturned:(n==null?void 0:n.quantity_returned)??0,quantityShipped:(n==null?void 0:n.quantity_shipped)??0,quantityReturnRequested:(n==null?void 0:n.quantity_return_requested)??0}),ln=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),$=n=>{const{firstName:i,lastName:u,middleName:_}=ln(n);return{firstName:i,lastName:u,middleName:_,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:(n==null?void 0:n.country)??"",countryCode:(n==null?void 0:n.country_code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:(n==null?void 0:n.region)??"",regionId:(n==null?void 0:n.region_id)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},cn=n=>{const i={value:0,currency:"USD"};return{grandTotal:(n==null?void 0:n.grand_total)??i,totalGiftcard:(n==null?void 0:n.total_giftcard)??i,subtotalExclTax:(n==null?void 0:n.subtotal_excl_tax)??i,subtotalInclTax:(n==null?void 0:n.subtotal_incl_tax)??i,taxes:(n==null?void 0:n.taxes)??[],totalTax:(n==null?void 0:n.total_tax)??i,totalShipping:(n==null?void 0:n.total_shipping)??i,discounts:(n==null?void 0:n.discounts)??[]}},w=n=>{const i={value:0,currency:"USD"},u=(n==null?void 0:n.prices)??{};return{price:(u==null?void 0:u.price)??i,priceIncludingTax:(u==null?void 0:u.price_including_tax)??i,originalPrice:(u==null?void 0:u.original_price)??i,originalPriceIncludingTax:(u==null?void 0:u.original_price_including_tax)??i,discounts:(u==null?void 0:u.discounts)??[]}},an=(n,i,u)=>{const _=n==null?void 0:n.price,l=n==null?void 0:n.priceIncludingTax,c=n==null?void 0:n.originalPrice,s=u?c==null?void 0:c.value:l==null?void 0:l.value,E={originalPrice:c,baseOriginalPrice:{value:s,currency:c==null?void 0:c.currency},baseDiscountedPrice:{value:l==null?void 0:l.value,currency:l==null?void 0:l.currency},baseExcludingTax:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency}},y={originalPrice:c,baseOriginalPrice:{value:c==null?void 0:c.value,currency:l==null?void 0:l.currency},baseDiscountedPrice:{value:i==null?void 0:i.value,currency:_==null?void 0:_.currency},baseExcludingTax:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency}},T={singleItemPrice:{value:u?c.value:l.value,currency:l.currency},baseOriginalPrice:{value:s,currency:l.currency},baseDiscountedPrice:{value:l.value,currency:l.currency}};return{includeAndExcludeTax:E,excludeTax:y,includeTax:T}},tn=n=>{var i,u,_,l,c;return{senderName:((i=n.gift_card)==null?void 0:i.sender_name)||"",senderEmail:((u=n.gift_card)==null?void 0:u.sender_email)||"",recipientEmail:((_=n.gift_card)==null?void 0:_.recipient_email)||"",recipientName:((l=n.gift_card)==null?void 0:l.recipient_name)||"",message:((c=n.gift_card)==null?void 0:c.message)||""}},sn=n=>{var i,u,_,l;return{label:((u=(i=n==null?void 0:n.product)==null?void 0:i.thumbnail)==null?void 0:u.label)||"",url:((l=(_=n==null?void 0:n.product)==null?void 0:_.thumbnail)==null?void 0:l.url)||""}},W=n=>{var G,e,F,q,x,f,N,t,A,h,O,S,v,M,p,k,g,b;const{quantityCanceled:i,quantityInvoiced:u,quantityOrdered:_,quantityRefunded:l,quantityReturned:c,quantityShipped:s,quantityReturnRequested:E}=_n(n),y=w(n),T=((G=n==null?void 0:n.prices)==null?void 0:G.original_price.value)*(n==null?void 0:n.quantity_ordered)>((e=n==null?void 0:n.prices)==null?void 0:e.price.value)*(n==null?void 0:n.quantity_ordered),a=r(n==null?void 0:n.quantity_ordered),R={value:((F=n==null?void 0:n.product_sale_price)==null?void 0:F.value)||0,currency:(q=n==null?void 0:n.product_sale_price)==null?void 0:q.currency};return{selectedOptions:(n==null?void 0:n.selected_options)??[],productSalePrice:n==null?void 0:n.product_sale_price,status:(n==null?void 0:n.status)??"",type:n==null?void 0:n.__typename,eligibleForReturn:(n==null?void 0:n.eligible_for_return)??!1,productSku:(n==null?void 0:n.product_sku)??"",productName:(n==null?void 0:n.product_name)??"",productUrlKey:(n==null?void 0:n.product_url_key)??"",quantityCanceled:i,quantityInvoiced:u,quantityOrdered:_,quantityRefunded:l,quantityReturned:c,quantityShipped:s,quantityReturnRequested:E,id:n==null?void 0:n.id,discounted:T,total:{value:((x=n==null?void 0:n.product_sale_price)==null?void 0:x.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((f=n==null?void 0:n.product_sale_price)==null?void 0:f.currency)||""},totalInclTax:{value:((N=n==null?void 0:n.product_sale_price)==null?void 0:N.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(t=n==null?void 0:n.product_sale_price)==null?void 0:t.currency},price:R,prices:w(n),itemPrices:y,taxCalculations:an(y,R,T),priceInclTax:{value:((A=n==null?void 0:n.product_sale_price)==null?void 0:A.value)??0,currency:(h=n==null?void 0:n.product_sale_price)==null?void 0:h.currency},totalQuantity:a,regularPrice:{value:(M=(v=(S=(O=n==null?void 0:n.product)==null?void 0:O.price_range)==null?void 0:S.maximum_price)==null?void 0:v.regular_price)==null?void 0:M.value,currency:(b=(g=(k=(p=n==null?void 0:n.product)==null?void 0:p.price_range)==null?void 0:k.maximum_price)==null?void 0:g.regular_price)==null?void 0:b.currency},product:I(n==null?void 0:n.product),thumbnail:sn(n),giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?tn(n):void 0,configurableOptions:d(n),bundleOptions:n.__typename==="BundleOrderItem"?nn(n.bundle_options):null,downloadableLinks:n.__typename==="DownloadableOrderItem"?un(n==null?void 0:n.downloadable_links):null}},U=n=>n==null?void 0:n.filter(i=>i.__typename).map(i=>W(i)),Rn=n=>({token:(n==null?void 0:n.token)??"",email:(n==null?void 0:n.email)??"",status:(n==null?void 0:n.status)??"",number:(n==null?void 0:n.number)??"",id:(n==null?void 0:n.id)??"",carrier:n.carrier??"",coupons:(n==null?void 0:n.applied_coupons)??[],orderDate:(n==null?void 0:n.order_date)??"",isVirtual:(n==null?void 0:n.is_virtual)??!1,availableActions:(n==null?void 0:n.available_actions)??[],orderStatusChangeDate:(n==null?void 0:n.order_status_change_date)??"",shippingMethod:(n==null?void 0:n.shipping_method)??""}),B=(n,i)=>{var t,A,h,O,S,v,M,p,k;const u=Rn(n),_=$(n==null?void 0:n.billing_address),l=$(n==null?void 0:n.shipping_address),c=(t=n.shipments)==null?void 0:t.map(g=>({...g,items:g.items.map(b=>({id:b.id,productName:b.product_name,productSku:b.product_sku,quantityShipped:b.quantity_shipped,orderItem:W(b.order_item)}))})),s=U(n.items),E=((A=En(n==null?void 0:n.returns))==null?void 0:A.ordersReturn)??[],y=i?E.filter(g=>g.returnNumber===i):E,T=U(n.items_eligible_for_return),a=cn(n==null?void 0:n.total),R=(h=n==null?void 0:n.payment_methods)==null?void 0:h[0],G=n==null?void 0:n.shipping_method,e=s==null?void 0:s.reduce((g,b)=>g+(b==null?void 0:b.totalQuantity),0),F={amount:((O=a==null?void 0:a.totalShipping)==null?void 0:O.value)??0,currency:((S=a==null?void 0:a.totalShipping)==null?void 0:S.currency)||"",code:(u==null?void 0:u.shippingMethod)??""},q=[{code:(R==null?void 0:R.type)??"",name:(R==null?void 0:R.name)??""}],x=a==null?void 0:a.subtotalExclTax,f=a==null?void 0:a.subtotalInclTax,N={...u,...a,subtotalExclTax:x,subtotalInclTax:f,billingAddress:_,shippingAddress:l,shipments:c,items:s,returns:y,itemsEligibleForReturn:T,totalQuantity:e,shippingMethod:G,shipping:F,payments:q};return z(N,(k=(p=(M=(v=C==null?void 0:C.getConfig())==null?void 0:v.models)==null?void 0:M.OrderDataModel)==null?void 0:p.transformer)==null?void 0:k.call(p,n))},yn=(n,i,u)=>{var _,l,c,s,E,y,T;if((s=(c=(l=(_=i==null?void 0:i.data)==null?void 0:_.customer)==null?void 0:l.orders)==null?void 0:c.items)!=null&&s.length&&n==="orderData"){const a=(T=(y=(E=i==null?void 0:i.data)==null?void 0:E.customer)==null?void 0:y.orders)==null?void 0:T.items[0];return B(a,u)}return null},En=n=>{var c,s,E,y,T;if(!((c=n==null?void 0:n.items)!=null&&c.length))return null;const i=n==null?void 0:n.items,u=n==null?void 0:n.page_info,l={ordersReturn:[...i].sort((a,R)=>+R.number-+a.number).map(a=>{var f,N;const{order:R,status:G,number:e,created_at:F}=a,q=((N=(f=a==null?void 0:a.shipping)==null?void 0:f.tracking)==null?void 0:N.map(t=>{const{status:A,carrier:h,tracking_number:O}=t;return{status:A,carrier:h,trackingNumber:O}}))??[],x=a.items.map(t=>{var p;const A=t==null?void 0:t.quantity,h=t==null?void 0:t.status,O=t==null?void 0:t.request_quantity,S=t==null?void 0:t.uid,v=t==null?void 0:t.order_item,M=((p=U([v]))==null?void 0:p.reduce((k,g)=>g,{}))??{};return{uid:S,quantity:A,status:h,requestQuantity:O,...M}});return{createdReturnAt:F,returnStatus:G,token:R==null?void 0:R.token,orderNumber:R==null?void 0:R.number,returnNumber:e,items:x,tracking:q}}),...u?{pageInfo:{pageSize:u.page_size,totalPages:u.total_pages,currentPage:u.current_page}}:{}};return z(l,(T=(y=(E=(s=C==null?void 0:C.getConfig())==null?void 0:s.models)==null?void 0:E.CustomerOrdersReturnModel)==null?void 0:y.transformer)==null?void 0:T.call(y,{...i,...u}))},Gn=(n,i)=>{var _,l;if(!((_=n==null?void 0:n.data)!=null&&_.guestOrder))return null;const u=(l=n==null?void 0:n.data)==null?void 0:l.guestOrder;return B(u,i)},Tn=(n,i)=>{var _,l;if(!((_=n==null?void 0:n.data)!=null&&_.guestOrderByToken))return null;const u=(l=n==null?void 0:n.data)==null?void 0:l.guestOrderByToken;return B(u,i)},bn=`
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
  ${Q}
  ${K}
  ${j}
  ${P}
  ${D}
  ${V}
  ${X}
  ${H}
`,gn=async({orderId:n,returnRef:i,queryType:u,returnsPageSize:_=50})=>await J(bn,{method:"GET",cache:"force-cache",variables:{orderNumber:n,pageSize:_}}).then(l=>yn(u??"orderData",l,i)).catch(Y),pn=`
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
  ${Q}
  ${K}
  ${j}
  ${P}
  ${D}
  ${V}
  ${X}
  ${H}
`,An=async(n,i)=>await J(pn,{method:"GET",cache:"no-cache",variables:{token:n}}).then(u=>{var _;return(_=u.errors)!=null&&_.length&&u.errors[0].message==="Please login to view the order."?o(u.errors):Tn(u,i)}).catch(Y),hn="orderData",On=async n=>{var s;const i=typeof(n==null?void 0:n.orderRef)=="string"?n==null?void 0:n.orderRef:"",u=typeof(n==null?void 0:n.returnRef)=="string"?n==null?void 0:n.returnRef:"",_=i&&typeof(n==null?void 0:n.orderRef)=="string"&&((s=n==null?void 0:n.orderRef)==null?void 0:s.length)>20,l=(n==null?void 0:n.orderData)??null;if(l){L.emit("order/data",{...l,returnNumber:u});return}if(!i)return;const c=_?await An(i,u):await gn({orderId:i,returnRef:u,queryType:hn});c?L.emit("order/data",{...c,returnNumber:u}):L.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},Z=new m({init:async n=>{const i={};Z.config.setConfig({...i,...n}),On(n??{}).catch(console.error)},listeners:()=>[]}),C=Z.config;export{B as a,Gn as b,An as c,C as d,gn as g,Z as i,En as t};
