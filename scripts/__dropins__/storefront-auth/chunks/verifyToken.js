/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as f}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as d,h as g,a as l,r as C}from"./network-error.js";const h={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},s=3600,k=t=>{var o,e,r,c,a,i,n,u,_,m;return{autocompleteOnStorefront:((e=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:e.autocomplete_on_storefront)||!1,minLength:((c=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:c.minimum_password_length)||3,requiredCharacterClasses:+((i=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:i.required_character_classes_number)||0,createAccountConfirmation:((u=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:u.create_account_confirmation)||!1,customerAccessTokenLifetime:((m=(_=t==null?void 0:t.data)==null?void 0:_.storeConfig)==null?void 0:m.customer_access_token_lifetime)*s||s}},E=t=>{const o=t.map(e=>e.message).join(" ");throw Error(o)},T=t=>{const o=document.cookie.split(";");let e;return o.forEach(r=>{const[c,a]=r.trim().split("=");c===t&&(e=decodeURIComponent(a))}),e},O=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},N=async()=>{try{const t=sessionStorage.getItem("storeConfig");let e=(t?JSON.parse(t):{}).customerAccessTokenLifetime;if(!e){const r=await A();sessionStorage.setItem("storeConfig",JSON.stringify(r)),e=(r==null?void 0:r.customerAccessTokenLifetime)||s}return`Max-Age=${e}`}catch(t){return console.error("getCookiesLifetime() Error:",t),`Max-Age=${s}`}},S=`
  query GET_STORE_CONFIG {
    storeConfig {
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      store_name
      store_group_code
      locale
      create_account_confirmation
      customer_access_token_lifetime
    }
  }
`,A=async()=>await d(S,{method:"GET",cache:"force-cache"}).then(t=>{var o;return(o=t.errors)!=null&&o.length?E(t.errors):k(t)}).catch(g),I=`
  query VALIDATE_TOKEN {
    customerCart {
      id
    }
  }
`,q=async(t="Authorization",o="Bearer")=>{const e=T(h.auth_dropin_user_token);if(f.emit("authenticated",!!e),!!e)return l(t,`${o} ${e}`),d(I).then(r=>{var a;(a=r.errors)!=null&&a.find(i=>{var n;return((n=i.extensions)==null?void 0:n.category)==="graphql-authentication"})&&(O(h.auth_dropin_user_token),C(t),f.emit("authenticated",!1))})};export{h as C,N as a,O as d,A as g,E as h,q as v};
//# sourceMappingURL=verifyToken.js.map
