/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as G,f as $,h as U}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as w}from"@dropins/tools/event-bus.js";import{merge as k}from"@dropins/tools/lib.js";import{c as s,b as C,C as R,D}from"./getCustomerRolePermissions.js";import{CUSTOMER_INFORMATION_FRAGMENT as F}from"../fragments.js";import{p as x,E as y}from"./acdl.js";import{s as S}from"./setReCaptchaToken.js";const v=t=>{var f,e,c,r,a,o,m,T,g,_,d,E,u,M;const i={email:((e=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:e.email)??"",firstName:((r=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:r.firstname)??"",lastName:((o=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:o.lastname)??"",groupUid:((g=(T=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:T.group)==null?void 0:g.uid)??""};return k(i,(M=(u=(E=(d=(_=s)==null?void 0:_.getConfig())==null?void 0:d.models)==null?void 0:E.CustomerModel)==null?void 0:u.transformer)==null?void 0:M.call(u,t.data))},K=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${F}
`,H=async t=>{if(t){const{authHeaderConfig:i}=s.getConfig();G(i.header,i.tokenPrefix?`${i.tokenPrefix} ${t}`:t)}return await $(K,{method:"GET",cache:"force-cache"}).then(i=>v(i)).catch(U)},Q=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,X=async({email:t,password:i,translations:f,onErrorCallback:e,handleSetInLineAlertProps:c})=>{var d,E,u,M,h;const{onCustomerGroup:r}=s.getConfig();await S();const a=await $(Q,{method:"POST",variables:{email:t,password:i}}).catch(U);if(!((E=(d=a==null?void 0:a.data)==null?void 0:d.generateCustomerToken)!=null&&E.token)){const N=f.customerTokenErrorMessage,O=a!=null&&a.errors?a.errors[0].message:N;return e==null||e(O),c==null||c({type:"error",text:O}),{errorMessage:O,userName:""}}const o=(M=(u=a==null?void 0:a.data)==null?void 0:u.generateCustomerToken)==null?void 0:M.token,m=await H(o),T=m==null?void 0:m.firstName,g=m==null?void 0:m.email;if(!T||!g){const N=f.customerTokenErrorMessage;return e==null||e(N),c==null||c({type:"error",text:N}),{errorMessage:N,userName:"",userEmail:""}}const _=await C();return document.cookie=`${R.auth_dropin_firstname}=${T}; path=/; ${_}; Secure;`,document.cookie=`${R.auth_dropin_user_token}=${o}; path=/; ${_}; Secure;`,r==null||r(o?m==null?void 0:m.groupUid:D),w.emit("authenticated",!!o),x((h=y)==null?void 0:h.SIGN_IN,{...m}),{errorMessage:"",userName:T,userEmail:g}};export{X as a,H as g};
//# sourceMappingURL=getCustomerToken.js.map
