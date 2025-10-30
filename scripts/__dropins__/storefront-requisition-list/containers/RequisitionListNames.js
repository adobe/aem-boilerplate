/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsxs as v,jsx as r}from"@dropins/tools/preact-jsx-runtime.js";import*as u from"@dropins/tools/preact-compat.js";import{useState as L,useEffect as R}from"@dropins/tools/preact-compat.js";import{InLineAlert as N,Picker as y,Icon as A,Card as U}from"@dropins/tools/components.js";import{R as O,f as x,h as M,t as $}from"../chunks/transform-requisition-list.js";import{events as o}from"@dropins/tools/event-bus.js";import{R as w}from"../chunks/RequisitionListItemsFragment.graphql.js";import{g as D}from"../chunks/getRequisitionLists.js";import{R as F}from"../chunks/RequisitionListForm.js";import"@dropins/tools/lib.js";import"@dropins/tools/preact-hooks.js";/* empty css                            */import{u as k}from"../chunks/PageSizePicker2.js";import"@dropins/tools/preact.js";import{useText as Q}from"@dropins/tools/i18n.js";import"@dropins/tools/fetch-graphql.js";const C=`
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
${w}
${O}
`,P=async(e,n)=>{const{errors:i,data:d}=await x(C,{variables:{requisitionListUid:e,requisitionListItems:n}});if(i)return M(i);const a=$(d.addProductsToRequisitionList.requisition_list);return o.emit("requisitionList/data",a),a},G=e=>u.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},u.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 12H21",stroke:"currentColor"}),u.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 6H21",stroke:"currentColor"}),u.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 18H21",stroke:"currentColor"})),st=({items:e=[],canCreate:n=!0,sku:i,selectedOptions:d,quantity:a=1,variant:h="neutral",beforeAddProdToReqList:p,...E})=>{const[m,_]=L(e),[q,c]=L(!1),I=Q({createTitle:"RequisitionList.RequisitionListForm.createTitle",addToReqList:"RequisitionList.RequisitionListForm.addToRequisitionList"});R(()=>{(!e||e.length===0)&&D().then(t=>{_((t==null?void 0:t.items)||[])}).catch(t=>{console.error("Error fetching requisition lists:",t),_([])})},[e]);const S=[...(m==null?void 0:m.map(t=>({value:t.uid,text:t.name})))??[],...n?[{value:"__create__",text:I.createTitle}]:[]],T=async t=>{if(p)try{await p()}catch{return}try{await P(t,[{sku:i,quantity:a,selected_options:d}])}catch(s){console.error("Error adding product to list:",s)}},{alert:l,setAlert:g,handleRequisitionListAlert:f}=k();return R(()=>{const t=o.on("requisitionList/alert",f);return()=>{t==null||t.off()}},[f]),v("div",{...E,className:`requisition-list-names ${h==="hover"?"requisition-list-names--modal-hover":""}`,children:[l&&i===l.sku&&r(N,{id:`requisition-list-names__alert__${i}`,className:"requisition-list-names__alert",heading:l.description,type:l.type,variant:"primary",onDismiss:()=>g(null)}),r(y,{id:`requisition-list-names__picker__${i}`,className:"requisition-list-names__picker",name:`requisition-list-names__picker__${i}`,icon:r(A,{source:G}),variant:"secondary",placeholder:I.addToReqList,disabled:q,size:"medium",options:S,handleSelect:t=>{const s=t.currentTarget.value;if(s==="__create__"){c(!0);return}s&&T(s).then(()=>{o.emit("requisitionList/alert",{action:"add",type:"success",context:"product",skus:[i]}),c(!1),t.target.value=""})}}),n&&q&&r(U,{variant:"secondary",children:r(F,{mode:"create",onSuccess:async t=>{T(t.uid).then(()=>{o.emit("requisitionList/alert",{action:"add",type:"success",context:"product",skus:[i]}),c(!1),_(s=>[...s,t])})},onError:()=>{o.emit("requisitionList/alert",{action:"add",type:"error",context:"product",skus:[i]})},onCancel:()=>c(!1)})})]})};export{st as RequisitionListNames,st as default};
//# sourceMappingURL=RequisitionListNames.js.map
