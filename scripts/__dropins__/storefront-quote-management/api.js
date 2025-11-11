/*! Copyright 2025 Adobe
All Rights Reserved. */
import{D as l,s as r}from"./chunks/state.js";import{events as i}from"@dropins/tools/event-bus.js";import{f as s,t as I}from"./chunks/fetch-graphql.js";import{d as _e,r as ge,s as he,b as Ie,c as Qe}from"./chunks/fetch-graphql.js";import{r as we,u as Ne}from"./chunks/uploadFile.js";import{g as Q}from"./chunks/renameNegotiableQuote.js";import{c as qe,d as be,r as Ue,s as Oe}from"./chunks/renameNegotiableQuote.js";import{F as Me,N as De,S as ve,n as Se}from"./chunks/negotiableQuotes.js";import{N as f}from"./chunks/NegotiableQuoteFragment.js";import{t as u}from"./chunks/getQuoteTemplates.js";import{Q as Pe,a as $e,S as Le,g as Re}from"./chunks/getQuoteTemplates.js";import{u as xe}from"./chunks/updateQuantities.js";import{Initializer as w}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const N=`
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
`,A=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${N}
`,q="All/Quotes/View/Request, Edit, Delete",b="All/Quotes/View/Request, Edit, Delete",U="All/Quotes/View/Request, Edit, Delete",O="All/Quotes/View/Checkout with quote",y=t=>{const o=[],e=(a,d=[])=>{for(const n of a){const p=[...d,n.text];n.children&&n.children.length>0?e(n.children,p):o.push(p.join("/"))}};return e(t),o};function M(t){const{role:o}=t;if(!o)return{permissions:{canRequestQuote:l.requestQuote,canEditQuote:l.editQuote,canDeleteQuote:l.deleteQuote,canCheckoutQuote:l.checkoutQuote}};const{permissions:e}=o,a=y(e);return{permissions:{canRequestQuote:a.includes(q),canEditQuote:a.includes(b),canDeleteQuote:a.includes(U),canCheckoutQuote:a.includes(O)}}}const D=async()=>{var t;if(!r.authenticated)return Promise.reject(new Error("Unauthorized"));try{const o=await s(A);if(!((t=o==null?void 0:o.data)!=null&&t.customer))throw new Error("No customer data received");return M(o.data.customer)}catch(o){return Promise.reject(o)}},T=new w({init:async t=>{const o={};T.config.setConfig({...o,...t})},listeners:()=>[i.on("authenticated",async t=>{r.authenticated=!!t,t?D().then(o=>{r.permissions={requestQuote:o.permissions.canRequestQuote,editQuote:o.permissions.canEditQuote,deleteQuote:o.permissions.canDeleteQuote,checkoutQuote:o.permissions.canCheckoutQuote},i.emit("quote-management/permissions",r.permissions)}).catch(o=>{console.error(o),r.permissions=l,i.emit("quote-management/permissions",l)}):(r.permissions=l,i.emit("quote-management/permissions",l))},{eager:!0}),i.on("quote-management/permissions",async t=>{const o=T.config.getConfig().quoteId;o&&t.editQuote&&Q(o).then(e=>{i.emit("quote-management/quote-data/initialized",{quote:e,permissions:t},{})}).catch(e=>{i.emit("quote-management/quote-data/error",{error:e})})},{eager:!0})]}),ee=T.config,v=`
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
  ${f}
`;function S(t){const{additionalInput:o,...e}=t,a={city:e.city,company:e.company,country_code:e.countryCode,firstname:e.firstname,lastname:e.lastname,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook,street:e.street,telephone:e.telephone};return{...o||{},...a}}const te=async t=>{const{quoteUid:o,addressId:e,addressData:a}=t;if(!o)throw new Error("Quote UID is required");if(e===void 0&&!a)throw new Error("Either addressId or addressData must be provided");if(e!==void 0&&a)throw new Error("Cannot provide both addressId and addressData");const d=a?S(a):null;return s(v,{variables:{quoteUid:o,addressId:e||null,addressData:d}}).then(n=>{var E,_;const{errors:p}=n;if(p){const g=p.map(h=>h.message).join("; ");throw new Error(`Failed to set shipping address: ${g}`)}const c=I((_=(E=n.data)==null?void 0:E.setNegotiableQuoteShippingAddress)==null?void 0:_.quote);if(!c)throw new Error("Failed to transform quote data: Invalid response structure");return i.emit("quote-management/shipping-address-set",{quote:c,input:{quoteUid:o,addressId:e,addressData:a}}),c})},m=`
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
`,F=`
  query QUOTE_TEMPLATE_DATA_QUERY($templateId: ID!) {
    negotiableQuoteTemplate(templateId: $templateId) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,oe=async t=>{var o;if(!r.authenticated)throw new Error("Unauthorized");if(!t)throw new Error("Template ID is required");try{const e=await s(F,{variables:{templateId:t}});if(!((o=e==null?void 0:e.data)!=null&&o.negotiableQuoteTemplate))throw new Error("Quote template not found");const a=u(e.data.negotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},P=`
  mutation CREATE_QUOTE_TEMPLATE_MUTATION($cartId: ID!) {
    requestNegotiableQuoteTemplateFromQuote(input: { cart_id: $cartId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,ae=async t=>{var o;if(!r.authenticated)throw new Error("Unauthorized");if(!t)throw new Error("Cart ID is required");try{const e=await s(P,{variables:{cartId:t}});if(!((o=e==null?void 0:e.data)!=null&&o.requestNegotiableQuoteTemplateFromQuote))throw new Error("Failed to create quote template");const a=u(e.data.requestNegotiableQuoteTemplateFromQuote);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},$=`
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
`,re=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await s($,{variables:{templateId:t.templateId,name:t.name,comment:t.comment}});if(!((o=e==null?void 0:e.data)!=null&&o.submitNegotiableQuoteTemplateForReview))throw new Error("No quote template data received");const a=u(e.data.submitNegotiableQuoteTemplateForReview);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},L=`
  mutation ACCEPT_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    acceptNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${m}
`,ie=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await s(L,{variables:{templateId:t.templateId}});if(!((o=e==null?void 0:e.data)!=null&&o.acceptNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=u(e.data.acceptNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},R=`
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
`,ne=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await s(R,{variables:{templateId:t.templateId,comment:t.comment}});if(!((o=e==null?void 0:e.data)!=null&&o.cancelNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=u(e.data.cancelNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},C=`
  mutation DELETE_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    deleteNegotiableQuoteTemplate(input: { template_id: $templateId })
  }
`,se=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await s(C,{variables:{templateId:t.templateId}});if(e!=null&&e.errors&&e.errors.length>0){const d=e.errors.map(n=>n==null?void 0:n.message).filter(Boolean).join("; ");throw new Error(d||"Failed to delete quote template")}if(!((o=e==null?void 0:e.data)==null?void 0:o.deleteNegotiableQuoteTemplate))throw new Error("Failed to delete quote template");return i.emit("quote-management/quote-template-deleted",{templateId:t.templateId}),{templateId:t.templateId}}catch(e){return Promise.reject(e)}},x=`
  mutation OPEN_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    openNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,de=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await s(x,{variables:{templateId:t.templateId}});if(!((o=e==null?void 0:e.data)!=null&&o.openNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=u(e.data.openNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},G=`
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
`,ue=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!t.shippingAddress)throw new Error("Shipping address is required");if(!r.authenticated)throw new Error("Unauthorized");if(!t.shippingAddress.address&&!t.shippingAddress.customerAddressUid)throw new Error("Either address or customerAddressUid must be provided");try{const e=await s(G,{variables:{templateId:t.templateId,shippingAddress:{address:t.shippingAddress.address?{city:t.shippingAddress.address.city,company:t.shippingAddress.address.company,country_code:t.shippingAddress.address.countryCode,fax:t.shippingAddress.address.fax,firstname:t.shippingAddress.address.firstname,lastname:t.shippingAddress.address.lastname,middlename:t.shippingAddress.address.middlename,postcode:t.shippingAddress.address.postcode,prefix:t.shippingAddress.address.prefix,region:t.shippingAddress.address.region,region_id:t.shippingAddress.address.regionId,save_in_address_book:t.shippingAddress.address.saveInAddressBook,street:t.shippingAddress.address.street,suffix:t.shippingAddress.address.suffix,telephone:t.shippingAddress.address.telephone,vat_id:t.shippingAddress.address.vatId}:void 0,customer_address_uid:t.shippingAddress.customerAddressUid,customer_notes:t.shippingAddress.customerNotes}}});if(!((o=e==null?void 0:e.data)!=null&&o.setNegotiableQuoteTemplateShippingAddress))throw new Error("No quote template data received");const a=u(e.data.setNegotiableQuoteTemplateShippingAddress);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},j=`
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
`,me=async t=>{var o,e;if(!t.templateId)throw new Error("Template ID is required");if(!t.items||t.items.length===0)throw new Error("Items array is required and must not be empty");if(!r.authenticated)throw new Error("Unauthorized");try{const a=await s(j,{variables:{input:{template_id:t.templateId,items:t.items.map(n=>({item_id:n.itemId,quantity:n.quantity,min_qty:n.minQty,max_qty:n.maxQty}))}}});if(!((e=(o=a==null?void 0:a.data)==null?void 0:o.updateNegotiableQuoteTemplateQuantities)!=null&&e.quote_template))throw new Error("No quote template data received");const d=u(a.data.updateNegotiableQuoteTemplateQuantities.quote_template);if(!d)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:d,permissions:r.permissions}),d}catch(a){return Promise.reject(a)}},z=`
  mutation REMOVE_NEGOTIABLE_QUOTE_TEMPLATE_ITEMS_MUTATION(
    $input: RemoveNegotiableQuoteTemplateItemsInput!
  ) {
    removeNegotiableQuoteTemplateItems(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,le=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!t.itemUids||t.itemUids.length===0)throw new Error("Item UIDs array is required and must not be empty");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await s(z,{variables:{input:{template_id:t.templateId,item_uids:t.itemUids}}});if(!((o=e==null?void 0:e.data)!=null&&o.removeNegotiableQuoteTemplateItems))throw new Error("No quote template data received");const a=u(e.data.removeNegotiableQuoteTemplateItems);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},B=`
  mutation SET_QUOTE_TEMPLATE_LINE_ITEM_NOTE_MUTATION(
    $input: QuoteTemplateLineItemNoteInput!
  ) {
    setQuoteTemplateLineItemNote(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,pe=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!t.itemId)throw new Error("Item ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await s(B,{variables:{input:{templateId:t.templateId,item_id:t.itemId,note:t.note}}});if(!((o=e==null?void 0:e.data)!=null&&o.setQuoteTemplateLineItemNote))throw new Error("No quote template data received");const a=u(e.data.setQuoteTemplateLineItemNote);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},k=`
  mutation GENERATE_NEGOTIABLE_QUOTE_FROM_TEMPLATE_MUTATION(
    $input: GenerateNegotiableQuoteFromTemplateInput!
  ) {
    generateNegotiableQuoteFromTemplate(input: $input) {
      negotiable_quote_uid
    }
  }
`,ce=async t=>{var o,e;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const a=await s(k,{variables:{input:{template_id:t.templateId}}});if(!((e=(o=a==null?void 0:a.data)==null?void 0:o.generateNegotiableQuoteFromTemplate)!=null&&e.negotiable_quote_uid))throw new Error("No quote UID received");const d=a.data.generateNegotiableQuoteFromTemplate.negotiable_quote_uid;return i.emit("quote-management/quote-template-generated",{quoteId:d}),{quoteId:d}}catch(a){return Promise.reject(a)}};export{Me as FilterMatchTypeEnum,De as NegotiableQuoteSortableField,Pe as QuoteTemplateFilterStatus,$e as QuoteTemplateSortField,Le as SortDirection,ve as SortEnum,ie as acceptQuoteTemplate,pe as addQuoteTemplateLineItemNote,ue as addQuoteTemplateShippingAddress,ne as cancelQuoteTemplate,qe as closeNegotiableQuote,ee as config,ae as createQuoteTemplate,be as deleteQuote,se as deleteQuoteTemplate,s as fetchGraphQl,ce as generateQuoteFromTemplate,_e as getConfig,D as getCustomerData,Q as getQuoteData,oe as getQuoteTemplateData,Re as getQuoteTemplates,T as initialize,Se as negotiableQuotes,de as openQuoteTemplate,ge as removeFetchGraphQlHeader,le as removeQuoteTemplateItems,Ue as renameNegotiableQuote,we as requestNegotiableQuote,Oe as sendForReview,re as sendQuoteTemplateForReview,he as setEndpoint,Ie as setFetchGraphQlHeader,Qe as setFetchGraphQlHeaders,te as setShippingAddress,xe as updateQuantities,me as updateQuoteTemplateItemQuantities,Ne as uploadFile};
//# sourceMappingURL=api.js.map
