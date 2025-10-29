/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as I,fetchGraphQl as w}from"@dropins/tools/fetch-graphql.js";import{events as h}from"@dropins/tools/event-bus.js";import{N as _}from"./NegotiableQuoteFragment.js";import{t as N}from"./transform-quote.js";const{setEndpoint:F,setFetchGraphQlHeader:y,removeFetchGraphQlHeader:G,setFetchGraphQlHeaders:b,fetchGraphQl:l,getConfig:L}=new I().getMethods(),g=`
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
  ${_}
`,M=async t=>{const{cartId:n,quoteName:e,comment:o,attachments:r,isDraft:s}=t;if(!n)throw new Error("Cart ID is required");if(!e)throw new Error("Quote name is required");if(!o)throw new Error("Comment is required");return w(g,{variables:{cartId:n,quoteName:e,comment:r!=null&&r.length?{comment:o,attachments:r}:{comment:o},isDraft:s}}).then(m=>{var i,u;const{errors:p}=m;if(p){const d=p.map(c=>c.message).join("; ");throw new Error(`Failed to request negotiable quote: ${d}`)}const a=N((u=(i=m.data)==null?void 0:i.requestNegotiableQuote)==null?void 0:u.quote);if(!a)throw new Error("Failed to transform quote data: Invalid response structure");return h.emit("quote-management/negotiable-quote-requested",{quote:a,input:{cartId:n,quoteName:e,comment:o,attachments:r,isDraft:s}}),a})},U=`
  mutation INITIATE_UPLOAD_MUTATION($input: initiateUploadInput!) {
    initiateUpload(input: $input) {
      upload_url
      key
      expires_at
    }
  }
`,q=`
  mutation FINISH_UPLOAD_MUTATION($input: finishUploadInput!) {
    finishUpload(input: $input) {
      success
      key
      message
    }
  }
`,D=async t=>{const n="NEGOTIABLE_QUOTE_ATTACHMENT";try{const e=t==null?void 0:t.name;if(!t||!e)throw new Error("Invalid file");const o=T=>T.map(f=>f.message).join("; "),{data:r,errors:s}=await l(U,{variables:{input:{key:e,media_resource_type:n}}});if(s&&s.length)throw new Error(o(s));const{upload_url:m,key:p}=(r==null?void 0:r.initiateUpload)||{};if(!m||!p)throw new Error("Failed to initiate upload");const a=await fetch(m,{method:"PUT",body:t});if(!a.ok)throw new Error(`Upload failed: ${a.status} ${a.statusText}`);const{data:i,errors:u}=await l(q,{variables:{input:{key:p,media_resource_type:n}}});if(u&&u.length)throw new Error(o(u));const{success:d,key:c,message:E}=(i==null?void 0:i.finishUpload)||{};if(!d||!c)throw new Error(E||"Failed to finish upload");return{key:c}}catch(e){throw h.emit("quote-management/file-upload-error",{error:(e==null?void 0:e.message)||"File upload failed",fileName:t==null?void 0:t.name}),e instanceof Error?e:new Error("File upload failed")}};export{y as a,G as b,b as c,l as f,L as g,M as r,F as s,D as u};
//# sourceMappingURL=uploadFile.js.map
