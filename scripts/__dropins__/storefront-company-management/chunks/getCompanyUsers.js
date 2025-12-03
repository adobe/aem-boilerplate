/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as u}from"./fetch-error.js";import{f as l,h as m}from"./network-error.js";const g=`
  mutation DELETE_COMPANY_USER($id: ID!) {
    deleteCompanyUserV2(id: $id) {
      success
    }
  }
`,y=async o=>{var n,s;const{id:t}=o;if(!t)throw new Error("User ID is required to delete a company user");const a=await l(g,{method:"POST",cache:"no-cache",variables:{id:t}}).catch(m);return(n=a.errors)!=null&&n.length&&u(a.errors),(s=a.data)!=null&&s.deleteCompanyUserV2?{success:a.data.deleteCompanyUserV2.success}:{success:!1}},d=`
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
`,E=async(o={})=>{var s,c,p,i;const{pageSize:t=20,currentPage:a=1,filter:n}=o;try{const e=await l(d,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:a,filter:n}}).catch(m);return(s=e.errors)!=null&&s.length&&u(e.errors),(i=(p=(c=e.data)==null?void 0:c.company)==null?void 0:p.users)!=null&&i.items?{users:e.data.company.users.items.map(r=>({id:r.id,firstName:r.firstname,lastName:r.lastname,email:r.email,role:r.role.name,status:r.status,...r.team&&{team:r.team.name}})),pageInfo:{pageSize:e.data.company.users.page_info.page_size,currentPage:e.data.company.users.page_info.current_page,totalPages:e.data.company.users.page_info.total_pages},totalCount:e.data.company.users.total_count}:{users:[],pageInfo:{pageSize:t,currentPage:a,totalPages:1}}}catch{return{users:[],pageInfo:{pageSize:t,currentPage:a,totalPages:1}}}};export{y as d,E as g};
//# sourceMappingURL=getCompanyUsers.js.map
