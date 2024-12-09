/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as i,d as A,f as g,h as y}from"./resetCart.js";import{events as l}from"@dropins/tools/event-bus.js";import{Initializer as R,merge as w}from"@dropins/tools/lib.js";import{a as G}from"./persisted-data.js";import{CART_FRAGMENT as d}from"../fragments.js";const I=new R({init:async r=>{const t={disableGuestCart:!1,...r};I.config.setConfig(t),f().catch(console.error)},listeners:()=>[l.on("authenticated",r=>{i.authenticated&&!r?l.emit("cart/reset",void 0):r&&!i.authenticated&&(i.authenticated=r,f().catch(console.error))},{eager:!0}),l.on("locale",async r=>{r!==i.locale&&(i.locale=r,f().catch(console.error))}),l.on("cart/reset",()=>{A().catch(console.error),l.emit("cart/data",null)}),l.on("cart/data",r=>{G(r)}),l.on("checkout/updated",r=>{r&&tr().catch(console.error)})]}),S=I.config;function b(r){var n,e,c,u,s,a,o,_,p,h;if(!r)return null;const t={id:r.id,totalQuantity:z(r),totalUniqueItems:r.itemsV2.items.length,errors:D(r==null?void 0:r.itemsV2),items:v(r==null?void 0:r.itemsV2),miniCartMaxItems:v(r==null?void 0:r.itemsV2).slice(0,((n=i.config)==null?void 0:n.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:r.prices.grand_total.value,currency:r.prices.grand_total.currency},excludingTax:{value:r.prices.grand_total_excluding_tax.value,currency:r.prices.grand_total_excluding_tax.currency}},discount:x(r.prices.discounts,r.prices.grand_total.currency),subtotal:{excludingTax:{value:(e=r.prices.subtotal_excluding_tax)==null?void 0:e.value,currency:(c=r.prices.subtotal_excluding_tax)==null?void 0:c.currency},includingTax:{value:(u=r.prices.subtotal_including_tax)==null?void 0:u.value,currency:(s=r.prices.subtotal_including_tax)==null?void 0:s.currency},includingDiscountOnly:{value:(a=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:a.value,currency:(o=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:o.currency}},appliedTaxes:T(r.prices.applied_taxes),totalTax:x(r.prices.applied_taxes,r.prices.grand_total.currency),appliedDiscounts:T(r.prices.discounts),isVirtual:r.is_virtual,addresses:{shipping:r.shipping_addresses&&Q(r)},isGuestCart:!i.authenticated,hasOutOfStockItems:q(r),hasFullyOutOfStockItems:V(r),appliedCoupons:r.applied_coupons};return w(t,(h=(p=(_=S.getConfig().models)==null?void 0:_.CartModel)==null?void 0:p.transformer)==null?void 0:h.call(p,r))}function x(r,t){return r!=null&&r.length?r.reduce((n,e)=>({value:n.value+e.amount.value,currency:e.amount.currency}),{value:0,currency:t}):{value:0,currency:t}}function k(r,t){var n,e,c,u;return{src:r!=null&&r.useConfigurableParentThumbnail?t.product.thumbnail.url:((e=(n=t.configured_variant)==null?void 0:n.thumbnail)==null?void 0:e.url)||t.product.thumbnail.url,alt:r!=null&&r.useConfigurableParentThumbnail?t.product.thumbnail.label:((u=(c=t.configured_variant)==null?void 0:c.thumbnail)==null?void 0:u.label)||t.product.thumbnail.label}}function U(r){var t,n,e,c;return r.__typename==="ConfigurableCartItem"?{value:(n=(t=r.configured_variant)==null?void 0:t.price_range)==null?void 0:n.maximum_price.regular_price.value,currency:(c=(e=r.configured_variant)==null?void 0:e.price_range)==null?void 0:c.maximum_price.regular_price.currency}:r.__typename==="GiftCardCartItem"?{value:r.prices.price.value,currency:r.prices.price.currency}:{value:r.prices.original_item_price.value,currency:r.prices.original_item_price.currency}}function M(r){var t,n,e;return r.__typename==="ConfigurableCartItem"?((n=(t=r.configured_variant)==null?void 0:t.price_range)==null?void 0:n.maximum_price.discount.amount_off)>0:((e=r.product.price_range)==null?void 0:e.maximum_price.discount.amount_off)>0}function v(r){var n;if(!((n=r==null?void 0:r.items)!=null&&n.length))return[];const t=i.config;return r.items.map(e=>{var c,u,s,a;return{itemType:e.__typename,uid:e.uid,url:{urlKey:e.product.url_key,categories:e.product.categories.map(o=>o.url_key)},canonicalUrl:e.product.canonical_url,categories:e.product.categories.map(o=>o.name),quantity:e.quantity,sku:K(e),topLevelSku:e.product.sku,name:e.product.name,image:k(t,e),price:{value:e.prices.price.value,currency:e.prices.price.currency},taxedPrice:{value:e.prices.price_including_tax.value,currency:e.prices.price_including_tax.currency},fixedProductTaxes:e.prices.fixed_product_taxes,rowTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},rowTotalIncludingTax:{value:e.prices.row_total_including_tax.value,currency:e.prices.row_total_including_tax.currency},links:$(e.links),total:{value:(c=e.prices.original_row_total)==null?void 0:c.value,currency:(u=e.prices.original_row_total)==null?void 0:u.currency},discount:{value:e.prices.total_item_discount.value,currency:e.prices.total_item_discount.currency,label:(s=e.prices.discounts)==null?void 0:s.map(o=>o.label)},regularPrice:U(e),discounted:M(e),bundleOptions:e.__typename==="BundleCartItem"?N(e.bundle_options):null,selectedOptions:P(e.configurable_options),customizableOptions:F(e.customizable_options),sender:e.__typename==="GiftCardCartItem"?e.sender_name:null,senderEmail:e.__typename==="GiftCardCartItem"?e.sender_email:null,recipient:e.__typename==="GiftCardCartItem"?e.recipient_name:null,recipientEmail:e.__typename==="GiftCardCartItem"?e.recipient_email:null,message:e.__typename==="GiftCardCartItem"?e.message:null,discountedTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},onlyXLeftInStock:e.__typename==="ConfigurableCartItem"?(a=e.configured_variant)==null?void 0:a.only_x_left_in_stock:e.product.only_x_left_in_stock,lowInventory:e.is_available&&e.product.only_x_left_in_stock!==null,insufficientQuantity:(e.__typename==="ConfigurableCartItem"?e.configured_variant:e.product).stock_status==="IN_STOCK"&&!e.is_available,outOfStock:e.product.stock_status==="OUT_OF_STOCK",stockLevel:L(e),discountPercentage:X(e),savingsAmount:Y(e),productAttributes:j(e)}})}function D(r){var n;const t=(n=r==null?void 0:r.items)==null?void 0:n.reduce((e,c)=>{var u;return(u=c.errors)==null||u.forEach(s=>{e.push({uid:c.uid,text:s.message})}),e},[]);return t!=null&&t.length?t:null}function T(r){return r!=null&&r.length?r.map(t=>({amount:{value:t.amount.value,currency:t.amount.currency},label:t.label,coupon:t.coupon})):[]}function N(r){const t=r==null?void 0:r.map(e=>({uid:e.uid,label:e.label,value:e.values.map(c=>c.label).join(", ")})),n={};return t==null||t.forEach(e=>{n[e.label]=e.value}),Object.keys(n).length>0?n:null}function P(r){const t=r==null?void 0:r.map(e=>({uid:e.configurable_product_option_uid,label:e.option_label,value:e.value_label})),n={};return t==null||t.forEach(e=>{n[e.label]=e.value}),Object.keys(n).length>0?n:null}function F(r){const t=r==null?void 0:r.map(e=>({uid:e.customizable_option_uid,label:e.label,type:e.type,values:e.values.map(c=>({uid:c.customizable_option_value_uid,label:c.label,value:c.value}))})),n={};return t==null||t.forEach(e=>{var c;switch(e.type){case"field":case"area":case"date_time":n[e.label]=e.values[0].value;break;case"radio":case"drop_down":n[e.label]=e.values[0].label;break;case"multiple":case"checkbox":n[e.label]=e.values.reduce((_,p)=>_?`${_}, ${p.label}`:p.label,"");break;case"file":const u=new DOMParser,s=e.values[0].value,o=((c=u.parseFromString(s,"text/html").querySelector("a"))==null?void 0:c.textContent)||"";n[e.label]=o;break}}),n}function z(r){var t,n;return((t=i.config)==null?void 0:t.cartSummaryDisplayTotal)===0?r.itemsV2.items.length:((n=i.config)==null?void 0:n.cartSummaryDisplayTotal)===1?r.total_quantity:r.itemsV2.items.length}function $(r){return(r==null?void 0:r.length)>0?{count:r.length,result:r.map(t=>t.title).join(", ")}:null}function Q(r){var t,n,e,c;return(t=r.shipping_addresses)!=null&&t.length?(n=r.shipping_addresses)==null?void 0:n.map(u=>({countryCode:u.country.code,zipCode:u.postcode,regionCode:u.region.code})):(e=r.addresses)!=null&&e.length?(c=r.addresses)==null?void 0:c.filter(u=>u.default_shipping).map(u=>{var s;return u.default_shipping&&{countryCode:u.country_code,zipCode:u.postcode,regionCode:(s=u.region)==null?void 0:s.region_code}}):null}function q(r){var t,n;return(n=(t=r==null?void 0:r.itemsV2)==null?void 0:t.items)==null?void 0:n.some(e=>{var c;return((c=e==null?void 0:e.product)==null?void 0:c.stock_status)==="OUT_OF_STOCK"||e.product.stock_status==="IN_STOCK"&&!e.is_available})}function L(r){if(!r.not_available_message)return null;const t=r.not_available_message.match(/-?\d+/);return t?parseInt(t[0]):"noNumber"}function V(r){var t,n;return(n=(t=r==null?void 0:r.itemsV2)==null?void 0:t.items)==null?void 0:n.some(e=>{var c;return((c=e==null?void 0:e.product)==null?void 0:c.stock_status)==="OUT_OF_STOCK"})}function X(r){var n,e,c,u,s,a,o,_;let t;if(r.__typename==="ConfigurableCartItem")t=(u=(c=(e=(n=r==null?void 0:r.configured_variant)==null?void 0:n.price_range)==null?void 0:e.maximum_price)==null?void 0:c.discount)==null?void 0:u.percent_off;else{if(r.__typename==="BundleCartItem")return;t=(_=(o=(a=(s=r==null?void 0:r.product)==null?void 0:s.price_range)==null?void 0:a.maximum_price)==null?void 0:o.discount)==null?void 0:_.percent_off}if(t!==0)return Math.round(t)}function K(r){var t;return r.__typename==="ConfigurableCartItem"?r.configured_variant.sku:((t=r.product)==null?void 0:t.variantSku)||r.product.sku}function Y(r){var e,c,u,s,a,o;let t,n;if(t=((c=(e=r==null?void 0:r.prices)==null?void 0:e.original_row_total)==null?void 0:c.value)-((s=(u=r==null?void 0:r.prices)==null?void 0:u.row_total)==null?void 0:s.value),n=(o=(a=r==null?void 0:r.prices)==null?void 0:a.row_total)==null?void 0:o.currency,t!==0)return{value:t,currency:n}}function j(r){var t,n,e;return(e=(n=(t=r==null?void 0:r.product)==null?void 0:t.custom_attributesV2)==null?void 0:n.items)==null?void 0:e.map(c=>{const u=c.code.split("_").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" ");return{...c,code:u}})}function B(r){if(!r)return null;const t=n=>{switch(n){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}};return{displayMiniCart:r.minicart_display,miniCartMaxItemsDisplay:r.minicart_max_items,cartExpiresInDays:r.cart_expires_in_days,cartSummaryDisplayTotal:r.cart_summary_display_quantity,cartSummaryMaxItems:r.max_items_in_order_summary,defaultCountry:r.default_country,categoryFixedProductTaxDisplaySetting:r.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:r.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:r.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:r.shopping_cart_display_zero_tax,subtotal:t(r.shopping_cart_display_subtotal),price:t(r.shopping_cart_display_price),shipping:t(r.shopping_cart_display_shipping),fullSummary:r.shopping_cart_display_full_summary,grandTotal:r.shopping_cart_display_grand_total,taxGiftWrapping:r.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:r.configurable_thumbnail_source==="parent"}}const C=`
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
`,H=`
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
}`,W=`
  query GUEST_CART_QUERY(
      $cartId: String!,
      ${C}
    ) {

    cart(cart_id: $cartId){
      ...CART_FRAGMENT
    }
  }

  ${d}
`,J=`
  query CUSTOMER_CART_QUERY(
      ${C}
    ) {
     
    customer {
      ...CUSTOMER_FRAGMENT
    }

    cart: customerCart {
      ...CART_FRAGMENT
    }
  }

  ${H}
  ${d}
`,m=async()=>{const r=i.authenticated,t=i.cartId;if(r)return g(J,{method:"POST"}).then(({errors:n,data:e})=>{if(n)return y(n);const c={...e.cart,...e.customer};return b(c)});if(!t)throw new Error("No cart ID found");return g(W,{method:"POST",cache:"no-cache",variables:{cartId:t}}).then(({errors:n,data:e})=>n?y(n):b(e.cart))},Z=`
  mutation MERGE_CARTS_MUTATION(
      $guestCartId: String!, 
      $customerCartId: String!,
      ${C}
    ) {
    mergeCarts(
      source_cart_id: $guestCartId,
      destination_cart_id: $customerCartId
    ) {
      ...CART_FRAGMENT 
    }
  }

  ${d}
`,f=async()=>{if(i.initializing)return null;i.initializing=!0,i.config||(i.config=await er());const r=i.authenticated?await E():await O();return l.emit("cart/initialized",r),l.emit("cart/data",r),i.initializing=!1,r};async function E(){const r=i.cartId,t=await m();return t?(i.cartId=t.id,!r||t.id===r?t:await g(Z,{variables:{guestCartId:r,customerCartId:t.id}}).then(()=>m()).then(n=>{const e={oldCartItems:t.items,newCart:n};return l.emit("cart/merged",e),n}).catch(()=>(console.error("Could not merge carts"),t))):null}async function O(){if(S.getConfig().disableGuestCart===!0||!i.cartId)return null;try{return await m()}catch(r){return console.error(r),null}}const rr=`
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
  }
}
`,er=async()=>g(rr,{method:"GET",cache:"force-cache"}).then(({errors:r,data:t})=>r?y(r):B(t.storeConfig)),tr=async()=>{const r=i.authenticated?await E():await O();return l.emit("cart/data",r),r};export{C,f as a,E as b,S as c,O as d,er as e,m as g,I as i,tr as r,b as t};
