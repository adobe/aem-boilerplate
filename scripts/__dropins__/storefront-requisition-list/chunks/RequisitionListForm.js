/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsxs as p,jsx as o}from"@dropins/tools/preact-jsx-runtime.js";import{useState as L}from"@dropins/tools/preact-hooks.js";import{ProgressSpinner as O,InLineAlert as C,Field as h,Input as M,TextArea as Q,Button as _}from"@dropins/tools/components.js";import{classes as f}from"@dropins/tools/lib.js";import{useText as x}from"@dropins/tools/i18n.js";import{R as b,f as S,h as N,t as g}from"./transform-requisition-list.js";const D=({className:e,mode:n,defaultValues:s={name:"",description:""},error:i=null,onSubmit:l,onCancel:u,...d})=>{const[t,r]=L(s),[c,F]=L(!1),[m,T]=L(!1),a=x({actionCancel:"RequisitionList.RequisitionListForm.actionCancel",actionSave:"RequisitionList.RequisitionListForm.actionSave",requiredField:"RequisitionList.RequisitionListForm.requiredField",floatingLabel:"RequisitionList.RequisitionListForm.floatingLabel",placeholder:"RequisitionList.RequisitionListForm.placeholder",label:"RequisitionList.RequisitionListForm.label",editTitle:"RequisitionList.RequisitionListForm.editTitle",createTitle:"RequisitionList.RequisitionListForm.createTitle"}),I=R=>q=>{const A=q.target;r($=>({...$,[R]:A.value}))},U=async R=>{var q;if(R.preventDefault(),!(!t.name||m)){T(!0);try{await l({name:t.name.trim(),description:((q=t.description)==null?void 0:q.trim())||void 0})}finally{T(!1)}}},v=()=>F(!0),y=c&&!t.name.trim()?a.requiredField:"",E=n==="edit"?a.editTitle:a.createTitle;return p("div",{...d,className:f(["requisition-list-form",e]),children:[p("div",{className:"requisition-list-form__title",children:[E,m?o("div",{className:f(["requisition-list-form_progress-spinner",e]),"data-testid":"requisition-list-form-progress-spinner",children:o(O,{stroke:"4",size:"small"})}):null]}),i?o(C,{type:"error",className:"requisition-list-form__notification",variant:"secondary",heading:i,"data-testid":"requisition-list-alert"}):null,p("form",{className:f(["requisition-list-form__form",e]),onSubmit:U,children:[o(h,{error:y,disabled:m,children:o(M,{id:"requisition-list-form-name",name:"name",type:"text",floatingLabel:a.floatingLabel,placeholder:a.placeholder,required:!0,value:t.name,onChange:I("name"),onBlur:v})}),o(h,{disabled:m,children:o(Q,{id:"requisition-list-form-description",name:"description",label:a.label,placeholder:a.label,value:t.description,onChange:I("description")})}),p("div",{className:"requisition-list-form__actions",children:[o(_,{type:"button",variant:"secondary",onClick:u,disabled:m,"data-testid":"requisition-list-form-cancel",children:a.actionCancel}),o(_,{type:"submit",disabled:m,"data-testid":"requisition-list-form-save",children:a.actionSave})]})]})]})},B=`
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
${b}
`,w=async(e,n)=>S(B,{variables:{requisitionListName:e,requisitionListDescription:n}}).then(({errors:s,data:i})=>s?N(s):g(i.createRequisitionList.requisition_list)),G=`
  mutation UPDATE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
      $name: String!, 
      $description: String,
    ) {
    updateRequisitionList(
      requisitionListUid: $requisitionListUid
      input: {
        name: $name
        description: $description
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${b}
`,P=async(e,n,s)=>S(G,{variables:{requisitionListUid:e,name:n,description:s}}).then(({errors:i,data:l})=>i?N(i):g(l.updateRequisitionList.requisition_list));function j(e,n,s,i){const[l,u]=L(null);return{error:l,submit:async t=>{u(null);try{const r=e==="edit"&&n?await P(n,t.name,t.description):await w(t.name,t.description);return r&&(s==null||s(r)),r}catch(r){const c=(r==null?void 0:r.message)||"Unexpected error";return u(c),i==null||i(c),null}}}}const W=({mode:e,requisitionListUid:n,defaultValues:s={name:"",description:""},onSuccess:i,onError:l,onCancel:u})=>{const{error:d,submit:t}=j(e,n,i,l);return o(D,{mode:e,defaultValues:s,error:d,onSubmit:async c=>{await t(c)},onCancel:u})};export{W as R};
//# sourceMappingURL=RequisitionListForm.js.map
