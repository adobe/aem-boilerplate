/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as d}from"@dropins/tools/event-bus.js";import{FetchGraphQL as m}from"@dropins/tools/fetch-graphql.js";function S(s){const t=document.cookie.split(";");for(const e of t)if(e.trim().startsWith(`${s}=`))return e.trim().substring(s.length+1);return null}const g={wishlistId:null,authenticated:!1},i=new Proxy(g,{set(s,t,e){if(s[t]=e,t==="wishlistId"){if(e===i.wishlistId)return!0;if(e===null)return document.cookie="DROPIN__WISHLIST__WISHLIST-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const r=new Date;r.setDate(r.getDate()+30),document.cookie=`DROPIN__WISHLIST__WISHLIST-ID=${e}; expires=${r.toUTCString()}; path=/`}return Reflect.set(s,t,e)},get(s,t){return t==="wishlistId"?S("DROPIN__WISHLIST__WISHLIST-ID"):s[t]}}),n="DROPIN__WISHLIST__WISHLIST__DATA";function E(s){const t=i.authenticated?sessionStorage:localStorage;if(s)try{t.setItem(n,JSON.stringify(s))}catch(e){_(e)?console.error("Storage quota exceeded:",e):console.error("Error saving wishlist:",e)}else t.removeItem(n)}const _=s=>s instanceof DOMException&&s.name==="QuotaExceededError";function f(){const s=i.authenticated?sessionStorage:localStorage;try{const t=s.getItem(n);return t?JSON.parse(t):{id:"",items:[]}}catch(t){return console.error("Error retrieving wishlist:",t),{id:"",items:[]}}}function O(s){var r;const t=i.authenticated?sessionStorage:localStorage,e=t.getItem(n)?JSON.parse(t.getItem(n)):{items:[]};return(r=e==null?void 0:e.items)==null?void 0:r.find(a=>{var o;return((o=a.product)==null?void 0:o.sku)===s})}const{setEndpoint:H,setFetchGraphQlHeader:L,removeFetchGraphQlHeader:P,setFetchGraphQlHeaders:F,fetchGraphQl:p,getConfig:R}=new m().getMethods(),w=s=>{const t=s.map(e=>e.message).join(" ");throw Error(t)},T=`
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
`,$=async s=>{var r,a,o;const t=f(),e={...t,items:(r=t.items)==null?void 0:r.filter(c=>!s.map(I=>I.product.sku).includes(c.product.sku))};if(e.items_count=(a=e.items)==null?void 0:a.length,d.emit("wishlist/data",e),i.authenticated){if(!i.wishlistId)throw Error("Wishlist ID is not set");const c=s.map(u=>u.id),{errors:I,data:l}=await p(T,{variables:{wishlistId:i.wishlistId,wishlistItemsIds:c}}),h=[...((o=l==null?void 0:l.removeProductsFromWishlist)==null?void 0:o.user_errors)??[],...I??[]];return h.length>0?(d.emit("wishlist/data",t),w(h)):null}return null};export{H as a,L as b,P as c,F as d,R as e,p as f,f as g,w as h,E as i,O as j,$ as r,i as s};
