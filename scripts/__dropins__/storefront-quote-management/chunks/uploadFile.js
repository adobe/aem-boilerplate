/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as E}from"@dropins/tools/event-bus.js";import{N as w}from"./NegotiableQuoteFragment.js";import{f as l,a as f}from"./transform-quote.js";import"./state.js";const N=`
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
  ${w}
`,$=async t=>{const{cartId:n,quoteName:e,comment:o,attachments:r,isDraft:i}=t;if(!n)throw new Error("Cart ID is required");if(!e)throw new Error("Quote name is required");if(!o)throw new Error("Comment is required");return l(N,{variables:{cartId:n,quoteName:e,comment:r!=null&&r.length?{comment:o,attachments:r}:{comment:o},isDraft:i}}).then(m=>{var s,u;const{errors:d}=m;if(d){const c=d.map(p=>p.message).join("; ");throw new Error(`Failed to request negotiable quote: ${c}`)}const a=f((u=(s=m.data)==null?void 0:s.requestNegotiableQuote)==null?void 0:u.quote);if(!a)throw new Error("Failed to transform quote data: Invalid response structure");return E.emit("quote-management/negotiable-quote-requested",{quote:a,input:{cartId:n,quoteName:e,comment:o,attachments:r,isDraft:i}}),a})},h=`
  mutation INITIATE_UPLOAD_MUTATION($input: initiateUploadInput!) {
    initiateUpload(input: $input) {
      upload_url
      key
      expires_at
    }
  }
`,U=`
  mutation FINISH_UPLOAD_MUTATION($input: finishUploadInput!) {
    finishUpload(input: $input) {
      success
      key
      message
    }
  }
`,Q=async t=>{const n="NEGOTIABLE_QUOTE_ATTACHMENT";try{const e=t==null?void 0:t.name;if(!t||!e)throw new Error("Invalid file");const o=I=>I.map(_=>_.message).join("; "),{data:r,errors:i}=await l(h,{variables:{input:{key:e,media_resource_type:n}}});if(i&&i.length)throw new Error(o(i));const{upload_url:m,key:d}=(r==null?void 0:r.initiateUpload)||{};if(!m||!d)throw new Error("Failed to initiate upload");const a=await fetch(m,{method:"PUT",body:t});if(!a.ok)throw new Error(`Upload failed: ${a.status} ${a.statusText}`);const{data:s,errors:u}=await l(U,{variables:{input:{key:d,media_resource_type:n}}});if(u&&u.length)throw new Error(o(u));const{success:c,key:p,message:T}=(s==null?void 0:s.finishUpload)||{};if(!c||!p)throw new Error(T||"Failed to finish upload");return{key:p}}catch(e){throw E.emit("quote-management/file-upload-error",{error:(e==null?void 0:e.message)||"File upload failed",fileName:t==null?void 0:t.name}),e instanceof Error?e:new Error("File upload failed")}};export{$ as r,Q as u};
//# sourceMappingURL=uploadFile.js.map
