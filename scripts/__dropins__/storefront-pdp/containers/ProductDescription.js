/*! Copyright 2026 Adobe
All Rights Reserved. */
import{jsx as i}from"@dropins/tools/preact-jsx-runtime.js";import{useState as a,useEffect as c}from"@dropins/tools/preact-compat.js";import{classes as m}from"@dropins/tools/lib.js";import{events as l}from"@dropins/tools/event-bus.js";import{g as f}from"../chunks/getFetchedProductData.js";const u=({initialData:s=null,scope:r,children:d,...o})=>{const[t,n]=a(s);return c(()=>{const e=l.on("pdp/data",n,{scope:r});return()=>{e==null||e.off()}},[r]),t?i("div",{dangerouslySetInnerHTML:{__html:(t==null?void 0:t.description)??""},...o,className:m(["pdp-description",o.className])}):null};u.getInitialData=f;export{u as ProductDescription,u as default};
//# sourceMappingURL=ProductDescription.js.map
