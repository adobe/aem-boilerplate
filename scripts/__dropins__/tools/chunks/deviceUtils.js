/*! Copyright 2025 Adobe
All Rights Reserved. */
const s=(e,o)=>{let t;return function(...n){clearTimeout(t),t=setTimeout(()=>e.apply(this,n),o)}},i=e=>typeof e=="number",c=()=>{const e=navigator.userAgent.toLowerCase(),o=/ipad|iphone|ipod/.test(e),t=e.includes("mac")&&"ontouchend"in document;return o||t};export{c as a,s as d,i};
//# sourceMappingURL=deviceUtils.js.map
