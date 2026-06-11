/*! Copyright 2026 Adobe
All Rights Reserved. */
import{k as s}from"../api.js";function u(n){var r;return n===void 0?!!((r=s())!=null&&r.isVirtual):!!(n!=null&&n.isVirtual)}function l(n){return!n||n.isEmpty}function o(n){var e;if(!n)return null;const r=n.shippingAddresses||[];return r.length===0?null:(e=r[0])==null?void 0:e.selectedShippingMethod}function p(n,r="shipping"){var i;return n?(r==="shipping"?(i=n.shippingAddresses)==null?void 0:i[0]:n.billingAddress)??null:null}function g(n){if(!n)return null;const{selectedPaymentMethod:r}=n;return!r||!(r!=null&&r.code)?null:n.selectedPaymentMethod}export{l as a,p as b,g as c,o as g,u as i};
//# sourceMappingURL=events.js.map
