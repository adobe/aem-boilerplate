/*! Copyright 2025 Adobe
All Rights Reserved. */
import{W as c,t as h,b as m}from"./chunks/mergeWishlists.js";import{a as G,c as H,f as F,h as v,g as L,d as U,i as A,e as M,m as N,r as R}from"./chunks/mergeWishlists.js";import{s as l,g as u,f as a,h as I}from"./chunks/removeProductsFromWishlist.js";import{k as O,e as Q,l as y,c as b,r as C,a as Y,b as x,d as B,j as z}from"./chunks/removeProductsFromWishlist.js";import{events as _}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const d=`
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
        }
      }
    }
  }

${c}
`,w=async r=>{if(!l.authenticated)return u();if(!r)throw Error("Wishlist ID is not set");return a(d,{variables:{wishlistId:r}}).then(({errors:e,data:t})=>{var i;if(e)return I(e);if(!((i=t==null?void 0:t.customer)!=null&&i.wishlist_v2))return null;const s=h(t.customer.wishlist_v2);return _.emit("wishlist/data",s),s})},W=`
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
  
   ${m} 
`,E=async r=>{const e=l.wishlistId;if(!e)throw Error("Wishlist ID is not set");return a(W,{variables:{wishlistId:e,wishlistItems:r.map(({wishlistItemId:t,quantity:s,description:i,selectedOptions:o,enteredOptions:n})=>({wishlistItemId:t,quantity:s,description:i,selected_options:o,entered_options:n}))}}).then(({errors:t,data:s})=>{var o;const i=[...((o=s==null?void 0:s.updateProductsInWishlist)==null?void 0:o.user_errors)??[],...t??[]];return i.length>0?I(i):h(s.updateProductsInWishlist.wishlist)})};export{G as addProductsToWishlist,O as clearPersistedLocalStorage,H as config,a as fetchGraphQl,Q as getConfig,F as getDefaultWishlist,v as getGuestWishlist,u as getPersistedWishlistData,L as getStoreConfig,w as getWishlistById,y as getWishlistItemFromStorage,U as getWishlists,A as initialize,M as initializeWishlist,N as mergeWishlists,b as removeFetchGraphQlHeader,C as removeProductsFromWishlist,R as resetWishlist,Y as setEndpoint,x as setFetchGraphQlHeader,B as setFetchGraphQlHeaders,z as setPersistedWishlistData,E as updateProductsInWishlist};
//# sourceMappingURL=api.js.map
