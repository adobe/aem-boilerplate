/*! Copyright 2025 Adobe
All Rights Reserved. */
import{fetchGraphQl as E}from"@dropins/tools/fetch-graphql.js";import{events as c}from"@dropins/tools/event-bus.js";import{N as d}from"./NegotiableQuoteFragment.js";import{t as q}from"./transform-quote.js";const I=`
  mutation SEND_NEGOTIABLE_QUOTE_FOR_REVIEW_MUTATION(
    $quoteUid: ID!
    $comment: NegotiableQuoteCommentInput
  ) {
    sendNegotiableQuoteForReview(
      input: {
        quote_uid: $quoteUid
        comment: $comment
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${d}
`,w=async u=>{const{quoteUid:e,comment:t}=u;if(!e)throw new Error("Quote UID is required");return E(I,{variables:{quoteUid:e,comment:t?{comment:t}:null}}).then(r=>{var m,i;const{errors:n}=r;if(n){const a=n.map(s=>s.message).join("; ");throw new Error(`Failed to send quote for review: ${a}`)}const o=q((i=(m=r.data)==null?void 0:m.sendNegotiableQuoteForReview)==null?void 0:i.quote);if(!o)throw new Error("Failed to transform quote data: Invalid response structure");return c.emit("quote-management/quote-sent-for-review",{quote:o,input:{quoteUid:e,comment:t}}),o})};export{w as s};
//# sourceMappingURL=sendForReview.js.map
