/*! Copyright 2026 Adobe
All Rights Reserved. */
import{g as s}from"./events2.js";function u(n){if(n===void 0){const r=s();return!!(r!=null&&r.isVirtual)}return!!(n!=null&&n.isVirtual)}function o(n){return!n||n.isEmpty}function l(n){var i;if(!n)return null;const r=n.shippingAddresses||[];return r.length===0?null:(i=r[0])==null?void 0:i.selectedShippingMethod}function p(n,r="shipping"){var e;return n?(r==="shipping"?(e=n.shippingAddresses)==null?void 0:e[0]:n.billingAddress)??null:null}function g(n){if(!n)return null;const{selectedPaymentMethod:r}=n;return!r||!(r!=null&&r.code)?null:n.selectedPaymentMethod}export{o as a,p as b,g as c,l as g,u as i};
//# sourceMappingURL=events.js.map
