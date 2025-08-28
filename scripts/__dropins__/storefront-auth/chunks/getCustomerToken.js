/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as G,f as h,h as $}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as w}from"@dropins/tools/event-bus.js";import{merge as k}from"@dropins/tools/lib.js";import{c as R}from"./initialize.js";import{CUSTOMER_INFORMATION_FRAGMENT as C}from"../fragments.js";import{a as U,C as O}from"./verifyToken.js";import{p as x,E as y}from"./acdl.js";import{s as F}from"./setReCaptchaToken.js";const v=t=>{var f,o,i,a,c,m,u,s,T,r,g;const e={email:((o=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:o.email)??"",firstName:((a=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:a.firstname)??"",lastName:((m=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:m.lastname)??""};return k(e,(g=(r=(T=(s=(u=R)==null?void 0:u.getConfig())==null?void 0:s.models)==null?void 0:T.CustomerModel)==null?void 0:r.transformer)==null?void 0:g.call(r,t.data))},D=`
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
`,V=async({email:t,password:e,translations:f,onErrorCallback:o,handleSetInLineAlertProps:i})=>{var r,g,E,_,d;await F();const a=await h(H,{method:"POST",variables:{email:t,password:e}}).catch($);if(!((g=(r=a==null?void 0:a.data)==null?void 0:r.generateCustomerToken)!=null&&g.token)){const M=f.customerTokenErrorMessage,N=a!=null&&a.errors?a.errors[0].message:M;return o==null||o(N),i==null||i({type:"error",text:N}),{errorMessage:N,userName:""}}const c=(_=(E=a==null?void 0:a.data)==null?void 0:E.generateCustomerToken)==null?void 0:_.token,m=await K(c),u=m==null?void 0:m.firstName,s=m==null?void 0:m.email;if(!u||!s){const M=f.customerTokenErrorMessage;return o==null||o(M),i==null||i({type:"error",text:M}),{errorMessage:M,userName:"",userEmail:""}}const T=await U();return document.cookie=`${O.auth_dropin_firstname}=${u}; path=/; ${T}; `,document.cookie=`${O.auth_dropin_user_token}=${c}; path=/; ${T}; `,w.emit("authenticated",!!c),x((d=y)==null?void 0:d.SIGN_IN,{...m}),{errorMessage:"",userName:u,userEmail:s}};export{V as a,K as g};
//# sourceMappingURL=getCustomerToken.js.map
