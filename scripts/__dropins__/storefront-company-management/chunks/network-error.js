/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as t}from"@dropins/tools/fetch-graphql.js";import{events as r}from"@dropins/tools/event-bus.js";const{setEndpoint:n,setFetchGraphQlHeader:h,removeFetchGraphQlHeader:c,setFetchGraphQlHeaders:p,fetchGraphQl:i,getConfig:m}=new t().getMethods(),f=e=>{throw e instanceof DOMException&&e.name==="AbortError"||r.emit("error",{source:"company",type:"network",error:e}),e};export{h as a,p as b,i as f,m as g,f as h,c as r,n as s};
//# sourceMappingURL=network-error.js.map
