/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as o,h as u}from"./network-error.js";import{h as i}from"./fetch-error.js";const d=`
  mutation createCompanyTeam($input: CompanyTeamCreateInput!) {
    createCompanyTeam(input: $input) { __typename team { id structure_id name } }
  }
`;async function f(a){const n={name:a.name,description:a.description,target_id:a.targetId};return await o(d,{variables:{input:n}}).then(e=>{var r,m,p;if((r=e.errors)!=null&&r.length)return i(e.errors);const t=(p=(m=e==null?void 0:e.data)==null?void 0:m.createCompanyTeam)==null?void 0:p.team;return t?{id:t.id,structureId:t.structure_id,name:t.name}:null}).catch(u)}const c=`
  mutation deleteCompanyTeam($id: ID!) {
    deleteCompanyTeam(id: $id) { __typename }
  }
`;async function E(a){return await o(c,{variables:{id:a}}).then(n=>{var e,t;return(e=n.errors)!=null&&e.length?i(n.errors):!!((t=n==null?void 0:n.data)!=null&&t.deleteCompanyTeam)}).catch(u)}function y(a){return a.items.map(t=>({structureId:t.entity.structure_id,parentStructureId:t.parent_id||null,label:t.entity.__typename==="CompanyTeam"?t.entity.name||"":`${t.entity.firstname||""} ${t.entity.lastname||""}`.trim(),type:t.entity.__typename==="CompanyTeam"?"team":"user",entityId:(t.entity.__typename==="CompanyTeam"?t.entity.companyTeamId:t.entity.customerId)||"",description:t.entity.__typename==="CompanyTeam"&&t.entity.description||null})).map(t=>{const r=t.parentStructureId||null,m=!r||r==="MA=="?null:r;return{id:t.structureId,parentId:m,label:t.label,type:t.type,entityId:t.entityId,description:t.description}})}const s=a=>{if(!a)throw new Error("Invalid response: missing team data");return{id:a.id,name:a.name,description:a.description}},T=`
  query getCompanyStructure {
    company {
      structure {
        items {
          id
          parent_id
          entity {
            __typename
            ... on CompanyTeam { companyTeamId: id structure_id name description }
            ... on Customer { customerId: id structure_id firstname lastname }
          }
        }
      }
    }
  }
`;async function g(){return await o(T,{method:"GET",cache:"no-cache"}).then(a=>{var e;if((e=a.errors)!=null&&e.length)return i(a.errors);const n=a.data.company.structure;return y(n)}).catch(u)}const l=`
  query getCompanyTeam($id: ID!) {
    company { team(id: $id) { id name description } }
  }
`;async function A(a){return await o(l,{variables:{id:a}}).then(n=>{var t,r,m;if((t=n.errors)!=null&&t.length)return i(n.errors);const e=(m=(r=n==null?void 0:n.data)==null?void 0:r.company)==null?void 0:m.team;return e?s(e):null}).catch(u)}const _=`
  mutation updateCompanyStructure($treeId: ID!, $parentTreeId: ID!) {
    updateCompanyStructure(input: { tree_id: $treeId, parent_tree_id: $parentTreeId }) {
      __typename
    }
  }
`;async function $(a){const n={treeId:a.id,parentTreeId:a.parentId};return await o(_,{variables:n}).then(e=>{var t,r;return(t=e.errors)!=null&&t.length?i(e.errors):!!((r=e==null?void 0:e.data)!=null&&r.updateCompanyStructure)}).catch(u)}const C=`
  mutation updateCompanyTeam($input: CompanyTeamUpdateInput!) {
    updateCompanyTeam(input: $input) { __typename team { id name } }
  }
`;async function M(a){const n={id:a.id,name:a.name,description:a.description};return await o(C,{variables:{input:n}}).then(e=>{var t,r,m,p;return(t=e.errors)!=null&&t.length?i(e.errors):!!((p=(m=(r=e==null?void 0:e.data)==null?void 0:r.updateCompanyTeam)==null?void 0:m.team)!=null&&p.id)}).catch(u)}export{g as a,$ as b,f as c,E as d,A as g,M as u};
//# sourceMappingURL=updateCompanyTeam.js.map
