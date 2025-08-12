/*! Copyright 2025 Adobe
All Rights Reserved. */
import{debounce as t}from"@dropins/tools/lib.js";import{useState as o,useCallback as s,useEffect as r}from"@dropins/tools/preact-hooks.js";const w=()=>{const[i,n]=o(window.innerWidth<768),e=s(t(()=>{n(window.innerWidth<768)},1e3),[]);return r(()=>(window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}),[e]),i};export{w as u};
//# sourceMappingURL=useIsMobile.js.map
