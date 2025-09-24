/*! Copyright 2025 Adobe
All Rights Reserved. */
import{i as c,d as o,h as m,e as u}from"./fetchUserPermissions.js";const l=t=>{if(!t)throw new Error("Invalid response: missing user data");return{id:t.id,email:t.email,firstName:t.firstname,lastName:t.lastname,jobTitle:t.job_title,telephone:t.telephone,status:t.status,role:t.role,isCompanyAdmin:c(t.role)}},p=t=>{if(!t)throw new Error("Invalid response: missing team data");return{id:t.id,name:t.name,description:t.description}},s=t=>{if(!Array.isArray(t))throw new Error("Invalid response: expected array of roles");return t.map(n=>{if(!n||typeof n.id!="string"||typeof n.name!="string")throw new Error("Invalid response: missing required role data");return{id:n.id,name:n.name}})};function y(t){return t.items.map(e=>({structureId:e.entity.structure_id,parentStructureId:e.parent_id||null,label:e.entity.__typename==="CompanyTeam"?e.entity.name||"":`${e.entity.firstname||""} ${e.entity.lastname||""}`.trim(),type:e.entity.__typename==="CompanyTeam"?"team":"user",entityId:e.entity.id,description:e.entity.__typename==="CompanyTeam"&&e.entity.description||null})).map(e=>{const r=e.parentStructureId||null,i=!r||r==="MA=="?null:r;return{id:e.structureId,parentId:i,label:e.label,type:e.type,entityId:e.entityId,description:e.description}})}const C=`
  query getCompanyStructure {
    company {
      structure {
        items {
          id
          parent_id
          entity {
            __typename
            ... on CompanyTeam { id structure_id name description }
            ... on Customer { id structure_id firstname lastname }
          }
        }
      }
    }
  }
`;async function v(){return await o(C,{method:"GET",cache:"no-cache"}).then(t=>{var a;if((a=t.errors)!=null&&a.length)return m(t.errors);const n=t.data.company.structure;return y(n)}).catch(u)}const _=`
  mutation updateCompanyStructure($treeId: ID!, $parentTreeId: ID!) {
    updateCompanyStructure(input: { tree_id: $treeId, parent_tree_id: $parentTreeId }) {
      __typename
    }
  }
`;async function N(t){const n={treeId:t.id,parentTreeId:t.parentId};return await o(_,{variables:n}).then(a=>{var e,r;return(e=a.errors)!=null&&e.length?m(a.errors):!!((r=a==null?void 0:a.data)!=null&&r.updateCompanyStructure)}).catch(u)}const f=`
  mutation createCompanyTeam($input: CompanyTeamCreateInput!) {
    createCompanyTeam(input: $input) { __typename team { id structure_id name } }
  }
`;async function S(t){const n={name:t.name,description:t.description,target_id:t.targetId};return await o(f,{variables:{input:n}}).then(a=>{var r,i,d;if((r=a.errors)!=null&&r.length)return m(a.errors);const e=(d=(i=a==null?void 0:a.data)==null?void 0:i.createCompanyTeam)==null?void 0:d.team;return e?{id:e.id,structureId:e.structure_id,name:e.name}:null}).catch(u)}const h=`
  mutation updateCompanyTeam($input: CompanyTeamUpdateInput!) {
    updateCompanyTeam(input: $input) { __typename team { id name } }
  }
`;async function M(t){const n={id:t.id,name:t.name,description:t.description};return await o(h,{variables:{input:n}}).then(a=>{var e,r,i,d;return(e=a.errors)!=null&&e.length?m(a.errors):!!((d=(i=(r=a==null?void 0:a.data)==null?void 0:r.updateCompanyTeam)==null?void 0:i.team)!=null&&d.id)}).catch(u)}const T=`
  mutation createCompanyUser($input: CompanyUserCreateInput!) {
    createCompanyUser(input: $input) { __typename user { id structure_id email firstname lastname } }
  }
`;async function R(t){const n={email:t.email,firstname:t.firstName,lastname:t.lastName,job_title:t.jobTitle,telephone:t.telephone,role_id:t.roleId,status:t.status,target_id:t.targetId};return await o(T,{variables:{input:n}}).then(a=>{var r,i,d;if((r=a.errors)!=null&&r.length)return m(a.errors);const e=(d=(i=a==null?void 0:a.data)==null?void 0:i.createCompanyUser)==null?void 0:d.user;return e?{id:e.id,structureId:e.structure_id}:null}).catch(u)}const E=`
  mutation updateCompanyUser($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) { __typename user { id } }
  }
`;async function P(t){const n={id:t.id,email:t.email,firstname:t.firstName,lastname:t.lastName,job_title:t.jobTitle,telephone:t.telephone,role_id:t.roleId,status:t.status};return await o(E,{variables:{input:n}}).then(a=>{var e,r,i,d;return(e=a.errors)!=null&&e.length?m(a.errors):!!((d=(i=(r=a==null?void 0:a.data)==null?void 0:r.updateCompanyUser)==null?void 0:i.user)!=null&&d.id)}).catch(u)}const I=`
  mutation deleteCompanyTeam($id: ID!) {
    deleteCompanyTeam(id: $id) { __typename }
  }
`;async function O(t){return await o(I,{variables:{id:t}}).then(n=>{var a,e;return(a=n.errors)!=null&&a.length?m(n.errors):!!((e=n==null?void 0:n.data)!=null&&e.deleteCompanyTeam)}).catch(u)}const U=`
  mutation deleteCompanyUser($id: ID!) {
    deleteCompanyUserV2(id: $id) { __typename }
  }
`;async function Y(t){return await o(U,{variables:{id:t}}).then(n=>{var a,e;return(a=n.errors)!=null&&a.length?m(n.errors):!!((e=n==null?void 0:n.data)!=null&&e.deleteCompanyUserV2)}).catch(u)}const A=`
  query getCompanyTeam($id: ID!) {
    company { team(id: $id) { id name description } }
  }
`;async function D(t){return await o(A,{variables:{id:t}}).then(n=>{var e,r,i;if((e=n.errors)!=null&&e.length)return m(n.errors);const a=(i=(r=n==null?void 0:n.data)==null?void 0:r.company)==null?void 0:i.team;return a?p(a):null}).catch(u)}const g=`
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
`;async function j(t){return await o(g,{variables:{id:t}}).then(n=>{var e,r,i;if((e=n.errors)!=null&&e.length)return m(n.errors);const a=(i=(r=n==null?void 0:n.data)==null?void 0:r.company)==null?void 0:i.user;return a?l(a):null}).catch(u)}const b=`
  query getCompanyRoles {
    company {
      roles {
        items { id name }
      }
    }
  }
`;async function G(){return await o(b,{method:"GET"}).then(t=>{var a,e,r,i;if((a=t.errors)!=null&&a.length)return m(t.errors);const n=((i=(r=(e=t==null?void 0:t.data)==null?void 0:e.company)==null?void 0:r.roles)==null?void 0:i.items)??[];return s(n)}).catch(u)}const $=`
  query isCompanyUserEmailAvailable($email: String!) {
    isCompanyUserEmailAvailable(email: $email) { is_email_available }
  }
`;async function q(t){return await o($,{variables:{email:t}}).then(n=>{var a,e,r;return(a=n.errors)!=null&&a.length?m(n.errors):((r=(e=n==null?void 0:n.data)==null?void 0:e.isCompanyUserEmailAvailable)==null?void 0:r.is_email_available)??null}).catch(u)}export{G as a,D as b,R as c,S as d,M as e,v as f,j as g,N as h,q as i,O as j,Y as k,P as u};
//# sourceMappingURL=isCompanyUserEmailAvailable.js.map
