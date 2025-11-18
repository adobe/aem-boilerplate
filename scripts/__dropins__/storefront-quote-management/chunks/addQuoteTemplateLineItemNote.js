/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as i}from"@dropins/tools/event-bus.js";import{a as m}from"./transform-quote-template.js";import{s as a}from"./state.js";import{N as n}from"./NegotiableQuoteTemplateFragment.js";import{f as T}from"./transform-quote.js";const p=`
  mutation SET_QUOTE_TEMPLATE_LINE_ITEM_NOTE_MUTATION(
    $input: QuoteTemplateLineItemNoteInput!
  ) {
    setQuoteTemplateLineItemNote(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${n}
`,l=async t=>{var r;if(!t.templateId)throw new Error("Template ID is required");if(!t.itemId)throw new Error("Item ID is required");if(!a.authenticated)throw new Error("Unauthorized");try{const e=await T(p,{variables:{input:{templateId:t.templateId,item_id:t.itemId,note:t.note}}});if(!((r=e==null?void 0:e.data)!=null&&r.setQuoteTemplateLineItemNote))throw new Error("No quote template data received");const o=m(e.data.setQuoteTemplateLineItemNote);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(e){return Promise.reject(e)}};export{l as a};
//# sourceMappingURL=addQuoteTemplateLineItemNote.js.map
