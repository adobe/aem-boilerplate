/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as o,h as r}from"./network-error.js";const t=`
  mutation CONFIRM_EMAIL($email: String!, $confirmation_key: String!) {
    confirmEmail(
      input: { email: $email, confirmation_key: $confirmation_key }
    ) {
      customer {
        email
      }
    }
  }
`,m=async({customerEmail:i,customerConfirmationKey:a})=>await o(t,{method:"POST",variables:{email:i,confirmation_key:a}}).catch(r);export{m as c};
