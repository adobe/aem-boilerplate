/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as n}from"@dropins/tools/event-bus.js";function u(){return n.lastPayload("checkout/initialized")??null}function i(){return n.lastPayload("checkout/updated")??null}function a(){return i()??u()}function s(){var e;const t=a();return!!((e=t==null?void 0:t.shippingAddresses)!=null&&e.length)}function l(){const t=a();return(t==null?void 0:t.email)??null}export{l as a,a as b,i as g,s as h};
//# sourceMappingURL=events.js.map
