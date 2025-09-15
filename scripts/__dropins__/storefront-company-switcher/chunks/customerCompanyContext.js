/*! Copyright 2025 Adobe
All Rights Reserved. */
var G=Object.defineProperty;var S=(s,e,r)=>e in s?G(s,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[e]=r;var t=(s,e,r)=>S(s,typeof e!="symbol"?e+"":e,r);import{Initializer as M}from"@dropins/tools/lib.js";import{events as u}from"@dropins/tools/event-bus.js";import{FetchGraphQL as T}from"@dropins/tools/fetch-graphql.js";class E{constructor(){t(this,"companyHeaderSet",!1);t(this,"companyHeaderAppliers",[]);t(this,"companyHeaderRemovers",[]);t(this,"headerKey");this.headerKey=h.getConfig().companyHeader,this.setFetchGraphQlModules(h.getConfig().fetchGraphQlModules)}setHeaderKey(e){this.headerKey=e}setFetchGraphQlModules(e){this.companyHeaderAppliers=[],this.companyHeaderRemovers=[],e.forEach(({setFetchGraphQlHeader:r,removeFetchGraphQlHeader:o})=>{this.companyHeaderAppliers.push(r),this.companyHeaderRemovers.push(o)})}setCompanyHeaders(e){if(e===null){this.removeCompanyHeaders();return}this.companyHeaderAppliers.forEach(r=>{r(this.headerKey,e)}),this.companyHeaderSet=!0}removeCompanyHeaders(){this.companyHeaderRemovers.forEach(e=>{e(this.headerKey)}),this.companyHeaderSet=!1}isCompanyHeaderSet(){return this.companyHeaderSet}}let l=null;const c=()=>(l||(l=new E),l);class I{constructor(){t(this,"groupHeaderSet",!1);t(this,"groupHeaderAppliers",[]);t(this,"groupHeaderRemovers",[]);t(this,"headerKey");this.headerKey=h.getConfig().customerGroupHeader,this.setFetchGraphQlModules(h.getConfig().groupGraphQlModules)}setHeaderKey(e){this.headerKey=e}setFetchGraphQlModules(e){e.forEach(({setFetchGraphQlHeader:r,removeFetchGraphQlHeader:o})=>{this.groupHeaderAppliers.push(r),this.groupHeaderRemovers.push(o)})}setGroupHeaders(e){this.removeGroupHeaders(),e!==null&&(this.groupHeaderAppliers.forEach(r=>{r(this.headerKey,e)}),this.groupHeaderSet=!0)}removeGroupHeaders(){this.groupHeaderRemovers.forEach(e=>{e(this.headerKey)}),this.groupHeaderSet=!1}isGroupHeaderSet(){return this.groupHeaderSet}}let C=null;const d=()=>(C||(C=new I),C),p=new M({init:async s=>{const e={fetchGraphQlModules:[],groupGraphQlModules:[],companyHeader:"X-Adobe-Company",customerGroupHeader:"Magento-Customer-Group",companySessionStorageKey:"DROPIN__COMPANYSWITCHER__COMPANY__CONTEXT",groupSessionStorageKey:"DROPIN__COMPANYSWITCHER__GROUP__CONTEXT"};p.config.setConfig({...e,...s});const r=sessionStorage.getItem(p.config.getConfig().groupSessionStorageKey),o=sessionStorage.getItem(p.config.getConfig().companySessionStorageKey);o&&!c().isCompanyHeaderSet()&&(c().setCompanyHeaders(o),u.emit("companyContext/changed",o)),r&&!d().isGroupHeaderSet()&&d().setGroupHeaders(r),u.on("authenticated",async a=>{const i=p.config.getConfig();if(!a)sessionStorage.removeItem(i.companySessionStorageKey),sessionStorage.removeItem(i.groupSessionStorageKey),c().removeCompanyHeaders(),d().removeGroupHeaders(),u.emit("companyContext/changed",null);else{if(sessionStorage.getItem(i.companySessionStorageKey)||c().isCompanyHeaderSet())return;const g=await R();if(g.customerCompanies.length<2)return;const y=g.currentCompany.id,H=g.customerGroupId;c().setCompanyHeaders(y),d().setGroupHeaders(H),sessionStorage.setItem(i.companySessionStorageKey,y),sessionStorage.setItem(i.groupSessionStorageKey,H),u.emit("companyContext/changed",y)}},{eager:!0})},listeners:()=>[]}),h=p.config,{setEndpoint:U,setFetchGraphQlHeader:w,removeFetchGraphQlHeader:F,setFetchGraphQlHeaders:Y,fetchGraphQl:f,getConfig:O}=new T().getMethods(),_=`
  query GET_CUSTOMER_COMPANIES {
    customer {
      companies {
        items {
          name
          id
        }
      }
    }
    company {
      name
      id
    }
    customerGroup {
      uid
    }
  }
`,A=`
  query GET_CUSTOMER_GROUP {
    customerGroup {
      uid
    }
  }
`,n=class n{constructor(){t(this,"EMPTY_CUSTOMER_COMPANY_CONTEXT",{currentCompany:{id:"",name:""},customerCompanies:[],customerGroupId:""});t(this,"cache",null);t(this,"transformCompanyToOption",e=>({text:e.name,value:e.id}))}static getInstance(){return n.instance??(n.instance=new n)}async processCustomerGroupId(e){const r=Uint8Array.from(atob(e),a=>a.charCodeAt(0)),o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(a=>a.toString(16).padStart(2,"0")).join("")}isUserAuthenticated(){var e;return!!((e=O().fetchGraphQlHeaders)!=null&&e.Authorization)}resetCache(){this.cache=null}async updateCustomerGroup(){if(!this.isUserAuthenticated())return null;try{const e=await f(A);if(e.errors)return null;const r=await this.processCustomerGroupId(e.data.customerGroup.uid);return this.cache&&(this.cache.customerGroupId=r),r}catch(e){return console.error(e),null}}async getCustomerCompanyInfo(){if(this.cache)return this.cache;if(!this.isUserAuthenticated())return this.EMPTY_CUSTOMER_COMPANY_CONTEXT;try{const e=await f(_);if(e.errors)return this.EMPTY_CUSTOMER_COMPANY_CONTEXT;const r=e.data,o=await this.processCustomerGroupId(e.data.customerGroup.uid),a=r.customer.companies.items.map(this.transformCompanyToOption);return this.cache={currentCompany:r.company,customerCompanies:a,customerGroupId:o},this.cache}catch(e){return console.error(e),this.EMPTY_CUSTOMER_COMPANY_CONTEXT}}};t(n,"instance");let m=n;const R=()=>m.getInstance().getCustomerCompanyInfo(),X=()=>m.getInstance().updateCustomerGroup();export{m as C,w as a,Y as b,h as c,R as d,c as e,f,O as g,d as h,p as i,F as r,U as s,X as u};
//# sourceMappingURL=customerCompanyContext.js.map
