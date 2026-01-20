/*! Copyright 2026 Adobe
All Rights Reserved. */
const r=o=>({countryCode:o.country_id,postCode:o.postcode||"",...o.region_id?{regionId:Number(o.region_id)}:{...o.region?{region:o.region}:{}}}),n=o=>({carrierCode:o.carrier.code||"",methodCode:o.code||"",amount:o.amount,amountExclTax:o.amountExclTax,amountInclTax:o.amountInclTax});export{r as a,n as t};
//# sourceMappingURL=transform-shipping-estimate.js.map
