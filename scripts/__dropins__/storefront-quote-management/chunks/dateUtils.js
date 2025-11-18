/*! Copyright 2025 Adobe
All Rights Reserved. */
import{getGlobalLocale as n}from"@dropins/tools/lib.js";function a(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){return console.warn("Failed to detect user timezone, falling back to UTC:",e),"UTC"}}function o(e){const t=new Date(e);return!isNaN(t.getTime())}function c(e,t="short"){if(!o(e))return"–";const r=n()||"en-US";return t==="short"?new Date(e).toLocaleDateString(r,{year:"numeric",month:"numeric",day:"numeric"}):new Date(e).toLocaleDateString(r,{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})}export{c as f,a as g};
//# sourceMappingURL=dateUtils.js.map
