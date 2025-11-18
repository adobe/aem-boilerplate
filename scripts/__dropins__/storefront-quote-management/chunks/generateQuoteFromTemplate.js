/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as i}from"@dropins/tools/event-bus.js";import{s as n}from"./state.js";import{f as m}from"./transform-quote.js";const u=`
  mutation GENERATE_NEGOTIABLE_QUOTE_FROM_TEMPLATE_MUTATION(
    $input: GenerateNegotiableQuoteFromTemplateInput!
  ) {
    generateNegotiableQuoteFromTemplate(input: $input) {
      negotiable_quote_uid
    }
  }
`,l=async t=>{var o,r;if(!t.templateId)throw new Error("Template ID is required");if(!n.authenticated)throw new Error("Unauthorized");try{const e=await m(u,{variables:{input:{template_id:t.templateId}}});if(!((r=(o=e==null?void 0:e.data)==null?void 0:o.generateNegotiableQuoteFromTemplate)!=null&&r.negotiable_quote_uid))throw new Error("No quote UID received");const a=e.data.generateNegotiableQuoteFromTemplate.negotiable_quote_uid;return i.emit("quote-management/quote-template-generated",{quoteId:a}),{quoteId:a}}catch(e){return Promise.reject(e)}};export{l as g};
//# sourceMappingURL=generateQuoteFromTemplate.js.map
