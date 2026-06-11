/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as f}from"@dropins/tools/event-bus.js";import{verifyReCaptcha as Nn}from"@dropins/tools/recaptcha.js";import{PRODUCT_DETAILS_FRAGMENT as ln,PRICE_DETAILS_FRAGMENT as _n,GIFT_CARD_DETAILS_FRAGMENT as an,ORDER_ITEM_DETAILS_FRAGMENT as on,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as An,ORDER_SUMMARY_FRAGMENT as vn,ADDRESS_FRAGMENT as Sn,ORDER_ITEM_FRAGMENT as Cn,GIFT_WRAPPING_FRAGMENT as sn,GIFT_MESSAGE_FRAGMENT as En,RETURNS_FRAGMENT as Y,GUEST_ORDER_FRAGMENT as z,CUSTOMER_ORDER_FRAGMENT as Gn,PLACE_ORDER_FRAGMENT as Rn,REQUEST_RETURN_ORDER_FRAGMENT as Z,PLACE_NEGOTIABLE_QUOTE_ORDER_FRAGMENT as Mn}from"./fragments.js";import{merge as D,Initializer as Un}from"@dropins/tools/lib.js";import{FetchGraphQL as xn}from"@dropins/tools/fetch-graphql.js";const $n=`
  mutation CANCEL_ORDER_MUTATION($orderId: ID!, $reason: String!) {
    cancelOrder(input: { order_id: $orderId, reason: $reason }) {
      error
      order {
        email
        available_actions
        status
        number
        id
        order_date
        carrier
        shipping_method
        is_virtual
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
  ${ln}
  ${_n}
  ${an}
  ${on}
  ${An}
  ${vn}
  ${Sn}
  ${Cn}
  ${sn}
  ${En}
`,g=n=>{const t=n.map(e=>e.message).join(" ");throw Error(t)},j=(n,t)=>n+t.amount.value,wn=(n,t)=>({id:n,totalQuantity:t.totalQuantity,possibleOnepageCheckout:!0,items:t.items.map(e=>{var i,u,c,r,l,_,a,o,E,s,p;return{canApplyMsrp:!0,formattedPrice:"",id:e.id,quantity:e.totalQuantity,product:{canonicalUrl:(i=e.product)==null?void 0:i.canonicalUrl,mainImageUrl:((u=e.product)==null?void 0:u.image)??"",name:((c=e.product)==null?void 0:c.name)??"",productId:0,productType:(r=e.product)==null?void 0:r.productType,sku:((l=e.product)==null?void 0:l.sku)??"",topLevelSku:(_=e.product)==null?void 0:_.sku},prices:{price:{value:e.price.value,currency:e.price.currency,regularPrice:((a=e.regularPrice)==null?void 0:a.value)??e.price.value}},configurableOptions:((o=e.selectedOptions)==null?void 0:o.map(O=>({optionLabel:O.label,valueLabel:O.value})))||[],discountAmount:((p=((E=e.itemPrices)==null?void 0:E.discounts)??((s=e.prices)==null?void 0:s.discounts))==null?void 0:p.reduce(j,0))??0}}),prices:{subtotalExcludingTax:{value:t.subtotalExclTax.value,currency:t.subtotalExclTax.currency},subtotalIncludingTax:{value:t.subtotalInclTax.value,currency:t.subtotalInclTax.currency}},discountAmount:t.discounts.reduce(j,0)}),qn=n=>{var i,u,c;const t=n.coupons[0],e=(i=n.payments)==null?void 0:i[0];return{appliedCouponCode:(t==null?void 0:t.code)??"",email:n.email,grandTotal:n.grandTotal.value,orderId:n.number,orderType:"checkout",otherTax:0,salesTax:n.totalTax.value,shipping:{shippingMethod:((u=n.shipping)==null?void 0:u.code)??"",shippingAmount:((c=n.shipping)==null?void 0:c.amount)??0},subtotalExcludingTax:n.subtotalExclTax.value,subtotalIncludingTax:n.subtotalInclTax.value,payments:e?[{paymentMethodCode:(e==null?void 0:e.code)||"",paymentMethodName:(e==null?void 0:e.name)||"",total:n.grandTotal.value,orderId:n.number}]:[],discountAmount:n.discounts.reduce(j,0),taxAmount:n.totalTax.value,paymentAmount:n.grandTotal.value,priceTotal:n.grandTotal.value}},Tn=n=>n.replace(/_([a-z])/g,(t,e)=>e.toUpperCase()),Fn=n=>n.replace(/([A-Z])/g,t=>`_${t.toLowerCase()}`),B=(n,t,e)=>{const i=["string","boolean","number"],u=t==="camelCase"?Tn:Fn;return Array.isArray(n)?n.map(c=>i.includes(typeof c)||c===null?c:typeof c=="object"?B(c,t,e):c):n!==null&&typeof n=="object"?Object.entries(n).reduce((c,[r,l])=>{const _=e&&e[r]?e[r]:u(r);return c[_]=i.includes(typeof l)||l===null?l:B(l,t,e),c},{}):n},Ln=n=>{let t=[];for(const e of n)if(!(e.frontend_input!=="MULTILINE"||e.multiline_count<2))for(let i=2;i<=e.multiline_count;i++){const u={...e,name:`${e.code}_${i}`,code:`${e.code}_${i}`,id:`${e.code}_${i}`};t.push(u)}return t},pn=(n=[])=>{var u;if(!(n!=null&&n.length))return[];const t=(u=n.filter(c=>{var r;return!((r=c.frontend_input)!=null&&r.includes("HIDDEN"))}))==null?void 0:u.map(({code:c,...r})=>{const l=c!=="country_id"?c:"country_code";return{...r,name:l,id:l,code:l}}),e=Ln(t);return[...t,...e].map(c=>{const r=Tn(c.code);return B({...c,customUpperCode:r},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((c,r)=>c.orderNumber-r.orderNumber)},kn=n=>{var t,e,i,u,c,r;return{email:((e=(t=n==null?void 0:n.data)==null?void 0:t.customer)==null?void 0:e.email)||"",firstname:((u=(i=n==null?void 0:n.data)==null?void 0:i.customer)==null?void 0:u.firstname)||"",lastname:((r=(c=n==null?void 0:n.data)==null?void 0:c.customer)==null?void 0:r.lastname)||""}};function Pt(n){var t;return{region:{region_id:n!=null&&n.regionId?Number(n==null?void 0:n.regionId):null,region:n==null?void 0:n.region},city:n==null?void 0:n.city,company:n==null?void 0:n.company,country_code:n==null?void 0:n.countryCode,firstname:n==null?void 0:n.firstName,lastname:n==null?void 0:n.lastName,middlename:n==null?void 0:n.middleName,postcode:n==null?void 0:n.postCode,street:n==null?void 0:n.street,telephone:n==null?void 0:n.telephone,custom_attributesV2:((t=n==null?void 0:n.customAttributes)==null?void 0:t.map(e=>({attribute_code:e.code,value:e.value})))||[]}}const Pn=n=>n||0,Qn=n=>{var t,e,i,u,c,r,l,_,a;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((i=(e=(t=n==null?void 0:n.price_range)==null?void 0:t.maximum_price)==null?void 0:e.regular_price)==null?void 0:i.currency)??"",value:((r=(c=(u=n==null?void 0:n.price_range)==null?void 0:u.maximum_price)==null?void 0:c.regular_price)==null?void 0:r.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((l=n==null?void 0:n.image)==null?void 0:l.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((_=n==null?void 0:n.thumbnail)==null?void 0:_.label)||"",url:((a=n==null?void 0:n.thumbnail)==null?void 0:a.url)||""}}},Bn=n=>{if(!n||!("selected_options"in n))return;const t={};for(const e of n.selected_options)t[e.label]=e.value;return t},zn=n=>{const t=n==null?void 0:n.map(i=>({uid:i.uid,label:i.label,values:i.values.map(u=>u.product_name).join(", ")})),e={};return t==null||t.forEach(i=>{e[i.label]=i.values}),Object.keys(e).length>0?e:null},Hn=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(t=>t.title).join(", ")}:null,Vn=n=>({quantityCanceled:(n==null?void 0:n.quantity_canceled)??0,quantityInvoiced:(n==null?void 0:n.quantity_invoiced)??0,quantityOrdered:(n==null?void 0:n.quantity_ordered)??0,quantityRefunded:(n==null?void 0:n.quantity_refunded)??0,quantityReturned:(n==null?void 0:n.quantity_returned)??0,quantityShipped:(n==null?void 0:n.quantity_shipped)??0,quantityReturnRequested:(n==null?void 0:n.quantity_return_requested)??0}),Wn=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),en=n=>{const{firstName:t,lastName:e,middleName:i}=Wn(n);return{firstName:t,lastName:e,middleName:i,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:(n==null?void 0:n.country)??"",countryCode:(n==null?void 0:n.country_code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:(n==null?void 0:n.region)??"",regionId:(n==null?void 0:n.region_id)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},Yn=n=>{const t={value:0,currency:"USD"};return{grandTotal:(n==null?void 0:n.grand_total)??t,grandTotalExclTax:(n==null?void 0:n.grand_total_excl_tax)??t,totalGiftCard:(n==null?void 0:n.total_giftcard)??t,subtotalExclTax:(n==null?void 0:n.subtotal_excl_tax)??t,subtotalInclTax:(n==null?void 0:n.subtotal_incl_tax)??t,taxes:(n==null?void 0:n.taxes)??[],totalTax:(n==null?void 0:n.total_tax)??t,totalShipping:(n==null?void 0:n.total_shipping)??t,discounts:(n==null?void 0:n.discounts)??[]}},un=n=>{const t={value:0,currency:"USD"},e=(n==null?void 0:n.prices)??{};return{price:(e==null?void 0:e.price)??t,priceIncludingTax:(e==null?void 0:e.price_including_tax)??t,originalPrice:(e==null?void 0:e.original_price)??t,originalPriceIncludingTax:(e==null?void 0:e.original_price_including_tax)??t,discounts:(e==null?void 0:e.discounts)??[]}},jn=(n,t,e)=>{const i=n==null?void 0:n.price,u=n==null?void 0:n.priceIncludingTax,c=n==null?void 0:n.originalPrice,r=e?c==null?void 0:c.value:u==null?void 0:u.value,l={originalPrice:c,baseOriginalPrice:{value:r,currency:c==null?void 0:c.currency},baseDiscountedPrice:{value:u==null?void 0:u.value,currency:u==null?void 0:u.currency},baseExcludingTax:{value:i==null?void 0:i.value,currency:i==null?void 0:i.currency}},_={originalPrice:c,baseOriginalPrice:{value:c==null?void 0:c.value,currency:u==null?void 0:u.currency},baseDiscountedPrice:{value:t==null?void 0:t.value,currency:i==null?void 0:i.currency},baseExcludingTax:{value:i==null?void 0:i.value,currency:i==null?void 0:i.currency}},a={singleItemPrice:{value:e?c.value:u.value,currency:u.currency},baseOriginalPrice:{value:r,currency:u.currency},baseDiscountedPrice:{value:u.value,currency:u.currency}};return{includeAndExcludeTax:l,excludeTax:_,includeTax:a}},Kn=n=>{var t,e,i,u,c;return{senderName:((t=n.gift_card)==null?void 0:t.sender_name)||"",senderEmail:((e=n.gift_card)==null?void 0:e.sender_email)||"",recipientEmail:((i=n.gift_card)==null?void 0:i.recipient_email)||"",recipientName:((u=n.gift_card)==null?void 0:u.recipient_name)||"",message:((c=n.gift_card)==null?void 0:c.message)||""}},Xn=n=>{var t,e,i,u;return{label:((e=(t=n==null?void 0:n.product)==null?void 0:t.thumbnail)==null?void 0:e.label)||"",url:((u=(i=n==null?void 0:n.product)==null?void 0:i.thumbnail)==null?void 0:u.url)||""}};function Zn(n){return{currency:(n==null?void 0:n.currency)??"USD",value:(n==null?void 0:n.value)??0}}function gn(n){var t,e,i;return{senderName:((t=n==null?void 0:n.gift_message)==null?void 0:t.from)??"",recipientName:((e=n==null?void 0:n.gift_message)==null?void 0:e.to)??"",message:((i=n==null?void 0:n.gift_message)==null?void 0:i.message)??""}}function fn(n){var t,e,i,u,c,r,l,_,a,o,E;return{design:((t=n==null?void 0:n.gift_wrapping)==null?void 0:t.design)??"",uid:(e=n==null?void 0:n.gift_wrapping)==null?void 0:e.uid,selected:!!((i=n==null?void 0:n.gift_wrapping)!=null&&i.uid),image:{url:((c=(u=n==null?void 0:n.gift_wrapping)==null?void 0:u.image)==null?void 0:c.url)??"",label:((l=(r=n==null?void 0:n.gift_wrapping)==null?void 0:r.image)==null?void 0:l.label)??""},price:{currency:((a=(_=n==null?void 0:n.gift_wrapping)==null?void 0:_.price)==null?void 0:a.currency)??"USD",value:((E=(o=n==null?void 0:n.gift_wrapping)==null?void 0:o.price)==null?void 0:E.value)??0}}}const yn=n=>{var s,p,O,x,$,C,G,R,N,A,v,w,q,F,S,L,M,k,P,Q;const{quantityCanceled:t,quantityInvoiced:e,quantityOrdered:i,quantityRefunded:u,quantityReturned:c,quantityShipped:r,quantityReturnRequested:l}=Vn(n),_=un(n),a=((s=n==null?void 0:n.prices)==null?void 0:s.original_price.value)*(n==null?void 0:n.quantity_ordered)>((p=n==null?void 0:n.prices)==null?void 0:p.price.value)*(n==null?void 0:n.quantity_ordered),o=Pn(n==null?void 0:n.quantity_ordered),E={value:((O=n==null?void 0:n.product_sale_price)==null?void 0:O.value)||0,currency:(x=n==null?void 0:n.product_sale_price)==null?void 0:x.currency};return{giftMessage:gn(n),giftWrappingAvailable:(($=n==null?void 0:n.product)==null?void 0:$.gift_wrapping_available)??!1,giftWrappingPrice:Zn((C=n==null?void 0:n.product)==null?void 0:C.gift_wrapping_price),productGiftWrapping:[fn(n)],selectedOptions:(n==null?void 0:n.selected_options)??[],productSalePrice:n==null?void 0:n.product_sale_price,status:(n==null?void 0:n.status)??"",type:n==null?void 0:n.__typename,eligibleForReturn:(n==null?void 0:n.eligible_for_return)??!1,productSku:(n==null?void 0:n.product_sku)??"",productName:(n==null?void 0:n.product_name)??"",productUrlKey:(n==null?void 0:n.product_url_key)??"",quantityCanceled:t,quantityInvoiced:e,quantityOrdered:i,quantityRefunded:u,quantityReturned:c,quantityShipped:r,quantityReturnRequested:l,id:n==null?void 0:n.id,discounted:a,total:{value:((G=n==null?void 0:n.product_sale_price)==null?void 0:G.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((R=n==null?void 0:n.product_sale_price)==null?void 0:R.currency)||""},totalInclTax:{value:((N=n==null?void 0:n.product_sale_price)==null?void 0:N.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(A=n==null?void 0:n.product_sale_price)==null?void 0:A.currency},price:E,prices:un(n),itemPrices:_,taxCalculations:jn(_,E,a),priceInclTax:{value:((v=n==null?void 0:n.product_sale_price)==null?void 0:v.value)??0,currency:(w=n==null?void 0:n.product_sale_price)==null?void 0:w.currency},totalQuantity:o,regularPrice:{value:(L=(S=(F=(q=n==null?void 0:n.product)==null?void 0:q.price_range)==null?void 0:F.maximum_price)==null?void 0:S.regular_price)==null?void 0:L.value,currency:(Q=(P=(k=(M=n==null?void 0:n.product)==null?void 0:M.price_range)==null?void 0:k.maximum_price)==null?void 0:P.regular_price)==null?void 0:Q.currency},product:Qn(n==null?void 0:n.product),thumbnail:Xn(n),giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?Kn(n):void 0,configurableOptions:Bn(n),bundleOptions:n.__typename==="BundleOrderItem"?zn(n.bundle_options):null,downloadableLinks:n.__typename==="DownloadableOrderItem"?Hn(n==null?void 0:n.downloadable_links):null}},K=n=>n==null?void 0:n.filter(t=>t.__typename).map(t=>yn(t)),Dn=n=>{var t,e,i,u,c;return{token:(n==null?void 0:n.token)??"",email:(n==null?void 0:n.email)??"",status:(n==null?void 0:n.status)??"",number:(n==null?void 0:n.number)??"",id:(n==null?void 0:n.id)??"",carrier:n.carrier??"",coupons:(n==null?void 0:n.applied_coupons)??[],orderDate:(n==null?void 0:n.order_date)??"",isVirtual:(n==null?void 0:n.is_virtual)??!1,availableActions:(n==null?void 0:n.available_actions)??[],orderStatusChangeDate:(n==null?void 0:n.order_status_change_date)??"",shippingMethod:(n==null?void 0:n.shipping_method)??"",adminAssistedOrder:(n==null?void 0:n.admin_assisted_order)!=null,giftWrappingOrder:{price:{value:((e=(t=n==null?void 0:n.gift_wrapping)==null?void 0:t.price)==null?void 0:e.value)??0,currency:((u=(i=n==null?void 0:n.gift_wrapping)==null?void 0:i.price)==null?void 0:u.currency)??"USD"},uid:((c=n==null?void 0:n.gift_wrapping)==null?void 0:c.uid)??""}}},Jn=n=>{var e,i,u,c,r,l,_,a,o,E,s,p,O;const t=(e=n==null?void 0:n.total)==null?void 0:e.gift_options;return{giftWrappingForItems:{value:((i=t==null?void 0:t.gift_wrapping_for_items)==null?void 0:i.value)??0,currency:((u=t==null?void 0:t.gift_wrapping_for_items)==null?void 0:u.currency)??"USD"},giftWrappingForItemsInclTax:{value:((c=t==null?void 0:t.gift_wrapping_for_items_incl_tax)==null?void 0:c.value)??0,currency:((r=t==null?void 0:t.gift_wrapping_for_items_incl_tax)==null?void 0:r.currency)??"USD"},giftWrappingForOrder:{value:((l=t==null?void 0:t.gift_wrapping_for_order)==null?void 0:l.value)??0,currency:((_=t==null?void 0:t.gift_wrapping_for_order)==null?void 0:_.currency)??"USD"},giftWrappingForOrderInclTax:{value:((a=t==null?void 0:t.gift_wrapping_for_order_incl_tax)==null?void 0:a.value)??0,currency:((o=t==null?void 0:t.gift_wrapping_for_order_incl_tax)==null?void 0:o.currency)??"USD"},printedCard:{value:((E=t==null?void 0:t.printed_card)==null?void 0:E.value)??0,currency:((s=t==null?void 0:t.printed_card)==null?void 0:s.currency)??"USD"},printedCardInclTax:{value:((p=t==null?void 0:t.printed_card_incl_tax)==null?void 0:p.value)??0,currency:((O=t==null?void 0:t.printed_card_incl_tax)==null?void 0:O.currency)??"USD"}}},In=(n=[])=>n?n==null?void 0:n.map(t=>{var e,i;return{code:(t==null?void 0:t.code)??"",appliedBalance:{value:((e=t.applied_balance)==null?void 0:e.value)??0,currency:((i=t.applied_balance)==null?void 0:i.currency)??"USD"}}}):[],m=(n,t)=>{var S,L,M,k,P,Q,d,nn,H,tn;const e=Dn(n),i=en(n==null?void 0:n.billing_address),u=en(n==null?void 0:n.shipping_address),c=(S=n.shipments)==null?void 0:S.map(h=>({...h,items:h.items.map(b=>({id:b.id,productName:b.product_name,productSku:b.product_sku,quantityShipped:b.quantity_shipped,orderItem:yn(b.order_item)}))})),r=In(n==null?void 0:n.applied_gift_cards),l=K(n.items),_=((L=n==null?void 0:n.comments)==null?void 0:L.map(h=>({message:(h==null?void 0:h.message)??"",timestamp:(h==null?void 0:h.timestamp)??""})))??[],a=((M=hn(n==null?void 0:n.returns))==null?void 0:M.ordersReturn)??[],o=t?a.filter(h=>h.returnNumber===t):a,E=K(n.items_eligible_for_return),s=Yn(n==null?void 0:n.total),p=(k=n==null?void 0:n.payment_methods)==null?void 0:k[0],O=n==null?void 0:n.shipping_method,x=l==null?void 0:l.reduce((h,b)=>h+(b==null?void 0:b.totalQuantity),0),$={amount:((P=s==null?void 0:s.totalShipping)==null?void 0:P.value)??0,currency:((Q=s==null?void 0:s.totalShipping)==null?void 0:Q.currency)||"",code:(e==null?void 0:e.shippingMethod)??""},C=[{code:(p==null?void 0:p.type)??"",name:(p==null?void 0:p.name)??""}],G=s==null?void 0:s.subtotalExclTax,R=s==null?void 0:s.subtotalInclTax,N=Jn(n),A=gn(n),v=[fn(n)],w=(n==null?void 0:n.printed_card_included)??!1,q=(n==null?void 0:n.gift_receipt_included)??!1,F={...e,...s,giftMessage:A,cartGiftWrapping:v,printedCardIncluded:w,giftReceiptIncluded:q,appliedGiftCards:r,totalGiftOptions:N,subtotalExclTax:G,subtotalInclTax:R,billingAddress:i,shippingAddress:u,shipments:c,items:l,comments:_,returns:o,itemsEligibleForReturn:E,totalQuantity:x,shippingMethod:O,shipping:$,payments:C};return D(F,(tn=(H=(nn=(d=U==null?void 0:U.getConfig())==null?void 0:d.models)==null?void 0:nn.OrderDataModel)==null?void 0:H.transformer)==null?void 0:tn.call(H,n))},dn=(n,t,e)=>{var i,u,c,r,l,_,a;if((r=(c=(u=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:u.orders)==null?void 0:c.items)!=null&&r.length&&n==="orderData"){const o=(a=(_=(l=t==null?void 0:t.data)==null?void 0:l.customer)==null?void 0:_.orders)==null?void 0:a.items[0];return m(o,e)}return null},hn=n=>{var c,r,l,_,a;if(!((c=n==null?void 0:n.items)!=null&&c.length))return null;const t=n==null?void 0:n.items,e=n==null?void 0:n.page_info,u={ordersReturn:[...t].sort((o,E)=>+E.number-+o.number).map(o=>{var C,G;const{order:E,status:s,number:p,created_at:O}=o,x=((G=(C=o==null?void 0:o.shipping)==null?void 0:C.tracking)==null?void 0:G.map(R=>{const{status:N,carrier:A,tracking_number:v}=R;return{status:N,carrier:A,trackingNumber:v}}))??[],$=o.items.map(R=>{var S;const N=R==null?void 0:R.quantity,A=R==null?void 0:R.status,v=R==null?void 0:R.request_quantity,w=R==null?void 0:R.uid,q=R==null?void 0:R.order_item,F=((S=K([q]))==null?void 0:S.reduce((L,M)=>M,{}))??{};return{uid:w,quantity:N,status:A,requestQuantity:v,...F}});return{createdReturnAt:O,returnStatus:s,token:E==null?void 0:E.token,orderNumber:E==null?void 0:E.number,returnNumber:p,items:$,tracking:x}}),...e?{pageInfo:{pageSize:e.page_size,totalPages:e.total_pages,currentPage:e.current_page}}:{}};return D(u,(a=(_=(l=(r=U==null?void 0:U.getConfig())==null?void 0:r.models)==null?void 0:l.CustomerOrdersReturnModel)==null?void 0:_.transformer)==null?void 0:a.call(_,{...t,...e}))},nt=(n,t)=>{var i,u;if(!((i=n==null?void 0:n.data)!=null&&i.guestOrder))return null;const e=(u=n==null?void 0:n.data)==null?void 0:u.guestOrder;return m(e,t)},tt=(n,t)=>{var i,u;if(!((i=n==null?void 0:n.data)!=null&&i.guestOrderByToken))return null;const e=(u=n==null?void 0:n.data)==null?void 0:u.guestOrderByToken;return m(e,t)},On=n=>{var e,i;const t=(i=(e=n==null?void 0:n.data)==null?void 0:e.placeOrder)==null?void 0:i.orderV2;return t?m(t):null},et=n=>{var e,i;const t=(i=(e=n==null?void 0:n.data)==null?void 0:e.placeNegotiableQuoteOrderV2)==null?void 0:i.order;return t?m(t):null};function it(n){return n?{baseMediaUrl:n.base_media_url,orderCancellationEnabled:n.order_cancellation_enabled,orderCancellationReasons:n.order_cancellation_reasons,shoppingOrderDisplayPrice:n.orders_invoices_credit_memos_display_price,shoppingOrdersDisplaySubtotal:n.orders_invoices_credit_memos_display_subtotal,shoppingOrdersDisplayShipping:n.orders_invoices_credit_memos_display_shipping_amount,shoppingOrdersDisplayGrandTotal:n.orders_invoices_credit_memos_display_grandtotal,shoppingOrdersDisplayFullSummary:n.orders_invoices_credit_memos_display_full_summary,shoppingOrdersDisplayZeroTax:n.orders_invoices_credit_memos_display_zero_tax,salesPrintedCard:+n.sales_printed_card,salesGiftWrapping:+n.sales_gift_wrapping}:null}const ut=n=>{var u,c,r,l,_,a;if(!((c=(u=n==null?void 0:n.data)==null?void 0:u.requestReturn)!=null&&c.return))return{};const{created_at:t,...e}=n.data.requestReturn.return,i={...e,createdAt:t};return D(i,(a=(_=(l=(r=U.getConfig())==null?void 0:r.models)==null?void 0:l.RequestReturnModel)==null?void 0:_.transformer)==null?void 0:a.call(_,n.data.requestReturn.return))},Qt=async(n,t,e,i)=>{if(!n)throw new Error("No order ID found");if(!t)throw new Error("No reason found");return T($n,{variables:{orderId:n,reason:t}}).then(({errors:u,data:c})=>{if(u)return g(u);if(c.cancelOrder.error!=null){i();return}const r=m(c.cancelOrder.order);e(r)}).catch(()=>i())},{setEndpoint:Bt,setFetchGraphQlHeader:ct,removeFetchGraphQlHeader:zt,setFetchGraphQlHeaders:Ht,fetchGraphQl:T,getConfig:Vt}=new xn().getMethods(),rt=`
  query GET_ATTRIBUTES_FORM($formCode: String!) {
    attributesForm(formCode: $formCode) {
      items {
        code
        default_value
        entity_type
        frontend_class
        frontend_input
        is_required
        is_unique
        label
        options {
          is_default
          label
          value
        }
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
      }
      errors {
        type
        message
      }
    }
  }
`,lt=`
  query GET_ATTRIBUTES_FORM_SHORT {
    attributesForm(formCode: "customer_register_address") {
      items {
        frontend_input
        label
        code
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
        }
      }
    }
  }
`,y=n=>{const t=n instanceof DOMException&&n.name==="AbortError",e=n.name==="PlaceOrderError";throw!t&&!e&&f.emit("order/error",{source:"auth",type:"network",error:n.message}),n},Wt=async n=>await T(n!=="shortRequest"?rt:lt,{method:"GET",cache:"force-cache",variables:{formCode:n}}).then(t=>{var e,i,u;return(e=t.errors)!=null&&e.length?g(t.errors):pn((u=(i=t==null?void 0:t.data)==null?void 0:i.attributesForm)==null?void 0:u.items)}).catch(y),_t=`
  query GET_ATTRIBUTES_LIST($entityType: AttributeEntityTypeEnum!) {
    attributesList(entityType: $entityType) {
      items {
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
        ... on ReturnItemAttributeMetadata {
          sort_order
        }
        code
        label
        default_value
        frontend_input
        is_unique
        is_required
        options {
          is_default
          label
          value
        }
      }
      errors {
        type
        message
      }
    }
  }
`,Yt=async n=>await T(_t,{method:"GET",cache:"force-cache",variables:{entityType:n}}).then(t=>{var e,i,u;return(e=t.errors)!=null&&e.length?g(t.errors):pn((u=(i=t==null?void 0:t.data)==null?void 0:i.attributesList)==null?void 0:u.items)}).catch(y),at=`
  query GET_CUSTOMER {
    customer {
      firstname
      lastname
      email
    }
  }
`,jt=async()=>await T(at,{method:"GET",cache:"force-cache"}).then(n=>{var t;return(t=n.errors)!=null&&t.length?g(n.errors):kn(n)}).catch(y),ot=`
  query GET_CUSTOMER_ORDERS_RETURN($currentPage: Int, $pageSize: Int) {
    customer {
      returns(currentPage: $currentPage, pageSize: $pageSize) {
        page_info {
          page_size
          total_pages
          current_page
        }
        ...RETURNS_FRAGMENT
      }
    }
  }
  ${Y}
  ${ln}
  ${_n}
  ${an}
  ${on}
  ${En}
  ${sn}
`,Kt=async(n=10,t=1)=>await T(ot,{method:"GET",cache:"force-cache",variables:{pageSize:n,currentPage:t}}).then(e=>{var i;return hn((i=e==null?void 0:e.data)==null?void 0:i.customer.returns)}).catch(y),st=`
  query GET_GUEST_ORDER($input: GuestOrderInformationInput!) {
    guestOrder(input: $input) {
      ...GUEST_ORDER_FRAGMENT
      returns {
        ...RETURNS_FRAGMENT
      }
    }
  }
  ${z}
  ${Y}
`,Xt=async n=>await T(st,{method:"GET",cache:"no-cache",variables:{input:n}}).then(t=>{var e;return(e=t.errors)!=null&&e.length&&t.errors[0].message==="Please login to view the order."?g(t.errors):nt(t)}).catch(y),Et=`
  query ORDER_BY_NUMBER($orderNumber: String!, $pageSize: Int) {
    customer {
      orders(filter: { number: { eq: $orderNumber } }) {
        items {
          ...CUSTOMER_ORDER_FRAGMENT
          returns(pageSize: $pageSize) {
            ...RETURNS_FRAGMENT
          }
          items_eligible_for_return {
            ...ORDER_ITEM_FRAGMENT
          }
        }
      }
    }
  }
  ${Gn}
  ${Y}
`,Rt=async({orderId:n,returnRef:t,queryType:e,returnsPageSize:i=50})=>await T(Et,{method:"GET",cache:"force-cache",variables:{orderNumber:n,pageSize:i}}).then(u=>dn(e??"orderData",u,t)).catch(y),Tt=`
  query STORE_CONFIG_QUERY {
    storeConfig {
      order_cancellation_enabled
      order_cancellation_reasons {
        description
      }
      base_media_url
      orders_invoices_credit_memos_display_price
      orders_invoices_credit_memos_display_shipping_amount
      orders_invoices_credit_memos_display_subtotal
      orders_invoices_credit_memos_display_grandtotal
      orders_invoices_credit_memos_display_full_summary
      orders_invoices_credit_memos_display_zero_tax
      sales_printed_card
      sales_gift_wrapping
    }
  }
`,Zt=async()=>T(Tt,{method:"GET",cache:"force-cache"}).then(({errors:n,data:t})=>n?g(n):it(t.storeConfig)),pt=`
  query ORDER_BY_TOKEN($token: String!) {
    guestOrderByToken(input: { token: $token }) {
      ...GUEST_ORDER_FRAGMENT
      returns(pageSize: 50) {
        ...RETURNS_FRAGMENT
      }
    }
  }
  ${z}
  ${Y}
`,gt=async(n,t)=>await T(pt,{method:"GET",cache:"no-cache",variables:{token:n}}).then(e=>{var i;return(i=e.errors)!=null&&i.length&&e.errors[0].message==="Please login to view the order."?g(e.errors):tt(e,t)}).catch(y),ft="orderData",cn=async n=>{var r;const t=typeof(n==null?void 0:n.orderRef)=="string"?n==null?void 0:n.orderRef:"",e=typeof(n==null?void 0:n.returnRef)=="string"?n==null?void 0:n.returnRef:"",i=t&&typeof(n==null?void 0:n.orderRef)=="string"&&((r=n==null?void 0:n.orderRef)==null?void 0:r.length)>20,u=(n==null?void 0:n.orderData)??null;if(u){f.emit("order/data",{...u,returnNumber:e});return}if(!t)return;const c=i?await gt(t,e):await Rt({orderId:t,returnRef:e,queryType:ft});c?f.emit("order/data",{...c,returnNumber:e}):f.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},rn={setHref:n=>{window.location.href=n}},yt=(n,t,e)=>{if(typeof n!="function")return;const i=n(e);if(!t||Object.keys(t).length===0){rn.setHref(i);return}const u=new URLSearchParams;Object.entries(t).forEach(([r,l])=>{u.append(r,String(l))});const c=i.includes("?")?"&":"?";rn.setHref(`${i}${c}${u.toString()}`)},X=new Un({init:async n=>{const t={};X.config.setConfig({...t,...n}),cn(n).catch(e=>console.error(e))},listeners:()=>[f.on("companyContext/changed",async()=>{const n=X.config.getConfig(),{orderRef:t,returnRef:e,routeOrdersList:i=()=>"/customer/orders"}=n;if(!t)return;let u,c;const r=()=>{u==null||u.off(),c==null||c.off()};u=f.on("order/data",()=>{r()}),c=f.on("order/error",l=>{(l==null?void 0:l.type)==="network"&&yt(i),r()}),await cn({orderRef:t,returnRef:e,orderData:null})})]}),U=X.config,V={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext",CHANNEL_CONTEXT:"channelContext",PERSONAL_EMAIL_CONTEXT:"personalEmail"},ht={PLACE_ORDER:"place-order"};function bn(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function W(n,t){const e=bn();e.push({[n]:null}),e.push({[n]:t})}function Ot(n){bn().push(e=>{const i=e.getState?e.getState():{};e.push({event:n,eventInfo:{...i}})})}function bt(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function mt(){W(V.CHANNEL_CONTEXT,bt())}function J(n,t){const e=qn(t),i=wn(n,t);W(V.ORDER_CONTEXT,{...e}),W(V.SHOPPING_CART_CONTEXT,{...i}),W(V.PERSONAL_EMAIL_CONTEXT,{address:t.email}),mt(),Ot(ht.PLACE_ORDER)}class Nt extends Error{constructor(t){super(t),this.name="PlaceOrderError"}}const I=n=>{const t=n.map(e=>e.message).join(" ");throw new Nt(t)},At=`
  mutation PLACE_ORDER_MUTATION($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      ...PLACE_ORDER_FRAGMENT
    }
  }

  ${Rn}
`,mn=async()=>{const n=await Nn();n&&ct("X-ReCaptcha",n)},Dt=async n=>{if(!n)throw new Error("No cart ID found");return await mn(),T(At,{method:"POST",variables:{cartId:n}}).then(t=>{var i,u,c,r,l;(i=t.errors)!=null&&i.length&&g(t.errors),(r=(c=(u=t.data)==null?void 0:u.placeOrder)==null?void 0:c.errors)!=null&&r.length&&I((l=t.data.placeOrder)==null?void 0:l.errors);const e=On(t);return e&&(f.emit("order/placed",e),f.emit("cart/reset",void 0),J(n,e)),e}).catch(y)},vt=`
  mutation REORDER_ITEMS_MUTATION($orderNumber: String!) {
    reorderItems(orderNumber: $orderNumber) {
      cart {
        itemsV2 {
          items {
            uid
          }
        }
      }
      userInputErrors {
        code
        message
        path
      }
    }
  }
`,Jt=async n=>await T(vt,{method:"POST",variables:{orderNumber:n}}).then(t=>{var u,c,r,l,_,a;if((u=t.errors)!=null&&u.length)return g(t.errors);const e=!!((l=(r=(c=t==null?void 0:t.data)==null?void 0:c.reorderItems)==null?void 0:r.cart)!=null&&l.itemsV2.items.length),i=((a=(_=t==null?void 0:t.data)==null?void 0:_.reorderItems)==null?void 0:a.userInputErrors)??[];return{success:e,userInputErrors:i}}).catch(y),St=`
  mutation REQUEST_GUEST_ORDER_CANCEL_MUTATION(
    $token: String!
    $reason: String!
  ) {
    requestGuestOrderCancel(input: { token: $token, reason: $reason }) {
      error
      order {
        ...GUEST_ORDER_FRAGMENT
      }
    }
  }
  ${z}
`,It=async(n,t,e,i)=>{if(!n)throw new Error("No order token found");if(!t)throw new Error("No reason found");return T(St,{variables:{token:n,reason:t}}).then(({errors:u,data:c})=>{if(u)return g(u);c.requestGuestOrderCancel.error!=null&&i();const r=m(c.requestGuestOrderCancel.order);e(r)}).catch(()=>i())},Ct=`
  mutation REQUEST_RETURN_ORDER($input: RequestReturnInput!) {
    requestReturn(input: $input) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
      }
    }
  }
  ${Z}
`,dt=async n=>{const t=B(n,"snakeCase",{});return await T(Ct,{method:"POST",variables:{input:t}}).then(e=>{var i;return(i=e.errors)!=null&&i.length?g(e.errors):ut(e)}).catch(y)},Gt=`
  mutation REQUEST_RETURN_GUEST_ORDER($input: RequestGuestReturnInput!) {
    requestGuestReturn(input: $input) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
      }
    }
  }
  ${Z}
`,ne=async n=>{const t=B(n,"snakeCase",{});return await T(Gt,{method:"POST",variables:{input:t}}).then(e=>{var c;if((c=e.errors)!=null&&c.length)return g(e.errors);const{created_at:i,...u}=e.data.requestGuestReturn.return;return{...u,createdAt:i}}).catch(y)},Mt=`
  mutation CONFIRM_RETURN_GUEST_ORDER(
    $orderId: ID!
    $confirmationKey: String!
  ) {
    confirmReturn(
      input: { order_id: $orderId, confirmation_key: $confirmationKey }
    ) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
        order {
          ...GUEST_ORDER_FRAGMENT
        }
      }
    }
  }
  ${Z}
  ${z}
`,te=async(n,t)=>await T(Mt,{method:"POST",variables:{orderId:n,confirmationKey:t}}).then(e=>{var i,u,c,r,l,_,a;if((i=e.errors)!=null&&i.length)return g(e.errors);if((r=(c=(u=e==null?void 0:e.data)==null?void 0:u.confirmReturn)==null?void 0:c.return)!=null&&r.order){const o=m((a=(_=(l=e==null?void 0:e.data)==null?void 0:l.confirmReturn)==null?void 0:_.return)==null?void 0:a.order);return f.emit("order/data",o),o}return null}).catch(y),Ut=`
  mutation CONFIRM_CANCEL_ORDER_MUTATION(
    $orderId: ID!
    $confirmationKey: String!
  ) {
    confirmCancelOrder(
      input: { order_id: $orderId, confirmation_key: $confirmationKey }
    ) {
      order {
        ...GUEST_ORDER_FRAGMENT
      }
      errorV2 {
        message
        code
      }
    }
  }
  ${z}
`,ee=async(n,t)=>T(Ut,{variables:{orderId:n,confirmationKey:t}}).then(async({errors:e,data:i})=>{var r,l,_,a;const u=[...(r=i==null?void 0:i.confirmCancelOrder)!=null&&r.errorV2?[(l=i==null?void 0:i.confirmCancelOrder)==null?void 0:l.errorV2]:[],...e??[]];let c=null;return(_=i==null?void 0:i.confirmCancelOrder)!=null&&_.order&&(c=m((a=i==null?void 0:i.confirmCancelOrder)==null?void 0:a.order),f.emit("order/data",c)),u.length>0?g(u):c}),xt=`
  mutation setPaymentMethodAndPlaceOrder($cartId: String!, $paymentMethod: PaymentMethodInput!) {
    setPaymentMethodOnCart(
      input: {
        cart_id: $cartId
        payment_method: $paymentMethod
      }
    ) {
      cart {
        selected_payment_method {
          code
          title
        }
      }
    }
    placeOrder(input: { cart_id: $cartId }) {
      ...PLACE_ORDER_FRAGMENT
    }
  }

  ${Rn}
`,ie=async(n,t)=>{if(!n)throw new Error("No cart ID found");if(!t)throw new Error("No payment method found");return T(xt,{variables:{cartId:n,paymentMethod:t}}).then(e=>{var u,c,r,l,_,a;(u=e.errors)!=null&&u.length&&g(e.errors),(l=(r=(c=e.data)==null?void 0:c.placeOrder)==null?void 0:r.errors)!=null&&l.length&&I((_=e.data.placeOrder)==null?void 0:_.errors);const i=On({data:{placeOrder:(a=e.data)==null?void 0:a.placeOrder}});return i&&(f.emit("order/placed",i),f.emit("cart/reset",void 0),J(n,i)),i}).catch(y)},$t=`
  mutation PLACE_NEGOTIABLE_QUOTE_ORDER_MUTATION($quoteUid: ID!) {
    placeNegotiableQuoteOrderV2(input: { quote_uid: $quoteUid }) {
      ...PLACE_NEGOTIABLE_QUOTE_ORDER_FRAGMENT
    }
  }

  ${Mn}
`,ue=async n=>{if(!n)throw new Error("No quote UID found");return await mn(),T($t,{method:"POST",variables:{quoteUid:n}}).then(t=>{var i,u,c,r,l;(i=t.errors)!=null&&i.length&&g(t.errors),(r=(c=(u=t.data)==null?void 0:u.placeNegotiableQuoteOrderV2)==null?void 0:c.errors)!=null&&r.length&&I((l=t.data.placeNegotiableQuoteOrderV2)==null?void 0:l.errors);const e=et(t);return e&&(f.emit("order/placed",e),J(n,e)),e}).catch(y)};export{Tn as c,Qt as cancelOrder,U as config,ee as confirmCancelOrder,te as confirmGuestReturn,T as fetchGraphQl,Wt as getAttributesForm,Yt as getAttributesList,Vt as getConfig,jt as getCustomer,Kt as getCustomerOrdersReturn,Xt as getGuestOrder,Rt as getOrderDetailsById,Zt as getStoreConfig,gt as guestOrderByToken,X as initialize,ue as placeNegotiableQuoteOrder,Dt as placeOrder,yt as r,zt as removeFetchGraphQlHeader,Jt as reorderItems,It as requestGuestOrderCancel,ne as requestGuestReturn,dt as requestReturn,Bt as setEndpoint,ct as setFetchGraphQlHeader,Ht as setFetchGraphQlHeaders,ie as setPaymentMethodAndPlaceOrder,Pt as t};
//# sourceMappingURL=api.js.map
