/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as q}from"@dropins/tools/event-bus.js";import{f as d,a as I}from"./transform-quote.js";import{s as E}from"./state.js";import{N as U}from"./NegotiableQuoteFragment.js";const T=`
  mutation UPDATE_NEGOTIABLE_QUOTE_QUANTITIES_MUTATION(
    $quoteUid: ID!
    $items: [NegotiableQuoteItemQuantityInput!]!
  ) {
    updateNegotiableQuoteQuantities(
      input: {
        quote_uid: $quoteUid
        items: $items
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${U}
`,Q=async u=>{if(!E.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUid:r,items:e}=u;if(!r)throw new Error("Quote UID is required");if(!e||!Array.isArray(e)||e.length===0)throw new Error("Items array is required and must not be empty");for(const t of e){if(!t.quoteItemUid)throw new Error("Each item must have a quoteItemUid");if(typeof t.quantity!="number"||t.quantity<=0)throw new Error(`Invalid quantity for item ${t.quoteItemUid}: quantity must be a positive number`);if(!Number.isInteger(t.quantity))throw new Error(`Invalid quantity for item ${t.quoteItemUid}: quantity must be an integer`)}const s=e.map(t=>({quote_item_uid:t.quoteItemUid,quantity:t.quantity}));return d(T,{variables:{quoteUid:r,items:s}}).then(t=>{var a,n;const{errors:i}=t;if(i){const m=i.map(f=>f.message).join("; ");throw new Error(`Failed to update quote quantities: ${m}`)}const o=I((n=(a=t.data)==null?void 0:a.updateNegotiableQuoteQuantities)==null?void 0:n.quote);if(!o)throw new Error("Failed to transform quote data: Invalid response structure");return q.emit("quote-management/quantities-updated",{quote:o,input:{quoteUid:r,items:e}}),o})},c=`
  mutation REMOVE_NEGOTIABLE_QUOTE_ITEMS_MUTATION(
    $quoteUid: ID!
    $quoteItemUids: [ID!]!
  ) {
    removeNegotiableQuoteItems(
      input: {
        quote_uid: $quoteUid
        quote_item_uids: $quoteItemUids
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${U}
`,g=async u=>{var a;if(!E.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUid:r,quoteItemUids:e}=u;if(!r)throw new Error("Quote UID is required");if(!Array.isArray(e)||e.length===0)throw new Error("At least one quote item UID is required");const s=await d(c,{variables:{quoteUid:r,quoteItemUids:e}}),{errors:t,data:i}=s;if(t!=null&&t.length){const n=t.map(m=>m.message).join("; ");throw new Error(`Failed to remove negotiable quote items: ${n}`)}const o=I((a=i==null?void 0:i.removeNegotiableQuoteItems)==null?void 0:a.quote);if(!o)throw new Error("Failed to transform quote data: Invalid response structure");return q.emit("quote-management/quote-items-removed",{quote:o,removedItemUids:e,input:u}),o};export{g as r,Q as u};
//# sourceMappingURL=removeNegotiableQuoteItems.js.map
