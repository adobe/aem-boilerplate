/*! Copyright 2025 Adobe
All Rights Reserved. */
import{getGlobalLocale as r}from"@dropins/tools/lib.js";function o(e){const t=new Date(e);return!isNaN(t.getTime())}function a(e,t="short"){if(!o(e))return"–";const n=r()||"en-US";return t==="short"?new Date(e).toLocaleDateString(n,{year:"numeric",month:"numeric",day:"numeric"}):new Date(e).toLocaleDateString(n,{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})}export{a as f};
//# sourceMappingURL=dateUtils.js.map
