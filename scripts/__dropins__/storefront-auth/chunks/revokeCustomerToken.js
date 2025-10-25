/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as i,h as s}from"./network-error.js";import{C as m,d as n,D as E,v as c}from"./getCustomerRolePermissions.js";import{events as u}from"@dropins/tools/event-bus.js";import{p as k,E as h}from"./acdl.js";const T=t=>{var r,o,a;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=((o=t==null?void 0:t.errors[0])==null?void 0:o.message)||"Unknown error"),{message:e,success:!!((a=t==null?void 0:t.data)!=null&&a.revokeCustomerToken)}},_=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,v=async()=>await i(_,{method:"POST"}).then(t=>{const e=T(t);if(e!=null&&e.success)[m.auth_dropin_user_token,m.auth_dropin_firstname].forEach(r=>{n(r)}),u.emit("auth/group-uid",E),u.emit("authenticated",!1),k(h.SIGN_OUT,{});else{const r=`
          ERROR revokeCustomerToken: ${e.message}`;console.error(r),c()}return e}).catch(s);export{v as r};
//# sourceMappingURL=revokeCustomerToken.js.map
