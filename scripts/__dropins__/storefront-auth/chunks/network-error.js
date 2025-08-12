/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as e}from"@dropins/tools/fetch-graphql.js";import{events as r}from"@dropins/tools/event-bus.js";const{setEndpoint:h,setFetchGraphQlHeader:n,removeFetchGraphQlHeader:c,setFetchGraphQlHeaders:p,fetchGraphQl:i,getConfig:f}=new e().getMethods(),m=t=>{throw t instanceof DOMException&&t.name==="AbortError"||r.emit("auth/error",{source:"auth",type:"network",error:t}),t};export{n as a,p as b,i as f,f as g,m as h,c as r,h as s};
//# sourceMappingURL=network-error.js.map
