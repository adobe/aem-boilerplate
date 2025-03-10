/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as l}from"@dropins/tools/fetch-graphql.js";import{T as a}from"./store-config.js";import"./state.js";import{signal as t,effect as u}from"@dropins/tools/signals.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const g=t(!0),p=t({pending:!1,data:void 0});u(()=>{var e;(e=p.value.data)!=null&&e.isVirtual&&(g.value=!1)});const y=t({pending:!1,data:void 0}),T=t({available:!0,error:"",initialized:!1,pending:!1,value:""}),D=t({pending:!1,data:void 0}),v=t(),N=t(void 0),U=t(),{setEndpoint:A,setFetchGraphQlHeader:I,removeFetchGraphQlHeader:L,setFetchGraphQlHeaders:X,fetchGraphQl:d,getConfig:F}=new l().getMethods(),h=`
  query getStoreConfig {
    storeConfig {
      default_country
      is_checkout_agreements_enabled
      is_guest_checkout_enabled
      is_one_page_checkout_enabled
      shopping_cart_display_shipping
    }
  }
`,_="US",n={defaultCountry:_,isCheckoutAgreementsEnabled:!0,isGuestCheckoutEnabled:!1,isOnePageCheckoutEnabled:!1,shoppingCartDisplaySetting:{shipping:a.EXCLUDING_TAX}},O=async()=>d(h,{method:"GET",cache:"no-cache"}).then(({errors:e,data:s})=>e?n:C(s.storeConfig));function f(e){switch(e){case 1:return a.EXCLUDING_TAX;case 2:return a.INCLUDING_TAX;case 3:return a.INCLUDING_EXCLUDING_TAX;default:return a.EXCLUDING_TAX}}function C(e){if(!e)return n;const{default_country:s,is_checkout_agreements_enabled:i,is_guest_checkout_enabled:o,is_one_page_checkout_enabled:r,shopping_cart_display_shipping:c}=e;return{defaultCountry:s||n.defaultCountry,isCheckoutAgreementsEnabled:i,isGuestCheckoutEnabled:o||n.isGuestCheckoutEnabled,isOnePageCheckoutEnabled:r||n.isOnePageCheckoutEnabled,shoppingCartDisplaySetting:{shipping:f(c)}}}export{_ as D,n as S,U as a,T as b,p as c,v as d,D as e,y as f,d as g,A as h,g as i,I as j,X as k,F as l,O as m,L as r,N as s};
