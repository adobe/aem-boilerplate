/*! Copyright 2025 Adobe
All Rights Reserved. */
import{r as ce,u as _e}from"./chunks/uploadFile.js";import{g as Q}from"./chunks/renameNegotiableQuote.js";import{c as ge,d as Ee,r as he,s as Ie}from"./chunks/renameNegotiableQuote.js";import{F as Qe,N as we,S as Ne,n as Ae}from"./chunks/negotiableQuotes.js";import{events as i}from"@dropins/tools/event-bus.js";import{D as h,Q as l,s as o,a as E}from"./chunks/state.js";import{f as n,t as w}from"./chunks/fetch-graphql.js";import{d as qe,r as ye,s as Ue,b as Oe,c as De}from"./chunks/fetch-graphql.js";import{N}from"./chunks/NegotiableQuoteFragment.js";import{t as u}from"./chunks/getQuoteTemplates.js";import{Q as ve,a as Fe,S as Pe,g as Se}from"./chunks/getQuoteTemplates.js";import{r as $e,u as Ce}from"./chunks/removeNegotiableQuoteItems.js";import{Initializer as A}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";function b(t){if(!t)return h;const r=e=>[l.TAX_EXCLUDED,l.TAX_INCLUDED,l.TAX_INCLUDED_AND_EXCLUDED].includes(e)?e:l.TAX_EXCLUDED;return{quoteSummaryDisplayTotal:t.cart_summary_display_quantity,quoteSummaryMaxItems:t.max_items_in_order_summary,quoteDisplaySettings:{zeroTax:t.shopping_cart_display_zero_tax,subtotal:r(t.shopping_cart_display_subtotal),price:r(t.shopping_cart_display_price),shipping:r(t.shopping_cart_display_shipping),fullSummary:t.shopping_cart_display_full_summary,grandTotal:t.shopping_cart_display_grand_total},useConfigurableParentThumbnail:t.configurable_thumbnail_source==="parent"}}function q(t){if(!t||typeof t!="object")return{requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1,viewQuoteTemplates:!1,manageQuoteTemplates:!1,generateQuoteFromTemplate:!1};if(t.all===!0)return{requestQuote:!0,editQuote:!0,deleteQuote:!0,checkoutQuote:!0,viewQuoteTemplates:!0,manageQuoteTemplates:!0,generateQuoteFromTemplate:!0};const r=t["Magento_NegotiableQuote::all"]===!0,e=t["Magento_NegotiableQuoteTemplate::all"]===!0,a=r||t["Magento_NegotiableQuote::manage"]===!0;return{requestQuote:a,editQuote:a,deleteQuote:a,checkoutQuote:r||t["Magento_NegotiableQuote::checkout"]===!0,viewQuoteTemplates:e||t["Magento_NegotiableQuoteTemplate::view_template"]===!0,manageQuoteTemplates:e||t["Magento_NegotiableQuoteTemplate::manage"]===!0,generateQuoteFromTemplate:e||t["Magento_NegotiableQuoteTemplate::generate_quote"]===!0}}const c=new A({init:async t=>{const r={};c.config.setConfig({...r,...t}),await U().then(e=>{o.config=e}).catch(e=>{console.error("Failed to fetch store config: ",e),o.config=h})},listeners:()=>[i.on("authenticated",async t=>{o.authenticated=!!t,t||(o.permissions=E,i.emit("quote-management/permissions",E))},{eager:!0}),i.on("auth/permissions",async t=>{const r=q(t);o.permissions=r,i.emit("quote-management/permissions",o.permissions)},{eager:!0}),i.on("quote-management/permissions",async t=>{const r=c.config.getConfig().quoteId;r&&t.editQuote&&Q(r).then(e=>{i.emit("quote-management/quote-data/initialized",{quote:e,permissions:t},{})}).catch(e=>{i.emit("quote-management/quote-data/error",{error:e})})},{eager:!0})]}),J=c.config,y=`
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
`,U=async()=>n(y,{method:"GET",cache:"force-cache"}).then(({errors:t,data:r})=>{if(t){const e=t.map(a=>a.message).join(", ");throw new Error(`Failed to get store config: ${e}`)}return b(r.storeConfig)}),O=`
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
`;function D(t){const{additionalInput:r,...e}=t,a={city:e.city,company:e.company,country_code:e.countryCode,firstname:e.firstname,lastname:e.lastname,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook,street:e.street,telephone:e.telephone};return{...r||{},...a}}const K=async t=>{const{quoteUid:r,addressId:e,addressData:a}=t;if(!r)throw new Error("Quote UID is required");if(e===void 0&&!a)throw new Error("Either addressId or addressData must be provided");if(e!==void 0&&a)throw new Error("Cannot provide both addressId and addressData");const d=a?D(a):null;return n(O,{variables:{quoteUid:r,addressId:e||null,addressData:d}}).then(s=>{var T,g;const{errors:_}=s;if(_){const I=_.map(f=>f.message).join("; ");throw new Error(`Failed to set shipping address: ${I}`)}const p=w((g=(T=s.data)==null?void 0:T.setNegotiableQuoteShippingAddress)==null?void 0:g.quote);if(!p)throw new Error("Failed to transform quote data: Invalid response structure");return i.emit("quote-management/shipping-address-set",{quote:p,input:{quoteUid:r,addressId:e,addressData:a}}),p})},m=`
  fragment NegotiableQuoteTemplateFragment on NegotiableQuoteTemplate {
    # uid
    name
    # created_at
    # updated_at
    status
    # sales_rep_name
    expiration_date
    buyer {
      firstname
      lastname
    }
    comments {
      uid
      created_at
      author {
        firstname
        lastname
      }
      text
      attachments {
        name
        url
      }
    }
    items {
      uid
      product {
        name
        sku
        uid
        stock_status
      }
      prices {
        price {
          currency
          value
        }
        original_item_price {
          currency
          value
        }
        row_total {
          currency
          value
        }
        catalog_discount {
          amount_off
          percent_off
        }
        discounts {
          label
          value
          amount {
            currency
            value
          }
        }
      }
      quantity
      note_from_buyer {
        created_at
        creator_id
        creator_type
        # negotiable_quote_template_item_uid
        note
        note_uid
      }
      note_from_seller {
        created_at
        creator_id
        creator_type
        # negotiable_quote_template_item_uid
        note
        note_uid
      }
      ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
      }
      ... on BundleCartItem {
        bundle_options {
          label
          values {
            label
            quantity
            original_price {
              currency
              value
            }
            priceV2 {
              currency
              value
            }
          }
        }
      }
    }
    history {
      uid
      created_at
      author {
        firstname
        lastname
      }
      change_type
      changes {
        comment_added {
          comment
        }
        custom_changes {
          new_value
          old_value
          title
        }
        statuses {
          changes {
            new_status
            old_status
          }
        }
        expiration {
          new_expiration
          old_expiration
        }
        total {
          new_price {
            currency
            value
          }
          old_price {
            currency
            value
          }
        }
      }
    }
    prices {
      subtotal_excluding_tax {
        currency
        value
      }
      subtotal_including_tax {
        currency
        value
      }
      subtotal_with_discount_excluding_tax {
        currency
        value
      }
      applied_taxes {
        amount {
          currency
          value
        }
        label
      }
      grand_total {
        currency
        value
      }
    }
    shipping_addresses {
      uid
      firstname
      lastname
      company
      street
      city
      region {
        code
        label
        region_id
      }
      postcode
      country {
        code
        label
      }
      telephone
    }
  }
`,M=`
  query QUOTE_TEMPLATE_DATA_QUERY($templateId: ID!) {
    negotiableQuoteTemplate(templateId: $templateId) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,Z=async t=>{var r;if(!o.authenticated)throw new Error("Unauthorized");if(!t)throw new Error("Template ID is required");try{const e=await n(M,{variables:{templateId:t}});if(!((r=e==null?void 0:e.data)!=null&&r.negotiableQuoteTemplate))throw new Error("Quote template not found");const a=u(e.data.negotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:o.permissions}),a}catch(e){return Promise.reject(e)}},v=`
  mutation CREATE_QUOTE_TEMPLATE_MUTATION($cartId: ID!) {
    requestNegotiableQuoteTemplateFromQuote(input: { cart_id: $cartId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,ee=async t=>{var r;if(!o.authenticated)throw new Error("Unauthorized");if(!t)throw new Error("Cart ID is required");try{const e=await n(v,{variables:{cartId:t}});if(!((r=e==null?void 0:e.data)!=null&&r.requestNegotiableQuoteTemplateFromQuote))throw new Error("Failed to create quote template");const a=u(e.data.requestNegotiableQuoteTemplateFromQuote);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:o.permissions}),a}catch(e){return Promise.reject(e)}},F=`
  mutation SEND_QUOTE_TEMPLATE_FOR_REVIEW_MUTATION(
    $templateId: ID!
    $comment: String
    $name: String
  ) {
    submitNegotiableQuoteTemplateForReview(input: { template_id: $templateId, name: $name, comment: $comment }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,te=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!o.authenticated)throw new Error("Unauthorized");try{const e=await n(F,{variables:{templateId:t.templateId,name:t.name,comment:t.comment}});if(!((r=e==null?void 0:e.data)!=null&&r.submitNegotiableQuoteTemplateForReview))throw new Error("No quote template data received");const a=u(e.data.submitNegotiableQuoteTemplateForReview);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:o.permissions}),a}catch(e){return Promise.reject(e)}},P=`
  mutation ACCEPT_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    acceptNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${m}
`,ae=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!o.authenticated)throw new Error("Unauthorized");try{const e=await n(P,{variables:{templateId:t.templateId}});if(!((r=e==null?void 0:e.data)!=null&&r.acceptNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=u(e.data.acceptNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:o.permissions}),a}catch(e){return Promise.reject(e)}},S=`
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
`,re=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!o.authenticated)throw new Error("Unauthorized");try{const e=await n(S,{variables:{templateId:t.templateId,comment:t.comment}});if(!((r=e==null?void 0:e.data)!=null&&r.cancelNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=u(e.data.cancelNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:o.permissions}),a}catch(e){return Promise.reject(e)}},L=`
  mutation DELETE_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    deleteNegotiableQuoteTemplate(input: { template_id: $templateId })
  }
`,oe=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!o.authenticated)throw new Error("Unauthorized");try{const e=await n(L,{variables:{templateId:t.templateId}});if(e!=null&&e.errors&&e.errors.length>0){const d=e.errors.map(s=>s==null?void 0:s.message).filter(Boolean).join("; ");throw new Error(d||"Failed to delete quote template")}if(!((r=e==null?void 0:e.data)==null?void 0:r.deleteNegotiableQuoteTemplate))throw new Error("Failed to delete quote template");return i.emit("quote-management/quote-template-deleted",{templateId:t.templateId}),{templateId:t.templateId}}catch(e){return Promise.reject(e)}},$=`
  mutation OPEN_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    openNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,ie=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!o.authenticated)throw new Error("Unauthorized");try{const e=await n($,{variables:{templateId:t.templateId}});if(!((r=e==null?void 0:e.data)!=null&&r.openNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=u(e.data.openNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:o.permissions}),a}catch(e){return Promise.reject(e)}},C=`
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
`,ne=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!t.shippingAddress)throw new Error("Shipping address is required");if(!o.authenticated)throw new Error("Unauthorized");if(!t.shippingAddress.address&&!t.shippingAddress.customerAddressUid)throw new Error("Either address or customerAddressUid must be provided");try{const e=await n(C,{variables:{templateId:t.templateId,shippingAddress:{address:t.shippingAddress.address?{city:t.shippingAddress.address.city,company:t.shippingAddress.address.company,country_code:t.shippingAddress.address.countryCode,fax:t.shippingAddress.address.fax,firstname:t.shippingAddress.address.firstname,lastname:t.shippingAddress.address.lastname,middlename:t.shippingAddress.address.middlename,postcode:t.shippingAddress.address.postcode,prefix:t.shippingAddress.address.prefix,region:t.shippingAddress.address.region,region_id:t.shippingAddress.address.regionId,save_in_address_book:t.shippingAddress.address.saveInAddressBook,street:t.shippingAddress.address.street,suffix:t.shippingAddress.address.suffix,telephone:t.shippingAddress.address.telephone,vat_id:t.shippingAddress.address.vatId}:void 0,customer_address_uid:t.shippingAddress.customerAddressUid,customer_notes:t.shippingAddress.customerNotes}}});if(!((r=e==null?void 0:e.data)!=null&&r.setNegotiableQuoteTemplateShippingAddress))throw new Error("No quote template data received");const a=u(e.data.setNegotiableQuoteTemplateShippingAddress);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:o.permissions}),a}catch(e){return Promise.reject(e)}},x=`
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
`,se=async t=>{var r,e;if(!t.templateId)throw new Error("Template ID is required");if(!t.items||t.items.length===0)throw new Error("Items array is required and must not be empty");if(!o.authenticated)throw new Error("Unauthorized");try{const a=await n(x,{variables:{input:{template_id:t.templateId,items:t.items.map(s=>({item_id:s.itemId,quantity:s.quantity,min_qty:s.minQty,max_qty:s.maxQty}))}}});if(!((e=(r=a==null?void 0:a.data)==null?void 0:r.updateNegotiableQuoteTemplateQuantities)!=null&&e.quote_template))throw new Error("No quote template data received");const d=u(a.data.updateNegotiableQuoteTemplateQuantities.quote_template);if(!d)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:d,permissions:o.permissions}),d}catch(a){return Promise.reject(a)}},G=`
  mutation REMOVE_NEGOTIABLE_QUOTE_TEMPLATE_ITEMS_MUTATION(
    $input: RemoveNegotiableQuoteTemplateItemsInput!
  ) {
    removeNegotiableQuoteTemplateItems(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,de=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!t.itemUids||t.itemUids.length===0)throw new Error("Item UIDs array is required and must not be empty");if(!o.authenticated)throw new Error("Unauthorized");try{const e=await n(G,{variables:{input:{template_id:t.templateId,item_uids:t.itemUids}}});if(!((r=e==null?void 0:e.data)!=null&&r.removeNegotiableQuoteTemplateItems))throw new Error("No quote template data received");const a=u(e.data.removeNegotiableQuoteTemplateItems);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:o.permissions}),a}catch(e){return Promise.reject(e)}},R=`
  mutation SET_QUOTE_TEMPLATE_LINE_ITEM_NOTE_MUTATION(
    $input: QuoteTemplateLineItemNoteInput!
  ) {
    setQuoteTemplateLineItemNote(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,ue=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!t.itemId)throw new Error("Item ID is required");if(!o.authenticated)throw new Error("Unauthorized");try{const e=await n(R,{variables:{input:{templateId:t.templateId,item_id:t.itemId,note:t.note}}});if(!((r=e==null?void 0:e.data)!=null&&r.setQuoteTemplateLineItemNote))throw new Error("No quote template data received");const a=u(e.data.setQuoteTemplateLineItemNote);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:o.permissions}),a}catch(e){return Promise.reject(e)}},z=`
  mutation GENERATE_NEGOTIABLE_QUOTE_FROM_TEMPLATE_MUTATION(
    $input: GenerateNegotiableQuoteFromTemplateInput!
  ) {
    generateNegotiableQuoteFromTemplate(input: $input) {
      negotiable_quote_uid
    }
  }
`,me=async t=>{var r,e;if(!t.templateId)throw new Error("Template ID is required");if(!o.authenticated)throw new Error("Unauthorized");try{const a=await n(z,{variables:{input:{template_id:t.templateId}}});if(!((e=(r=a==null?void 0:a.data)==null?void 0:r.generateNegotiableQuoteFromTemplate)!=null&&e.negotiable_quote_uid))throw new Error("No quote UID received");const d=a.data.generateNegotiableQuoteFromTemplate.negotiable_quote_uid;return i.emit("quote-management/quote-template-generated",{quoteId:d}),{quoteId:d}}catch(a){return Promise.reject(a)}};export{Qe as FilterMatchTypeEnum,we as NegotiableQuoteSortableField,ve as QuoteTemplateFilterStatus,Fe as QuoteTemplateSortField,Pe as SortDirection,Ne as SortEnum,ae as acceptQuoteTemplate,ue as addQuoteTemplateLineItemNote,ne as addQuoteTemplateShippingAddress,re as cancelQuoteTemplate,ge as closeNegotiableQuote,J as config,ee as createQuoteTemplate,Ee as deleteQuote,oe as deleteQuoteTemplate,n as fetchGraphQl,me as generateQuoteFromTemplate,qe as getConfig,Q as getQuoteData,Z as getQuoteTemplateData,Se as getQuoteTemplates,U as getStoreConfig,c as initialize,Ae as negotiableQuotes,ie as openQuoteTemplate,ye as removeFetchGraphQlHeader,$e as removeNegotiableQuoteItems,de as removeQuoteTemplateItems,he as renameNegotiableQuote,ce as requestNegotiableQuote,Ie as sendForReview,te as sendQuoteTemplateForReview,Ue as setEndpoint,Oe as setFetchGraphQlHeader,De as setFetchGraphQlHeaders,K as setShippingAddress,Ce as updateQuantities,se as updateQuoteTemplateItemQuantities,_e as uploadFile};
//# sourceMappingURL=api.js.map
