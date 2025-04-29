/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as P,c as _,f as w,h as S,b as D,g as E,d as F,i as G,e as H,r as U}from"./chunks/initializeWishlist.js";import{W as h,s as l,f as I,h as n,t as d}from"./chunks/removeProductsFromWishlist.js";import{e as N,g as O,c as $,r as x,a as C,b as L,d as M,i as Q}from"./chunks/removeProductsFromWishlist.js";import{g as b}from"./chunks/getWishlistById.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";const c=`
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
  
   ${h} 
`,g=async a=>{const r=l.wishlistId;if(!r)throw Error("Wishlist ID is not set");return I(c,{variables:{wishlistId:r,wishlistItems:a.map(({wishlistItemId:e,quantity:s,description:t,selectedOptions:i,enteredOptions:o})=>({wishlistItemId:e,quantity:s,description:t,selected_options:i,entered_options:o}))}}).then(({errors:e,data:s})=>{var i;const t=[...((i=s==null?void 0:s.updateProductsInWishlist)==null?void 0:i.user_errors)??[],...e??[]];return t.length>0?n(t):d(s.updateProductsInWishlist.wishlist)})};export{P as addProductsToWishlist,_ as config,I as fetchGraphQl,N as getConfig,w as getDefaultWishlist,S as getGuestWishlist,O as getPersistedWishlistData,D as getProductBySku,E as getStoreConfig,b as getWishlistById,F as getWishlists,G as initialize,H as initializeWishlist,$ as removeFetchGraphQlHeader,x as removeProductsFromWishlist,U as resetWishlist,C as setEndpoint,L as setFetchGraphQlHeader,M as setFetchGraphQlHeaders,Q as setPersistedWishlistData,g as updateProductsInWishlist};
