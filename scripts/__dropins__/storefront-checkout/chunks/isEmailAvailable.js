/*! Copyright 2024 Adobe
All Rights Reserved. */
import{c as e,j as r,m as o}from"./fetch-graphql.js";import"./store-config.js";import"./ServerErrorSignal.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";const s=i=>!!(i!=null&&i.is_email_available),t=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,m=i=>{if(!(!i||i.length===0))throw Error(i.map(a=>a.message).join(" "))},v=async i=>{if(!i)throw new e;const{data:a,errors:l}=await r(t,{method:"GET",cache:"no-cache",variables:{email:i}}).catch(o);return l&&m(l),s(a.isEmailAvailable)};export{v as i};
