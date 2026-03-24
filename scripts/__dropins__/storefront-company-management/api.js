/*! Copyright 2026 Adobe
All Rights Reserved. */
import{c as I,i as P}from"./chunks/initialize.js";import{f as m,h as c}from"./chunks/network-error.js";import{g as L,r as M,s as H,a as D,b as v}from"./chunks/network-error.js";import{f as F}from"./chunks/fetchUserPermissions.js";import{a as B}from"./chunks/acceptCompanyInvitation.js";import{a as Y,i as q}from"./chunks/isCompanyUser.js";import{c as W,g as z}from"./chunks/getCustomerCompany.js";import{D as J,S as V,c as X,g as Z}from"./chunks/createCompany.js";import{c as ee,d as ae,a as re,g as te,b as oe,u as ne}from"./chunks/updateCompanyTeam.js";import{c as me,g as ie,i as ce,a as pe,u as le}from"./chunks/updateCompanyUserStatus.js";import{d as Ce,g as fe}from"./chunks/getCompanyUsers.js";import{g as ye,u as Ee}from"./chunks/updateCompany.js";import{a as he,g as Re}from"./chunks/getCompanyCreditHistory.js";import{g as Ae,v as _e}from"./chunks/validateCompanyEmail.js";import{G as p,t as l}from"./chunks/isCompanyRoleNameAvailable.js";import{c as Se,d as be,a as xe,g as Ne,i as Oe,u as Ie}from"./chunks/isCompanyRoleNameAvailable.js";import{f as d}from"./chunks/company-permissions.js";import"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";import"./chunks/fetch-error.js";const C=`
 query CHECK_COMPANY_CREDIT_ENABLED {
   storeConfig{
     company_credit_enabled
   }
  }
`,_=async()=>{var e,a,n;try{const r=await m(C,{method:"GET",cache:"no-cache"});return(e=r.errors)!=null&&e.length?{creditEnabled:!1,error:"Unable to check company credit configuration"}:((n=(a=r.data)==null?void 0:a.storeConfig)==null?void 0:n.company_credit_enabled)===!0?{creditEnabled:!0}:{creditEnabled:!1,error:"Company credit is not enabled in store configuration"}}catch{return{creditEnabled:!1,error:"Company credit functionality not available"}}};var f=(e=>(e.ALLOCATION="ALLOCATION",e.UPDATE="UPDATE",e.PURCHASE="PURCHASE",e.REIMBURSEMENT="REIMBURSEMENT",e))(f||{});const u=`
  query GET_CUSTOMER_COMPANIES_WITH_ROLES {
    customer {
      companies(input: {}) {
        items {
          id
          name
        }
      }
      role {
        id
        name
      }
    }
  }
`,U=async()=>{var e,a,n;try{const r=await m(u,{method:"POST"});if((e=r.errors)!=null&&e.length)return!1;const t=(a=r.data)==null?void 0:a.customer;if(!t)return!1;const s=((n=t.companies)==null?void 0:n.items)??[];if(!Array.isArray(s)||s.length===0)return!1;const o=t.role;return o?o.id==="0"||typeof o.id=="number"&&o.id===0||o.name==="Company Administrator":!1}catch(r){return console.error("Error checking if customer is company admin:",r),!1}},S=async e=>{try{const a=await m(p,{variables:e,method:"GET",cache:"no-cache"});return l(a)}catch(a){return c(a)}},b=e=>d(e),x=(e,a)=>{const n=new Set(a),r=t=>{var o;const s=((o=t.children)==null?void 0:o.map(r).filter(i=>i!==null))||[];return n.has(t.id)||s.length>0?{...t,children:s}:null};return e.map(r).filter(t=>t!==null)};export{f as CompanyCreditOperationType,J as DEFAULT_COUNTRY,V as STORE_CONFIG_DEFAULTS,B as acceptCompanyInvitation,Y as allowCompanyRegistration,x as buildPermissionTree,_ as checkCompanyCreditEnabled,W as companyEnabled,I as config,X as createCompany,Se as createCompanyRole,ee as createCompanyTeam,me as createCompanyUser,be as deleteCompanyRole,ae as deleteCompanyTeam,Ce as deleteCompanyUser,m as fetchGraphQl,F as fetchUserPermissions,b as flattenPermissionIds,ye as getCompany,xe as getCompanyAclResources,he as getCompanyCredit,Re as getCompanyCreditHistory,S as getCompanyRole,Ne as getCompanyRoles,re as getCompanyStructure,te as getCompanyTeam,ie as getCompanyUser,fe as getCompanyUsers,L as getConfig,Ae as getCountries,z as getCustomerCompany,Z as getStoreConfig,P as initialize,U as isCompanyAdmin,Oe as isCompanyRoleNameAvailable,q as isCompanyUser,ce as isCompanyUserEmailAvailable,M as removeFetchGraphQlHeader,H as setEndpoint,D as setFetchGraphQlHeader,v as setFetchGraphQlHeaders,Ee as updateCompany,Ie as updateCompanyRole,oe as updateCompanyStructure,ne as updateCompanyTeam,pe as updateCompanyUser,le as updateCompanyUserStatus,_e as validateCompanyEmail};
//# sourceMappingURL=api.js.map
