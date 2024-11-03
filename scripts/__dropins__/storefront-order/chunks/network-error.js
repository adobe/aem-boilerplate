/*! Copyright 2024 Adobe
All Rights Reserved. */
import{events as o}from"@dropins/tools/event-bus.js";const s=r=>{throw r instanceof DOMException&&r.name==="AbortError"||o.emit("order/error",{source:"auth",type:"network",error:r.message}),r};export{s as h};
