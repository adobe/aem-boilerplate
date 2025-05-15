/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as h}from"@dropins/tools/event-bus.js";import{FetchGraphQL as u}from"@dropins/tools/fetch-graphql.js";function m(s){const t=document.cookie.split(";");for(const e of t)if(e.trim().startsWith(`${s}=`))return e.trim().substring(s.length+1);return null}const S={wishlistId:null,authenticated:!1},i=new Proxy(S,{set(s,t,e){if(s[t]=e,t==="wishlistId"){if(e===i.wishlistId)return!0;if(e===null)return document.cookie="DROPIN__WISHLIST__WISHLIST-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const r=new Date;r.setDate(r.getDate()+30),document.cookie=`DROPIN__WISHLIST__WISHLIST-ID=${e}; expires=${r.toUTCString()}; path=/`}return Reflect.set(s,t,e)},get(s,t){return t==="wishlistId"?m("DROPIN__WISHLIST__WISHLIST-ID"):s[t]}}),n="DROPIN__WISHLIST__WISHLIST__DATA";function D(s){const t=i.authenticated?sessionStorage:localStorage;if(s)try{t.setItem(n,JSON.stringify(s))}catch(e){g(e)?console.error("Storage quota exceeded:",e):console.error("Error saving wishlist:",e)}else t.removeItem(n)}const g=s=>s instanceof DOMException&&s.name==="QuotaExceededError";function _(){const s=i.authenticated?sessionStorage:localStorage;try{const t=s.getItem(n);return t?JSON.parse(t):{id:"",items:[]}}catch(t){return console.error("Error retrieving wishlist:",t),{id:"",items:[]}}}function E(s){var r;const t=i.authenticated?sessionStorage:localStorage,e=t.getItem(n)?JSON.parse(t.getItem(n)):{items:[]};return(r=e==null?void 0:e.items)==null?void 0:r.find(a=>{var o;return((o=a.product)==null?void 0:o.sku)===s})}const{setEndpoint:O,setFetchGraphQlHeader:H,removeFetchGraphQlHeader:L,setFetchGraphQlHeaders:P,fetchGraphQl:f,getConfig:F}=new u().getMethods(),p=s=>{const t=s.map(e=>e.message).join(" ");throw Error(t)},w=`
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
`,R=async s=>{var r,a;const t=_(),e={...t,items:(r=t.items)==null?void 0:r.filter(o=>!s.map(c=>c.product.sku).includes(o.product.sku))};if(h.emit("wishlist/data",e),i.authenticated){if(!i.wishlistId)throw Error("Wishlist ID is not set");const o=s.map(d=>d.id),{errors:c,data:I}=await f(w,{variables:{wishlistId:i.wishlistId,wishlistItemsIds:o}}),l=[...((a=I==null?void 0:I.removeProductsFromWishlist)==null?void 0:a.user_errors)??[],...c??[]];return l.length>0?(h.emit("wishlist/data",t),p(l)):null}return null};export{O as a,H as b,L as c,P as d,F as e,f,_ as g,p as h,D as i,E as j,R as r,i as s};
