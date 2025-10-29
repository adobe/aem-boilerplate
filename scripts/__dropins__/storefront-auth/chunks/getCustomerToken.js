/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as R,f as h,h as $}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as w}from"@dropins/tools/event-bus.js";import{merge as k}from"@dropins/tools/lib.js";import{c as G,a as U,C as O,e as v}from"./verifyToken.js";import{CUSTOMER_INFORMATION_FRAGMENT as C}from"../fragments.js";import{p as x,E as y}from"./acdl.js";import{s as F}from"./setReCaptchaToken.js";const D=t=>{var f,e,o,a,u,m,r,T,g,d,E,M,c,N;const i={email:((e=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:e.email)??"",firstName:((a=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:a.firstname)??"",lastName:((m=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:m.lastname)??"",groupUid:((g=(T=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:T.group)==null?void 0:g.uid)??""};return k(i,(N=(c=(M=(E=(d=G)==null?void 0:d.getConfig())==null?void 0:E.models)==null?void 0:M.CustomerModel)==null?void 0:c.transformer)==null?void 0:N.call(c,t.data))},S=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${C}
`,K=async t=>{if(t){const{authHeaderConfig:i}=G.getConfig();R(i.header,i.tokenPrefix?`${i.tokenPrefix} ${t}`:t)}return await h(S,{method:"GET",cache:"force-cache"}).then(i=>D(i)).catch($)},H=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,W=async({email:t,password:i,translations:f,onErrorCallback:e,handleSetInLineAlertProps:o})=>{var d,E,M,c,N;await F();const a=await h(H,{method:"POST",variables:{email:t,password:i}}).catch($);if(!((E=(d=a==null?void 0:a.data)==null?void 0:d.generateCustomerToken)!=null&&E.token)){const _=f.customerTokenErrorMessage,s=a!=null&&a.errors?a.errors[0].message:_;return e==null||e(s),o==null||o({type:"error",text:s}),{errorMessage:s,userName:"",userEmail:""}}const u=(c=(M=a==null?void 0:a.data)==null?void 0:M.generateCustomerToken)==null?void 0:c.token,m=await K(u),r=m==null?void 0:m.firstName,T=m==null?void 0:m.email;if(!r||!T){const _=f.customerTokenErrorMessage;return e==null||e(_),o==null||o({type:"error",text:_}),{errorMessage:_,userName:"",userEmail:""}}const g=await U();return document.cookie=`${O.auth_dropin_firstname}=${r}; path=/; ${g}; Secure;`,document.cookie=`${O.auth_dropin_user_token}=${u}; path=/; ${g}; Secure;`,await v(u?m==null?void 0:m.groupUid:void 0),w.emit("authenticated",!!u),x((N=y)==null?void 0:N.SIGN_IN,{...m}),{errorMessage:"",userName:r,userEmail:T}};export{W as a,K as g};
//# sourceMappingURL=getCustomerToken.js.map
