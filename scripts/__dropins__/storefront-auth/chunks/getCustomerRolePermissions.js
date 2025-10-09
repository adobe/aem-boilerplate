/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as u,Config as h}from"@dropins/tools/lib.js";import{a as l,v as g,C}from"./verifyToken.js";import{events as c}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as p}from"./network-error.js";const a=new h(void 0),m=new u({init:async e=>{const t={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...e};m.config.setConfig(t);const n=l(C.auth_dropin_user_token),[r]=await Promise.all([g(t.authHeaderConfig.header,t.authHeaderConfig.tokenPrefix),n?d():Promise.resolve()]);a.setConfig(r)},listeners:()=>[c.on("authenticated",e=>{const i=a.getConfig();i!==void 0&&e!==i&&(a.setConfig(e),d())})]}),k=m.config,P=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          text
          children {
            id
            text
            children {
              id
              text
              children {
                id
                text
                children {
                  id
                  text
                  children {
                    id
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;let o=null,s=null;const _=e=>{const i={},t=n=>{n.forEach(r=>{var f;i[r.id]=!0,(f=r.children)!=null&&f.length&&t(r.children)})};return t(e),i},E=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,S=e=>{var t;if(E(e))return{admin:!0};const i={all:!0};if((t=e==null?void 0:e.permissions)!=null&&t.length){const n=_(e.permissions);return{...i,...n}}return i},v=async()=>{var e,i;try{const t=await p(P,{method:"GET"}),n=S((i=(e=t.data)==null?void 0:e.customer)==null?void 0:i.role);return o=n,s=null,n}catch(t){throw s=null,t}},d=()=>o?(c.emit("auth/permissions",o),Promise.resolve(o)):(s||(s=v().then(e=>(c.emit("auth/permissions",e),e))),s),A=()=>{o=null,s=null};export{A as _,k as c,d as g,m as i};
//# sourceMappingURL=getCustomerRolePermissions.js.map
