/*! Copyright 2025 Adobe
All Rights Reserved. */
import{W as _,t as h,b as u}from"./chunks/initializeWishlist.js";import{a as G,c as H,h as F,j as v,d as U,g as A,e as L,i as M,f as N,r as R}from"./chunks/initializeWishlist.js";import{s as l,g as c,f as n,h as I}from"./chunks/removeProductsFromWishlist.js";import{e as y,j as O,c as Q,r as b,a as B,b as C,d as Y,i as x}from"./chunks/removeProductsFromWishlist.js";import{events as d}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const m=`
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
`,w=async(r,o,e)=>{if(!l.authenticated)return c();if(!r)throw Error("Wishlist ID is not set");return n(m,{variables:{wishlistId:r,currentPage:o,pageSize:e}}).then(({errors:s,data:t})=>{var a;if(s)return I(s);if(!((a=t==null?void 0:t.customer)!=null&&a.wishlist_v2))return null;const i=h(t.customer.wishlist_v2);return d.emit("wishlist/data",i),i})},p=`
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
  
   ${u} 
`,E=async r=>{const o=l.wishlistId;if(!o)throw Error("Wishlist ID is not set");return n(p,{variables:{wishlistId:o,wishlistItems:r.map(({wishlistItemId:e,quantity:s,description:t,selectedOptions:i,enteredOptions:a})=>({wishlistItemId:e,quantity:s,description:t,selected_options:i,entered_options:a}))}}).then(({errors:e,data:s})=>{var i;const t=[...((i=s==null?void 0:s.updateProductsInWishlist)==null?void 0:i.user_errors)??[],...e??[]];return t.length>0?I(t):h(s.updateProductsInWishlist.wishlist)})};export{G as addProductsToWishlist,H as config,n as fetchGraphQl,y as getConfig,F as getDefaultWishlist,v as getGuestWishlist,c as getPersistedWishlistData,U as getProductBySku,A as getStoreConfig,w as getWishlistById,O as getWishlistItemFromStorage,L as getWishlists,M as initialize,N as initializeWishlist,Q as removeFetchGraphQlHeader,b as removeProductsFromWishlist,R as resetWishlist,B as setEndpoint,C as setFetchGraphQlHeader,Y as setFetchGraphQlHeaders,x as setPersistedWishlistData,E as updateProductsInWishlist};
