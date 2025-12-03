/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as c}from"./fetch-error.js";import{g as i,r as l,f as p,h as u,a as d}from"./network-error.js";const m=`
  mutation acceptCompanyInvitation($input: CompanyInvitationInput!) {
    acceptCompanyInvitation(input: $input) {
      success
    }
  }
`;async function I(e){const a=i().fetchGraphQlHeaders["X-Adobe-Company"];l("X-Adobe-Company");try{const s={code:e.code,user:{customer_id:btoa(e.user.customerId),company_id:btoa(e.user.companyId),job_title:e.user.jobTitle,telephone:e.user.telephone,status:e.user.status},role_id:e.roleId?btoa(e.roleId):null};return await p(m,{variables:{input:s}}).then(t=>{var r,n;if((r=t.errors)!=null&&r.length)return c(t.errors);const o=(n=t==null?void 0:t.data)==null?void 0:n.acceptCompanyInvitation;return o?{success:o.success}:null}).catch(u)}finally{a!=null&&d("X-Adobe-Company",a)}}export{I as a};
//# sourceMappingURL=acceptCompanyInvitation.js.map
