/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as a,h as n}from"./network-error.js";import{h as i}from"./fetch-error.js";const m=e=>{var r;return{id:e.id,text:e.text,sortOrder:e.sort_order,children:(r=e.children)==null?void 0:r.map(m)}},s=e=>({id:e.id,name:e.name,usersCount:e.users_count,permissions:e.permissions.map(m)}),l=e=>({currentPage:e.current_page,pageSize:e.page_size,totalPages:e.total_pages}),d=e=>({items:e.items.map(s),totalCount:e.total_count,pageInfo:l(e.page_info)}),p=e=>{var r,o,t;if((r=e.errors)!=null&&r.length)throw new Error(e.errors[0].message);if(!((t=(o=e.data)==null?void 0:o.company)!=null&&t.roles))throw new Error("Invalid response: missing company roles data");return d(e.data.company.roles)},P=e=>{var r,o,t;if((r=e.errors)!=null&&r.length)throw new Error(e.errors[0].message);if(!((t=(o=e.data)==null?void 0:o.company)!=null&&t.role))throw new Error("Invalid response: missing company role data");return s(e.data.company.role)},u=e=>{var r,o,t;if((r=e.errors)!=null&&r.length)throw new Error(e.errors[0].message);if(!((t=(o=e.data)==null?void 0:o.company)!=null&&t.acl_resources))throw new Error("Invalid response: missing ACL resources data");return e.data.company.acl_resources.map(m)},y=e=>{var r,o,t;if((r=e.errors)!=null&&r.length)throw new Error(e.errors[0].message);if(!((t=(o=e.data)==null?void 0:o.createCompanyRole)!=null&&t.role))throw new Error("Invalid response: missing created role data");return s(e.data.createCompanyRole.role)},C=e=>{var r,o,t;if((r=e.errors)!=null&&r.length)throw new Error(e.errors[0].message);if(!((t=(o=e.data)==null?void 0:o.updateCompanyRole)!=null&&t.role))throw new Error("Invalid response: missing updated role data");return s(e.data.updateCompanyRole.role)},R=e=>({name:e.name,permissions:e.permissions}),h=e=>({id:e.id,name:e.name,permissions:e.permissions}),c=`
  fragment CompanyRoleFragment on CompanyRole {
    id
    name
    users_count
    permissions {
      id
      text
      sort_order
      children {
        id
        text
        sort_order
        children {
          id
          text
          sort_order
          children {
            id
            text
            sort_order
            children {
              id
              text
              sort_order
            }
          }
        }
      }
    }
  }
`,_=`
  query GetCompanyRoles($pageSize: Int, $currentPage: Int) {
    company {
      roles(pageSize: $pageSize, currentPage: $currentPage) {
        items {
          ...CompanyRoleFragment
        }
        total_count
        page_info {
          current_page
          page_size
          total_pages
        }
      }
    }
  }
  ${c}
`,$=`
  query GetCompanyRole($id: ID!) {
    company {
      role(id: $id) {
        ...CompanyRoleFragment
      }
    }
  }
  ${c}
`,g=`
  query GetCompanyAclResources {
    company {
      acl_resources {
        id
        text
        sort_order
        children {
          id
          text
          sort_order
          children {
            id
            text
            sort_order
            children {
              id
              text
              sort_order
              children {
                id
                text
                sort_order
              }
            }
          }
        }
      }
    }
  }
`,E=`
  query IsCompanyRoleNameAvailable($name: String!) {
    isCompanyRoleNameAvailable(name: $name) {
      is_role_name_available
    }
  }
`,G=async(e={})=>{try{const r=await a(_,{variables:e,method:"GET",cache:"no-cache"});return p(r)}catch(r){return n(r)}},N=async()=>{try{const e=await a(g,{method:"GET",cache:"force-cache"});return u(e)}catch(e){return n(e)}},f=`
  mutation CreateCompanyRole($input: CompanyRoleCreateInput!) {
    createCompanyRole(input: $input) {
      role {
        ...CompanyRoleFragment
      }
    }
  }
  ${c}
`,w=`
  mutation UpdateCompanyRole($input: CompanyRoleUpdateInput!) {
    updateCompanyRole(input: $input) {
      role {
        ...CompanyRoleFragment
      }
    }
  }
  ${c}
`,A=`
  mutation DeleteCompanyRole($id: ID!) {
    deleteCompanyRole(id: $id) {
      success
    }
  }
`,v=async e=>{try{const r={input:R(e)},o=await a(f,{variables:r,method:"POST"});return y(o)}catch(r){return n(r)}},x=async e=>{try{const r={input:h(e)},o=await a(w,{variables:r,method:"POST"});return C(o)}catch(r){return n(r)}},T=async e=>{var r;try{const o=await a(A,{variables:e,method:"POST"});return(r=o.errors)!=null&&r.length?i(o.errors):o.data.deleteCompanyRole.success}catch(o){return n(o)}},L=async e=>{var r;try{const o=await a(E,{variables:e,method:"GET",cache:"no-cache"});return(r=o.errors)!=null&&r.length?i(o.errors):o.data.isCompanyRoleNameAvailable.is_role_name_available}catch(o){return n(o)}};export{$ as G,N as a,v as c,T as d,G as g,L as i,P as t,x as u};
//# sourceMappingURL=isCompanyRoleNameAvailable.js.map
