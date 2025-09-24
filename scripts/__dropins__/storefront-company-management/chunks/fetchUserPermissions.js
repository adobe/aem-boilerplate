/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as m}from"@dropins/tools/event-bus.js";import{FetchGraphQL as h}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:C,setFetchGraphQlHeader:w,removeFetchGraphQlHeader:E,setFetchGraphQlHeaders:A,fetchGraphQl:p,getConfig:S}=new h().getMethods(),_=n=>{throw n instanceof DOMException&&n.name==="AbortError"||m.emit("error",{source:"company",type:"network",error:n}),n},g=n=>{const t=n.map(a=>a.message).join(" ");throw Error(t)},y=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          children {
            id
            children {
              id
              children {
                id
                children { id }
              }
            }
          }
        }
      }
      status
    }
  }
`,c=(n=[])=>{const t=new Set,a=[...n];for(;a.length;){const s=a.pop();if(s&&(typeof s.id=="string"&&t.add(s.id),Array.isArray(s.children)&&s.children.length))for(const i of s.children)a.push(i)}return t},d=n=>(n==null?void 0:n.id)==="0"||typeof(n==null?void 0:n.id)=="number"&&(n==null?void 0:n.id)===0||(n==null?void 0:n.id)==="MA=="||(n==null?void 0:n.name)==="Company Administrator",M=()=>["Magento_Company::view_account","Magento_Company::edit_account","Magento_Company::view_address","Magento_Company::edit_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information","Magento_Company::users_view","Magento_Company::users_edit"],I=n=>{const t=c((n==null?void 0:n.permissions)||[]),a=d(n);return{canViewAccount:a||t.has("Magento_Company::view_account"),canEditAccount:a||t.has("Magento_Company::edit_account"),canViewAddress:a||t.has("Magento_Company::view_address"),canEditAddress:a||t.has("Magento_Company::edit_address"),canViewContacts:a||t.has("Magento_Company::contacts"),canViewPaymentInformation:a||t.has("Magento_Company::payment_information"),canViewShippingInformation:a||t.has("Magento_Company::shipping_information"),canViewUsers:a||t.has("Magento_Company::users_view"),canEditUsers:a||t.has("Magento_Company::users_edit")}},v=async()=>await p(y,{method:"GET",cache:"no-cache"}).then(n=>{var i,e,o;if((i=n.errors)!=null&&i.length)return g(n.errors);const t=(o=(e=n==null?void 0:n.data)==null?void 0:e.customer)==null?void 0:o.role,a=c((t==null?void 0:t.permissions)||[]);return d(t)&&M().forEach(r=>a.add(r)),{allowedIds:a,roleResponse:n}}).catch(_);export{w as a,I as b,A as c,p as d,_ as e,v as f,S as g,g as h,d as i,E as r,C as s};
//# sourceMappingURL=fetchUserPermissions.js.map
