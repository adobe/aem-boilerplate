/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as i}from"./chunks/fetch-graphql.js";import{g as y,r as h,s as _,a as T,b as O}from"./chunks/fetch-graphql.js";import{f as S,g as G,u as N}from"./chunks/updateCompany.js";import{g as w,v as F}from"./chunks/getCountries.js";import{D as U,S as x,c as I,g as L}from"./chunks/getStoreConfig.js";import{a as b,i as D}from"./chunks/isCompanyUser.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";const d=async(e={})=>({success:!0,config:e}),m=`
  query GET_COMPANY_ENABLED {
    storeConfig {
      company_enabled
    }
  }
`,u=async()=>{var t,r,o;const e=await i(m,{method:"POST"});if((t=e==null?void 0:e.errors)!=null&&t.length)throw new Error(((r=e.errors[0])==null?void 0:r.message)||"Failed to load store configuration");const a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig;if(!a)throw new Error("Invalid response: missing storeConfig");return!!a.company_enabled},c=`
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
`,E=async()=>{var e,a,t;try{const r=await i(c,{method:"POST"});if((e=r.errors)!=null&&e.length)return!1;const o=(a=r.data)==null?void 0:a.customer;if(!o)return!1;const n=((t=o.companies)==null?void 0:t.items)??[];if(!Array.isArray(n)||n.length===0)return!1;const s=o.role;return s?s.id==="0"||typeof s.id=="number"&&s.id===0||s.name==="Company Administrator":!1}catch(r){return console.error("Error checking if customer is company admin:",r),!1}};export{U as DEFAULT_COUNTRY,x as STORE_CONFIG_DEFAULTS,b as allowCompanyRegistration,u as companyEnabled,I as createCompany,i as fetchGraphQl,S as fetchUserPermissions,G as getCompany,y as getConfig,w as getCountries,L as getStoreConfig,d as initialize,E as isCompanyAdmin,D as isCompanyUser,h as removeFetchGraphQlHeader,_ as setEndpoint,T as setFetchGraphQlHeader,O as setFetchGraphQlHeaders,N as updateCompany,F as validateCompanyEmail};
//# sourceMappingURL=api.js.map
