/*! Copyright 2025 Adobe
All Rights Reserved. */
import{r as ae}from"./chunks/requestNegotiableQuote.js";import{g as A}from"./chunks/duplicateNegotiableQuote.js";import{c as ie,a as se,d as ne,b as de,r as ue,s as me}from"./chunks/duplicateNegotiableQuote.js";import{F as le,N as ce,S as ge,n as _e}from"./chunks/negotiableQuotes.js";import{events as i}from"@dropins/tools/event-bus.js";import{s as r,D as E,a as f,Q as p}from"./chunks/state.js";import{f as d,t as q}from"./chunks/transform-quote.js";import{e as he,r as Ee,s as fe,c as Qe,d as Ie}from"./chunks/transform-quote.js";import{N}from"./chunks/NegotiableQuoteFragment.js";import{u as qe}from"./chunks/uploadFile.js";import{a as u}from"./chunks/transform-quote-template.js";import{N as m}from"./chunks/NegotiableQuoteTemplateFragment.js";import{Q as we,a as De,S as be,g as ye}from"./chunks/getQuoteTemplates.js";import{a as Se,o as Oe,s as Me}from"./chunks/openQuoteTemplate.js";import{a as Fe}from"./chunks/addQuoteTemplateLineItemNote.js";import{g as Pe}from"./chunks/generateQuoteFromTemplate.js";import{r as xe,s as Ce,u as Ge}from"./chunks/setLineItemNote.js";import{Initializer as w}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";function D(e){if(!e||typeof e!="object")return{requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1,viewQuoteTemplates:!1,manageQuoteTemplates:!1,generateQuoteFromTemplate:!1};if(e.all===!0)return{requestQuote:!0,editQuote:!0,deleteQuote:!0,checkoutQuote:!0,viewQuoteTemplates:!0,manageQuoteTemplates:!0,generateQuoteFromTemplate:!0};const a=e["Magento_NegotiableQuote::all"]===!0,t=e["Magento_NegotiableQuoteTemplate::all"]===!0,o=a||e["Magento_NegotiableQuote::manage"]===!0;return{requestQuote:o,editQuote:o,deleteQuote:o,checkoutQuote:a||e["Magento_NegotiableQuote::checkout"]===!0,viewQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::view_template"]===!0,manageQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::manage"]===!0,generateQuoteFromTemplate:t||e["Magento_NegotiableQuoteTemplate::generate_quote"]===!0}}function c(e){if(r.quoteDataLoaded)return;const a=g.config.getConfig(),{quoteId:t,quoteTemplateId:o}=a;!e.editQuote||!t&&!o||(r.quoteDataLoaded=!0,t&&A(t).then(s=>{r.quoteDataInitialized||i.emit("quote-management/quote-data/initialized",{quote:s,permissions:e}),r.quoteDataInitialized=!0}).catch(s=>{r.quoteDataLoaded=!1,i.emit("quote-management/quote-data/error",{error:s})}),o&&L(o).catch(s=>{r.quoteDataLoaded=!1,i.emit("quote-management/quote-template-data/error",{error:s})}))}const g=new w({init:async e=>{const a={};g.config.setConfig({...a,...e}),await U().then(t=>{r.config=t}).catch(t=>{console.error("Failed to fetch store config: ",t),r.config=f}),r.initialized=!0,i.emit("quote-management/initialized",{})},listeners:()=>[i.on("authenticated",async e=>{r.authenticated=!!e,e||(r.permissions=E,r.quoteDataLoaded=!1,i.emit("quote-management/permissions",E))},{eager:!0}),i.on("auth/permissions",async e=>{const a=D(e);r.permissions=a,r.quoteDataLoaded=!1,i.emit("quote-management/permissions",r.permissions)},{eager:!0}),i.on("quote-management/permissions",async e=>{r.initialized&&c(e)},{eager:!0}),i.on("quote-management/initialized",async()=>{c(r.permissions)},{eager:!0}),i.on("checkout/updated",async e=>{r.initialized&&(e==null?void 0:e.type)==="quote"&&(r.quoteDataLoaded=!1,c(r.permissions))},{eager:!0})]}),Y=g.config;function b(e){if(!e)return f;const a=t=>[p.TAX_EXCLUDED,p.TAX_INCLUDED,p.TAX_INCLUDED_AND_EXCLUDED].includes(t)?t:p.TAX_EXCLUDED;return{quoteSummaryDisplayTotal:e.cart_summary_display_quantity,quoteSummaryMaxItems:e.max_items_in_order_summary,quoteDisplaySettings:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:a(e.shopping_cart_display_subtotal),price:a(e.shopping_cart_display_price),shipping:a(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent"}}const y=`
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
    }
  }
`,U=async()=>d(y,{method:"GET",cache:"force-cache"}).then(({errors:e,data:a})=>{if(e){const t=e.map(o=>o.message).join(", ");throw new Error(`Failed to get store config: ${t}`)}return b(a.storeConfig)}),S=`
  mutation SET_NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_MUTATION(
    $quoteUid: ID!
    $addressId: ID
    $addressData: NegotiableQuoteAddressInput
  ) {
    setNegotiableQuoteShippingAddress(
      input: {
        quote_uid: $quoteUid
        shipping_addresses: {
          customer_address_uid: $addressId
          address: $addressData
        }
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${N}
`;function O(e){const{additionalInput:a,...t}=e,o={city:t.city,company:t.company,country_code:t.countryCode,firstname:t.firstname,lastname:t.lastname,postcode:t.postcode,region:t.region,region_id:t.regionId,save_in_address_book:t.saveInAddressBook,street:t.street,telephone:t.telephone};return{...a||{},...o}}const V=async e=>{const{quoteUid:a,addressId:t,addressData:o}=e;if(!a)throw new Error("Quote UID is required");if(t===void 0&&!o)throw new Error("Either addressId or addressData must be provided");if(t!==void 0&&o)throw new Error("Cannot provide both addressId and addressData");const s=o?O(o):null;return d(S,{variables:{quoteUid:a,addressId:t||null,addressData:s}}).then(n=>{var T,h;const{errors:_}=n;if(_){const Q=_.map(I=>I.message).join("; ");throw new Error(`Failed to set shipping address: ${Q}`)}const l=q((h=(T=n.data)==null?void 0:T.setNegotiableQuoteShippingAddress)==null?void 0:h.quote);if(!l)throw new Error("Failed to transform quote data: Invalid response structure");return i.emit("quote-management/shipping-address-set",{quote:l,input:{quoteUid:a,addressId:t,addressData:o}}),l})},M=`
  query QUOTE_TEMPLATE_DATA_QUERY($templateId: ID!) {
    negotiableQuoteTemplate(templateId: $templateId) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,L=async e=>{var a;if(!r.authenticated)throw new Error("Unauthorized");if(!e)throw new Error("Template ID is required");try{const t=await d(M,{variables:{templateId:e}});if(!((a=t==null?void 0:t.data)!=null&&a.negotiableQuoteTemplate))throw new Error("Quote template not found");const o=u(t.data.negotiableQuoteTemplate);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:r.permissions}),o}catch(t){return Promise.reject(t)}},F=`
  mutation CANCEL_QUOTE_TEMPLATE_MUTATION(
    $templateId: ID!
    $comment: String
  ) {
    cancelNegotiableQuoteTemplate(
      input: {
        template_id: $templateId
        cancellation_comment: $comment
      }
    ) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,J=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await d(F,{variables:{templateId:e.templateId,comment:e.comment}});if(!((a=t==null?void 0:t.data)!=null&&a.cancelNegotiableQuoteTemplate))throw new Error("No quote template data received");const o=u(t.data.cancelNegotiableQuoteTemplate);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:r.permissions}),o}catch(t){return Promise.reject(t)}},v=`
  mutation DELETE_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    deleteNegotiableQuoteTemplate(input: { template_id: $templateId })
  }
`,K=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await d(v,{variables:{templateId:e.templateId}});if(t!=null&&t.errors&&t.errors.length>0){const s=t.errors.map(n=>n==null?void 0:n.message).filter(Boolean).join("; ");throw new Error(s||"Failed to delete quote template")}if(!((a=t==null?void 0:t.data)==null?void 0:a.deleteNegotiableQuoteTemplate))throw new Error("Failed to delete quote template");return i.emit("quote-management/quote-template-deleted",{templateId:e.templateId}),{templateId:e.templateId}}catch(t){return Promise.reject(t)}},P=`
  mutation SET_NEGOTIABLE_QUOTE_TEMPLATE_SHIPPING_ADDRESS_MUTATION(
    $templateId: ID!
    $shippingAddress: NegotiableQuoteTemplateShippingAddressInput!
  ) {
    setNegotiableQuoteTemplateShippingAddress(
      input: {
        template_id: $templateId
        shipping_address: $shippingAddress
      }
    ) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${m}
`,W=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!e.shippingAddress)throw new Error("Shipping address is required");if(!r.authenticated)throw new Error("Unauthorized");if(!e.shippingAddress.address&&!e.shippingAddress.customerAddressUid)throw new Error("Either address or customerAddressUid must be provided");try{const t=await d(P,{variables:{templateId:e.templateId,shippingAddress:{address:e.shippingAddress.address?{city:e.shippingAddress.address.city,company:e.shippingAddress.address.company,country_code:e.shippingAddress.address.countryCode,fax:e.shippingAddress.address.fax,firstname:e.shippingAddress.address.firstname,lastname:e.shippingAddress.address.lastname,middlename:e.shippingAddress.address.middlename,postcode:e.shippingAddress.address.postcode,prefix:e.shippingAddress.address.prefix,region:e.shippingAddress.address.region,region_id:e.shippingAddress.address.regionId,save_in_address_book:e.shippingAddress.address.saveInAddressBook,street:e.shippingAddress.address.street,suffix:e.shippingAddress.address.suffix,telephone:e.shippingAddress.address.telephone,vat_id:e.shippingAddress.address.vatId}:void 0,customer_address_uid:e.shippingAddress.customerAddressUid,customer_notes:e.shippingAddress.customerNotes}}});if(!((a=t==null?void 0:t.data)!=null&&a.setNegotiableQuoteTemplateShippingAddress))throw new Error("No quote template data received");const o=u(t.data.setNegotiableQuoteTemplateShippingAddress);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:r.permissions}),o}catch(t){return Promise.reject(t)}},$=`
  mutation UPDATE_NEGOTIABLE_QUOTE_TEMPLATE_QUANTITIES_MUTATION(
    $input: UpdateNegotiableQuoteTemplateQuantitiesInput!
  ) {
    updateNegotiableQuoteTemplateQuantities(input: $input) {
      quote_template {
        ...NegotiableQuoteTemplateFragment
      }
    }
  }
  ${m}
`,Z=async e=>{var a,t;if(!e.templateId)throw new Error("Template ID is required");if(!e.items||e.items.length===0)throw new Error("Items array is required and must not be empty");if(!r.authenticated)throw new Error("Unauthorized");try{const o=await d($,{variables:{input:{template_id:e.templateId,items:e.items.map(n=>({item_id:n.itemId,quantity:n.quantity,min_qty:n.minQty,max_qty:n.maxQty}))}}});if(!((t=(a=o==null?void 0:o.data)==null?void 0:a.updateNegotiableQuoteTemplateQuantities)!=null&&t.quote_template))throw new Error("No quote template data received");const s=u(o.data.updateNegotiableQuoteTemplateQuantities.quote_template);if(!s)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:s,permissions:r.permissions}),s}catch(o){return Promise.reject(o)}},x=`
  mutation REMOVE_NEGOTIABLE_QUOTE_TEMPLATE_ITEMS_MUTATION(
    $input: RemoveNegotiableQuoteTemplateItemsInput!
  ) {
    removeNegotiableQuoteTemplateItems(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,ee=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!e.itemUids||e.itemUids.length===0)throw new Error("Item UIDs array is required and must not be empty");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await d(x,{variables:{input:{template_id:e.templateId,item_uids:e.itemUids}}});if(!((a=t==null?void 0:t.data)!=null&&a.removeNegotiableQuoteTemplateItems))throw new Error("No quote template data received");const o=u(t.data.removeNegotiableQuoteTemplateItems);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:r.permissions}),o}catch(t){return Promise.reject(t)}};export{le as FilterMatchTypeEnum,ce as NegotiableQuoteSortableField,we as QuoteTemplateFilterStatus,De as QuoteTemplateSortField,be as SortDirection,ge as SortEnum,Se as acceptQuoteTemplate,Fe as addQuoteTemplateLineItemNote,W as addQuoteTemplateShippingAddress,J as cancelQuoteTemplate,ie as closeNegotiableQuote,Y as config,se as createQuoteTemplate,ne as deleteQuote,K as deleteQuoteTemplate,de as duplicateQuote,d as fetchGraphQl,Pe as generateQuoteFromTemplate,he as getConfig,A as getQuoteData,L as getQuoteTemplateData,ye as getQuoteTemplates,U as getStoreConfig,g as initialize,_e as negotiableQuotes,Oe as openQuoteTemplate,Ee as removeFetchGraphQlHeader,xe as removeNegotiableQuoteItems,ee as removeQuoteTemplateItems,ue as renameNegotiableQuote,ae as requestNegotiableQuote,me as sendForReview,Me as sendQuoteTemplateForReview,fe as setEndpoint,Qe as setFetchGraphQlHeader,Ie as setFetchGraphQlHeaders,Ce as setLineItemNote,V as setShippingAddress,Ge as updateQuantities,Z as updateQuoteTemplateItemQuantities,qe as uploadFile};
//# sourceMappingURL=api.js.map
