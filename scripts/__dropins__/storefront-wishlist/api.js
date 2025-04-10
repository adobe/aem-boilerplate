/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as p}from"@dropins/tools/lib.js";import{events as l}from"@dropins/tools/event-bus.js";import{s as e,a as g,f as _,h as a,c as m,g as c,t as u,W as d}from"./chunks/removeProductsFromWishlist.js";import{k as O,i as $,r as A,d as M,e as z,j as Q}from"./chunks/removeProductsFromWishlist.js";import{a as B,g as q}from"./chunks/getProductBySku.js";import"@dropins/tools/fetch-graphql.js";const I=new p({init:async s=>{const t={...s};I.config.setConfig({defaultConfig:t}),h().catch(console.error)},listeners:()=>[l.on("authenticated",s=>{e.authenticated&&!s&&l.emit("wishlist/reset",void 0),s&&!e.authenticated&&(e.authenticated=s,h().catch(console.error))},{eager:!0}),l.on("wishlist/data",s=>{g(s)}),l.on("wishlist/reset",()=>{y().catch(console.error),l.emit("wishlist/data",null)})]}),b=I.config;function w(s){if(!s)return null;const t=r=>{switch(r){case 1:return"INCLUDING_FPT_AND_DESCRIPTION";case 2:return"EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";case 3:return"EXCLUDING_FPT";default:return"INCLUDING_FPT_ONLY"}};return{wishlistIsEnabled:s.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:s.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:s.storeConfig.maximum_number_of_wishlists,fixedProductTaxesEnabled:s.storeConfig.fixed_product_taxes_enable,fixedProductTaxesApply:s.storeConfig.fixed_product_taxes_apply_tax_to_fpt,fixedProductTaxesEnabledDisplayInProductLists:t(s.storeConfig.fixed_product_taxes_display_prices_in_product_lists),fixedProductTaxesEnabledDisplayInSalesModules:t(s.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),fixedProductTaxesEnabledDisplayInProductView:t(s.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)}}const T=`
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
`,x=async()=>_(T,{method:"GET",cache:"force-cache"}).then(({errors:s,data:t})=>s?a(s):w(t)),E=`
  query GET_WISHLIST_BY_ID_QUERY(
    $wishlistId: ID!,
    $currentPage: Int!,
    $pageSize: Int!
  ) {
    customer {
      wishlist_v2(id: $wishlistId) {
        id
        updated_at
        sharing_code
        items_count
        items_v2(
            currentPage: $currentPage,
            pageSize: $pageSize
          ) {
          items {
            ...WISHLIST_ITEM_FRAGMENT
          }
          page_info {
            page_size
            current_page
            total_pages
          }
        }
      }
    }
  }

  ${m}
`,R=async(s,t,r)=>{if(!e.authenticated)return c();if(!s)throw Error("Wishlist ID is not set");return _(E,{variables:{wishlistId:s,currentPage:t,pageSize:r}}).then(({errors:i,data:n})=>{var o;return i?a(i):(o=n==null?void 0:n.customer)!=null&&o.wishlist_v2?u(n.customer.wishlist_v2):null})},S=`
  query getWishlists {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${d}
`,P=async()=>e.authenticated?_(S).then(({errors:s,data:t})=>{var r;return s?a(s):(r=t==null?void 0:t.customer)!=null&&r.wishlists?t.customer.wishlists.map(i=>u(i)):null}):c(),W=`
  mutation UPDATE_PRODUCTS_IN_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItems: [WishlistItemUpdateInput!]!,
    ) {
    updateProductsInWishlist(
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
  
   ${d} 
`,U=async s=>{const t=e.wishlistId;if(!t)throw Error("Wishlist ID is not set");return _(W,{variables:{wishlistId:t,wishlistItems:s.map(({wishlistItemId:r,quantity:i,description:n,selectedOptions:o,enteredOptions:f})=>({wishlistItemId:r,quantity:i,description:n,selected_options:o,entered_options:f}))}}).then(({errors:r,data:i})=>{var o;const n=[...((o=i==null?void 0:i.updateProductsInWishlist)==null?void 0:o.user_errors)??[],...r??[]];return n.length>0?a(n):u(i.updateProductsInWishlist.wishlist)})},y=()=>(e.wishlistId=null,e.authenticated=!1,Promise.resolve(null)),h=async()=>{if(e.initializing)return null;e.initializing=!0,e.config||(e.config=await x());const s=e.authenticated?await C():await D();return l.emit("wishlist/initialized",s),l.emit("wishlist/data",s),e.initializing=!1,s};async function C(){const s=await P(),t=s?s[0]:null;return t?(e.wishlistId=t.id,t):null}async function D(){try{return await c()}catch(s){throw console.error(s),s}}export{B as addProductsToWishlist,b as config,_ as fetchGraphQl,O as getConfig,C as getDefaultWishlist,D as getGuestWishlist,c as getPersistedWishlistData,q as getProductBySku,x as getStoreConfig,R as getWishlistById,P as getWishlists,I as initialize,h as initializeWishlist,$ as removeFetchGraphQlHeader,A as removeProductsFromWishlist,y as resetWishlist,M as setEndpoint,z as setFetchGraphQlHeader,Q as setFetchGraphQlHeaders,g as setPersistedWishlistData,U as updateProductsInWishlist};
