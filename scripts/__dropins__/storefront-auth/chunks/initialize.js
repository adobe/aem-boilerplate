/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as n}from"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{v as t}from"./verifyToken.js";const e=new n({init:async o=>{const i={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...o};e.config.setConfig(i),t(i.authHeaderConfig.header,i.authHeaderConfig.tokenPrefix)},listeners:()=>[]}),c=e.config;export{c,e as i};
//# sourceMappingURL=initialize.js.map
