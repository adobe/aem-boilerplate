/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as c}from"@dropins/tools/lib.js";import{FetchGraphQL as a}from"@dropins/tools/fetch-graphql.js";import{events as n}from"@dropins/tools/event-bus.js";const i=new c({init:async r=>{const e={quickOrderActive:!1};try{const t=await g();e.quickOrderActive=t.storeConfig.quickOrderActive}catch(t){console.error("[Quick Order] Failed to fetch store config:",t)}i.config.setConfig({...e,...r})},listeners:()=>[]}),m=i.config,{setEndpoint:C,setFetchGraphQlHeader:k,removeFetchGraphQlHeader:G,setFetchGraphQlHeaders:O,fetchGraphQl:s,getConfig:p}=new a().getMethods(),f=`
  query GET_STORE_CONFIG {
    storeConfig {
      quickorder_active
    }
  }
`,h=r=>{throw r instanceof DOMException&&r.name==="AbortError"||n.emit("b2b-quick-order/error",{source:"auth",type:"network",error:r}),r},d=r=>{const e=r.map(t=>t.message).join(" ");throw Error(e)},g=async()=>await s(f,{method:"GET",cache:"force-cache"}).then(r=>{var e,t,o;return(e=r.errors)!=null&&e.length?d(r.errors):{storeConfig:{quickOrderActive:((o=(t=r==null?void 0:r.data)==null?void 0:t.storeConfig)==null?void 0:o.quickorder_active)??!1}}}).catch(h);export{g as a,k as b,m as c,O as d,s as f,p as g,i,G as r,C as s};
//# sourceMappingURL=getStoreConfig.js.map
