/*! Copyright 2025 Adobe
All Rights Reserved. */
import{merge as z,Initializer as o}from"@dropins/tools/lib.js";import{events as U}from"@dropins/tools/event-bus.js";import{h as Y}from"./network-error.js";import{PRODUCT_DETAILS_FRAGMENT as Q,PRICE_DETAILS_FRAGMENT as K,GIFT_CARD_DETAILS_FRAGMENT as j,ORDER_ITEM_DETAILS_FRAGMENT as V,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as X,ORDER_SUMMARY_FRAGMENT as H,ADDRESS_FRAGMENT as J,RETURNS_FRAGMENT as P,ORDER_ITEM_FRAGMENT as W}from"../fragments.js";import{f as Z,h as r}from"./fetch-graphql.js";const I=n=>n||0,d=n=>{var i,u,_,c,l,t,E,R,g;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((_=(u=(i=n==null?void 0:n.price_range)==null?void 0:i.maximum_price)==null?void 0:u.regular_price)==null?void 0:_.currency)??"",value:((t=(l=(c=n==null?void 0:n.price_range)==null?void 0:c.maximum_price)==null?void 0:l.regular_price)==null?void 0:t.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((E=n==null?void 0:n.image)==null?void 0:E.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((R=n==null?void 0:n.thumbnail)==null?void 0:R.label)||"",url:((g=n==null?void 0:n.thumbnail)==null?void 0:g.url)||""}}},nn=n=>{if(!n||!("selected_options"in n))return;const i={};for(const u of n.selected_options)i[u.label]=u.value;return i},un=n=>{const i=n==null?void 0:n.map(_=>({uid:_.uid,label:_.label,values:_.values.map(c=>c.product_name).join(", ")})),u={};return i==null||i.forEach(_=>{u[_.label]=_.values}),Object.keys(u).length>0?u:null},_n=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(i=>i.title).join(", ")}:null,cn=n=>({quantityCanceled:(n==null?void 0:n.quantity_canceled)??0,quantityInvoiced:(n==null?void 0:n.quantity_invoiced)??0,quantityOrdered:(n==null?void 0:n.quantity_ordered)??0,quantityRefunded:(n==null?void 0:n.quantity_refunded)??0,quantityReturned:(n==null?void 0:n.quantity_returned)??0,quantityShipped:(n==null?void 0:n.quantity_shipped)??0,quantityReturnRequested:(n==null?void 0:n.quantity_return_requested)??0}),ln=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),L=n=>{const{firstName:i,lastName:u,middleName:_}=ln(n);return{firstName:i,lastName:u,middleName:_,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:(n==null?void 0:n.country)??"",countryCode:(n==null?void 0:n.country_code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:(n==null?void 0:n.region)??"",regionId:(n==null?void 0:n.region_id)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},an=n=>{const i={value:0,currency:"USD"};return{grandTotal:(n==null?void 0:n.grand_total)??i,totalGiftcard:(n==null?void 0:n.total_giftcard)??i,subtotalExclTax:(n==null?void 0:n.subtotal_excl_tax)??i,subtotalInclTax:(n==null?void 0:n.subtotal_incl_tax)??i,taxes:(n==null?void 0:n.taxes)??[],totalTax:(n==null?void 0:n.total_tax)??i,totalShipping:(n==null?void 0:n.total_shipping)??i,discounts:(n==null?void 0:n.discounts)??[]}},w=n=>{const i={value:0,currency:"USD"},u=(n==null?void 0:n.prices)??{};return{price:(u==null?void 0:u.price)??i,priceIncludingTax:(u==null?void 0:u.price_including_tax)??i,originalPrice:(u==null?void 0:u.original_price)??i,originalPriceIncludingTax:(u==null?void 0:u.original_price_including_tax)??i,discounts:(u==null?void 0:u.discounts)??[]}},sn=(n,i,u)=>{const _=n==null?void 0:n.price,c=n==null?void 0:n.priceIncludingTax,l=n==null?void 0:n.originalPrice,t=u?l==null?void 0:l.value:c==null?void 0:c.value,E={originalPrice:l,baseOriginalPrice:{value:t,currency:l==null?void 0:l.currency},baseDiscountedPrice:{value:c==null?void 0:c.value,currency:c==null?void 0:c.currency},baseExcludingTax:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency}},R={originalPrice:l,baseOriginalPrice:{value:l==null?void 0:l.value,currency:c==null?void 0:c.currency},baseDiscountedPrice:{value:i==null?void 0:i.value,currency:_==null?void 0:_.currency},baseExcludingTax:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency}},g={singleItemPrice:{value:u?l.value:c.value,currency:c.currency},baseOriginalPrice:{value:t,currency:c.currency},baseDiscountedPrice:{value:c.value,currency:c.currency}};return{includeAndExcludeTax:E,excludeTax:R,includeTax:g}},tn=n=>{var i,u,_,c,l;return{senderName:((i=n.gift_card)==null?void 0:i.sender_name)||"",senderEmail:((u=n.gift_card)==null?void 0:u.sender_email)||"",recipientEmail:((_=n.gift_card)==null?void 0:_.recipient_email)||"",recipientName:((c=n.gift_card)==null?void 0:c.recipient_name)||"",message:((l=n.gift_card)==null?void 0:l.message)||""}},yn=n=>{var i,u,_,c;return{label:((u=(i=n==null?void 0:n.product)==null?void 0:i.thumbnail)==null?void 0:u.label)||"",url:((c=(_=n==null?void 0:n.product)==null?void 0:_.thumbnail)==null?void 0:c.url)||""}},D=n=>{var q,x,G,k,F,v,A,s,h,f,O,N,S,M,p,C,b,T;const{quantityCanceled:i,quantityInvoiced:u,quantityOrdered:_,quantityRefunded:c,quantityReturned:l,quantityShipped:t,quantityReturnRequested:E}=cn(n),R=w(n),g=((q=n==null?void 0:n.prices)==null?void 0:q.original_price.value)*(n==null?void 0:n.quantity_ordered)>((x=n==null?void 0:n.prices)==null?void 0:x.price.value)*(n==null?void 0:n.quantity_ordered),a=I(n==null?void 0:n.quantity_ordered),y={value:((G=n==null?void 0:n.product_sale_price)==null?void 0:G.value)||0,currency:(k=n==null?void 0:n.product_sale_price)==null?void 0:k.currency};return{selectedOptions:(n==null?void 0:n.selected_options)??[],productSalePrice:n==null?void 0:n.product_sale_price,status:(n==null?void 0:n.status)??"",type:n==null?void 0:n.__typename,eligibleForReturn:(n==null?void 0:n.eligible_for_return)??!1,productSku:(n==null?void 0:n.product_sku)??"",productName:(n==null?void 0:n.product_name)??"",productUrlKey:(n==null?void 0:n.product_url_key)??"",quantityCanceled:i,quantityInvoiced:u,quantityOrdered:_,quantityRefunded:c,quantityReturned:l,quantityShipped:t,quantityReturnRequested:E,id:n==null?void 0:n.id,discounted:g,total:{value:((F=n==null?void 0:n.product_sale_price)==null?void 0:F.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((v=n==null?void 0:n.product_sale_price)==null?void 0:v.currency)||""},totalInclTax:{value:((A=n==null?void 0:n.product_sale_price)==null?void 0:A.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(s=n==null?void 0:n.product_sale_price)==null?void 0:s.currency},price:y,prices:w(n),itemPrices:R,taxCalculations:sn(R,y,g),priceInclTax:{value:((h=n==null?void 0:n.product_sale_price)==null?void 0:h.value)??0,currency:(f=n==null?void 0:n.product_sale_price)==null?void 0:f.currency},totalQuantity:a,regularPrice:{value:(M=(S=(N=(O=n==null?void 0:n.product)==null?void 0:O.price_range)==null?void 0:N.maximum_price)==null?void 0:S.regular_price)==null?void 0:M.value,currency:(T=(b=(C=(p=n==null?void 0:n.product)==null?void 0:p.price_range)==null?void 0:C.maximum_price)==null?void 0:b.regular_price)==null?void 0:T.currency},product:d(n==null?void 0:n.product),thumbnail:yn(n),giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?tn(n):void 0,configurableOptions:nn(n),bundleOptions:n.__typename==="BundleOrderItem"?un(n.bundle_options):null,downloadableLinks:n.__typename==="DownloadableOrderItem"?_n(n==null?void 0:n.downloadable_links):null}},e=n=>n==null?void 0:n.filter(i=>i.__typename).map(i=>D(i)),Rn=n=>({token:(n==null?void 0:n.token)??"",email:(n==null?void 0:n.email)??"",status:(n==null?void 0:n.status)??"",number:(n==null?void 0:n.number)??"",id:(n==null?void 0:n.id)??"",carrier:n.carrier??"",coupons:(n==null?void 0:n.applied_coupons)??[],orderDate:(n==null?void 0:n.order_date)??"",isVirtual:(n==null?void 0:n.is_virtual)??!1,availableActions:(n==null?void 0:n.available_actions)??[],orderStatusChangeDate:(n==null?void 0:n.order_status_change_date)??"",shippingMethod:(n==null?void 0:n.shipping_method)??""}),B=(n,i)=>{var s,h,f,O,N,S,M,p,C;const u=Rn(n),_=L(n==null?void 0:n.billing_address),c=L(n==null?void 0:n.shipping_address),l=(s=n.shipments)==null?void 0:s.map(b=>({...b,items:b.items.map(T=>({id:T.id,productName:T.product_name,productSku:T.product_sku,quantityShipped:T.quantity_shipped,orderItem:D(T.order_item)}))})),t=e(n.items),E=((h=gn(n==null?void 0:n.returns))==null?void 0:h.ordersReturn)??[],R=i?E.filter(b=>b.returnNumber===i):E,g=e(n.items_eligible_for_return),a=an(n==null?void 0:n.total),y=(f=n==null?void 0:n.payment_methods)==null?void 0:f[0],q=n==null?void 0:n.shipping_method,x=t==null?void 0:t.reduce((b,T)=>b+(T==null?void 0:T.totalQuantity),0),G={amount:((O=a==null?void 0:a.totalShipping)==null?void 0:O.value)??0,currency:((N=a==null?void 0:a.totalShipping)==null?void 0:N.currency)||"",code:(u==null?void 0:u.shippingMethod)??""},k=[{code:(y==null?void 0:y.type)??"",name:(y==null?void 0:y.name)??""}],F=a==null?void 0:a.subtotalExclTax,v=a==null?void 0:a.subtotalInclTax,A={...u,...a,subtotalExclTax:F,subtotalInclTax:v,billingAddress:_,shippingAddress:c,shipments:l,items:t,returns:R,itemsEligibleForReturn:g,totalQuantity:x,shippingMethod:q,shipping:G,payments:k};return z(A,(C=(p=(M=(S=$==null?void 0:$.getConfig())==null?void 0:S.models)==null?void 0:M.OrderDataModel)==null?void 0:p.transformer)==null?void 0:C.call(p,n))},En=(n,i,u)=>{var _,c,l,t,E,R,g;if((t=(l=(c=(_=i==null?void 0:i.data)==null?void 0:_.customer)==null?void 0:c.orders)==null?void 0:l.items)!=null&&t.length&&n==="orderData"){const a=(g=(R=(E=i==null?void 0:i.data)==null?void 0:E.customer)==null?void 0:R.orders)==null?void 0:g.items[0];return B(a,u)}return null},gn=n=>{var l,t,E,R,g;if(!((l=n==null?void 0:n.items)!=null&&l.length))return null;const i=n==null?void 0:n.items,u=n==null?void 0:n.page_info,c={ordersReturn:[...i].sort((a,y)=>+y.number-+a.number).map(a=>{var v,A;const{order:y,status:q,number:x,created_at:G}=a,k=((A=(v=a==null?void 0:a.shipping)==null?void 0:v.tracking)==null?void 0:A.map(s=>{const{status:h,carrier:f,tracking_number:O}=s;return{status:h,carrier:f,trackingNumber:O}}))??[],F=a.items.map(s=>{var p;const h=s==null?void 0:s.quantity,f=s==null?void 0:s.status,O=s==null?void 0:s.request_quantity,N=s==null?void 0:s.uid,S=s==null?void 0:s.order_item,M=((p=e([S]))==null?void 0:p.reduce((C,b)=>b,{}))??{};return{uid:N,quantity:h,status:f,requestQuantity:O,...M}});return{createdReturnAt:G,returnStatus:q,token:y==null?void 0:y.token,orderNumber:y==null?void 0:y.number,returnNumber:x,items:F,tracking:k}}),...u?{pageInfo:{pageSize:u.page_size,totalPages:u.total_pages,currentPage:u.current_page}}:{}};return z(c,(g=(R=(E=(t=$==null?void 0:$.getConfig())==null?void 0:t.models)==null?void 0:E.CustomerOrdersReturnModel)==null?void 0:R.transformer)==null?void 0:g.call(R,{...i,...u}))},xn=(n,i)=>{var _,c;if(!((_=n==null?void 0:n.data)!=null&&_.guestOrder))return null;const u=(c=n==null?void 0:n.data)==null?void 0:c.guestOrder;return B(u,i)},Tn=(n,i)=>{var _,c;if(!((_=n==null?void 0:n.data)!=null&&_.guestOrderByToken))return null;const u=(c=n==null?void 0:n.data)==null?void 0:c.guestOrderByToken;return B(u,i)},bn=`
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
            ...ORDER_ITEM_FRAGMENT
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
            ...ORDER_ITEM_FRAGMENT
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
  ${V}
  ${X}
  ${H}
  ${J}
  ${P}
  ${W}
`,pn=async({orderId:n,returnRef:i,queryType:u,returnsPageSize:_=50})=>await Z(bn,{method:"GET",cache:"force-cache",variables:{orderNumber:n,pageSize:_}}).then(c=>En(u??"orderData",c,i)).catch(Y),hn=`
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
        ...ORDER_ITEM_FRAGMENT
      }
      total {
        ...ORDER_SUMMARY_FRAGMENT
      }
    }
  }
  ${Q}
  ${K}
  ${j}
  ${V}
  ${X}
  ${H}
  ${J}
  ${P}
  ${W}
`,fn=async(n,i)=>await Z(hn,{method:"GET",cache:"no-cache",variables:{token:n}}).then(u=>{var _;return(_=u.errors)!=null&&_.length&&u.errors[0].message==="Please login to view the order."?r(u.errors):Tn(u,i)}).catch(Y),On="orderData",vn=async n=>{var t;const i=typeof(n==null?void 0:n.orderRef)=="string"?n==null?void 0:n.orderRef:"",u=typeof(n==null?void 0:n.returnRef)=="string"?n==null?void 0:n.returnRef:"",_=i&&typeof(n==null?void 0:n.orderRef)=="string"&&((t=n==null?void 0:n.orderRef)==null?void 0:t.length)>20,c=(n==null?void 0:n.orderData)??null;if(c){U.emit("order/data",{...c,returnNumber:u});return}if(!i)return;const l=_?await fn(i,u):await pn({orderId:i,returnRef:u,queryType:On});l?U.emit("order/data",{...l,returnNumber:u}):U.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},m=new o({init:async n=>{const i={};m.config.setConfig({...i,...n}),vn(n??{}).catch(console.error)},listeners:()=>[]}),$=m.config;export{B as a,xn as b,fn as c,$ as d,pn as g,m as i,gn as t};
