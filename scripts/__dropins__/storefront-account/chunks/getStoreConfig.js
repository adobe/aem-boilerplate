/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as d}from"@dropins/tools/lib.js";import{f as h,h as g,a as m}from"./removeCustomerAddress.js";const _=new d({init:async t=>{const a={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};_.config.setConfig({...a,...t})},listeners:()=>[]}),G=_.config,u=t=>{var a,r,i,o,e,c,n,f;return{baseMediaUrl:(r=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:r.base_media_url,minLength:+((o=(i=t==null?void 0:t.data)==null?void 0:i.storeConfig)==null?void 0:o.minimum_password_length)||3,requiredCharacterClasses:+((c=(e=t==null?void 0:t.data)==null?void 0:e.storeConfig)==null?void 0:c.required_character_classes_number)||0,storeCode:((f=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:f.store_code)??""}},l=`
  query GET_STORE_CONFIG {
    storeConfig {
      base_media_url
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
    }
  }
`,b=async()=>await h(l,{method:"GET",cache:"force-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?g(t.errors):u(t)}).catch(m);export{G as c,b as g,_ as i};
//# sourceMappingURL=getStoreConfig.js.map
