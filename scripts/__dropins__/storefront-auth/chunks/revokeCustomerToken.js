/*! Copyright 2024 Adobe
All Rights Reserved. */
import{f as u,h as n}from"./network-error.js";import{C as m,d as s,p as c,E}from"./getStoreConfig.js";import{events as i}from"@dropins/tools/event-bus.js";const k=t=>{var r,o,a;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=((o=t==null?void 0:t.errors[0])==null?void 0:o.message)||"Unknown error"),{message:e,success:!!((a=t==null?void 0:t.data)!=null&&a.revokeCustomerToken)}},h=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,_=async()=>await u(h,{method:"POST"}).then(t=>{const e=k(t);if(e!=null&&e.success)[m.auth_dropin_user_token,m.auth_dropin_firstname].forEach(r=>{s(r)}),i.emit("authenticated",!1),c(E.SIGN_OUT,{logoutAttempt:!0});else{const r=`
          ERROR revokeCustomerToken: ${e.message}`;console.error(r)}return e}).catch(n);export{_ as r};
