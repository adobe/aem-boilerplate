/*! Copyright 2024 Adobe
All Rights Reserved. */
import{a as U,f as w,h as k}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as x}from"@dropins/tools/event-bus.js";import{merge as y}from"@dropins/tools/lib.js";import{c as C}from"./initialize.js";import{CUSTOMER_INFORMATION_FRAGMENT as F}from"../fragments.js";import{p as E,E as O,a as S,C as R}from"./getStoreConfig.js";import{s as v}from"./setReCaptchaToken.js";const D=t=>{var f,e,i,a,r,o,u,T,s,g,N,c,_;const m={email:((e=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:e.email)??"",firstName:((a=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:a.firstname)??"",lastName:((o=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:o.lastname)??"",isSubscribed:((T=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:T.is_subscribed)??!1};return y(m,(_=(c=(N=(g=(s=C)==null?void 0:s.getConfig())==null?void 0:g.models)==null?void 0:N.CustomerModel)==null?void 0:c.transformer)==null?void 0:_.call(c,t.data))},K=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${F}
`,H=async t=>{if(t){const{authHeaderConfig:m}=C.getConfig();U(m.header,m.tokenPrefix?`${m.tokenPrefix} ${t}`:t)}return await w(K,{method:"GET",cache:"force-cache"}).then(m=>D(m)).catch(k)},I=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,W=async({email:t,password:m,translations:f,onErrorCallback:e,handleSetInLineAlertProps:i})=>{var g,N,c,_,h,$,G;await v();const a=await w(I,{method:"POST",variables:{email:t,password:m}}).catch(k);if(!((N=(g=a==null?void 0:a.data)==null?void 0:g.generateCustomerToken)!=null&&N.token)){const d=f.customerTokenErrorMessage,M=a!=null&&a.errors?a.errors[0].message:d;return e==null||e(M),i==null||i({type:"error",text:M}),E((c=O)==null?void 0:c.SIGN_IN,{}),{errorMessage:M,userName:""}}const r=(h=(_=a==null?void 0:a.data)==null?void 0:_.generateCustomerToken)==null?void 0:h.token,o=await H(r),u=o==null?void 0:o.firstName,T=o==null?void 0:o.email;if(!u||!T){const d=f.customerTokenErrorMessage;return e==null||e(d),i==null||i({type:"error",text:d}),E(($=O)==null?void 0:$.SIGN_IN,{}),{errorMessage:d,userName:""}}const s=await S();return document.cookie=`${R.auth_dropin_firstname}=${u}; path=/; ${s}; `,document.cookie=`${R.auth_dropin_user_token}=${r}; path=/; ${s}; `,x.emit("authenticated",!!r),E((G=O)==null?void 0:G.SIGN_IN,{email:T}),{errorMessage:"",userName:u}};export{W as a,H as g};
