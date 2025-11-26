/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as n}from"@dropins/tools/event-bus.js";import{a as u}from"./transform-quote-template.js";import{s as r}from"./state.js";import{N as T}from"./NegotiableQuoteTemplateFragment.js";import{f as p}from"./transform-quote.js";const s=`
  mutation UPDATE_NEGOTIABLE_QUOTE_TEMPLATE_QUANTITIES_MUTATION(
    $input: UpdateNegotiableQuoteTemplateQuantitiesInput!
  ) {
    updateNegotiableQuoteTemplateQuantities(input: $input) {
      quote_template {
        ...NegotiableQuoteTemplateFragment
      }
    }
  }
  ${T}
`,w=async e=>{var o,t;if(!e.templateId)throw new Error("Template ID is required");if(!e.items||e.items.length===0)throw new Error("Items array is required and must not be empty");if(!r.authenticated)throw new Error("Unauthorized");try{const a=await p(s,{variables:{input:{template_id:e.templateId,items:e.items.map(i=>({item_id:i.itemId,quantity:i.quantity,min_qty:i.minQty,max_qty:i.maxQty}))}}});if(!((t=(o=a==null?void 0:a.data)==null?void 0:o.updateNegotiableQuoteTemplateQuantities)!=null&&t.quote_template))throw new Error("No quote template data received");const m=u(a.data.updateNegotiableQuoteTemplateQuantities.quote_template);if(!m)throw new Error("Failed to transform quote template data");return n.emit("quote-management/quote-template-data",{quoteTemplate:m,permissions:r.permissions}),m}catch(a){return Promise.reject(a)}},E=`
  mutation REMOVE_NEGOTIABLE_QUOTE_TEMPLATE_ITEMS_MUTATION(
    $input: RemoveNegotiableQuoteTemplateItemsInput!
  ) {
    removeNegotiableQuoteTemplateItems(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${T}
`,c=async e=>{var o;if(!e.templateId)throw new Error("Template ID is required");if(!e.itemUids||e.itemUids.length===0)throw new Error("Item UIDs array is required and must not be empty");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await p(E,{variables:{input:{template_id:e.templateId,item_uids:e.itemUids}}});if(!((o=t==null?void 0:t.data)!=null&&o.removeNegotiableQuoteTemplateItems))throw new Error("No quote template data received");const a=u(t.data.removeNegotiableQuoteTemplateItems);if(!a)throw new Error("Failed to transform quote template data");return n.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(t){return Promise.reject(t)}},d=`
  mutation SET_QUOTE_TEMPLATE_LINE_ITEM_NOTE_MUTATION(
    $input: QuoteTemplateLineItemNoteInput!
  ) {
    setQuoteTemplateLineItemNote(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${T}
`,f=async e=>{var o;if(!e.templateId)throw new Error("Template ID is required");if(!e.itemId)throw new Error("Item ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await p(d,{variables:{input:{templateId:e.templateId,item_id:e.itemId,note:e.note}}});if(!((o=t==null?void 0:t.data)!=null&&o.setQuoteTemplateLineItemNote))throw new Error("No quote template data received");const a=u(t.data.setQuoteTemplateLineItemNote);if(!a)throw new Error("Failed to transform quote template data");return n.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(t){return Promise.reject(t)}};export{f as a,c as r,w as u};
//# sourceMappingURL=addQuoteTemplateLineItemNote.js.map
