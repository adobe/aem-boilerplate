import{f as r,h as e}from"./network-error.js";const i=`
mutation RESEND_CONFIRMATION_EMAIL($email: String!) {
  resendConfirmationEmail(email: $email)
}`,n=async a=>await r(i,{method:"POST",variables:{email:a}}).catch(e);export{n as r};
