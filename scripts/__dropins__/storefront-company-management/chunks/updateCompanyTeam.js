/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as u,h as i}from"./network-error.js";import{h as o}from"./fetch-error.js";function d(n){return n.items.filter(t=>t.entity.__typename==="Customer"&&"status"in t.entity?t.entity.status==="ACTIVE":!0).map(t=>({structureId:t.entity.structure_id,parentStructureId:t.parent_id||null,label:t.entity.__typename==="CompanyTeam"?t.entity.name||"":`${t.entity.firstname||""} ${t.entity.lastname||""}`.trim(),type:t.entity.__typename==="CompanyTeam"?"team":"user",entityId:(t.entity.__typename==="CompanyTeam"?t.entity.companyTeamId:t.entity.customerId)||"",description:t.entity.__typename==="CompanyTeam"?t.entity.description||null:t.entity.job_title||null})).map(t=>{const r=t.parentStructureId||null,m=!r||r==="MA=="?null:r;return{id:t.structureId,parentId:m,label:t.label,type:t.type,entityId:t.entityId,description:t.description}})}const c=n=>{if(!n)throw new Error("Invalid response: missing team data");return{id:n.id,name:n.name,description:n.description}},y=`
  mutation createCompanyTeam($input: CompanyTeamCreateInput!) {
    createCompanyTeam(input: $input) { __typename team { id structure_id name } }
  }
`;async function h(n){const a={name:n.name,description:n.description,target_id:n.targetId};return await u(y,{variables:{input:a}}).then(e=>{var r,m,p;if((r=e.errors)!=null&&r.length)return o(e.errors);const t=(p=(m=e==null?void 0:e.data)==null?void 0:m.createCompanyTeam)==null?void 0:p.team;return t?{id:t.id,structureId:t.structure_id,name:t.name}:null}).catch(i)}const s=`
  mutation deleteCompanyTeam($id: ID!) {
    deleteCompanyTeam(id: $id) { __typename }
  }
`;async function E(n){return await u(s,{variables:{id:n}}).then(a=>{var e,t;return(e=a.errors)!=null&&e.length?o(a.errors):!!((t=a==null?void 0:a.data)!=null&&t.deleteCompanyTeam)}).catch(i)}const _=`
  query getCompanyStructure {
    company {
      structure {
        items {
          id
          parent_id
          entity {
            __typename
            ... on CompanyTeam { companyTeamId: id structure_id name description }
            ... on Customer { customerId: id structure_id firstname lastname status job_title }
          }
        }
      }
    }
  }
`;async function A(){return await u(_,{method:"GET",cache:"no-cache"}).then(n=>{var e;if((e=n.errors)!=null&&e.length)return o(n.errors);const a=n.data.company.structure;return d(a)}).catch(i)}const l=`
  query getCompanyTeam($id: ID!) {
    company { team(id: $id) { id name description } }
  }
`;async function g(n){return await u(l,{variables:{id:n}}).then(a=>{var t,r,m;if((t=a.errors)!=null&&t.length)return o(a.errors);const e=(m=(r=a==null?void 0:a.data)==null?void 0:r.company)==null?void 0:m.team;return e?c(e):null}).catch(i)}const T=`
  mutation updateCompanyStructure($treeId: ID!, $parentTreeId: ID!) {
    updateCompanyStructure(input: { tree_id: $treeId, parent_tree_id: $parentTreeId }) {
      __typename
    }
  }
`;async function $(n){const a={treeId:n.id,parentTreeId:n.parentId};return await u(T,{variables:a}).then(e=>{var t,r;return(t=e.errors)!=null&&t.length?o(e.errors):!!((r=e==null?void 0:e.data)!=null&&r.updateCompanyStructure)}).catch(i)}const C=`
  mutation updateCompanyTeam($input: CompanyTeamUpdateInput!) {
    updateCompanyTeam(input: $input) { __typename team { id name } }
  }
`;async function b(n){const a={id:n.id,name:n.name,description:n.description};return await u(C,{variables:{input:a}}).then(e=>{var t,r,m,p;return(t=e.errors)!=null&&t.length?o(e.errors):!!((p=(m=(r=e==null?void 0:e.data)==null?void 0:r.updateCompanyTeam)==null?void 0:m.team)!=null&&p.id)}).catch(i)}export{A as a,$ as b,h as c,E as d,g,b as u};
//# sourceMappingURL=updateCompanyTeam.js.map
