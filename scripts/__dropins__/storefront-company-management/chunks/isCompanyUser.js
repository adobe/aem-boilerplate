/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as s}from"./fetch-error.js";const i=`
  query GET_ALLOW_COMPANY_REGISTRATION {
    storeConfig {
      allow_company_registration
    }
  }
`,l=async()=>{var a,n,o;const r=await s(i,{method:"POST"});if((a=r==null?void 0:r.errors)!=null&&a.length)throw new Error(((n=r.errors[0])==null?void 0:n.message)||"Failed to load store configuration");const t=(o=r==null?void 0:r.data)==null?void 0:o.storeConfig;if(!t)throw new Error("Invalid response: missing storeConfig");return!!t.allow_company_registration},c=`
  query GET_CUSTOMER_COMPANIES {
    customer {
      companies(input: {}) {
        items {
          id
          name
        }
      }
    }
  }
`,_=async()=>{var r,t,a,n;try{const o=await s(c,{method:"POST"});if((r=o.errors)!=null&&r.length)return!1;const e=((n=(a=(t=o==null?void 0:o.data)==null?void 0:t.customer)==null?void 0:a.companies)==null?void 0:n.items)??[];return Array.isArray(e)&&e.length>0}catch{return!1}};export{l as a,_ as i};
//# sourceMappingURL=isCompanyUser.js.map
