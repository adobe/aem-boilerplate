/*! Copyright 2026 Adobe
All Rights Reserved. */
import{merge as X,Initializer as yn}from"@dropins/tools/lib.js";import{events as $}from"@dropins/tools/event-bus.js";import{h as H}from"./network-error.js";import{PRODUCT_DETAILS_FRAGMENT as J,PRICE_DETAILS_FRAGMENT as Z,GIFT_CARD_DETAILS_FRAGMENT as m,ORDER_ITEM_DETAILS_FRAGMENT as D,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as r,ORDER_SUMMARY_FRAGMENT as o,ADDRESS_FRAGMENT as I,RETURNS_FRAGMENT as d,ORDER_ITEM_FRAGMENT as nn,GIFT_WRAPPING_FRAGMENT as un,GIFT_MESSAGE_FRAGMENT as cn,APPLIED_GIFT_CARDS_FRAGMENT as _n}from"../fragments.js";import{f as ln,h as tn}from"./fetch-graphql.js";const an=n=>n||0,Rn=n=>{var i,u,c,_,l,p,g,y,a;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((c=(u=(i=n==null?void 0:n.price_range)==null?void 0:i.maximum_price)==null?void 0:u.regular_price)==null?void 0:c.currency)??"",value:((p=(l=(_=n==null?void 0:n.price_range)==null?void 0:_.maximum_price)==null?void 0:l.regular_price)==null?void 0:p.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((g=n==null?void 0:n.image)==null?void 0:g.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((y=n==null?void 0:n.thumbnail)==null?void 0:y.label)||"",url:((a=n==null?void 0:n.thumbnail)==null?void 0:a.url)||""}}},en=n=>{if(!n||!("selected_options"in n))return;const i={};for(const u of n.selected_options)i[u.label]=u.value;return i},fn=n=>{const i=n==null?void 0:n.map(c=>({uid:c.uid,label:c.label,values:c.values.map(_=>_.product_name).join(", ")})),u={};return i==null||i.forEach(c=>{u[c.label]=c.values}),Object.keys(u).length>0?u:null},En=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(i=>i.title).join(", ")}:null,Tn=n=>({quantityCanceled:(n==null?void 0:n.quantity_canceled)??0,quantityInvoiced:(n==null?void 0:n.quantity_invoiced)??0,quantityOrdered:(n==null?void 0:n.quantity_ordered)??0,quantityRefunded:(n==null?void 0:n.quantity_refunded)??0,quantityReturned:(n==null?void 0:n.quantity_returned)??0,quantityShipped:(n==null?void 0:n.quantity_shipped)??0,quantityReturnRequested:(n==null?void 0:n.quantity_return_requested)??0}),bn=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),j=n=>{const{firstName:i,lastName:u,middleName:c}=bn(n);return{firstName:i,lastName:u,middleName:c,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:(n==null?void 0:n.country)??"",countryCode:(n==null?void 0:n.country_code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:(n==null?void 0:n.region)??"",regionId:(n==null?void 0:n.region_id)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},hn=n=>{const i={value:0,currency:"USD"};return{grandTotal:(n==null?void 0:n.grand_total)??i,grandTotalExclTax:(n==null?void 0:n.grand_total_excl_tax)??i,totalGiftCard:(n==null?void 0:n.total_giftcard)??i,subtotalExclTax:(n==null?void 0:n.subtotal_excl_tax)??i,subtotalInclTax:(n==null?void 0:n.subtotal_incl_tax)??i,taxes:(n==null?void 0:n.taxes)??[],totalTax:(n==null?void 0:n.total_tax)??i,totalShipping:(n==null?void 0:n.total_shipping)??i,discounts:(n==null?void 0:n.discounts)??[]}},K=n=>{const i={value:0,currency:"USD"},u=(n==null?void 0:n.prices)??{};return{price:(u==null?void 0:u.price)??i,priceIncludingTax:(u==null?void 0:u.price_including_tax)??i,originalPrice:(u==null?void 0:u.original_price)??i,originalPriceIncludingTax:(u==null?void 0:u.original_price_including_tax)??i,discounts:(u==null?void 0:u.discounts)??[]}},vn=(n,i,u)=>{const c=n==null?void 0:n.price,_=n==null?void 0:n.priceIncludingTax,l=n==null?void 0:n.originalPrice,p=u?l==null?void 0:l.value:_==null?void 0:_.value,g={originalPrice:l,baseOriginalPrice:{value:p,currency:l==null?void 0:l.currency},baseDiscountedPrice:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency},baseExcludingTax:{value:c==null?void 0:c.value,currency:c==null?void 0:c.currency}},y={originalPrice:l,baseOriginalPrice:{value:l==null?void 0:l.value,currency:_==null?void 0:_.currency},baseDiscountedPrice:{value:i==null?void 0:i.value,currency:c==null?void 0:c.currency},baseExcludingTax:{value:c==null?void 0:c.value,currency:c==null?void 0:c.currency}},a={singleItemPrice:{value:u?l.value:_.value,currency:_.currency},baseOriginalPrice:{value:p,currency:_.currency},baseDiscountedPrice:{value:_.value,currency:_.currency}};return{includeAndExcludeTax:g,excludeTax:y,includeTax:a}},An=n=>{var i,u,c,_,l;return{senderName:((i=n.gift_card)==null?void 0:i.sender_name)||"",senderEmail:((u=n.gift_card)==null?void 0:u.sender_email)||"",recipientEmail:((c=n.gift_card)==null?void 0:c.recipient_email)||"",recipientName:((_=n.gift_card)==null?void 0:_.recipient_name)||"",message:((l=n.gift_card)==null?void 0:l.message)||""}},Sn=n=>{var i,u,c,_;return{label:((u=(i=n==null?void 0:n.product)==null?void 0:i.thumbnail)==null?void 0:u.label)||"",url:((_=(c=n==null?void 0:n.product)==null?void 0:c.thumbnail)==null?void 0:_.url)||""}};function Nn(n){return{currency:(n==null?void 0:n.currency)??"USD",value:(n==null?void 0:n.value)??0}}function sn(n){var i,u,c;return{senderName:((i=n==null?void 0:n.gift_message)==null?void 0:i.from)??"",recipientName:((u=n==null?void 0:n.gift_message)==null?void 0:u.to)??"",message:((c=n==null?void 0:n.gift_message)==null?void 0:c.message)??""}}function pn(n){var i,u,c,_,l,p,g,y,a,R,s;return{design:((i=n==null?void 0:n.gift_wrapping)==null?void 0:i.design)??"",uid:(u=n==null?void 0:n.gift_wrapping)==null?void 0:u.uid,selected:!!((c=n==null?void 0:n.gift_wrapping)!=null&&c.uid),image:{url:((l=(_=n==null?void 0:n.gift_wrapping)==null?void 0:_.image)==null?void 0:l.url)??"",label:((g=(p=n==null?void 0:n.gift_wrapping)==null?void 0:p.image)==null?void 0:g.label)??""},price:{currency:((a=(y=n==null?void 0:n.gift_wrapping)==null?void 0:y.price)==null?void 0:a.currency)??"USD",value:((s=(R=n==null?void 0:n.gift_wrapping)==null?void 0:R.price)==null?void 0:s.value)??0}}}const gn=n=>{var e,f,E,F,x,S,N,t,b,h,v,O,q,G,A,w,M,C,L,B;const{quantityCanceled:i,quantityInvoiced:u,quantityOrdered:c,quantityRefunded:_,quantityReturned:l,quantityShipped:p,quantityReturnRequested:g}=Tn(n),y=K(n),a=((e=n==null?void 0:n.prices)==null?void 0:e.original_price.value)*(n==null?void 0:n.quantity_ordered)>((f=n==null?void 0:n.prices)==null?void 0:f.price.value)*(n==null?void 0:n.quantity_ordered),R=an(n==null?void 0:n.quantity_ordered),s={value:((E=n==null?void 0:n.product_sale_price)==null?void 0:E.value)||0,currency:(F=n==null?void 0:n.product_sale_price)==null?void 0:F.currency};return{giftMessage:sn(n),giftWrappingAvailable:((x=n==null?void 0:n.product)==null?void 0:x.gift_wrapping_available)??!1,giftWrappingPrice:Nn((S=n==null?void 0:n.product)==null?void 0:S.gift_wrapping_price),productGiftWrapping:[pn(n)],selectedOptions:(n==null?void 0:n.selected_options)??[],productSalePrice:n==null?void 0:n.product_sale_price,status:(n==null?void 0:n.status)??"",type:n==null?void 0:n.__typename,eligibleForReturn:(n==null?void 0:n.eligible_for_return)??!1,productSku:(n==null?void 0:n.product_sku)??"",productName:(n==null?void 0:n.product_name)??"",productUrlKey:(n==null?void 0:n.product_url_key)??"",quantityCanceled:i,quantityInvoiced:u,quantityOrdered:c,quantityRefunded:_,quantityReturned:l,quantityShipped:p,quantityReturnRequested:g,id:n==null?void 0:n.id,discounted:a,total:{value:((N=n==null?void 0:n.product_sale_price)==null?void 0:N.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((t=n==null?void 0:n.product_sale_price)==null?void 0:t.currency)||""},totalInclTax:{value:((b=n==null?void 0:n.product_sale_price)==null?void 0:b.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(h=n==null?void 0:n.product_sale_price)==null?void 0:h.currency},price:s,prices:K(n),itemPrices:y,taxCalculations:vn(y,s,a),priceInclTax:{value:((v=n==null?void 0:n.product_sale_price)==null?void 0:v.value)??0,currency:(O=n==null?void 0:n.product_sale_price)==null?void 0:O.currency},totalQuantity:R,regularPrice:{value:(w=(A=(G=(q=n==null?void 0:n.product)==null?void 0:q.price_range)==null?void 0:G.maximum_price)==null?void 0:A.regular_price)==null?void 0:w.value,currency:(B=(L=(C=(M=n==null?void 0:n.product)==null?void 0:M.price_range)==null?void 0:C.maximum_price)==null?void 0:L.regular_price)==null?void 0:B.currency},product:Rn(n==null?void 0:n.product),thumbnail:Sn(n),giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?An(n):void 0,configurableOptions:en(n),bundleOptions:n.__typename==="BundleOrderItem"?fn(n.bundle_options):null,downloadableLinks:n.__typename==="DownloadableOrderItem"?En(n==null?void 0:n.downloadable_links):null}},W=n=>n==null?void 0:n.filter(i=>i.__typename).map(i=>gn(i)),Gn=n=>{var i,u,c,_,l;return{token:(n==null?void 0:n.token)??"",email:(n==null?void 0:n.email)??"",status:(n==null?void 0:n.status)??"",number:(n==null?void 0:n.number)??"",id:(n==null?void 0:n.id)??"",carrier:n.carrier??"",coupons:(n==null?void 0:n.applied_coupons)??[],orderDate:(n==null?void 0:n.order_date)??"",isVirtual:(n==null?void 0:n.is_virtual)??!1,availableActions:(n==null?void 0:n.available_actions)??[],orderStatusChangeDate:(n==null?void 0:n.order_status_change_date)??"",shippingMethod:(n==null?void 0:n.shipping_method)??"",giftWrappingOrder:{price:{value:((u=(i=n==null?void 0:n.gift_wrapping)==null?void 0:i.price)==null?void 0:u.value)??0,currency:((_=(c=n==null?void 0:n.gift_wrapping)==null?void 0:c.price)==null?void 0:_.currency)??"USD"},uid:((l=n==null?void 0:n.gift_wrapping)==null?void 0:l.uid)??""}}},Mn=n=>{var u,c,_,l,p,g,y,a,R,s,e,f,E;const i=(u=n==null?void 0:n.total)==null?void 0:u.gift_options;return{giftWrappingForItems:{value:((c=i==null?void 0:i.gift_wrapping_for_items)==null?void 0:c.value)??0,currency:((_=i==null?void 0:i.gift_wrapping_for_items)==null?void 0:_.currency)??"USD"},giftWrappingForItemsInclTax:{value:((l=i==null?void 0:i.gift_wrapping_for_items_incl_tax)==null?void 0:l.value)??0,currency:((p=i==null?void 0:i.gift_wrapping_for_items_incl_tax)==null?void 0:p.currency)??"USD"},giftWrappingForOrder:{value:((g=i==null?void 0:i.gift_wrapping_for_order)==null?void 0:g.value)??0,currency:((y=i==null?void 0:i.gift_wrapping_for_order)==null?void 0:y.currency)??"USD"},giftWrappingForOrderInclTax:{value:((a=i==null?void 0:i.gift_wrapping_for_order_incl_tax)==null?void 0:a.value)??0,currency:((R=i==null?void 0:i.gift_wrapping_for_order_incl_tax)==null?void 0:R.currency)??"USD"},printedCard:{value:((s=i==null?void 0:i.printed_card)==null?void 0:s.value)??0,currency:((e=i==null?void 0:i.printed_card)==null?void 0:e.currency)??"USD"},printedCardInclTax:{value:((f=i==null?void 0:i.printed_card_incl_tax)==null?void 0:f.value)??0,currency:((E=i==null?void 0:i.printed_card_incl_tax)==null?void 0:E.currency)??"USD"}}},Fn=(n=[])=>n?n==null?void 0:n.map(i=>{var u,c;return{code:(i==null?void 0:i.code)??"",appliedBalance:{value:((u=i.applied_balance)==null?void 0:u.value)??0,currency:((c=i.applied_balance)==null?void 0:c.currency)??"USD"}}}):[],Y=(n,i)=>{var G,A,w,M,C,L,B,P,Q;const u=Gn(n),c=j(n==null?void 0:n.billing_address),_=j(n==null?void 0:n.shipping_address),l=(G=n.shipments)==null?void 0:G.map(k=>({...k,items:k.items.map(T=>({id:T.id,productName:T.product_name,productSku:T.product_sku,quantityShipped:T.quantity_shipped,orderItem:gn(T.order_item)}))})),p=Fn(n==null?void 0:n.applied_gift_cards),g=W(n.items),y=((A=On(n==null?void 0:n.returns))==null?void 0:A.ordersReturn)??[],a=i?y.filter(k=>k.returnNumber===i):y,R=W(n.items_eligible_for_return),s=hn(n==null?void 0:n.total),e=(w=n==null?void 0:n.payment_methods)==null?void 0:w[0],f=n==null?void 0:n.shipping_method,E=g==null?void 0:g.reduce((k,T)=>k+(T==null?void 0:T.totalQuantity),0),F={amount:((M=s==null?void 0:s.totalShipping)==null?void 0:M.value)??0,currency:((C=s==null?void 0:s.totalShipping)==null?void 0:C.currency)||"",code:(u==null?void 0:u.shippingMethod)??""},x=[{code:(e==null?void 0:e.type)??"",name:(e==null?void 0:e.name)??""}],S=s==null?void 0:s.subtotalExclTax,N=s==null?void 0:s.subtotalInclTax,t=Mn(n),b=sn(n),h=[pn(n)],v=(n==null?void 0:n.printed_card_included)??!1,O=(n==null?void 0:n.gift_receipt_included)??!1,q={...u,...s,giftMessage:b,cartGiftWrapping:h,printedCardIncluded:v,giftReceiptIncluded:O,appliedGiftCards:p,totalGiftOptions:t,subtotalExclTax:S,subtotalInclTax:N,billingAddress:c,shippingAddress:_,shipments:l,items:g,returns:a,itemsEligibleForReturn:R,totalQuantity:E,shippingMethod:f,shipping:F,payments:x};return X(q,(Q=(P=(B=(L=U==null?void 0:U.getConfig())==null?void 0:L.models)==null?void 0:B.OrderDataModel)==null?void 0:P.transformer)==null?void 0:Q.call(P,n))},xn=(n,i,u)=>{var c,_,l,p,g,y,a;if((p=(l=(_=(c=i==null?void 0:i.data)==null?void 0:c.customer)==null?void 0:_.orders)==null?void 0:l.items)!=null&&p.length&&n==="orderData"){const R=(a=(y=(g=i==null?void 0:i.data)==null?void 0:g.customer)==null?void 0:y.orders)==null?void 0:a.items[0];return Y(R,u)}return null},On=n=>{var l,p,g,y,a;if(!((l=n==null?void 0:n.items)!=null&&l.length))return null;const i=n==null?void 0:n.items,u=n==null?void 0:n.page_info,_={ordersReturn:[...i].sort((R,s)=>+s.number-+R.number).map(R=>{var S,N;const{order:s,status:e,number:f,created_at:E}=R,F=((N=(S=R==null?void 0:R.shipping)==null?void 0:S.tracking)==null?void 0:N.map(t=>{const{status:b,carrier:h,tracking_number:v}=t;return{status:b,carrier:h,trackingNumber:v}}))??[],x=R.items.map(t=>{var A;const b=t==null?void 0:t.quantity,h=t==null?void 0:t.status,v=t==null?void 0:t.request_quantity,O=t==null?void 0:t.uid,q=t==null?void 0:t.order_item,G=((A=W([q]))==null?void 0:A.reduce((w,M)=>M,{}))??{};return{uid:O,quantity:b,status:h,requestQuantity:v,...G}});return{createdReturnAt:E,returnStatus:e,token:s==null?void 0:s.token,orderNumber:s==null?void 0:s.number,returnNumber:f,items:x,tracking:F}}),...u?{pageInfo:{pageSize:u.page_size,totalPages:u.total_pages,currentPage:u.current_page}}:{}};return X(_,(a=(y=(g=(p=U==null?void 0:U.getConfig())==null?void 0:p.models)==null?void 0:g.CustomerOrdersReturnModel)==null?void 0:y.transformer)==null?void 0:a.call(y,{...i,...u}))},Qn=(n,i)=>{var c,_;if(!((c=n==null?void 0:n.data)!=null&&c.guestOrder))return null;const u=(_=n==null?void 0:n.data)==null?void 0:_.guestOrder;return Y(u,i)},qn=(n,i)=>{var c,_;if(!((c=n==null?void 0:n.data)!=null&&c.guestOrderByToken))return null;const u=(_=n==null?void 0:n.data)==null?void 0:_.guestOrderByToken;return Y(u,i)},wn=`
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
  ${cn}
  ${_n}
`,kn=async({orderId:n,returnRef:i,queryType:u,returnsPageSize:c=50})=>await ln(wn,{method:"GET",cache:"force-cache",variables:{orderNumber:n,pageSize:c}}).then(_=>xn(u??"orderData",_,i)).catch(H),$n=`
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
  ${cn}
  ${_n}
`,Un=async(n,i)=>await ln($n,{method:"GET",cache:"no-cache",variables:{token:n}}).then(u=>{var c;return(c=u.errors)!=null&&c.length&&u.errors[0].message==="Please login to view the order."?tn(u.errors):qn(u,i)}).catch(H),Cn="orderData",V=async n=>{var p;const i=typeof(n==null?void 0:n.orderRef)=="string"?n==null?void 0:n.orderRef:"",u=typeof(n==null?void 0:n.returnRef)=="string"?n==null?void 0:n.returnRef:"",c=i&&typeof(n==null?void 0:n.orderRef)=="string"&&((p=n==null?void 0:n.orderRef)==null?void 0:p.length)>20,_=(n==null?void 0:n.orderData)??null;if(_){$.emit("order/data",{..._,returnNumber:u});return}if(!i)return;const l=c?await Un(i,u):await kn({orderId:i,returnRef:u,queryType:Cn});l?$.emit("order/data",{...l,returnNumber:u}):$.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},Ln=(n,i,u)=>{if(typeof n!="function")return;const c=n(u);if(!i||Object.keys(i).length===0){window.location.href=c;return}const _=new URLSearchParams;Object.entries(i).forEach(([p,g])=>{_.append(p,String(g))});const l=c.includes("?")?"&":"?";window.location.href=`${c}${l}${_.toString()}`},z=new yn({init:async n=>{const i={};z.config.setConfig({...i,...n}),V(n).catch(u=>console.error(u))},listeners:()=>[$.on("companyContext/changed",async()=>{const n=z.config.getConfig(),{orderRef:i,returnRef:u,routeOrdersList:c=()=>"/customer/orders"}=n;if(!i)return;let _,l;const p=()=>{_==null||_.off(),l==null||l.off()};_=$.on("order/data",()=>{p()}),l=$.on("order/error",g=>{(g==null?void 0:g.type)==="network"&&Ln(c),p()}),await V({orderRef:i,returnRef:u,orderData:null})})]}),U=z.config;export{Y as a,Qn as b,U as c,Un as d,kn as g,z as i,Ln as r,On as t};
//# sourceMappingURL=initialize.js.map
