/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as l}from"@dropins/tools/event-bus.js";const o={email:"",isBillToShipping:void 0,selectedPaymentMethod:null,selectedShippingMethod:null};function s(e){const n={...l.lastPayload("checkout/values")??o,...e};l.emit("checkout/values",n)}function i(e){const t=l.lastPayload("checkout/values");return t&&e in t?t[e]:null}export{i as g,s as n};
//# sourceMappingURL=values.js.map
