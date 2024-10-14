import{f as r,h as o}from"./fetch-graphql.js";function t(e){return e?{orderCancellationEnabled:e.order_cancellation_enabled,orderCancellationReasons:e.order_cancellation_reasons}:null}const a=`
query STORE_CONFIG_QUERY {
  storeConfig {
    order_cancellation_enabled
    order_cancellation_reasons {
        description
    }
  }
}
`,l=async()=>r(a,{method:"GET",cache:"force-cache"}).then(({errors:e,data:n})=>e?o(e):t(n.storeConfig));export{l as g};
