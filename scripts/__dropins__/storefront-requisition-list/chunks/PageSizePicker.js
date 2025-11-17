/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsx as P}from"@dropins/tools/preact-jsx-runtime.js";import{Picker as c}from"@dropins/tools/components.js";import"./RequisitionListView.js";import{useText as p}from"@dropins/tools/i18n.js";const z=({currentPageSize:t,onPageSizeChange:a,disabled:i=!1,pageSizeOptions:r=[10,25,50,100]})=>{const o=p({itemsPerPage:"RequisitionList.PageSizePicker.itemsPerPage"}),s=e=>{const g=e.target,m=parseInt(g.value,10);a(m)},n=r.map(e=>({value:e.toString(),text:e.toString()}));return P(c,{disabled:i,"data-testid":"page-size-picker",variant:"primary",size:"medium",value:t.toString(),options:n,handleSelect:s,"aria-label":o.itemsPerPage})};export{z as P};
//# sourceMappingURL=PageSizePicker.js.map
