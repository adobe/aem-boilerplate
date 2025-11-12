/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsx as m}from"@dropins/tools/preact-jsx-runtime.js";import{Picker as c}from"@dropins/tools/components.js";import"./RequisitionListView.js";import{useText as p}from"@dropins/tools/i18n.js";const z=10,f=({currentPageSize:t,onPageSizeChange:a,disabled:i=!1,pageSizeOptions:r=[10,25,50,100]})=>{const s=p({itemsPerPage:"RequisitionList.PageSizePicker.itemsPerPage"}),o=e=>{const P=e.target,g=parseInt(P.value,10);a(g)},n=r.map(e=>({value:e.toString(),text:e.toString()}));return m(c,{disabled:i,"data-testid":"page-size-picker",variant:"primary",size:"medium",value:t.toString(),options:n,handleSelect:o,"aria-label":s.itemsPerPage})};export{z as D,f as P};
//# sourceMappingURL=PageSizePicker.js.map
