/*! Copyright 2025 Adobe
All Rights Reserved. */
import{useState as f,useEffect as g}from"@dropins/tools/preact-hooks.js";import{g as S}from"./getStoreConfig.js";const C=()=>{const[s,r]=f(null);return g(()=>{var n;const e="orderStoreConfigPromise",i=sessionStorage.getItem("orderStoreConfig");if(i){const t=JSON.parse(i);r(t)}else{const t=window;t[e]||(t[e]=S().then(o=>(o&&sessionStorage.setItem("orderStoreConfig",JSON.stringify(o)),o))),(n=t[e])==null||n.then(o=>{o&&r(o)})}},[]),s};export{C as u};
//# sourceMappingURL=useGetStoreConfig.js.map
