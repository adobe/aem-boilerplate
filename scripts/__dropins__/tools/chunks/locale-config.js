/*! Copyright 2025 Adobe
All Rights Reserved. */
var a=Object.defineProperty;var c=(l,e,o)=>e in l?a(l,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):l[e]=o;var t=(l,e,o)=>c(l,typeof e!="symbol"?e+"":e,o);class s{constructor(){t(this,"_locale")}get locale(){return this._locale}set locale(e){this._locale=e}getMethods(){return{setLocale:e=>{this.locale=e},getLocale:()=>this.locale}}}const g=new s,{setLocale:L,getLocale:h}=g.getMethods();export{h as g,L as s};
//# sourceMappingURL=locale-config.js.map
