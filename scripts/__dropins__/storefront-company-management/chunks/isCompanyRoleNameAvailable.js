/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as a,h as n}from"./network-error.js";import{h as i}from"./fetch-error.js";const s=`
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
`,l=`
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
  ${s}
`,P=`
  query GetCompanyRole($id: ID!) {
    company {
      role(id: $id) {
        ...CompanyRoleFragment
      }
    }
  }
  ${s}
`,d=`
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
`,p=`
  query IsCompanyRoleNameAvailable($name: String!) {
    isCompanyRoleNameAvailable(name: $name) {
      is_role_name_available
    }
  }
`,m=e=>{var r;return{id:e.id,text:e.text,sortOrder:e.sort_order,children:(r=e.children)==null?void 0:r.map(m)}},c=e=>({id:e.id,name:e.name,usersCount:e.users_count,permissions:e.permissions.map(m)}),u=e=>({currentPage:e.current_page,pageSize:e.page_size,totalPages:e.total_pages}),y=e=>({items:e.items.map(c),totalCount:e.total_count,pageInfo:u(e.page_info)}),C=e=>{var r,o,t;if((r=e.errors)!=null&&r.length)throw new Error(e.errors[0].message);if(!((t=(o=e.data)==null?void 0:o.company)!=null&&t.roles))throw new Error("Invalid response: missing company roles data");return y(e.data.company.roles)},$=e=>{var r,o,t;if((r=e.errors)!=null&&r.length)throw new Error(e.errors[0].message);if(!((t=(o=e.data)==null?void 0:o.company)!=null&&t.role))throw new Error("Invalid response: missing company role data");return c(e.data.company.role)},R=e=>{var r,o,t;if((r=e.errors)!=null&&r.length)throw new Error(e.errors[0].message);if(!((t=(o=e.data)==null?void 0:o.company)!=null&&t.acl_resources))throw new Error("Invalid response: missing ACL resources data");return e.data.company.acl_resources.map(m)},h=e=>{var r,o,t;if((r=e.errors)!=null&&r.length)throw new Error(e.errors[0].message);if(!((t=(o=e.data)==null?void 0:o.createCompanyRole)!=null&&t.role))throw new Error("Invalid response: missing created role data");return c(e.data.createCompanyRole.role)},_=e=>{var r,o,t;if((r=e.errors)!=null&&r.length)throw new Error(e.errors[0].message);if(!((t=(o=e.data)==null?void 0:o.updateCompanyRole)!=null&&t.role))throw new Error("Invalid response: missing updated role data");return c(e.data.updateCompanyRole.role)},g=e=>({name:e.name,permissions:e.permissions}),E=e=>({id:e.id,name:e.name,permissions:e.permissions}),G=async(e={})=>{try{const r=await a(l,{variables:e,method:"GET",cache:"no-cache"});return C(r)}catch(r){return n(r)}},N=async()=>{try{const e=await a(d,{method:"GET",cache:"force-cache"});return R(e)}catch(e){return n(e)}},f=`
  mutation CreateCompanyRole($input: CompanyRoleCreateInput!) {
    createCompanyRole(input: $input) {
      role {
        ...CompanyRoleFragment
      }
    }
  }
  ${s}
`,w=`
  mutation UpdateCompanyRole($input: CompanyRoleUpdateInput!) {
    updateCompanyRole(input: $input) {
      role {
        ...CompanyRoleFragment
      }
    }
  }
  ${s}
`,A=`
  mutation DeleteCompanyRole($id: ID!) {
    deleteCompanyRole(id: $id) {
      success
    }
  }
`,v=async e=>{try{const r={input:g(e)},o=await a(f,{variables:r,method:"POST"});return h(o)}catch(r){return n(r)}},x=async e=>{try{const r={input:E(e)},o=await a(w,{variables:r,method:"POST"});return _(o)}catch(r){return n(r)}},T=async e=>{var r;try{const o=await a(A,{variables:e,method:"POST"});return(r=o.errors)!=null&&r.length?i(o.errors):o.data.deleteCompanyRole.success}catch(o){return n(o)}},L=async e=>{var r;try{const o=await a(p,{variables:e,method:"GET",cache:"no-cache"});return(r=o.errors)!=null&&r.length?i(o.errors):o.data.isCompanyRoleNameAvailable.is_role_name_available}catch(o){return n(o)}};export{P as G,N as a,v as c,T as d,G as g,L as i,$ as t,x as u};
//# sourceMappingURL=isCompanyRoleNameAvailable.js.map
