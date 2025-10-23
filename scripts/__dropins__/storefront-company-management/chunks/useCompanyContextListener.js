/*! Copyright 2025 Adobe
All Rights Reserved. */
import{useRef as m,useEffect as u}from"@dropins/tools/preact-hooks.js";import{events as C}from"@dropins/tools/event-bus.js";const d=(t,f={})=>{const{eager:n=!0,enabled:o=!0}=f,r=m(t);r.current=t,u(()=>{if(!o)return;const c=()=>{r.current()},e=C.on("companyContext/changed",c,{eager:n});return()=>{var a;(a=e==null?void 0:e.off)==null||a.call(e)}},[n,o])};export{d as u};
//# sourceMappingURL=useCompanyContextListener.js.map
