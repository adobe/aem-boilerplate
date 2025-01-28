/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as G,f as h,h as $}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as w}from"@dropins/tools/event-bus.js";import{merge as k}from"@dropins/tools/lib.js";import{c as R}from"./initialize.js";import{CUSTOMER_INFORMATION_FRAGMENT as C}from"../fragments.js";import{a as U,C as O,p as x,E as y}from"./getStoreConfig.js";import{s as F}from"./setReCaptchaToken.js";const v=t=>{var f,i,o,a,r,m,u,N,T,s,g,c,d;const e={email:((i=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:i.email)??"",firstName:((a=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:a.firstname)??"",lastName:((m=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:m.lastname)??"",isSubscribed:((N=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:N.is_subscribed)??!1};return k(e,(d=(c=(g=(s=(T=R)==null?void 0:T.getConfig())==null?void 0:s.models)==null?void 0:g.CustomerModel)==null?void 0:c.transformer)==null?void 0:d.call(c,t.data))},D=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${C}
`,K=async t=>{if(t){const{authHeaderConfig:e}=R.getConfig();G(e.header,e.tokenPrefix?`${e.tokenPrefix} ${t}`:t)}return await h(D,{method:"GET",cache:"force-cache"}).then(e=>v(e)).catch($)},S=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,V=async({email:t,password:e,translations:f,onErrorCallback:i,handleSetInLineAlertProps:o})=>{var s,g,c,d,E;await F();const a=await h(S,{method:"POST",variables:{email:t,password:e}}).catch($);if(!((g=(s=a==null?void 0:a.data)==null?void 0:s.generateCustomerToken)!=null&&g.token)){const M=f.customerTokenErrorMessage,_=a!=null&&a.errors?a.errors[0].message:M;return i==null||i(_),o==null||o({type:"error",text:_}),{errorMessage:_,userName:""}}const r=(d=(c=a==null?void 0:a.data)==null?void 0:c.generateCustomerToken)==null?void 0:d.token,m=await K(r),u=m==null?void 0:m.firstName,N=m==null?void 0:m.email;if(!u||!N){const M=f.customerTokenErrorMessage;return i==null||i(M),o==null||o({type:"error",text:M}),{errorMessage:M,userName:""}}const T=await U();return document.cookie=`${O.auth_dropin_firstname}=${u}; path=/; ${T}; `,document.cookie=`${O.auth_dropin_user_token}=${r}; path=/; ${T}; `,w.emit("authenticated",!!r),x((E=y)==null?void 0:E.SIGN_IN,{...m}),{errorMessage:"",userName:u}};export{V as a,K as g};
