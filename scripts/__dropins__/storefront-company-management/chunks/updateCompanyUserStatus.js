/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as o}from"./fetch-error.js";import{f as u,h as l}from"./network-error.js";import{i as m}from"./company-permissions.js";const d=a=>{if(!a)throw new Error("Invalid response: missing user data");return{id:a.id,email:a.email,firstName:a.firstname,lastName:a.lastname,jobTitle:a.job_title,telephone:a.telephone,status:a.status,role:a.role,isCompanyAdmin:m(a.role)}},c=`
  mutation createCompanyUser($input: CompanyUserCreateInput!) {
    createCompanyUser(input: $input) { __typename user { id structure_id email firstname lastname job_title } }
  }
`;async function A(a){const r={email:a.email,firstname:a.firstName,lastname:a.lastName,job_title:a.jobTitle,telephone:a.telephone,role_id:a.roleId,status:a.status,target_id:a.targetId};return await u(c,{variables:{input:r}}).then(t=>{var n,i,s;if((n=t.errors)!=null&&n.length)return o(t.errors);const e=(s=(i=t==null?void 0:t.data)==null?void 0:i.createCompanyUser)==null?void 0:s.user;return e?{id:e.id,structureId:e.structure_id,jobTitle:e.job_title}:null}).catch(l)}const p=`
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
`;async function E(a){return await u(p,{variables:{id:a}}).then(r=>{var e,n,i;if((e=r.errors)!=null&&e.length)return o(r.errors);const t=(i=(n=r==null?void 0:r.data)==null?void 0:n.company)==null?void 0:i.user;return t?d(t):null}).catch(l)}const y=`
  query isCompanyUserEmailAvailable($email: String!) {
    isCompanyUserEmailAvailable(email: $email) { is_email_available }
  }
`;async function I(a){return await u(y,{variables:{email:a}}).then(r=>{var t,e,n;return(t=r.errors)!=null&&t.length?o(r.errors):((n=(e=r==null?void 0:r.data)==null?void 0:e.isCompanyUserEmailAvailable)==null?void 0:n.is_email_available)??null}).catch(l)}const U=`
  mutation updateCompanyUser($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) { __typename user { id } }
  }
`;async function b(a){const r={id:a.id,email:a.email,firstname:a.firstName,lastname:a.lastName,job_title:a.jobTitle,telephone:a.telephone,role_id:a.roleId,status:a.status};return await u(U,{variables:{input:r}}).then(t=>{var e,n,i,s;return(e=t.errors)!=null&&e.length?o(t.errors):!!((s=(i=(n=t==null?void 0:t.data)==null?void 0:n.updateCompanyUser)==null?void 0:i.user)!=null&&s.id)}).catch(l)}const C=`
  mutation UPDATE_COMPANY_USER_STATUS($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) {
      user {
        id
        status
      }
    }
  }
`,T=async a=>{var n,i,s;const{id:r,status:t}=a;if(!r)throw new Error("User ID is required to update company user status");if(!t||t!=="ACTIVE"&&t!=="INACTIVE")throw new Error("Valid status (ACTIVE or INACTIVE) is required to update company user status");const e=await u(C,{method:"POST",cache:"no-cache",variables:{input:{id:r,status:t}}}).catch(l);return(n=e.errors)!=null&&n.length&&o(e.errors),(s=(i=e.data)==null?void 0:i.updateCompanyUser)!=null&&s.user?{success:!0,user:{id:e.data.updateCompanyUser.user.id,status:e.data.updateCompanyUser.user.status}}:{success:!1}};export{b as a,A as c,E as g,I as i,T as u};
//# sourceMappingURL=updateCompanyUserStatus.js.map
