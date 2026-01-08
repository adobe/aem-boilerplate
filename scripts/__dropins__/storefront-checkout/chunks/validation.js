/*! Copyright 2026 Adobe
All Rights Reserved. */
const a={EMAIL:/^[a-z0-9,!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9,!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9-]+\.)+[a-z]{2,}$/i,NOT_EMPTY:/^(?!\s*$).+/},s=t=>a.EMAIL.test(t),e=t=>a.NOT_EMPTY.test(t),n={NOT_EMPTY:a.NOT_EMPTY.source};export{s as a,n as h,e as v};
//# sourceMappingURL=validation.js.map
