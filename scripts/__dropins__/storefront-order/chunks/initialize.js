/*! Copyright 2025 Adobe
All Rights Reserved. */
import{merge as j,Initializer as gn}from"@dropins/tools/lib.js";import{events as B}from"@dropins/tools/event-bus.js";import{h as V}from"./network-error.js";import{PRODUCT_DETAILS_FRAGMENT as X,PRICE_DETAILS_FRAGMENT as H,GIFT_CARD_DETAILS_FRAGMENT as J,ORDER_ITEM_DETAILS_FRAGMENT as Z,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as m,ORDER_SUMMARY_FRAGMENT as D,ADDRESS_FRAGMENT as r,RETURNS_FRAGMENT as o,ORDER_ITEM_FRAGMENT as I,GIFT_WRAPPING_FRAGMENT as d,GIFT_MESSAGE_FRAGMENT as nn,APPLIED_GIFT_CARDS_FRAGMENT as un}from"../fragments.js";import{f as _n,h as yn}from"./fetch-graphql.js";const Rn=n=>n||0,En=n=>{var i,u,_,c,l,p,y,g,E;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((_=(u=(i=n==null?void 0:n.price_range)==null?void 0:i.maximum_price)==null?void 0:u.regular_price)==null?void 0:_.currency)??"",value:((p=(l=(c=n==null?void 0:n.price_range)==null?void 0:c.maximum_price)==null?void 0:l.regular_price)==null?void 0:p.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((y=n==null?void 0:n.image)==null?void 0:y.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((g=n==null?void 0:n.thumbnail)==null?void 0:g.label)||"",url:((E=n==null?void 0:n.thumbnail)==null?void 0:E.url)||""}}},tn=n=>{if(!n||!("selected_options"in n))return;const i={};for(const u of n.selected_options)i[u.label]=u.value;return i},Tn=n=>{const i=n==null?void 0:n.map(_=>({uid:_.uid,label:_.label,values:_.values.map(c=>c.product_name).join(", ")})),u={};return i==null||i.forEach(_=>{u[_.label]=_.values}),Object.keys(u).length>0?u:null},en=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(i=>i.title).join(", ")}:null,fn=n=>({quantityCanceled:(n==null?void 0:n.quantity_canceled)??0,quantityInvoiced:(n==null?void 0:n.quantity_invoiced)??0,quantityOrdered:(n==null?void 0:n.quantity_ordered)??0,quantityRefunded:(n==null?void 0:n.quantity_refunded)??0,quantityReturned:(n==null?void 0:n.quantity_returned)??0,quantityShipped:(n==null?void 0:n.quantity_shipped)??0,quantityReturnRequested:(n==null?void 0:n.quantity_return_requested)??0}),an=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),Q=n=>{const{firstName:i,lastName:u,middleName:_}=an(n);return{firstName:i,lastName:u,middleName:_,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:(n==null?void 0:n.country)??"",countryCode:(n==null?void 0:n.country_code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:(n==null?void 0:n.region)??"",regionId:(n==null?void 0:n.region_id)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},bn=n=>{const i={value:0,currency:"USD"};return{grandTotal:(n==null?void 0:n.grand_total)??i,totalGiftCard:(n==null?void 0:n.total_giftcard)??i,subtotalExclTax:(n==null?void 0:n.subtotal_excl_tax)??i,subtotalInclTax:(n==null?void 0:n.subtotal_incl_tax)??i,taxes:(n==null?void 0:n.taxes)??[],totalTax:(n==null?void 0:n.total_tax)??i,totalShipping:(n==null?void 0:n.total_shipping)??i,discounts:(n==null?void 0:n.discounts)??[]}},K=n=>{const i={value:0,currency:"USD"},u=(n==null?void 0:n.prices)??{};return{price:(u==null?void 0:u.price)??i,priceIncludingTax:(u==null?void 0:u.price_including_tax)??i,originalPrice:(u==null?void 0:u.original_price)??i,originalPriceIncludingTax:(u==null?void 0:u.original_price_including_tax)??i,discounts:(u==null?void 0:u.discounts)??[]}},An=(n,i,u)=>{const _=n==null?void 0:n.price,c=n==null?void 0:n.priceIncludingTax,l=n==null?void 0:n.originalPrice,p=u?l==null?void 0:l.value:c==null?void 0:c.value,y={originalPrice:l,baseOriginalPrice:{value:p,currency:l==null?void 0:l.currency},baseDiscountedPrice:{value:c==null?void 0:c.value,currency:c==null?void 0:c.currency},baseExcludingTax:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency}},g={originalPrice:l,baseOriginalPrice:{value:l==null?void 0:l.value,currency:c==null?void 0:c.currency},baseDiscountedPrice:{value:i==null?void 0:i.value,currency:_==null?void 0:_.currency},baseExcludingTax:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency}},E={singleItemPrice:{value:u?l.value:c.value,currency:c.currency},baseOriginalPrice:{value:p,currency:c.currency},baseDiscountedPrice:{value:c.value,currency:c.currency}};return{includeAndExcludeTax:y,excludeTax:g,includeTax:E}},vn=n=>{var i,u,_,c,l;return{senderName:((i=n.gift_card)==null?void 0:i.sender_name)||"",senderEmail:((u=n.gift_card)==null?void 0:u.sender_email)||"",recipientEmail:((_=n.gift_card)==null?void 0:_.recipient_email)||"",recipientName:((c=n.gift_card)==null?void 0:c.recipient_name)||"",message:((l=n.gift_card)==null?void 0:l.message)||""}},hn=n=>{var i,u,_,c;return{label:((u=(i=n==null?void 0:n.product)==null?void 0:i.thumbnail)==null?void 0:u.label)||"",url:((c=(_=n==null?void 0:n.product)==null?void 0:_.thumbnail)==null?void 0:c.url)||""}};function Nn(n){return{currency:(n==null?void 0:n.currency)??"USD",value:(n==null?void 0:n.value)??0}}function cn(n){var i,u,_;return{senderName:((i=n==null?void 0:n.gift_message)==null?void 0:i.from)??"",recipientName:((u=n==null?void 0:n.gift_message)==null?void 0:u.to)??"",message:((_=n==null?void 0:n.gift_message)==null?void 0:_.message)??""}}function ln(n){var i,u,_,c,l,p,y,g,E,t,s;return{design:((i=n==null?void 0:n.gift_wrapping)==null?void 0:i.design)??"",uid:(u=n==null?void 0:n.gift_wrapping)==null?void 0:u.uid,selected:!!((_=n==null?void 0:n.gift_wrapping)!=null&&_.uid),image:{url:((l=(c=n==null?void 0:n.gift_wrapping)==null?void 0:c.image)==null?void 0:l.url)??"",label:((y=(p=n==null?void 0:n.gift_wrapping)==null?void 0:p.image)==null?void 0:y.label)??""},price:{currency:((E=(g=n==null?void 0:n.gift_wrapping)==null?void 0:g.price)==null?void 0:E.currency)??"USD",value:((s=(t=n==null?void 0:n.gift_wrapping)==null?void 0:t.price)==null?void 0:s.value)??0}}}const sn=n=>{var T,e,f,F,x,N,S,R,b,A,v,q,O,G,h,k,M,U,C;const{quantityCanceled:i,quantityInvoiced:u,quantityOrdered:_,quantityRefunded:c,quantityReturned:l,quantityShipped:p,quantityReturnRequested:y}=fn(n),g=K(n),E=((T=n==null?void 0:n.prices)==null?void 0:T.original_price.value)*(n==null?void 0:n.quantity_ordered)>((e=n==null?void 0:n.prices)==null?void 0:e.price.value)*(n==null?void 0:n.quantity_ordered),t=Rn(n==null?void 0:n.quantity_ordered),s={value:((f=n==null?void 0:n.product_sale_price)==null?void 0:f.value)||0,currency:(F=n==null?void 0:n.product_sale_price)==null?void 0:F.currency};return{giftMessage:cn(n),giftWrappingPrice:Nn((x=n==null?void 0:n.product)==null?void 0:x.gift_wrapping_price),productGiftWrapping:[ln(n)],selectedOptions:(n==null?void 0:n.selected_options)??[],productSalePrice:n==null?void 0:n.product_sale_price,status:(n==null?void 0:n.status)??"",type:n==null?void 0:n.__typename,eligibleForReturn:(n==null?void 0:n.eligible_for_return)??!1,productSku:(n==null?void 0:n.product_sku)??"",productName:(n==null?void 0:n.product_name)??"",productUrlKey:(n==null?void 0:n.product_url_key)??"",quantityCanceled:i,quantityInvoiced:u,quantityOrdered:_,quantityRefunded:c,quantityReturned:l,quantityShipped:p,quantityReturnRequested:y,id:n==null?void 0:n.id,discounted:E,total:{value:((N=n==null?void 0:n.product_sale_price)==null?void 0:N.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((S=n==null?void 0:n.product_sale_price)==null?void 0:S.currency)||""},totalInclTax:{value:((R=n==null?void 0:n.product_sale_price)==null?void 0:R.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(b=n==null?void 0:n.product_sale_price)==null?void 0:b.currency},price:s,prices:K(n),itemPrices:g,taxCalculations:An(g,s,E),priceInclTax:{value:((A=n==null?void 0:n.product_sale_price)==null?void 0:A.value)??0,currency:(v=n==null?void 0:n.product_sale_price)==null?void 0:v.currency},totalQuantity:t,regularPrice:{value:(h=(G=(O=(q=n==null?void 0:n.product)==null?void 0:q.price_range)==null?void 0:O.maximum_price)==null?void 0:G.regular_price)==null?void 0:h.value,currency:(C=(U=(M=(k=n==null?void 0:n.product)==null?void 0:k.price_range)==null?void 0:M.maximum_price)==null?void 0:U.regular_price)==null?void 0:C.currency},product:En(n==null?void 0:n.product),thumbnail:hn(n),giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?vn(n):void 0,configurableOptions:tn(n),bundleOptions:n.__typename==="BundleOrderItem"?Tn(n.bundle_options):null,downloadableLinks:n.__typename==="DownloadableOrderItem"?en(n==null?void 0:n.downloadable_links):null}},P=n=>n==null?void 0:n.filter(i=>i.__typename).map(i=>sn(i)),Sn=n=>{var i,u,_,c,l;return{token:(n==null?void 0:n.token)??"",email:(n==null?void 0:n.email)??"",status:(n==null?void 0:n.status)??"",number:(n==null?void 0:n.number)??"",id:(n==null?void 0:n.id)??"",carrier:n.carrier??"",coupons:(n==null?void 0:n.applied_coupons)??[],orderDate:(n==null?void 0:n.order_date)??"",isVirtual:(n==null?void 0:n.is_virtual)??!1,availableActions:(n==null?void 0:n.available_actions)??[],orderStatusChangeDate:(n==null?void 0:n.order_status_change_date)??"",shippingMethod:(n==null?void 0:n.shipping_method)??"",giftWrappingOrder:{price:{value:((u=(i=n==null?void 0:n.gift_wrapping)==null?void 0:i.price)==null?void 0:u.value)??0,currency:((c=(_=n==null?void 0:n.gift_wrapping)==null?void 0:_.price)==null?void 0:c.currency)??"USD"},uid:((l=n==null?void 0:n.gift_wrapping)==null?void 0:l.uid)??""}}},Gn=n=>{var u,_,c,l,p,y,g,E,t,s,T,e,f;const i=(u=n==null?void 0:n.total)==null?void 0:u.gift_options;return{giftWrappingForItems:{value:((_=i==null?void 0:i.gift_wrapping_for_items)==null?void 0:_.value)??0,currency:((c=i==null?void 0:i.gift_wrapping_for_items)==null?void 0:c.currency)??"USD"},giftWrappingForItemsInclTax:{value:((l=i==null?void 0:i.gift_wrapping_for_items_incl_tax)==null?void 0:l.value)??0,currency:((p=i==null?void 0:i.gift_wrapping_for_items_incl_tax)==null?void 0:p.currency)??"USD"},giftWrappingForOrder:{value:((y=i==null?void 0:i.gift_wrapping_for_order)==null?void 0:y.value)??0,currency:((g=i==null?void 0:i.gift_wrapping_for_order)==null?void 0:g.currency)??"USD"},giftWrappingForOrderInclTax:{value:((E=i==null?void 0:i.gift_wrapping_for_order_incl_tax)==null?void 0:E.value)??0,currency:((t=i==null?void 0:i.gift_wrapping_for_order_incl_tax)==null?void 0:t.currency)??"USD"},printedCard:{value:((s=i==null?void 0:i.printed_card)==null?void 0:s.value)??0,currency:((T=i==null?void 0:i.printed_card)==null?void 0:T.currency)??"USD"},printedCardInclTax:{value:((e=i==null?void 0:i.printed_card_incl_tax)==null?void 0:e.value)??0,currency:((f=i==null?void 0:i.printed_card_incl_tax)==null?void 0:f.currency)??"USD"}}},Mn=(n=[])=>n?n==null?void 0:n.map(i=>{var u,_;return{code:(i==null?void 0:i.code)??"",appliedBalance:{value:((u=i.applied_balance)==null?void 0:u.value)??0,currency:((_=i.applied_balance)==null?void 0:_.currency)??"USD"}}}):[],W=(n,i)=>{var G,h,k,M,U,C,z,L,Y;const u=Sn(n),_=Q(n==null?void 0:n.billing_address),c=Q(n==null?void 0:n.shipping_address),l=(G=n.shipments)==null?void 0:G.map(w=>({...w,items:w.items.map(a=>({id:a.id,productName:a.product_name,productSku:a.product_sku,quantityShipped:a.quantity_shipped,orderItem:sn(a.order_item)}))})),p=Mn(n==null?void 0:n.applied_gift_cards),y=P(n.items),g=((h=xn(n==null?void 0:n.returns))==null?void 0:h.ordersReturn)??[],E=i?g.filter(w=>w.returnNumber===i):g,t=P(n.items_eligible_for_return),s=bn(n==null?void 0:n.total),T=(k=n==null?void 0:n.payment_methods)==null?void 0:k[0],e=n==null?void 0:n.shipping_method,f=y==null?void 0:y.reduce((w,a)=>w+(a==null?void 0:a.totalQuantity),0),F={amount:((M=s==null?void 0:s.totalShipping)==null?void 0:M.value)??0,currency:((U=s==null?void 0:s.totalShipping)==null?void 0:U.currency)||"",code:(u==null?void 0:u.shippingMethod)??""},x=[{code:(T==null?void 0:T.type)??"",name:(T==null?void 0:T.name)??""}],N=s==null?void 0:s.subtotalExclTax,S=s==null?void 0:s.subtotalInclTax,R=Gn(n),b=cn(n),A=[ln(n)],v=(n==null?void 0:n.printed_card_included)??!1,q=(n==null?void 0:n.gift_receipt_included)??!1,O={...u,...s,giftMessage:b,cartGiftWrapping:A,printedCardIncluded:v,giftReceiptIncluded:q,appliedGiftCards:p,totalGiftOptions:R,subtotalExclTax:N,subtotalInclTax:S,billingAddress:_,shippingAddress:c,shipments:l,items:y,returns:E,itemsEligibleForReturn:t,totalQuantity:f,shippingMethod:e,shipping:F,payments:x};return j(O,(Y=(L=(z=(C=$==null?void 0:$.getConfig())==null?void 0:C.models)==null?void 0:z.OrderDataModel)==null?void 0:L.transformer)==null?void 0:Y.call(L,n))},Fn=(n,i,u)=>{var _,c,l,p,y,g,E;if((p=(l=(c=(_=i==null?void 0:i.data)==null?void 0:_.customer)==null?void 0:c.orders)==null?void 0:l.items)!=null&&p.length&&n==="orderData"){const t=(E=(g=(y=i==null?void 0:i.data)==null?void 0:y.customer)==null?void 0:g.orders)==null?void 0:E.items[0];return W(t,u)}return null},xn=n=>{var l,p,y,g,E;if(!((l=n==null?void 0:n.items)!=null&&l.length))return null;const i=n==null?void 0:n.items,u=n==null?void 0:n.page_info,c={ordersReturn:[...i].sort((t,s)=>+s.number-+t.number).map(t=>{var N,S;const{order:s,status:T,number:e,created_at:f}=t,F=((S=(N=t==null?void 0:t.shipping)==null?void 0:N.tracking)==null?void 0:S.map(R=>{const{status:b,carrier:A,tracking_number:v}=R;return{status:b,carrier:A,trackingNumber:v}}))??[],x=t.items.map(R=>{var h;const b=R==null?void 0:R.quantity,A=R==null?void 0:R.status,v=R==null?void 0:R.request_quantity,q=R==null?void 0:R.uid,O=R==null?void 0:R.order_item,G=((h=P([O]))==null?void 0:h.reduce((k,M)=>M,{}))??{};return{uid:q,quantity:b,status:A,requestQuantity:v,...G}});return{createdReturnAt:f,returnStatus:T,token:s==null?void 0:s.token,orderNumber:s==null?void 0:s.number,returnNumber:e,items:x,tracking:F}}),...u?{pageInfo:{pageSize:u.page_size,totalPages:u.total_pages,currentPage:u.current_page}}:{}};return j(c,(E=(g=(y=(p=$==null?void 0:$.getConfig())==null?void 0:p.models)==null?void 0:y.CustomerOrdersReturnModel)==null?void 0:g.transformer)==null?void 0:E.call(g,{...i,...u}))},Yn=(n,i)=>{var _,c;if(!((_=n==null?void 0:n.data)!=null&&_.guestOrder))return null;const u=(c=n==null?void 0:n.data)==null?void 0:c.guestOrder;return W(u,i)},qn=(n,i)=>{var _,c;if(!((_=n==null?void 0:n.data)!=null&&_.guestOrderByToken))return null;const u=(c=n==null?void 0:n.data)==null?void 0:c.guestOrderByToken;return W(u,i)},On=`
  query ORDER_BY_NUMBER($orderNumber: String!, $pageSize: Int) {
    customer {
      orders(filter: { number: { eq: $orderNumber } }) {
        items {
          gift_receipt_included
          printed_card_included
          gift_wrapping {
            ...GIFT_WRAPPING_FRAGMENT
          }
          gift_message {
            ...GIFT_MESSAGE_FRAGMENT
          }
          applied_gift_cards {
            ...APPLIED_GIFT_CARDS_FRAGMENT
          }
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
  ${X}
  ${H}
  ${J}
  ${Z}
  ${m}
  ${D}
  ${r}
  ${o}
  ${I}
  ${d}
  ${nn}
  ${un}
`,kn=async({orderId:n,returnRef:i,queryType:u,returnsPageSize:_=50})=>await _n(On,{method:"GET",cache:"force-cache",variables:{orderNumber:n,pageSize:_}}).then(c=>Fn(u??"orderData",c,i)).catch(V),wn=`
  query ORDER_BY_TOKEN($token: String!) {
    guestOrderByToken(input: { token: $token }) {
      printed_card_included
      gift_receipt_included
      gift_wrapping {
        ...GIFT_WRAPPING_FRAGMENT
      }
      gift_message {
        ...GIFT_MESSAGE_FRAGMENT
      }
      applied_gift_cards {
        ...APPLIED_GIFT_CARDS_FRAGMENT
      }
      email
      id
      number
      order_date
      order_status_change_date
      status
      token
      carrier
      shipping_method

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
  ${X}
  ${H}
  ${J}
  ${Z}
  ${m}
  ${D}
  ${r}
  ${o}
  ${I}
  ${d}
  ${nn}
  ${un}
`,$n=async(n,i)=>await _n(wn,{method:"GET",cache:"no-cache",variables:{token:n}}).then(u=>{var _;return(_=u.errors)!=null&&_.length&&u.errors[0].message==="Please login to view the order."?yn(u.errors):qn(u,i)}).catch(V),Un="orderData",Cn=async n=>{var p;const i=typeof(n==null?void 0:n.orderRef)=="string"?n==null?void 0:n.orderRef:"",u=typeof(n==null?void 0:n.returnRef)=="string"?n==null?void 0:n.returnRef:"",_=i&&typeof(n==null?void 0:n.orderRef)=="string"&&((p=n==null?void 0:n.orderRef)==null?void 0:p.length)>20,c=(n==null?void 0:n.orderData)??null;if(c){B.emit("order/data",{...c,returnNumber:u});return}if(!i)return;const l=_?await $n(i,u):await kn({orderId:i,returnRef:u,queryType:Un});l?B.emit("order/data",{...l,returnNumber:u}):B.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},pn=new gn({init:async n=>{const i={};pn.config.setConfig({...i,...n}),Cn(n??{}).catch(console.error)},listeners:()=>[]}),$=pn.config;export{W as a,Yn as b,$n as c,$ as d,kn as g,pn as i,xn as t};
