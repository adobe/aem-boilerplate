/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as f}from"@dropins/tools/lib.js";import{events as r}from"@dropins/tools/event-bus.js";import{c as g,f as m,h as d,d as I,i as A,j as p}from"./type-registry.js";const s="DROPIN__PERSONALIZATION__REQUIRE_UPDATE__DATA",o="DROPIN__PERSONALIZATION__AUTH",i=async e=>{const t=await E(e);t!==null&&l(t)},n=async()=>{const e=await g();return(e==null?void 0:e.shareActiveSegments)&&e.shareCustomerGroup&&e.shareAppliedCartRule},u=new f({init:async e=>{const t={};u.config.setConfig({...t,...e})},listeners:()=>[r.on("authenticated",async e=>{if(!await n())return;const a=sessionStorage.getItem(o);a!==null&&a==="true"===e||(e?(localStorage.setItem(s,"true"),sessionStorage.setItem(o,"true")):(sessionStorage.setItem(o,"false"),l({segments:[],groups:[],cartRules:[]})))},{eager:!0}),r.on("cart/updated",async e=>{const t=await n();e===null||!t||i(e.id)},{eager:!0}),r.on("cart/initialized",async e=>{const t=await n();if(e===null||!t)return;const a=localStorage.getItem(s);(a!==null?a==="true":!1)&&(i(e.id),localStorage.setItem(s,"false"))},{eager:!0}),r.on("order/placed",async()=>{await n()&&localStorage.setItem(s,"true")},{eager:!0})]}),T=u.config;function _(e){return e?{groups:[e.customerGroup.uid],segments:c(e.customerSegments),cartRules:c(e.cart.rules)}:{groups:[],segments:[],cartRules:[]}}function c(e){return e.length?e.map(t=>t.uid):[]}const S=`
query PERSONALIZATION_DATA(
      $cartId: String!
    ) {
      customerGroup {
        uid
      }
      customerSegments(cartId: $cartId) {
        uid
      }
      cart(cart_id: $cartId) {
        rules {
          uid
        }
      }
    }
`,E=async e=>m(S,{variables:{cartId:e}}).then(({errors:t,data:a})=>t?d(t):_(a)),l=async e=>{p();const t=I(),a=JSON.stringify(e);t!==a&&(await A(a),r.emit("personalization/updated",e))};export{T as c,E as f,u as i,l as s};
//# sourceMappingURL=savePersonalizationData.js.map
