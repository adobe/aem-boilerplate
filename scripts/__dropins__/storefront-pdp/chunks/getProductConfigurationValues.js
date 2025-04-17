/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as o}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const u=t=>{const e=n(),s=t(e);o.emit("pdp/values",{...s})},n=()=>{var t;return((t=o._lastEvent["pdp/values"])==null?void 0:t.payload)??null};export{n as g,u as s};
