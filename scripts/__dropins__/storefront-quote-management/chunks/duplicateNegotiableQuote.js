/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as p}from"@dropins/tools/event-bus.js";import{f as E,t as q}from"./transform-quote.js";import{N as g}from"./NegotiableQuoteFragment.js";import{s as _}from"./state.js";import{a as Q}from"./transform-quote-template.js";import{N as U}from"./NegotiableQuoteTemplateFragment.js";const N=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${g}
`,S=async s=>{var a;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));if(!_.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const o=await E(N,{variables:{quoteId:s}}),e=q((a=o==null?void 0:o.data)==null?void 0:a.negotiableQuote);if(!e)throw new Error("Failed to transform quote data");return p.emit("quote-management/quote-data",{quote:e,permissions:_.permissions}),e}catch(o){return Promise.reject(o)}},T=`
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
`,M=async s=>{var o;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));const a=Array.isArray(s)?s:[s];try{const e=await E(T,{variables:{quoteUids:a}}),{errors:c}=e||{};if(c&&c.length){const r=c.map(t=>t==null?void 0:t.message).filter(Boolean).join("; ");throw new Error(r||"Failed to delete negotiable quotes")}const m=(o=e==null?void 0:e.data)==null?void 0:o.deleteNegotiableQuotes;if(!m)throw new Error("No delete result returned");const i={resultStatus:m.result_status,operationResults:(m.operation_results||[]).map(r=>(r==null?void 0:r.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:r==null?void 0:r.quote_uid}:{__typename:"DeleteNegotiableQuoteOperationFailure",quoteUid:r==null?void 0:r.quote_uid,errors:((r==null?void 0:r.errors)||[]).map(u=>({__typename:u==null?void 0:u.__typename,message:u==null?void 0:u.message,uid:u==null?void 0:u.uid}))})},d=i.operationResults.filter(r=>r.__typename==="NegotiableQuoteUidOperationSuccess").map(r=>r.quoteUid);return d.length>0&&p.emit("quote-management/negotiable-quote-deleted",{deletedQuoteUids:d,resultStatus:i.resultStatus}),i}catch(e){return p.emit("quote-management/negotiable-quote-delete-error",{error:e instanceof Error?e:new Error(String(e)),attemptedQuoteUids:a}),Promise.reject(e)}},f=`
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
`,R=async s=>{const{quoteUid:a,comment:o,attachments:e}=s;if(!a)throw new Error("Quote UID is required");const c=e!=null&&e.length?{comment:o||"",attachments:e}:o?{comment:o}:null;return E(f,{variables:{quoteUid:a,comment:c}}).then(m=>{var r,t;const{errors:i}=m;if(i){const n=i.map(u=>u.message).join("; ");throw new Error(`Failed to send quote for review: ${n}`)}const d=q((t=(r=m.data)==null?void 0:r.sendNegotiableQuoteForReview)==null?void 0:t.quote);if(!d)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-sent-for-review",{quote:d,input:{quoteUid:a,comment:o,attachments:e}}),d})},w=`
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
`,v=async s=>{var o;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUids:a}=s;if(!a||a.length===0)throw new Error("Quote UIDs are required");try{const e=await E(w,{variables:{quoteUids:a}}),{errors:c}=e||{};if(c&&c.length){const t=c.map(n=>n==null?void 0:n.message).filter(Boolean).join("; ");throw new Error(t||"Failed to close negotiable quotes")}const m=(o=e==null?void 0:e.data)==null?void 0:o.closeNegotiableQuotes;if(!m)throw new Error("No close result returned");const i={resultStatus:m.result_status,operationResults:(m.operation_results||[]).map(t=>(t==null?void 0:t.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:t==null?void 0:t.quote_uid}:{__typename:"CloseNegotiableQuoteOperationFailure",quoteUid:t==null?void 0:t.quote_uid,errors:((t==null?void 0:t.errors)||[]).map(l=>({__typename:l==null?void 0:l.__typename,message:l==null?void 0:l.message,uid:l==null?void 0:l.uid}))})},d=i.operationResults.filter(t=>t.__typename==="CloseNegotiableQuoteOperationFailure").map(t=>t);if(d.length>0){const t=d.map(n=>n.errors&&n.errors.length>0?n.errors.map(u=>u.message||`Failed to close quote ${n.quoteUid}`).join(", "):`Failed to close quote ${n.quoteUid}`).join("; ");throw new Error(t)}const r=i.operationResults.filter(t=>t.__typename==="NegotiableQuoteUidOperationSuccess").map(t=>t.quoteUid);return r.length>0&&p.emit("quote-management/negotiable-quote-closed",{closedQuoteUids:r,resultStatus:i.resultStatus}),i}catch(e){return p.emit("quote-management/negotiable-quote-close-error",{error:e instanceof Error?e:new Error(String(e)),attemptedQuoteUids:a}),Promise.reject(e)}},b=`
  mutation CREATE_QUOTE_TEMPLATE_MUTATION($cartId: ID!) {
    requestNegotiableQuoteTemplateFromQuote(input: { cart_id: $cartId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${U}
`,L=async s=>{var a;if(!_.authenticated)throw new Error("Unauthorized");if(!s)throw new Error("Cart ID is required");try{const o=await E(b,{variables:{cartId:s}});if(!((a=o==null?void 0:o.data)!=null&&a.requestNegotiableQuoteTemplateFromQuote))throw new Error("Failed to create quote template");const e=Q(o.data.requestNegotiableQuoteTemplateFromQuote);if(!e)throw new Error("Failed to transform quote template data");return p.emit("quote-management/quote-template-data",{quoteTemplate:e,permissions:_.permissions}),e}catch(o){return Promise.reject(o)}},I=`
  mutation renameNegotiableQuote($input: RenameNegotiableQuoteInput!) {
    renameNegotiableQuote(input: $input) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${g}
`,j=async s=>{const{quoteUid:a,quoteName:o,quoteComment:e}=s;if(!a)throw new Error("Quote UID is required");if(!o)throw new Error("Quote name is required");return E(I,{variables:{input:{quote_uid:a,quote_name:o,quote_comment:e||""}}}).then(m=>{var r,t;const{errors:i}=m;if(i){const n=i.map(u=>u.message).join("; ");throw new Error(`Failed to rename quote: ${n}`)}const d=q((t=(r=m.data)==null?void 0:r.renameNegotiableQuote)==null?void 0:t.quote);if(!d)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-renamed",{quote:d,input:{quoteUid:a,quoteName:o,quoteComment:e}}),d})},O=`
  mutation DUPLICATE_NEGOTIABLE_QUOTE_MUTATION($quoteUid: ID!, $duplicatedQuoteUid: ID!) {
    duplicateNegotiableQuote(input: { quote_uid: $quoteUid, duplicated_quote_uid: $duplicatedQuoteUid }) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${g}
`,P=async s=>{if(!_.authenticated)throw new Error("Unauthorized");const{quoteUid:a,duplicatedQuoteUid:o,hasOutOfStockItems:e}=s;if(!a||!a.trim())throw new Error("Quote UID is required");if(!o||!o.trim())throw new Error("Duplicated Quote UID is required");return E(O,{variables:{quoteUid:a,duplicatedQuoteUid:o}}).then(c=>{var d,r;const{errors:m}=c;if(m){const t=m.map(n=>n.message).join("; ");throw new Error(`Failed to duplicate quote: ${t}`)}const i=q((r=(d=c.data)==null?void 0:d.duplicateNegotiableQuote)==null?void 0:r.quote);if(!i)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-duplicated",{quote:i,input:{quoteUid:a,duplicatedQuoteUid:o},hasOutOfStockItems:e}),i})};export{L as a,P as b,v as c,M as d,S as g,j as r,R as s};
//# sourceMappingURL=duplicateNegotiableQuote.js.map
