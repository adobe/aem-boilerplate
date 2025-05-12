/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as G,f as h,h as $}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as w}from"@dropins/tools/event-bus.js";import{merge as k}from"@dropins/tools/lib.js";import{c as R}from"./verifyToken.js";import{CUSTOMER_INFORMATION_FRAGMENT as C}from"../fragments.js";import{b as U,C as O}from"./getStoreConfig.js";import{p as x,E as y}from"./acdl.js";import{s as F}from"./setReCaptchaToken.js";const v=t=>{var f,o,i,a,c,m,u,M,s,r,T;const e={email:((o=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:o.email)??"",firstName:((a=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:a.firstname)??"",lastName:((m=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:m.lastname)??""};return k(e,(T=(r=(s=(M=(u=R)==null?void 0:u.getConfig())==null?void 0:M.models)==null?void 0:s.CustomerModel)==null?void 0:r.transformer)==null?void 0:T.call(r,t.data))},D=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${C}
`,K=async t=>{if(t){const{authHeaderConfig:e}=R.getConfig();G(e.header,e.tokenPrefix?`${e.tokenPrefix} ${t}`:t)}return await h(D,{method:"GET",cache:"force-cache"}).then(e=>v(e)).catch($)},H=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,V=async({email:t,password:e,translations:f,onErrorCallback:o,handleSetInLineAlertProps:i})=>{var r,T,_,E,d;await F();const a=await h(H,{method:"POST",variables:{email:t,password:e}}).catch($);if(!((T=(r=a==null?void 0:a.data)==null?void 0:r.generateCustomerToken)!=null&&T.token)){const g=f.customerTokenErrorMessage,N=a!=null&&a.errors?a.errors[0].message:g;return o==null||o(N),i==null||i({type:"error",text:N}),{errorMessage:N,userName:""}}const c=(E=(_=a==null?void 0:a.data)==null?void 0:_.generateCustomerToken)==null?void 0:E.token,m=await K(c),u=m==null?void 0:m.firstName,M=m==null?void 0:m.email;if(!u||!M){const g=f.customerTokenErrorMessage;return o==null||o(g),i==null||i({type:"error",text:g}),{errorMessage:g,userName:""}}const s=await U();return document.cookie=`${O.auth_dropin_firstname}=${u}; path=/; ${s}; `,document.cookie=`${O.auth_dropin_user_token}=${c}; path=/; ${s}; `,w.emit("authenticated",!!c),x((d=y)==null?void 0:d.SIGN_IN,{...m}),{errorMessage:"",userName:u}};export{V as a,K as g};
