/*! Copyright 2025 Adobe
All Rights Reserved. */
var G=Object.defineProperty;var S=(a,e,r)=>e in a?G(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r;var o=(a,e,r)=>S(a,typeof e!="symbol"?e+"":e,r);import{Initializer as M}from"@dropins/tools/lib.js";import{events as u}from"@dropins/tools/event-bus.js";import{FetchGraphQL as T}from"@dropins/tools/fetch-graphql.js";class E{constructor(){o(this,"companyHeaderSet",!1);o(this,"companyHeaderAppliers",[]);o(this,"companyHeaderRemovers",[]);o(this,"headerKey");this.headerKey=h.getConfig().companyHeader,this.setFetchGraphQlModules(h.getConfig().fetchGraphQlModules)}setHeaderKey(e){this.headerKey=e}setFetchGraphQlModules(e){this.companyHeaderAppliers=[],this.companyHeaderRemovers=[],e.forEach(r=>{this.companyHeaderAppliers.push((t,s)=>r.setFetchGraphQlHeader(t,s)),this.companyHeaderRemovers.push(t=>r.removeFetchGraphQlHeader(t))})}setCompanyHeaders(e){if(e===null){this.removeCompanyHeaders();return}this.companyHeaderAppliers.forEach(r=>{r(this.headerKey,e)}),this.companyHeaderSet=!0}removeCompanyHeaders(){this.companyHeaderRemovers.forEach(e=>{e(this.headerKey)}),this.companyHeaderSet=!1}isCompanyHeaderSet(){return this.companyHeaderSet}}let l=null;const c=()=>(l||(l=new E),l);class I{constructor(){o(this,"groupHeaderSet",!1);o(this,"groupHeaderAppliers",[]);o(this,"groupHeaderRemovers",[]);o(this,"headerKey");this.headerKey=h.getConfig().customerGroupHeader,this.setFetchGraphQlModules(h.getConfig().groupGraphQlModules)}setHeaderKey(e){this.headerKey=e}setFetchGraphQlModules(e){e.forEach(r=>{this.groupHeaderAppliers.push((t,s)=>r.setFetchGraphQlHeader(t,s)),this.groupHeaderRemovers.push(t=>r.removeFetchGraphQlHeader(t))})}setGroupHeaders(e){this.removeGroupHeaders(),e!==null&&(this.groupHeaderAppliers.forEach(r=>{r(this.headerKey,e)}),this.groupHeaderSet=!0)}removeGroupHeaders(){this.groupHeaderRemovers.forEach(e=>{e(this.headerKey)}),this.groupHeaderSet=!1}isGroupHeaderSet(){return this.groupHeaderSet}}let C=null;const d=()=>(C||(C=new I),C),p=new M({init:async a=>{const e={fetchGraphQlModules:[],groupGraphQlModules:[],companyHeader:"X-Adobe-Company",customerGroupHeader:"Magento-Customer-Group",companySessionStorageKey:"DROPIN__COMPANYSWITCHER__COMPANY__CONTEXT",groupSessionStorageKey:"DROPIN__COMPANYSWITCHER__GROUP__CONTEXT"};p.config.setConfig({...e,...a});const r=sessionStorage.getItem(p.config.getConfig().groupSessionStorageKey),t=sessionStorage.getItem(p.config.getConfig().companySessionStorageKey);t&&!c().isCompanyHeaderSet()&&(c().setCompanyHeaders(t),u.emit("companyContext/changed",t)),r&&!d().isGroupHeaderSet()&&d().setGroupHeaders(r),u.on("authenticated",async s=>{const i=p.config.getConfig();if(!s)sessionStorage.removeItem(i.companySessionStorageKey),sessionStorage.removeItem(i.groupSessionStorageKey),c().removeCompanyHeaders(),d().removeGroupHeaders(),u.emit("companyContext/changed",null);else{if(sessionStorage.getItem(i.companySessionStorageKey)||c().isCompanyHeaderSet())return;const g=await R();if(g.customerCompanies.length<2)return;const y=g.currentCompany.id,H=g.customerGroupId;c().setCompanyHeaders(y),d().setGroupHeaders(H),sessionStorage.setItem(i.companySessionStorageKey,y),sessionStorage.setItem(i.groupSessionStorageKey,H),u.emit("companyContext/changed",y)}},{eager:!0})},listeners:()=>[]}),h=p.config,{setEndpoint:U,setFetchGraphQlHeader:w,removeFetchGraphQlHeader:F,setFetchGraphQlHeaders:Y,fetchGraphQl:f,getConfig:O}=new T().getMethods(),_=`
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
`,n=class n{constructor(){o(this,"EMPTY_CUSTOMER_COMPANY_CONTEXT",{currentCompany:{id:"",name:""},customerCompanies:[],customerGroupId:""});o(this,"cache",null);o(this,"transformCompanyToOption",e=>({text:e.name,value:e.id}))}static getInstance(){return n.instance??(n.instance=new n)}async processCustomerGroupId(e){const r=Uint8Array.from(atob(e),s=>s.charCodeAt(0)),t=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(t)).map(s=>s.toString(16).padStart(2,"0")).join("")}isUserAuthenticated(){var e;return!!((e=O().fetchGraphQlHeaders)!=null&&e.Authorization)}resetCache(){this.cache=null}async updateCustomerGroup(){if(!this.isUserAuthenticated())return null;try{const e=await f(A);if(e.errors)return null;const r=await this.processCustomerGroupId(e.data.customerGroup.uid);return this.cache&&(this.cache.customerGroupId=r),r}catch(e){return console.error(e),null}}async getCustomerCompanyInfo(){if(this.cache)return this.cache;if(!this.isUserAuthenticated())return this.EMPTY_CUSTOMER_COMPANY_CONTEXT;try{const e=await f(_);if(e.errors)return this.EMPTY_CUSTOMER_COMPANY_CONTEXT;const r=e.data,t=await this.processCustomerGroupId(e.data.customerGroup.uid),s=r.customer.companies.items.map(this.transformCompanyToOption);return this.cache={currentCompany:r.company,customerCompanies:s,customerGroupId:t},this.cache}catch(e){return console.error(e),this.EMPTY_CUSTOMER_COMPANY_CONTEXT}}};o(n,"instance");let m=n;const R=()=>m.getInstance().getCustomerCompanyInfo(),X=()=>m.getInstance().updateCustomerGroup();export{m as C,w as a,Y as b,h as c,R as d,c as e,f,O as g,d as h,p as i,F as r,U as s,X as u};
//# sourceMappingURL=customerCompanyContext.js.map
