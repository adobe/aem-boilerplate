/*! Copyright 2025 Adobe
All Rights Reserved. */
var t=(e=>(e[e.TAX_INCLUDED=1]="TAX_INCLUDED",e[e.TAX_EXCLUDED=2]="TAX_EXCLUDED",e[e.TAX_INCLUDED_AND_EXCLUDED=3]="TAX_INCLUDED_AND_EXCLUDED",e))(t||{});const E={requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1},r={quoteDisplaySettings:{zeroTax:!1,subtotal:t.TAX_INCLUDED,price:t.TAX_INCLUDED,shipping:t.TAX_INCLUDED,fullSummary:!1,grandTotal:!0}},a={authenticated:!1,permissions:E,config:r},_=new Proxy(a,{get:(e,D)=>e[D],set:(e,D,s)=>(e[D]=s,!0)});export{E as D,t as Q,_ as s};
//# sourceMappingURL=state.js.map
