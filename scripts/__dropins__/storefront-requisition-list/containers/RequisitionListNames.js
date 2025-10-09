/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsxs as f,jsx as n}from"@dropins/tools/preact-jsx-runtime.js";import*as a from"@dropins/tools/preact-compat.js";import{useState as T,useEffect as q}from"@dropins/tools/preact-compat.js";import{Picker as p,Icon as L,Card as h}from"@dropins/tools/components.js";import{R as E,f as S,h as g,t as N}from"../chunks/transform-requisition-list.js";import{R as U}from"../chunks/RequisitionListItemsFragment.graphql.js";import{g as v}from"../chunks/getRequisitionLists.js";import{R as O}from"../chunks/RequisitionListForm.js";import"@dropins/tools/lib.js";import"@dropins/tools/preact-hooks.js";/* empty css                            *//* empty css                           */import{useText as A}from"@dropins/tools/i18n.js";import"@dropins/tools/fetch-graphql.js";const M=`
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
${U}
${E}
`,k=async(r,o)=>{const{errors:e,data:c}=await S(M,{variables:{requisitionListUid:r,requisitionListItems:o}});return e?g(e):N(c.addProductsToRequisitionList.requisition_list)},x=r=>a.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...r},a.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 12H21",stroke:"currentColor"}),a.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 6H21",stroke:"currentColor"}),a.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 18H21",stroke:"currentColor"})),z=({items:r=[],canCreate:o=!0,sku:e,quantity:c=1,...I})=>{const[s,d]=T(r),[m,u]=T(!1),l=A({createTitle:"RequisitionList.RequisitionListForm.createTitle",addToReqList:"RequisitionList.RequisitionListForm.addToRequisitionList"});q(()=>{(!s||s.length===0)&&v().then(t=>{t&&t.items&&d(t.items)}).catch(t=>{console.error("Error fetching requisition lists:",t)})},[s]);const R=[...(s==null?void 0:s.map(t=>({value:t.uid,text:t.name})))??[],...o?[{value:"__create__",text:l.createTitle}]:[]],_=async t=>{try{await k(t,[{sku:e,quantity:c}])}catch(i){console.error("Error adding product to list:",i)}};return f("div",{...I,className:"requisition-list-names",children:[n(p,{id:`requisition-list-names__picker__${e}`,className:"requisition-list-names__picker",name:`requisition-list-names__picker__${e}`,icon:n(L,{source:x}),variant:"secondary",placeholder:l.addToReqList,disabled:m,size:"medium",options:R,handleSelect:t=>{const i=t.currentTarget.value;if(i==="__create__"){u(!0);return}i&&_(i).then(()=>{t.target.value=""})}}),o&&m&&n(h,{variant:"secondary",children:n(O,{mode:"create",onSuccess:async t=>{_(t.uid).then(()=>{u(!1),d(i=>i?[...i,t]:[t])})},onCancel:()=>u(!1)})})]})};export{z as RequisitionListNames,z as default};
//# sourceMappingURL=RequisitionListNames.js.map
