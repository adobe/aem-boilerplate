/*! Copyright 2025 Adobe
All Rights Reserved. */
import{W as _,t as h,b as c}from"./chunks/mergeWishlists.js";import{a as G,c as H,h as F,j as v,d as L,g as U,e as A,i as M,f as N,m as R,r as $}from"./chunks/mergeWishlists.js";import{s as l,g as u,f as n,h as I}from"./chunks/removeProductsFromWishlist.js";import{k as O,e as Q,l as b,c as B,r as C,a as Y,b as x,d as z,j}from"./chunks/removeProductsFromWishlist.js";import{events as m}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const d=`
  query GET_WISHLIST_BY_ID_QUERY(
    $wishlistId: ID!,
  ) {
    customer {
      wishlist_v2(id: $wishlistId) {
        id
        updated_at
        sharing_code
        items_count
        items_v2 {
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

${_}
`,w=async(r,o,e)=>{if(!l.authenticated)return u();if(!r)throw Error("Wishlist ID is not set");return n(d,{variables:{wishlistId:r,currentPage:o,pageSize:e}}).then(({errors:s,data:t})=>{var a;if(s)return I(s);if(!((a=t==null?void 0:t.customer)!=null&&a.wishlist_v2))return null;const i=h(t.customer.wishlist_v2);return m.emit("wishlist/data",i),i})},W=`
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
  
   ${c} 
`,E=async r=>{const o=l.wishlistId;if(!o)throw Error("Wishlist ID is not set");return n(W,{variables:{wishlistId:o,wishlistItems:r.map(({wishlistItemId:e,quantity:s,description:t,selectedOptions:i,enteredOptions:a})=>({wishlistItemId:e,quantity:s,description:t,selected_options:i,entered_options:a}))}}).then(({errors:e,data:s})=>{var i;const t=[...((i=s==null?void 0:s.updateProductsInWishlist)==null?void 0:i.user_errors)??[],...e??[]];return t.length>0?I(t):h(s.updateProductsInWishlist.wishlist)})};export{G as addProductsToWishlist,O as clearPersistedLocalStorage,H as config,n as fetchGraphQl,Q as getConfig,F as getDefaultWishlist,v as getGuestWishlist,u as getPersistedWishlistData,L as getProductBySku,U as getStoreConfig,w as getWishlistById,b as getWishlistItemFromStorage,A as getWishlists,M as initialize,N as initializeWishlist,R as mergeWishlists,B as removeFetchGraphQlHeader,C as removeProductsFromWishlist,$ as resetWishlist,Y as setEndpoint,x as setFetchGraphQlHeader,z as setFetchGraphQlHeaders,j as setPersistedWishlistData,E as updateProductsInWishlist};
