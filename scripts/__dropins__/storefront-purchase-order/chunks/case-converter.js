/*! Copyright 2025 Adobe
All Rights Reserved. */
const t=e=>{if(e==null||typeof e!="object")return e;if(Array.isArray(e))return e.map(t);const r={};for(const[n,s]of Object.entries(e)){const a=n.replace(/[A-Z]/g,c=>`_${c.toLowerCase()}`);r[a]=t(s)}return r};export{t};
//# sourceMappingURL=case-converter.js.map
