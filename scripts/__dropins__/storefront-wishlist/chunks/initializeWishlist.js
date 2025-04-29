/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as E}from"@dropins/tools/lib.js";import{events as r}from"@dropins/tools/event-bus.js";import{s as i,i as g,f as c,h as _,m as y,j as T,W as x,g as h,t as S}from"./removeProductsFromWishlist.js";const P=new E({init:async t=>{const s={isGuestWishlistEnabled:!1,...t};P.config.setConfig(s),w().catch(console.error)},listeners:()=>[r.on("authenticated",t=>{i.authenticated&&!t&&r.emit("wishlist/reset",void 0),t&&!i.authenticated&&(i.authenticated=t,w().catch(console.error))},{eager:!0}),r.on("wishlist/data",t=>{g(t)}),r.on("wishlist/reset",()=>{R().catch(console.error),r.emit("wishlist/data",null)})]}),$=P.config;function C(t){if(!t)return null;const s=e=>{switch(e){case 1:return"INCLUDING_FPT_AND_DESCRIPTION";case 2:return"EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";case 3:return"EXCLUDING_FPT";default:return"INCLUDING_FPT_ONLY"}};return{wishlistIsEnabled:t.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:t.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:t.storeConfig.maximum_number_of_wishlists,fixedProductTaxesEnabled:t.storeConfig.fixed_product_taxes_enable,fixedProductTaxesApply:t.storeConfig.fixed_product_taxes_apply_tax_to_fpt,fixedProductTaxesEnabledDisplayInProductLists:s(t.storeConfig.fixed_product_taxes_display_prices_in_product_lists),fixedProductTaxesEnabledDisplayInSalesModules:s(t.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),fixedProductTaxesEnabledDisplayInProductView:s(t.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)}}const b=`
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
    fixed_product_taxes_enable
    fixed_product_taxes_apply_tax_to_fpt
    fixed_product_taxes_display_prices_in_product_lists
    fixed_product_taxes_display_prices_in_sales_modules
    fixed_product_taxes_display_prices_on_product_view_page    
  }
}
`,D=async()=>c(b,{method:"GET",cache:"force-cache"}).then(({errors:t,data:s})=>t?_(t):C(s)),W=`
  query GET_PRODUCT_BY_SKU($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
        items {
          sku
          name
          thumbnail {
            label
            url
          }
          price_range {
            minimum_price {
              regular_price {
                currency
                value
              }
              final_price {
                currency
                value
              }
              discount {
                amount_off
                percent_off
              }
            }
          }
          stock_status
          ... on SimpleProduct {
            stock_status
            options {
              uid
            }
          }
          ... on ConfigurableProduct {
            configurable_options {
              uid
              attribute_uid
              attribute_code
              values {
                uid
              }
            }
            variants {
              product {
                sku
                stock_status
              }
            }
          }
          ... on BundleProduct {
            items {
              uid
              title
              options {
                uid
                label
                quantity
              }
            }
          }
        }
      }
    }
`,N=async t=>{if(!t)throw Error("Product SKU is not set");return c(W,{variables:{sku:t}}).then(({errors:s,data:e})=>{var o;return s?_(s):(o=e==null?void 0:e.products)!=null&&o.items?y(e.products.items[0]):null})},G=`
  query GET_WISHLISTS_QUERY(${T}) {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${x}
`,U=async()=>i.authenticated?c(G).then(({errors:t,data:s})=>{var e;return t?_(t):(e=s==null?void 0:s.customer)!=null&&e.wishlists?s.customer.wishlists.map(o=>S(o)):null}):h(),L=`
  mutation ADD_PRODUCTS_TO_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItems: [WishlistItemInput!]!,
      ${T}
    ) {
    addProductsToWishlist(
      wishlistId: $wishlistId
      wishlistItems: $wishlistItems
    ) {
      wishlist {
        ...WISHLIST_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }
  
${x}
`,M=async t=>{var p,m;if(!i.authenticated){const l=h();for(const u of t){const d=await N(u.sku);if(!((p=l.items)==null?void 0:p.some(n=>n.product.sku===u.sku))){let n={id:l.id,items:l.items};n.items=[...n.items,{product:d}],g(n),r.emit("wishlist/data",n),r.emit("wishlist/update",{action:"add",item:n.items[n.items.length-1]})}}return null}if(!i.wishlistId)throw Error("Wishlist ID is not set");const s={wishlistId:i.wishlistId,wishlistItems:t.map(({sku:l,parentSku:u,quantity:d,optionsUIDs:I,enteredOptions:n})=>({sku:l,parent_sku:u,quantity:d,selected_options:I,entered_options:n}))},{errors:e,data:o}=await c(L,{variables:s}),f=[...((m=o==null?void 0:o.addProductsToWishlist)==null?void 0:m.user_errors)??[],...e??[]];if(f.length>0)return _(f);const a=S(o.addProductsToWishlist.wishlist);return i.currentPage=1,r.emit("wishlist/data",a),r.emit("wishlist/update",{action:"add",item:a.items[a.items.length-1]}),a},R=()=>(i.wishlistId=null,i.authenticated=!1,Promise.resolve(null)),w=async()=>{if(i.initializing)return null;i.initializing=!0,i.config||(i.config=await D());const t=i.authenticated?await O():await k();return r.emit("wishlist/initialized",t),r.emit("wishlist/data",t),i.initializing=!1,t};async function O(){const t=await U(),s=t?t[0]:null;return s?(i.wishlistId=s.id,s):null}async function k(){try{return await h()}catch(t){throw console.error(t),t}}export{M as a,N as b,$ as c,U as d,w as e,O as f,D as g,k as h,P as i,R as r};
