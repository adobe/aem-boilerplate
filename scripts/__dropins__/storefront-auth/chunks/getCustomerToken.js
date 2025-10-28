/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as U,f as R,h as $}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as s}from"@dropins/tools/event-bus.js";import{merge as w}from"@dropins/tools/lib.js";import{c as G,a as k,C as h,D as C}from"./verifyToken.js";import{CUSTOMER_INFORMATION_FRAGMENT as D}from"../fragments.js";import{p as F,E as x}from"./acdl.js";import{s as y}from"./setReCaptchaToken.js";const S=t=>{var T,e,o,a,u,m,r,f,g,_,d,E,c,M;const i={email:((e=(T=t==null?void 0:t.data)==null?void 0:T.customer)==null?void 0:e.email)??"",firstName:((a=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:a.firstname)??"",lastName:((m=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:m.lastname)??"",groupUid:((g=(f=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:f.group)==null?void 0:g.uid)??""};return w(i,(M=(c=(E=(d=(_=G)==null?void 0:_.getConfig())==null?void 0:d.models)==null?void 0:E.CustomerModel)==null?void 0:c.transformer)==null?void 0:M.call(c,t.data))},v=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${D}
`,K=async t=>{if(t){const{authHeaderConfig:i}=G.getConfig();U(i.header,i.tokenPrefix?`${i.tokenPrefix} ${t}`:t)}return await R(v,{method:"GET",cache:"force-cache"}).then(i=>S(i)).catch($)},H=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,V=async({email:t,password:i,translations:T,onErrorCallback:e,handleSetInLineAlertProps:o})=>{var _,d,E,c,M;await y();const a=await R(H,{method:"POST",variables:{email:t,password:i}}).catch($);if(!((d=(_=a==null?void 0:a.data)==null?void 0:_.generateCustomerToken)!=null&&d.token)){const N=T.customerTokenErrorMessage,O=a!=null&&a.errors?a.errors[0].message:N;return e==null||e(O),o==null||o({type:"error",text:O}),{errorMessage:O,userName:""}}const u=(c=(E=a==null?void 0:a.data)==null?void 0:E.generateCustomerToken)==null?void 0:c.token,m=await K(u),r=m==null?void 0:m.firstName,f=m==null?void 0:m.email;if(!r||!f){const N=T.customerTokenErrorMessage;return e==null||e(N),o==null||o({type:"error",text:N}),{errorMessage:N,userName:"",userEmail:""}}const g=await k();return document.cookie=`${h.auth_dropin_firstname}=${r}; path=/; ${g}; Secure;`,document.cookie=`${h.auth_dropin_user_token}=${u}; path=/; ${g}; Secure;`,s.emit("auth/group-uid",u?m==null?void 0:m.groupUid:C),s.emit("authenticated",!!u),F((M=x)==null?void 0:M.SIGN_IN,{...m}),{errorMessage:"",userName:r,userEmail:f}};export{V as a,K as g};
//# sourceMappingURL=getCustomerToken.js.map
