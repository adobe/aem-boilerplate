/*! Copyright 2024 Adobe
All Rights Reserved. */
import{f as o,h as w}from"./network-error.js";import{s as d}from"./setReCaptchaToken.js";const i=`
  mutation RESET_PASSWORD(
    $email: String!
    $resetPasswordToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      email: $email
      resetPasswordToken: $resetPasswordToken
      newPassword: $newPassword
    )
  }
`,P=a=>{var r,s,e;let t="";return(r=a==null?void 0:a.errors)!=null&&r.length&&(t=(s=a==null?void 0:a.errors[0])==null?void 0:s.message),{message:t,success:!!((e=a==null?void 0:a.data)!=null&&e.resetPassword)}},S=async(a,t,r)=>(await d(),await o(i,{method:"POST",variables:{email:a,resetPasswordToken:t,newPassword:r}}).then(s=>P(s)).catch(w));export{S as r};
