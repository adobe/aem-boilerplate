/*! Copyright 2025 Adobe
All Rights Reserved. */
import{getGlobalLocale as c}from"@dropins/tools/lib.js";var n={};function i(e){if(e)return e;const r=c();return r||(n.LOCALE&&n.LOCALE!=="undefined"?n.LOCALE:"en-US")}const a=(e,r="en-US")=>{try{const t=new Date(e);if(isNaN(t.getTime()))return e;const o=i(r);return t.toLocaleString(o,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0})}catch{return e}};export{a as f};
//# sourceMappingURL=formatDate.js.map
