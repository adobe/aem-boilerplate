import{events as e}from"@dropins/tools/event-bus.js";import{s as a,d as y,f as s,h as o}from"./resetCart.js";import{C as u,a as l,b as f,t as p}from"./CartFragment.js";import{Initializer as m}from"@dropins/tools/lib.js";import{a as C}from"./persisted-data.js";const d=new m({init:async t=>{const r={disableGuestCart:!1,...t};d.config.setConfig(r),c().catch(console.error)},listeners:()=>[e.on("authenticated",t=>{a.authenticated&&!t?e.emit("cart/reset",void 0):t&&!a.authenticated&&(a.authenticated=t,c().catch(console.error))},{eager:!0}),e.on("locale",async t=>{t!==a.locale&&(a.locale=t,c().catch(console.error))}),e.on("cart/reset",()=>{y().catch(console.error),e.emit("cart/data",null)}),e.on("cart/data",t=>{C(t)})]}),h=d.config;function T(t){if(!t)return null;const r=i=>{switch(i){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}};return{displayMiniCart:t.minicart_display,miniCartMaxItemsDisplay:t.minicart_max_items,cartExpiresInDays:t.cart_expires_in_days,cartSummaryDisplayTotal:t.cart_summary_display_quantity,defaultCountry:t.default_country,categoryFixedProductTaxDisplaySetting:t.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:t.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:t.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:t.shopping_cart_display_zero_tax,subtotal:r(t.shopping_cart_display_subtotal),price:r(t.shopping_cart_display_price),shipping:r(t.shopping_cart_display_shipping),fullSummary:t.shopping_cart_display_full_summary,grandTotal:t.shopping_cart_display_grand_total,taxGiftWrapping:t.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:t.configurable_thumbnail_source==="parent"}}const x=`
  query GUEST_CART_QUERY(
      $cartId: String!,
      ${u}
    ) {

    cart(cart_id: $cartId){
      ...CartFragment
    }
  }

  ${l}
`,I=`
  query CUSTOMER_CART_QUERY(
      ${u}
    ) {
     ${f}

    cart: customerCart {
      ...CartFragment
    }
  }

  ${l}
`,_=async()=>{const t=a.authenticated,r=a.cartId;if(t)return s(I,{method:"POST"}).then(({errors:i,data:n})=>{if(i)return o(i);const g={...n.cart,...n.customer};return p(g)});if(!r)throw new Error("No cart ID found");return s(x,{method:"POST",cache:"no-cache",variables:{cartId:r}}).then(({errors:i,data:n})=>i?o(i):p(n.cart))},E=`
  mutation MERGE_CARTS_MUTATION(
      $guestCartId: String!, 
      $customerCartId: String!,
      ${u}
    ) {
    mergeCarts(
      source_cart_id: $guestCartId,
      destination_cart_id: $customerCartId
    ) {
      ...CartFragment 
    }
  }

  ${l}
`,c=async()=>{if(a.initializing)return null;a.initializing=!0,a.config||(a.config=await A());const t=a.authenticated?await S():await R();return e.emit("cart/initialized",t),e.emit("cart/data",t),a.initializing=!1,t};async function S(){const t=a.cartId,r=await _();return r?(a.cartId=r.id,!t||r.id===t?r:await s(E,{variables:{guestCartId:t,customerCartId:r.id}}).then(()=>_()).then(i=>{const n={oldCartItems:r.items,newCart:i};return e.emit("cart/merged",n),i}).catch(()=>(console.error("Could not merge carts"),r))):null}async function R(){if(h.getConfig().disableGuestCart===!0||!a.cartId)return null;try{return await _()}catch(t){return console.error(t),null}}const G=`
query STORE_CONFIG_QUERY {
  storeConfig {
    minicart_display 
    minicart_max_items
    cart_expires_in_days 
    cart_summary_display_quantity
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
`,A=async()=>s(G,{method:"GET",cache:"force-cache"}).then(({errors:t,data:r})=>t?o(t):T(r.storeConfig));export{R as a,_ as b,h as c,c as d,A as e,S as g,d as i};
