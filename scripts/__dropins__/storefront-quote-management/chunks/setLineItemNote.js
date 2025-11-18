/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as d}from"@dropins/tools/event-bus.js";import{f as E,t as U}from"./transform-quote.js";import{s as I}from"./state.js";import{N as w}from"./NegotiableQuoteFragment.js";const f=`
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
  ${w}
`,Q=async s=>{if(!I.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUid:o,items:e}=s;if(!o)throw new Error("Quote UID is required");if(!e||!Array.isArray(e)||e.length===0)throw new Error("Items array is required and must not be empty");for(const t of e){if(!t.quoteItemUid)throw new Error("Each item must have a quoteItemUid");if(typeof t.quantity!="number"||t.quantity<=0)throw new Error(`Invalid quantity for item ${t.quoteItemUid}: quantity must be a positive number`);if(!Number.isInteger(t.quantity))throw new Error(`Invalid quantity for item ${t.quoteItemUid}: quantity must be an integer`)}const a=e.map(t=>({quote_item_uid:t.quoteItemUid,quantity:t.quantity}));return E(f,{variables:{quoteUid:o,items:a}}).then(t=>{var u,i;const{errors:n}=t;if(n){const m=n.map(q=>q.message).join("; ");throw new Error(`Failed to update quote quantities: ${m}`)}const r=U((i=(u=t.data)==null?void 0:u.updateNegotiableQuoteQuantities)==null?void 0:i.quote);if(!r)throw new Error("Failed to transform quote data: Invalid response structure");return d.emit("quote-management/quantities-updated",{quote:r,input:{quoteUid:o,items:e}}),r})},_=`
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
  ${w}
`,y=async s=>{var u;if(!I.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUid:o,quoteItemUids:e}=s;if(!o)throw new Error("Quote UID is required");if(!Array.isArray(e)||e.length===0)throw new Error("At least one quote item UID is required");const a=await E(_,{variables:{quoteUid:o,quoteItemUids:e}}),{errors:t,data:n}=a;if(t!=null&&t.length){const i=t.map(m=>m.message).join("; ");throw new Error(`Failed to remove negotiable quote items: ${i}`)}const r=U((u=n==null?void 0:n.removeNegotiableQuoteItems)==null?void 0:u.quote);if(!r)throw new Error("Failed to transform quote data: Invalid response structure");return d.emit("quote-management/quote-items-removed",{quote:r,removedItemUids:e,input:s}),r},N=`
  mutation SET_LINE_ITEM_NOTE_MUTATION($input: LineItemNoteInput!) {
    setLineItemNote(input: $input) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${w}
`,A=async s=>{if(!I.authenticated)throw new Error("Unauthorized");const{quoteUid:o,itemUid:e,note:a,quantity:t}=s;if(!o)throw new Error("Quote UID is required");if(!e)throw new Error("Item UID is required");if(!a)throw new Error("Note is required");const n={quote_uid:o,quote_item_uid:e,note:a.trim()};return E(N,{variables:{input:n}}).then(r=>{var m,q;const{errors:u}=r;if(u){const T=u.map(c=>c.message).join("; ");throw new Error(`Failed to set line item note: ${T}`)}const i=U((q=(m=r.data)==null?void 0:m.setLineItemNote)==null?void 0:q.quote);if(!i)throw new Error("Failed to transform quote data: Invalid response structure");return d.emit("quote-management/line-item-note-set",{quote:i,input:{quoteUid:o,itemUid:e,note:a,quantity:t}}),d.emit("quote-management/quote-data",{quote:i,permissions:I.permissions}),i})};export{y as r,A as s,Q as u};
//# sourceMappingURL=setLineItemNote.js.map
