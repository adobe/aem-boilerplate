/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as S,Config as A}from"@dropins/tools/lib.js";import{events as i}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as p,h as y,a as T,r as k}from"./network-error.js";const C={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},f=3600,O=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[n,a]=o.trim().split("=");n===e&&(r=decodeURIComponent(a))}),r},R=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},V=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await x();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||f}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${f}`}},l=new A(void 0),E=new S({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1},...e};E.config.setConfig(r);const o=O(C.auth_dropin_user_token),[n]=await Promise.all([U(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&o?P():Promise.resolve()]);l.setConfig(n)},listeners:()=>[i.on("authenticated",e=>{const t=l.getConfig();if(t!==void 0&&e!==t){l.setConfig(e);const{customerPermissionRoles:r}=E.config.getConfig();r&&P()}})]}),j=E.config,w=e=>{var t,r,o,n,a,s,u,h,m,d;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((n=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:n.minimum_password_length)||3,requiredCharacterClasses:+((s=(a=e==null?void 0:e.data)==null?void 0:a.storeConfig)==null?void 0:s.required_character_classes_number)||0,createAccountConfirmation:((h=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:h.create_account_confirmation)||!1,customerAccessTokenLifetime:((d=(m=e==null?void 0:e.data)==null?void 0:m.storeConfig)==null?void 0:d.customer_access_token_lifetime)*f||f}},I=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},v=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(s=>s.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},M="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",g=async e=>{const t=e?await v(e):M;i.emit("auth/group-uid",t)},b=`
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
`,x=async()=>await p(b,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?I(e.errors):w(e)}).catch(y),L=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,U=async(e="Authorization",t="Bearer")=>{const r=O(C.auth_dropin_user_token);return r?(T(e,`${t} ${r}`),p(L).then(async o=>{var a,s,u,h;return!((a=o.errors)!=null&&a.find(m=>{var d;return((d=m.extensions)==null?void 0:d.category)==="graphql-authentication"}))?(await g((h=(u=(s=o.data)==null?void 0:s.customer)==null?void 0:u.group)==null?void 0:h.uid),i.emit("authenticated",!0),!0):(R(C.auth_dropin_user_token),k(e),await g(),i.emit("authenticated",!1),!1)})):(await g(),i.emit("authenticated",!1),!1)},G=`
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
`;let _=null,c=null;const N=e=>{const t={},r=o=>{o.forEach(n=>{var a;t[n.id]=!0,(a=n.children)!=null&&a.length&&r(n.children)})};return r(e),t},H=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],F=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,q=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?N(e.permissions):{}},$=(e,t)=>{if(t===!0)return e;const r={...e};return H.forEach(o=>{r[o]=!1}),r},D=(e,t)=>{const r=F(e),o=q(e),n=$(o,t);return{...{all:!0,...r&&{admin:!0}},...n}},z=async()=>{var e,t,r,o;try{const n=await p(G,{method:"GET"}),a=D((t=(e=n.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=n.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return _=a,c=null,a}catch(n){throw c=null,n}},P=()=>_?(i.emit("auth/permissions",_),Promise.resolve(_)):(c||(c=z().then(e=>(i.emit("auth/permissions",e),e))),c),W=()=>{_=null,c=null};export{C,W as _,P as a,V as b,j as c,R as d,g as e,x as g,I as h,E as i,U as v};
//# sourceMappingURL=getCustomerRolePermissions.js.map
