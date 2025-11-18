/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as S,Config as A}from"@dropins/tools/lib.js";import{events as i}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as p,h as T,a as y,r as k}from"./network-error.js";const C={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},V=["localhost","127.0.0.1","::1"],f=3600,P=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[n,s]=o.trim().split("=");n===e&&(r=decodeURIComponent(s))}),r},R=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},j=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await b();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||f}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${f}`}},l=new A(void 0),E=new S({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1},...e};E.config.setConfig(r);const o=P(C.auth_dropin_user_token),[n]=await Promise.all([U(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&o?O():Promise.resolve()]);l.setConfig(n)},listeners:()=>[i.on("authenticated",e=>{const t=l.getConfig();if(t!==void 0&&e!==t){l.setConfig(e);const{customerPermissionRoles:r}=E.config.getConfig();r&&O()}})]}),W=E.config,w=e=>{var t,r,o,n,s,a,u,h,m,d;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((n=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:n.minimum_password_length)||3,requiredCharacterClasses:+((a=(s=e==null?void 0:e.data)==null?void 0:s.storeConfig)==null?void 0:a.required_character_classes_number)||0,createAccountConfirmation:((h=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:h.create_account_confirmation)||!1,customerAccessTokenLifetime:((d=(m=e==null?void 0:e.data)==null?void 0:m.storeConfig)==null?void 0:d.customer_access_token_lifetime)*f||f}},I=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},v=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let a=0;a<t.length;a++)r[a]=t.charCodeAt(a);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(a=>a.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},M="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",g=async e=>{const t=e?await v(e):M;i.emit("auth/group-uid",t)},L=`
  query GET_STORE_CONFIG {
    storeConfig {
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      store_name
      store_group_code
      locale
      create_account_confirmation
      customer_access_token_lifetime
    }
  }
`,b=async()=>await p(L,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?I(e.errors):w(e)}).catch(T),x=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,U=async(e="Authorization",t="Bearer")=>{const r=P(C.auth_dropin_user_token);return r?(y(e,`${t} ${r}`),p(x).then(async o=>{var s,a,u,h;return!((s=o.errors)!=null&&s.find(m=>{var d;return((d=m.extensions)==null?void 0:d.category)==="graphql-authentication"}))?(await g((h=(u=(a=o.data)==null?void 0:a.customer)==null?void 0:u.group)==null?void 0:h.uid),i.emit("authenticated",!0),!0):(R(C.auth_dropin_user_token),k(e),await g(),i.emit("authenticated",!1),!1)})):(await g(),i.emit("authenticated",!1),!1)},G=`
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
`;let _=null,c=null;const H=e=>{const t={},r=o=>{o.forEach(n=>{var s;t[n.id]=!0,(s=n.children)!=null&&s.length&&r(n.children)})};return r(e),t},N=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],F=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,q=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?H(e.permissions):{}},$=(e,t)=>{if(t===!0)return e;const r={...e};return N.forEach(o=>{r[o]=!1}),r},D=(e,t)=>{const r=F(e),o=q(e),n=$(o,t);return{...{all:!0,...r&&{admin:!0}},...n}},z=async()=>{var e,t,r,o;try{const n=await p(G,{method:"GET"}),s=D((t=(e=n.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=n.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return _=s,c=null,s}catch(n){throw c=null,n}},O=()=>_?(i.emit("auth/permissions",_),Promise.resolve(_)):(c||(c=z().then(e=>(i.emit("auth/permissions",e),e))),c),X=()=>{_=null,c=null};export{C,V as L,X as _,O as a,j as b,W as c,R as d,g as e,b as g,I as h,E as i,U as v};
//# sourceMappingURL=getCustomerRolePermissions.js.map
