/*! Copyright 2025 Adobe
All Rights Reserved. */
import{useState as a,useEffect as m}from"@dropins/tools/preact-hooks.js";import{u}from"./useCompanyContextListener.js";import{g as f}from"./getCustomerCompany.js";const i=()=>{const[s,o]=a(null),[r,t]=a(!0),n=async()=>{try{t(!0);const e=await f();o(e)}catch{o(null)}finally{t(!1)}};return m(()=>{n()},[]),u(n),{companyInfo:s,loading:r}};export{i as u};
//# sourceMappingURL=useCustomerCompanyInfo.js.map
