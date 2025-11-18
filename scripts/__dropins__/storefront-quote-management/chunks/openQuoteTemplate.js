/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as m}from"@dropins/tools/event-bus.js";import{a as i}from"./transform-quote-template.js";import{s as r}from"./state.js";import{N as n}from"./NegotiableQuoteTemplateFragment.js";import{f as p}from"./transform-quote.js";const l=`
  mutation SEND_QUOTE_TEMPLATE_FOR_REVIEW_MUTATION(
    $templateId: ID!
    $comment: String
    $name: String
  ) {
    submitNegotiableQuoteTemplateForReview(input: { template_id: $templateId, name: $name, comment: $comment }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${n}
`,I=async a=>{var o;if(!a.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await p(l,{variables:{templateId:a.templateId,name:a.name,comment:a.comment}});if(!((o=e==null?void 0:e.data)!=null&&o.submitNegotiableQuoteTemplateForReview))throw new Error("No quote template data received");const t=i(e.data.submitNegotiableQuoteTemplateForReview);if(!t)throw new Error("Failed to transform quote template data");return m.emit("quote-management/quote-template-data",{quoteTemplate:t,permissions:r.permissions}),t}catch(e){return Promise.reject(e)}},T=`
  mutation ACCEPT_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    acceptNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${n}
`,N=async a=>{var o;if(!a.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await p(T,{variables:{templateId:a.templateId}});if(!((o=e==null?void 0:e.data)!=null&&o.acceptNegotiableQuoteTemplate))throw new Error("No quote template data received");const t=i(e.data.acceptNegotiableQuoteTemplate);if(!t)throw new Error("Failed to transform quote template data");return m.emit("quote-management/quote-template-data",{quoteTemplate:t,permissions:r.permissions}),t}catch(e){return Promise.reject(e)}},s=`
  mutation OPEN_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    openNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${n}
`,_=async a=>{var o;if(!a.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await p(s,{variables:{templateId:a.templateId}});if(!((o=e==null?void 0:e.data)!=null&&o.openNegotiableQuoteTemplate))throw new Error("No quote template data received");const t=i(e.data.openNegotiableQuoteTemplate);if(!t)throw new Error("Failed to transform quote template data");return m.emit("quote-management/quote-template-data",{quoteTemplate:t,permissions:r.permissions}),t}catch(e){return Promise.reject(e)}};export{N as a,_ as o,I as s};
//# sourceMappingURL=openQuoteTemplate.js.map
