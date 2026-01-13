/*! Copyright 2026 Adobe
All Rights Reserved. */
const t="DROPIN__CART__CART__AUTHENTICATED";function s(e){e?sessionStorage.setItem("DROPIN__CART__CART__DATA",JSON.stringify(e)):sessionStorage.removeItem("DROPIN__CART__CART__DATA")}function _(){const e=sessionStorage.getItem("DROPIN__CART__CART__DATA");return e?JSON.parse(e):null}function o(e){e?sessionStorage.setItem("DROPIN__CART__SHIPPING__DATA",JSON.stringify(e)):sessionStorage.removeItem("DROPIN__CART__SHIPPING__DATA")}function r(e){e?localStorage.setItem(t,"true"):localStorage.removeItem(t)}function a(){return localStorage.getItem(t)==="true"}export{a,r as b,s as c,_ as g,o as s};
//# sourceMappingURL=persisted-data.js.map
