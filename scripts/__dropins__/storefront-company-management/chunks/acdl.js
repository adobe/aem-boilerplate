/*! Copyright 2025 Adobe
All Rights Reserved. */
var o=(t=>(t.EDIT_COMPANY_EVENT="edit-company",t.EDIT_COMPANY_STRUCTURE_EVENT="edit-company-structure",t))(o||{});const c={EDIT_COMPANY_EVENT:"edit-company",EDIT_COMPANY_STRUCTURE_EVENT:"edit-company-structure"},u=()=>(window.adobeDataLayer||(window.adobeDataLayer=[]),window.adobeDataLayer),r=t=>{u().push(a=>{const n=a.getState?a.getState():{};a.push({event:t,context:n})})},s=(t,e)=>{if(!c[t])return null;switch(t){case"edit-company":r({type:"company",eventType:"edit",companyData:e});break;case"edit-company-structure":r({type:"company-structure",eventType:"edit",structureData:e});break;default:return null}};export{o as E,s as p};
//# sourceMappingURL=acdl.js.map
