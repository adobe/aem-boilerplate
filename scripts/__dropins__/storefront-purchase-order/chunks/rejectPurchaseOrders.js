/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as O,h as d}from"./fetch-graphql.js";import{h as nn}from"./fetch-error.js";const cn=`
  fragment PURCHASE_ORDER_QUOTE_FRAGMENT on Cart {
    __typename
    id
    email
    is_virtual
    total_quantity
    applied_coupons {
      code
    }
    applied_gift_cards {
      code
      applied_balance {
        value
        currency
      }
      current_balance {
        value
        currency
      }
      expiration_date
    }
    applied_reward_points {
      money {
        value
        currency
      }
      points
    }
    applied_store_credit {
      applied_balance {
        value
        currency
      }
      current_balance {
        value
        currency
      }
    }
    available_gift_wrappings {
      uid
      design
      price {
        value
        currency
      }
      image {
        url
        label
      }
    }
    gift_message {
      from
      to
      message
    }
    gift_receipt_included
    gift_wrapping {
      uid
      design
      price {
        value
        currency
      }
      image {
        url
        label
      }
    }
    printed_card_included
    available_payment_methods {
      code
      title
      is_deferred
    }
    selected_payment_method {
      code
      title
    }
    billing_address {
      city
      company
      country {
        code
        label
      }
      firstname
      lastname
      postcode
      region {
        code
        label
      }
      street
      telephone
      custom_attributes {
        code
      }
      fax
      id
      middlename
      prefix
      suffix
      uid
      vat_id
    }
    shipping_addresses {
      city
      company
      country {
        code
        label
      }
      firstname
      lastname
      postcode
      region {
        code
        label
      }
      street
      telephone
      custom_attributes {
        code
      }
      fax
      id
      middlename
      prefix
      suffix
      uid
      vat_id
      available_shipping_methods {
        amount {
          value
          currency
        }
        carrier_code
        carrier_title
        method_code
        method_title
      }
      selected_shipping_method {
        amount {
          value
          currency
        }
        carrier_code
        carrier_title
        method_code
        method_title
      }
    }
    rules {
      uid
    }
    itemsV2(pageSize: 100, currentPage: 1) {
      items {
        uid
        quantity
        product {
          __typename
          uid
          name
          sku
          url_key
          canonical_url
          stock_status
          only_x_left_in_stock
          image {
            url
            label
          }
          small_image {
            url
            label
          }
          thumbnail {
            url
            label
          }
          price_range {
            maximum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
            }
          }
        }
        prices {
          price {
            value
            currency
          }
          price_including_tax {
            value
            currency
          }
          original_item_price {
            value
            currency
          }
          original_row_total {
            value
            currency
          }
          row_total {
            value
            currency
          }
          row_total_including_tax {
            value
            currency
          }
          total_item_discount {
            value
            currency
          }
          discounts {
            label
            amount {
              value
              currency
            }
          }
          fixed_product_taxes {
            label
            amount {
              value
              currency
            }
          }
        }
        ... on SimpleCartItem {
          customizable_options {
            label
            values {
              label
              value
            }
          }
        }
        ... on ConfigurableCartItem {
          configurable_options {
            option_label
            value_label
          }
        }
        ... on BundleCartItem {
          bundle_options {
            uid
            label
            type
            values {
              uid
              label
              quantity
            }
          }
        }
        ... on DownloadableCartItem {
          links {
            uid
            title
          }
        }
        ... on GiftCardCartItem {
          sender_name
          sender_email
          recipient_name
          recipient_email
          message
          amount {
            value
            currency
          }
        }
        errors {
          code
          message
        }
        is_available
        max_qty
        min_qty
        not_available_message
        note_from_buyer {
          note_uid
          note
          created_at
        }
        note_from_seller {
          note_uid
          note
          created_at
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
    prices {
      grand_total {
        value
        currency
      }
      grand_total_excluding_tax {
        value
        currency
      }
      subtotal_excluding_tax {
        value
        currency
      }
      subtotal_including_tax {
        value
        currency
      }
      subtotal_with_discount_excluding_tax {
        value
        currency
      }
      applied_taxes {
        label
        amount {
          value
          currency
        }
      }
      discounts {
        label
        amount {
          value
          currency
        }
      }
      gift_options {
        gift_wrapping_for_items {
          value
          currency
        }
        gift_wrapping_for_items_incl_tax {
          value
          currency
        }
        gift_wrapping_for_order {
          value
          currency
        }
        gift_wrapping_for_order_incl_tax {
          value
          currency
        }
        printed_card {
          value
          currency
        }
        printed_card_incl_tax {
          value
          currency
        }
      }
    }
  }
`,ln=`
  fragment PURCHASE_ORDERS_FRAGMENT on PurchaseOrder {
    __typename
    uid
    number
    status
    available_actions
    approval_flow {
      events {
        name
        role
        message
        status
        updated_at
      }
      rule_name
    }
    comments {
      created_at
      author {
        firstname
        lastname
        email
      }
      text
    }
    created_at
    updated_at
    created_by {
      firstname
      lastname
      email
    }
    history_log {
      message
      created_at
      activity
      __typename
      uid
    }
    order {
      number
    }
    quote {
      ...PURCHASE_ORDER_QUOTE_FRAGMENT
    }
  }
  ${cn}
`,an=l=>{var A,t,y,E,R,b,v,I;return{typename:(l==null?void 0:l.__typename)??"",uid:(l==null?void 0:l.uid)??"",number:(l==null?void 0:l.number)??"",status:(l==null?void 0:l.status)??"",availableActions:(l==null?void 0:l.available_actions)??[],approvalFlow:(A=l==null?void 0:l.approval_flow)!=null&&A.length?l.approval_flow.map(i=>{var x;return{ruleName:(i==null?void 0:i.rule_name)??"",events:((x=i==null?void 0:i.events)==null?void 0:x.map(c=>({message:(c==null?void 0:c.message)??"",name:(c==null?void 0:c.name)??"",role:(c==null?void 0:c.role)??"",status:(c==null?void 0:c.status)??"",updatedAt:(c==null?void 0:c.updated_at)??""})))??[]}}):[],comments:((t=l==null?void 0:l.comments)==null?void 0:t.map(i=>{var x,c,T;return{uid:(i==null?void 0:i.uid)??"",createdAt:(i==null?void 0:i.created_at)??"",author:{firstname:((x=i==null?void 0:i.author)==null?void 0:x.firstname)??"",lastname:((c=i==null?void 0:i.author)==null?void 0:c.lastname)??"",email:((T=i==null?void 0:i.author)==null?void 0:T.email)??""},text:(i==null?void 0:i.text)??""}}))??[],createdAt:(l==null?void 0:l.created_at)??"",updatedAt:(l==null?void 0:l.updated_at)??"",createdBy:{firstname:((y=l==null?void 0:l.created_by)==null?void 0:y.firstname)??"",lastname:((E=l==null?void 0:l.created_by)==null?void 0:E.lastname)??"",email:((R=l==null?void 0:l.created_by)==null?void 0:R.email)??""},historyLog:((b=l==null?void 0:l.history_log)==null?void 0:b.map(i=>({activity:(i==null?void 0:i.activity)??"",createdAt:(i==null?void 0:i.created_at)??"",message:(i==null?void 0:i.message)??"",uid:(i==null?void 0:i.uid)??""})))??[],quote:tn(l==null?void 0:l.quote),order:{id:((v=l==null?void 0:l.order)==null?void 0:v.id)??"",orderNumber:((I=l==null?void 0:l.order)==null?void 0:I.number)??""}}};function tn(l){var k,F,Q,H,W,$,j,B,V,z,L,J,K;if(!l)return null;const f=n=>n||0,A=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),t=n=>{var r,o,m,s;const{firstName:a,lastName:e,middleName:_}=A(n);return{firstName:a,lastName:e,middleName:_,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:((r=n==null?void 0:n.country)==null?void 0:r.label)??"",countryCode:((o=n==null?void 0:n.country)==null?void 0:o.code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:((m=n==null?void 0:n.region)==null?void 0:m.label)??"",regionId:((s=n==null?void 0:n.region)==null?void 0:s.code)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},y=n=>{var a,e,_,r,o,m,s,D,S,U;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((_=(e=(a=n==null?void 0:n.price_range)==null?void 0:a.maximum_price)==null?void 0:e.regular_price)==null?void 0:_.currency)??"",value:((m=(o=(r=n==null?void 0:n.price_range)==null?void 0:r.maximum_price)==null?void 0:o.regular_price)==null?void 0:m.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((s=n==null?void 0:n.image)==null?void 0:s.url)||"",imageAlt:((D=n==null?void 0:n.image)==null?void 0:D.label)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((S=n==null?void 0:n.thumbnail)==null?void 0:S.label)||"",url:((U=n==null?void 0:n.thumbnail)==null?void 0:U.url)||""}}},E=n=>{if(!n||!("configurable_options"in n))return;const a={};for(const e of n.configurable_options)a[e.option_label]=e.value_label;return a},R=n=>{const a=n==null?void 0:n.map(_=>({uid:_.uid,label:_.label,values:_.values.map(r=>r.product_name).join(", ")})),e={};return a==null||a.forEach(_=>{e[_.label]=_.values}),Object.keys(e).length>0?e:null},b=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(a=>a.title).join(", ")}:null,v=n=>{var a,e,_,r,o;return{senderName:((a=n==null?void 0:n.gift_card)==null?void 0:a.sender_name)||"",senderEmail:((e=n==null?void 0:n.gift_card)==null?void 0:e.sender_email)||"",recipientEmail:((_=n==null?void 0:n.gift_card)==null?void 0:_.recipient_email)||"",recipientName:((r=n==null?void 0:n.gift_card)==null?void 0:r.recipient_name)||"",message:((o=n==null?void 0:n.gift_card)==null?void 0:o.message)||""}},I=n=>{var a,e,_;return{senderName:((a=n==null?void 0:n.gift_message)==null?void 0:a.from)??"",recipientName:((e=n==null?void 0:n.gift_message)==null?void 0:e.to)??"",message:((_=n==null?void 0:n.gift_message)==null?void 0:_.message)??""}},i=n=>{var a,e,_,r,o,m,s,D,S,U,P;return{design:((a=n==null?void 0:n.gift_wrapping)==null?void 0:a.design)??"",uid:((e=n==null?void 0:n.gift_wrapping)==null?void 0:e.uid)??"",selected:!!((_=n==null?void 0:n.gift_wrapping)!=null&&_.uid),image:{url:((o=(r=n==null?void 0:n.gift_wrapping)==null?void 0:r.image)==null?void 0:o.url)??"",label:((s=(m=n==null?void 0:n.gift_wrapping)==null?void 0:m.image)==null?void 0:s.label)??""},price:{currency:((S=(D=n==null?void 0:n.gift_wrapping)==null?void 0:D.price)==null?void 0:S.currency)??"USD",value:((P=(U=n==null?void 0:n.gift_wrapping)==null?void 0:U.price)==null?void 0:P.value)??0}}},x=n=>({currency:(n==null?void 0:n.currency)??"USD",value:(n==null?void 0:n.value)??0}),c=(n,a)=>{const e=n==null?void 0:n.price,_=n==null?void 0:n.priceIncludingTax,r=n==null?void 0:n.originalPrice,o=!1,m=o?r==null?void 0:r.value:_==null?void 0:_.value,s={originalPrice:r,baseOriginalPrice:{value:m,currency:r==null?void 0:r.currency},baseDiscountedPrice:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency},baseExcludingTax:{value:e==null?void 0:e.value,currency:e==null?void 0:e.currency}},D={originalPrice:r,baseOriginalPrice:{value:r==null?void 0:r.value,currency:_==null?void 0:_.currency},baseDiscountedPrice:{value:a==null?void 0:a.value,currency:e==null?void 0:e.currency},baseExcludingTax:{value:e==null?void 0:e.value,currency:e==null?void 0:e.currency}},S={singleItemPrice:{value:o?r.value:_.value,currency:_.currency},baseOriginalPrice:{value:m,currency:_.currency},baseDiscountedPrice:{value:_.value,currency:_.currency}};return{includeAndExcludeTax:s,excludeTax:D,includeTax:S}},T=n=>{var s,D,S,U,P,M,X,Y,Z,h,q;const a=n==null?void 0:n.product,e=n==null?void 0:n.prices,_=f(n==null?void 0:n.quantity),r={price:(e==null?void 0:e.price)??{value:0,currency:"USD"},priceIncludingTax:(e==null?void 0:e.price_including_tax)??{value:0,currency:"USD"},originalPrice:(e==null?void 0:e.original_item_price)??{value:0,currency:"USD"},originalPriceIncludingTax:(e==null?void 0:e.original_item_price)??{value:0,currency:"USD"},discounts:(e==null?void 0:e.discounts)??[]},o=(((s=e==null?void 0:e.original_item_price)==null?void 0:s.value)??0)>(((D=e==null?void 0:e.price)==null?void 0:D.value)??0),m=(e==null?void 0:e.price)??{value:0,currency:"USD"};return{giftMessage:I(n),giftWrappingPrice:x((S=n==null?void 0:n.gift_wrapping)==null?void 0:S.price),productGiftWrapping:[i(n)],taxCalculations:c(r,m),productSalePrice:m,status:n!=null&&n.is_available?"available":"unavailable",currentReturnOrderQuantity:0,eligibleForReturn:!1,productSku:(a==null?void 0:a.sku)??"",type:(a==null?void 0:a.__typename)??"",discounted:o,id:(n==null?void 0:n.uid)??"",productName:(a==null?void 0:a.name)??"",productUrlKey:(a==null?void 0:a.url_key)??"",regularPrice:{value:((M=(P=(U=a==null?void 0:a.price_range)==null?void 0:U.maximum_price)==null?void 0:P.regular_price)==null?void 0:M.value)??0,currency:((Z=(Y=(X=a==null?void 0:a.price_range)==null?void 0:X.maximum_price)==null?void 0:Y.regular_price)==null?void 0:Z.currency)??"USD"},price:m,product:y(a),selectedOptions:(n==null?void 0:n.customizable_options)??[],thumbnail:{label:((h=a==null?void 0:a.thumbnail)==null?void 0:h.label)||"",url:((q=a==null?void 0:a.thumbnail)==null?void 0:q.url)||""},downloadableLinks:(a==null?void 0:a.__typename)==="DownloadableProduct"&&(n!=null&&n.downloadable_links)?b(n.downloadable_links):null,prices:r,itemPrices:r,bundleOptions:(a==null?void 0:a.__typename)==="BundleProduct"&&(n!=null&&n.bundle_options)?R(n.bundle_options):null,totalInclTax:(e==null?void 0:e.row_total_including_tax)??{value:0,currency:"USD"},priceInclTax:(e==null?void 0:e.price_including_tax)??{value:0,currency:"USD"},total:(e==null?void 0:e.row_total)??{value:0,currency:"USD"},configurableOptions:(a==null?void 0:a.__typename)==="ConfigurableProduct"?E(n):void 0,giftCard:(a==null?void 0:a.__typename)==="GiftCardProduct"?v(n):void 0,quantityCanceled:0,quantityInvoiced:0,quantityOrdered:_,quantityRefunded:0,quantityReturned:0,quantityShipped:0,requestQuantity:0,totalQuantity:_,returnableQuantity:0,quantityReturnRequested:0}},en=n=>({giftWrappingForItems:(n==null?void 0:n.gift_wrapping_for_items)??{value:0,currency:"USD"},giftWrappingForItemsInclTax:(n==null?void 0:n.gift_wrapping_for_items_incl_tax)??{value:0,currency:"USD"},giftWrappingForOrder:(n==null?void 0:n.gift_wrapping_for_order)??{value:0,currency:"USD"},giftWrappingForOrderInclTax:(n==null?void 0:n.gift_wrapping_for_order_incl_tax)??{value:0,currency:"USD"},printedCard:(n==null?void 0:n.printed_card)??{value:0,currency:"USD"},printedCardInclTax:(n==null?void 0:n.printed_card_incl_tax)??{value:0,currency:"USD"}}),_n=(n=[])=>!n||n.length===0?[]:n.map(a=>{var e,_;return{code:(a==null?void 0:a.code)??"",appliedBalance:{value:((e=a==null?void 0:a.applied_balance)==null?void 0:e.value)??0,currency:((_=a==null?void 0:a.applied_balance)==null?void 0:_.currency)??"USD"}}}),rn=(n=[])=>!n||n.length===0?[]:n.map(a=>{var e,_;return{amount:{value:((e=a==null?void 0:a.amount)==null?void 0:e.value)??0,currency:((_=a==null?void 0:a.amount)==null?void 0:_.currency)??"USD"},rate:(a==null?void 0:a.rate)??0,title:(a==null?void 0:a.title)??(a==null?void 0:a.label)??""}}),p=(k=l==null?void 0:l.shipping_addresses)==null?void 0:k[0],N=l==null?void 0:l.billing_address,g=p==null?void 0:p.selected_shipping_method,w=l==null?void 0:l.selected_payment_method,u=l==null?void 0:l.prices,C=((Q=(F=l==null?void 0:l.itemsV2)==null?void 0:F.items)==null?void 0:Q.map(T))??[],un=C.reduce((n,a)=>n+a.totalQuantity,0),G=g?`${g.carrier_title??""} - ${g.method_title??""}`.trim():"";return{giftReceiptIncluded:(l==null?void 0:l.gift_receipt_included)??!1,printedCardIncluded:(l==null?void 0:l.printed_card_included)??!1,giftWrappingOrder:{price:{value:((W=(H=l==null?void 0:l.gift_wrapping)==null?void 0:H.price)==null?void 0:W.value)??0,currency:((j=($=l==null?void 0:l.gift_wrapping)==null?void 0:$.price)==null?void 0:j.currency)??"USD"},uid:((B=l==null?void 0:l.gift_wrapping)==null?void 0:B.uid)??""},placeholderImage:"",returnNumber:void 0,id:(l==null?void 0:l.id)??"",orderStatusChangeDate:void 0,number:"",email:(l==null?void 0:l.email)??"",token:void 0,status:"pending",isVirtual:(l==null?void 0:l.is_virtual)??!1,totalQuantity:un,shippingMethod:G,carrier:(g==null?void 0:g.carrier_code)??"",orderDate:"",returns:[],discounts:(u==null?void 0:u.discounts)??[],coupons:(l==null?void 0:l.applied_coupons)??[],payments:[{code:(w==null?void 0:w.code)??"",name:(w==null?void 0:w.title)??""}],shipping:{code:G,amount:((V=g==null?void 0:g.amount)==null?void 0:V.value)??0,currency:((z=g==null?void 0:g.amount)==null?void 0:z.currency)??"USD"},shipments:[],items:C,totalGiftCard:{value:0,currency:"USD"},grandTotal:(u==null?void 0:u.grand_total)??{value:0,currency:"USD"},totalShipping:(g==null?void 0:g.amount)??{value:0,currency:"USD"},subtotalExclTax:(u==null?void 0:u.subtotal_excluding_tax)??{value:0,currency:"USD"},subtotalInclTax:(u==null?void 0:u.subtotal_including_tax)??{value:0,currency:"USD"},totalTax:{value:(((L=u==null?void 0:u.grand_total)==null?void 0:L.value)??0)-(((J=u==null?void 0:u.grand_total_excluding_tax)==null?void 0:J.value)??0),currency:((K=u==null?void 0:u.grand_total)==null?void 0:K.currency)??"USD"},shippingAddress:p?t(p):null,totalGiftOptions:en(u==null?void 0:u.gift_options),billingAddress:N?t(N):null,availableActions:[],taxes:rn(u==null?void 0:u.applied_taxes),appliedGiftCards:_n(l==null?void 0:l.applied_gift_cards)}}const yn=`
  mutation APPROVE_PURCHASE_ORDERS($input: PurchaseOrdersActionInput!) {
    approvePurchaseOrders(input: $input) {
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
      errors {
        message
        type
      }
    }
  }
  ${ln}
`,bn=async l=>{const f=Array.isArray(l)?l:[l];if(!f||f.length===0)throw new Error("Purchase Order UID(s) are required");if(f.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return O(yn,{variables:{input:{purchase_order_uids:f}}}).then(t=>{var E,R,b;(E=t.errors)!=null&&E.length&&nn(t.errors);const y=(R=t.data)==null?void 0:R.approvePurchaseOrders;if(!y)throw new Error("Failed to approve purchase orders");return{errors:((y==null?void 0:y.errors)??[]).map(v=>({message:(v==null?void 0:v.message)??"",type:(v==null?void 0:v.type)??""})),purchaseOrders:((b=y==null?void 0:y.purchase_orders)==null?void 0:b.map(v=>an(v)))??[]}}).catch(d)},on=`
  mutation REJECT_PURCHASE_ORDERS($input: PurchaseOrdersActionInput!) {
    rejectPurchaseOrders(input: $input) {
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
      errors {
        message
        type
      }
    }
  }
  ${ln}
`,vn=async l=>{const f=Array.isArray(l)?l:[l];if(!f||f.length===0)throw new Error("Purchase Order UID(s) are required");if(f.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return O(on,{variables:{input:{purchase_order_uids:f}}}).then(t=>{var E,R;(E=t.errors)!=null&&E.length&&nn(t.errors);const y=(R=t.data)==null?void 0:R.rejectPurchaseOrders;return{errors:((y==null?void 0:y.errors)??[]).map(b=>({message:(b==null?void 0:b.message)??"",type:(b==null?void 0:b.type)??""})),purchaseOrders:((y==null?void 0:y.purchase_orders)??[]).map(an)}}).catch(d)};export{ln as P,bn as a,vn as r,an as t};
//# sourceMappingURL=rejectPurchaseOrders.js.map
