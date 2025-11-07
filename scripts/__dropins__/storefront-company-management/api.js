/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as m,h as c}from"./chunks/network-error.js";import{g as I,r as P,s as G,a as L,b as M}from"./chunks/network-error.js";import{f as D}from"./chunks/fetchUserPermissions.js";import{a as w,i as F}from"./chunks/isCompanyUser.js";import{c as B,g as Q}from"./chunks/getCustomerCompany.js";import{D as q,S as K,c as W,g as z}from"./chunks/transform-store-config.js";import{c as J,d as V,a as X,g as Z,b as $,u as ee}from"./chunks/updateCompanyTeam.js";import{c as ae,d as te,g as oe,i as ne,u as se}from"./chunks/updateCompanyUser.js";import{g as ie,u as ce}from"./chunks/updateCompany.js";import{g as pe,u as de}from"./chunks/updateCompanyUserStatus.js";import{g as ue,v as fe}from"./chunks/validateCompanyEmail.js";import{a as Ee,g as ge}from"./chunks/getCompanyCreditHistory.js";import{G as l,t as p}from"./chunks/isCompanyRoleNameAvailable.js";import{c as Re,d as Te,a as Ae,g as _e,i as Ue,u as Se}from"./chunks/isCompanyRoleNameAvailable.js";import{f as d}from"./chunks/company-permissions.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";import"./chunks/fetch-error.js";const A=async e=>{try{const r=await m(l,{variables:e,method:"GET",cache:"no-cache"});return p(r)}catch(r){return c(r)}},_=e=>d(e),U=(e,r)=>{const n=new Set(r),a=t=>{var o;const s=((o=t.children)==null?void 0:o.map(a).filter(i=>i!==null))||[];return n.has(t.id)||s.length>0?{...t,children:s}:null};return e.map(a).filter(t=>t!==null)},S=async(e={})=>({success:!0,config:e}),C=`
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
`,b=async()=>{var e,r,n;try{const a=await m(C,{method:"POST"});if((e=a.errors)!=null&&e.length)return!1;const t=(r=a.data)==null?void 0:r.customer;if(!t)return!1;const s=((n=t.companies)==null?void 0:n.items)??[];if(!Array.isArray(s)||s.length===0)return!1;const o=t.role;return o?o.id==="0"||typeof o.id=="number"&&o.id===0||o.name==="Company Administrator":!1}catch(a){return console.error("Error checking if customer is company admin:",a),!1}};var u=(e=>(e.ALLOCATION="ALLOCATION",e.UPDATE="UPDATE",e.PURCHASE="PURCHASE",e.REIMBURSEMENT="REIMBURSEMENT",e))(u||{});const f=`
 query CHECK_COMPANY_CREDIT_ENABLED {
   storeConfig{
     company_credit_enabled
   }
  }
`,N=async()=>{var e,r,n;try{const a=await m(f,{method:"GET",cache:"no-cache"});return(e=a.errors)!=null&&e.length?{creditEnabled:!1,error:"Unable to check company credit configuration"}:((n=(r=a.data)==null?void 0:r.storeConfig)==null?void 0:n.company_credit_enabled)===!0?{creditEnabled:!0}:{creditEnabled:!1,error:"Company credit is not enabled in store configuration"}}catch{return{creditEnabled:!1,error:"Company credit functionality not available"}}};export{u as CompanyCreditOperationType,q as DEFAULT_COUNTRY,K as STORE_CONFIG_DEFAULTS,w as allowCompanyRegistration,U as buildPermissionTree,N as checkCompanyCreditEnabled,B as companyEnabled,W as createCompany,Re as createCompanyRole,J as createCompanyTeam,ae as createCompanyUser,Te as deleteCompanyRole,V as deleteCompanyTeam,te as deleteCompanyUser,m as fetchGraphQl,D as fetchUserPermissions,_ as flattenPermissionIds,ie as getCompany,Ae as getCompanyAclResources,Ee as getCompanyCredit,ge as getCompanyCreditHistory,A as getCompanyRole,_e as getCompanyRoles,X as getCompanyStructure,Z as getCompanyTeam,oe as getCompanyUser,pe as getCompanyUsers,I as getConfig,ue as getCountries,Q as getCustomerCompany,z as getStoreConfig,S as initialize,b as isCompanyAdmin,Ue as isCompanyRoleNameAvailable,F as isCompanyUser,ne as isCompanyUserEmailAvailable,P as removeFetchGraphQlHeader,G as setEndpoint,L as setFetchGraphQlHeader,M as setFetchGraphQlHeaders,ce as updateCompany,Se as updateCompanyRole,$ as updateCompanyStructure,ee as updateCompanyTeam,se as updateCompanyUser,de as updateCompanyUserStatus,fe as validateCompanyEmail};
//# sourceMappingURL=api.js.map
