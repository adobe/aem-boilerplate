/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as ln,h as an}from"./fetch-graphql.js";import{h as en}from"./fetch-error.js";const on=`
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
`,_n=`
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
  ${on}
`,rn=l=>{var A,t,y,E,R,b,v,T;return{typename:(l==null?void 0:l.__typename)??"",uid:(l==null?void 0:l.uid)??"",number:(l==null?void 0:l.number)??"",status:(l==null?void 0:l.status)??"",availableActions:(l==null?void 0:l.available_actions)??[],approvalFlow:(A=l==null?void 0:l.approval_flow)!=null&&A.length?l.approval_flow.map(i=>{var x;return{ruleName:(i==null?void 0:i.rule_name)??"",events:((x=i==null?void 0:i.events)==null?void 0:x.map(c=>({message:(c==null?void 0:c.message)??"",name:(c==null?void 0:c.name)??"",role:(c==null?void 0:c.role)??"",status:(c==null?void 0:c.status)??"",updatedAt:(c==null?void 0:c.updated_at)??""})))??[]}}):[],comments:((t=l==null?void 0:l.comments)==null?void 0:t.map(i=>{var x,c,I;return{uid:(i==null?void 0:i.uid)??"",createdAt:(i==null?void 0:i.created_at)??"",author:{firstname:((x=i==null?void 0:i.author)==null?void 0:x.firstname)??"",lastname:((c=i==null?void 0:i.author)==null?void 0:c.lastname)??"",email:((I=i==null?void 0:i.author)==null?void 0:I.email)??""},text:(i==null?void 0:i.text)??""}}))??[],createdAt:(l==null?void 0:l.created_at)??"",updatedAt:(l==null?void 0:l.updated_at)??"",createdBy:{firstname:((y=l==null?void 0:l.created_by)==null?void 0:y.firstname)??"",lastname:((E=l==null?void 0:l.created_by)==null?void 0:E.lastname)??"",email:((R=l==null?void 0:l.created_by)==null?void 0:R.email)??""},historyLog:((b=l==null?void 0:l.history_log)==null?void 0:b.map(i=>({activity:(i==null?void 0:i.activity)??"",createdAt:(i==null?void 0:i.created_at)??"",message:(i==null?void 0:i.message)??"",uid:(i==null?void 0:i.uid)??""})))??[],quote:gn(l==null?void 0:l.quote),order:{id:((v=l==null?void 0:l.order)==null?void 0:v.id)??"",orderNumber:((T=l==null?void 0:l.order)==null?void 0:T.number)??""}}};function gn(l){var F,Q,H,B,W,$,j,V,z,L,J,K,M,X,h;if(!l)return null;const f=n=>n||0,A=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),t=n=>{var u,o,m,s;const{firstName:a,lastName:e,middleName:_}=A(n);return{firstName:a,lastName:e,middleName:_,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:((u=n==null?void 0:n.country)==null?void 0:u.label)??"",countryCode:((o=n==null?void 0:n.country)==null?void 0:o.code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:((m=n==null?void 0:n.region)==null?void 0:m.label)??"",regionId:((s=n==null?void 0:n.region)==null?void 0:s.code)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},y=n=>{var a,e,_,u,o,m,s,D,S,U;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((_=(e=(a=n==null?void 0:n.price_range)==null?void 0:a.maximum_price)==null?void 0:e.regular_price)==null?void 0:_.currency)??"",value:((m=(o=(u=n==null?void 0:n.price_range)==null?void 0:u.maximum_price)==null?void 0:o.regular_price)==null?void 0:m.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((s=n==null?void 0:n.image)==null?void 0:s.url)||"",imageAlt:((D=n==null?void 0:n.image)==null?void 0:D.label)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((S=n==null?void 0:n.thumbnail)==null?void 0:S.label)||"",url:((U=n==null?void 0:n.thumbnail)==null?void 0:U.url)||""}}},E=n=>{if(!n||!("configurable_options"in n))return;const a={};for(const e of n.configurable_options)a[e.option_label]=e.value_label;return a},R=n=>{const a=n==null?void 0:n.map(_=>({uid:_.uid,label:_.label,values:_.values.map(u=>u.product_name).join(", ")})),e={};return a==null||a.forEach(_=>{e[_.label]=_.values}),Object.keys(e).length>0?e:null},b=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(a=>a.title).join(", ")}:null,v=n=>{var a,e,_,u,o;return{senderName:((a=n==null?void 0:n.gift_card)==null?void 0:a.sender_name)||"",senderEmail:((e=n==null?void 0:n.gift_card)==null?void 0:e.sender_email)||"",recipientEmail:((_=n==null?void 0:n.gift_card)==null?void 0:_.recipient_email)||"",recipientName:((u=n==null?void 0:n.gift_card)==null?void 0:u.recipient_name)||"",message:((o=n==null?void 0:n.gift_card)==null?void 0:o.message)||""}},T=n=>{var a,e,_;return{senderName:((a=n==null?void 0:n.gift_message)==null?void 0:a.from)??"",recipientName:((e=n==null?void 0:n.gift_message)==null?void 0:e.to)??"",message:((_=n==null?void 0:n.gift_message)==null?void 0:_.message)??""}},i=n=>{var a,e,_,u,o,m,s,D,S,U,P;return{design:((a=n==null?void 0:n.gift_wrapping)==null?void 0:a.design)??"",uid:((e=n==null?void 0:n.gift_wrapping)==null?void 0:e.uid)??"",selected:!!((_=n==null?void 0:n.gift_wrapping)!=null&&_.uid),image:{url:((o=(u=n==null?void 0:n.gift_wrapping)==null?void 0:u.image)==null?void 0:o.url)??"",label:((s=(m=n==null?void 0:n.gift_wrapping)==null?void 0:m.image)==null?void 0:s.label)??""},price:{currency:((S=(D=n==null?void 0:n.gift_wrapping)==null?void 0:D.price)==null?void 0:S.currency)??"USD",value:((P=(U=n==null?void 0:n.gift_wrapping)==null?void 0:U.price)==null?void 0:P.value)??0}}},x=n=>({currency:(n==null?void 0:n.currency)??"USD",value:(n==null?void 0:n.value)??0}),c=(n,a)=>{const e=n==null?void 0:n.price,_=n==null?void 0:n.priceIncludingTax,u=n==null?void 0:n.originalPrice,o=!1,m=o?u==null?void 0:u.value:_==null?void 0:_.value,s={originalPrice:u,baseOriginalPrice:{value:m,currency:u==null?void 0:u.currency},baseDiscountedPrice:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency},baseExcludingTax:{value:e==null?void 0:e.value,currency:e==null?void 0:e.currency}},D={originalPrice:u,baseOriginalPrice:{value:u==null?void 0:u.value,currency:_==null?void 0:_.currency},baseDiscountedPrice:{value:a==null?void 0:a.value,currency:e==null?void 0:e.currency},baseExcludingTax:{value:e==null?void 0:e.value,currency:e==null?void 0:e.currency}},S={singleItemPrice:{value:o?u.value:_.value,currency:_.currency},baseOriginalPrice:{value:m,currency:_.currency},baseDiscountedPrice:{value:_.value,currency:_.currency}};return{includeAndExcludeTax:s,excludeTax:D,includeTax:S}},I=n=>{var s,D,S,U,P,Y,Z,q,O,d,nn;const a=n==null?void 0:n.product,e=n==null?void 0:n.prices,_=f(n==null?void 0:n.quantity),u={price:(e==null?void 0:e.price)??{value:0,currency:"USD"},priceIncludingTax:(e==null?void 0:e.price_including_tax)??{value:0,currency:"USD"},originalPrice:(e==null?void 0:e.original_item_price)??{value:0,currency:"USD"},originalPriceIncludingTax:(e==null?void 0:e.original_item_price)??{value:0,currency:"USD"},discounts:(e==null?void 0:e.discounts)??[]},o=(((s=e==null?void 0:e.original_item_price)==null?void 0:s.value)??0)>(((D=e==null?void 0:e.price)==null?void 0:D.value)??0),m=(e==null?void 0:e.price)??{value:0,currency:"USD"};return{giftMessage:T(n),giftWrappingPrice:x((S=n==null?void 0:n.gift_wrapping)==null?void 0:S.price),productGiftWrapping:[i(n)],taxCalculations:c(u,m),productSalePrice:m,status:n!=null&&n.is_available?"available":"unavailable",currentReturnOrderQuantity:0,eligibleForReturn:!1,productSku:(a==null?void 0:a.sku)??"",type:(a==null?void 0:a.__typename)??"",discounted:o,id:(n==null?void 0:n.uid)??"",productName:(a==null?void 0:a.name)??"",productUrlKey:(a==null?void 0:a.url_key)??"",regularPrice:{value:((Y=(P=(U=a==null?void 0:a.price_range)==null?void 0:U.maximum_price)==null?void 0:P.regular_price)==null?void 0:Y.value)??0,currency:((O=(q=(Z=a==null?void 0:a.price_range)==null?void 0:Z.maximum_price)==null?void 0:q.regular_price)==null?void 0:O.currency)??"USD"},price:m,product:y(a),selectedOptions:(n==null?void 0:n.customizable_options)??[],thumbnail:{label:((d=a==null?void 0:a.thumbnail)==null?void 0:d.label)||"",url:((nn=a==null?void 0:a.thumbnail)==null?void 0:nn.url)||""},downloadableLinks:(a==null?void 0:a.__typename)==="DownloadableProduct"&&(n!=null&&n.downloadable_links)?b(n.downloadable_links):null,prices:u,itemPrices:u,bundleOptions:(a==null?void 0:a.__typename)==="BundleProduct"&&(n!=null&&n.bundle_options)?R(n.bundle_options):null,totalInclTax:(e==null?void 0:e.row_total_including_tax)??{value:0,currency:"USD"},priceInclTax:(e==null?void 0:e.price_including_tax)??{value:0,currency:"USD"},total:(e==null?void 0:e.row_total)??{value:0,currency:"USD"},configurableOptions:(a==null?void 0:a.__typename)==="ConfigurableProduct"?E(n):void 0,giftCard:(a==null?void 0:a.__typename)==="GiftCardProduct"?v(n):void 0,quantityCanceled:0,quantityInvoiced:0,quantityOrdered:_,quantityRefunded:0,quantityReturned:0,quantityShipped:0,requestQuantity:0,totalQuantity:_,returnableQuantity:0,quantityReturnRequested:0}},un=n=>({giftWrappingForItems:(n==null?void 0:n.gift_wrapping_for_items)??{value:0,currency:"USD"},giftWrappingForItemsInclTax:(n==null?void 0:n.gift_wrapping_for_items_incl_tax)??{value:0,currency:"USD"},giftWrappingForOrder:(n==null?void 0:n.gift_wrapping_for_order)??{value:0,currency:"USD"},giftWrappingForOrderInclTax:(n==null?void 0:n.gift_wrapping_for_order_incl_tax)??{value:0,currency:"USD"},printedCard:(n==null?void 0:n.printed_card)??{value:0,currency:"USD"},printedCardInclTax:(n==null?void 0:n.printed_card_incl_tax)??{value:0,currency:"USD"}}),cn=(n=[])=>!n||n.length===0?[]:n.map(a=>{var e,_;return{code:(a==null?void 0:a.code)??"",appliedBalance:{value:((e=a==null?void 0:a.applied_balance)==null?void 0:e.value)??0,currency:((_=a==null?void 0:a.applied_balance)==null?void 0:_.currency)??"USD"}}}),tn=(n=[])=>!n||n.length===0?[]:n.map(a=>{var e,_;return{amount:{value:((e=a==null?void 0:a.amount)==null?void 0:e.value)??0,currency:((_=a==null?void 0:a.amount)==null?void 0:_.currency)??"USD"},rate:(a==null?void 0:a.rate)??0,title:(a==null?void 0:a.title)??(a==null?void 0:a.label)??""}}),p=(F=l==null?void 0:l.shipping_addresses)==null?void 0:F[0],C=l==null?void 0:l.billing_address,g=p==null?void 0:p.selected_shipping_method,w=l==null?void 0:l.selected_payment_method,r=l==null?void 0:l.prices,G=((H=(Q=l==null?void 0:l.itemsV2)==null?void 0:Q.items)==null?void 0:H.map(I))??[],yn=G.reduce((n,a)=>n+a.totalQuantity,0),k=g?`${g.carrier_title??""} - ${g.method_title??""}`.trim():"",N=cn(l==null?void 0:l.applied_gift_cards);return{giftReceiptIncluded:(l==null?void 0:l.gift_receipt_included)??!1,printedCardIncluded:(l==null?void 0:l.printed_card_included)??!1,giftWrappingOrder:{price:{value:((W=(B=l==null?void 0:l.gift_wrapping)==null?void 0:B.price)==null?void 0:W.value)??0,currency:((j=($=l==null?void 0:l.gift_wrapping)==null?void 0:$.price)==null?void 0:j.currency)??"USD"},uid:((V=l==null?void 0:l.gift_wrapping)==null?void 0:V.uid)??""},placeholderImage:"",returnNumber:void 0,id:(l==null?void 0:l.id)??"",orderStatusChangeDate:void 0,number:"",email:(l==null?void 0:l.email)??"",token:void 0,status:"pending",isVirtual:(l==null?void 0:l.is_virtual)??!1,totalQuantity:yn,shippingMethod:k,carrier:(g==null?void 0:g.carrier_code)??"",orderDate:"",returns:[],discounts:(r==null?void 0:r.discounts)??[],coupons:(l==null?void 0:l.applied_coupons)??[],payments:[{code:(w==null?void 0:w.code)??"",name:(w==null?void 0:w.title)??""}],shipping:{code:k,amount:((z=g==null?void 0:g.amount)==null?void 0:z.value)??0,currency:((L=g==null?void 0:g.amount)==null?void 0:L.currency)??"USD"},shipments:[],items:G,totalGiftCard:N.length?N.reduce((n,a)=>{var e,_;return{value:n.value+(((e=a==null?void 0:a.appliedBalance)==null?void 0:e.value)??0),currency:((_=a==null?void 0:a.appliedBalance)==null?void 0:_.currency)??n.currency}},{value:0,currency:((K=(J=N[0])==null?void 0:J.appliedBalance)==null?void 0:K.currency)??"USD"}):{value:0,currency:"USD"},grandTotal:(r==null?void 0:r.grand_total)??{value:0,currency:"USD"},grandTotalExclTax:(r==null?void 0:r.grand_total_excluding_tax)??{value:0,currency:"USD"},totalShipping:(g==null?void 0:g.amount)??{value:0,currency:"USD"},subtotalExclTax:(r==null?void 0:r.subtotal_excluding_tax)??{value:0,currency:"USD"},subtotalInclTax:(r==null?void 0:r.subtotal_including_tax)??{value:0,currency:"USD"},totalTax:{value:(((M=r==null?void 0:r.grand_total)==null?void 0:M.value)??0)-(((X=r==null?void 0:r.grand_total_excluding_tax)==null?void 0:X.value)??0),currency:((h=r==null?void 0:r.grand_total)==null?void 0:h.currency)??"USD"},shippingAddress:p?t(p):null,totalGiftOptions:un(r==null?void 0:r.gift_options),billingAddress:C?t(C):null,availableActions:[],taxes:tn(r==null?void 0:r.applied_taxes),appliedGiftCards:N}}const mn=`
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
  ${_n}
`,fn=async l=>{const f=Array.isArray(l)?l:[l];if(!f||f.length===0)throw new Error("Purchase Order UID(s) are required");if(f.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return ln(mn,{variables:{input:{purchase_order_uids:f}}}).then(t=>{var E,R,b;(E=t.errors)!=null&&E.length&&en(t.errors);const y=(R=t.data)==null?void 0:R.approvePurchaseOrders;if(!y)throw new Error("Failed to approve purchase orders");return{errors:((y==null?void 0:y.errors)??[]).map(v=>({message:(v==null?void 0:v.message)??"",type:(v==null?void 0:v.type)??""})),purchaseOrders:((b=y==null?void 0:y.purchase_orders)==null?void 0:b.map(v=>rn(v)))??[]}}).catch(an)},bn=`
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
  ${_n}
`,En=async l=>{const f=Array.isArray(l)?l:[l];if(!f||f.length===0)throw new Error("Purchase Order UID(s) are required");if(f.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return ln(bn,{variables:{input:{purchase_order_uids:f}}}).then(t=>{var E,R;(E=t.errors)!=null&&E.length&&en(t.errors);const y=(R=t.data)==null?void 0:R.rejectPurchaseOrders;return{errors:((y==null?void 0:y.errors)??[]).map(b=>({message:(b==null?void 0:b.message)??"",type:(b==null?void 0:b.type)??""})),purchaseOrders:((y==null?void 0:y.purchase_orders)??[]).map(rn)}}).catch(an)};export{_n as P,fn as a,En as r,rn as t};
//# sourceMappingURL=rejectPurchaseOrders.js.map
