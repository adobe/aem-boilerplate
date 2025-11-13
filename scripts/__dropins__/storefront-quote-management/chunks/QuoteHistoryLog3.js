/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsx as o}from"@dropins/tools/preact-jsx-runtime.js";import{useState as m,useEffect as i}from"@dropins/tools/preact-compat.js";import{events as n}from"@dropins/tools/event-bus.js";import{Q as f}from"./QuoteHistoryLog.js";const Q=({quoteData:r,...s})=>{const[e,a]=m(r);return i(()=>{const t=n.on("quote-management/quote-data",u=>{a(u.quote)},{eager:!0});return()=>t==null?void 0:t.off()},[]),e?o("div",{...s,children:o(f,{history:e.history,items:e.items,buyer:e.buyer,salesRepName:e.salesRepName})}):null};export{Q};
//# sourceMappingURL=QuoteHistoryLog3.js.map
