/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as i}from"@dropins/tools/event-bus.js";import{a as d}from"./transform-quote-template.js";import{s as r}from"./state.js";import{N as T}from"./NegotiableQuoteTemplateFragment.js";import{f as m}from"./transform-quote.js";const s=`
  mutation SEND_QUOTE_TEMPLATE_FOR_REVIEW_MUTATION(
    $templateId: ID!
    $comment: String
    $name: String
    $referenceDocumentLinks: [NegotiableQuoteTemplateReferenceDocumentLinkInput]
    $attachments: [NegotiableQuoteCommentAttachmentInput]
  ) {
    submitNegotiableQuoteTemplateForReview(input: { template_id: $templateId, name: $name, comment: $comment, reference_document_links: $referenceDocumentLinks, attachments: $attachments }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${T}
`,A=async t=>{var o,e,a;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const l=(o=t.referenceDocumentLinks)==null?void 0:o.map(n=>({link_id:n.uid,document_name:n.name,document_identifier:n.identifier,reference_document_url:n.url})),p=(e=t.attachments)!=null&&e.length?t.attachments.map(n=>({key:n.key})):void 0,c=await m(s,{variables:{templateId:t.templateId,name:t.name,comment:t.comment||void 0,referenceDocumentLinks:l,attachments:p}});if(!((a=c==null?void 0:c.data)!=null&&a.submitNegotiableQuoteTemplateForReview))throw new Error("No quote template data received");const u=d(c.data.submitNegotiableQuoteTemplateForReview);if(!u)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:u,permissions:r.permissions}),u}catch(l){return Promise.reject(l)}},E=`
  mutation SET_QUOTE_TEMPLATE_EXPIRATION_DATE_MUTATION(
    $templateId: ID!
    $expirationDate: String!
  ) {
    setQuoteTemplateExpirationDate(input: { template_id: $templateId, expiration_date: $expirationDate }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${T}
`,q=async t=>{var o;if(!r.authenticated)throw new Error("Unauthorized");if(!t.templateId)throw new Error("Template ID is required");if(!t.expirationDate)throw new Error("Expiration date is required");try{const e=await m(E,{variables:{templateId:t.templateId,expirationDate:t.expirationDate}});if(!((o=e==null?void 0:e.data)!=null&&o.setQuoteTemplateExpirationDate))throw new Error("Failed to set expiration date");const a=d(e.data.setQuoteTemplateExpirationDate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},I=`
  mutation ACCEPT_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    acceptNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${T}
`,O=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await m(I,{variables:{templateId:t.templateId}});if(!((o=e==null?void 0:e.data)!=null&&o.acceptNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=d(e.data.acceptNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},_=`
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
  ${T}
`,b=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await m(_,{variables:{templateId:t.templateId,comment:t.comment}});if(!((o=e==null?void 0:e.data)!=null&&o.cancelNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=d(e.data.cancelNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},w=`
  mutation DELETE_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    deleteNegotiableQuoteTemplate(input: { template_id: $templateId })
  }
`,U=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await m(w,{variables:{templateId:t.templateId}});if(e!=null&&e.errors&&e.errors.length>0){const l=e.errors.map(p=>p==null?void 0:p.message).filter(Boolean).join("; ");throw new Error(l||"Failed to delete quote template")}if(!((o=e==null?void 0:e.data)==null?void 0:o.deleteNegotiableQuoteTemplate))throw new Error("Failed to delete quote template");return i.emit("quote-management/quote-template-deleted",{templateId:t.templateId}),{templateId:t.templateId}}catch(e){return Promise.reject(e)}},h=`
  mutation OPEN_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    openNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${T}
`,$=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await m(h,{variables:{templateId:t.templateId}});if(!((o=e==null?void 0:e.data)!=null&&o.openNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=d(e.data.openNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}};export{q as a,O as b,b as c,U as d,$ as o,A as s};
//# sourceMappingURL=openQuoteTemplate.js.map
