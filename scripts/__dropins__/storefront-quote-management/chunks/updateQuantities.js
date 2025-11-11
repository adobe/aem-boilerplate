/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as d,t as I}from"./fetch-graphql.js";import{s as E}from"./state.js";import{events as f}from"@dropins/tools/event-bus.js";import{N as p}from"./NegotiableQuoteFragment.js";const U=`
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
  ${p}
`,w=async n=>{if(!E.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUid:r,items:e}=n;if(!r)throw new Error("Quote UID is required");if(!e||!Array.isArray(e)||e.length===0)throw new Error("Items array is required and must not be empty");for(const t of e){if(!t.quoteItemUid)throw new Error("Each item must have a quoteItemUid");if(typeof t.quantity!="number"||t.quantity<=0)throw new Error(`Invalid quantity for item ${t.quoteItemUid}: quantity must be a positive number`);if(!Number.isInteger(t.quantity))throw new Error(`Invalid quantity for item ${t.quoteItemUid}: quantity must be an integer`)}const s=e.map(t=>({quote_item_uid:t.quoteItemUid,quantity:t.quantity}));return d(U,{variables:{quoteUid:r,items:s}}).then(t=>{var a,u;const{errors:o}=t;if(o){const m=o.map(q=>q.message).join("; ");throw new Error(`Failed to update quote quantities: ${m}`)}const i=I((u=(a=t.data)==null?void 0:a.updateNegotiableQuoteQuantities)==null?void 0:u.quote);if(!i)throw new Error("Failed to transform quote data: Invalid response structure");return f.emit("quote-management/quantities-updated",{quote:i,input:{quoteUid:r,items:e}}),i})};export{w as u};
//# sourceMappingURL=updateQuantities.js.map
