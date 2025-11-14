/*! Copyright 2025 Adobe
All Rights Reserved. */
const r=t=>{var e,l;if(t.length===1&&((l=(e=t[0])==null?void 0:e.path)==null?void 0:l.length)>0){const a=t[0].path[t[0].path.length-1];if(["applied_coupons","applied_gift_cards","available_payment_methods"].includes(a))return}const n=t.map(a=>a.message).join(" ");throw Error(n)};export{r as h};
//# sourceMappingURL=fetch-error.js.map
