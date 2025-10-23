/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as i}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{b as l,v as g,C as f}from"./verifyToken.js";import{Initializer as P,Config as C}from"@dropins/tools/lib.js";import{f as p}from"./network-error.js";const d=new C(void 0),m=new P({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...e};m.config.setConfig(r);const o=l(f.auth_dropin_user_token),[s]=await Promise.all([g(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),o?h():Promise.resolve(),r.customerGroup?_():Promise.resolve()]);d.setConfig(s)},listeners:()=>[i.on("authenticated",e=>{const t=m.config.getConfig(),r=d.getConfig();r!==void 0&&e!==r&&(d.setConfig(e),h(),t.customerGroup&&_())})]}),O=m.config,E=`
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
`;let u=null,a=null;const R=e=>{const t={},r=o=>{o.forEach(s=>{var n;t[s.id]=!0,(n=s.children)!=null&&n.length&&r(s.children)})};return r(e),t},v=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],G=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,M=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?R(e.permissions):{}},S=(e,t)=>{if(t===!0)return e;const r={...e};return v.forEach(o=>{r[o]=!1}),r},T=(e,t)=>{const r=G(e),o=M(e),s=S(o,t);return{...{all:!0,...r&&{admin:!0}},...s}},w=async()=>{var e,t,r,o;try{const s=await p(E,{method:"GET"}),n=T((t=(e=s.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=s.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return u=n,a=null,n}catch(s){throw a=null,s}},h=()=>u?(i.emit("auth/permissions",u),Promise.resolve(u)):(a||(a=w().then(e=>(i.emit("auth/permissions",e),e))),a),b=()=>{u=null,a=null},y=`
  query GET_CUSTOMER_GROUP {
    customer {
      group {
        uid
      }
    }
  }
`,_=async()=>{var r,o,s,n;const e=(r=O.getConfig().customerGroup)==null?void 0:r.defaultCustomerGroupId;if(!l(f.auth_dropin_user_token))return i.emit("auth/customerGroup",e),e;try{const c=((n=(s=(o=(await p(y,{method:"GET"})).data)==null?void 0:o.customer)==null?void 0:s.group)==null?void 0:n.uid)||e;return i.emit("auth/customerGroup",c),c}catch(c){return console.warn(c),i.emit("auth/customerGroup",e),e}};export{b as _,_ as a,O as c,h as g,m as i};
//# sourceMappingURL=getCustomerGroup.js.map
