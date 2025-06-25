/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as u}from"@dropins/tools/event-bus.js";import{FetchGraphQL as S}from"@dropins/tools/fetch-graphql.js";function g(s){const e=document.cookie.split(";");for(const t of e)if(t.trim().startsWith(`${s}=`))return t.trim().substring(s.length+1);return null}const f={wishlistId:null,authenticated:!1,isLoading:!0},n=new Proxy(f,{set(s,e,t){if(s[e]=t,e==="wishlistId"){if(t===n.wishlistId)return!0;if(t===null)return document.cookie="DROPIN__WISHLIST__WISHLIST-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const r=new Date;r.setDate(r.getDate()+30),document.cookie=`DROPIN__WISHLIST__WISHLIST-ID=${t}; expires=${r.toUTCString()}; path=/`}return Reflect.set(s,e,t)},get(s,e){return e==="wishlistId"?g("DROPIN__WISHLIST__WISHLIST-ID"):s[e]}});function d(s,e){var o;if(s.product.sku!==e.sku)return!1;const t=((o=s.selectedOptions)==null?void 0:o.map(i=>i.uid).filter(i=>!!i).sort())||[],r=(e.optionUIDs||[]).filter(i=>!!i).sort();return JSON.stringify(t)===JSON.stringify(r)}const c="DROPIN__WISHLIST__WISHLIST__DATA";function E(s){const e=n.authenticated?sessionStorage:localStorage;if(s)try{e.setItem(c,JSON.stringify(s))}catch(t){p(t)?console.error("Storage quota exceeded:",t):console.error("Error saving wishlist:",t)}else e.removeItem(c)}const p=s=>s instanceof DOMException&&s.name==="QuotaExceededError";function _(s=!1){const e=n.authenticated&&!s?sessionStorage:localStorage;try{const t=e.getItem(c);return t?JSON.parse(t):{id:"",items:[]}}catch(t){return console.error("Error retrieving wishlist:",t),{id:"",items:[]}}}function H(){localStorage.removeItem(c)}function L(s,e=[],t=[]){var i;const r=n.authenticated?sessionStorage:localStorage,o=r.getItem(c)?JSON.parse(r.getItem(c)):{items:[]};return(i=o==null?void 0:o.items)==null?void 0:i.find(l=>d(l,{sku:s,optionUIDs:e}))}const{setEndpoint:P,setFetchGraphQlHeader:F,removeFetchGraphQlHeader:R,setFetchGraphQlHeaders:M,fetchGraphQl:w,getConfig:N}=new S().getMethods(),O=s=>{const e=s.map(t=>t.message).join(" ");throw Error(e)},D=`
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
`,$=async s=>{var r,o,i;const e=_(),t={...e,items:(r=e.items)==null?void 0:r.filter(l=>!s.some(I=>{var a;return d(l,{sku:I.product.sku,optionUIDs:(a=I.selectedOptions)==null?void 0:a.map(h=>h.uid)})}))};if(t.items_count=(o=t.items)==null?void 0:o.length,u.emit("wishlist/data",t),n.authenticated){if(!n.wishlistId)throw Error("Wishlist ID is not set");const l=s.map(m=>m.id),{errors:I,data:a}=await w(D,{variables:{wishlistId:n.wishlistId,wishlistItemsIds:l}}),h=[...((i=a==null?void 0:a.removeProductsFromWishlist)==null?void 0:i.user_errors)??[],...I??[]];return h.length>0?(u.emit("wishlist/data",e),O(h)):null}return null};export{P as a,F as b,R as c,M as d,N as e,w as f,_ as g,O as h,d as i,E as j,H as k,L as l,$ as r,n as s};
