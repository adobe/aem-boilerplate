/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as i}from"./chunks/fetch-graphql.js";import{g,r as E,s as h,a as S,b as T}from"./chunks/fetch-graphql.js";import{f as O,g as A,u as R}from"./chunks/updateCompany.js";import{g as G,v as U}from"./chunks/validateCompanyEmail.js";import{D as H,S as I,c as L,g as M}from"./chunks/createCompany.js";import{c as P,g as Q}from"./chunks/getCustomerCompany.js";import{a as v,i as D}from"./chunks/isCompanyUser.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/fetch-error.js";import"@dropins/tools/event-bus.js";const u=async(r={})=>({success:!0,config:r}),m=`
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
`,C=async()=>{var r,o,t;try{const a=await i(m,{method:"POST"});if((r=a.errors)!=null&&r.length)return!1;const s=(o=a.data)==null?void 0:o.customer;if(!s)return!1;const n=((t=s.companies)==null?void 0:t.items)??[];if(!Array.isArray(n)||n.length===0)return!1;const e=s.role;return e?e.id==="0"||typeof e.id=="number"&&e.id===0||e.name==="Company Administrator":!1}catch(a){return console.error("Error checking if customer is company admin:",a),!1}};export{H as DEFAULT_COUNTRY,I as STORE_CONFIG_DEFAULTS,v as allowCompanyRegistration,P as companyEnabled,L as createCompany,i as fetchGraphQl,O as fetchUserPermissions,A as getCompany,g as getConfig,G as getCountries,Q as getCustomerCompany,M as getStoreConfig,u as initialize,C as isCompanyAdmin,D as isCompanyUser,E as removeFetchGraphQlHeader,h as setEndpoint,S as setFetchGraphQlHeader,T as setFetchGraphQlHeaders,R as updateCompany,U as validateCompanyEmail};
//# sourceMappingURL=api.js.map
