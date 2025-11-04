/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as i}from"./fetch-error.js";import{f as m,h as d}from"./network-error.js";const l=`
  query COMPANY_USERS($pageSize: Int!, $currentPage: Int!, $filter: CompanyUsersFilterInput) {
    company {
      users(pageSize: $pageSize, currentPage: $currentPage, filter: $filter) {
        items {
          id
          firstname
          lastname
          email
          role {
            name
          }
          status
          team {
            name
          }
        }
        page_info {
          page_size
          current_page
          total_pages
        }
        total_count
      }
    }
  }
`,h=async(p={})=>{var n,o,u,c;const{pageSize:s=20,currentPage:a=1,filter:r}=p;try{const e=await m(l,{method:"GET",cache:"no-cache",variables:{pageSize:s,currentPage:a,filter:r}}).catch(d);return(n=e.errors)!=null&&n.length&&i(e.errors),(c=(u=(o=e.data)==null?void 0:o.company)==null?void 0:u.users)!=null&&c.items?{users:e.data.company.users.items.map(t=>({id:t.id,firstName:t.firstname,lastName:t.lastname,email:t.email,role:t.role.name,status:t.status,...t.team&&{team:t.team.name}})),pageInfo:{pageSize:e.data.company.users.page_info.page_size,currentPage:e.data.company.users.page_info.current_page,totalPages:e.data.company.users.page_info.total_pages},totalCount:e.data.company.users.total_count}:{users:[],pageInfo:{pageSize:s,currentPage:a,totalPages:1}}}catch{return{users:[],pageInfo:{pageSize:s,currentPage:a,totalPages:1}}}},g=`
  mutation UPDATE_COMPANY_USER_STATUS($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) {
      user {
        id
        status
      }
    }
  }
`,U=async p=>{var n,o,u;const{id:s,status:a}=p;if(!s)throw new Error("User ID is required to update company user status");if(!a||a!=="ACTIVE"&&a!=="INACTIVE")throw new Error("Valid status (ACTIVE or INACTIVE) is required to update company user status");const r=await m(g,{method:"POST",cache:"no-cache",variables:{input:{id:s,status:a}}}).catch(d);return(n=r.errors)!=null&&n.length&&i(r.errors),(u=(o=r.data)==null?void 0:o.updateCompanyUser)!=null&&u.user?{success:!0,user:{id:r.data.updateCompanyUser.user.id,status:r.data.updateCompanyUser.user.status}}:{success:!1}};export{h as g,U as u};
//# sourceMappingURL=updateCompanyUserStatus.js.map
