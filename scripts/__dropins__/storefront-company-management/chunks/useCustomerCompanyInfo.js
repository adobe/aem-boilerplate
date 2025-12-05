/*! Copyright 2025 Adobe
All Rights Reserved. */
import{useState as a,useEffect as m}from"@dropins/tools/preact-hooks.js";import{g as u}from"./getCustomerCompany.js";import{u as f}from"./useCompanyContextListener.js";const i=()=>{const[s,o]=a(null),[r,t]=a(!0),n=async()=>{try{t(!0);const e=await u();o(e)}catch{o(null)}finally{t(!1)}};return m(()=>{n()},[]),f(n),{companyInfo:s,loading:r}};export{i as u};
//# sourceMappingURL=useCustomerCompanyInfo.js.map
