/*! Copyright 2025 Adobe
All Rights Reserved. */
import{v as e}from"./chunks/getCountries.js";import{f as p,e as m,a as l,d as h,g as y,r as d,s as u,b as f,c as C,u as b}from"./chunks/getCountries.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";const n=async(a={})=>({success:!0,config:a}),o=async()=>{try{return await e("test@test.com"),{companyEnabled:!0}}catch{return{companyEnabled:!1,error:"Company functionality not available"}}};export{o as checkIsCompanyEnabled,p as fetchGraphQl,m as fetchUserPermissions,l as getCompany,h as getConfig,y as getCountries,n as initialize,d as removeFetchGraphQlHeader,u as setEndpoint,f as setFetchGraphQlHeader,C as setFetchGraphQlHeaders,b as updateCompany,e as validateCompanyEmail};
//# sourceMappingURL=api.js.map
