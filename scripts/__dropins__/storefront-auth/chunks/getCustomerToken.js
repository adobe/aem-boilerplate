/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as y,f as G,h as R}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as U}from"@dropins/tools/event-bus.js";import{merge as C}from"@dropins/tools/lib.js";import{c as k,f as F,C as w,e as v,L as x}from"./getAdobeCommerceOptimizerData.js";import{CUSTOMER_INFORMATION_FRAGMENT as S}from"../fragments.js";import{p as D,E as H}from"./acdl.js";import{s as K}from"./setReCaptchaToken.js";const A=t=>{var g,e,o,s,a,c,m,u,T,d,E,M,r,N;const i={email:((e=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:e.email)??"",firstName:((s=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:s.firstname)??"",lastName:((c=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:c.lastname)??"",groupUid:((T=(u=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:u.group)==null?void 0:T.uid)??""};return C(i,(N=(r=(M=(E=(d=k)==null?void 0:d.getConfig())==null?void 0:E.models)==null?void 0:M.CustomerModel)==null?void 0:r.transformer)==null?void 0:N.call(r,t.data))},Q=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${S}
`,n=async t=>{if(t){const{authHeaderConfig:i}=k.getConfig();y(i.header,i.tokenPrefix?`${i.tokenPrefix} ${t}`:t)}return await G(Q,{method:"GET",cache:"force-cache"}).then(i=>A(i)).catch(R)},q=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,Z=async({email:t,password:i,translations:g,onErrorCallback:e,handleSetInLineAlertProps:o,apiErrorMessageOverride:s})=>{var M,r,N,O,h;await K();const a=await G(q,{method:"POST",variables:{email:t,password:i}}).catch(R);if(!((r=(M=a==null?void 0:a.data)==null?void 0:M.generateCustomerToken)!=null&&r.token)){const _=g.customerTokenErrorMessage,f=a!=null&&a.errors?a.errors[0].message:_,$=s??f;return e==null||e(f),o==null||o({type:"error",text:$}),{errorMessage:f,displayErrorMessage:$,userName:"",userEmail:""}}const c=(O=(N=a==null?void 0:a.data)==null?void 0:N.generateCustomerToken)==null?void 0:O.token,m=await n(c),u=m==null?void 0:m.firstName,T=m==null?void 0:m.email;if(!u||!T){const _=g.customerTokenErrorMessage,f=s??_;return e==null||e(_),o==null||o({type:"error",text:f}),{errorMessage:_,displayErrorMessage:f,userName:"",userEmail:""}}const d=await F(),E=x.includes(window.location.hostname)?"":"Secure";return document.cookie=`${w.auth_dropin_firstname}=${u}; path=/; ${d}; ${E};`,document.cookie=`${w.auth_dropin_user_token}=${c}; path=/; ${d}; ${E};`,await v(c?m==null?void 0:m.groupUid:void 0),U.emit("authenticated",!!c),D((h=H)==null?void 0:h.SIGN_IN,{...m}),{errorMessage:"",displayErrorMessage:"",userName:u,userEmail:T}};export{Z as a,n as g};
//# sourceMappingURL=getCustomerToken.js.map
