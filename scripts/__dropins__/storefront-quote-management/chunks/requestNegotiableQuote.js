/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as f}from"@dropins/tools/event-bus.js";import{N}from"./NegotiableQuoteFragment.js";import{f as d,t as l}from"./transform-quote.js";import"./state.js";const g=`
  mutation REQUEST_NEGOTIABLE_QUOTE_MUTATION(
    $cartId: ID!
    $quoteName: String!
    $comment: NegotiableQuoteCommentInput!
    $isDraft: Boolean
  ) {
    requestNegotiableQuote(
      input: {
        cart_id: $cartId
        quote_name: $quoteName
        comment: $comment
        is_draft: $isDraft
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${N}
`,p=async q=>{const{cartId:r,quoteName:o,comment:t,attachments:e,isDraft:n}=q;if(!r)throw new Error("Cart ID is required");if(!o)throw new Error("Quote name is required");if(!t)throw new Error("Comment is required");return d(g,{variables:{cartId:r,quoteName:o,comment:e!=null&&e.length?{comment:t,attachments:e}:{comment:t},isDraft:n}}).then(i=>{var m,s;const{errors:u}=i;if(u){const E=u.map(c=>c.message).join("; ");throw new Error(`Failed to request negotiable quote: ${E}`)}const a=l((s=(m=i.data)==null?void 0:m.requestNegotiableQuote)==null?void 0:s.quote);if(!a)throw new Error("Failed to transform quote data: Invalid response structure");return f.emit("quote-management/negotiable-quote-requested",{quote:a,input:{cartId:r,quoteName:o,comment:t,attachments:e,isDraft:n}}),a})};export{p as r};
//# sourceMappingURL=requestNegotiableQuote.js.map
