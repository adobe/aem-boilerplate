/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsx as c}from"@dropins/tools/preact-jsx-runtime.js";import{R}from"./RequisitionListForm.js";import{useState as p}from"@dropins/tools/preact-hooks.js";import{R as L,f as q,h as I,t as l,u as T}from"./updateRequisitionList.js";import{events as _}from"@dropins/tools/event-bus.js";const f=`
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
`,N=async(r,o)=>q(f,{variables:{requisitionListName:r,requisitionListDescription:o}}).then(({errors:t,data:i})=>{var e;if(t)return I(t);if(!((e=i==null?void 0:i.createRequisitionList)!=null&&e.requisition_list))return null;const u=l(i.createRequisitionList.requisition_list);return _.emit("requisitionList/data",u),u});function S(r,o,t,i){const[u,e]=p(null);return{error:u,submit:async a=>{e(null);try{const n=a.description??"",s=r==="update"&&o?await T(o,a.name,n):await N(a.name,n);return s&&(t==null||t(s)),s}catch(n){const s=(n==null?void 0:n.message)||"Unexpected error";return e(s),i==null||i(s),null}}}}const O=({mode:r,requisitionListUid:o,defaultValues:t={name:"",description:""},onSuccess:i,onError:u,onCancel:e})=>{const{error:m,submit:a}=S(r,o,i,u);return c(R,{mode:r,defaultValues:t,error:m,onSubmit:async s=>{await a(s)},onCancel:e})};export{O as R};
//# sourceMappingURL=RequisitionListForm2.js.map
