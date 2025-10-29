/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as n,r as s,h as u}from"./network-error.js";import{c,C as i,d as h,D as E,v as f}from"./verifyToken.js";import{events as m}from"@dropins/tools/event-bus.js";import{p as k,E as _}from"./acdl.js";const T=e=>{var t,r,a;let o="";return(t=e==null?void 0:e.errors)!=null&&t.length&&(o=((r=e==null?void 0:e.errors[0])==null?void 0:r.message)||"Unknown error"),{message:o,success:!!((a=e==null?void 0:e.data)!=null&&a.revokeCustomerToken)}},C=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,g=async()=>{const{authHeaderConfig:e}=c.getConfig();return await n(C,{method:"POST"}).then(o=>{const t=T(o);if(t!=null&&t.success)[i.auth_dropin_user_token,i.auth_dropin_firstname].forEach(r=>{h(r)}),s(e.header),m.emit("auth/group-uid",E),m.emit("authenticated",!1),k(_.SIGN_OUT,{});else{const r=`
          ERROR revokeCustomerToken: ${t.message}`;console.error(r),f()}return t}).catch(u)};export{g as r};
//# sourceMappingURL=revokeCustomerToken.js.map
