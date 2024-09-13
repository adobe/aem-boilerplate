import{a as y,f as k,h as x}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{h as R,p as T,E as g,a as v,C as O}from"./getStoreConfig.js";import{events as D}from"@dropins/tools/event-bus.js";import{c as U}from"./initialize.js";import{s as K}from"./setReCaptchaToken.js";const F=t=>{var m,r,e,c,a,f;return{email:((r=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:r.email)||"",firstname:((c=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:c.firstname)||"",lastname:((f=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:f.lastname)||""}},H=`
  query GET_CUSTOMER_DATA {
    customer {
      firstname
      lastname
      email
    }
  }
`,Q=async t=>{if(t){const{authHeaderConfig:m}=U.getConfig();y(m.header,m.tokenPrefix?`${m.tokenPrefix} ${t}`:t)}return await k(H,{method:"GET",cache:"force-cache"}).then(m=>{var r;return(r=m.errors)!=null&&r.length?R(m.errors):F(m)}).catch(x)},S=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,J=async({email:t,password:m,translations:r,onErrorCallback:e,handleSetInLineAlertProps:c})=>{var E,N,d,$,M,G,w;await K();const a=await k(S,{method:"POST",variables:{email:t,password:m}}).catch(x);if(!((N=(E=a==null?void 0:a.data)==null?void 0:E.generateCustomerToken)!=null&&N.token)){const o=r.customerTokenErrorMessage,u=a!=null&&a.errors?a.errors[0].message:o;return e==null||e(u),c==null||c({type:"error",text:u}),T((d=g)==null?void 0:d.SIGN_IN,{}),{errorMessage:u,userName:""}}const f=(M=($=a==null?void 0:a.data)==null?void 0:$.generateCustomerToken)==null?void 0:M.token,i=await Q(f);if(!(i!=null&&i.firstname)||!(i!=null&&i.email)){const o=r.customerTokenErrorMessage;return e==null||e(o),c==null||c({type:"error",text:o}),T((G=g)==null?void 0:G.SIGN_IN,{}),{errorMessage:o,userName:""}}const h=i==null?void 0:i.firstname,s=i==null?void 0:i.email,_=await v();return document.cookie=`${O.auth_dropin_firstname}=${h}; path=/; ${_}; `,document.cookie=`${O.auth_dropin_user_token}=${f}; path=/; ${_}; `,D.emit("authenticated",!!f),T((w=g)==null?void 0:w.SIGN_IN,s?{email:s}:{}),{errorMessage:"",userName:h}};export{J as a,Q as g};
