/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as c}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const v=(a,e)=>{const r=u({scope:e==null?void 0:e.scope}),l=a(r);c.emit("pdp/values",{...l},{scope:e==null?void 0:e.scope})},u=({scope:a}={})=>c.lastPayload("pdp/values",{scope:a})??null,g=(a,e)=>{const r=d({scope:e==null?void 0:e.scope}),l=a(r);c.emit("pdp/valid",l,{scope:e==null?void 0:e.scope})},d=({scope:a}={})=>c.lastPayload("pdp/valid",{scope:a})??null;export{g as a,u as g,d as i,v as s};
//# sourceMappingURL=isProductConfigurationValid.js.map
