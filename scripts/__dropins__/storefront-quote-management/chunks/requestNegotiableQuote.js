/*! Copyright 2025 Adobe
All Rights Reserved. */
import{fetchGraphQl as c}from"@dropins/tools/fetch-graphql.js";import{events as f}from"@dropins/tools/event-bus.js";import{N}from"./NegotiableQuoteFragment.js";import{t as d}from"./transform-quote.js";const l=`
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
`,_=async s=>{const{cartId:e,quoteName:t,comment:r,isDraft:a}=s;if(!e)throw new Error("Cart ID is required");if(!t)throw new Error("Quote name is required");if(!r)throw new Error("Comment is required");return c(l,{variables:{cartId:e,quoteName:t,comment:{comment:r},isDraft:a}}).then(n=>{var m,u;const{errors:i}=n;if(i){const q=i.map(E=>E.message).join("; ");throw new Error(`Failed to request negotiable quote: ${q}`)}const o=d((u=(m=n.data)==null?void 0:m.requestNegotiableQuote)==null?void 0:u.quote);if(!o)throw new Error("Failed to transform quote data: Invalid response structure");return f.emit("quote-management/negotiable-quote-requested",{quote:o,input:{cartId:e,quoteName:t,comment:r,isDraft:a}}),o})};export{_ as r};
//# sourceMappingURL=requestNegotiableQuote.js.map
