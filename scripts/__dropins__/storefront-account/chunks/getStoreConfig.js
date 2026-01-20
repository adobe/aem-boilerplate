/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as e,h as m,a as u}from"./removeCustomerAddress.js";const f=t=>{var a,r,c,_,i,o,d,h;return{baseMediaUrl:(r=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:r.base_media_url,minLength:+((_=(c=t==null?void 0:t.data)==null?void 0:c.storeConfig)==null?void 0:_.minimum_password_length)||3,requiredCharacterClasses:+((o=(i=t==null?void 0:t.data)==null?void 0:i.storeConfig)==null?void 0:o.required_character_classes_number)||0,storeCode:((h=(d=t==null?void 0:t.data)==null?void 0:d.storeConfig)==null?void 0:h.store_code)??""}},g=`
  query GET_STORE_CONFIG {
    storeConfig {
      base_media_url
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
    }
  }
`,C=async()=>await e(g,{method:"GET",cache:"force-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?m(t.errors):f(t)}).catch(u);export{C as g};
//# sourceMappingURL=getStoreConfig.js.map
