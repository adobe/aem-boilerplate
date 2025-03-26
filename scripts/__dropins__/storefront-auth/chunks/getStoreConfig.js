/*! Copyright 2025 Adobe
All Rights Reserved. */
import"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as u,h as g}from"./network-error.js";const T={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},i=3600,h=t=>{var o,e,r,a,c,n,m,s,_,f;return{autocompleteOnStorefront:((e=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:e.autocomplete_on_storefront)||!1,minLength:((a=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((n=(c=t==null?void 0:t.data)==null?void 0:c.storeConfig)==null?void 0:n.required_character_classes_number)||0,createAccountConfirmation:((s=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:s.create_account_confirmation)||!1,customerAccessTokenLifetime:((f=(_=t==null?void 0:t.data)==null?void 0:_.storeConfig)==null?void 0:f.customer_access_token_lifetime)*i||i}},d=t=>{const o=t.map(e=>e.message).join(" ");throw Error(o)},O=t=>{const o=document.cookie.split(";");let e;return o.forEach(r=>{const[a,c]=r.trim().split("=");a===t&&(e=decodeURIComponent(c))}),e},I=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},L=async()=>{try{const t=sessionStorage.getItem("storeConfig");let e=(t?JSON.parse(t):{}).customerAccessTokenLifetime;if(!e){const r=await C();sessionStorage.setItem("storeConfig",JSON.stringify(r)),e=(r==null?void 0:r.customerAccessTokenLifetime)||i}return`Max-Age=${e}`}catch(t){return console.error("getCookiesLifetime() Error:",t),`Max-Age=${i}`}},l=`
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
`,C=async()=>await u(l,{method:"GET",cache:"force-cache"}).then(t=>{var o;return(o=t.errors)!=null&&o.length?d(t.errors):h(t)}).catch(g);export{T as C,O as a,L as b,I as d,C as g,d as h};
