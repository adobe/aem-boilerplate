/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as m,a as i}from"./chunks/fetch-error.js";import{g as x,r as O,s as G,b,c as I}from"./chunks/fetch-error.js";import{f as P}from"./chunks/fetchUserPermissions.js";import{a as v,i as w}from"./chunks/isCompanyUser.js";import{c as L,g as M}from"./chunks/getCustomerCompany.js";import{D,S as k,c as W,g as Y}from"./chunks/transform-store-config.js";import{c as z,d as j,g as B,a as J,u as K,b as V}from"./chunks/updateCompanyTeam.js";import{c as Z,a as $,g as ee,i as ae,u as re}from"./chunks/updateCompanyUser.js";import{g as oe,u as se}from"./chunks/updateCompany.js";import{g as me,u as pe}from"./chunks/updateCompanyUserStatus.js";import{g as ce,v as le}from"./chunks/validateCompanyEmail.js";import{G as c,t as l}from"./chunks/isCompanyRoleNameAvailable.js";import{c as ye,d as Ce,a as fe,g as de,i as ge,u as he}from"./chunks/isCompanyRoleNameAvailable.js";import{a as u}from"./chunks/company-permissions.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";const E=async e=>{try{const r=await m(c,{variables:e,method:"GET",cache:"no-cache"});return l(r)}catch(r){return i(r)}},T=e=>u(e),R=(e,r)=>{const n=new Set(r),o=a=>{var t;const s=((t=a.children)==null?void 0:t.map(o).filter(p=>p!==null))||[];return n.has(a.id)||s.length>0?{...a,children:s}:null};return e.map(o).filter(a=>a!==null)},S=async(e={})=>({success:!0,config:e}),y=`
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
`,U=async()=>{var e,r,n;try{const o=await m(y,{method:"POST"});if((e=o.errors)!=null&&e.length)return!1;const a=(r=o.data)==null?void 0:r.customer;if(!a)return!1;const s=((n=a.companies)==null?void 0:n.items)??[];if(!Array.isArray(s)||s.length===0)return!1;const t=a.role;return t?t.id==="0"||typeof t.id=="number"&&t.id===0||t.name==="Company Administrator":!1}catch(o){return console.error("Error checking if customer is company admin:",o),!1}};export{D as DEFAULT_COUNTRY,k as STORE_CONFIG_DEFAULTS,v as allowCompanyRegistration,R as buildPermissionTree,L as companyEnabled,W as createCompany,ye as createCompanyRole,z as createCompanyTeam,Z as createCompanyUser,Ce as deleteCompanyRole,j as deleteCompanyTeam,$ as deleteCompanyUser,m as fetchGraphQl,P as fetchUserPermissions,T as flattenPermissionIds,oe as getCompany,fe as getCompanyAclResources,E as getCompanyRole,de as getCompanyRoles,B as getCompanyStructure,J as getCompanyTeam,ee as getCompanyUser,me as getCompanyUsers,x as getConfig,ce as getCountries,M as getCustomerCompany,Y as getStoreConfig,S as initialize,U as isCompanyAdmin,ge as isCompanyRoleNameAvailable,w as isCompanyUser,ae as isCompanyUserEmailAvailable,O as removeFetchGraphQlHeader,G as setEndpoint,b as setFetchGraphQlHeader,I as setFetchGraphQlHeaders,se as updateCompany,he as updateCompanyRole,K as updateCompanyStructure,V as updateCompanyTeam,re as updateCompanyUser,pe as updateCompanyUserStatus,le as validateCompanyEmail};
//# sourceMappingURL=api.js.map
