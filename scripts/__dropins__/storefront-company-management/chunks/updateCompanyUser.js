/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as s,h as l,a as m}from"./fetch-error.js";import{i as u}from"./company-permissions.js";const d=e=>{try{return btoa(e)}catch(r){throw new Error(`Failed to encode base64: ${r}`)}},y=e=>{try{return atob(e)}catch{return e}},c=e=>{if(!e||typeof e!="string")throw new Error("User ID must be a non-empty string");return d(e)},A=e=>!e||typeof e!="string"?e:y(e),p=`
  mutation createCompanyUser($input: CompanyUserCreateInput!) {
    createCompanyUser(input: $input) { __typename user { id structure_id email firstname lastname } }
  }
`;async function I(e){const r={email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status,target_id:e.targetId};return await s(p,{variables:{input:r}}).then(t=>{var n,i,o;if((n=t.errors)!=null&&n.length)return l(t.errors);const a=(o=(i=t==null?void 0:t.data)==null?void 0:i.createCompanyUser)==null?void 0:o.user;return a?{id:a.id,structureId:a.structure_id}:null}).catch(m)}const h=`
  mutation DELETE_COMPANY_USER($id: ID!) {
    deleteCompanyUserV2(id: $id) {
      success
    }
  }
`,g=async e=>{var n,i;const{id:r}=e;if(!r)throw new Error("User ID is required to delete a company user");const t=c(r),a=await s(h,{method:"POST",cache:"no-cache",variables:{id:t}}).catch(m);return(n=a.errors)!=null&&n.length&&l(a.errors),(i=a.data)!=null&&i.deleteCompanyUserV2?{success:a.data.deleteCompanyUserV2.success}:{success:!1}},f=e=>{if(!e)throw new Error("Invalid response: missing user data");return{id:e.id,email:e.email,firstName:e.firstname,lastName:e.lastname,jobTitle:e.job_title,telephone:e.telephone,status:e.status,role:e.role,isCompanyAdmin:u(e.role)}},_=`
  query getCompanyUser($id: ID!) {
    company {
      user(id: $id) {
        id
        email
        firstname
        lastname
        job_title
        telephone
        status
        role { id name }
      }
    }
  }
`;async function w(e){const r=c(e);return await s(_,{variables:{id:r}}).then(t=>{var n,i,o;if((n=t.errors)!=null&&n.length)return l(t.errors);const a=(o=(i=t==null?void 0:t.data)==null?void 0:i.company)==null?void 0:o.user;return a?f(a):null}).catch(m)}const C=`
  query isCompanyUserEmailAvailable($email: String!) {
    isCompanyUserEmailAvailable(email: $email) { is_email_available }
  }
`;async function N(e){return await s(C,{variables:{email:e}}).then(r=>{var t,a,n;return(t=r.errors)!=null&&t.length?l(r.errors):((n=(a=r==null?void 0:r.data)==null?void 0:a.isCompanyUserEmailAvailable)==null?void 0:n.is_email_available)??null}).catch(m)}const U=`
  mutation updateCompanyUser($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) { __typename user { id } }
  }
`;async function v(e){const r={id:c(e.id),email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status};return await s(U,{variables:{input:r}}).then(t=>{var a,n,i,o;return(a=t.errors)!=null&&a.length?l(t.errors):!!((o=(i=(n=t==null?void 0:t.data)==null?void 0:n.updateCompanyUser)==null?void 0:i.user)!=null&&o.id)}).catch(m)}export{g as a,I as c,A as d,c as e,w as g,N as i,v as u};
//# sourceMappingURL=updateCompanyUser.js.map
