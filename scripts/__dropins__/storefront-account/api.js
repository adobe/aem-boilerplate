import{Initializer as c}from"@dropins/tools/lib.js";import{f as n,h as d,a as u}from"./chunks/removeCustomerAddress.js";import{e as T,d as x,g as y,j as Q,i as k,k as w,l as z,r as O,s as R,b,c as v,u as M}from"./chunks/removeCustomerAddress.js";import{g as U}from"./chunks/getOrderHistoryList.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";const s=new c({init:async t=>{const a={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};s.config.setConfig({...a,...t})},listeners:()=>[]}),G=s.config,f=t=>{var a,r,e,i,o,m;return{email:((r=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:r.email)||"",firstname:((i=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:i.firstname)||"",lastname:((m=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:m.lastname)||""}},h=`
  query GET_CUSTOMER {
    customer {
     firstname
     lastname
     email
    }
  }
`,A=async()=>await n(h,{method:"GET",cache:"force-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?d(t.errors):f(t)}).catch(u);export{G as config,T as createCustomerAddress,n as fetchGraphQl,x as getAttributesForm,y as getConfig,Q as getCountries,A as getCustomer,k as getCustomerAddress,U as getOrderHistoryList,w as getRegions,s as initialize,z as removeCustomerAddress,O as removeFetchGraphQlHeader,R as setEndpoint,b as setFetchGraphQlHeader,v as setFetchGraphQlHeaders,M as updateCustomerAddress};
