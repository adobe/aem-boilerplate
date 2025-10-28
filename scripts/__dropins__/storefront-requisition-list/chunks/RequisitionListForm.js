/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsxs as q,jsx as a}from"@dropins/tools/preact-jsx-runtime.js";import{useState as L}from"@dropins/tools/preact-hooks.js";import{ProgressSpinner as C,InLineAlert as M,Field as h,Input as Q,TextArea as x,Button as _}from"@dropins/tools/components.js";import{classes as f}from"@dropins/tools/lib.js";/* empty css                    */import{useText as D}from"@dropins/tools/i18n.js";import{R as b,f as S,h as N,t as g}from"./transform-requisition-list.js";import{events as F}from"@dropins/tools/event-bus.js";const B=({className:t,mode:r,defaultValues:e={name:"",description:""},error:i=null,onSubmit:s,onCancel:l,...m})=>{const[n,u]=L(e),[o,v]=L(!1),[d,T]=L(!1),c=D({actionCancel:"RequisitionList.RequisitionListForm.actionCancel",actionSave:"RequisitionList.RequisitionListForm.actionSave",requiredField:"RequisitionList.RequisitionListForm.requiredField",floatingLabel:"RequisitionList.RequisitionListForm.floatingLabel",placeholder:"RequisitionList.RequisitionListForm.placeholder",label:"RequisitionList.RequisitionListForm.label",updateTitle:"RequisitionList.RequisitionListForm.updateTitle",createTitle:"RequisitionList.RequisitionListForm.createTitle"}),I=R=>p=>{const $=p.target;u(O=>({...O,[R]:$.value}))},U=async R=>{var p;if(R.preventDefault(),!(!n.name||d)){T(!0);try{await s({name:n.name.trim(),description:((p=n.description)==null?void 0:p.trim())||void 0})}catch{T(!1)}}},y=()=>v(!0),E=o&&!n.name.trim()?c.requiredField:"",A=r==="update"?c.updateTitle:c.createTitle;return q("div",{...m,className:f(["requisition-list-form",t]),children:[q("div",{className:"requisition-list-form__title",children:[A,d?a("div",{className:f(["requisition-list-form_progress-spinner",t]),"data-testid":"requisition-list-form-progress-spinner",children:a(C,{stroke:"4",size:"small"})}):null]}),i?a(M,{type:"error",className:"requisition-list-form__notification",variant:"secondary",heading:i,"data-testid":"requisition-list-alert"}):null,q("form",{className:f(["requisition-list-form__form",t]),onSubmit:U,children:[a(h,{error:E,disabled:d,children:a(Q,{id:"requisition-list-form-name",name:"name",type:"text",floatingLabel:c.floatingLabel,placeholder:c.placeholder,required:!0,value:n.name,onChange:I("name"),onBlur:y})}),a(h,{disabled:d,children:a(x,{id:"requisition-list-form-description",name:"description",label:c.label,placeholder:c.label,value:n.description,onChange:I("description")})}),q("div",{className:"requisition-list-form__actions",children:[a(_,{type:"button",variant:"secondary",onClick:l,disabled:d,"data-testid":"requisition-list-form-cancel",children:c.actionCancel}),a(_,{type:"submit",disabled:d,"data-testid":"requisition-list-form-save",children:c.actionSave})]})]})]})},w=`
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
`,G=async(t,r)=>S(w,{variables:{requisitionListName:t,requisitionListDescription:r}}).then(({errors:e,data:i})=>{if(e)return N(e);const s=g(i.createRequisitionList.requisition_list);return F.emit("requisitionList/data",s),s}),P=`
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
`,j=async(t,r,e)=>S(P,{variables:{requisitionListUid:t,name:r,description:e}}).then(({errors:i,data:s})=>{var m;if(i)return N(i);const l=g((m=s==null?void 0:s.updateRequisitionList)==null?void 0:m.requisition_list);return F.emit("requisitionList/data",l),l});function k(t,r,e,i){const[s,l]=L(null);return{error:s,submit:async n=>{l(null);try{const u=n.description??"",o=t==="update"&&r?await j(r,n.name,u):await G(n.name,u);return o&&(e==null||e(o)),o}catch(u){const o=(u==null?void 0:u.message)||"Unexpected error";return l(o),i==null||i(o),null}}}}const Z=({mode:t,requisitionListUid:r,defaultValues:e={name:"",description:""},onSuccess:i,onError:s,onCancel:l})=>{const{error:m,submit:n}=k(t,r,i,s);return a(B,{mode:t,defaultValues:e,error:m,onSubmit:async o=>{await n(o)},onCancel:l})};export{Z as R};
//# sourceMappingURL=RequisitionListForm.js.map
