/*! Copyright 2024 Adobe
All Rights Reserved. */
import{Initializer as f}from"@dropins/tools/lib.js";import{f as h,m as _,l as m}from"./removeCustomerAddress.js";const c=new f({init:async t=>{const r={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};c.config.setConfig({...r,...t})},listeners:()=>[]}),C=c.config,g=t=>{var r,a,i,e,o,n;return{baseMediaUrl:(a=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:a.base_media_url,minLength:+((e=(i=t==null?void 0:t.data)==null?void 0:i.storeConfig)==null?void 0:e.minimum_password_length)||3,requiredCharacterClasses:+((n=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:n.required_character_classes_number)||0}},l=`
  query GET_STORE_CONFIG {
    storeConfig {
      base_media_url
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
    }
  }
`,s=async()=>await h(l,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?_(t.errors):g(t)}).catch(m);export{C as c,s as g,c as i};
