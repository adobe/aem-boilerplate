/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as s,h as c}from"./network-error.js";import{c as i,C as n,d as m,D as E,v as k}from"./getCustomerRolePermissions.js";import{events as u}from"@dropins/tools/event-bus.js";import{p as f,E as T}from"./acdl.js";const _=t=>{var e,o,a;let r="";return(e=t==null?void 0:t.errors)!=null&&e.length&&(r=((o=t==null?void 0:t.errors[0])==null?void 0:o.message)||"Unknown error"),{message:r,success:!!((a=t==null?void 0:t.data)!=null&&a.revokeCustomerToken)}},h=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,R=async()=>{const{onCustomerGroup:t}=i.getConfig();return await s(h,{method:"POST"}).then(r=>{const e=_(r);if(e!=null&&e.success)[n.auth_dropin_user_token,n.auth_dropin_firstname].forEach(o=>{m(o)}),t==null||t(E),u.emit("authenticated",!1),f(T.SIGN_OUT,{});else{const o=`
          ERROR revokeCustomerToken: ${e.message}`;console.error(o),k()}return e}).catch(c)};export{R as r};
//# sourceMappingURL=revokeCustomerToken.js.map
