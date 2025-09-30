/*! Copyright 2025 Adobe
All Rights Reserved. */
import{v as l,f as m,h as y,c as i}from"./validateCompanyEmail.js";const h=async()=>{try{return await l("test@test.com"),{companyEnabled:!0}}catch{return{companyEnabled:!1,error:"Company functionality not available"}}},u=t=>{var r,e,c;const a=(r=t==null?void 0:t.data)==null?void 0:r.customer,n=(e=t==null?void 0:t.data)==null?void 0:e.company;if(!a||!n)return null;const o={companyName:(n==null?void 0:n.name)??"",jobTitle:(a==null?void 0:a.job_title)??"",workPhoneNumber:(a==null?void 0:a.telephone)??"",userRole:((c=a==null?void 0:a.role)==null?void 0:c.name)??""};return o.companyName?o:null},d=`
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
`,C=async()=>{var t;try{if(!(await h()).companyEnabled)return null;const n=await m(d,{method:"GET",cache:"no-cache"});return(t=n.errors)!=null&&t.length?y(n.errors):u(n)}catch(a){return console.error("Failed to fetch customer company info:",a),i(a)}};export{h as c,C as g};
//# sourceMappingURL=getCustomerCompany.js.map
