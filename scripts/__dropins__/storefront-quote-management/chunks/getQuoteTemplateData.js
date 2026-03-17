/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as g}from"@dropins/tools/lib.js";import{events as n}from"@dropins/tools/event-bus.js";import{s as o,D as l,a as _,Q as s}from"./state.js";import{g as c}from"./getQuoteData.js";import{f as p}from"./transform-quote.js";import{a as f}from"./transform-quote-template.js";import{N as d}from"./NegotiableQuoteTemplateFragment.js";function T(e){if(!e||typeof e!="object")return{requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1,viewQuoteTemplates:!1,manageQuoteTemplates:!1,generateQuoteFromTemplate:!1};if(e.all===!0)return{requestQuote:!0,editQuote:!0,deleteQuote:!0,checkoutQuote:!0,viewQuoteTemplates:!0,manageQuoteTemplates:!0,generateQuoteFromTemplate:!0};const a=e["Magento_NegotiableQuote::all"]===!0,t=e["Magento_NegotiableQuoteTemplate::all"]===!0,i=a||e["Magento_NegotiableQuote::manage"]===!0;return{requestQuote:i,editQuote:i,deleteQuote:i,checkoutQuote:a||e["Magento_NegotiableQuote::checkout"]===!0,viewQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::view_template"]===!0,manageQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::manage"]===!0,generateQuoteFromTemplate:t||e["Magento_NegotiableQuoteTemplate::generate_quote"]===!0}}function u(e){if(o.quoteDataLoaded)return;const a=m.config.getConfig(),{quoteId:t,quoteTemplateId:i}=a;!e.editQuote||!t&&!i||(o.quoteDataLoaded=!0,t&&c(t).then(r=>{o.quoteDataInitialized||n.emit("quote-management/quote-data/initialized",{quote:r,permissions:e}),o.quoteDataInitialized=!0}).catch(r=>{o.quoteDataLoaded=!1,n.emit("quote-management/quote-data/error",{error:r})}),i&&D(i).catch(r=>{o.quoteDataLoaded=!1,n.emit("quote-management/quote-template-data/error",{error:r})}))}const m=new g({init:async e=>{const a={};m.config.setConfig({...a,...e}),await q().then(t=>{o.config=t}).catch(t=>{console.error("Failed to fetch store config: ",t),o.config=_}),o.initialized=!0,n.emit("quote-management/initialized",{config:o.config})},listeners:()=>[n.on("authenticated",async e=>{o.authenticated=!!e,e||(o.permissions=l,o.quoteDataLoaded=!1,n.emit("quote-management/permissions",l))},{eager:!0}),n.on("auth/permissions",async e=>{const a=T(e);o.permissions=a,o.quoteDataLoaded=!1,n.emit("quote-management/permissions",o.permissions)},{eager:!0}),n.on("quote-management/permissions",async e=>{o.initialized&&u(e)},{eager:!0}),n.on("quote-management/initialized",async()=>{u(o.permissions)},{eager:!0}),n.on("checkout/updated",async e=>{o.initialized&&(e==null?void 0:e.type)==="quote"&&(o.quoteDataLoaded=!1,u(o.permissions))},{eager:!0})]}),w=m.config;function h(e){if(!e)return _;const a=t=>[s.TAX_EXCLUDED,s.TAX_INCLUDED,s.TAX_INCLUDED_AND_EXCLUDED].includes(t)?t:s.TAX_EXCLUDED;return{quoteSummaryDisplayTotal:e.cart_summary_display_quantity,quoteSummaryMaxItems:e.max_items_in_order_summary,quoteDisplaySettings:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:a(e.shopping_cart_display_subtotal),price:a(e.shopping_cart_display_price),shipping:a(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent",quoteMinimumAmount:e.quote_minimum_amount??null,quoteMinimumAmountMessage:e.quote_minimum_amount_message??null}}const Q=`
  query STORE_CONFIG_QUERY {
    storeConfig {
      cart_summary_display_quantity
      max_items_in_order_summary
      shopping_cart_display_full_summary
      shopping_cart_display_grand_total
      shopping_cart_display_price
      shopping_cart_display_shipping
      shopping_cart_display_subtotal
      shopping_cart_display_zero_tax
      configurable_thumbnail_source
      quote_minimum_amount
      quote_minimum_amount_message
    }
  }
`,q=async()=>p(Q,{method:"GET",cache:"force-cache"}).then(({errors:e,data:a})=>{if(e){const t=e.map(i=>i.message).join(", ");throw new Error(`Failed to get store config: ${t}`)}return h(a.storeConfig)}),E=`
  query QUOTE_TEMPLATE_DATA_QUERY($templateId: ID!) {
    negotiableQuoteTemplate(templateId: $templateId) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${d}
`,D=async e=>{var a;if(!o.authenticated)throw new Error("Unauthorized");if(!e)throw new Error("Template ID is required");try{const t=await p(E,{variables:{templateId:e}});if(!((a=t==null?void 0:t.data)!=null&&a.negotiableQuoteTemplate))throw new Error("Quote template not found");const i=f(t.data.negotiableQuoteTemplate);if(!i)throw new Error("Failed to transform quote template data");return n.emit("quote-management/quote-template-data",{quoteTemplate:i,permissions:o.permissions}),i}catch(t){return Promise.reject(t)}};export{D as a,w as c,q as g,m as i};
//# sourceMappingURL=getQuoteTemplateData.js.map
