/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as o,d as Q,f as S,h as D}from"./resetCart.js";import{events as f}from"@dropins/tools/event-bus.js";import{Initializer as L,merge as X}from"@dropins/tools/lib.js";import{a as K}from"./persisted-data.js";import{CART_FRAGMENT as U}from"../fragments.js";const $=new L({init:async r=>{const n={disableGuestCart:!1,...r};$.config.setConfig(n),E().catch(console.error)},listeners:()=>[f.on("authenticated",r=>{o.authenticated&&!r?f.emit("cart/reset",void 0):r&&!o.authenticated&&(o.authenticated=r,E().catch(console.error))},{eager:!0}),f.on("locale",async r=>{r!==o.locale&&(o.locale=r,E().catch(console.error))}),f.on("cart/reset",()=>{Q().catch(console.error),f.emit("cart/data",null)}),f.on("cart/data",r=>{K(r)}),f.on("checkout/updated",r=>{r&&xr().catch(console.error)})]}),V=$.config;function k(r){var c,e,u,l,i,a,_,g,y,s,m,v,C,h,d,R;if(!r)return null;const n={appliedGiftCards:((c=r==null?void 0:r.applied_gift_cards)==null?void 0:c.map(t=>{var w,M,N;const p={code:t.code??"",appliedBalance:{value:t.applied_balance.value??0,currency:t.applied_balance.currency??"USD"},currentBalance:{value:t.current_balance.value??0,currency:t.current_balance.currency??"USD"},expirationDate:t.expiration_date??""},b=(w=p==null?void 0:p.currentBalance)==null?void 0:w.value,x=(M=p==null?void 0:p.appliedBalance)==null?void 0:M.value,T=(N=p==null?void 0:p.currentBalance)==null?void 0:N.currency,q=b-x>0?b-x:0;return{...p,giftCardBalance:{value:q,currency:T}}}))??[],id:r.id,totalQuantity:lr(r),totalUniqueItems:r.itemsV2.items.length,totalGiftOptions:Y((e=r==null?void 0:r.prices)==null?void 0:e.gift_options),giftReceiptIncluded:(r==null?void 0:r.gift_receipt_included)??!1,printedCardIncluded:(r==null?void 0:r.printed_card_included)??!1,cartGiftWrapping:((u=r==null?void 0:r.available_gift_wrappings)==null?void 0:u.map(t=>{var p,b,x,T,G;return{design:t.design??"",uid:t.uid,selected:((p=r==null?void 0:r.gift_wrapping)==null?void 0:p.uid)===t.uid,image:{url:((b=t==null?void 0:t.image)==null?void 0:b.url)??"",label:((x=t.image)==null?void 0:x.label)??""},price:{currency:((T=t==null?void 0:t.price)==null?void 0:T.currency)??"USD",value:((G=t==null?void 0:t.price)==null?void 0:G.value)??0}}}))??[],giftMessage:{senderName:((l=r==null?void 0:r.gift_message)==null?void 0:l.from)??"",recipientName:((i=r==null?void 0:r.gift_message)==null?void 0:i.to)??"",message:((a=r==null?void 0:r.gift_message)==null?void 0:a.message)??""},errors:er(r==null?void 0:r.itemsV2),items:F(r==null?void 0:r.itemsV2),miniCartMaxItems:F(r==null?void 0:r.itemsV2).slice(0,((_=o.config)==null?void 0:_.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:r.prices.grand_total.value,currency:r.prices.grand_total.currency},excludingTax:{value:r.prices.grand_total_excluding_tax.value,currency:r.prices.grand_total_excluding_tax.currency}},discount:P(r.prices.discounts,r.prices.grand_total.currency),subtotal:{excludingTax:{value:(g=r.prices.subtotal_excluding_tax)==null?void 0:g.value,currency:(y=r.prices.subtotal_excluding_tax)==null?void 0:y.currency},includingTax:{value:(s=r.prices.subtotal_including_tax)==null?void 0:s.value,currency:(m=r.prices.subtotal_including_tax)==null?void 0:m.currency},includingDiscountOnly:{value:(v=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:v.value,currency:(C=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:C.currency}},appliedTaxes:z(r.prices.applied_taxes),totalTax:P(r.prices.applied_taxes,r.prices.grand_total.currency),appliedDiscounts:z(r.prices.discounts),isVirtual:r.is_virtual,addresses:{shipping:r.shipping_addresses&&sr(r)},isGuestCart:!o.authenticated,hasOutOfStockItems:or(r),hasFullyOutOfStockItems:_r(r),appliedCoupons:r.applied_coupons};return X(n,(R=(d=(h=V.getConfig().models)==null?void 0:h.CartModel)==null?void 0:d.transformer)==null?void 0:R.call(d,r))}function Y(r){var n,c,e,u,l,i,a,_,g,y,s,m;return{giftWrappingForItems:{value:((n=r==null?void 0:r.gift_wrapping_for_items)==null?void 0:n.value)??0,currency:((c=r==null?void 0:r.gift_wrapping_for_items)==null?void 0:c.currency)??"USD"},giftWrappingForItemsInclTax:{value:((e=r==null?void 0:r.gift_wrapping_for_items_incl_tax)==null?void 0:e.value)??0,currency:((u=r==null?void 0:r.gift_wrapping_for_items_incl_tax)==null?void 0:u.currency)??"USD"},giftWrappingForOrder:{value:((l=r==null?void 0:r.gift_wrapping_for_order)==null?void 0:l.value)??0,currency:((i=r==null?void 0:r.gift_wrapping_for_order)==null?void 0:i.currency)??"USD"},giftWrappingForOrderInclTax:{value:((a=r==null?void 0:r.gift_wrapping_for_order_incl_tax)==null?void 0:a.value)??0,currency:((_=r==null?void 0:r.gift_wrapping_for_order_incl_tax)==null?void 0:_.currency)??"USD"},printedCard:{value:((g=r==null?void 0:r.printed_card)==null?void 0:g.value)??0,currency:((y=r==null?void 0:r.printed_card)==null?void 0:y.currency)??"USD"},printedCardInclTax:{value:((s=r==null?void 0:r.printed_card_incl_tax)==null?void 0:s.value)??0,currency:((m=r==null?void 0:r.printed_card_incl_tax)==null?void 0:m.currency)??"USD"}}}function P(r,n){return r!=null&&r.length?r.reduce((c,e)=>({value:c.value+e.amount.value,currency:e.amount.currency}),{value:0,currency:n}):{value:0,currency:n}}function j(r,n){var c,e,u,l;return{src:r!=null&&r.useConfigurableParentThumbnail?n.product.thumbnail.url:((e=(c=n.configured_variant)==null?void 0:c.thumbnail)==null?void 0:e.url)||n.product.thumbnail.url,alt:r!=null&&r.useConfigurableParentThumbnail?n.product.thumbnail.label:((l=(u=n.configured_variant)==null?void 0:u.thumbnail)==null?void 0:l.label)||n.product.thumbnail.label}}function H(r){var n,c,e,u;return r.__typename==="ConfigurableCartItem"?{value:(c=(n=r.configured_variant)==null?void 0:n.price_range)==null?void 0:c.maximum_price.regular_price.value,currency:(u=(e=r.configured_variant)==null?void 0:e.price_range)==null?void 0:u.maximum_price.regular_price.currency}:r.__typename==="GiftCardCartItem"?{value:r.prices.price.value,currency:r.prices.price.currency}:{value:r.prices.original_item_price.value,currency:r.prices.original_item_price.currency}}function O(r){var n,c,e;return r.__typename==="ConfigurableCartItem"?((c=(n=r.configured_variant)==null?void 0:n.price_range)==null?void 0:c.maximum_price.discount.amount_off)>0:((e=r.product.price_range)==null?void 0:e.maximum_price.discount.amount_off)>0}function J(r){var n,c,e;return{senderName:((n=r==null?void 0:r.gift_message)==null?void 0:n.from)??"",recipientName:((c=r==null?void 0:r.gift_message)==null?void 0:c.to)??"",message:((e=r==null?void 0:r.gift_message)==null?void 0:e.message)??""}}function Z(r){return{currency:(r==null?void 0:r.currency)??"USD",value:(r==null?void 0:r.value)??0}}function F(r){var c;if(!((c=r==null?void 0:r.items)!=null&&c.length))return[];const n=o.config;return r.items.map(e=>{var u,l,i,a,_,g,y;return{giftWrappingAvailable:((u=e==null?void 0:e.product)==null?void 0:u.gift_wrapping_available)??!1,giftWrappingPrice:Z((l=e==null?void 0:e.product)==null?void 0:l.gift_wrapping_price),giftMessage:J(e),productGiftWrapping:((i=e==null?void 0:e.available_gift_wrapping)==null?void 0:i.map(s=>{var m,v,C,h,d;return{design:s.design??"",uid:s.uid,selected:((m=e.gift_wrapping)==null?void 0:m.uid)===s.uid,image:{url:((v=s==null?void 0:s.image)==null?void 0:v.url)??"",label:((C=s.image)==null?void 0:C.label)??""},price:{currency:((h=s==null?void 0:s.price)==null?void 0:h.currency)??"USD",value:((d=s==null?void 0:s.price)==null?void 0:d.value)??0}}}))??[],itemType:e.__typename,uid:e.uid,giftMessageAvailable:rr(e.product.gift_message_available),url:{urlKey:e.product.url_key,categories:e.product.categories.map(s=>s.url_key)},canonicalUrl:e.product.canonical_url,categories:e.product.categories.map(s=>s.name),quantity:e.quantity,sku:pr(e),topLevelSku:e.product.sku,name:e.product.name,image:j(n,e),price:{value:e.prices.price.value,currency:e.prices.price.currency},taxedPrice:{value:e.prices.price_including_tax.value,currency:e.prices.price_including_tax.currency},fixedProductTaxes:e.prices.fixed_product_taxes,rowTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},rowTotalIncludingTax:{value:e.prices.row_total_including_tax.value,currency:e.prices.row_total_including_tax.currency},links:ir(e.links),total:{value:(a=e.prices.original_row_total)==null?void 0:a.value,currency:(_=e.prices.original_row_total)==null?void 0:_.currency},discount:{value:e.prices.total_item_discount.value,currency:e.prices.total_item_discount.currency,label:(g=e.prices.discounts)==null?void 0:g.map(s=>s.label)},regularPrice:H(e),discounted:O(e),bundleOptions:e.__typename==="BundleCartItem"?nr(e.bundle_options):null,selectedOptions:cr(e.configurable_options),customizableOptions:ur(e.customizable_options),sender:e.__typename==="GiftCardCartItem"?e.sender_name:null,senderEmail:e.__typename==="GiftCardCartItem"?e.sender_email:null,recipient:e.__typename==="GiftCardCartItem"?e.recipient_name:null,recipientEmail:e.__typename==="GiftCardCartItem"?e.recipient_email:null,message:e.__typename==="GiftCardCartItem"?e.message:null,discountedTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},onlyXLeftInStock:e.__typename==="ConfigurableCartItem"?(y=e.configured_variant)==null?void 0:y.only_x_left_in_stock:e.product.only_x_left_in_stock,lowInventory:e.is_available&&e.product.only_x_left_in_stock!==null,insufficientQuantity:(e.__typename==="ConfigurableCartItem"?e.configured_variant:e.product).stock_status==="IN_STOCK"&&!e.is_available,outOfStock:e.product.stock_status==="OUT_OF_STOCK",stockLevel:tr(e),discountPercentage:ar(e),savingsAmount:gr(e),productAttributes:fr(e)}})}function rr(r){switch(+r){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}}function er(r){var c;const n=(c=r==null?void 0:r.items)==null?void 0:c.reduce((e,u)=>{var l;return(l=u.errors)==null||l.forEach(i=>{e.push({uid:u.uid,text:i.message})}),e},[]);return n!=null&&n.length?n:null}function z(r){return r!=null&&r.length?r.map(n=>({amount:{value:n.amount.value,currency:n.amount.currency},label:n.label,coupon:n.coupon})):[]}function nr(r){const n=r==null?void 0:r.map(e=>({uid:e.uid,label:e.label,value:e.values.map(u=>u.label).join(", ")})),c={};return n==null||n.forEach(e=>{c[e.label]=e.value}),Object.keys(c).length>0?c:null}function cr(r){const n=r==null?void 0:r.map(e=>({uid:e.configurable_product_option_uid,label:e.option_label,value:e.value_label})),c={};return n==null||n.forEach(e=>{c[e.label]=e.value}),Object.keys(c).length>0?c:null}function ur(r){const n=r==null?void 0:r.map(e=>({uid:e.customizable_option_uid,label:e.label,type:e.type,values:e.values.map(u=>({uid:u.customizable_option_value_uid,label:u.label,value:u.value}))})),c={};return n==null||n.forEach(e=>{var u;switch(e.type){case"field":case"area":case"date_time":c[e.label]=e.values[0].value;break;case"radio":case"drop_down":c[e.label]=e.values[0].label;break;case"multiple":case"checkbox":c[e.label]=e.values.reduce((l,i)=>l?`${l}, ${i.label}`:i.label,"");break;case"file":{const l=new DOMParser,i=e.values[0].value,_=((u=l.parseFromString(i,"text/html").querySelector("a"))==null?void 0:u.textContent)||"";c[e.label]=_;break}}}),c}function lr(r){var n,c;return((n=o.config)==null?void 0:n.cartSummaryDisplayTotal)===0?r.itemsV2.items.length:((c=o.config)==null?void 0:c.cartSummaryDisplayTotal)===1?r.total_quantity:r.itemsV2.items.length}function ir(r){return(r==null?void 0:r.length)>0?{count:r.length,result:r.map(n=>n.title).join(", ")}:null}function sr(r){var n,c,e,u;return(n=r.shipping_addresses)!=null&&n.length?(c=r.shipping_addresses)==null?void 0:c.map(l=>({countryCode:l.country.code,zipCode:l.postcode,regionCode:l.region.code})):(e=r.addresses)!=null&&e.length?(u=r.addresses)==null?void 0:u.filter(l=>l.default_shipping).map(l=>{var i;return l.default_shipping&&{countryCode:l.country_code,zipCode:l.postcode,regionCode:(i=l.region)==null?void 0:i.region_code}}):null}function or(r){var n,c;return(c=(n=r==null?void 0:r.itemsV2)==null?void 0:n.items)==null?void 0:c.some(e=>{var u;return((u=e==null?void 0:e.product)==null?void 0:u.stock_status)==="OUT_OF_STOCK"||e.product.stock_status==="IN_STOCK"&&!e.is_available})}function tr(r){return r.not_available_message?r.product.quantity!=null?r.product.quantity:"noNumber":null}function _r(r){var n,c;return(c=(n=r==null?void 0:r.itemsV2)==null?void 0:n.items)==null?void 0:c.some(e=>{var u;return((u=e==null?void 0:e.product)==null?void 0:u.stock_status)==="OUT_OF_STOCK"})}function ar(r){var c,e,u,l,i,a,_,g;let n;if(r.__typename==="ConfigurableCartItem")n=(l=(u=(e=(c=r==null?void 0:r.configured_variant)==null?void 0:c.price_range)==null?void 0:e.maximum_price)==null?void 0:u.discount)==null?void 0:l.percent_off;else{if(r.__typename==="BundleCartItem")return;n=(g=(_=(a=(i=r==null?void 0:r.product)==null?void 0:i.price_range)==null?void 0:a.maximum_price)==null?void 0:_.discount)==null?void 0:g.percent_off}if(n!==0)return Math.round(n)}function pr(r){var n;return r.__typename==="ConfigurableCartItem"?r.configured_variant.sku:((n=r.product)==null?void 0:n.variantSku)||r.product.sku}function gr(r){var e,u,l,i,a,_;let n,c;if(n=((u=(e=r==null?void 0:r.prices)==null?void 0:e.original_row_total)==null?void 0:u.value)-((i=(l=r==null?void 0:r.prices)==null?void 0:l.row_total)==null?void 0:i.value),c=(_=(a=r==null?void 0:r.prices)==null?void 0:a.row_total)==null?void 0:_.currency,n!==0)return{value:n,currency:c}}function fr(r){var n,c,e;return(e=(c=(n=r==null?void 0:r.product)==null?void 0:n.custom_attributesV2)==null?void 0:c.items)==null?void 0:e.map(u=>{const l=u.code.split("_").map(i=>i.charAt(0).toUpperCase()+i.slice(1)).join(" ");return{...u,code:l}})}function yr(r){var e,u;if(!r)return null;const n=l=>{switch(l){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}},c=l=>{switch(+l){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}};return{displayMiniCart:r.minicart_display,miniCartMaxItemsDisplay:r.minicart_max_items,cartExpiresInDays:r.cart_expires_in_days,cartSummaryDisplayTotal:r.cart_summary_display_quantity,cartSummaryMaxItems:r.max_items_in_order_summary,defaultCountry:r.default_country,categoryFixedProductTaxDisplaySetting:r.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:r.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:r.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:r.shopping_cart_display_zero_tax,subtotal:n(r.shopping_cart_display_subtotal),price:n(r.shopping_cart_display_price),shipping:n(r.shopping_cart_display_shipping),fullSummary:r.shopping_cart_display_full_summary,grandTotal:r.shopping_cart_display_grand_total,taxGiftWrapping:r.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:r.configurable_thumbnail_source==="parent",allowGiftWrappingOnOrder:c(r==null?void 0:r.allow_gift_wrapping_on_order),allowGiftWrappingOnOrderItems:c(r==null?void 0:r.allow_gift_wrapping_on_order_items),allowGiftMessageOnOrder:c(r==null?void 0:r.allow_order),allowGiftMessageOnOrderItems:c(r==null?void 0:r.allow_items),allowGiftReceipt:!!+(r==null?void 0:r.allow_gift_receipt),allowPrintedCard:!!+(r==null?void 0:r.allow_printed_card),printedCardPrice:{currency:((e=r==null?void 0:r.printed_card_priceV2)==null?void 0:e.currency)??"",value:((u=r==null?void 0:r.printed_card_priceV2)==null?void 0:u.value)!=null?+r.printed_card_priceV2.value:0},cartGiftWrapping:n(+r.cart_gift_wrapping),cartPrintedCard:n(+r.cart_printed_card)}}const A=`
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
`,mr=`
  fragment CUSTOMER_FRAGMENT on Customer {
    addresses {
      default_shipping
      country_code
      postcode
      region {
        region
        region_code
        region_id
      }
    }
  }
`,dr=`
  query GUEST_CART_QUERY(
      $cartId: String!,
      ${A}
    ) {

    cart(cart_id: $cartId){
      ...CART_FRAGMENT
    }
  }

  ${U}
`,vr=`
  query CUSTOMER_CART_QUERY(
      ${A}
    ) {
     
    customer {
      ...CUSTOMER_FRAGMENT
    }

    cart: customerCart {
      ...CART_FRAGMENT
    }
  }

  ${mr}
  ${U}
`,I=async()=>{const r=o.authenticated,n=o.cartId;if(r)return S(vr,{method:"POST"}).then(({errors:c,data:e})=>{if(c)return D(c);const u={...e.cart,...e.customer};return k(u)});if(!n)throw new Error("No cart ID found");return S(dr,{method:"POST",cache:"no-cache",variables:{cartId:n}}).then(({errors:c,data:e})=>c?D(c):k(e.cart))},Cr=`
  mutation MERGE_CARTS_MUTATION(
      $guestCartId: String!, 
      $customerCartId: String!,
      ${A}
    ) {
    mergeCarts(
      source_cart_id: $guestCartId,
      destination_cart_id: $customerCartId
    ) {
      ...CART_FRAGMENT 
    }
  }

  ${U}
`,E=async()=>{if(o.initializing)return null;o.initializing=!0,o.config||(o.config=await br());const r=o.authenticated?await B():await W();return f.emit("cart/initialized",r),f.emit("cart/data",r),o.initializing=!1,r};async function B(){const r=o.cartId,n=await I();return n?(o.cartId=n.id,!r||n.id===r?n:await S(Cr,{variables:{guestCartId:r,customerCartId:n.id}}).then(()=>I()).then(c=>{const e={oldCartItems:n.items,newCart:c};return f.emit("cart/merged",e),c}).catch(()=>(console.error("Could not merge carts"),n))):null}async function W(){if(V.getConfig().disableGuestCart===!0||!o.cartId)return null;try{return await I()}catch(r){return console.error(r),null}}const hr=`
query STORE_CONFIG_QUERY {
  storeConfig {
    minicart_display
    minicart_max_items
    cart_expires_in_days
    cart_summary_display_quantity
    max_items_in_order_summary
    default_country
    category_fixed_product_tax_display_setting
    product_fixed_product_tax_display_setting
    sales_fixed_product_tax_display_setting
    shopping_cart_display_full_summary
    shopping_cart_display_grand_total
    shopping_cart_display_price
    shopping_cart_display_shipping
    shopping_cart_display_subtotal
    shopping_cart_display_tax_gift_wrapping
    shopping_cart_display_zero_tax
    configurable_thumbnail_source
    allow_gift_wrapping_on_order
    allow_gift_wrapping_on_order_items
    allow_order
    allow_items
    allow_gift_receipt
    allow_printed_card
    printed_card_priceV2 {
      currency
      value
    }
    cart_gift_wrapping
    cart_printed_card
  }
}
`,br=async()=>S(hr,{method:"GET",cache:"force-cache"}).then(({errors:r,data:n})=>r?D(r):yr(n.storeConfig)),xr=async()=>{const r=o.authenticated?await B():await W();return f.emit("cart/data",r),r};export{A as C,E as a,B as b,V as c,W as d,br as e,I as g,$ as i,xr as r,k as t};
