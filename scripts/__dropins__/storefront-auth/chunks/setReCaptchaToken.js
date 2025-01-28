/*! Copyright 2025 Adobe
All Rights Reserved. */
import{verifyReCaptcha as t}from"@dropins/tools/recaptcha.js";import"@dropins/tools/event-bus.js";import{a as e}from"./network-error.js";const s=async()=>{const a=await t();a&&e("X-ReCaptcha",a)};export{s};
