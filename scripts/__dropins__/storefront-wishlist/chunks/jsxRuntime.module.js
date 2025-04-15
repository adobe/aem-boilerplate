/*! Copyright 2025 Adobe
All Rights Reserved. */
import { options, Fragment, Component } from "@dropins/tools/preact.js";
var i;
function t(o, e) {
  return options.__a && options.__a(e), o;
}
null != (i = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0) && i.__PREACT_DEVTOOLS__ && i.__PREACT_DEVTOOLS__.attachPreact("10.26.4", options, { Fragment, Component });
var f = 0;
function u(e, t2, n, o, i2, u2) {
  t2 || (t2 = {});
  var a, c, p = t2;
  if ("ref" in p) for (c in p = {}, t2) "ref" == c ? a = t2[c] : p[c] = t2[c];
  var l = { type: e, props: p, key: n, ref: a, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f, __i: -1, __u: 0, __source: i2, __self: u2 };
  if ("function" == typeof e && (a = e.defaultProps)) for (c in a) void 0 === p[c] && (p[c] = a[c]);
  return options.vnode && options.vnode(l), l;
}
export {
  t,
  u
};
//# sourceMappingURL=jsxRuntime.module.js.map
