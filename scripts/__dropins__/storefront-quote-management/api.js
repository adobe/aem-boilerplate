/*! Copyright 2026 Adobe
All Rights Reserved. */
import{r as G}from"./chunks/requestNegotiableQuote.js";import{g as $}from"./chunks/getQuoteData.js";import{F as L,N as M,S as B,n as R}from"./chunks/negotiableQuotes.js";import{c as C,a as k,g as j,i as z}from"./chunks/getQuoteTemplateData.js";import{c as K,a as V,d as W,b as X,r as Y,s as Z}from"./chunks/duplicateNegotiableQuote.js";import{events as u}from"@dropins/tools/event-bus.js";import{f as m,t as c}from"./chunks/transform-quote.js";import{h as te,r as se,s as re,d as de,e as oe}from"./chunks/transform-quote.js";import{s as p}from"./chunks/state.js";import{N as A}from"./chunks/NegotiableQuoteFragment.js";import{u as ie}from"./chunks/uploadFile.js";import{Q as pe,a as ue,S as me,g as le}from"./chunks/getQuoteTemplates.js";import{b as he,c as ce,d as Ae,o as Te,s as fe,a as Ee}from"./chunks/openQuoteTemplate.js";import{a as T}from"./chunks/transform-quote-template.js";import{N as f}from"./chunks/NegotiableQuoteTemplateFragment.js";import{a as Ie,r as _e,u as Ne}from"./chunks/addQuoteTemplateLineItemNote.js";import{g as De}from"./chunks/generateQuoteFromTemplate.js";import{r as we,s as ve,u as Fe}from"./chunks/setLineItemNote.js";import"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const E=`
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
  ${A}
`;function Q(e){const{additionalInput:r,...t}=e,s={city:t.city,company:t.company,country_code:t.countryCode,firstname:t.firstname,lastname:t.lastname,postcode:t.postcode,region:t.region,region_id:t.regionId,save_in_address_book:t.saveInAddressBook,street:t.street,telephone:t.telephone};return{...r||{},...s}}const x=async e=>{const{quoteUid:r,addressId:t,addressData:s}=e;if(!r)throw new Error("Quote UID is required");if(t===void 0&&!s)throw new Error("Either addressId or addressData must be provided");if(t!==void 0&&s)throw new Error("Cannot provide both addressId and addressData");const l=s?Q(s):null;return m(E,{variables:{quoteUid:r,addressId:t||null,addressData:l}}).then(o=>{var i,n;const{errors:a}=o;if(a){const g=a.map(h=>h.message).join("; ");throw new Error(`Failed to set shipping address: ${g}`)}const d=c((n=(i=o.data)==null?void 0:i.setNegotiableQuoteShippingAddress)==null?void 0:n.quote);if(!d)throw new Error("Failed to transform quote data: Invalid response structure");return u.emit("quote-management/shipping-address-set",{quote:d,input:{quoteUid:r,addressId:t,addressData:s}}),d})},I=`
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
  
  ${f}
`,q=async e=>{var r;if(!e.templateId)throw new Error("Template ID is required");if(!e.shippingAddress)throw new Error("Shipping address is required");if(!p.authenticated)throw new Error("Unauthorized");if(!e.shippingAddress.address&&!e.shippingAddress.customerAddressUid)throw new Error("Either address or customerAddressUid must be provided");try{const t=await m(I,{variables:{templateId:e.templateId,shippingAddress:{address:e.shippingAddress.address?{city:e.shippingAddress.address.city,company:e.shippingAddress.address.company,country_code:e.shippingAddress.address.countryCode,fax:e.shippingAddress.address.fax,firstname:e.shippingAddress.address.firstname,lastname:e.shippingAddress.address.lastname,middlename:e.shippingAddress.address.middlename,postcode:e.shippingAddress.address.postcode,prefix:e.shippingAddress.address.prefix,region:e.shippingAddress.address.region,region_id:e.shippingAddress.address.regionId,save_in_address_book:e.shippingAddress.address.saveInAddressBook,street:e.shippingAddress.address.street,suffix:e.shippingAddress.address.suffix,telephone:e.shippingAddress.address.telephone,vat_id:e.shippingAddress.address.vatId}:void 0,customer_address_uid:e.shippingAddress.customerAddressUid,customer_notes:e.shippingAddress.customerNotes}}});if(!((r=t==null?void 0:t.data)!=null&&r.setNegotiableQuoteTemplateShippingAddress))throw new Error("No quote template data received");const s=T(t.data.setNegotiableQuoteTemplateShippingAddress);if(!s)throw new Error("Failed to transform quote template data");return u.emit("quote-management/quote-template-data",{quoteTemplate:s,permissions:p.permissions}),s}catch(t){return Promise.reject(t)}};export{L as FilterMatchTypeEnum,M as NegotiableQuoteSortableField,pe as QuoteTemplateFilterStatus,ue as QuoteTemplateSortField,me as SortDirection,B as SortEnum,he as acceptQuoteTemplate,Ie as addQuoteTemplateLineItemNote,q as addQuoteTemplateShippingAddress,ce as cancelQuoteTemplate,K as closeNegotiableQuote,C as config,V as createQuoteTemplate,W as deleteQuote,Ae as deleteQuoteTemplate,X as duplicateQuote,m as fetchGraphQl,De as generateQuoteFromTemplate,te as getConfig,$ as getQuoteData,k as getQuoteTemplateData,le as getQuoteTemplates,j as getStoreConfig,z as initialize,R as negotiableQuotes,Te as openQuoteTemplate,se as removeFetchGraphQlHeader,we as removeNegotiableQuoteItems,_e as removeQuoteTemplateItems,Y as renameNegotiableQuote,G as requestNegotiableQuote,Z as sendForReview,fe as sendQuoteTemplateForReview,re as setEndpoint,de as setFetchGraphQlHeader,oe as setFetchGraphQlHeaders,ve as setLineItemNote,Ee as setQuoteTemplateExpirationDate,x as setShippingAddress,Fe as updateQuantities,Ne as updateQuoteTemplateItemQuantities,ie as uploadFile};
//# sourceMappingURL=api.js.map
