/*! Copyright 2024 Adobe
All Rights Reserved. */
import{events as o}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const a=t=>{const s=e(),n=t(s);JSON.stringify(s)!==JSON.stringify(n)&&o.emit("pdp/values",{...n})},e=()=>{var t;return((t=o._lastEvent["pdp/values"])==null?void 0:t.payload)??null};export{e as g,a as s};
