/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as m}from"@dropins/tools/event-bus.js";import{a as i}from"./transform-quote-template.js";import{s as r}from"./state.js";import{N as n}from"./NegotiableQuoteTemplateFragment.js";import{f as s}from"./transform-quote.js";const p=`
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
`,c=async t=>{var a;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await s(p,{variables:{templateId:t.templateId,name:t.name,comment:t.comment}});if(!((a=e==null?void 0:e.data)!=null&&a.submitNegotiableQuoteTemplateForReview))throw new Error("No quote template data received");const o=i(e.data.submitNegotiableQuoteTemplateForReview);if(!o)throw new Error("Failed to transform quote template data");return m.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:r.permissions}),o}catch(e){return Promise.reject(e)}};export{c as s};
//# sourceMappingURL=sendQuoteTemplateForReview.js.map
