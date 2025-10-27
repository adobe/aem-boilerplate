/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as m}from"./chunks/fetch-graphql.js";import{g as x,r as I,s as N,a as P,b as U}from"./chunks/fetch-graphql.js";import{f as b}from"./chunks/fetchUserPermissions.js";import{g as H,u as L}from"./chunks/updateCompany.js";import{g as v,v as Q}from"./chunks/validateCompanyEmail.js";import{D as k,S as W,c as Y,g as q}from"./chunks/createCompany.js";import{c as j,g as B}from"./chunks/getCustomerCompany.js";import{a as K,i as V}from"./chunks/isCompanyUser.js";import{G as c,t as l}from"./chunks/isCompanyRoleNameAvailable.js";import{c as Z,d as $,a as ee,g as re,i as ae,u as te}from"./chunks/isCompanyRoleNameAvailable.js";import{a as p}from"./chunks/fetch-error.js";import{a as f}from"./chunks/company-permissions.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";const R=async e=>{try{const a=await m(c,{variables:e,method:"GET",cache:"no-cache"});return l(a)}catch(a){return p(a)}},T=e=>f(e),S=(e,a)=>{const n=new Set(a),o=r=>{var t;const s=((t=r.children)==null?void 0:t.map(o).filter(i=>i!==null))||[];return n.has(r.id)||s.length>0?{...r,children:s}:null};return e.map(o).filter(r=>r!==null)},_=async(e={})=>({success:!0,config:e}),u=`
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
`,A=async()=>{var e,a,n;try{const o=await m(u,{method:"POST"});if((e=o.errors)!=null&&e.length)return!1;const r=(a=o.data)==null?void 0:a.customer;if(!r)return!1;const s=((n=r.companies)==null?void 0:n.items)??[];if(!Array.isArray(s)||s.length===0)return!1;const t=r.role;return t?t.id==="0"||typeof t.id=="number"&&t.id===0||t.name==="Company Administrator":!1}catch(o){return console.error("Error checking if customer is company admin:",o),!1}};export{k as DEFAULT_COUNTRY,W as STORE_CONFIG_DEFAULTS,K as allowCompanyRegistration,S as buildPermissionTree,j as companyEnabled,Y as createCompany,Z as createCompanyRole,$ as deleteCompanyRole,m as fetchGraphQl,b as fetchUserPermissions,T as flattenPermissionIds,H as getCompany,ee as getCompanyAclResources,R as getCompanyRole,re as getCompanyRoles,x as getConfig,v as getCountries,B as getCustomerCompany,q as getStoreConfig,_ as initialize,A as isCompanyAdmin,ae as isCompanyRoleNameAvailable,V as isCompanyUser,I as removeFetchGraphQlHeader,N as setEndpoint,P as setFetchGraphQlHeader,U as setFetchGraphQlHeaders,L as updateCompany,te as updateCompanyRole,Q as validateCompanyEmail};
//# sourceMappingURL=api.js.map
