/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as i,t as c}from"./chunks/fetchProductData.js";import{c as m,f as C,j as F,h as k,k as R,l as U,i as A,r as E,b as _,d as x,e as Q}from"./chunks/fetchProductData.js";import{PRODUCT_FRAGMENT as p}from"./fragments.js";import"@dropins/tools/event-bus.js";import{g as V,s as I}from"./chunks/getProductConfigurationValues.js";import{i as O,s as S}from"./chunks/isProductConfigurationValid.js";import{g as b}from"./chunks/getFetchedProductData.js";import"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const d=`
query GET_PRODUCTS_DATA($skus: [String]) {
    products(skus: $skus) {
        ...PRODUCT_FRAGMENT
    }
}

${p}
`,P=async(s,e)=>{if(!s||s.length===0)return null;const n=s.map(r=>r.sku),{data:a}=await i(d,{method:"GET",variables:{skus:n}}),o=a==null?void 0:a.products;if(!o||o.length===0)return null;const u=s.reduce((r,t)=>(r[t.sku]=t,r),{});return e?o:o.map(r=>{const t=u[r.sku];return t!=null&&t.optionsUIDs&&(r.optionUIDs=t.optionsUIDs),c(r,{preselectFirstOption:t==null?void 0:t.preselectFirstOption})})};export{m as config,i as fetchGraphQl,C as fetchProductData,F as getConfig,k as getFetchGraphQlHeader,b as getFetchedProductData,V as getProductConfigurationValues,R as getProductData,P as getProductsData,U as getRefinedProduct,A as initialize,O as isProductConfigurationValid,E as removeFetchGraphQlHeader,_ as setEndpoint,x as setFetchGraphQlHeader,Q as setFetchGraphQlHeaders,S as setProductConfigurationValid,I as setProductConfigurationValues};
//# sourceMappingURL=api.js.map
