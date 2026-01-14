/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as R,f as $,h as w}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as k}from"@dropins/tools/event-bus.js";import{merge as U}from"@dropins/tools/lib.js";import{c as G,f as C,C as h,e as v,L as F}from"./getAdobeCommerceOptimizerData.js";import{CUSTOMER_INFORMATION_FRAGMENT as x}from"../fragments.js";import{p as y,E as S}from"./acdl.js";import{s as D}from"./setReCaptchaToken.js";const H=t=>{var f,e,o,a,c,m,r,T,g,d,s,E,u,M;const i={email:((e=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:e.email)??"",firstName:((a=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:a.firstname)??"",lastName:((m=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:m.lastname)??"",groupUid:((g=(T=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:T.group)==null?void 0:g.uid)??""};return U(i,(M=(u=(E=(s=(d=G)==null?void 0:d.getConfig())==null?void 0:s.models)==null?void 0:E.CustomerModel)==null?void 0:u.transformer)==null?void 0:M.call(u,t.data))},K=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${x}
`,A=async t=>{if(t){const{authHeaderConfig:i}=G.getConfig();R(i.header,i.tokenPrefix?`${i.tokenPrefix} ${t}`:t)}return await $(K,{method:"GET",cache:"force-cache"}).then(i=>H(i)).catch(w)},Q=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,Y=async({email:t,password:i,translations:f,onErrorCallback:e,handleSetInLineAlertProps:o})=>{var s,E,u,M,_;await D();const a=await $(Q,{method:"POST",variables:{email:t,password:i}}).catch(w);if(!((E=(s=a==null?void 0:a.data)==null?void 0:s.generateCustomerToken)!=null&&E.token)){const N=f.customerTokenErrorMessage,O=a!=null&&a.errors?a.errors[0].message:N;return e==null||e(O),o==null||o({type:"error",text:O}),{errorMessage:O,userName:"",userEmail:""}}const c=(M=(u=a==null?void 0:a.data)==null?void 0:u.generateCustomerToken)==null?void 0:M.token,m=await A(c),r=m==null?void 0:m.firstName,T=m==null?void 0:m.email;if(!r||!T){const N=f.customerTokenErrorMessage;return e==null||e(N),o==null||o({type:"error",text:N}),{errorMessage:N,userName:"",userEmail:""}}const g=await C(),d=F.includes(window.location.hostname)?"":"Secure";return document.cookie=`${h.auth_dropin_firstname}=${r}; path=/; ${g}; ${d};`,document.cookie=`${h.auth_dropin_user_token}=${c}; path=/; ${g}; ${d};`,await v(c?m==null?void 0:m.groupUid:void 0),k.emit("authenticated",!!c),y((_=S)==null?void 0:_.SIGN_IN,{...m}),{errorMessage:"",userName:r,userEmail:T}};export{Y as a,A as g};
//# sourceMappingURL=getCustomerToken.js.map
