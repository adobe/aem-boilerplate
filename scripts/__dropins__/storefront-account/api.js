/*! Copyright 2026 Adobe
All Rights Reserved. */
import{c as b,i as v}from"./chunks/initialize.js";import{f as d,h as m,a as u}from"./chunks/removeCustomerAddress.js";import{e as _,d as A,g as F,j as N,i as O,k as R,r as $,s as H,b as I,c as Q,u as w}from"./chunks/removeCustomerAddress.js";import{g as k,b as J,a as j,u as q}from"./chunks/updateCustomer.js";import{g as B}from"./chunks/getOrderHistoryList.js";import{g as K}from"./chunks/getStoreConfig.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";import"./fragments.js";const g=t=>{var r,s;const a=(s=(r=t==null?void 0:t.data)==null?void 0:r.country)==null?void 0:s.available_regions;return a?a.filter(e=>{if(!e)return!1;const{id:i,code:n,name:c}=e;return!!(i&&n&&c)}).map(e=>{const{id:i}=e;return{id:i,text:e.name,value:`${e.code},${e.id}`}}):[]},f=`
  query GET_REGIONS($countryCode: String!) {
    country(id: $countryCode) {
      id
      available_regions {
        id
        code
        name
      }
    }
  }
`,E=async t=>{const a=`_account_regions_${t}`,o=sessionStorage.getItem(a);return o?JSON.parse(o):await d(f,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(r=>{var e;if((e=r.errors)!=null&&e.length)return m(r.errors);const s=g(r);return sessionStorage.setItem(a,JSON.stringify(s)),s}).catch(u)};export{b as config,_ as createCustomerAddress,d as fetchGraphQl,A as getAttributesForm,F as getConfig,N as getCountries,k as getCustomer,O as getCustomerAddress,B as getOrderHistoryList,E as getRegions,K as getStoreConfig,v as initialize,R as removeCustomerAddress,$ as removeFetchGraphQlHeader,H as setEndpoint,I as setFetchGraphQlHeader,Q as setFetchGraphQlHeaders,J as updateCustomer,w as updateCustomerAddress,j as updateCustomerEmail,q as updateCustomerPassword};
//# sourceMappingURL=api.js.map
