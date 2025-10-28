/*! Copyright 2025 Adobe
All Rights Reserved. */
import{d as l,e as g}from"./updateCompanyUser.js";import{f as i,a as d,h as m}from"./fetch-error.js";const f=`
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
`,I=async(p={})=>{var t,n,o,u;const{pageSize:r=20,currentPage:a=1,filter:c}=p;try{const e=await i(f,{method:"GET",cache:"no-cache",variables:{pageSize:r,currentPage:a,filter:c}}).catch(d);return(t=e.errors)!=null&&t.length&&m(e.errors),(u=(o=(n=e.data)==null?void 0:n.company)==null?void 0:o.users)!=null&&u.items?{users:e.data.company.users.items.map(s=>({id:l(s.id),firstName:s.firstname,lastName:s.lastname,email:s.email,role:s.role.name,status:s.status,...s.team&&{team:s.team.name}})),pageInfo:{pageSize:e.data.company.users.page_info.page_size,currentPage:e.data.company.users.page_info.current_page,totalPages:e.data.company.users.page_info.total_pages},totalCount:e.data.company.users.total_count}:{users:[],pageInfo:{pageSize:r,currentPage:a,totalPages:1}}}catch{return{users:[],pageInfo:{pageSize:r,currentPage:a,totalPages:1}}}},U=`
  mutation UPDATE_COMPANY_USER_STATUS($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) {
      user {
        id
        status
      }
    }
  }
`,C=async p=>{var n,o,u;const{id:r,status:a}=p;if(!r)throw new Error("User ID is required to update company user status");if(!a||a!=="ACTIVE"&&a!=="INACTIVE")throw new Error("Valid status (ACTIVE or INACTIVE) is required to update company user status");const c=g(r),t=await i(U,{method:"POST",cache:"no-cache",variables:{input:{id:c,status:a}}}).catch(d);return(n=t.errors)!=null&&n.length&&m(t.errors),(u=(o=t.data)==null?void 0:o.updateCompanyUser)!=null&&u.user?{success:!0,user:{id:t.data.updateCompanyUser.user.id,status:t.data.updateCompanyUser.user.status}}:{success:!1}};export{I as g,C as u};
//# sourceMappingURL=updateCompanyUserStatus.js.map
