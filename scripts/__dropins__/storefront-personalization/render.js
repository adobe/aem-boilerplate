/*! Copyright 2026 Adobe
All Rights Reserved. */
import{jsx as o}from"@dropins/tools/preact-jsx-runtime.js";import{deepmerge as g,Render as c}from"@dropins/tools/lib.js";import{useState as a,useEffect as p}from"@dropins/tools/preact-hooks.js";import{UIProvider as d}from"@dropins/tools/components.js";import{events as u}from"@dropins/tools/event-bus.js";import{config as l}from"./api.js";import"@dropins/tools/fetch-graphql.js";const D={"":{}},S={default:D},U=({children:t})=>{var e;const[r,i]=a("en_US");p(()=>{const n=u.on("locale",m=>{i(m)},{eager:!0});return()=>{n==null||n.off()}},[]);const s=(e=l.getConfig())==null?void 0:e.langDefinitions,f=g(S,s??{});return o(d,{lang:r,langDefinitions:f,children:t})},C=new c(o(U,{}));export{C as render};
//# sourceMappingURL=render.js.map
