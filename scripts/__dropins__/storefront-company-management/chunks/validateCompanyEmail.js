/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as i}from"@dropins/tools/event-bus.js";import{FetchGraphQL as t}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:m,setFetchGraphQlHeader:c,removeFetchGraphQlHeader:h,setFetchGraphQlHeaders:p,fetchGraphQl:s,getConfig:d}=new t().getMethods(),E=a=>{throw a instanceof DOMException&&a.name==="AbortError"||i.emit("error",{source:"company",type:"network",error:a}),a},v=a=>{const e=a.map(r=>r.message).join(" ");throw Error(e)},o=`
  query validateCompanyEmail($email: String!) {
    isCompanyEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,b=async a=>{try{const e=await s(o,{variables:{email:a}});return e.errors?{isValid:!1,error:"Unable to validate email"}:{isValid:e.data.isCompanyEmailAvailable.is_email_available,error:e.data.isCompanyEmailAvailable.is_email_available?void 0:"This email is already used by another company"}}catch{return{isValid:!1,error:"Unable to validate email"}}};export{c as a,p as b,E as c,s as f,d as g,v as h,h as r,m as s,b as v};
//# sourceMappingURL=validateCompanyEmail.js.map
