/*! Copyright 2025 Adobe
All Rights Reserved. */
import{v as c,f as m,h as l,c as y}from"./validateCompanyEmail.js";const h=async()=>{try{return await c("test@test.com"),{companyEnabled:!0}}catch{return{companyEnabled:!1,error:"Company functionality not available"}}},i=t=>{var r,e;const a=(r=t==null?void 0:t.data)==null?void 0:r.customer,n=(e=t==null?void 0:t.data)==null?void 0:e.company;if(!a||!n)return null;const o={companyName:(n==null?void 0:n.name)??"",jobTitle:(a==null?void 0:a.job_title)??"",workPhoneNumber:(a==null?void 0:a.telephone)??""};return o.companyName?o:null},u=`
  query GET_CUSTOMER_COMPANY_INFO {
    customer {
      id
      job_title
      telephone
    }
    company {
      id
      name
    }
  }
`,f=async()=>{var t;try{if(!(await h()).companyEnabled)return null;const n=await m(u,{method:"GET",cache:"no-cache"});return(t=n.errors)!=null&&t.length?l(n.errors):i(n)}catch(a){return console.error("Failed to fetch customer company info:",a),y(a)}};export{h as c,f as g};
//# sourceMappingURL=getCustomerCompany.js.map
