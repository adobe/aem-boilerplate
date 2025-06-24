/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as b,g as v,i as _}from"./chunks/getStoreConfig.js";import{f as d,h as u,a as m}from"./chunks/removeCustomerAddress.js";import{e as A,d as F,g as N,j as O,i as R,k as $,r as H,s as I,b as Q,c as w,u as T}from"./chunks/removeCustomerAddress.js";import{g as J,b as j,a as q,u as z}from"./chunks/updateCustomer.js";import{g as D}from"./chunks/getOrderHistoryList.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";import"./fragments.js";const g=t=>{var r,s;const a=(s=(r=t==null?void 0:t.data)==null?void 0:r.country)==null?void 0:s.available_regions;return a?a.filter(e=>{if(!e)return!1;const{id:i,code:n,name:c}=e;return!!(i&&n&&c)}).map(e=>{const{id:i}=e;return{id:i,text:e.name,value:`${e.code},${e.id}`}}):[]},l=`
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
`,E=async t=>{const a=`_account_regions_${t}`,o=sessionStorage.getItem(a);return o?JSON.parse(o):await d(l,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(r=>{var e;if((e=r.errors)!=null&&e.length)return u(r.errors);const s=g(r);return sessionStorage.setItem(a,JSON.stringify(s)),s}).catch(m)};export{b as config,A as createCustomerAddress,d as fetchGraphQl,F as getAttributesForm,N as getConfig,O as getCountries,J as getCustomer,R as getCustomerAddress,D as getOrderHistoryList,E as getRegions,v as getStoreConfig,_ as initialize,$ as removeCustomerAddress,H as removeFetchGraphQlHeader,I as setEndpoint,Q as setFetchGraphQlHeader,w as setFetchGraphQlHeaders,j as updateCustomer,T as updateCustomerAddress,q as updateCustomerEmail,z as updateCustomerPassword};
