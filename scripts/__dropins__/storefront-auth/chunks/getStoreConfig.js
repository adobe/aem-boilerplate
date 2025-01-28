/*! Copyright 2025 Adobe
All Rights Reserved. */
import"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as N,h as T}from"./network-error.js";const C=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),D={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},r=3600,d=t=>{var e,o,a,n,s,u,_,f,m,g;return{autocompleteOnStorefront:((o=(e=t==null?void 0:t.data)==null?void 0:e.storeConfig)==null?void 0:o.autocomplete_on_storefront)||!1,minLength:((n=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:n.minimum_password_length)||3,requiredCharacterClasses:+((u=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:u.required_character_classes_number)||0,createAccountConfirmation:((f=(_=t==null?void 0:t.data)==null?void 0:_.storeConfig)==null?void 0:f.create_account_confirmation)||!1,customerAccessTokenLifetime:((g=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:g.customer_access_token_lifetime)*r||r}},S=t=>{const e=t.map(o=>o.message).join(" ");throw Error(e)},U=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},v=async()=>{try{const t=sessionStorage.getItem("storeConfig");let o=(t?JSON.parse(t):{}).customerAccessTokenLifetime;if(!o){const a=await b();sessionStorage.setItem("storeConfig",JSON.stringify(a)),o=(a==null?void 0:a.customerAccessTokenLifetime)||r}return`Max-Age=${o}`}catch(t){return console.error("getCookiesLifetime() Error:",t),`Max-Age=${r}`}},h="accountContext";var I=(t=>(t.CREATE_ACCOUNT_EVENT="create-account",t.SIGN_IN="sign-in",t.SIGN_OUT="sign-out",t))(I||{});const c={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function l(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function E(t,e){const o=l();o.push({[t]:null}),o.push({[t]:e})}function i(t,e){l().push(a=>{const n=a.getState?a.getState():{};a.push({event:t,eventInfo:{...n,...e}})})}function O(t){const e=C(t);E(h,e),i(c.CREATE_ACCOUNT)}function A(t){const e=C(t);E(h,e),i(c.SIGN_IN)}function k(){i(c.SIGN_OUT)}const x=(t,e)=>{const o=sessionStorage.getItem("storeConfig"),n={...o?JSON.parse(o):{},...e};switch(t){case"create-account":O(n);break;case"sign-in":A(n);break;case"sign-out":k();break;default:return null}},w=`
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
`,b=async()=>await N(w,{method:"GET",cache:"force-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?S(t.errors):d(t)}).catch(T);export{D as C,I as E,v as a,U as d,b as g,S as h,x as p};
