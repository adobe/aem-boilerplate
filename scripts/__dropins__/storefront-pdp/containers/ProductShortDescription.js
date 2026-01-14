/*! Copyright 2026 Adobe
All Rights Reserved. */
import{jsx as i}from"@dropins/tools/preact-jsx-runtime.js";import{useState as a,useEffect as c}from"@dropins/tools/preact-compat.js";import{classes as m}from"@dropins/tools/lib.js";import{events as l}from"@dropins/tools/event-bus.js";import{g as f}from"../chunks/getFetchedProductData.js";const u=({initialData:s=null,scope:e,children:p,...o})=>{const[t,n]=a(s);return c(()=>{const r=l.on("pdp/data",n,{scope:e});return()=>{r==null||r.off()}},[e]),t?i("div",{dangerouslySetInnerHTML:{__html:(t==null?void 0:t.shortDescription)??""},...o,className:m(["pdp-short-description",o.className])}):null};u.getInitialData=f;export{u as ProductShortDescription,u as default};
//# sourceMappingURL=ProductShortDescription.js.map
