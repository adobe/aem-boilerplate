/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as o}from"@dropins/tools/event-bus.js";import{FetchGraphQL as s}from"@dropins/tools/fetch-graphql.js";const h=e=>{const r=e instanceof DOMException&&e.name==="AbortError",t=e.name==="PlaceOrderError";throw!r&&!t&&o.emit("purchase-order/error",{source:"purchase-order",type:"network",error:e.message}),e},{setEndpoint:n,setFetchGraphQlHeader:p,removeFetchGraphQlHeader:d,setFetchGraphQlHeaders:i,fetchGraphQl:m,getConfig:f}=new s().getMethods();export{p as a,i as b,m as f,f as g,h,d as r,n as s};
//# sourceMappingURL=fetch-graphql.js.map
