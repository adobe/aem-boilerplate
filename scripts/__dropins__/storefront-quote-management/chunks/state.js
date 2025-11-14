/*! Copyright 2025 Adobe
All Rights Reserved. */
var a=(e=>(e[e.TAX_EXCLUDED=1]="TAX_EXCLUDED",e[e.TAX_INCLUDED=2]="TAX_INCLUDED",e[e.TAX_INCLUDED_AND_EXCLUDED=3]="TAX_INCLUDED_AND_EXCLUDED",e))(a||{});const D={requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1,viewQuoteTemplates:!1,manageQuoteTemplates:!1,generateQuoteFromTemplate:!1},r={quoteSummaryDisplayTotal:1,quoteSummaryMaxItems:10,quoteDisplaySettings:{zeroTax:!1,subtotal:a.TAX_INCLUDED,price:a.TAX_INCLUDED,shipping:a.TAX_INCLUDED,fullSummary:!1,grandTotal:!0},useConfigurableParentThumbnail:!0},l={authenticated:!1,permissions:D,config:r,initialized:!1,quoteDataLoaded:!1},u=new Proxy(l,{get:(e,t)=>e[t],set:(e,t,s)=>(e[t]=s,!0)});export{D,a as Q,r as a,u as s};
//# sourceMappingURL=state.js.map
