/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as e}from"@dropins/tools/event-bus.js";const n=r=>{throw r instanceof DOMException&&r.name==="AbortError"||e.emit("error",{source:"company",type:"network",error:r}),r},a=r=>{const o=r.map(t=>t.message).join(" ");throw Error(o)};export{n as a,a as h};
//# sourceMappingURL=fetch-error.js.map
