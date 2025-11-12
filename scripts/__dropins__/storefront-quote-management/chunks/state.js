/*! Copyright 2025 Adobe
All Rights Reserved. */
var t=(e=>(e[e.TAX_EXCLUDED=1]="TAX_EXCLUDED",e[e.TAX_INCLUDED=2]="TAX_INCLUDED",e[e.TAX_INCLUDED_AND_EXCLUDED=3]="TAX_INCLUDED_AND_EXCLUDED",e))(t||{});const D={requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1},r={quoteSummaryDisplayTotal:1,quoteSummaryMaxItems:10,quoteDisplaySettings:{zeroTax:!1,subtotal:t.TAX_INCLUDED,price:t.TAX_INCLUDED,shipping:t.TAX_INCLUDED,fullSummary:!1,grandTotal:!0},useConfigurableParentThumbnail:!0},E={authenticated:!1,permissions:D,config:r},_=new Proxy(E,{get:(e,a)=>e[a],set:(e,a,s)=>(e[a]=s,!0)});export{D,t as Q,r as a,_ as s};
//# sourceMappingURL=state.js.map
