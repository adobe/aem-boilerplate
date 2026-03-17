/*! Copyright 2026 Adobe
All Rights Reserved. */
import{jsx as c}from"@dropins/tools/preact-jsx-runtime.js";import{R as p}from"./RequisitionListForm.js";import{useState as R}from"@dropins/tools/preact-hooks.js";import{R as L,t as q,u as I}from"./updateRequisitionList.js";import{f as l,h as T}from"./fetch-graphql.js";import{events as f}from"@dropins/tools/event-bus.js";const _=`
  mutation CREATE_REQUISITION_LIST_MUTATION(
      $requisitionListName: String!,
      $requisitionListDescription: String,
    ) {
    createRequisitionList(
      input: {
        name: $requisitionListName
        description: $requisitionListDescription
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${L}
`,N=async(r,o)=>l(_,{variables:{requisitionListName:r,requisitionListDescription:o}}).then(({errors:t,data:i})=>{var e;if(t)return T(t);if(!((e=i==null?void 0:i.createRequisitionList)!=null&&e.requisition_list))return null;const u=q(i.createRequisitionList.requisition_list);return f.emit("requisitionList/data",u),u});function S(r,o,t,i){const[u,e]=R(null);return{error:u,submit:async a=>{e(null);try{const n=a.description??"",s=r==="update"&&o?await I(o,a.name,n):await N(a.name,n);return s&&(t==null||t(s)),s}catch(n){const s=(n==null?void 0:n.message)||"Unexpected error";return e(s),i==null||i(s),null}}}}const U=({mode:r,requisitionListUid:o,defaultValues:t={name:"",description:""},onSuccess:i,onError:u,onCancel:e})=>{const{error:m,submit:a}=S(r,o,i,u);return c(p,{mode:r,defaultValues:t,error:m,onSubmit:async s=>{await a(s)},onCancel:e})};export{U as R};
//# sourceMappingURL=RequisitionListForm2.js.map
