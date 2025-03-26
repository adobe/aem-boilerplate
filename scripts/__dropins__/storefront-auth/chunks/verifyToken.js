/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as u}from"@dropins/tools/lib.js";import{events as o}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{a as h,d,C as a}from"./getStoreConfig.js";import{a as g,f as m,r as C}from"./network-error.js";const s=new u({init:async t=>{const e={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...t};s.config.setConfig(e),p(e.authHeaderConfig.header,e.authHeaderConfig.tokenPrefix)},listeners:()=>[]}),T=s.config,l=`
  query VALIDATE_TOKEN {
    customerCart {
      id
    }
  }
`,p=async(t="Authorization",r="Bearer")=>{const e=h(a.auth_dropin_user_token);if(o.emit("authenticated",!!e),!!e)return g(t,`${r} ${e}`),m(l).then(f=>{var n;(n=f.errors)!=null&&n.find(c=>{var i;return((i=c.extensions)==null?void 0:i.category)==="graphql-authentication"})&&(d(a.auth_dropin_user_token),C(t),o.emit("authenticated",!1))})};export{T as c,s as i,p as v};
