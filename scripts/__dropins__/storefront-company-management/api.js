/*! Copyright 2025 Adobe
All Rights Reserved. */
import{v as e}from"./chunks/getCountries.js";import{f as i,a as m,e as l,g as y,c as h,r as d,s as u,b as C,d as f,u as b}from"./chunks/getCountries.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";const n=async(a={})=>({success:!0,config:a}),o=async()=>{try{return await e("test@test.com"),{companyEnabled:!0}}catch{return{companyEnabled:!1,error:"Company functionality not available"}}};export{o as checkIsCompanyEnabled,i as fetchGraphQl,m as getCompany,l as getConfig,y as getCountries,n as initialize,h as removeFetchGraphQlHeader,d as resetCompanyCache,u as setEndpoint,C as setFetchGraphQlHeader,f as setFetchGraphQlHeaders,b as updateCompany,e as validateCompanyEmail};
//# sourceMappingURL=api.js.map
