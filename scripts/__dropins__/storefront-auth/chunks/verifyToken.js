/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as i}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as g,h as C,a as k,r as E}from"./network-error.js";import{Initializer as T}from"@dropins/tools/lib.js";const d="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",l=new T({init:async t=>{const e={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...t};l.config.setConfig(e),N(e.authHeaderConfig.header,e.authHeaderConfig.tokenPrefix)},listeners:()=>[]}),p=l.config,h={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},_=3600,O=t=>{var o,e,r,n,a,c,u,s,m,f;return{autocompleteOnStorefront:((e=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:e.autocomplete_on_storefront)||!1,minLength:((n=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:n.minimum_password_length)||3,requiredCharacterClasses:+((c=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:c.required_character_classes_number)||0,createAccountConfirmation:((s=(u=t==null?void 0:t.data)==null?void 0:u.storeConfig)==null?void 0:s.create_account_confirmation)||!1,customerAccessTokenLifetime:((f=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:f.customer_access_token_lifetime)*_||_}},S=t=>{const o=t.map(e=>e.message).join(" ");throw Error(o)},A=t=>{const o=document.cookie.split(";");let e;return o.forEach(r=>{const[n,a]=r.trim().split("=");n===t&&(e=decodeURIComponent(a))}),e},I=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},q=async()=>{try{const t=sessionStorage.getItem("storeConfig");let e=(t?JSON.parse(t):{}).customerAccessTokenLifetime;if(!e){const r=await y();sessionStorage.setItem("storeConfig",JSON.stringify(r)),e=(r==null?void 0:r.customerAccessTokenLifetime)||_}return`Max-Age=${e}`}catch(t){return console.error("getCookiesLifetime() Error:",t),`Max-Age=${_}`}},L=`
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
`,y=async()=>await g(L,{method:"GET",cache:"force-cache"}).then(t=>{var o;return(o=t.errors)!=null&&o.length?S(t.errors):O(t)}).catch(C),G=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,N=async(t="Authorization",o="Bearer")=>{const e=A(h.auth_dropin_user_token);return e?(k(t,`${o} ${e}`),g(G).then(r=>{var a,c,u,s;return!((a=r.errors)!=null&&a.find(m=>{var f;return((f=m.extensions)==null?void 0:f.category)==="graphql-authentication"}))?(i.emit("auth/group-uid",(s=(u=(c=r.data)==null?void 0:c.customer)==null?void 0:u.group)==null?void 0:s.uid),i.emit("authenticated",!0),!0):(I(h.auth_dropin_user_token),E(t),i.emit("auth/group-uid",d),i.emit("authenticated",!1),!1)})):(i.emit("auth/group-uid",d),i.emit("authenticated",!1),!1)};export{h as C,d as D,q as a,p as c,I as d,y as g,S as h,l as i,N as v};
//# sourceMappingURL=verifyToken.js.map
