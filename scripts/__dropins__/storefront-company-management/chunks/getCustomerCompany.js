/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as i,a as m}from"./fetch-error.js";import{f as l}from"./fetch-graphql.js";const d=o=>{var t,e,c;const n=(t=o==null?void 0:o.data)==null?void 0:t.customer,r=(e=o==null?void 0:o.data)==null?void 0:e.company;if(!n||!r)return null;const a={companyName:(r==null?void 0:r.name)??"",jobTitle:(n==null?void 0:n.job_title)??"",workPhoneNumber:(n==null?void 0:n.telephone)??"",userRole:((c=n==null?void 0:n.role)==null?void 0:c.name)??""};return a.companyName?a:null},h=`
  query GET_COMPANY_ENABLED {
    storeConfig {
      company_enabled
    }
  }
`,f=async()=>{var r,a,t;const o=await l(h,{method:"POST"});if((r=o==null?void 0:o.errors)!=null&&r.length)throw new Error(((a=o.errors[0])==null?void 0:a.message)||"Failed to load store configuration");const n=(t=o==null?void 0:o.data)==null?void 0:t.storeConfig;if(!n)throw new Error("Invalid response: missing storeConfig");return!!n.company_enabled},E=`
  query GET_CUSTOMER_COMPANY_INFO {
    customer {
      id
      job_title
      telephone
      role {
        id
        name
      }
    }
    company {
      id
      name
    }
  }
`,u=async()=>{var o;try{if(!await f())return null;const r=await l(E,{method:"GET",cache:"no-cache"});return(o=r.errors)!=null&&o.length?i(r.errors):d(r)}catch(n){return console.error("Failed to fetch customer company info:",n),m(n)}};export{f as c,u as g};
//# sourceMappingURL=getCustomerCompany.js.map
