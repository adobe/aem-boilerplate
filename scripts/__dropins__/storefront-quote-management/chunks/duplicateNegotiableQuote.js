/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as p}from"@dropins/tools/event-bus.js";import{s as E}from"./state.js";import{f as _,t as q}from"./transform-quote.js";import{N as g}from"./NegotiableQuoteFragment.js";import{a as U}from"./transform-quote-template.js";import{N as Q}from"./NegotiableQuoteTemplateFragment.js";const N=`
  mutation DELETE_QUOTE_MUTATION($quoteUids: [ID!]!) {
    deleteNegotiableQuotes(
      input: {
        quote_uids: $quoteUids
      }
    ) {
      result_status
      operation_results {
        __typename
        ... on NegotiableQuoteUidOperationSuccess {
          quote_uid
        }
        ... on DeleteNegotiableQuoteOperationFailure {
          quote_uid
          errors {
            __typename
            ... on ErrorInterface {
              message
            }
            ... on NoSuchEntityUidError {
              uid
              message
            }
            ... on NegotiableQuoteInvalidStateError {
              message
            }
          }
        }
      }
    }
  }
`,$=async d=>{var a;if(!E.authenticated)return Promise.reject(new Error("Unauthorized"));const r=Array.isArray(d)?d:[d];try{const t=await _(N,{variables:{quoteUids:r}}),{errors:c}=t||{};if(c&&c.length){const o=c.map(e=>e==null?void 0:e.message).filter(Boolean).join("; ");throw new Error(o||"Failed to delete negotiable quotes")}const s=(a=t==null?void 0:t.data)==null?void 0:a.deleteNegotiableQuotes;if(!s)throw new Error("No delete result returned");const i={resultStatus:s.result_status,operationResults:(s.operation_results||[]).map(o=>(o==null?void 0:o.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:o==null?void 0:o.quote_uid}:{__typename:"DeleteNegotiableQuoteOperationFailure",quoteUid:o==null?void 0:o.quote_uid,errors:((o==null?void 0:o.errors)||[]).map(u=>({__typename:u==null?void 0:u.__typename,message:u==null?void 0:u.message,uid:u==null?void 0:u.uid}))})},m=i.operationResults.filter(o=>o.__typename==="NegotiableQuoteUidOperationSuccess").map(o=>o.quoteUid);return m.length>0&&p.emit("quote-management/negotiable-quote-deleted",{deletedQuoteUids:m,resultStatus:i.resultStatus}),i}catch(t){return p.emit("quote-management/negotiable-quote-delete-error",{error:t instanceof Error?t:new Error(String(t)),attemptedQuoteUids:r}),Promise.reject(t)}},T=`
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
  ${g}
`,D=async d=>{const{quoteUid:r,comment:a,attachments:t}=d;if(!r)throw new Error("Quote UID is required");const c=t!=null&&t.length?{comment:a||"",attachments:t}:a?{comment:a}:null;return _(T,{variables:{quoteUid:r,comment:c}}).then(s=>{var o,e;const{errors:i}=s;if(i){const n=i.map(u=>u.message).join("; ");throw new Error(`Failed to send quote for review: ${n}`)}const m=q((e=(o=s.data)==null?void 0:o.sendNegotiableQuoteForReview)==null?void 0:e.quote);if(!m)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-sent-for-review",{quote:m,input:{quoteUid:r,comment:a,attachments:t}}),m})},f=`
  mutation CLOSE_NEGOTIABLE_QUOTE_MUTATION(
    $quoteUids: [ID!]!
  ) {
    closeNegotiableQuotes(input: { quote_uids: $quoteUids }) {
      result_status
      operation_results {
        ... on NegotiableQuoteUidOperationSuccess {
          __typename
          quote_uid
        }
        ... on CloseNegotiableQuoteOperationFailure {
          __typename
          quote_uid
          errors {
            __typename
            ... on ErrorInterface {
              message
            }
            ... on NoSuchEntityUidError {
              uid
            }
            ... on NegotiableQuoteInvalidStateError {
              message
            }
          }
        }
      }
    }
  }
`,M=async d=>{var a;if(!E.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUids:r}=d;if(!r||r.length===0)throw new Error("Quote UIDs are required");try{const t=await _(f,{variables:{quoteUids:r}}),{errors:c}=t||{};if(c&&c.length){const e=c.map(n=>n==null?void 0:n.message).filter(Boolean).join("; ");throw new Error(e||"Failed to close negotiable quotes")}const s=(a=t==null?void 0:t.data)==null?void 0:a.closeNegotiableQuotes;if(!s)throw new Error("No close result returned");const i={resultStatus:s.result_status,operationResults:(s.operation_results||[]).map(e=>(e==null?void 0:e.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:e==null?void 0:e.quote_uid}:{__typename:"CloseNegotiableQuoteOperationFailure",quoteUid:e==null?void 0:e.quote_uid,errors:((e==null?void 0:e.errors)||[]).map(l=>({__typename:l==null?void 0:l.__typename,message:l==null?void 0:l.message,uid:l==null?void 0:l.uid}))})},m=i.operationResults.filter(e=>e.__typename==="CloseNegotiableQuoteOperationFailure").map(e=>e);if(m.length>0){const e=m.map(n=>n.errors&&n.errors.length>0?n.errors.map(u=>u.message||`Failed to close quote ${n.quoteUid}`).join(", "):`Failed to close quote ${n.quoteUid}`).join("; ");throw new Error(e)}const o=i.operationResults.filter(e=>e.__typename==="NegotiableQuoteUidOperationSuccess").map(e=>e.quoteUid);return o.length>0&&p.emit("quote-management/negotiable-quote-closed",{closedQuoteUids:o,resultStatus:i.resultStatus}),i}catch(t){return p.emit("quote-management/negotiable-quote-close-error",{error:t instanceof Error?t:new Error(String(t)),attemptedQuoteUids:r}),Promise.reject(t)}},w=`
  mutation CREATE_QUOTE_TEMPLATE_MUTATION($cartId: ID!) {
    requestNegotiableQuoteTemplateFromQuote(input: { cart_id: $cartId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${Q}
`,L=async d=>{var r;if(!E.authenticated)throw new Error("Unauthorized");if(!d)throw new Error("Cart ID is required");try{const a=await _(w,{variables:{cartId:d}});if(!((r=a==null?void 0:a.data)!=null&&r.requestNegotiableQuoteTemplateFromQuote))throw new Error("Failed to create quote template");const t=U(a.data.requestNegotiableQuoteTemplateFromQuote);if(!t)throw new Error("Failed to transform quote template data");return p.emit("quote-management/quote-template-data",{quoteTemplate:t,permissions:E.permissions}),t}catch(a){return Promise.reject(a)}},O=`
  mutation renameNegotiableQuote($input: RenameNegotiableQuoteInput!) {
    renameNegotiableQuote(input: $input) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${g}
`,R=async d=>{const{quoteUid:r,quoteName:a,quoteComment:t}=d;if(!r)throw new Error("Quote UID is required");if(!a)throw new Error("Quote name is required");return _(O,{variables:{input:{quote_uid:r,quote_name:a,quote_comment:t||""}}}).then(s=>{var o,e;const{errors:i}=s;if(i){const n=i.map(u=>u.message).join("; ");throw new Error(`Failed to rename quote: ${n}`)}const m=q((e=(o=s.data)==null?void 0:o.renameNegotiableQuote)==null?void 0:e.quote);if(!m)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-renamed",{quote:m,input:{quoteUid:r,quoteName:a,quoteComment:t}}),m})},I=`
  mutation DUPLICATE_NEGOTIABLE_QUOTE_MUTATION($quoteUid: ID!, $duplicatedQuoteUid: ID!) {
    duplicateNegotiableQuote(input: { quote_uid: $quoteUid, duplicated_quote_uid: $duplicatedQuoteUid }) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${g}
`,v=async d=>{if(!E.authenticated)throw new Error("Unauthorized");const{quoteUid:r,duplicatedQuoteUid:a,hasOutOfStockItems:t}=d;if(!r||!r.trim())throw new Error("Quote UID is required");if(!a||!a.trim())throw new Error("Duplicated Quote UID is required");return _(I,{variables:{quoteUid:r,duplicatedQuoteUid:a}}).then(c=>{var m,o;const{errors:s}=c;if(s){const e=s.map(n=>n.message).join("; ");throw new Error(`Failed to duplicate quote: ${e}`)}const i=q((o=(m=c.data)==null?void 0:m.duplicateNegotiableQuote)==null?void 0:o.quote);if(!i)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-duplicated",{quote:i,input:{quoteUid:r,duplicatedQuoteUid:a},hasOutOfStockItems:t}),i})};export{L as a,v as b,M as c,$ as d,R as r,D as s};
//# sourceMappingURL=duplicateNegotiableQuote.js.map
