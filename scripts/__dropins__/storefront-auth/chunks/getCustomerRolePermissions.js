/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as l,Config as _}from"@dropins/tools/lib.js";import{a as m,v as f,C as p}from"./verifyToken.js";import{events as u}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as g}from"./network-error.js";const c=new _(void 0),h=new l({init:async e=>{const s={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...e};h.config.setConfig(s);const n=m(p.auth_dropin_user_token),[t]=await Promise.all([f(s.authHeaderConfig.header,s.authHeaderConfig.tokenPrefix),n?d():Promise.resolve()]);c.setConfig(t)},listeners:()=>[u.on("authenticated",e=>{const r=c.getConfig();r!==void 0&&e!==r&&(c.setConfig(e),d())})]}),T=h.config,P=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      purchase_orders_enabled
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
`;let a=null,o=null;const C=e=>{const r={},s=n=>{n.forEach(t=>{var i;r[t.id]=!0,(i=t.children)!=null&&i.length&&s(t.children)})};return s(e),r},O=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],v=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,E=e=>{var r;return(r=e==null?void 0:e.permissions)!=null&&r.length?C(e.permissions):{}},M=(e,r)=>{if(r===!0)return e;const s={...e};return O.forEach(n=>{s[n]=!1}),s},R=(e,r)=>{const s=v(e),n=E(e),t=M(n,r);return{...{all:!0,...s&&{admin:!0}},...t}},S=async()=>{var e,r,s,n;try{const t=await g(P,{method:"GET"}),i=R((r=(e=t.data)==null?void 0:e.customer)==null?void 0:r.role,(n=(s=t.data)==null?void 0:s.customer)==null?void 0:n.purchase_orders_enabled);return a=i,o=null,i}catch(t){throw o=null,t}},d=()=>a?(u.emit("auth/permissions",a),Promise.resolve(a)):(o||(o=S().then(e=>(u.emit("auth/permissions",e),e))),o),k=()=>{a=null,o=null};export{k as _,T as c,d as g,h as i};
//# sourceMappingURL=getCustomerRolePermissions.js.map
