/*! Copyright 2026 Adobe
All Rights Reserved. */
const un=`
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
`,rn=`
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
  ${un}
`,tn=a=>{var s,D,w,R,E,A,T,N;return{typename:(a==null?void 0:a.__typename)??"",uid:(a==null?void 0:a.uid)??"",number:(a==null?void 0:a.number)??"",status:(a==null?void 0:a.status)??"",availableActions:(a==null?void 0:a.available_actions)??[],approvalFlow:(s=a==null?void 0:a.approval_flow)!=null&&s.length?a.approval_flow.map(i=>{var f;return{ruleName:(i==null?void 0:i.rule_name)??"",events:((f=i==null?void 0:i.events)==null?void 0:f.map(r=>({message:(r==null?void 0:r.message)??"",name:(r==null?void 0:r.name)??"",role:(r==null?void 0:r.role)??"",status:(r==null?void 0:r.status)??"",updatedAt:(r==null?void 0:r.updated_at)??""})))??[]}}):[],comments:((D=a==null?void 0:a.comments)==null?void 0:D.map(i=>{var f,r,I;return{uid:(i==null?void 0:i.uid)??"",createdAt:(i==null?void 0:i.created_at)??"",author:{firstname:((f=i==null?void 0:i.author)==null?void 0:f.firstname)??"",lastname:((r=i==null?void 0:i.author)==null?void 0:r.lastname)??"",email:((I=i==null?void 0:i.author)==null?void 0:I.email)??""},text:(i==null?void 0:i.text)??""}}))??[],createdAt:(a==null?void 0:a.created_at)??"",updatedAt:(a==null?void 0:a.updated_at)??"",createdBy:{firstname:((w=a==null?void 0:a.created_by)==null?void 0:w.firstname)??"",lastname:((R=a==null?void 0:a.created_by)==null?void 0:R.lastname)??"",email:((E=a==null?void 0:a.created_by)==null?void 0:E.email)??""},historyLog:((A=a==null?void 0:a.history_log)==null?void 0:A.map(i=>({activity:(i==null?void 0:i.activity)??"",createdAt:(i==null?void 0:i.created_at)??"",message:(i==null?void 0:i.message)??"",uid:(i==null?void 0:i.uid)??""})))??[],quote:cn(a==null?void 0:a.quote),order:{id:((T=a==null?void 0:a.order)==null?void 0:T.id)??"",orderNumber:((N=a==null?void 0:a.order)==null?void 0:N.number)??""}}};function cn(a){var B,W,P,H,z,L,V,j,$,K,X,J,Y,Z,M;if(!a)return null;const C=n=>n||0,s=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),D=n=>{var c,t,g,o;const{firstName:l,lastName:e,middleName:_}=s(n);return{firstName:l,lastName:e,middleName:_,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:((c=n==null?void 0:n.country)==null?void 0:c.label)??"",countryCode:((t=n==null?void 0:n.country)==null?void 0:t.code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:((g=n==null?void 0:n.region)==null?void 0:g.label)??"",regionId:((o=n==null?void 0:n.region)==null?void 0:o.code)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},w=n=>{var l,e,_,c,t,g,o,b,v,m;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((_=(e=(l=n==null?void 0:n.price_range)==null?void 0:l.maximum_price)==null?void 0:e.regular_price)==null?void 0:_.currency)??"",value:((g=(t=(c=n==null?void 0:n.price_range)==null?void 0:c.maximum_price)==null?void 0:t.regular_price)==null?void 0:g.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((o=n==null?void 0:n.image)==null?void 0:o.url)||"",imageAlt:((b=n==null?void 0:n.image)==null?void 0:b.label)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((v=n==null?void 0:n.thumbnail)==null?void 0:v.label)||"",url:((m=n==null?void 0:n.thumbnail)==null?void 0:m.url)||""}}},R=n=>{if(!n||!("configurable_options"in n))return;const l={};for(const e of n.configurable_options)l[e.option_label]=e.value_label;return l},E=n=>{const l=n==null?void 0:n.map(_=>({uid:_.uid,label:_.label,values:_.values.map(c=>c.product_name).join(", ")})),e={};return l==null||l.forEach(_=>{e[_.label]=_.values}),Object.keys(e).length>0?e:null},A=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(l=>l.title).join(", ")}:null,T=n=>{var l,e,_,c,t;return{senderName:((l=n==null?void 0:n.gift_card)==null?void 0:l.sender_name)||"",senderEmail:((e=n==null?void 0:n.gift_card)==null?void 0:e.sender_email)||"",recipientEmail:((_=n==null?void 0:n.gift_card)==null?void 0:_.recipient_email)||"",recipientName:((c=n==null?void 0:n.gift_card)==null?void 0:c.recipient_name)||"",message:((t=n==null?void 0:n.gift_card)==null?void 0:t.message)||""}},N=n=>{var l,e,_;return{senderName:((l=n==null?void 0:n.gift_message)==null?void 0:l.from)??"",recipientName:((e=n==null?void 0:n.gift_message)==null?void 0:e.to)??"",message:((_=n==null?void 0:n.gift_message)==null?void 0:_.message)??""}},i=n=>{var l,e,_,c,t,g,o,b,v,m,S;return{design:((l=n==null?void 0:n.gift_wrapping)==null?void 0:l.design)??"",uid:((e=n==null?void 0:n.gift_wrapping)==null?void 0:e.uid)??"",selected:!!((_=n==null?void 0:n.gift_wrapping)!=null&&_.uid),image:{url:((t=(c=n==null?void 0:n.gift_wrapping)==null?void 0:c.image)==null?void 0:t.url)??"",label:((o=(g=n==null?void 0:n.gift_wrapping)==null?void 0:g.image)==null?void 0:o.label)??""},price:{currency:((v=(b=n==null?void 0:n.gift_wrapping)==null?void 0:b.price)==null?void 0:v.currency)??"USD",value:((S=(m=n==null?void 0:n.gift_wrapping)==null?void 0:m.price)==null?void 0:S.value)??0}}},f=n=>({currency:(n==null?void 0:n.currency)??"USD",value:(n==null?void 0:n.value)??0}),r=(n,l)=>{const e=n==null?void 0:n.price,_=n==null?void 0:n.priceIncludingTax,c=n==null?void 0:n.originalPrice,t=!1,g=t?c==null?void 0:c.value:_==null?void 0:_.value,o={originalPrice:c,baseOriginalPrice:{value:g,currency:c==null?void 0:c.currency},baseDiscountedPrice:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency},baseExcludingTax:{value:e==null?void 0:e.value,currency:e==null?void 0:e.currency}},b={originalPrice:c,baseOriginalPrice:{value:c==null?void 0:c.value,currency:_==null?void 0:_.currency},baseDiscountedPrice:{value:l==null?void 0:l.value,currency:e==null?void 0:e.currency},baseExcludingTax:{value:e==null?void 0:e.value,currency:e==null?void 0:e.currency}},v={singleItemPrice:{value:t?c.value:_.value,currency:_.currency},baseOriginalPrice:{value:g,currency:_.currency},baseDiscountedPrice:{value:_.value,currency:_.currency}};return{includeAndExcludeTax:o,excludeTax:b,includeTax:v}},I=n=>{var o,b,v,m,S,p,h,q,O,d,nn;const l=n==null?void 0:n.product,e=n==null?void 0:n.prices,_=C(n==null?void 0:n.quantity),c={price:(e==null?void 0:e.price)??{value:0,currency:"USD"},priceIncludingTax:(e==null?void 0:e.price_including_tax)??{value:0,currency:"USD"},originalPrice:(e==null?void 0:e.original_item_price)??{value:0,currency:"USD"},originalPriceIncludingTax:(e==null?void 0:e.original_item_price)??{value:0,currency:"USD"},discounts:(e==null?void 0:e.discounts)??[]},t=(((o=e==null?void 0:e.original_item_price)==null?void 0:o.value)??0)>(((b=e==null?void 0:e.price)==null?void 0:b.value)??0),g=(e==null?void 0:e.price)??{value:0,currency:"USD"};return{giftMessage:N(n),giftWrappingPrice:f((v=n==null?void 0:n.gift_wrapping)==null?void 0:v.price),productGiftWrapping:[i(n)],taxCalculations:r(c,g),productSalePrice:g,status:n!=null&&n.is_available?"available":"unavailable",currentReturnOrderQuantity:0,eligibleForReturn:!1,productSku:(l==null?void 0:l.sku)??"",type:(l==null?void 0:l.__typename)??"",discounted:t,id:(n==null?void 0:n.uid)??"",productName:(l==null?void 0:l.name)??"",productUrlKey:(l==null?void 0:l.url_key)??"",regularPrice:{value:((p=(S=(m=l==null?void 0:l.price_range)==null?void 0:m.maximum_price)==null?void 0:S.regular_price)==null?void 0:p.value)??0,currency:((O=(q=(h=l==null?void 0:l.price_range)==null?void 0:h.maximum_price)==null?void 0:q.regular_price)==null?void 0:O.currency)??"USD"},price:g,product:w(l),selectedOptions:(n==null?void 0:n.customizable_options)??[],thumbnail:{label:((d=l==null?void 0:l.thumbnail)==null?void 0:d.label)||"",url:((nn=l==null?void 0:l.thumbnail)==null?void 0:nn.url)||""},downloadableLinks:(l==null?void 0:l.__typename)==="DownloadableProduct"&&(n!=null&&n.downloadable_links)?A(n.downloadable_links):null,prices:c,itemPrices:c,bundleOptions:(l==null?void 0:l.__typename)==="BundleProduct"&&(n!=null&&n.bundle_options)?E(n.bundle_options):null,totalInclTax:(e==null?void 0:e.row_total_including_tax)??{value:0,currency:"USD"},priceInclTax:(e==null?void 0:e.price_including_tax)??{value:0,currency:"USD"},total:(e==null?void 0:e.row_total)??{value:0,currency:"USD"},configurableOptions:(l==null?void 0:l.__typename)==="ConfigurableProduct"?R(n):void 0,giftCard:(l==null?void 0:l.__typename)==="GiftCardProduct"?T(n):void 0,quantityCanceled:0,quantityInvoiced:0,quantityOrdered:_,quantityRefunded:0,quantityReturned:0,quantityShipped:0,requestQuantity:0,totalQuantity:_,returnableQuantity:0,quantityReturnRequested:0}},ln=n=>({giftWrappingForItems:(n==null?void 0:n.gift_wrapping_for_items)??{value:0,currency:"USD"},giftWrappingForItemsInclTax:(n==null?void 0:n.gift_wrapping_for_items_incl_tax)??{value:0,currency:"USD"},giftWrappingForOrder:(n==null?void 0:n.gift_wrapping_for_order)??{value:0,currency:"USD"},giftWrappingForOrderInclTax:(n==null?void 0:n.gift_wrapping_for_order_incl_tax)??{value:0,currency:"USD"},printedCard:(n==null?void 0:n.printed_card)??{value:0,currency:"USD"},printedCardInclTax:(n==null?void 0:n.printed_card_incl_tax)??{value:0,currency:"USD"}}),an=(n=[])=>!n||n.length===0?[]:n.map(l=>{var e,_;return{code:(l==null?void 0:l.code)??"",appliedBalance:{value:((e=l==null?void 0:l.applied_balance)==null?void 0:e.value)??0,currency:((_=l==null?void 0:l.applied_balance)==null?void 0:_.currency)??"USD"}}}),en=(n=[])=>!n||n.length===0?[]:n.map(l=>{var e,_;return{amount:{value:((e=l==null?void 0:l.amount)==null?void 0:e.value)??0,currency:((_=l==null?void 0:l.amount)==null?void 0:_.currency)??"USD"},rate:(l==null?void 0:l.rate)??0,title:(l==null?void 0:l.title)??(l==null?void 0:l.label)??""}}),U=(B=a==null?void 0:a.shipping_addresses)==null?void 0:B[0],G=a==null?void 0:a.billing_address,y=U==null?void 0:U.selected_shipping_method,x=a==null?void 0:a.selected_payment_method,u=a==null?void 0:a.prices,F=((P=(W=a==null?void 0:a.itemsV2)==null?void 0:W.items)==null?void 0:P.map(I))??[],_n=F.reduce((n,l)=>n+l.totalQuantity,0),Q=y?`${y.carrier_title??""} - ${y.method_title??""}`.trim():"",k=an(a==null?void 0:a.applied_gift_cards);return{giftReceiptIncluded:(a==null?void 0:a.gift_receipt_included)??!1,printedCardIncluded:(a==null?void 0:a.printed_card_included)??!1,giftWrappingOrder:{price:{value:((z=(H=a==null?void 0:a.gift_wrapping)==null?void 0:H.price)==null?void 0:z.value)??0,currency:((V=(L=a==null?void 0:a.gift_wrapping)==null?void 0:L.price)==null?void 0:V.currency)??"USD"},uid:((j=a==null?void 0:a.gift_wrapping)==null?void 0:j.uid)??""},placeholderImage:"",returnNumber:void 0,id:(a==null?void 0:a.id)??"",orderStatusChangeDate:void 0,number:"",email:(a==null?void 0:a.email)??"",token:void 0,status:"pending",isVirtual:(a==null?void 0:a.is_virtual)??!1,totalQuantity:_n,shippingMethod:Q,carrier:(y==null?void 0:y.carrier_code)??"",orderDate:"",returns:[],discounts:(u==null?void 0:u.discounts)??[],coupons:(a==null?void 0:a.applied_coupons)??[],payments:[{code:(x==null?void 0:x.code)??"",name:(x==null?void 0:x.title)??""}],shipping:{code:Q,amount:(($=y==null?void 0:y.amount)==null?void 0:$.value)??0,currency:((K=y==null?void 0:y.amount)==null?void 0:K.currency)??"USD"},shipments:[],items:F,totalGiftCard:k.length?k.reduce((n,l)=>{var e,_;return{value:n.value+(((e=l==null?void 0:l.appliedBalance)==null?void 0:e.value)??0),currency:((_=l==null?void 0:l.appliedBalance)==null?void 0:_.currency)??n.currency}},{value:0,currency:((J=(X=k[0])==null?void 0:X.appliedBalance)==null?void 0:J.currency)??"USD"}):{value:0,currency:"USD"},grandTotal:(u==null?void 0:u.grand_total)??{value:0,currency:"USD"},grandTotalExclTax:(u==null?void 0:u.grand_total_excluding_tax)??{value:0,currency:"USD"},totalShipping:(y==null?void 0:y.amount)??{value:0,currency:"USD"},subtotalExclTax:(u==null?void 0:u.subtotal_excluding_tax)??{value:0,currency:"USD"},subtotalInclTax:(u==null?void 0:u.subtotal_including_tax)??{value:0,currency:"USD"},totalTax:{value:(((Y=u==null?void 0:u.grand_total)==null?void 0:Y.value)??0)-(((Z=u==null?void 0:u.grand_total_excluding_tax)==null?void 0:Z.value)??0),currency:((M=u==null?void 0:u.grand_total)==null?void 0:M.currency)??"USD"},shippingAddress:U?D(U):null,totalGiftOptions:ln(u==null?void 0:u.gift_options),billingAddress:G?D(G):null,availableActions:[],taxes:en(u==null?void 0:u.applied_taxes),appliedGiftCards:k}}export{rn as P,tn as t};
//# sourceMappingURL=transform-purchase-order.js.map
