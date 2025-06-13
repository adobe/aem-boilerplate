/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as h}from"./chunks/attributeMetadata.js";import{f as d,g,p as m,r as u,s as G,a as Q,b as x}from"./chunks/productSearch.js";import{Initializer as o}from"@dropins/tools/lib.js";import{events as r}from"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";const e=new o({init:async t=>{const a={};e.config.setConfig({...a,...t})},listeners:()=>[r.on("authenticated",t=>{console.log("authenticated",t)})]}),c=e.config;export{h as attributeMetadata,c as config,d as fetchGraphQl,g as getConfig,e as initialize,m as productSearch,u as removeFetchGraphQlHeader,G as setEndpoint,Q as setFetchGraphQlHeader,x as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
