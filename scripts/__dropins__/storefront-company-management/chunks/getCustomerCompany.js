/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as i,h as l}from"./network-error.js";import{h as m}from"./fetch-error.js";const d=`
  query GET_COMPANY_ENABLED {
    storeConfig {
      company_enabled
    }
  }
`,h=async()=>{var a,r,t;const o=await i(d,{method:"POST"});if((a=o==null?void 0:o.errors)!=null&&a.length)throw new Error(((r=o.errors[0])==null?void 0:r.message)||"Failed to load store configuration");const n=(t=o==null?void 0:o.data)==null?void 0:t.storeConfig;if(!n)throw new Error("Invalid response: missing storeConfig");return!!n.company_enabled},E=o=>{var t,e,c;const n=(t=o==null?void 0:o.data)==null?void 0:t.customer,a=(e=o==null?void 0:o.data)==null?void 0:e.company;if(!n||!a)return null;const r={companyName:(a==null?void 0:a.name)??"",jobTitle:(n==null?void 0:n.job_title)??"",workPhoneNumber:(n==null?void 0:n.telephone)??"",userRole:((c=n==null?void 0:n.role)==null?void 0:c.name)??""};return r.companyName?r:null},f=`
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
`;async function C(){var o;try{if(!await h())return null;const a=await i(f,{method:"GET",cache:"no-cache"});return(o=a.errors)!=null&&o.length?m(a.errors):E(a)}catch(n){return l(n)}}export{h as c,C as g};
//# sourceMappingURL=getCustomerCompany.js.map
