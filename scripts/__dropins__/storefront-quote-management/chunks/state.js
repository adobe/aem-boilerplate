/*! Copyright 2025 Adobe
All Rights Reserved. */
var t=(e=>(e[e.TAX_EXCLUDED=1]="TAX_EXCLUDED",e[e.TAX_INCLUDED=2]="TAX_INCLUDED",e[e.TAX_INCLUDED_AND_EXCLUDED=3]="TAX_INCLUDED_AND_EXCLUDED",e))(t||{});const r={requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1,viewQuoteTemplates:!1,manageQuoteTemplates:!1,generateQuoteFromTemplate:!1},D={quoteSummaryDisplayTotal:1,quoteSummaryMaxItems:10,quoteDisplaySettings:{zeroTax:!1,subtotal:t.TAX_INCLUDED,price:t.TAX_INCLUDED,shipping:t.TAX_INCLUDED,fullSummary:!1,grandTotal:!0},useConfigurableParentThumbnail:!0},l={authenticated:!1,permissions:r,config:D},E=new Proxy(l,{get:(e,a)=>e[a],set:(e,a,s)=>(e[a]=s,!0)});export{r as D,t as Q,D as a,E as s};
//# sourceMappingURL=state.js.map
