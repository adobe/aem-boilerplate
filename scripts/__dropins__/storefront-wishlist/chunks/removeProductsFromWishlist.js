/*! Copyright 2026 Adobe
All Rights Reserved. */
import{g as c,i as u,s as h,f as w,h as _}from"./fetch-error.js";import{events as m}from"@dropins/tools/event-bus.js";const p=`
  mutation REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItemsIds: [ID!]!,
    ) {
    removeProductsFromWishlist(
      wishlistId: $wishlistId
      wishlistItemsIds: $wishlistItemsIds
    ) {
      user_errors {
        code
        message
      }
    }
  }
`,f=async l=>{var a,I,d;const e=c(),r={...e,items:(a=e.items)==null?void 0:a.filter(o=>!l.some(t=>{var s;return u(o,{sku:t.product.sku,optionUIDs:(s=t.selectedOptions)==null?void 0:s.map(i=>i.uid)})}))};if(h.authenticated){if(!h.wishlistId)throw Error("Wishlist ID is not set");const o=l.map(n=>n.id),{errors:t,data:s}=await w(p,{variables:{wishlistId:h.wishlistId,wishlistItemsIds:o}}),i=[...((I=s==null?void 0:s.removeProductsFromWishlist)==null?void 0:I.user_errors)??[],...t??[]];if(i.length>0)return m.emit("wishlist/data",e),_(i)}return r.items_count=(d=r.items)==null?void 0:d.length,m.emit("wishlist/data",r),null};export{f as r};
//# sourceMappingURL=removeProductsFromWishlist.js.map
