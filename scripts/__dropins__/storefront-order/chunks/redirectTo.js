/*! Copyright 2025 Adobe
All Rights Reserved. */
const a=(e,n,r)=>{if(typeof e!="function")return;const t=e(r);if(!n||Object.keys(n).length===0){window.location.href=t;return}const o=new URLSearchParams;Object.entries(n).forEach(([i,s])=>{o.append(i,String(s))});const c=t.includes("?")?"&":"?";window.location.href=`${t}${c}${o.toString()}`};export{a as r};
//# sourceMappingURL=redirectTo.js.map
