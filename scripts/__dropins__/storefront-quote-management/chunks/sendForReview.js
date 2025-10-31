/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as E,t as c}from"./fetch-graphql.js";import{events as d}from"@dropins/tools/event-bus.js";import{N as q}from"./NegotiableQuoteFragment.js";const I=`
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
  ${q}
`,p=async a=>{const{quoteUid:e,comment:t}=a;if(!e)throw new Error("Quote UID is required");return E(I,{variables:{quoteUid:e,comment:t?{comment:t}:null}}).then(r=>{var m,u;const{errors:n}=r;if(n){const i=n.map(s=>s.message).join("; ");throw new Error(`Failed to send quote for review: ${i}`)}const o=c((u=(m=r.data)==null?void 0:m.sendNegotiableQuoteForReview)==null?void 0:u.quote);if(!o)throw new Error("Failed to transform quote data: Invalid response structure");return d.emit("quote-management/quote-sent-for-review",{quote:o,input:{quoteUid:e,comment:t}}),o})};export{p as s};
//# sourceMappingURL=sendForReview.js.map
