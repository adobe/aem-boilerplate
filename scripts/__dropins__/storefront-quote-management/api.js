/*! Copyright 2025 Adobe
All Rights Reserved. */
import{r as pe,u as le}from"./chunks/uploadFile.js";import{g as A}from"./chunks/renameNegotiableQuote.js";import{c as ce,a as _e,d as ge,r as Ee,s as he}from"./chunks/renameNegotiableQuote.js";import{F as fe,N as Qe,S as Ae,n as Ne}from"./chunks/negotiableQuotes.js";import{events as i}from"@dropins/tools/event-bus.js";import{s as r,D as E,a as I,Q as p}from"./chunks/state.js";import{f as n,a as N}from"./chunks/transform-quote.js";import{e as qe,r as be,s as Ue,c as De,d as ye}from"./chunks/transform-quote.js";import{N as w}from"./chunks/NegotiableQuoteFragment.js";import{a as m}from"./chunks/transform-quote-template.js";import{N as u}from"./chunks/NegotiableQuoteTemplateFragment.js";import{Q as Me,a as Le,S as Fe,g as Se}from"./chunks/getQuoteTemplates.js";import{s as ve}from"./chunks/sendQuoteTemplateForReview.js";import{r as Ge,u as Ce}from"./chunks/removeNegotiableQuoteItems.js";import{Initializer as q}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";function b(e){if(!e||typeof e!="object")return{requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1,viewQuoteTemplates:!1,manageQuoteTemplates:!1,generateQuoteFromTemplate:!1};if(e.all===!0)return{requestQuote:!0,editQuote:!0,deleteQuote:!0,checkoutQuote:!0,viewQuoteTemplates:!0,manageQuoteTemplates:!0,generateQuoteFromTemplate:!0};const o=e["Magento_NegotiableQuote::all"]===!0,t=e["Magento_NegotiableQuoteTemplate::all"]===!0,a=o||e["Magento_NegotiableQuote::manage"]===!0;return{requestQuote:a,editQuote:a,deleteQuote:a,checkoutQuote:o||e["Magento_NegotiableQuote::checkout"]===!0,viewQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::view_template"]===!0,manageQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::manage"]===!0,generateQuoteFromTemplate:t||e["Magento_NegotiableQuoteTemplate::generate_quote"]===!0}}function h(e){if(r.quoteDataLoaded)return;const o=T.config.getConfig(),{quoteId:t,quoteTemplateId:a}=o;!e.editQuote||!t&&!a||(r.quoteDataLoaded=!0,t&&A(t).then(s=>{i.emit("quote-management/quote-data/initialized",{quote:s,permissions:e})}).catch(s=>{r.quoteDataLoaded=!1,i.emit("quote-management/quote-data/error",{error:s})}),a&&F(a).catch(s=>{r.quoteDataLoaded=!1,i.emit("quote-management/quote-template-data/error",{error:s})}))}const T=new q({init:async e=>{const o={};T.config.setConfig({...o,...e}),await y().then(t=>{r.config=t}).catch(t=>{console.error("Failed to fetch store config: ",t),r.config=I}),r.initialized=!0,i.emit("quote-management/initialized",{})},listeners:()=>[i.on("authenticated",async e=>{r.authenticated=!!e,e||(r.permissions=E,r.quoteDataLoaded=!1,i.emit("quote-management/permissions",E))},{eager:!0}),i.on("auth/permissions",async e=>{const o=b(e);r.permissions=o,r.quoteDataLoaded=!1,i.emit("quote-management/permissions",r.permissions)},{eager:!0}),i.on("quote-management/permissions",async e=>{r.initialized&&h(e)},{eager:!0}),i.on("quote-management/initialized",async()=>{h(r.permissions)},{eager:!0})]}),W=T.config;function U(e){if(!e)return I;const o=t=>[p.TAX_EXCLUDED,p.TAX_INCLUDED,p.TAX_INCLUDED_AND_EXCLUDED].includes(t)?t:p.TAX_EXCLUDED;return{quoteSummaryDisplayTotal:e.cart_summary_display_quantity,quoteSummaryMaxItems:e.max_items_in_order_summary,quoteDisplaySettings:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:o(e.shopping_cart_display_subtotal),price:o(e.shopping_cart_display_price),shipping:o(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent"}}const D=`
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
`,y=async()=>n(D,{method:"GET",cache:"force-cache"}).then(({errors:e,data:o})=>{if(e){const t=e.map(a=>a.message).join(", ");throw new Error(`Failed to get store config: ${t}`)}return U(o.storeConfig)}),O=`
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
  ${w}
`;function M(e){const{additionalInput:o,...t}=e,a={city:t.city,company:t.company,country_code:t.countryCode,firstname:t.firstname,lastname:t.lastname,postcode:t.postcode,region:t.region,region_id:t.regionId,save_in_address_book:t.saveInAddressBook,street:t.street,telephone:t.telephone};return{...o||{},...a}}const Z=async e=>{const{quoteUid:o,addressId:t,addressData:a}=e;if(!o)throw new Error("Quote UID is required");if(t===void 0&&!a)throw new Error("Either addressId or addressData must be provided");if(t!==void 0&&a)throw new Error("Cannot provide both addressId and addressData");const s=a?M(a):null;return n(O,{variables:{quoteUid:o,addressId:t||null,addressData:s}}).then(d=>{var _,g;const{errors:c}=d;if(c){const f=c.map(Q=>Q.message).join("; ");throw new Error(`Failed to set shipping address: ${f}`)}const l=N((g=(_=d.data)==null?void 0:_.setNegotiableQuoteShippingAddress)==null?void 0:g.quote);if(!l)throw new Error("Failed to transform quote data: Invalid response structure");return i.emit("quote-management/shipping-address-set",{quote:l,input:{quoteUid:o,addressId:t,addressData:a}}),l})},L=`
  query QUOTE_TEMPLATE_DATA_QUERY($templateId: ID!) {
    negotiableQuoteTemplate(templateId: $templateId) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${u}
`,F=async e=>{var o;if(!r.authenticated)throw new Error("Unauthorized");if(!e)throw new Error("Template ID is required");try{const t=await n(L,{variables:{templateId:e}});if(!((o=t==null?void 0:t.data)!=null&&o.negotiableQuoteTemplate))throw new Error("Quote template not found");const a=m(t.data.negotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(t){return Promise.reject(t)}},S=`
  mutation ACCEPT_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    acceptNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${u}
`,ee=async e=>{var o;if(!e.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await n(S,{variables:{templateId:e.templateId}});if(!((o=t==null?void 0:t.data)!=null&&o.acceptNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=m(t.data.acceptNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(t){return Promise.reject(t)}},P=`
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
  ${u}
`,te=async e=>{var o;if(!e.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await n(P,{variables:{templateId:e.templateId,comment:e.comment}});if(!((o=t==null?void 0:t.data)!=null&&o.cancelNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=m(t.data.cancelNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(t){return Promise.reject(t)}},v=`
  mutation DELETE_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    deleteNegotiableQuoteTemplate(input: { template_id: $templateId })
  }
`,ae=async e=>{var o;if(!e.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await n(v,{variables:{templateId:e.templateId}});if(t!=null&&t.errors&&t.errors.length>0){const s=t.errors.map(d=>d==null?void 0:d.message).filter(Boolean).join("; ");throw new Error(s||"Failed to delete quote template")}if(!((o=t==null?void 0:t.data)==null?void 0:o.deleteNegotiableQuoteTemplate))throw new Error("Failed to delete quote template");return i.emit("quote-management/quote-template-deleted",{templateId:e.templateId}),{templateId:e.templateId}}catch(t){return Promise.reject(t)}},$=`
  mutation OPEN_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    openNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${u}
`,oe=async e=>{var o;if(!e.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await n($,{variables:{templateId:e.templateId}});if(!((o=t==null?void 0:t.data)!=null&&o.openNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=m(t.data.openNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(t){return Promise.reject(t)}},G=`
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
  
  ${u}
`,re=async e=>{var o;if(!e.templateId)throw new Error("Template ID is required");if(!e.shippingAddress)throw new Error("Shipping address is required");if(!r.authenticated)throw new Error("Unauthorized");if(!e.shippingAddress.address&&!e.shippingAddress.customerAddressUid)throw new Error("Either address or customerAddressUid must be provided");try{const t=await n(G,{variables:{templateId:e.templateId,shippingAddress:{address:e.shippingAddress.address?{city:e.shippingAddress.address.city,company:e.shippingAddress.address.company,country_code:e.shippingAddress.address.countryCode,fax:e.shippingAddress.address.fax,firstname:e.shippingAddress.address.firstname,lastname:e.shippingAddress.address.lastname,middlename:e.shippingAddress.address.middlename,postcode:e.shippingAddress.address.postcode,prefix:e.shippingAddress.address.prefix,region:e.shippingAddress.address.region,region_id:e.shippingAddress.address.regionId,save_in_address_book:e.shippingAddress.address.saveInAddressBook,street:e.shippingAddress.address.street,suffix:e.shippingAddress.address.suffix,telephone:e.shippingAddress.address.telephone,vat_id:e.shippingAddress.address.vatId}:void 0,customer_address_uid:e.shippingAddress.customerAddressUid,customer_notes:e.shippingAddress.customerNotes}}});if(!((o=t==null?void 0:t.data)!=null&&o.setNegotiableQuoteTemplateShippingAddress))throw new Error("No quote template data received");const a=m(t.data.setNegotiableQuoteTemplateShippingAddress);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(t){return Promise.reject(t)}},C=`
  mutation UPDATE_NEGOTIABLE_QUOTE_TEMPLATE_QUANTITIES_MUTATION(
    $input: UpdateNegotiableQuoteTemplateQuantitiesInput!
  ) {
    updateNegotiableQuoteTemplateQuantities(input: $input) {
      quote_template {
        ...NegotiableQuoteTemplateFragment
      }
    }
  }
  ${u}
`,ie=async e=>{var o,t;if(!e.templateId)throw new Error("Template ID is required");if(!e.items||e.items.length===0)throw new Error("Items array is required and must not be empty");if(!r.authenticated)throw new Error("Unauthorized");try{const a=await n(C,{variables:{input:{template_id:e.templateId,items:e.items.map(d=>({item_id:d.itemId,quantity:d.quantity,min_qty:d.minQty,max_qty:d.maxQty}))}}});if(!((t=(o=a==null?void 0:a.data)==null?void 0:o.updateNegotiableQuoteTemplateQuantities)!=null&&t.quote_template))throw new Error("No quote template data received");const s=m(a.data.updateNegotiableQuoteTemplateQuantities.quote_template);if(!s)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:s,permissions:r.permissions}),s}catch(a){return Promise.reject(a)}},x=`
  mutation REMOVE_NEGOTIABLE_QUOTE_TEMPLATE_ITEMS_MUTATION(
    $input: RemoveNegotiableQuoteTemplateItemsInput!
  ) {
    removeNegotiableQuoteTemplateItems(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${u}
`,se=async e=>{var o;if(!e.templateId)throw new Error("Template ID is required");if(!e.itemUids||e.itemUids.length===0)throw new Error("Item UIDs array is required and must not be empty");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await n(x,{variables:{input:{template_id:e.templateId,item_uids:e.itemUids}}});if(!((o=t==null?void 0:t.data)!=null&&o.removeNegotiableQuoteTemplateItems))throw new Error("No quote template data received");const a=m(t.data.removeNegotiableQuoteTemplateItems);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(t){return Promise.reject(t)}},R=`
  mutation SET_QUOTE_TEMPLATE_LINE_ITEM_NOTE_MUTATION(
    $input: QuoteTemplateLineItemNoteInput!
  ) {
    setQuoteTemplateLineItemNote(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${u}
`,ne=async e=>{var o;if(!e.templateId)throw new Error("Template ID is required");if(!e.itemId)throw new Error("Item ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await n(R,{variables:{input:{templateId:e.templateId,item_id:e.itemId,note:e.note}}});if(!((o=t==null?void 0:t.data)!=null&&o.setQuoteTemplateLineItemNote))throw new Error("No quote template data received");const a=m(t.data.setQuoteTemplateLineItemNote);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(t){return Promise.reject(t)}},z=`
  mutation GENERATE_NEGOTIABLE_QUOTE_FROM_TEMPLATE_MUTATION(
    $input: GenerateNegotiableQuoteFromTemplateInput!
  ) {
    generateNegotiableQuoteFromTemplate(input: $input) {
      negotiable_quote_uid
    }
  }
`,de=async e=>{var o,t;if(!e.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const a=await n(z,{variables:{input:{template_id:e.templateId}}});if(!((t=(o=a==null?void 0:a.data)==null?void 0:o.generateNegotiableQuoteFromTemplate)!=null&&t.negotiable_quote_uid))throw new Error("No quote UID received");const s=a.data.generateNegotiableQuoteFromTemplate.negotiable_quote_uid;return i.emit("quote-management/quote-template-generated",{quoteId:s}),{quoteId:s}}catch(a){return Promise.reject(a)}};export{fe as FilterMatchTypeEnum,Qe as NegotiableQuoteSortableField,Me as QuoteTemplateFilterStatus,Le as QuoteTemplateSortField,Fe as SortDirection,Ae as SortEnum,ee as acceptQuoteTemplate,ne as addQuoteTemplateLineItemNote,re as addQuoteTemplateShippingAddress,te as cancelQuoteTemplate,ce as closeNegotiableQuote,W as config,_e as createQuoteTemplate,ge as deleteQuote,ae as deleteQuoteTemplate,n as fetchGraphQl,de as generateQuoteFromTemplate,qe as getConfig,A as getQuoteData,F as getQuoteTemplateData,Se as getQuoteTemplates,y as getStoreConfig,T as initialize,Ne as negotiableQuotes,oe as openQuoteTemplate,be as removeFetchGraphQlHeader,Ge as removeNegotiableQuoteItems,se as removeQuoteTemplateItems,Ee as renameNegotiableQuote,pe as requestNegotiableQuote,he as sendForReview,ve as sendQuoteTemplateForReview,Ue as setEndpoint,De as setFetchGraphQlHeader,ye as setFetchGraphQlHeaders,Z as setShippingAddress,Ce as updateQuantities,ie as updateQuoteTemplateItemQuantities,le as uploadFile};
//# sourceMappingURL=api.js.map
