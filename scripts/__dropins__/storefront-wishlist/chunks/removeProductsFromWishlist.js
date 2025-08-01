/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as d}from"@dropins/tools/event-bus.js";import{FetchGraphQL as S}from"@dropins/tools/fetch-graphql.js";function g(s){const e=document.cookie.split(";");for(const t of e)if(t.trim().startsWith(`${s}=`))return t.trim().substring(s.length+1);return null}const f={wishlistId:null,authenticated:!1,isLoading:!0},n=new Proxy(f,{set(s,e,t){if(s[e]=t,e==="wishlistId"){if(t===n.wishlistId)return!0;if(t===null)return document.cookie="DROPIN__WISHLIST__WISHLIST-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const r=new Date;r.setDate(r.getDate()+30),document.cookie=`DROPIN__WISHLIST__WISHLIST-ID=${t}; expires=${r.toUTCString()}; path=/`}return Reflect.set(s,e,t)},get(s,e){return e==="wishlistId"?g("DROPIN__WISHLIST__WISHLIST-ID"):s[e]}});function u(s,e){var o;if(s.product.sku!==e.sku)return!1;const t=((o=s.selectedOptions)==null?void 0:o.map(i=>i.uid).filter(i=>!!i).sort())||[],r=(e.optionUIDs||[]).filter(i=>!!i).sort();return JSON.stringify(t)===JSON.stringify(r)}const c="DROPIN__WISHLIST__WISHLIST__DATA";function E(s){const e=n.authenticated?sessionStorage:localStorage;if(s)try{e.setItem(c,JSON.stringify(s))}catch(t){_(t)?console.error("Storage quota exceeded:",t):console.error("Error saving wishlist:",t)}else e.removeItem(c)}const _=s=>s instanceof DOMException&&s.name==="QuotaExceededError";function p(s=!1){const e=n.authenticated&&!s?sessionStorage:localStorage;try{const t=e.getItem(c);return t?JSON.parse(t):{id:"",items:[]}}catch(t){return console.error("Error retrieving wishlist:",t),{id:"",items:[]}}}function H(){localStorage.removeItem(c)}function L(s,e=[]){var o;const t=n.authenticated?sessionStorage:localStorage,r=t.getItem(c)?JSON.parse(String(t.getItem(c))):{items:[]};return(o=r==null?void 0:r.items)==null?void 0:o.find(i=>u(i,{sku:s,optionUIDs:e}))}const{setEndpoint:P,setFetchGraphQlHeader:F,removeFetchGraphQlHeader:R,setFetchGraphQlHeaders:M,fetchGraphQl:w,getConfig:N}=new S().getMethods(),D=s=>{const e=s.map(t=>t.message).join(" ");throw Error(e)},O=`
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
`,x=async s=>{var r,o,i;const e=p(),t={...e,items:(r=e.items)==null?void 0:r.filter(h=>!s.some(l=>{var a;return u(h,{sku:l.product.sku,optionUIDs:(a=l.selectedOptions)==null?void 0:a.map(I=>I.uid)})}))};if(n.authenticated){if(!n.wishlistId)throw Error("Wishlist ID is not set");const h=s.map(m=>m.id),{errors:l,data:a}=await w(O,{variables:{wishlistId:n.wishlistId,wishlistItemsIds:h}}),I=[...((o=a==null?void 0:a.removeProductsFromWishlist)==null?void 0:o.user_errors)??[],...l??[]];if(I.length>0)return d.emit("wishlist/data",e),D(I)}return t.items_count=(i=t.items)==null?void 0:i.length,d.emit("wishlist/data",t),null};export{P as a,F as b,R as c,M as d,N as e,w as f,p as g,D as h,u as i,E as j,H as k,L as l,x as r,n as s};
//# sourceMappingURL=removeProductsFromWishlist.js.map
