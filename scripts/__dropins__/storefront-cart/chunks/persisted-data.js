/*! Copyright 2024 Adobe
All Rights Reserved. */
function s(e){e?sessionStorage.setItem("DROPIN__CART__CART__DATA",JSON.stringify(e)):sessionStorage.removeItem("DROPIN__CART__CART__DATA")}function t(){const e=sessionStorage.getItem("DROPIN__CART__CART__DATA");return e?JSON.parse(e):null}function _(e){e?sessionStorage.setItem("DROPIN__CART__SHIPPING__DATA",JSON.stringify(e)):sessionStorage.removeItem("DROPIN__CART__SHIPPING__DATA")}export{s as a,t as g,_ as s};
