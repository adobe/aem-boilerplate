/*! Copyright 2026 Adobe
All Rights Reserved. */
const o={day:"2-digit",month:"2-digit",year:"numeric"},m={year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0},i=new Map,s=16;function T(e){let t=i.get(e);if(!t){if(i.size>=s){const n=i.keys().next().value;n!==void 0&&i.delete(n)}t=new Intl.DateTimeFormat(e,m),i.set(e,t)}return t}const d="datetime",c=(e,t="en-US",n={})=>{const r=new Date(e);if(isNaN(r.getTime()))return"Invalid Date";if(n===d)return T(t).format(r);const a={...o,...n};return new Intl.DateTimeFormat(t,a).format(r)};export{d as F,c as f};
//# sourceMappingURL=formatDateToLocale.js.map
