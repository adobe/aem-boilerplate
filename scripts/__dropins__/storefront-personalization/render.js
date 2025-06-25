/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsx as e}from"@dropins/tools/preact-jsx-runtime.js";import{Render as f}from"@dropins/tools/lib.js";import{useState as i,useEffect as m}from"@dropins/tools/preact-hooks.js";import{UIProvider as c}from"@dropins/tools/components.js";import{events as a}from"@dropins/tools/event-bus.js";const p={"":{}},u={default:p},d=({children:o})=>{const[t,n]=i("en_US");return m(()=>{const r=a.on("locale",s=>{n(s)},{eager:!0});return()=>{r==null||r.off()}},[]),e(c,{lang:t,langDefinitions:u,children:o})},x=new f(e(d,{}));export{x as render};
