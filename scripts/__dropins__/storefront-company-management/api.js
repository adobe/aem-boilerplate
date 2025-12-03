/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as m,h as c}from"./chunks/network-error.js";import{g as I,r as P,s as G,a as L,b as M}from"./chunks/network-error.js";import{f as D}from"./chunks/fetchUserPermissions.js";import{a as w}from"./chunks/acceptCompanyInvitation.js";import{a as k,i as B}from"./chunks/isCompanyUser.js";import{c as Y,g as q}from"./chunks/getCustomerCompany.js";import{D as W,S as z,c as j,g as J}from"./chunks/createCompany.js";import{c as X,d as Z,a as $,g as ee,b as ae,u as re}from"./chunks/updateCompanyTeam.js";import{c as oe,g as ne,i as se,a as me,u as ie}from"./chunks/updateCompanyUserStatus.js";import{d as pe,g as le}from"./chunks/getCompanyUsers.js";import{g as Ce,u as ue}from"./chunks/updateCompany.js";import{a as ye,g as Ee}from"./chunks/getCompanyCreditHistory.js";import{g as he,v as Re}from"./chunks/validateCompanyEmail.js";import{G as p,t as l}from"./chunks/isCompanyRoleNameAvailable.js";import{c as Ae,d as _e,a as Ue,g as Se,i as be,u as Ne}from"./chunks/isCompanyRoleNameAvailable.js";import{f as d}from"./chunks/company-permissions.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";import"./chunks/fetch-error.js";const A=async e=>{try{const a=await m(p,{variables:e,method:"GET",cache:"no-cache"});return l(a)}catch(a){return c(a)}},_=e=>d(e),U=(e,a)=>{const n=new Set(a),r=t=>{var o;const s=((o=t.children)==null?void 0:o.map(r).filter(i=>i!==null))||[];return n.has(t.id)||s.length>0?{...t,children:s}:null};return e.map(r).filter(t=>t!==null)},S=async(e={})=>({success:!0,config:e}),C=`
 query CHECK_COMPANY_CREDIT_ENABLED {
   storeConfig{
     company_credit_enabled
   }
  }
`,b=async()=>{var e,a,n;try{const r=await m(C,{method:"GET",cache:"no-cache"});return(e=r.errors)!=null&&e.length?{creditEnabled:!1,error:"Unable to check company credit configuration"}:((n=(a=r.data)==null?void 0:a.storeConfig)==null?void 0:n.company_credit_enabled)===!0?{creditEnabled:!0}:{creditEnabled:!1,error:"Company credit is not enabled in store configuration"}}catch{return{creditEnabled:!1,error:"Company credit functionality not available"}}};var u=(e=>(e.ALLOCATION="ALLOCATION",e.UPDATE="UPDATE",e.PURCHASE="PURCHASE",e.REIMBURSEMENT="REIMBURSEMENT",e))(u||{});const f=`
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
`,N=async()=>{var e,a,n;try{const r=await m(f,{method:"POST"});if((e=r.errors)!=null&&e.length)return!1;const t=(a=r.data)==null?void 0:a.customer;if(!t)return!1;const s=((n=t.companies)==null?void 0:n.items)??[];if(!Array.isArray(s)||s.length===0)return!1;const o=t.role;return o?o.id==="0"||typeof o.id=="number"&&o.id===0||o.name==="Company Administrator":!1}catch(r){return console.error("Error checking if customer is company admin:",r),!1}};export{u as CompanyCreditOperationType,W as DEFAULT_COUNTRY,z as STORE_CONFIG_DEFAULTS,w as acceptCompanyInvitation,k as allowCompanyRegistration,U as buildPermissionTree,b as checkCompanyCreditEnabled,Y as companyEnabled,j as createCompany,Ae as createCompanyRole,X as createCompanyTeam,oe as createCompanyUser,_e as deleteCompanyRole,Z as deleteCompanyTeam,pe as deleteCompanyUser,m as fetchGraphQl,D as fetchUserPermissions,_ as flattenPermissionIds,Ce as getCompany,Ue as getCompanyAclResources,ye as getCompanyCredit,Ee as getCompanyCreditHistory,A as getCompanyRole,Se as getCompanyRoles,$ as getCompanyStructure,ee as getCompanyTeam,ne as getCompanyUser,le as getCompanyUsers,I as getConfig,he as getCountries,q as getCustomerCompany,J as getStoreConfig,S as initialize,N as isCompanyAdmin,be as isCompanyRoleNameAvailable,B as isCompanyUser,se as isCompanyUserEmailAvailable,P as removeFetchGraphQlHeader,G as setEndpoint,L as setFetchGraphQlHeader,M as setFetchGraphQlHeaders,ue as updateCompany,Ne as updateCompanyRole,ae as updateCompanyStructure,re as updateCompanyTeam,me as updateCompanyUser,ie as updateCompanyUserStatus,Re as validateCompanyEmail};
//# sourceMappingURL=api.js.map
