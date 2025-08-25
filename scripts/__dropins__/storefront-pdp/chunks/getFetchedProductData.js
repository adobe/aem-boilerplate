/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as o}from"@dropins/tools/event-bus.js";const n=async({scope:a}={})=>{const e=o.lastPayload("pdp/data",{scope:a});return e?Promise.resolve(e):new Promise(r=>{const t=o.on("pdp/data",s=>{r(s),t==null||t.off()},{eager:!0,scope:a})})};export{n as g};
//# sourceMappingURL=getFetchedProductData.js.map
