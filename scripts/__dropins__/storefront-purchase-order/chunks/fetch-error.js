/*! Copyright 2025 Adobe
All Rights Reserved. */
const s=t=>{var e,n;if(t.length===1&&((n=(e=t[0])==null?void 0:e.path)==null?void 0:n.length)>0){const a=t[0].path[t[0].path.length-1];if(["applied_coupons","applied_gift_cards"].includes(a))return}const o=t.map(a=>a.message).join(" ");throw Error(o)};export{s as h};
//# sourceMappingURL=fetch-error.js.map
