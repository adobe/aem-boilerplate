/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsx as o}from"@dropins/tools/preact-jsx-runtime.js";import{useState as u,useEffect as i}from"@dropins/tools/preact-compat.js";import{events as p}from"@dropins/tools/event-bus.js";import{Q as n}from"./QuoteHistoryLog.js";const g=({templateData:r,...a})=>{const[e,s]=u(r);return i(()=>{const t=p.on("quote-management/quote-template-data",m=>{s(m.quoteTemplate)},{eager:!0});return()=>t==null?void 0:t.off()},[]),e?o("div",{...a,children:o(n,{history:e.history,items:e.items,buyer:e.buyer,salesRepName:e.salesRepName})}):null};export{g as Q};
//# sourceMappingURL=QuoteTemplateHistoryLog.js.map
