/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as _}from"@dropins/tools/event-bus.js";import{f as g,a as q}from"./transform-quote.js";import{N as E}from"./NegotiableQuoteFragment.js";import{s as p}from"./state.js";const Q=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${E}
`,I=async c=>{var n;if(!p.authenticated)return Promise.reject(new Error("Unauthorized"));if(!p.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const a=await g(Q,{variables:{quoteId:c}}),t=q((n=a==null?void 0:a.data)==null?void 0:n.negotiableQuote);if(!t)throw new Error("Failed to transform quote data");return _.emit("quote-management/quote-data",{quote:t,permissions:p.permissions}),t}catch(a){return Promise.reject(a)}},U=`
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
`,T=async c=>{var a;if(!p.authenticated)return Promise.reject(new Error("Unauthorized"));const n=Array.isArray(c)?c:[c];try{const t=await g(U,{variables:{quoteUids:n}}),{errors:d}=t||{};if(d&&d.length){const o=d.map(e=>e==null?void 0:e.message).filter(Boolean).join("; ");throw new Error(o||"Failed to delete negotiable quotes")}const u=(a=t==null?void 0:t.data)==null?void 0:a.deleteNegotiableQuotes;if(!u)throw new Error("No delete result returned");const r={resultStatus:u.result_status,operationResults:(u.operation_results||[]).map(o=>(o==null?void 0:o.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:o==null?void 0:o.quote_uid}:{__typename:"DeleteNegotiableQuoteOperationFailure",quoteUid:o==null?void 0:o.quote_uid,errors:((o==null?void 0:o.errors)||[]).map(s=>({__typename:s==null?void 0:s.__typename,message:s==null?void 0:s.message,uid:s==null?void 0:s.uid}))})},m=r.operationResults.filter(o=>o.__typename==="NegotiableQuoteUidOperationSuccess").map(o=>o.quoteUid);return m.length>0&&_.emit("quote-management/negotiable-quote-deleted",{deletedQuoteUids:m,resultStatus:r.resultStatus}),r}catch(t){return _.emit("quote-management/negotiable-quote-delete-error",{error:t instanceof Error?t:new Error(String(t)),attemptedQuoteUids:n}),Promise.reject(t)}},N=`
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
  ${E}
`,S=async c=>{const{quoteUid:n,comment:a}=c;if(!n)throw new Error("Quote UID is required");return g(N,{variables:{quoteUid:n,comment:a?{comment:a}:null}}).then(d=>{var m,o;const{errors:u}=d;if(u){const e=u.map(i=>i.message).join("; ");throw new Error(`Failed to send quote for review: ${e}`)}const r=q((o=(m=d.data)==null?void 0:m.sendNegotiableQuoteForReview)==null?void 0:o.quote);if(!r)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/quote-sent-for-review",{quote:r,input:{quoteUid:n,comment:a}}),r})},f=`
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
`,F=async c=>{var a;if(!p.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUids:n}=c;if(!n||n.length===0)throw new Error("Quote UIDs are required");try{const t=await g(f,{variables:{quoteUids:n}}),{errors:d}=t||{};if(d&&d.length){const e=d.map(i=>i==null?void 0:i.message).filter(Boolean).join("; ");throw new Error(e||"Failed to close negotiable quotes")}const u=(a=t==null?void 0:t.data)==null?void 0:a.closeNegotiableQuotes;if(!u)throw new Error("No close result returned");const r={resultStatus:u.result_status,operationResults:(u.operation_results||[]).map(e=>(e==null?void 0:e.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:e==null?void 0:e.quote_uid}:{__typename:"CloseNegotiableQuoteOperationFailure",quoteUid:e==null?void 0:e.quote_uid,errors:((e==null?void 0:e.errors)||[]).map(l=>({__typename:l==null?void 0:l.__typename,message:l==null?void 0:l.message,uid:l==null?void 0:l.uid}))})},m=r.operationResults.filter(e=>e.__typename==="CloseNegotiableQuoteOperationFailure").map(e=>e);if(m.length>0){const e=m.map(i=>i.errors&&i.errors.length>0?i.errors.map(s=>s.message||`Failed to close quote ${i.quoteUid}`).join(", "):`Failed to close quote ${i.quoteUid}`).join("; ");throw new Error(e)}const o=r.operationResults.filter(e=>e.__typename==="NegotiableQuoteUidOperationSuccess").map(e=>e.quoteUid);return o.length>0&&_.emit("quote-management/negotiable-quote-closed",{closedQuoteUids:o,resultStatus:r.resultStatus}),r}catch(t){return _.emit("quote-management/negotiable-quote-close-error",{error:t instanceof Error?t:new Error(String(t)),attemptedQuoteUids:n}),Promise.reject(t)}},b=`
  mutation renameNegotiableQuote($input: RenameNegotiableQuoteInput!) {
    renameNegotiableQuote(input: $input) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${E}
`,A=async c=>{const{quoteUid:n,quoteName:a,quoteComment:t}=c;if(!n)throw new Error("Quote UID is required");if(!a)throw new Error("Quote name is required");return g(b,{variables:{input:{quote_uid:n,quote_name:a,quote_comment:t||""}}}).then(u=>{var o,e;const{errors:r}=u;if(r){const i=r.map(s=>s.message).join("; ");throw new Error(`Failed to rename quote: ${i}`)}const m=q((e=(o=u.data)==null?void 0:o.renameNegotiableQuote)==null?void 0:e.quote);if(!m)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/quote-renamed",{quote:m,input:{quoteUid:n,quoteName:a,quoteComment:t}}),m})};export{F as c,T as d,I as g,A as r,S as s};
//# sourceMappingURL=renameNegotiableQuote.js.map
