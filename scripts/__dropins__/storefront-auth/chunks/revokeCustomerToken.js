/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as n,h as s}from"./network-error.js";import{C as m,d as i,v as u}from"./verifyToken.js";import{events as c}from"@dropins/tools/event-bus.js";import{p as E,E as k}from"./acdl.js";const h=t=>{var r,o,a;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=((o=t==null?void 0:t.errors[0])==null?void 0:o.message)||"Unknown error"),{message:e,success:!!((a=t==null?void 0:t.data)!=null&&a.revokeCustomerToken)}},f=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,v=async()=>await n(f,{method:"POST"}).then(t=>{const e=h(t);if(e!=null&&e.success)[m.auth_dropin_user_token,m.auth_dropin_firstname].forEach(r=>{i(r)}),c.emit("authenticated",!1),E(k.SIGN_OUT,{});else{const r=`
          ERROR revokeCustomerToken: ${e.message}`;console.error(r),u()}return e}).catch(s);export{v as r};
//# sourceMappingURL=revokeCustomerToken.js.map
