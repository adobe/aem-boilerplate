/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as o,d as q,f as I,h as U}from"./resetCart.js";import{events as f}from"@dropins/tools/event-bus.js";import{Initializer as L,merge as X}from"@dropins/tools/lib.js";import{a as K}from"./persisted-data.js";import{CART_FRAGMENT as A}from"../fragments.js";const z=new L({init:async e=>{const n={disableGuestCart:!1,...e};z.config.setConfig(n),D().catch(console.error)},listeners:()=>[f.on("authenticated",e=>{o.authenticated&&!e?f.emit("cart/reset",void 0):e&&!o.authenticated&&(o.authenticated=e,D().catch(console.error))},{eager:!0}),f.on("locale",async e=>{e!==o.locale&&(o.locale=e,D().catch(console.error))}),f.on("cart/reset",()=>{q().catch(console.error),f.emit("cart/data",null)}),f.on("cart/data",e=>{K(e)}),f.on("checkout/updated",e=>{e&&xe().catch(console.error)})]}),B=z.config;function k(e){var c,r,u,l,i,a,_,g,y,d,m,t,C,h,v,b;if(!e)return null;const n={appliedGiftCards:((c=e==null?void 0:e.applied_gift_cards)==null?void 0:c.map(s=>{var R,w,M;const p={code:s.code??"",appliedBalance:{value:s.applied_balance.value??0,currency:s.applied_balance.currency??"USD"},currentBalance:{value:s.current_balance.value??0,currency:s.current_balance.currency??"USD"},expirationDate:s.expiration_date??""},x=(R=p==null?void 0:p.currentBalance)==null?void 0:R.value,T=(w=p==null?void 0:p.appliedBalance)==null?void 0:w.value,S=(M=p==null?void 0:p.currentBalance)==null?void 0:M.currency,W=x-T>0?x-T:0;return{...p,giftCardBalance:{value:W,currency:S}}}))??[],id:e.id,totalQuantity:le(e),totalUniqueItems:e.itemsV2.items.length,totalGiftOptions:j((r=e==null?void 0:e.prices)==null?void 0:r.gift_options),giftReceiptIncluded:(e==null?void 0:e.gift_receipt_included)??!1,printedCardIncluded:(e==null?void 0:e.printed_card_included)??!1,cartGiftWrapping:((u=e==null?void 0:e.available_gift_wrappings)==null?void 0:u.map(s=>{var p,x,T,S,E;return{design:s.design??"",uid:s.uid,selected:((p=e==null?void 0:e.gift_wrapping)==null?void 0:p.uid)===s.uid,image:{url:((x=s==null?void 0:s.image)==null?void 0:x.url)??"",label:((T=s.image)==null?void 0:T.label)??""},price:{currency:((S=s==null?void 0:s.price)==null?void 0:S.currency)??"USD",value:((E=s==null?void 0:s.price)==null?void 0:E.value)??0}}}))??[],giftMessage:{senderName:((l=e==null?void 0:e.gift_message)==null?void 0:l.from)??"",recipientName:((i=e==null?void 0:e.gift_message)==null?void 0:i.to)??"",message:((a=e==null?void 0:e.gift_message)==null?void 0:a.message)??""},errors:re(e==null?void 0:e.itemsV2),items:N(e==null?void 0:e.itemsV2),miniCartMaxItems:N(e==null?void 0:e.itemsV2).slice(0,((_=o.config)==null?void 0:_.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:e.prices.grand_total.value,currency:e.prices.grand_total.currency},excludingTax:{value:e.prices.grand_total_excluding_tax.value,currency:e.prices.grand_total_excluding_tax.currency}},discount:P(e.prices.discounts,e.prices.grand_total.currency),subtotal:{excludingTax:{value:(g=e.prices.subtotal_excluding_tax)==null?void 0:g.value,currency:(y=e.prices.subtotal_excluding_tax)==null?void 0:y.currency},includingTax:{value:(d=e.prices.subtotal_including_tax)==null?void 0:d.value,currency:(m=e.prices.subtotal_including_tax)==null?void 0:m.currency},includingDiscountOnly:{value:(t=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:t.value,currency:(C=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:C.currency}},appliedTaxes:F(e.prices.applied_taxes),totalTax:P(e.prices.applied_taxes,e.prices.grand_total.currency),appliedDiscounts:F(e.prices.discounts),isVirtual:e.is_virtual,addresses:{shipping:e.shipping_addresses&&se(e)},isGuestCart:!o.authenticated,hasOutOfStockItems:te(e),hasFullyOutOfStockItems:_e(e),appliedCoupons:e.applied_coupons};return X(n,(b=(v=(h=B.getConfig().models)==null?void 0:h.CartModel)==null?void 0:v.transformer)==null?void 0:b.call(v,e))}function j(e){var n,c,r,u,l,i,a,_,g,y,d,m;return{giftWrappingForItems:{value:((n=e==null?void 0:e.gift_wrapping_for_items)==null?void 0:n.value)??0,currency:((c=e==null?void 0:e.gift_wrapping_for_items)==null?void 0:c.currency)??"USD"},giftWrappingForItemsInclTax:{value:((r=e==null?void 0:e.gift_wrapping_for_items_incl_tax)==null?void 0:r.value)??0,currency:((u=e==null?void 0:e.gift_wrapping_for_items_incl_tax)==null?void 0:u.currency)??"USD"},giftWrappingForOrder:{value:((l=e==null?void 0:e.gift_wrapping_for_order)==null?void 0:l.value)??0,currency:((i=e==null?void 0:e.gift_wrapping_for_order)==null?void 0:i.currency)??"USD"},giftWrappingForOrderInclTax:{value:((a=e==null?void 0:e.gift_wrapping_for_order_incl_tax)==null?void 0:a.value)??0,currency:((_=e==null?void 0:e.gift_wrapping_for_order_incl_tax)==null?void 0:_.currency)??"USD"},printedCard:{value:((g=e==null?void 0:e.printed_card)==null?void 0:g.value)??0,currency:((y=e==null?void 0:e.printed_card)==null?void 0:y.currency)??"USD"},printedCardInclTax:{value:((d=e==null?void 0:e.printed_card_incl_tax)==null?void 0:d.value)??0,currency:((m=e==null?void 0:e.printed_card_incl_tax)==null?void 0:m.currency)??"USD"}}}function P(e,n){return e!=null&&e.length?e.reduce((c,r)=>({value:c.value+r.amount.value,currency:r.amount.currency}),{value:0,currency:n}):{value:0,currency:n}}function Y(e,n){var c,r,u,l;return{src:e!=null&&e.useConfigurableParentThumbnail?n.product.thumbnail.url:((r=(c=n.configured_variant)==null?void 0:c.thumbnail)==null?void 0:r.url)||n.product.thumbnail.url,alt:e!=null&&e.useConfigurableParentThumbnail?n.product.thumbnail.label:((l=(u=n.configured_variant)==null?void 0:u.thumbnail)==null?void 0:l.label)||n.product.thumbnail.label}}function O(e){var n,c,r,u;return e.__typename==="ConfigurableCartItem"?{value:(c=(n=e.configured_variant)==null?void 0:n.price_range)==null?void 0:c.maximum_price.regular_price.value,currency:(u=(r=e.configured_variant)==null?void 0:r.price_range)==null?void 0:u.maximum_price.regular_price.currency}:e.__typename==="GiftCardCartItem"?{value:e.prices.price.value,currency:e.prices.price.currency}:{value:e.prices.original_item_price.value,currency:e.prices.original_item_price.currency}}function H(e){var n,c,r;return e.__typename==="ConfigurableCartItem"?((c=(n=e.configured_variant)==null?void 0:n.price_range)==null?void 0:c.maximum_price.discount.amount_off)>0:((r=e.product.price_range)==null?void 0:r.maximum_price.discount.amount_off)>0}function J(e){var n,c,r;return{senderName:((n=e==null?void 0:e.gift_message)==null?void 0:n.from)??"",recipientName:((c=e==null?void 0:e.gift_message)==null?void 0:c.to)??"",message:((r=e==null?void 0:e.gift_message)==null?void 0:r.message)??""}}function Z(e){return{currency:(e==null?void 0:e.currency)??"USD",value:(e==null?void 0:e.value)??0}}function N(e){var c;if(!((c=e==null?void 0:e.items)!=null&&c.length))return[];const n=o.config;return e.items.map(r=>{var u,l,i,a,_,g,y,d,m;return{giftWrappingAvailable:((u=r==null?void 0:r.product)==null?void 0:u.gift_wrapping_available)??!1,giftWrappingPrice:Z((l=r==null?void 0:r.product)==null?void 0:l.gift_wrapping_price),giftMessage:J(r),productGiftWrapping:((i=r==null?void 0:r.available_gift_wrapping)==null?void 0:i.map(t=>{var C,h,v,b,s;return{design:t.design??"",uid:t.uid,selected:((C=r.gift_wrapping)==null?void 0:C.uid)===t.uid,image:{url:((h=t==null?void 0:t.image)==null?void 0:h.url)??"",label:((v=t.image)==null?void 0:v.label)??""},price:{currency:((b=t==null?void 0:t.price)==null?void 0:b.currency)??"USD",value:((s=t==null?void 0:t.price)==null?void 0:s.value)??0}}}))??[],itemType:r.__typename,uid:r.uid,giftMessageAvailable:ee(r.product.gift_message_available),url:{urlKey:r.product.url_key,categories:r.product.categories.map(t=>t.url_key)},canonicalUrl:r.product.canonical_url,categories:r.product.categories.map(t=>t.name),quantity:r.quantity,sku:pe(r),topLevelSku:r.product.sku,name:r.product.name,image:Y(n,r),price:{value:r.prices.price.value,currency:r.prices.price.currency},taxedPrice:{value:r.prices.price_including_tax.value,currency:r.prices.price_including_tax.currency},fixedProductTaxes:r.prices.fixed_product_taxes,rowTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency},rowTotalIncludingTax:{value:r.prices.row_total_including_tax.value,currency:r.prices.row_total_including_tax.currency},links:ie(r.links),total:{value:(a=r.prices.original_row_total)==null?void 0:a.value,currency:(_=r.prices.original_row_total)==null?void 0:_.currency},discount:{value:r.prices.total_item_discount.value,currency:r.prices.total_item_discount.currency,label:(g=r.prices.discounts)==null?void 0:g.map(t=>t.label)},regularPrice:O(r),discounted:H(r),bundleOptions:r.__typename==="BundleCartItem"?ne(r.bundle_options):null,bundleOptionsUIDs:r.__typename==="BundleCartItem"?ce(r.bundle_options):null,selectedOptions:(y=$(r.configurable_options))==null?void 0:y.options,selectedOptionsUIDs:(d=$(r.configurable_options))==null?void 0:d.uids,customizableOptions:ue(r.customizable_options),sender:r.__typename==="GiftCardCartItem"?r.sender_name:null,senderEmail:r.__typename==="GiftCardCartItem"?r.sender_email:null,recipient:r.__typename==="GiftCardCartItem"?r.recipient_name:null,recipientEmail:r.__typename==="GiftCardCartItem"?r.recipient_email:null,message:r.__typename==="GiftCardCartItem"?r.message:null,discountedTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency},onlyXLeftInStock:r.__typename==="ConfigurableCartItem"?(m=r.configured_variant)==null?void 0:m.only_x_left_in_stock:r.product.only_x_left_in_stock,lowInventory:r.is_available&&r.product.only_x_left_in_stock!==null,insufficientQuantity:(r.__typename==="ConfigurableCartItem"?r.configured_variant:r.product).stock_status==="IN_STOCK"&&!r.is_available,outOfStock:r.product.stock_status==="OUT_OF_STOCK",stockLevel:oe(r),discountPercentage:ae(r),savingsAmount:ge(r),productAttributes:fe(r)}})}function ee(e){switch(+e){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}}function re(e){var c;const n=(c=e==null?void 0:e.items)==null?void 0:c.reduce((r,u)=>{var l;return(l=u.errors)==null||l.forEach(i=>{r.push({uid:u.uid,text:i.message})}),r},[]);return n!=null&&n.length?n:null}function F(e){return e!=null&&e.length?e.map(n=>({amount:{value:n.amount.value,currency:n.amount.currency},label:n.label,coupon:n.coupon})):[]}function ne(e){const n=e==null?void 0:e.map(r=>({uid:r.uid,label:r.label,value:r.values.map(u=>u.label).join(", ")})),c={};return n==null||n.forEach(r=>{c[r.label]=r.value}),Object.keys(c).length>0?c:null}function ce(e){if(!(e!=null&&e.length))return null;const n=[];return e.forEach(c=>{var r;if((r=c.values)!=null&&r.length){const u=c.values.map(l=>l.uid);n.push(...u)}}),n.length>0?n:null}function $(e){const n=e==null?void 0:e.map(u=>({uid:u.configurable_product_option_uid,label:u.option_label,value:u.value_label,valueUid:u.configurable_product_option_value_uid})),c={},r={};return n==null||n.forEach(u=>{c[u.label]=u.value,r[u.label]=u.valueUid}),{options:Object.keys(c).length>0?c:null,uids:Object.keys(r).length>0?r:null}}function ue(e){const n=e==null?void 0:e.map(r=>({uid:r.customizable_option_uid,label:r.label,type:r.type,values:r.values.map(u=>({uid:u.customizable_option_value_uid,label:u.label,value:u.value}))})),c={};return n==null||n.forEach(r=>{var u;switch(r.type){case"field":case"area":case"date_time":c[r.label]=r.values[0].value;break;case"radio":case"drop_down":c[r.label]=r.values[0].label;break;case"multiple":case"checkbox":c[r.label]=r.values.reduce((l,i)=>l?`${l}, ${i.label}`:i.label,"");break;case"file":{const l=new DOMParser,i=r.values[0].value,_=((u=l.parseFromString(i,"text/html").querySelector("a"))==null?void 0:u.textContent)||"";c[r.label]=_;break}}}),c}function le(e){var n,c;return((n=o.config)==null?void 0:n.cartSummaryDisplayTotal)===0?e.itemsV2.items.length:((c=o.config)==null?void 0:c.cartSummaryDisplayTotal)===1?e.total_quantity:e.itemsV2.items.length}function ie(e){return(e==null?void 0:e.length)>0?{count:e.length,result:e.map(n=>n.title).join(", ")}:null}function se(e){var n,c,r,u;return(n=e.shipping_addresses)!=null&&n.length?(c=e.shipping_addresses)==null?void 0:c.map(l=>({countryCode:l.country.code,zipCode:l.postcode,regionCode:l.region.code})):(r=e.addresses)!=null&&r.length?(u=e.addresses)==null?void 0:u.filter(l=>l.default_shipping).map(l=>{var i;return l.default_shipping&&{countryCode:l.country_code,zipCode:l.postcode,regionCode:(i=l.region)==null?void 0:i.region_code}}):null}function te(e){var n,c;return(c=(n=e==null?void 0:e.itemsV2)==null?void 0:n.items)==null?void 0:c.some(r=>{var u;return((u=r==null?void 0:r.product)==null?void 0:u.stock_status)==="OUT_OF_STOCK"||r.product.stock_status==="IN_STOCK"&&!r.is_available})}function oe(e){return e.not_available_message?e.product.quantity!=null?e.product.quantity:"noNumber":null}function _e(e){var n,c;return(c=(n=e==null?void 0:e.itemsV2)==null?void 0:n.items)==null?void 0:c.some(r=>{var u;return((u=r==null?void 0:r.product)==null?void 0:u.stock_status)==="OUT_OF_STOCK"})}function ae(e){var c,r,u,l,i,a,_,g;let n;if(e.__typename==="ConfigurableCartItem")n=(l=(u=(r=(c=e==null?void 0:e.configured_variant)==null?void 0:c.price_range)==null?void 0:r.maximum_price)==null?void 0:u.discount)==null?void 0:l.percent_off;else{if(e.__typename==="BundleCartItem")return;n=(g=(_=(a=(i=e==null?void 0:e.product)==null?void 0:i.price_range)==null?void 0:a.maximum_price)==null?void 0:_.discount)==null?void 0:g.percent_off}if(n!==0)return Math.round(n)}function pe(e){var n;return e.__typename==="ConfigurableCartItem"?e.configured_variant.sku:((n=e.product)==null?void 0:n.variantSku)||e.product.sku}function ge(e){var r,u,l,i,a,_;let n,c;if(n=((u=(r=e==null?void 0:e.prices)==null?void 0:r.original_row_total)==null?void 0:u.value)-((i=(l=e==null?void 0:e.prices)==null?void 0:l.row_total)==null?void 0:i.value),c=(_=(a=e==null?void 0:e.prices)==null?void 0:a.row_total)==null?void 0:_.currency,n!==0)return{value:n,currency:c}}function fe(e){var n,c,r;return(r=(c=(n=e==null?void 0:e.product)==null?void 0:n.custom_attributesV2)==null?void 0:c.items)==null?void 0:r.map(u=>{const l=u.code.split("_").map(i=>i.charAt(0).toUpperCase()+i.slice(1)).join(" ");return{...u,code:l}})}function ye(e){var r,u;if(!e)return null;const n=l=>{switch(l){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}},c=l=>{switch(+l){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}};return{displayMiniCart:e.minicart_display,miniCartMaxItemsDisplay:e.minicart_max_items,cartExpiresInDays:e.cart_expires_in_days,cartSummaryDisplayTotal:e.cart_summary_display_quantity,cartSummaryMaxItems:e.max_items_in_order_summary,defaultCountry:e.default_country,categoryFixedProductTaxDisplaySetting:e.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:e.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:e.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:n(e.shopping_cart_display_subtotal),price:n(e.shopping_cart_display_price),shipping:n(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total,taxGiftWrapping:e.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent",allowGiftWrappingOnOrder:c(e==null?void 0:e.allow_gift_wrapping_on_order),allowGiftWrappingOnOrderItems:c(e==null?void 0:e.allow_gift_wrapping_on_order_items),allowGiftMessageOnOrder:c(e==null?void 0:e.allow_order),allowGiftMessageOnOrderItems:c(e==null?void 0:e.allow_items),allowGiftReceipt:!!+(e==null?void 0:e.allow_gift_receipt),allowPrintedCard:!!+(e==null?void 0:e.allow_printed_card),printedCardPrice:{currency:((r=e==null?void 0:e.printed_card_priceV2)==null?void 0:r.currency)??"",value:((u=e==null?void 0:e.printed_card_priceV2)==null?void 0:u.value)!=null?+e.printed_card_priceV2.value:0},cartGiftWrapping:n(+e.cart_gift_wrapping),cartPrintedCard:n(+e.cart_printed_card)}}const de=`
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
`,me=`
  query GUEST_CART_QUERY(
      $cartId: String!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
    ) {

    cart(cart_id: $cartId){
      ...CART_FRAGMENT
    }
  }

  ${A}
`,ve=`
  query CUSTOMER_CART_QUERY(
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
    ) {
     
    customer {
      ...CUSTOMER_FRAGMENT
    }

    cart: customerCart {
      ...CART_FRAGMENT
    }
  }

  ${de}
  ${A}
`,G=async()=>{const e=o.authenticated,n=o.cartId;if(e)return I(ve,{method:"POST"}).then(({errors:c,data:r})=>{if(c)return U(c);const u={...r.cart,...r.customer};return k(u)});if(!n)throw new Error("No cart ID found");return I(me,{method:"POST",cache:"no-cache",variables:{cartId:n}}).then(({errors:c,data:r})=>c?U(c):k(r.cart))},Ce=`
  mutation MERGE_CARTS_MUTATION(
      $guestCartId: String!, 
      $customerCartId: String!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
    ) {
      mergeCarts(
        source_cart_id: $guestCartId,
        destination_cart_id: $customerCartId
      ) {
        ...CART_FRAGMENT 
      }
  }

  ${A}
`,D=async()=>{if(o.initializing)return null;o.initializing=!0,o.config||(o.config=await be());const e=o.authenticated?await V():await Q();return f.emit("cart/initialized",e),f.emit("cart/data",e),o.initializing=!1,e};async function V(){const e=o.cartId,n=await G();return n?(o.cartId=n.id,!e||n.id===e?n:await I(Ce,{variables:{guestCartId:e,customerCartId:n.id}}).then(()=>G()).then(c=>{const r={oldCartItems:n.items,newCart:c};return f.emit("cart/merged",r),c}).catch(()=>(console.error("Could not merge carts"),n))):null}async function Q(){if(B.getConfig().disableGuestCart===!0||!o.cartId)return null;try{return await G()}catch(e){return console.error(e),null}}const he=`
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
`,be=async()=>I(he,{method:"GET",cache:"force-cache"}).then(({errors:e,data:n})=>e?U(e):ye(n.storeConfig)),xe=async()=>{const e=o.authenticated?await V():await Q();return f.emit("cart/data",e),e};export{D as a,V as b,B as c,Q as d,be as e,G as g,z as i,xe as r,k as t};
//# sourceMappingURL=refreshCart.js.map
