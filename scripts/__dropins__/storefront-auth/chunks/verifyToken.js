/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as C}from"@dropins/tools/lib.js";import{events as h}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as g,h as E,a as k,r as A}from"./network-error.js";const l=new C({init:async t=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...t};l.config.setConfig(r),await b(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix)},listeners:()=>[]}),U=l.config,_={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},m=3600,y=t=>{var e,r,o,i,n,a,c,s,f,u;return{autocompleteOnStorefront:((r=(e=t==null?void 0:t.data)==null?void 0:e.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((i=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:i.minimum_password_length)||3,requiredCharacterClasses:+((a=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:a.required_character_classes_number)||0,createAccountConfirmation:((s=(c=t==null?void 0:t.data)==null?void 0:c.storeConfig)==null?void 0:s.create_account_confirmation)||!1,customerAccessTokenLifetime:((u=(f=t==null?void 0:t.data)==null?void 0:f.storeConfig)==null?void 0:u.customer_access_token_lifetime)*m||m}},T=t=>{const e=t.map(r=>r.message).join(" ");throw Error(e)},S=t=>{const e=document.cookie.split(";");let r;return e.forEach(o=>{const[i,n]=o.trim().split("=");i===t&&(r=decodeURIComponent(n))}),r},w=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},v=async()=>{try{const t=sessionStorage.getItem("storeConfig");let r=(t?JSON.parse(t):{}).customerAccessTokenLifetime;if(!r){const o=await G();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||m}return`Max-Age=${r}`}catch(t){return console.error("getCookiesLifetime() Error:",t),`Max-Age=${m}`}},I=async t=>{if(!t||t.trim()==="")return"";try{const e=atob(t),r=new Uint8Array(e.length);for(let a=0;a<e.length;a++)r[a]=e.charCodeAt(a);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(a=>a.toString(16).padStart(2,"0")).join("")}catch(e){return console.error(`Failed to convert base64 to SHA1: ${e instanceof Error?e.message:"Unknown error"}`),""}},O="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",d=async t=>{const e=t?await I(t):O;h.emit("auth/group-uid",e)},L=`
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
`,G=async()=>await g(L,{method:"GET",cache:"force-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?T(t.errors):y(t)}).catch(E),H=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,b=async(t="Authorization",e="Bearer")=>{const r=S(_.auth_dropin_user_token);return r?(k(t,`${e} ${r}`),g(H).then(async o=>{var n,a,c,s;return!((n=o.errors)!=null&&n.find(f=>{var u;return((u=f.extensions)==null?void 0:u.category)==="graphql-authentication"}))?(await d((s=(c=(a=o.data)==null?void 0:a.customer)==null?void 0:c.group)==null?void 0:s.uid),h.emit("authenticated",!0),!0):(w(_.auth_dropin_user_token),A(t),await d(),h.emit("authenticated",!1),!1)})):(await d(),h.emit("authenticated",!1),!1)};export{_ as C,v as a,U as c,w as d,d as e,G as g,T as h,l as i,b as v};
//# sourceMappingURL=verifyToken.js.map
