/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsx as r,Fragment as h,jsxs as l}from"@dropins/tools/preact-jsx-runtime.js";/* empty css     */import{Price as s}from"@dropins/tools/components.js";const o=({amount:e,currency:p,locale:d,variant:g,sale:t,minimumAmount:i,maximumAmount:n,className:a,...c})=>r(h,{children:e||i===n?r("div",{className:"pdp-price-range",...c,children:r(s,{amount:e||i,currency:p,locale:d,variant:g,sale:t,className:a})}):l("div",{className:"pdp-price-range",...c,children:[r(s,{amount:i,currency:p,locale:d,className:a}),r("span",{className:"pdp-price-range__label",children:"-"}),r(s,{amount:n,currency:p,locale:d,className:a})]})});export{o as P};
//# sourceMappingURL=PriceRange.js.map
