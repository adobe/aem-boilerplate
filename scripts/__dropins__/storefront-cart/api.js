/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as g}from"@dropins/tools/event-bus.js";import{Initializer as ue,merge as ae}from"@dropins/tools/lib.js";import{CART_FRAGMENT as b}from"./fragments.js";import{FetchGraphQL as le}from"@dropins/tools/fetch-graphql.js";function _e(e){const t=document.cookie.split(";");for(let n=0;n<t.length;n++){const r=t[n].trim();if(r.indexOf(`${e}=`)===0)return r.substring(e.length+1)}return null}const k="DROPIN__CART__CART__AUTHENTICATED";function pe(e){e?sessionStorage.setItem("DROPIN__CART__CART__DATA",JSON.stringify(e)):sessionStorage.removeItem("DROPIN__CART__CART__DATA")}function L(){const e=sessionStorage.getItem("DROPIN__CART__CART__DATA");return e?JSON.parse(e):null}function fr(e){e?sessionStorage.setItem("DROPIN__CART__SHIPPING__DATA",JSON.stringify(e)):sessionStorage.removeItem("DROPIN__CART__SHIPPING__DATA")}function de(e){e?localStorage.setItem(k,"true"):localStorage.removeItem(k)}function ge(){return localStorage.getItem(k)==="true"}const fe={cartId:null,authenticated:ge()},p=new Proxy(fe,{set(e,t,n){var r;if(e[t]=n,t==="cartId"){if(n===p.cartId)return!0;if(n===null)return document.cookie="DROPIN__CART__CART-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const o=(r=p.config)==null?void 0:r.cartExpiresInDays;o||console.warn('Missing "expiresInDays" config. Cookie expiration will default to 30 days.');const c=new Date;c.setDate(c.getDate()+(o??30)),document.cookie=`DROPIN__CART__CART-ID=${n}; expires=${c.toUTCString()}; path=/`}return t==="authenticated"&&de(n),!0},get(e,t){return t==="cartId"?_e("DROPIN__CART__CART-ID"):e[t]}}),Z=new ue({init:async e=>{const t={disableGuestCart:!1,...e};Z.config.setConfig(t),F().catch(console.error)},listeners:()=>[g.on("authenticated",e=>{p.authenticated&&!e?g.emit("cart/reset",void 0):e&&!p.authenticated&&(p.authenticated=e,F().catch(console.error))},{eager:!0}),g.on("locale",async e=>{e!==p.locale&&(p.locale=e,F().catch(console.error))}),g.on("cart/reset",()=>{ie().catch(console.error),g.emit("cart/data",null)}),g.on("cart/data",e=>{pe(e)}),g.on("checkout/updated",e=>{!e||(e==null?void 0:e.type)==="quote"||J().catch(console.error)}),g.on("requisitionList/alert",()=>{J().catch(console.error)})]}),z=Z.config,{setEndpoint:Cr,setFetchGraphQlHeader:Tr,removeFetchGraphQlHeader:mr,setFetchGraphQlHeaders:yr,fetchGraphQl:y,getConfig:Ir}=new le().getMethods();function A(e){var n,r,o,c,i,s,l,a,u,_,d,T,S,h,f,x;if(!e)return null;const t={appliedGiftCards:((n=e==null?void 0:e.applied_gift_cards)==null?void 0:n.map(C=>{var V,H,X;const m={code:C.code??"",appliedBalance:{value:C.applied_balance.value??0,currency:C.applied_balance.currency??"USD"},currentBalance:{value:C.current_balance.value??0,currency:C.current_balance.currency??"USD"},expirationDate:C.expiration_date??""},D=(V=m==null?void 0:m.currentBalance)==null?void 0:V.value,O=(H=m==null?void 0:m.appliedBalance)==null?void 0:H.value,N=(X=m==null?void 0:m.currentBalance)==null?void 0:X.currency,se=D-O>0?D-O:0;return{...m,giftCardBalance:{value:se,currency:N}}}))??[],id:e.id,totalQuantity:De(e),totalUniqueItems:e.itemsV2.items.length,totalGiftOptions:Ce((r=e==null?void 0:e.prices)==null?void 0:r.gift_options),giftReceiptIncluded:(e==null?void 0:e.gift_receipt_included)??!1,printedCardIncluded:(e==null?void 0:e.printed_card_included)??!1,cartGiftWrapping:((o=e==null?void 0:e.available_gift_wrappings)==null?void 0:o.map(C=>{var m,D,O,N,w;return{design:C.design??"",uid:C.uid,selected:((m=e==null?void 0:e.gift_wrapping)==null?void 0:m.uid)===C.uid,image:{url:((D=C==null?void 0:C.image)==null?void 0:D.url)??"",label:((O=C.image)==null?void 0:O.label)??""},price:{currency:((N=C==null?void 0:C.price)==null?void 0:N.currency)??"USD",value:((w=C==null?void 0:C.price)==null?void 0:w.value)??0}}}))??[],giftMessage:{senderName:((c=e==null?void 0:e.gift_message)==null?void 0:c.from)??"",recipientName:((i=e==null?void 0:e.gift_message)==null?void 0:i.to)??"",message:((s=e==null?void 0:e.gift_message)==null?void 0:s.message)??""},errors:ve(e==null?void 0:e.itemsV2),items:B(e==null?void 0:e.itemsV2),miniCartMaxItems:B(e==null?void 0:e.itemsV2).slice(0,((l=p.config)==null?void 0:l.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:e.prices.grand_total.value,currency:e.prices.grand_total.currency},excludingTax:{value:e.prices.grand_total_excluding_tax.value,currency:e.prices.grand_total_excluding_tax.currency}},discount:W(e.prices.discounts,e.prices.grand_total.currency),subtotal:{excludingTax:{value:(a=e.prices.subtotal_excluding_tax)==null?void 0:a.value,currency:(u=e.prices.subtotal_excluding_tax)==null?void 0:u.currency},includingTax:{value:(_=e.prices.subtotal_including_tax)==null?void 0:_.value,currency:(d=e.prices.subtotal_including_tax)==null?void 0:d.currency},includingDiscountOnly:{value:(T=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:T.value,currency:(S=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:S.currency}},appliedTaxes:j(e.prices.applied_taxes),totalTax:W(e.prices.applied_taxes,e.prices.grand_total.currency),appliedDiscounts:j(e.prices.discounts),isVirtual:e.is_virtual,addresses:{shipping:e.shipping_addresses&&Re(e)},isGuestCart:!p.authenticated,hasOutOfStockItems:Pe(e),hasFullyOutOfStockItems:Ue(e),appliedCoupons:e.applied_coupons};return ae(t,(x=(f=(h=z.getConfig().models)==null?void 0:h.CartModel)==null?void 0:f.transformer)==null?void 0:x.call(f,e))}function Ce(e){var t,n,r,o,c,i,s,l,a,u,_,d;return{giftWrappingForItems:{value:((t=e==null?void 0:e.gift_wrapping_for_items)==null?void 0:t.value)??0,currency:((n=e==null?void 0:e.gift_wrapping_for_items)==null?void 0:n.currency)??"USD"},giftWrappingForItemsInclTax:{value:((r=e==null?void 0:e.gift_wrapping_for_items_incl_tax)==null?void 0:r.value)??0,currency:((o=e==null?void 0:e.gift_wrapping_for_items_incl_tax)==null?void 0:o.currency)??"USD"},giftWrappingForOrder:{value:((c=e==null?void 0:e.gift_wrapping_for_order)==null?void 0:c.value)??0,currency:((i=e==null?void 0:e.gift_wrapping_for_order)==null?void 0:i.currency)??"USD"},giftWrappingForOrderInclTax:{value:((s=e==null?void 0:e.gift_wrapping_for_order_incl_tax)==null?void 0:s.value)??0,currency:((l=e==null?void 0:e.gift_wrapping_for_order_incl_tax)==null?void 0:l.currency)??"USD"},printedCard:{value:((a=e==null?void 0:e.printed_card)==null?void 0:a.value)??0,currency:((u=e==null?void 0:e.printed_card)==null?void 0:u.currency)??"USD"},printedCardInclTax:{value:((_=e==null?void 0:e.printed_card_incl_tax)==null?void 0:_.value)??0,currency:((d=e==null?void 0:e.printed_card_incl_tax)==null?void 0:d.currency)??"USD"}}}function W(e,t){return e!=null&&e.length?e.reduce((n,r)=>({value:n.value+r.amount.value,currency:r.amount.currency}),{value:0,currency:t}):{value:0,currency:t}}function Te(e,t){var n,r,o,c;return{src:e!=null&&e.useConfigurableParentThumbnail?t.product.thumbnail.url:((r=(n=t.configured_variant)==null?void 0:n.thumbnail)==null?void 0:r.url)||t.product.thumbnail.url,alt:e!=null&&e.useConfigurableParentThumbnail?t.product.thumbnail.label:((c=(o=t.configured_variant)==null?void 0:o.thumbnail)==null?void 0:c.label)||t.product.thumbnail.label}}function me(e){var t,n,r,o;return e.__typename==="ConfigurableCartItem"?{value:(n=(t=e.configured_variant)==null?void 0:t.price_range)==null?void 0:n.maximum_price.regular_price.value,currency:(o=(r=e.configured_variant)==null?void 0:r.price_range)==null?void 0:o.maximum_price.regular_price.currency}:e.__typename==="GiftCardCartItem"?{value:e.prices.price.value,currency:e.prices.price.currency}:{value:e.prices.original_item_price.value,currency:e.prices.original_item_price.currency}}function ee(e,t){return e!=null&&e.length&&[...e].sort((r,o)=>o.quantity-r.quantity).find(r=>t>=r.quantity)||null}function ye(e){var i,s;const t=e.quantity,n=e.__typename==="ConfigurableCartItem",r=n?(i=e.configured_variant)==null?void 0:i.price_tiers:e.product.price_tiers,o=n?(s=e.configured_variant)==null?void 0:s.price_range:e.product.price_range,c=ee(r,t);return c?c.discount.amount_off>0:(o==null?void 0:o.maximum_price.discount.amount_off)>0}function Ie(e){var t,n,r;return{senderName:((t=e==null?void 0:e.gift_message)==null?void 0:t.from)??"",recipientName:((n=e==null?void 0:e.gift_message)==null?void 0:n.to)??"",message:((r=e==null?void 0:e.gift_message)==null?void 0:r.message)??""}}function he(e){return{currency:(e==null?void 0:e.currency)??"USD",value:(e==null?void 0:e.value)??0}}function B(e){var n;if(!((n=e==null?void 0:e.items)!=null&&n.length))return[];const t=p.config;return e.items.map(r=>{var o,c,i,s,l,a,u,_,d,T,S,h;return{giftWrappingAvailable:((o=r==null?void 0:r.product)==null?void 0:o.gift_wrapping_available)??!1,giftWrappingPrice:he((c=r==null?void 0:r.product)==null?void 0:c.gift_wrapping_price),giftMessage:Ie(r),productGiftWrapping:((i=r==null?void 0:r.available_gift_wrapping)==null?void 0:i.map(f=>{var x,C,m,D,O;return{design:f.design??"",uid:f.uid,selected:((x=r.gift_wrapping)==null?void 0:x.uid)===f.uid,image:{url:((C=f==null?void 0:f.image)==null?void 0:C.url)??"",label:((m=f.image)==null?void 0:m.label)??""},price:{currency:((D=f==null?void 0:f.price)==null?void 0:D.currency)??"USD",value:((O=f==null?void 0:f.price)==null?void 0:O.value)??0}}}))??[],itemType:r.__typename,uid:r.uid,giftMessageAvailable:Ee(r.product.gift_message_available),url:{urlKey:r.product.url_key,categories:r.product.categories.map(f=>f.url_key)},canonicalUrl:r.product.canonical_url,categories:r.product.categories.map(f=>f.name),priceTiers:r.__typename==="ConfigurableCartItem"?((l=(s=r.configured_variant)==null?void 0:s.price_tiers)==null?void 0:l.map(f=>f))||[]:((a=r.product.price_tiers)==null?void 0:a.map(f=>f))||[],quantity:r.quantity,sku:$e(r),topLevelSku:r.product.sku,name:r.product.name,image:Te(t,r),price:{value:r.prices.price.value,currency:r.prices.price.currency},taxedPrice:{value:r.prices.price_including_tax.value,currency:r.prices.price_including_tax.currency},fixedProductTaxes:r.prices.fixed_product_taxes,rowTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency},rowTotalIncludingTax:{value:r.prices.row_total_including_tax.value,currency:r.prices.row_total_including_tax.currency},links:Oe(r.links),total:{value:(u=r.prices.original_row_total)==null?void 0:u.value,currency:(_=r.prices.original_row_total)==null?void 0:_.currency},discount:{value:r.prices.total_item_discount.value,currency:r.prices.total_item_discount.currency,label:(d=r.prices.discounts)==null?void 0:d.map(f=>f.label)},regularPrice:me(r),discounted:ye(r),bundleOptions:r.__typename==="BundleCartItem"?Se(r.bundle_options):null,bundleOptionsUIDs:r.__typename==="BundleCartItem"?Ae(r.bundle_options):null,selectedOptions:(T=Y(r.configurable_options))==null?void 0:T.options,selectedOptionsUIDs:(S=Y(r.configurable_options))==null?void 0:S.uids,customizableOptions:be(r.customizable_options),sender:r.__typename==="GiftCardCartItem"?r.sender_name:null,senderEmail:r.__typename==="GiftCardCartItem"?r.sender_email:null,recipient:r.__typename==="GiftCardCartItem"?r.recipient_name:null,recipientEmail:r.__typename==="GiftCardCartItem"?r.recipient_email:null,message:r.__typename==="GiftCardCartItem"?r.message:null,discountedTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency},onlyXLeftInStock:r.__typename==="ConfigurableCartItem"?(h=r.configured_variant)==null?void 0:h.only_x_left_in_stock:r.product.only_x_left_in_stock,lowInventory:r.is_available&&r.product.only_x_left_in_stock!==null,insufficientQuantity:(r.__typename==="ConfigurableCartItem"?r.configured_variant:r.product).stock_status==="IN_STOCK"&&!r.is_available,outOfStock:r.product.stock_status==="OUT_OF_STOCK",stockLevel:xe(r),discountPercentage:Ne(r),savingsAmount:Ge(r),productAttributes:Me(r)}})}function Ee(e){switch(+e){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}}function ve(e){var n;const t=(n=e==null?void 0:e.items)==null?void 0:n.reduce((r,o)=>{var c;return(c=o.errors)==null||c.forEach(i=>{r.push({uid:o.uid,text:i.message})}),r},[]);return t!=null&&t.length?t:null}function j(e){return e!=null&&e.length?e.map(t=>({amount:{value:t.amount.value,currency:t.amount.currency},label:t.label,coupon:t.coupon})):[]}function Se(e){const t=e==null?void 0:e.map(r=>({uid:r.uid,label:r.label,value:r.values.map(o=>o.label).join(", ")})),n={};return t==null||t.forEach(r=>{n[r.label]=r.value}),Object.keys(n).length>0?n:null}function Ae(e){if(!(e!=null&&e.length))return null;const t=[];return e.forEach(n=>{var r;if((r=n.values)!=null&&r.length){const o=n.values.map(c=>c.uid);t.push(...o)}}),t.length>0?t:null}function Y(e){const t=e==null?void 0:e.map(o=>({uid:o.configurable_product_option_uid,label:o.option_label,value:o.value_label,valueUid:o.configurable_product_option_value_uid})),n={},r={};return t==null||t.forEach(o=>{n[o.label]=o.value,r[o.label]=o.valueUid}),{options:Object.keys(n).length>0?n:null,uids:Object.keys(r).length>0?r:null}}function be(e){const t=e==null?void 0:e.map(r=>({uid:r.customizable_option_uid,label:r.label,type:r.type,values:r.values.map(o=>({uid:o.customizable_option_value_uid,label:o.label,value:o.value}))})),n={};return t==null||t.forEach(r=>{var o;switch(r.type){case"field":case"area":case"date_time":n[r.label]=r.values[0].value;break;case"radio":case"drop_down":n[r.label]=r.values[0].label;break;case"multiple":case"checkbox":n[r.label]=r.values.reduce((c,i)=>c?`${c}, ${i.label}`:i.label,"");break;case"file":{const c=new DOMParser,i=r.values[0].value,l=((o=c.parseFromString(i,"text/html").querySelector("a"))==null?void 0:o.textContent)||"";n[r.label]=l;break}}}),n}function De(e){var t,n;return((t=p.config)==null?void 0:t.cartSummaryDisplayTotal)===0?e.itemsV2.items.length:((n=p.config)==null?void 0:n.cartSummaryDisplayTotal)===1?e.total_quantity:e.itemsV2.items.length}function Oe(e){return(e==null?void 0:e.length)>0?{count:e.length,result:e.map(t=>t.title).join(", ")}:null}function Re(e){var t,n,r,o;return(t=e.shipping_addresses)!=null&&t.length?(n=e.shipping_addresses)==null?void 0:n.map(c=>({countryCode:c.country.code,zipCode:c.postcode,regionCode:c.region.code})):(r=e.addresses)!=null&&r.length?(o=e.addresses)==null?void 0:o.filter(c=>c.default_shipping).map(c=>{var i;return c.default_shipping&&{countryCode:c.country_code,zipCode:c.postcode,regionCode:(i=c.region)==null?void 0:i.region_code}}):null}function Pe(e){var t,n;return(n=(t=e==null?void 0:e.itemsV2)==null?void 0:t.items)==null?void 0:n.some(r=>{var o;return((o=r==null?void 0:r.product)==null?void 0:o.stock_status)==="OUT_OF_STOCK"||r.product.stock_status==="IN_STOCK"&&!r.is_available})}function xe(e){return e.not_available_message?e.product.quantity!=null?e.product.quantity:"noNumber":null}function Ue(e){var t,n;return(n=(t=e==null?void 0:e.itemsV2)==null?void 0:t.items)==null?void 0:n.some(r=>{var o;return((o=r==null?void 0:r.product)==null?void 0:o.stock_status)==="OUT_OF_STOCK"})}function Ne(e){var o,c,i,s,l,a,u,_;const t=e.quantity,n=ee(e.product.price_tiers,t);if(n)return Math.round(n.discount.percent_off);let r;if(e.__typename==="ConfigurableCartItem")r=(s=(i=(c=(o=e==null?void 0:e.configured_variant)==null?void 0:o.price_range)==null?void 0:c.maximum_price)==null?void 0:i.discount)==null?void 0:s.percent_off;else{if(e.__typename==="BundleCartItem")return;r=(_=(u=(a=(l=e==null?void 0:e.product)==null?void 0:l.price_range)==null?void 0:a.maximum_price)==null?void 0:u.discount)==null?void 0:_.percent_off}if(r!==0)return Math.round(r)}function $e(e){var t;return e.__typename==="ConfigurableCartItem"?e.configured_variant.sku:((t=e.product)==null?void 0:t.variantSku)||e.product.sku}function Ge(e){var r,o,c,i,s,l;let t,n;if(t=((o=(r=e==null?void 0:e.prices)==null?void 0:r.original_row_total)==null?void 0:o.value)-((i=(c=e==null?void 0:e.prices)==null?void 0:c.row_total)==null?void 0:i.value),n=(l=(s=e==null?void 0:e.prices)==null?void 0:s.row_total)==null?void 0:l.currency,t!==0)return{value:t,currency:n}}function Me(e){var t,n,r;return(r=(n=(t=e==null?void 0:e.product)==null?void 0:t.custom_attributesV2)==null?void 0:n.items)==null?void 0:r.map(o=>{const c=o.code.split("_").map(i=>i.charAt(0).toUpperCase()+i.slice(1)).join(" ");return{...o,code:c}})}function we(e){var r,o;if(!e)return null;const t=c=>{switch(c){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}},n=c=>{switch(+c){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}};return{displayMiniCart:e.minicart_display,miniCartMaxItemsDisplay:e.minicart_max_items,cartExpiresInDays:e.cart_expires_in_days,cartSummaryDisplayTotal:e.cart_summary_display_quantity,cartSummaryMaxItems:e.max_items_in_order_summary,defaultCountry:e.default_country,categoryFixedProductTaxDisplaySetting:e.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:e.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:e.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:t(e.shopping_cart_display_subtotal),price:t(e.shopping_cart_display_price),shipping:t(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total,taxGiftWrapping:e.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent",allowGiftWrappingOnOrder:n(e==null?void 0:e.allow_gift_wrapping_on_order),allowGiftWrappingOnOrderItems:n(e==null?void 0:e.allow_gift_wrapping_on_order_items),allowGiftMessageOnOrder:n(e==null?void 0:e.allow_order),allowGiftMessageOnOrderItems:n(e==null?void 0:e.allow_items),allowGiftReceipt:!!+(e==null?void 0:e.allow_gift_receipt),allowPrintedCard:!!+(e==null?void 0:e.allow_printed_card),printedCardPrice:{currency:((r=e==null?void 0:e.printed_card_priceV2)==null?void 0:r.currency)??"",value:((o=e==null?void 0:e.printed_card_priceV2)==null?void 0:o.value)!=null?+e.printed_card_priceV2.value:0},cartGiftWrapping:t(+e.cart_gift_wrapping),cartPrintedCard:t(+e.cart_printed_card)}}const I=e=>{const t=e.findIndex(({extensions:c})=>(c==null?void 0:c.category)==="graphql-authorization")>-1,n=e.findIndex(({path:c,extensions:i})=>(i==null?void 0:i.category)==="graphql-no-such-entity"&&!(c!=null&&c.includes("applyCouponsToCart")))>-1,r=e.map(c=>c.message).join(" "),o=e.findIndex(({path:c,extensions:i})=>(i==null?void 0:i.category)==="graphql-input"&&(c==null?void 0:c.includes("cart")))>-1;if(t||n||o)return ie(),console.error(r),null;throw Error(r)},re=`
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemInput!]!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
    ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: $cartItems
    ) {
      cart {
        ...CART_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }
    
  ${b}
`;function $(e){const{cart:t,locale:n="en-US"}=e;return{id:t.id,items:te(t.items,n),prices:{subtotalExcludingTax:t.subtotal.excludingTax,subtotalIncludingTax:t.subtotal.includingTax},totalQuantity:t.totalUniqueItems,possibleOnepageCheckout:void 0,giftMessageSelected:void 0,giftWrappingSelected:void 0,source:void 0}}function te(e,t){return e.map(n=>({canApplyMsrp:!1,formattedPrice:Fe(t,n.price.currency,n.price.value),id:n.uid,prices:{price:n.price,discount:n.discount&&n.discount.value!==void 0?{value:n.discount.value,currency:n.discount.currency}:void 0},product:{productId:n.uid,name:n.name,sku:n.sku,topLevelSku:n.topLevelSku,specialToDate:void 0,specialFromDate:void 0,newToDate:void 0,newFromDate:void 0,createdAt:void 0,updatedAt:void 0,manufacturer:void 0,countryOfManufacture:void 0,categories:n.categories,productType:n.itemType,pricing:{regularPrice:n.regularPrice.value,minimalPrice:void 0,maximalPrice:void 0,specialPrice:ke(n),tierPricing:void 0,currencyCode:n.regularPrice.currency},canonicalUrl:n.canonicalUrl,mainImageUrl:n.image.src,image:{src:n.image.src,alt:n.image.alt}},configurableOptions:n.selectedOptions?Object.entries(n.selectedOptions).map(([r,o],c)=>({id:c+1,optionLabel:r,valueId:c+1,valueLabel:o})):[],bundleOptions:n.bundleOptions?Object.entries(n.bundleOptions).map(([r,o],c)=>({id:(c+1).toString(),optionLabel:r,valueId:c+1,valueLabel:o})):[],customizableOptions:n.customizableOptions?Object.entries(n.customizableOptions).map(([r,o],c)=>({id:(c+1).toString(),optionLabel:r,valueId:c+1,valueLabel:o})):[],quantity:n.quantity,selectedOptions:(()=>{const r={...n.selectedOptions,...n.bundleOptions,...n.customizableOptions};return Object.keys(r).length>0?r:void 0})()}))}function Fe(e,t,n){const r=e.replace("_","-");return new Intl.NumberFormat(r,{style:"currency",currency:t}).format(n)}function ke(e){var t;if(e.discounted)return(t=e.price)==null?void 0:t.value}const E={SHOPPING_CART_CONTEXT:"shoppingCartContext",PRODUCT_CONTEXT:"productContext",CHANGED_PRODUCTS_CONTEXT:"changedProductsContext",CHANNEL_CONTEXT:"channelContext"},R={OPEN_CART:"open-cart",ADD_TO_CART:"add-to-cart",REMOVE_FROM_CART:"remove-from-cart",SHOPPING_CART_VIEW:"shopping-cart-view",INITIATE_CHECKOUT:"initiate-checkout"};function Q(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function v(e,t){const n=Q();n.push({[e]:null}),n.push({[e]:t})}function G(e,t){Q().push(r=>{const o=r.getState?r.getState():{};r.push({event:e,eventInfo:{...o,...t}})})}function qe(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function M(){v(E.CHANNEL_CONTEXT,qe())}function Le(e,t,n){const r=$({cart:e,locale:n});M(),v(E.SHOPPING_CART_CONTEXT,{...r});const o=te(t,n);v(E.CHANGED_PRODUCTS_CONTEXT,{items:o}),G(R.OPEN_CART),o.forEach(c=>{v(E.PRODUCT_CONTEXT,c.product),U(r,[c],R.ADD_TO_CART)})}function ze(e,t){const n=$({cart:e,locale:t});M(),v(E.SHOPPING_CART_CONTEXT,{...n}),G(R.SHOPPING_CART_VIEW)}function U(e,t,n){const r={items:t};M(),v(E.SHOPPING_CART_CONTEXT,{...e}),v(E.CHANGED_PRODUCTS_CONTEXT,{...r}),G(n)}function P(e,t,n){const r=$({cart:e,locale:n}),o=r.items,c=Q(),i=c.getState?c.getState():{},{shoppingCartContext:{items:s=[]}={}}=i;t.forEach(l=>{const a=s.find(_=>_.id===l.uid),u=o.find(_=>_.id===l.uid);!u&&!a||(!a&&u?(v(E.PRODUCT_CONTEXT,u.product),U(r,[u],R.ADD_TO_CART)):a&&!u?(v(E.PRODUCT_CONTEXT,a.product),U(r,[a],R.REMOVE_FROM_CART)):u.quantity>a.quantity?(v(E.PRODUCT_CONTEXT,u.product),U(r,[u],R.ADD_TO_CART)):(v(E.PRODUCT_CONTEXT,u.product),U(r,[u],R.REMOVE_FROM_CART)))})}function hr(e,t){const n=$({cart:e,locale:t});M(),v(E.SHOPPING_CART_CONTEXT,{...n}),G(R.INITIATE_CHECKOUT)}const Er=async e=>{const t=p.cartId||await Ke().then(n=>n);return y(re,{variables:{cartId:t,cartItems:e.map(({sku:n,parentSku:r,quantity:o,optionsUIDs:c,enteredOptions:i,customFields:s})=>({sku:n,parent_sku:r,quantity:o,selected_options:c,entered_options:i,...s||{}}))}}).then(({errors:n,data:r})=>{var l;const o=[...((l=r==null?void 0:r.addProductsToCart)==null?void 0:l.user_errors)??[],...n??[]];if(o.length>0)return I(o);const c=A(r.addProductsToCart.cart),i=L(),s=(i==null?void 0:i.items)||[];if(g.emit("cart/updated",c),g.emit("cart/data",c),c){const a=c.items.filter(_=>!s.some(d=>d.sku===_.sku)),u=c.items.filter(_=>{const d=s.find(T=>T.sku===_.sku);return d&&_.quantity!==d.quantity});a.length>0&&g.emit("cart/product/added",a),u.length>0&&g.emit("cart/product/updated",u)}if(c){const a=c.items.filter(d=>e.some(({sku:T})=>T.toUpperCase()===d.topLevelSku.toUpperCase())),u=!i||(i.totalQuantity??0)===0,_=(c.totalQuantity??0)>0;u&&_?Le(c,a,p.locale??"en-US"):P(c,a,p.locale??"en-US")}return c})},Qe=`
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
`,Ve=`
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

  ${b}
`,He=`
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

  ${Qe}
  ${b}
`,q=async()=>{const e=p.authenticated,t=p.cartId;if(e)return y(He,{method:"POST"}).then(({errors:n,data:r})=>{if(n)return I(n);const o={...r.cart,...r.customer};return A(o)});if(!t)throw new Error("No cart ID found");return y(Ve,{method:"POST",cache:"no-cache",variables:{cartId:t}}).then(({errors:n,data:r})=>n?I(n):A(r.cart))},Xe=`
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

  ${b}
`,F=async()=>{if(p.initializing)return null;p.initializing=!0,p.config||(p.config=await Ze());const e=p.authenticated?await ne():await ce();return g.emit("cart/initialized",e),g.emit("cart/data",e),p.initializing=!1,e};async function ne(){const e=p.cartId,t=await q();return t?(p.cartId=t.id,!e||t.id===e?t:await y(Xe,{variables:{guestCartId:e,customerCartId:t.id}}).then(()=>q()).then(n=>{const r={oldCartItems:t.items,newCart:n};return g.emit("cart/merged",r),n}).catch(()=>(console.error("Could not merge carts"),t))):null}async function ce(){if(z.getConfig().disableGuestCart===!0||!p.cartId)return null;try{return await q()}catch(e){return console.error(e),null}}const We=`
  mutation UPDATE_PRODUCTS_FROM_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemUpdateInput!]!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
    ) {
    updateCartItems(
      input: {
        cart_id: $cartId
        cart_items: $cartItems
      }
    ) {
      cart {
        ...CART_FRAGMENT
      }

    }
  }

  ${b}
`,oe=(e,t)=>{const n=[];return e.filter(r=>r.errors&&t.some(o=>o===r.uid)).forEach(r=>{var o;(o=r.errors)==null||o.forEach(c=>{n.push({message:c.message,path:[r.uid],extensions:{category:c.code}})})}),n},Be=(e,t)=>{const n=[],r=[],o=[];return e.forEach(c=>{const i=t.find(s=>s.uid===c.uid);if(i)if(c.optionsUIDs){const s=Object.values((i==null?void 0:i.selectedOptionsUIDs)??{});if(c.optionsUIDs.every(a=>s.includes(a))&&c.optionsUIDs.length===s.length)o.push({uid:c.uid,quantity:c.quantity,giftOptions:c.giftOptions,customFields:c.customFields});else{const a=t.find(u=>{const _=Object.values((u==null?void 0:u.selectedOptionsUIDs)??{});return u.uid!==c.uid&&u.sku===i.sku&&c.optionsUIDs.every(d=>_.includes(d))&&c.optionsUIDs.length===_.length});if(a)o.push({uid:a.uid,quantity:a.quantity+c.quantity,giftOptions:c.giftOptions,customFields:c.customFields}),r.push(c.uid);else{const{sku:u,topLevelSku:_}=i,{optionsUIDs:d,enteredOptions:T,quantity:S,customFields:h}=c;n.push({sku:u,parentSku:_,quantity:S,optionsUIDs:d,enteredOptions:T,customFields:h}),r.push(c.uid)}}}else if(c.customFields){const{sku:s,topLevelSku:l}=i,{optionsUIDs:a,enteredOptions:u,quantity:_,customFields:d}=c;n.push({sku:s,parentSku:l,quantity:_,optionsUIDs:a,enteredOptions:u,customFields:d}),r.push(c.uid)}else o.push({uid:c.uid,quantity:c.quantity,giftOptions:c.giftOptions,customFields:c.customFields});else throw Error(`Invalid Cart Item UID: No matching cart entry found for ${c.uid}`)}),{itemsToAdd:n,itemsToRemove:r,itemsToUpdate:o}},je=0,vr=async e=>{const t=p.cartId,n=L();if(!t)return Promise.reject(new Error("Cart ID is not set"));if(!n)return Promise.reject(new Error("Cart is not set"));const{itemsToAdd:r,itemsToRemove:o,itemsToUpdate:c}=Be(e,n.items);let i=[];return r.length>0&&i.push(y(re,{variables:{cartId:t,cartItems:r.map(({parentSku:s,quantity:l,optionsUIDs:a,enteredOptions:u,customFields:_})=>({sku:s,quantity:l,selected_options:a,entered_options:u,..._||{}}))}}).then(({errors:s,data:l})=>{var _,d,T,S;const a=oe(((d=(_=l==null?void 0:l.addProductsToCart)==null?void 0:_.cart)==null?void 0:d.itemsV2.items)||[],e.map(h=>h.uid)),u=[...((T=l==null?void 0:l.addProductsToCart)==null?void 0:T.user_errors)??[],...s??[],...a];return u.length>0?I(u):o.length>0?K(t,o.map(h=>({uid:h,quantity:je}))).catch(h=>Promise.reject(new Error(`Failed to update products in cart: ${h}`))):Promise.resolve(A((S=l==null?void 0:l.addProductsToCart)==null?void 0:S.cart))}).then(s=>(g.emit("cart/updated",s),g.emit("cart/data",s),P(s,e,p.locale??"en-US"),Promise.resolve(s))).catch(s=>Promise.reject(new Error(`Failed to add products to cart: ${s}`)))),c.length>0&&i.push(K(t,c).catch(s=>Promise.reject(new Error(s)))),Promise.all(i).then(s=>s[s.length-1])},K=async(e,t)=>y(We,{variables:{cartId:e,cartItems:t.map(({uid:n,quantity:r,giftOptions:o})=>({cart_item_uid:n,quantity:r,...o}))}}).then(({errors:n,data:r})=>{var s,l,a;const o=oe(((l=(s=r==null?void 0:r.updateCartItems)==null?void 0:s.cart)==null?void 0:l.itemsV2.items)||[],t.map(u=>u.uid)),c=[...((a=r==null?void 0:r.updateCartItems)==null?void 0:a.user_errors)??[],...n??[],...o],i=(r==null?void 0:r.updateCartItems)&&A(r.updateCartItems.cart);if(i&&g.emit("cart/data",i),c.length>0)return I(c);if(g.emit("cart/updated",i),i){const u=i.items.filter(_=>t.some(d=>d.uid===_.uid));g.emit("cart/product/updated",u)}return i&&P(i,t,p.locale??"en-US"),i}),ie=()=>(p.cartId=null,p.authenticated=!1,Promise.resolve(null)),Ye=`
    mutation CREATE_GUEST_CART_MUTATION {
        createGuestCart {
          cart {
            id
          }
        }
    }
`,Ke=async()=>{const{disableGuestCart:e}=z.getConfig();if(e)throw new Error("Guest cart is disabled");return await y(Ye).then(({data:t})=>{const n=t.createGuestCart.cart.id;return p.cartId=n,n})},Je=`
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
`,Ze=async()=>y(Je,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?I(e):we(t.storeConfig)),er=e=>{var t,n;return{countryCode:e.country_code||"US",postCode:e.postcode||"",region:((t=e.region)==null?void 0:t.region)||"",regionId:(n=e.region)==null?void 0:n.id}},rr=e=>e?{carrierCode:e.carrier_code||"",methodCode:e.method_code||"",amount:e.amount,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}}}:null,tr=`
query COUNTRIES_QUERY {
  countries {
    label: full_name_locale
    id
  }
  storeConfig {
    defaultCountry: default_country
  }
}
`,nr=`
query REGIONS_QUERY($id: String) {
  country(id: $id) {
    available_regions {
      code
			name
    }
  }
}
`,cr=`
  mutation ESTIMATE_SHIPPING_METHODS_MUTATION(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(
      input: {
        cart_id: $cartId
        address: $address
      }
    ) {
      amount {
        currency
        value
      }
      carrier_code
      method_code
      error_message
      price_excl_tax {
        currency
        value
      }
      price_incl_tax {
        currency
        value
      }
    }
  }
`,Sr=async e=>{const t=p.cartId;if(!t)throw new Error("No cart ID found");if(!e)throw new Error("No address parameter found");const{countryCode:n,postcode:r,region:o}=e,c={country_code:n||"US",postcode:r||"",region:{region:(o==null?void 0:o.region)||"",region_id:o==null?void 0:o.id}};return y(cr,{variables:{cartId:t,address:c}}).then(({errors:i,data:s})=>{if(i)return I(i);const a=s.estimateShippingMethods.find(u=>!u.error_message)||null;return g.emit("shipping/estimate",{address:er(c),shippingMethod:rr(a)}),a})},Ar=async()=>y(tr,{method:"GET"}).then(({errors:e,data:t})=>{var o,c;if(e)return I(e);const n=((o=t==null?void 0:t.countries)==null?void 0:o.sort((i,s)=>i.label.localeCompare(s.label)))||[],r=((c=t==null?void 0:t.storeConfig)==null?void 0:c.defaultCountry)||"US";return n.forEach(i=>{i.isDefaultCountry=i.id===r}),n}),br=async e=>y(nr,{method:"GET",variables:{id:e}}).then(({errors:t,data:n})=>{var r;return t?I(t):((r=n==null?void 0:n.country)==null?void 0:r.available_regions)||[]}),or=`
  mutation GET_ESTIMATED_TOTALS_MUTATION(
    $cartId: String!
    $address: EstimateAddressInput!,
    $shipping_method: ShippingMethodInput,
    $pageSize: Int! = 100,
    $currentPage: Int! = 1,
    $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
    estimateTotals(
      input: {
        cart_id: $cartId
        address: $address
        shipping_method: $shipping_method
      }
    )  {
      cart {
       ...CART_FRAGMENT
      }
    }
    }

  ${b}
  `,Dr=async e=>{var s,l;const t=p.cartId;if(!t)throw new Error("No cart ID found");if(!e)throw new Error("No address parameter found");const{countryCode:n,postcode:r,region:o}=e,c=(s=e.shipping_method)==null?void 0:s.carrier_code,i=(l=e.shipping_method)==null?void 0:l.method_code;return y(or,{variables:{cartId:t,address:{country_code:n||"US",postcode:r,region:(o==null?void 0:o.id)!==void 0?{region_id:o.id}:{region:(o==null?void 0:o.region)??""}},shipping_method:{carrier_code:c||"",method_code:i||""}}}).then(({errors:a,data:u})=>{if(a)return I(a);const _=u.estimateTotals;return _?A(_.cart):null})},J=async()=>{const e=p.authenticated?await ne():await ce();return g.emit("cart/data",e),e},ir=`
mutation APPLY_COUPONS_TO_CART_MUTATION(
    $cartId: String!, 
    $couponCodes: [String!]!, 
    $type: ApplyCouponsStrategy!,
    $pageSize: Int! = 100,
    $currentPage: Int! = 1,
    $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
   applyCouponsToCart(
    input: {
      cart_id: $cartId
      coupon_codes: $couponCodes 
      type: $type
    }
  ) {
    cart {
      ...CART_FRAGMENT
    }

  }
}
${b}
`;var sr=(e=>(e.APPEND="APPEND",e.REPLACE="REPLACE",e))(sr||{});const Or=async(e,t)=>{const n=p.cartId;if(!n)throw Error("Cart ID is not set");return y(ir,{variables:{cartId:n,couponCodes:e,type:t}}).then(({errors:r,data:o})=>{var s;const c=[...((s=o==null?void 0:o.applyCouponsToCart)==null?void 0:s.user_errors)??[],...r??[]];if(c.length>0)return I(c);const i=A(o.applyCouponsToCart.cart);return g.emit("cart/updated",i),g.emit("cart/data",i),i})},Rr=()=>{const e=p.locale??"en-US",t=L();t&&ze(t,e)},ur=`
  mutation APPLY_GIFT_CARD_ON_CART_MUTATION(
      $cartId: String!, 
      $giftCardCode: String!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
 applyGiftCardToCart(
    input: {
     cart_id: $cartId
     gift_card_code: $giftCardCode
    }
  ) {
    cart {
      ...CART_FRAGMENT
    }
  }
}
${b}
`,Pr=async e=>{const t=p.cartId;if(!t)throw Error("Cart ID is not set");return y(ur,{variables:{cartId:t,giftCardCode:e}}).then(({errors:n,data:r})=>{var i;const o=[...((i=r==null?void 0:r.applyGiftCardToCart)==null?void 0:i.user_errors)??[],...n??[]];if(o.length>0)return I(o);const c=A(r.applyGiftCardToCart.cart);return g.emit("cart/updated",c),g.emit("cart/data",c),c&&P(c,[],p.locale??"en-US"),c})},ar=`
  mutation REMOVE_GIFT_CARD_ON_CART_MUTATION(
  $cartId: String!, 
  $giftCardCode: String!,   
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
     removeGiftCardFromCart(
        input: {
         cart_id: $cartId
         gift_card_code: $giftCardCode
        }
      ) {
        cart {
          ...CART_FRAGMENT
        }
      }
}
${b}
`,xr=async e=>{const t=p.cartId;if(!t)throw Error("Cart ID is not set");return y(ar,{variables:{cartId:t,giftCardCode:e}}).then(({errors:n,data:r})=>{var i;const o=[...((i=r==null?void 0:r.addProductsToCart)==null?void 0:i.user_errors)??[],...n??[]];if(o.length>0)return I(o);const c=A(r.removeGiftCardFromCart.cart);return g.emit("cart/updated",c),g.emit("cart/data",c),c&&P(c,[],p.locale??"en-US"),c})},lr=`
  mutation SET_GIFT_OPTIONS_ON_CART_MUTATION(
  $cartId: String!, 
  $giftMessage: GiftMessageInput, 
  $giftWrappingId: ID, 
  $giftReceiptIncluded: Boolean!, 
  $printedCardIncluded: Boolean!,   
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
     setGiftOptionsOnCart(
        input: {
         cart_id: $cartId
         gift_message: $giftMessage
         gift_wrapping_id: $giftWrappingId
         gift_receipt_included: $giftReceiptIncluded
         printed_card_included: $printedCardIncluded
        }
      ) {
        cart {
          ...CART_FRAGMENT
        }
      }
}
${b}
`,Ur=async e=>{const t=p.cartId;if(!t)throw Error("Cart ID is not set");const{recipientName:n,senderName:r,message:o,giftReceiptIncluded:c,printedCardIncluded:i,giftWrappingId:s,isGiftWrappingSelected:l}=e;return y(lr,{variables:{cartId:t,giftMessage:{from:r,to:n,message:o},giftWrappingId:l?s:null,giftReceiptIncluded:c,printedCardIncluded:i}}).then(({errors:a,data:u})=>{var T;const _=[...((T=u==null?void 0:u.addProductsToCart)==null?void 0:T.user_errors)??[],...a??[]];if(_.length>0)return I(_);const d=A(u.setGiftOptionsOnCart.cart);return g.emit("cart/updated",d),g.emit("cart/data",d),d&&P(d,[],p.locale??"en-US"),d})};export{sr as ApplyCouponsStrategy,fr as a,Er as addProductsToCart,Or as applyCouponsToCart,Pr as applyGiftCardToCart,z as config,Ke as createGuestCart,y as fetchGraphQl,q as getCartData,L as getCartDataFromCache,Ir as getConfig,Ar as getCountries,ne as getCustomerCartPayload,Sr as getEstimateShipping,Dr as getEstimatedTotals,ce as getGuestCartPayload,br as getRegions,Ze as getStoreConfig,Z as initialize,F as initializeCart,hr as p,Rr as publishShoppingCartViewEvent,J as refreshCart,mr as removeFetchGraphQlHeader,xr as removeGiftCardFromCart,ie as resetCart,p as s,Cr as setEndpoint,Tr as setFetchGraphQlHeader,yr as setFetchGraphQlHeaders,Ur as setGiftOptionsOnCart,vr as updateProductsFromCart};
//# sourceMappingURL=api.js.map
