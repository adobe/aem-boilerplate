/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as l,h as i,a as m}from"./fetch-error.js";const d=`
  query GET_COMPANY_ENABLED {
    storeConfig {
      company_enabled
    }
  }
`,h=async()=>{var a,r,t;const n=await l(d,{method:"POST"});if((a=n==null?void 0:n.errors)!=null&&a.length)throw new Error(((r=n.errors[0])==null?void 0:r.message)||"Failed to load store configuration");const o=(t=n==null?void 0:n.data)==null?void 0:t.storeConfig;if(!o)throw new Error("Invalid response: missing storeConfig");return!!o.company_enabled},E=n=>{var t,e,c;const o=(t=n==null?void 0:n.data)==null?void 0:t.customer,a=(e=n==null?void 0:n.data)==null?void 0:e.company;if(!o||!a)return null;const r={companyName:(a==null?void 0:a.name)??"",jobTitle:(o==null?void 0:o.job_title)??"",workPhoneNumber:(o==null?void 0:o.telephone)??"",userRole:((c=o==null?void 0:o.role)==null?void 0:c.name)??""};return r.companyName?r:null},f=`
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
`;async function u(){var n;try{if(!await h())return null;const a=await l(f,{method:"GET",cache:"no-cache"});return(n=a.errors)!=null&&n.length?i(a.errors):E(a)}catch(o){return m(o)}}export{h as c,u as g};
//# sourceMappingURL=getCustomerCompany.js.map
