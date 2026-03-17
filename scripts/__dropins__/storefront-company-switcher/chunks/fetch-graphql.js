/*! Copyright 2026 Adobe
All Rights Reserved. */
var S=Object.defineProperty;var M=(o,e,r)=>e in o?S(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r;var s=(o,e,r)=>M(o,typeof e!="symbol"?e+"":e,r);import{Initializer as E}from"@dropins/tools/lib.js";import{FetchGraphQL as I}from"@dropins/tools/fetch-graphql.js";import{events as u}from"@dropins/tools/event-bus.js";class T{constructor(){s(this,"companyHeaderSet",!1);s(this,"companyHeaderAppliers",[]);s(this,"companyHeaderRemovers",[]);s(this,"headerKey");this.headerKey=m.getConfig().companyHeader,this.setFetchGraphQlModules(m.getConfig().fetchGraphQlModules)}setHeaderKey(e){this.headerKey=e}setFetchGraphQlModules(e){this.companyHeaderAppliers=[],this.companyHeaderRemovers=[],e.forEach(r=>{this.companyHeaderAppliers.push((t,a)=>r.setFetchGraphQlHeader(t,a)),this.companyHeaderRemovers.push(t=>r.removeFetchGraphQlHeader(t))})}setCompanyHeaders(e){if(e===null){this.removeCompanyHeaders();return}this.companyHeaderAppliers.forEach(r=>{r(this.headerKey,e)}),this.companyHeaderSet=!0}removeCompanyHeaders(){this.companyHeaderRemovers.forEach(e=>{e(this.headerKey)}),this.companyHeaderSet=!1}isCompanyHeaderSet(){return this.companyHeaderSet}}let C=null;const c=()=>(C||(C=new T),C);class O{constructor(){s(this,"groupHeaderSet",!1);s(this,"groupHeaderAppliers",[]);s(this,"groupHeaderRemovers",[]);s(this,"headerKey");s(this,"defaultNLICustomerGroupId","b6589fc6ab0dc82cf12099d1c2d40ab994e8410c");this.headerKey=m.getConfig().customerGroupHeader,this.setFetchGraphQlModules(m.getConfig().groupGraphQlModules)}setHeaderKey(e){this.headerKey=e}setFetchGraphQlModules(e){e.forEach(r=>{this.groupHeaderAppliers.push((t,a)=>r.setFetchGraphQlHeader(t,a)),this.groupHeaderRemovers.push(t=>r.setFetchGraphQlHeader(t,this.defaultNLICustomerGroupId))})}setGroupHeaders(e){this.removeGroupHeaders(),e!==null&&(this.groupHeaderAppliers.forEach(r=>{r(this.headerKey,e)}),this.groupHeaderSet=!0)}removeGroupHeaders(){this.groupHeaderRemovers.forEach(e=>{e(this.headerKey)}),this.groupHeaderSet=!1}isGroupHeaderSet(){return this.groupHeaderSet}}let f=null;const d=()=>(f||(f=new O),f),_=`
  query GET_CUSTOMER_COMPANIES {
    customer {
      companies {
        items {
          name
          id
          status
        }
      }
    }
    company {
      name
      id
      status
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
`,i=class i{constructor(){s(this,"EMPTY_CUSTOMER_COMPANY_CONTEXT",{currentCompany:{id:"",name:""},customerCompanies:[],customerGroupId:""});s(this,"cache",null);s(this,"transformCompanyToOption",e=>({text:e.name,value:e.id}))}static getInstance(){return i.instance??(i.instance=new i)}async processCustomerGroupId(e){const r=Uint8Array.from(atob(e),a=>a.charCodeAt(0)),t=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(t)).map(a=>a.toString(16).padStart(2,"0")).join("")}isUserAuthenticated(){var e;return!!((e=K().fetchGraphQlHeaders)!=null&&e.Authorization)}resetCache(){this.cache=null}async updateCustomerGroup(){if(!this.isUserAuthenticated())return null;try{const e=await G(A);if(e.errors)return null;const r=await this.processCustomerGroupId(e.data.customerGroup.uid);return this.cache&&(this.cache.customerGroupId=r),r}catch(e){return console.error(e),null}}async getCustomerCompanyInfo(){if(this.cache)return this.cache;if(!this.isUserAuthenticated())return this.EMPTY_CUSTOMER_COMPANY_CONTEXT;try{const e=await G(_);if(e.errors)return this.EMPTY_CUSTOMER_COMPANY_CONTEXT;const r=e.data,t=await this.processCustomerGroupId(e.data.customerGroup.uid),n=r.customer.companies.items.filter(g=>g.status==="APPROVED"||g.status==="BLOCKED").map(this.transformCompanyToOption);return this.cache={currentCompany:r.company,customerCompanies:n,customerGroupId:t},this.cache}catch(e){return console.error(e),this.EMPTY_CUSTOMER_COMPANY_CONTEXT}}};s(i,"instance");let h=i;const R=()=>h.getInstance().getCustomerCompanyInfo(),U=()=>h.getInstance().updateCustomerGroup(),p=new E({init:async o=>{const e={fetchGraphQlModules:[],groupGraphQlModules:[],companyHeader:"X-Adobe-Company",customerGroupHeader:"Magento-Customer-Group",companySessionStorageKey:"DROPIN__COMPANYSWITCHER__COMPANY__CONTEXT",groupSessionStorageKey:"DROPIN__COMPANYSWITCHER__GROUP__CONTEXT"};p.config.setConfig({...e,...o});const r=sessionStorage.getItem(p.config.getConfig().groupSessionStorageKey),t=sessionStorage.getItem(p.config.getConfig().companySessionStorageKey);t&&!c().isCompanyHeaderSet()&&(c().setCompanyHeaders(t),u.emit("companyContext/changed",t)),r&&!d().isGroupHeaderSet()&&d().setGroupHeaders(r),u.on("authenticated",async a=>{const n=p.config.getConfig();if(!a)sessionStorage.removeItem(n.companySessionStorageKey),sessionStorage.removeItem(n.groupSessionStorageKey),c().removeCompanyHeaders(),d().removeGroupHeaders(),u.emit("companyContext/changed",null);else{if(sessionStorage.getItem(n.companySessionStorageKey)||c().isCompanyHeaderSet())return;const y=await R();if(y.customerCompanies.length<2)return;const l=y.currentCompany.id,H=y.customerGroupId;c().setCompanyHeaders(l),d().setGroupHeaders(H),sessionStorage.setItem(n.companySessionStorageKey,l),sessionStorage.setItem(n.groupSessionStorageKey,H),u.emit("companyContext/changed",l)}},{eager:!0})},listeners:()=>[]}),m=p.config,{setEndpoint:w,setFetchGraphQlHeader:F,removeFetchGraphQlHeader:Y,setFetchGraphQlHeaders:X,fetchGraphQl:G,getConfig:K}=new I().getMethods();export{h as C,F as a,X as b,m as c,R as d,c as e,G as f,K as g,d as h,p as i,Y as r,w as s,U as u};
//# sourceMappingURL=fetch-graphql.js.map
