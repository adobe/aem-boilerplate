/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as w}from"@dropins/tools/event-bus.js";import"./state.js";import{f as c}from"./transform-quote.js";const E=`
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
`,A=async r=>{const s="NEGOTIABLE_QUOTE_ATTACHMENT";try{const t=r==null?void 0:r.name;if(!r||!t)throw new Error("Invalid file");const p=h=>h.map(I=>I.message).join("; "),{data:e,errors:o}=await c(E,{variables:{input:{key:t,media_resource_type:s}}});if(o&&o.length)throw new Error(p(o));const{upload_url:u,key:d}=(e==null?void 0:e.initiateUpload)||{};if(!u||!d)throw new Error("Failed to initiate upload");const a=await fetch(u,{method:"PUT",body:r});if(!a.ok)throw new Error(`Upload failed: ${a.status} ${a.statusText}`);const{data:i,errors:n}=await c(U,{variables:{input:{key:d,media_resource_type:s}}});if(n&&n.length)throw new Error(p(n));const{success:m,key:l,message:T}=(i==null?void 0:i.finishUpload)||{};if(!m||!l)throw new Error(T||"Failed to finish upload");return{key:l}}catch(t){throw w.emit("quote-management/file-upload-error",{error:(t==null?void 0:t.message)||"File upload failed",fileName:r==null?void 0:r.name}),t instanceof Error?t:new Error("File upload failed")}};export{A as u};
//# sourceMappingURL=uploadFile.js.map
