/*! Copyright 2025 Adobe
All Rights Reserved. */
const m=(e,a="en-US",o={})=>{const n={...{day:"2-digit",month:"2-digit",year:"numeric"},...o},t=new Date(e);return isNaN(t.getTime())?"Invalid Date":new Intl.DateTimeFormat(a,n).format(t)};export{m as f};
