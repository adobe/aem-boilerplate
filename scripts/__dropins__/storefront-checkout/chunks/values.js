/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as l}from"@dropins/tools/event-bus.js";const a={email:"",isBillToShipping:!0,selectedPaymentMethod:null,selectedShippingMethod:null};function s(e){const n={...l.lastPayload("checkout/values")??a,...e};l.emit("checkout/values",n)}function u(e){const t=l.lastPayload("checkout/values");return t&&e in t?t[e]:null}export{u as g,s as n};
