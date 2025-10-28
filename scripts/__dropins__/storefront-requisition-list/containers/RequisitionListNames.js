/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsxs as L,jsx as c}from"@dropins/tools/preact-jsx-runtime.js";import*as u from"@dropins/tools/preact-compat.js";import{useState as f,useEffect as h}from"@dropins/tools/preact-compat.js";import{Picker as E,Icon as S,Card as g}from"@dropins/tools/components.js";import{R as N,f as v,h as U,t as O}from"../chunks/transform-requisition-list.js";import{events as d}from"@dropins/tools/event-bus.js";import{R as x}from"../chunks/RequisitionListItemsFragment.graphql.js";import{g as y}from"../chunks/getRequisitionLists.js";import{R as M}from"../chunks/RequisitionListForm.js";import"@dropins/tools/lib.js";import"@dropins/tools/preact-hooks.js";/* empty css                            *//* empty css                      */import"@dropins/tools/preact.js";import{useText as A}from"@dropins/tools/i18n.js";import"@dropins/tools/fetch-graphql.js";const k=`
  mutation ADD_PRODUCTS_TO_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItems: [RequisitionListItemsInput!]!
    ) {
    addProductsToRequisitionList(
      requisitionListUid: $requisitionListUid
      requisitionListItems: $requisitionListItems
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${x}
${N}
`,F=async(r,o)=>{const{errors:e,data:m}=await v(k,{variables:{requisitionListUid:r,requisitionListItems:o}});if(e)return U(e);const n=O(m.addProductsToRequisitionList.requisition_list);return d.emit("requisitionList/data",n),n},$=r=>u.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...r},u.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 12H21",stroke:"currentColor"}),u.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 6H21",stroke:"currentColor"}),u.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 18H21",stroke:"currentColor"})),X=({items:r=[],canCreate:o=!0,sku:e,selectedOptions:m,quantity:n=1,beforeAddProdToReqList:l,...q})=>{const[s,_]=f(r),[p,a]=f(!1),T=A({createTitle:"RequisitionList.RequisitionListForm.createTitle",addToReqList:"RequisitionList.RequisitionListForm.addToRequisitionList"});h(()=>{(!s||s.length===0)&&y().then(t=>{t&&t.items&&_(t.items)}).catch(t=>{console.error("Error fetching requisition lists:",t)})},[s]);const R=[...(s==null?void 0:s.map(t=>({value:t.uid,text:t.name})))??[],...o?[{value:"__create__",text:T.createTitle}]:[]],I=async t=>{if(l)try{await l()}catch{return}try{await F(t,[{sku:e,quantity:n,selected_options:m}])}catch(i){console.error("Error adding product to list:",i)}};return L("div",{...q,className:"requisition-list-names",children:[c(E,{id:`requisition-list-names__picker__${e}`,className:"requisition-list-names__picker",name:`requisition-list-names__picker__${e}`,icon:c(S,{source:$}),variant:"secondary",placeholder:T.addToReqList,disabled:p,size:"medium",options:R,handleSelect:t=>{const i=t.currentTarget.value;if(i==="__create__"){a(!0);return}i&&I(i).then(()=>{d.emit("requisitionList/alert",{action:"add",type:"success",context:"product"}),a(!1),t.target.value=""})}}),o&&p&&c(g,{variant:"secondary",children:c(M,{mode:"create",onSuccess:async t=>{I(t.uid).then(()=>{d.emit("requisitionList/alert",{action:"add",type:"success",context:"product"}),a(!1),_(i=>i?[...i,t]:[t])})},onError:()=>{d.emit("requisitionList/alert",{action:"add",type:"error",context:"product"})},onCancel:()=>a(!1)})})]})};export{X as RequisitionListNames,X as default};
//# sourceMappingURL=RequisitionListNames.js.map
