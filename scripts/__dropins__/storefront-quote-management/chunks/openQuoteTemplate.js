/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as i}from"@dropins/tools/event-bus.js";import{a as p}from"./transform-quote-template.js";import{s as r}from"./state.js";import{N as c}from"./NegotiableQuoteTemplateFragment.js";import{f as l}from"./transform-quote.js";const u=`
  mutation SEND_QUOTE_TEMPLATE_FOR_REVIEW_MUTATION(
    $templateId: ID!
    $comment: String
    $name: String
    $referenceDocumentLinks: [NegotiableQuoteTemplateReferenceDocumentLinkInput]
  ) {
    submitNegotiableQuoteTemplateForReview(input: { template_id: $templateId, name: $name, comment: $comment, reference_document_links: $referenceDocumentLinks }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${c}
`,Q=async t=>{var o,e;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const a=(o=t.referenceDocumentLinks)==null?void 0:o.map(d=>({link_id:d.uid,document_name:d.name,document_identifier:d.identifier,reference_document_url:d.url})),n=await l(u,{variables:{templateId:t.templateId,name:t.name,comment:t.comment,referenceDocumentLinks:a}});if(!((e=n==null?void 0:n.data)!=null&&e.submitNegotiableQuoteTemplateForReview))throw new Error("No quote template data received");const m=p(n.data.submitNegotiableQuoteTemplateForReview);if(!m)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:m,permissions:r.permissions}),m}catch(a){return Promise.reject(a)}},T=`
  mutation ACCEPT_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    acceptNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${c}
`,g=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await l(T,{variables:{templateId:t.templateId}});if(!((o=e==null?void 0:e.data)!=null&&o.acceptNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=p(e.data.acceptNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},s=`
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
  ${c}
`,q=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await l(s,{variables:{templateId:t.templateId,comment:t.comment}});if(!((o=e==null?void 0:e.data)!=null&&o.cancelNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=p(e.data.cancelNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},E=`
  mutation DELETE_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    deleteNegotiableQuoteTemplate(input: { template_id: $templateId })
  }
`,b=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await l(E,{variables:{templateId:t.templateId}});if(e!=null&&e.errors&&e.errors.length>0){const n=e.errors.map(m=>m==null?void 0:m.message).filter(Boolean).join("; ");throw new Error(n||"Failed to delete quote template")}if(!((o=e==null?void 0:e.data)==null?void 0:o.deleteNegotiableQuoteTemplate))throw new Error("Failed to delete quote template");return i.emit("quote-management/quote-template-deleted",{templateId:t.templateId}),{templateId:t.templateId}}catch(e){return Promise.reject(e)}},I=`
  mutation OPEN_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    openNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${c}
`,A=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await l(I,{variables:{templateId:t.templateId}});if(!((o=e==null?void 0:e.data)!=null&&o.openNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=p(e.data.openNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}};export{g as a,q as c,b as d,A as o,Q as s};
//# sourceMappingURL=openQuoteTemplate.js.map
