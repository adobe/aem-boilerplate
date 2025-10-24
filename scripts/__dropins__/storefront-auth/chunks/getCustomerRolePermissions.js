/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as i}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as E,h as T,a as k,r as A}from"./network-error.js";import{Initializer as M,Config as R}from"@dropins/tools/lib.js";const C={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},m=3600,S=e=>{const r=document.cookie.split(";");let o;return r.forEach(t=>{const[n,a]=t.trim().split("=");n===e&&(o=decodeURIComponent(a))}),o},v=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},B=async()=>{try{const e=sessionStorage.getItem("storeConfig");let o=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!o){const t=await x();sessionStorage.setItem("storeConfig",JSON.stringify(t)),o=(t==null?void 0:t.customerAccessTokenLifetime)||m}return`Max-Age=${o}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${m}`}},l="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",g=new R(void 0),p=new M({init:async e=>{const o={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...e};p.config.setConfig(o);const t=S(C.auth_dropin_user_token),[n]=await Promise.all([b(o.authHeaderConfig.header,o.authHeaderConfig.tokenPrefix),t?P():Promise.resolve({})]);g.setConfig(n)},listeners:()=>[i.on("authenticated",e=>{const r=g.getConfig();r!==void 0&&e!==r&&(g.setConfig(e),P())})]}),I=p.config,w=e=>{var r,o,t,n,a,c,u,d,_,f;return{autocompleteOnStorefront:((o=(r=e==null?void 0:e.data)==null?void 0:r.storeConfig)==null?void 0:o.autocomplete_on_storefront)||!1,minLength:((n=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:n.minimum_password_length)||3,requiredCharacterClasses:+((c=(a=e==null?void 0:e.data)==null?void 0:a.storeConfig)==null?void 0:c.required_character_classes_number)||0,createAccountConfirmation:((d=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:d.create_account_confirmation)||!1,customerAccessTokenLifetime:((f=(_=e==null?void 0:e.data)==null?void 0:_.storeConfig)==null?void 0:f.customer_access_token_lifetime)*m||m}},y=e=>{const r=e.map(o=>o.message).join(" ");throw Error(r)},L=`
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
`,x=async()=>await E(L,{method:"GET",cache:"force-cache"}).then(e=>{var r;return(r=e.errors)!=null&&r.length?y(e.errors):w(e)}).catch(T),U=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,b=async(e="Authorization",r="Bearer")=>{const o=S(C.auth_dropin_user_token),{onCustomerGroup:t}=I.getConfig();return o?(k(e,`${r} ${o}`),E(U).then(n=>{var c,u,d,_;return!((c=n.errors)!=null&&c.find(f=>{var O;return((O=f.extensions)==null?void 0:O.category)==="graphql-authentication"}))?(t==null||t(((_=(d=(u=n.data)==null?void 0:u.customer)==null?void 0:d.group)==null?void 0:_.uid)||l),i.emit("authenticated",!0),!0):(v(C.auth_dropin_user_token),A(e),t==null||t(l),i.emit("authenticated",!1),!1)})):(t==null||t(l),i.emit("authenticated",!1),!1)},N=`
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
`;let h=null,s=null;const q=e=>{const r={},o=t=>{t.forEach(n=>{var a;r[n.id]=!0,(a=n.children)!=null&&a.length&&o(n.children)})};return o(e),r},F=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],G=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,D=e=>{var r;return(r=e==null?void 0:e.permissions)!=null&&r.length?q(e.permissions):{}},H=(e,r)=>{if(r===!0)return e;const o={...e};return F.forEach(t=>{o[t]=!1}),o},$=(e,r)=>{const o=G(e),t=D(e),n=H(t,r);return{...{all:!0,...o&&{admin:!0}},...n}},z=async()=>{var e,r,o,t;try{const n=await E(N,{method:"GET"}),a=$((r=(e=n.data)==null?void 0:e.customer)==null?void 0:r.role,(t=(o=n.data)==null?void 0:o.customer)==null?void 0:t.purchase_orders_enabled);return h=a,s=null,a}catch(n){throw s=null,n}},P=()=>h?(i.emit("auth/permissions",h),Promise.resolve(h)):(s||(s=z().then(e=>(i.emit("auth/permissions",e),e))),s),j=()=>{h=null,s=null};export{C,l as D,j as _,P as a,B as b,I as c,v as d,x as g,y as h,p as i,b as v};
//# sourceMappingURL=getCustomerRolePermissions.js.map
