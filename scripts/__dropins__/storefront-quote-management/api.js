/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as a,D as l,a as h,Q as c}from"./chunks/state.js";import{events as i}from"@dropins/tools/event-bus.js";import{f as s,t as Q}from"./chunks/transform-quote.js";import{d as Qe,r as we,s as Ne,b as Ae,c as qe}from"./chunks/transform-quote.js";import{r as ye,u as Ue}from"./chunks/uploadFile.js";import{g as w}from"./chunks/renameNegotiableQuote.js";import{c as De,d as Me,r as Se,s as ve}from"./chunks/renameNegotiableQuote.js";import{F as Pe,N as Le,S as Ce,n as $e}from"./chunks/negotiableQuotes.js";import{N}from"./chunks/NegotiableQuoteFragment.js";import{t as u}from"./chunks/getQuoteTemplates.js";import{Q as xe,a as Ge,S as ze,g as je}from"./chunks/getQuoteTemplates.js";import{u as ke}from"./chunks/updateQuantities.js";import{Initializer as A}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const T=new A({init:async t=>{const r={};T.config.setConfig({...r,...t}),await L().then(e=>{a.config=e}).catch(e=>{console.error("Failed to fetch store config: ",e),a.config=h})},listeners:()=>[i.on("authenticated",async t=>{a.authenticated=!!t,t?F().then(r=>{a.permissions={requestQuote:r.permissions.canRequestQuote,editQuote:r.permissions.canEditQuote,deleteQuote:r.permissions.canDeleteQuote,checkoutQuote:r.permissions.canCheckoutQuote},i.emit("quote-management/permissions",a.permissions)}).catch(r=>{console.error(r),a.permissions=l,i.emit("quote-management/permissions",l)}):(a.permissions=l,i.emit("quote-management/permissions",l))},{eager:!0}),i.on("quote-management/permissions",async t=>{const r=T.config.getConfig().quoteId;r&&t.editQuote&&w(r).then(e=>{i.emit("quote-management/quote-data/initialized",{quote:e,permissions:t},{})}).catch(e=>{i.emit("quote-management/quote-data/error",{error:e})})},{eager:!0})]}),ie=T.config,q=`
    fragment CUSTOMER_FRAGMENT on Customer {
        role {
            permissions {
                text
                children {
                    text
                    children {
                        text
                        children {
                            text
                        }
                    }
                }
            }
        }
    }
`,b=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${q}
`;function y(t){if(!t)return h;const r=e=>[c.TAX_EXCLUDED,c.TAX_INCLUDED,c.TAX_INCLUDED_AND_EXCLUDED].includes(e)?e:c.TAX_EXCLUDED;return{quoteSummaryDisplayTotal:t.cart_summary_display_quantity,quoteSummaryMaxItems:t.max_items_in_order_summary,quoteDisplaySettings:{zeroTax:t.shopping_cart_display_zero_tax,subtotal:r(t.shopping_cart_display_subtotal),price:r(t.shopping_cart_display_price),shipping:r(t.shopping_cart_display_shipping),fullSummary:t.shopping_cart_display_full_summary,grandTotal:t.shopping_cart_display_grand_total},useConfigurableParentThumbnail:t.configurable_thumbnail_source==="parent"}}const U="All/Quotes/View/Request, Edit, Delete",O="All/Quotes/View/Request, Edit, Delete",D="All/Quotes/View/Request, Edit, Delete",M="All/Quotes/View/Checkout with quote",S=t=>{const r=[],e=(o,d=[])=>{for(const n of o){const p=[...d,n.text];n.children&&n.children.length>0?e(n.children,p):r.push(p.join("/"))}};return e(t),r};function v(t){const{role:r}=t;if(!r)return{permissions:{canRequestQuote:l.requestQuote,canEditQuote:l.editQuote,canDeleteQuote:l.deleteQuote,canCheckoutQuote:l.checkoutQuote}};const{permissions:e}=r,o=S(e);return{permissions:{canRequestQuote:o.includes(U),canEditQuote:o.includes(O),canDeleteQuote:o.includes(D),canCheckoutQuote:o.includes(M)}}}const F=async()=>{var t;if(!a.authenticated)return Promise.reject(new Error("Unauthorized"));try{const r=await s(b);if(!((t=r==null?void 0:r.data)!=null&&t.customer))throw new Error("No customer data received");return v(r.data.customer)}catch(r){return Promise.reject(r)}},P=`
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
`,L=async()=>s(P,{method:"GET",cache:"force-cache"}).then(({errors:t,data:r})=>{if(t){const e=t.map(o=>o.message).join(", ");throw new Error(`Failed to get store config: ${e}`)}return y(r.storeConfig)}),C=`
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
`;function $(t){const{additionalInput:r,...e}=t,o={city:e.city,company:e.company,country_code:e.countryCode,firstname:e.firstname,lastname:e.lastname,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook,street:e.street,telephone:e.telephone};return{...r||{},...o}}const ne=async t=>{const{quoteUid:r,addressId:e,addressData:o}=t;if(!r)throw new Error("Quote UID is required");if(e===void 0&&!o)throw new Error("Either addressId or addressData must be provided");if(e!==void 0&&o)throw new Error("Cannot provide both addressId and addressData");const d=o?$(o):null;return s(C,{variables:{quoteUid:r,addressId:e||null,addressData:d}}).then(n=>{var E,g;const{errors:p}=n;if(p){const I=p.map(f=>f.message).join("; ");throw new Error(`Failed to set shipping address: ${I}`)}const _=Q((g=(E=n.data)==null?void 0:E.setNegotiableQuoteShippingAddress)==null?void 0:g.quote);if(!_)throw new Error("Failed to transform quote data: Invalid response structure");return i.emit("quote-management/shipping-address-set",{quote:_,input:{quoteUid:r,addressId:e,addressData:o}}),_})},m=`
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
`,R=`
  query QUOTE_TEMPLATE_DATA_QUERY($templateId: ID!) {
    negotiableQuoteTemplate(templateId: $templateId) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,se=async t=>{var r;if(!a.authenticated)throw new Error("Unauthorized");if(!t)throw new Error("Template ID is required");try{const e=await s(R,{variables:{templateId:t}});if(!((r=e==null?void 0:e.data)!=null&&r.negotiableQuoteTemplate))throw new Error("Quote template not found");const o=u(e.data.negotiableQuoteTemplate);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(e){return Promise.reject(e)}},x=`
  mutation CREATE_QUOTE_TEMPLATE_MUTATION($cartId: ID!) {
    requestNegotiableQuoteTemplateFromQuote(input: { cart_id: $cartId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,de=async t=>{var r;if(!a.authenticated)throw new Error("Unauthorized");if(!t)throw new Error("Cart ID is required");try{const e=await s(x,{variables:{cartId:t}});if(!((r=e==null?void 0:e.data)!=null&&r.requestNegotiableQuoteTemplateFromQuote))throw new Error("Failed to create quote template");const o=u(e.data.requestNegotiableQuoteTemplateFromQuote);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(e){return Promise.reject(e)}},G=`
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
`,ue=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!a.authenticated)throw new Error("Unauthorized");try{const e=await s(G,{variables:{templateId:t.templateId,name:t.name,comment:t.comment}});if(!((r=e==null?void 0:e.data)!=null&&r.submitNegotiableQuoteTemplateForReview))throw new Error("No quote template data received");const o=u(e.data.submitNegotiableQuoteTemplateForReview);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(e){return Promise.reject(e)}},z=`
  mutation ACCEPT_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    acceptNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${m}
`,me=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!a.authenticated)throw new Error("Unauthorized");try{const e=await s(z,{variables:{templateId:t.templateId}});if(!((r=e==null?void 0:e.data)!=null&&r.acceptNegotiableQuoteTemplate))throw new Error("No quote template data received");const o=u(e.data.acceptNegotiableQuoteTemplate);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(e){return Promise.reject(e)}},j=`
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
`,le=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!a.authenticated)throw new Error("Unauthorized");try{const e=await s(j,{variables:{templateId:t.templateId,comment:t.comment}});if(!((r=e==null?void 0:e.data)!=null&&r.cancelNegotiableQuoteTemplate))throw new Error("No quote template data received");const o=u(e.data.cancelNegotiableQuoteTemplate);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(e){return Promise.reject(e)}},B=`
  mutation DELETE_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    deleteNegotiableQuoteTemplate(input: { template_id: $templateId })
  }
`,pe=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!a.authenticated)throw new Error("Unauthorized");try{const e=await s(B,{variables:{templateId:t.templateId}});if(e!=null&&e.errors&&e.errors.length>0){const d=e.errors.map(n=>n==null?void 0:n.message).filter(Boolean).join("; ");throw new Error(d||"Failed to delete quote template")}if(!((r=e==null?void 0:e.data)==null?void 0:r.deleteNegotiableQuoteTemplate))throw new Error("Failed to delete quote template");return i.emit("quote-management/quote-template-deleted",{templateId:t.templateId}),{templateId:t.templateId}}catch(e){return Promise.reject(e)}},k=`
  mutation OPEN_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    openNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,ce=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!a.authenticated)throw new Error("Unauthorized");try{const e=await s(k,{variables:{templateId:t.templateId}});if(!((r=e==null?void 0:e.data)!=null&&r.openNegotiableQuoteTemplate))throw new Error("No quote template data received");const o=u(e.data.openNegotiableQuoteTemplate);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(e){return Promise.reject(e)}},V=`
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
`,_e=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!t.shippingAddress)throw new Error("Shipping address is required");if(!a.authenticated)throw new Error("Unauthorized");if(!t.shippingAddress.address&&!t.shippingAddress.customerAddressUid)throw new Error("Either address or customerAddressUid must be provided");try{const e=await s(V,{variables:{templateId:t.templateId,shippingAddress:{address:t.shippingAddress.address?{city:t.shippingAddress.address.city,company:t.shippingAddress.address.company,country_code:t.shippingAddress.address.countryCode,fax:t.shippingAddress.address.fax,firstname:t.shippingAddress.address.firstname,lastname:t.shippingAddress.address.lastname,middlename:t.shippingAddress.address.middlename,postcode:t.shippingAddress.address.postcode,prefix:t.shippingAddress.address.prefix,region:t.shippingAddress.address.region,region_id:t.shippingAddress.address.regionId,save_in_address_book:t.shippingAddress.address.saveInAddressBook,street:t.shippingAddress.address.street,suffix:t.shippingAddress.address.suffix,telephone:t.shippingAddress.address.telephone,vat_id:t.shippingAddress.address.vatId}:void 0,customer_address_uid:t.shippingAddress.customerAddressUid,customer_notes:t.shippingAddress.customerNotes}}});if(!((r=e==null?void 0:e.data)!=null&&r.setNegotiableQuoteTemplateShippingAddress))throw new Error("No quote template data received");const o=u(e.data.setNegotiableQuoteTemplateShippingAddress);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(e){return Promise.reject(e)}},H=`
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
`,Te=async t=>{var r,e;if(!t.templateId)throw new Error("Template ID is required");if(!t.items||t.items.length===0)throw new Error("Items array is required and must not be empty");if(!a.authenticated)throw new Error("Unauthorized");try{const o=await s(H,{variables:{input:{template_id:t.templateId,items:t.items.map(n=>({item_id:n.itemId,quantity:n.quantity,min_qty:n.minQty,max_qty:n.maxQty}))}}});if(!((e=(r=o==null?void 0:o.data)==null?void 0:r.updateNegotiableQuoteTemplateQuantities)!=null&&e.quote_template))throw new Error("No quote template data received");const d=u(o.data.updateNegotiableQuoteTemplateQuantities.quote_template);if(!d)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:d,permissions:a.permissions}),d}catch(o){return Promise.reject(o)}},X=`
  mutation REMOVE_NEGOTIABLE_QUOTE_TEMPLATE_ITEMS_MUTATION(
    $input: RemoveNegotiableQuoteTemplateItemsInput!
  ) {
    removeNegotiableQuoteTemplateItems(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,Ee=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!t.itemUids||t.itemUids.length===0)throw new Error("Item UIDs array is required and must not be empty");if(!a.authenticated)throw new Error("Unauthorized");try{const e=await s(X,{variables:{input:{template_id:t.templateId,item_uids:t.itemUids}}});if(!((r=e==null?void 0:e.data)!=null&&r.removeNegotiableQuoteTemplateItems))throw new Error("No quote template data received");const o=u(e.data.removeNegotiableQuoteTemplateItems);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(e){return Promise.reject(e)}},Y=`
  mutation SET_QUOTE_TEMPLATE_LINE_ITEM_NOTE_MUTATION(
    $input: QuoteTemplateLineItemNoteInput!
  ) {
    setQuoteTemplateLineItemNote(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,ge=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!t.itemId)throw new Error("Item ID is required");if(!a.authenticated)throw new Error("Unauthorized");try{const e=await s(Y,{variables:{input:{templateId:t.templateId,item_id:t.itemId,note:t.note}}});if(!((r=e==null?void 0:e.data)!=null&&r.setQuoteTemplateLineItemNote))throw new Error("No quote template data received");const o=u(e.data.setQuoteTemplateLineItemNote);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(e){return Promise.reject(e)}},W=`
  mutation GENERATE_NEGOTIABLE_QUOTE_FROM_TEMPLATE_MUTATION(
    $input: GenerateNegotiableQuoteFromTemplateInput!
  ) {
    generateNegotiableQuoteFromTemplate(input: $input) {
      negotiable_quote_uid
    }
  }
`,he=async t=>{var r,e;if(!t.templateId)throw new Error("Template ID is required");if(!a.authenticated)throw new Error("Unauthorized");try{const o=await s(W,{variables:{input:{template_id:t.templateId}}});if(!((e=(r=o==null?void 0:o.data)==null?void 0:r.generateNegotiableQuoteFromTemplate)!=null&&e.negotiable_quote_uid))throw new Error("No quote UID received");const d=o.data.generateNegotiableQuoteFromTemplate.negotiable_quote_uid;return i.emit("quote-management/quote-template-generated",{quoteId:d}),{quoteId:d}}catch(o){return Promise.reject(o)}};export{Pe as FilterMatchTypeEnum,Le as NegotiableQuoteSortableField,xe as QuoteTemplateFilterStatus,Ge as QuoteTemplateSortField,ze as SortDirection,Ce as SortEnum,me as acceptQuoteTemplate,ge as addQuoteTemplateLineItemNote,_e as addQuoteTemplateShippingAddress,le as cancelQuoteTemplate,De as closeNegotiableQuote,ie as config,de as createQuoteTemplate,Me as deleteQuote,pe as deleteQuoteTemplate,s as fetchGraphQl,he as generateQuoteFromTemplate,Qe as getConfig,F as getCustomerData,w as getQuoteData,se as getQuoteTemplateData,je as getQuoteTemplates,L as getStoreConfig,T as initialize,$e as negotiableQuotes,ce as openQuoteTemplate,we as removeFetchGraphQlHeader,Ee as removeQuoteTemplateItems,Se as renameNegotiableQuote,ye as requestNegotiableQuote,ve as sendForReview,ue as sendQuoteTemplateForReview,Ne as setEndpoint,Ae as setFetchGraphQlHeader,qe as setFetchGraphQlHeaders,ne as setShippingAddress,ke as updateQuantities,Te as updateQuoteTemplateItemQuantities,Ue as uploadFile};
//# sourceMappingURL=api.js.map
