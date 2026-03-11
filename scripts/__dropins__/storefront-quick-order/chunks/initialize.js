/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as c}from"@dropins/tools/lib.js";import{FetchGraphQL as a}from"@dropins/tools/fetch-graphql.js";import{events as n}from"@dropins/tools/event-bus.js";const{setEndpoint:m,setFetchGraphQlHeader:C,removeFetchGraphQlHeader:G,setFetchGraphQlHeaders:k,fetchGraphQl:s,getConfig:O}=new a().getMethods(),f=`
  query GET_STORE_CONFIG {
    storeConfig {
      quickorder_active
    }
  }
`,h=r=>{throw r instanceof DOMException&&r.name==="AbortError"||n.emit("b2b-quick-order/error",{source:"auth",type:"network",error:r}),r},g=r=>{const t=r.map(e=>e.message).join(" ");throw Error(t)},d=async()=>await s(f,{method:"GET",cache:"force-cache"}).then(r=>{var t,e,o;return(t=r.errors)!=null&&t.length?g(r.errors):{storeConfig:{quickOrderActive:((o=(e=r==null?void 0:r.data)==null?void 0:e.storeConfig)==null?void 0:o.quickorder_active)??!1}}}).catch(h),i=new c({init:async r=>{const t={quickOrderActive:!1};try{const e=await d();t.quickOrderActive=e.storeConfig.quickOrderActive}catch(e){console.error("Failed to fetch store config:",e)}i.config.setConfig({...t,...r})},listeners:()=>[]}),p=i.config;export{d as a,C as b,p as c,k as d,s as f,O as g,i,G as r,m as s};
//# sourceMappingURL=initialize.js.map
