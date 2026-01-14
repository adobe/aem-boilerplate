/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as t}from"@dropins/tools/event-bus.js";const s=r=>{const e=r instanceof DOMException&&r.name==="AbortError",o=r.name==="PlaceOrderError";throw!e&&!o&&t.emit("order/error",{source:"auth",type:"network",error:r.message}),r};export{s as h};
//# sourceMappingURL=network-error.js.map
