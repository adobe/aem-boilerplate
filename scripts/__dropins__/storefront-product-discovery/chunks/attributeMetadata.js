/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as a}from"./productSearch.js";const r=`
  query attributeMetadata {
    attributeMetadata {
      sortable {
        label
        attribute
        numeric
      }
      filterableInSearch {
        label
        attribute
        numeric
      }
    }
  }
`,n=async()=>a(r,{method:"GET"}).then(({errors:t,data:e})=>t?(console.log("error",t),null):e);export{n as a};
//# sourceMappingURL=attributeMetadata.js.map
