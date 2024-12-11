/*! Copyright 2024 Adobe
All Rights Reserved. */
import{T as a}from"./store-config.js";import{signal as t,effect as c}from"@dropins/tools/signals.js";import"./ServerErrorSignal.js";import"@dropins/tools/event-bus.js";import{FetchGraphQL as l}from"@dropins/tools/fetch-graphql.js";import"@dropins/tools/lib.js";const p=t(!0),u=t({pending:!1,data:void 0});c(()=>{var e;(e=u.value.data)!=null&&e.isVirtual&&(p.value=!1)});const T=t({pending:!1,data:void 0}),D=t({pending:!1,data:void 0}),b=t(),k=t(void 0),g=`
  query getStoreConfig {
    storeConfig {
      default_country
      is_guest_checkout_enabled
      is_one_page_checkout_enabled
      shopping_cart_display_shipping
    }
  }
`,{setEndpoint:N,setFetchGraphQlHeader:U,removeFetchGraphQlHeader:I,setFetchGraphQlHeaders:L,fetchGraphQl:h,getConfig:X}=new l().getMethods(),d="US",n={defaultCountry:d,isGuestCheckoutEnabled:!1,isOnePageCheckoutEnabled:!1,shoppingCartDisplaySetting:{shipping:a.EXCLUDING_TAX}},v=async()=>h(g,{method:"GET",cache:"no-cache"}).then(({errors:e,data:s})=>e?n:_(s.storeConfig));function f(e){switch(e){case 1:return a.EXCLUDING_TAX;case 2:return a.INCLUDING_TAX;case 3:return a.INCLUDING_EXCLUDING_TAX;default:return a.EXCLUDING_TAX}}function _(e){if(!e)return n;const{default_country:s,is_guest_checkout_enabled:i,is_one_page_checkout_enabled:o,shopping_cart_display_shipping:r}=e;return{defaultCountry:s||n.defaultCountry,isGuestCheckoutEnabled:i||n.isGuestCheckoutEnabled,isOnePageCheckoutEnabled:o||n.isOnePageCheckoutEnabled,shoppingCartDisplaySetting:{shipping:f(r)}}}export{d as D,n as S,b as a,T as b,u as c,N as d,D as e,U as f,L as g,h,p as i,X as j,v as k,I as r,k as s};
