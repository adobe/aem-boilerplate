/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as p}from"@dropins/tools/event-bus.js";import{f as E,a as g}from"./transform-quote.js";import{N as q}from"./NegotiableQuoteFragment.js";import{s as _}from"./state.js";import{a as Q}from"./transform-quote-template.js";import{N as U}from"./NegotiableQuoteTemplateFragment.js";const N=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${q}
`,$=async u=>{var r;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));if(!_.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const a=await E(N,{variables:{quoteId:u}}),t=g((r=a==null?void 0:a.data)==null?void 0:r.negotiableQuote);if(!t)throw new Error("Failed to transform quote data");return p.emit("quote-management/quote-data",{quote:t,permissions:_.permissions}),t}catch(a){return Promise.reject(a)}},T=`
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
`,D=async u=>{var a;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));const r=Array.isArray(u)?u:[u];try{const t=await E(T,{variables:{quoteUids:r}}),{errors:d}=t||{};if(d&&d.length){const o=d.map(e=>e==null?void 0:e.message).filter(Boolean).join("; ");throw new Error(o||"Failed to delete negotiable quotes")}const m=(a=t==null?void 0:t.data)==null?void 0:a.deleteNegotiableQuotes;if(!m)throw new Error("No delete result returned");const n={resultStatus:m.result_status,operationResults:(m.operation_results||[]).map(o=>(o==null?void 0:o.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:o==null?void 0:o.quote_uid}:{__typename:"DeleteNegotiableQuoteOperationFailure",quoteUid:o==null?void 0:o.quote_uid,errors:((o==null?void 0:o.errors)||[]).map(s=>({__typename:s==null?void 0:s.__typename,message:s==null?void 0:s.message,uid:s==null?void 0:s.uid}))})},c=n.operationResults.filter(o=>o.__typename==="NegotiableQuoteUidOperationSuccess").map(o=>o.quoteUid);return c.length>0&&p.emit("quote-management/negotiable-quote-deleted",{deletedQuoteUids:c,resultStatus:n.resultStatus}),n}catch(t){return p.emit("quote-management/negotiable-quote-delete-error",{error:t instanceof Error?t:new Error(String(t)),attemptedQuoteUids:r}),Promise.reject(t)}},f=`
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
`,M=async u=>{const{quoteUid:r,comment:a}=u;if(!r)throw new Error("Quote UID is required");return E(f,{variables:{quoteUid:r,comment:a?{comment:a}:null}}).then(d=>{var c,o;const{errors:m}=d;if(m){const e=m.map(i=>i.message).join("; ");throw new Error(`Failed to send quote for review: ${e}`)}const n=g((o=(c=d.data)==null?void 0:c.sendNegotiableQuoteForReview)==null?void 0:o.quote);if(!n)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-sent-for-review",{quote:n,input:{quoteUid:r,comment:a}}),n})},w=`
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
`,R=async u=>{var a;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUids:r}=u;if(!r||r.length===0)throw new Error("Quote UIDs are required");try{const t=await E(w,{variables:{quoteUids:r}}),{errors:d}=t||{};if(d&&d.length){const e=d.map(i=>i==null?void 0:i.message).filter(Boolean).join("; ");throw new Error(e||"Failed to close negotiable quotes")}const m=(a=t==null?void 0:t.data)==null?void 0:a.closeNegotiableQuotes;if(!m)throw new Error("No close result returned");const n={resultStatus:m.result_status,operationResults:(m.operation_results||[]).map(e=>(e==null?void 0:e.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:e==null?void 0:e.quote_uid}:{__typename:"CloseNegotiableQuoteOperationFailure",quoteUid:e==null?void 0:e.quote_uid,errors:((e==null?void 0:e.errors)||[]).map(l=>({__typename:l==null?void 0:l.__typename,message:l==null?void 0:l.message,uid:l==null?void 0:l.uid}))})},c=n.operationResults.filter(e=>e.__typename==="CloseNegotiableQuoteOperationFailure").map(e=>e);if(c.length>0){const e=c.map(i=>i.errors&&i.errors.length>0?i.errors.map(s=>s.message||`Failed to close quote ${i.quoteUid}`).join(", "):`Failed to close quote ${i.quoteUid}`).join("; ");throw new Error(e)}const o=n.operationResults.filter(e=>e.__typename==="NegotiableQuoteUidOperationSuccess").map(e=>e.quoteUid);return o.length>0&&p.emit("quote-management/negotiable-quote-closed",{closedQuoteUids:o,resultStatus:n.resultStatus}),n}catch(t){return p.emit("quote-management/negotiable-quote-close-error",{error:t instanceof Error?t:new Error(String(t)),attemptedQuoteUids:r}),Promise.reject(t)}},b=`
  mutation CREATE_QUOTE_TEMPLATE_MUTATION($cartId: ID!) {
    requestNegotiableQuoteTemplateFromQuote(input: { cart_id: $cartId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${U}
`,v=async u=>{var r;if(!_.authenticated)throw new Error("Unauthorized");if(!u)throw new Error("Cart ID is required");try{const a=await E(b,{variables:{cartId:u}});if(!((r=a==null?void 0:a.data)!=null&&r.requestNegotiableQuoteTemplateFromQuote))throw new Error("Failed to create quote template");const t=Q(a.data.requestNegotiableQuoteTemplateFromQuote);if(!t)throw new Error("Failed to transform quote template data");return p.emit("quote-management/quote-template-data",{quoteTemplate:t,permissions:_.permissions}),t}catch(a){return Promise.reject(a)}},O=`
  mutation renameNegotiableQuote($input: RenameNegotiableQuoteInput!) {
    renameNegotiableQuote(input: $input) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${q}
`,j=async u=>{const{quoteUid:r,quoteName:a,quoteComment:t}=u;if(!r)throw new Error("Quote UID is required");if(!a)throw new Error("Quote name is required");return E(O,{variables:{input:{quote_uid:r,quote_name:a,quote_comment:t||""}}}).then(m=>{var o,e;const{errors:n}=m;if(n){const i=n.map(s=>s.message).join("; ");throw new Error(`Failed to rename quote: ${i}`)}const c=g((e=(o=m.data)==null?void 0:o.renameNegotiableQuote)==null?void 0:e.quote);if(!c)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-renamed",{quote:c,input:{quoteUid:r,quoteName:a,quoteComment:t}}),c})};export{v as a,R as c,D as d,$ as g,j as r,M as s};
//# sourceMappingURL=renameNegotiableQuote.js.map
