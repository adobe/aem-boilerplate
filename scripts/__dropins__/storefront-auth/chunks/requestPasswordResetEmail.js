/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as E,h as l}from"./network-error.js";import{s as e}from"./setReCaptchaToken.js";const R=a=>{var r,m,i;let t="";return(r=a==null?void 0:a.errors)!=null&&r.length&&(t=(m=a==null?void 0:a.errors[0])==null?void 0:m.message),{message:t,success:!!((i=a==null?void 0:a.data)!=null&&i.requestPasswordResetEmail)}},c=`
  mutation REQUEST_PASSWORD_RESET_EMAIL($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`,o=async a=>(await e(),await E(c,{method:"POST",variables:{email:a}}).then(t=>R(t)).catch(l));export{o as r};
//# sourceMappingURL=requestPasswordResetEmail.js.map
