/*! Copyright 2025 Adobe
All Rights Reserved. */
function a(t,e){return e.format(new Date(t))}function n(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(t){return console.warn("Failed to detect user timezone, falling back to UTC:",t),"UTC"}}function r(t){const e=new Date(t);return isNaN(e.getTime())?"–":e.toLocaleDateString()}export{a,r as f,n as g};
//# sourceMappingURL=dateUtils.js.map
