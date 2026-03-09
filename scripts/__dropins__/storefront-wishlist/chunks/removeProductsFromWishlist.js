/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as I}from"@dropins/tools/event-bus.js";import{FetchGraphQL as _}from"@dropins/tools/fetch-graphql.js";function p(t){const s=document.cookie.split(";");for(const e of s)if(e.trim().startsWith(`${t}=`))return e.trim().substring(t.length+1);return null}const h={wishlistId:null,authenticated:!1,isLoading:!0},m=()=>h.storeCode&&h.storeCode!=="default"?`DROPIN__WISHLIST__WISHLIST-ID__${h.storeCode}`:"DROPIN__WISHLIST__WISHLIST-ID",n=new Proxy(h,{set(t,s,e){if(t[s]=e,s==="wishlistId"){const r=m();if(e===n.wishlistId)return!0;if(e===null)return document.cookie=`${r}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`,!0;const o=new Date;o.setDate(o.getDate()+30),document.cookie=`${r}=${e}; expires=${o.toUTCString()}; path=/`}return Reflect.set(t,s,e)},get(t,s){return s==="wishlistId"?p(m()):t[s]}});function f(t,s){var o;if(t.product.sku!==s.sku)return!1;const e=((o=t.selectedOptions)==null?void 0:o.map(i=>i.uid).filter(i=>!!i).sort())||[],r=(s.optionUIDs||[]).filter(i=>!!i).sort();return JSON.stringify(e)===JSON.stringify(r)}const g="DROPIN__WISHLIST__WISHLIST__DATA",u=()=>n.storeCode&&n.storeCode!=="default"?`${g}__${n.storeCode}`:g;function k(t){const s=n.authenticated?sessionStorage:localStorage,e=u();if(t)try{s.setItem(e,JSON.stringify(t))}catch(r){w(r)?console.error("Storage quota exceeded:",r):console.error("Error saving wishlist:",r)}else s.removeItem(e)}const w=t=>t instanceof DOMException&&t.name==="QuotaExceededError";function O(t=!1){const s=n.authenticated&&!t?sessionStorage:localStorage,e=u();try{const r=s.getItem(e);return r?JSON.parse(r):{id:"",items:[]}}catch(r){return console.error("Error retrieving wishlist:",r),{id:"",items:[]}}}function C(){localStorage.removeItem(u())}function H(t,s=[]){var a;const e=n.authenticated?sessionStorage:localStorage,r=u(),o=e.getItem(r),i=o?JSON.parse(o):{items:[]};return(a=i==null?void 0:i.items)==null?void 0:a.find(c=>f(c,{sku:t,optionUIDs:s}))}const{setEndpoint:L,setFetchGraphQlHeader:P,removeFetchGraphQlHeader:F,setFetchGraphQlHeaders:N,fetchGraphQl:W,getConfig:M}=new _().getMethods(),D=t=>{const s=t.map(e=>e.message).join(" ");throw Error(s)},T=`
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
`,R=async t=>{var r,o,i;const s=O(),e={...s,items:(r=s.items)==null?void 0:r.filter(a=>!t.some(c=>{var l;return f(a,{sku:c.product.sku,optionUIDs:(l=c.selectedOptions)==null?void 0:l.map(d=>d.uid)})}))};if(n.authenticated){if(!n.wishlistId)throw Error("Wishlist ID is not set");const a=t.map(S=>S.id),{errors:c,data:l}=await W(T,{variables:{wishlistId:n.wishlistId,wishlistItemsIds:a}}),d=[...((o=l==null?void 0:l.removeProductsFromWishlist)==null?void 0:o.user_errors)??[],...c??[]];if(d.length>0)return I.emit("wishlist/data",s),D(d)}return e.items_count=(i=e.items)==null?void 0:i.length,I.emit("wishlist/data",e),null};export{L as a,P as b,F as c,N as d,M as e,W as f,O as g,D as h,f as i,k as j,C as k,H as l,R as r,n as s};
//# sourceMappingURL=removeProductsFromWishlist.js.map
