/*! Copyright 2025 Adobe
All Rights Reserved. */
import{W as _,t as h,b as c}from"./chunks/mergeWishlists.js";import{a as G,c as H,f as F,h as v,g as L,d as U,i as A,e as M,m as N,r as R}from"./chunks/mergeWishlists.js";import{s as l,g as u,f as n,h as I}from"./chunks/removeProductsFromWishlist.js";import{k as y,e as O,l as Q,c as b,r as x,a as B,b as C,d as Y,j as z}from"./chunks/removeProductsFromWishlist.js";import{g as j}from"./chunks/getProductBySku.js";import{events as m}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const d=`
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
`,w=async(r,o,e)=>{if(!l.authenticated)return u();if(!r)throw Error("Wishlist ID is not set");return n(d,{variables:{wishlistId:r,currentPage:o,pageSize:e}}).then(({errors:s,data:t})=>{var a;if(s)return I(s);if(!((a=t==null?void 0:t.customer)!=null&&a.wishlist_v2))return null;const i=h(t.customer.wishlist_v2);return m.emit("wishlist/data",i),i})},p=`
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
`,E=async r=>{const o=l.wishlistId;if(!o)throw Error("Wishlist ID is not set");return n(p,{variables:{wishlistId:o,wishlistItems:r.map(({wishlistItemId:e,quantity:s,description:t,selectedOptions:i,enteredOptions:a})=>({wishlistItemId:e,quantity:s,description:t,selected_options:i,entered_options:a}))}}).then(({errors:e,data:s})=>{var i;const t=[...((i=s==null?void 0:s.updateProductsInWishlist)==null?void 0:i.user_errors)??[],...e??[]];return t.length>0?I(t):h(s.updateProductsInWishlist.wishlist)})};export{G as addProductsToWishlist,y as clearPersistedLocalStorage,H as config,n as fetchGraphQl,O as getConfig,F as getDefaultWishlist,v as getGuestWishlist,u as getPersistedWishlistData,j as getProductBySku,L as getStoreConfig,w as getWishlistById,Q as getWishlistItemFromStorage,U as getWishlists,A as initialize,M as initializeWishlist,N as mergeWishlists,b as removeFetchGraphQlHeader,x as removeProductsFromWishlist,R as resetWishlist,B as setEndpoint,C as setFetchGraphQlHeader,Y as setFetchGraphQlHeaders,z as setPersistedWishlistData,E as updateProductsInWishlist};
