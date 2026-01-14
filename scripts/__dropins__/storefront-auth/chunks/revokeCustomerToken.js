/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as s,r as i,h as m}from"./network-error.js";import{c,C as n,d as u,e as h,v as E}from"./getAdobeCommerceOptimizerData.js";import{events as f}from"@dropins/tools/event-bus.js";import{p as k,E as d}from"./acdl.js";const l=e=>{var t,r,a;let o="";return(t=e==null?void 0:e.errors)!=null&&t.length&&(o=((r=e==null?void 0:e.errors[0])==null?void 0:r.message)||"Unknown error"),{message:o,success:!!((a=e==null?void 0:e.data)!=null&&a.revokeCustomerToken)}},v=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,g=async()=>{const{authHeaderConfig:e}=c.getConfig();return await s(v,{method:"POST"}).then(async o=>{const t=l(o);if(t!=null&&t.success)[n.auth_dropin_user_token,n.auth_dropin_firstname].forEach(r=>{u(r)}),i(e.header),await h(),f.emit("authenticated",!1),k(d.SIGN_OUT,{});else{const r=`
          ERROR revokeCustomerToken: ${t.message}`;console.error(r),E()}return t}).catch(m)};export{g as r};
//# sourceMappingURL=revokeCustomerToken.js.map
