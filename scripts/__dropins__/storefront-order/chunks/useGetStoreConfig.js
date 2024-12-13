/*! Copyright 2024 Adobe
All Rights Reserved. */
import{useState as i,useEffect as s}from"@dropins/tools/preact-hooks.js";import{g as f}from"./getStoreConfig.js";const c=()=>{const[n,e]=i(null);return s(()=>{const o=sessionStorage.getItem("orderStoreConfig"),r=o?JSON.parse(o):null;r?e(r):f().then(t=>{t&&(sessionStorage.setItem("orderStoreConfig",JSON.stringify(t)),e(t))})},[]),n};export{c as u};
