/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as i}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as C,h as S,a as T,r as k}from"./network-error.js";import{Initializer as A,Config as M}from"@dropins/tools/lib.js";const g={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},f=3600,O=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[n,a]=o.trim().split("=");n===e&&(r=decodeURIComponent(a))}),r},R=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},Q=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await y();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||f}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${f}`}},E="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",l=new M(void 0),P=new A({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...e};P.config.setConfig(r);const o=O(g.auth_dropin_user_token),[n]=await Promise.all([x(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),o?p():Promise.resolve()]);l.setConfig(n)},listeners:()=>[i.on("authenticated",e=>{const t=l.getConfig();t!==void 0&&e!==t&&(l.setConfig(e),p())})]}),V=P.config,v=e=>{var t,r,o,n,a,c,u,d,m,_;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((n=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:n.minimum_password_length)||3,requiredCharacterClasses:+((c=(a=e==null?void 0:e.data)==null?void 0:a.storeConfig)==null?void 0:c.required_character_classes_number)||0,createAccountConfirmation:((d=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:d.create_account_confirmation)||!1,customerAccessTokenLifetime:((_=(m=e==null?void 0:e.data)==null?void 0:m.storeConfig)==null?void 0:_.customer_access_token_lifetime)*f||f}},I=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},w=`
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
`,y=async()=>await C(w,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?I(e.errors):v(e)}).catch(S),L=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,x=async(e="Authorization",t="Bearer")=>{const r=O(g.auth_dropin_user_token);return r?(T(e,`${t} ${r}`),C(L).then(o=>{var a,c,u,d;return!((a=o.errors)!=null&&a.find(m=>{var _;return((_=m.extensions)==null?void 0:_.category)==="graphql-authentication"}))?(i.emit("auth/group-uid",(d=(u=(c=o.data)==null?void 0:c.customer)==null?void 0:u.group)==null?void 0:d.uid),i.emit("authenticated",!0),!0):(R(g.auth_dropin_user_token),k(e),i.emit("auth/group-uid",E),i.emit("authenticated",!1),!1)})):(i.emit("auth/group-uid",E),i.emit("authenticated",!1),!1)},G=`
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
`;let h=null,s=null;const U=e=>{const t={},r=o=>{o.forEach(n=>{var a;t[n.id]=!0,(a=n.children)!=null&&a.length&&r(n.children)})};return r(e),t},b=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],N=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,q=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?U(e.permissions):{}},F=(e,t)=>{if(t===!0)return e;const r={...e};return b.forEach(o=>{r[o]=!1}),r},D=(e,t)=>{const r=N(e),o=q(e),n=F(o,t);return{...{all:!0,...r&&{admin:!0}},...n}},H=async()=>{var e,t,r,o;try{const n=await C(G,{method:"GET"}),a=D((t=(e=n.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=n.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return h=a,s=null,a}catch(n){throw s=null,n}},p=()=>h?(i.emit("auth/permissions",h),Promise.resolve(h)):(s||(s=H().then(e=>(i.emit("auth/permissions",e),e))),s),B=()=>{h=null,s=null};export{g as C,E as D,B as _,p as a,Q as b,V as c,R as d,y as g,I as h,P as i,x as v};
//# sourceMappingURL=getCustomerRolePermissions.js.map
