/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as e}from"@dropins/tools/event-bus.js";const s=async()=>e._lastEvent["pdp/data"]?Promise.resolve(e._lastEvent["pdp/data"].payload):new Promise(a=>{const t=e.on("pdp/data",r=>{a(r),t==null||t.off()},{eager:!0})});export{s as g};
