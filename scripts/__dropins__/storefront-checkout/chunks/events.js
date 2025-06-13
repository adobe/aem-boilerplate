/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as a}from"@dropins/tools/event-bus.js";function i(){return a.lastPayload("checkout/initialized")??null}function u(){return a.lastPayload("checkout/updated")??null}function n(){return u()??i()}function s(){var e;const t=n();return!!((e=t==null?void 0:t.shippingAddresses)!=null&&e.length)}function l(){const t=n();return!!(t!=null&&t.isVirtual)}function r(){const t=n();return(t==null?void 0:t.email)??null}export{n as a,r as b,u as g,s as h,l as i};
