/*! Copyright 2026 Adobe
All Rights Reserved. */
import{d as r}from"./fetch-graphql.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";const i=e=>!e||!(e!=null&&e.available_credit)||e.available_credit.value==null||!e.available_credit.currency?null:{availableCredit:{value:e.available_credit.value,currency:e.available_credit.currency},exceedLimit:(e==null?void 0:e.exceed_limit)||!1},l=`
  query getCompanyCredit {
    company {
      credit {
        exceed_limit
        available_credit {
          value
          currency
        }
      }
    }
  }
`,u=async()=>await r({type:"query",query:l,options:{method:"GET",cache:"no-cache"},path:"company.credit",transformer:i,defaultValueOnFail:null});export{u as g};
//# sourceMappingURL=getCompanyCredit.js.map
