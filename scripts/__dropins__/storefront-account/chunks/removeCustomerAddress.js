/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as E}from"@dropins/tools/event-bus.js";import{FetchGraphQL as C}from"@dropins/tools/fetch-graphql.js";const b=t=>t.replace(/_([a-z])/g,(r,n)=>n.toUpperCase()),S=t=>t.replace(/([A-Z])/g,r=>`_${r.toLowerCase()}`),g=(t,r,n)=>{const o=["string","boolean","number"],u=r==="camelCase"?b:S;return Array.isArray(t)?t.map(i=>o.includes(typeof i)||i===null?i:typeof i=="object"?g(i,r,n):i):t!==null&&typeof t=="object"?Object.entries(t).reduce((i,[c,a])=>{const e=n&&n[c]?n[c]:u(c);return i[e]=o.includes(typeof a)||a===null?a:g(a,r,n),i},{}):t},{setEndpoint:j,setFetchGraphQlHeader:k,removeFetchGraphQlHeader:L,setFetchGraphQlHeaders:P,fetchGraphQl:s,getConfig:J}=new C().getMethods(),A=`
  query GET_ATTRIBUTES_FORM($formCode: String!) {
    attributesForm(formCode: $formCode) {
      items {
        code
        default_value
        entity_type
        frontend_class
        frontend_input
        is_required
        is_unique
        label
        options {
          is_default
          label
          value
        }
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
      }
      errors {
        type
        message
      }
    }
  }
`,T=`
  query GET_ATTRIBUTES_FORM_SHORT {
    attributesForm(formCode: "customer_register_address") {
      items {
        frontend_input
        label
        code
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
        }
      }
    }
  }
`,_=t=>{throw t instanceof DOMException&&t.name==="AbortError"||E.emit("error",{source:"auth",type:"network",error:t}),t},f=t=>{const r=t.map(n=>n.message).join(" ");throw Error(r)},y=t=>{let r=[];for(const n of t)if(!(n.frontend_input!=="MULTILINE"||n.multiline_count<2))for(let o=2;o<=n.multiline_count;o++){const u={...n,is_required:!1,name:`${n.code}_multiline_${o}`,code:`${n.code}_multiline_${o}`,id:`${n.code}_multiline_${o}`};r.push(u)}return r},R=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return b(t)}},v=t=>{var r;return t!=null&&t.options?(r=t==null?void 0:t.options)==null?void 0:r.map(n=>({isDefault:(n==null?void 0:n.is_default)??!1,text:(n==null?void 0:n.label)??"",value:(n==null?void 0:n.value)??""})):[]},N=t=>{var i,c,a;const r=((c=(i=t==null?void 0:t.data)==null?void 0:i.attributesForm)==null?void 0:c.items)||[];if(!r.length)return[];const n=(a=r.filter(e=>{var l;return!((l=e.frontend_input)!=null&&l.includes("HIDDEN"))}))==null?void 0:a.map(({code:e,...l})=>{const h=e!=="country_id"?e:"country_code";return{...l,name:h,id:h,code:h}}),o=y(n);return n.concat(o).map(e=>({code:e==null?void 0:e.code,name:e==null?void 0:e.name,id:e==null?void 0:e.id,label:(e==null?void 0:e.label)??"",entityType:e==null?void 0:e.entity_type,className:(e==null?void 0:e.frontend_class)??"",defaultValue:(e==null?void 0:e.default_value)??"",fieldType:e==null?void 0:e.frontend_input,multilineCount:(e==null?void 0:e.multiline_count)??0,orderNumber:Number(e==null?void 0:e.sort_order)||0,isHidden:!1,isUnique:(e==null?void 0:e.is_unique)??!1,required:(e==null?void 0:e.is_required)??!1,validateRules:(e==null?void 0:e.validate_rules)??[],options:v(e),customUpperCode:R(e==null?void 0:e.code)})).sort((e,l)=>Number(e.orderNumber)-Number(l.orderNumber))},O=t=>{const r={};for(const n in t){const o=t[n];!Array.isArray(o)||o.length===0||(n==="custom_attributesV2"?o.forEach(u=>{typeof u=="object"&&"value"in u&&(r[u==null?void 0:u.code]=u==null?void 0:u.value)}):o.length>1?o.forEach((u,i)=>{i===0?r[n]=u:r[`${n}_multiline_${i+1}`]=u}):r[n]=o[0])}return r},I=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",middlename:(t==null?void 0:t.middlename)??""}),U=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??""}),M=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),$=t=>{var n,o,u;return g({...I(t),...U(t),...M(t),city:(t==null?void 0:t.city)??"",region:{region:((n=t==null?void 0:t.region)==null?void 0:n.region)??"",region_code:((o=t==null?void 0:t.region)==null?void 0:o.region_code)??"",region_id:((u=t==null?void 0:t.region)==null?void 0:u.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...O(t)},"camelCase",{})},w=t=>{var o,u;const r=((u=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:u.addresses)||[];return r.length?r.map($).sort((i,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(i.defaultBilling)||Number(i.defaultShipping))):[]},q=t=>{var c,a;if(!((a=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&a.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:r,storeConfig:n}=t.data,o=n==null?void 0:n.countries_with_required_region.split(","),u=n==null?void 0:n.optional_zip_countries.split(",");return{availableCountries:r.filter(({two_letter_abbreviation:e,full_name_locale:l})=>!!(e&&l)).map(e=>{const{two_letter_abbreviation:l,full_name_locale:h,available_regions:m}=e,p=Array.isArray(m)&&m.length>0;return{value:l,text:h,availableRegions:p?m:void 0}}).sort((e,l)=>e.text.localeCompare(l.text)),countriesWithRequiredRegion:o,optionalZipCountries:u}},K=async t=>{const r=`_account_attributesForm_${t}`,n=sessionStorage.getItem(r);return n?JSON.parse(n):await s(t!=="shortRequest"?A:T,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(o=>{var i;if((i=o.errors)!=null&&i.length)return f(o.errors);const u=N(o);return sessionStorage.setItem(r,JSON.stringify(u)),u}).catch(_)},x=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,z=async t=>await s(x,{method:"POST",variables:{input:g(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(r=>{var n,o,u;return(n=r.errors)!=null&&n.length?f(r.errors):((u=(o=r==null?void 0:r.data)==null?void 0:o.createCustomerAddress)==null?void 0:u.firstname)||""}).catch(_),F=`
  query GET_CUSTOMER_ADDRESS {
    customer {
      addresses {
        firstname
        lastname
        middlename
        fax
        prefix
        suffix
        city
        company
        country_code
        region {
          region
          region_code
          region_id
        }
        custom_attributesV2 {
          ... on AttributeValue {
            code
            value
          }
        }
        telephone
        id
        vat_id
        postcode
        street
        default_shipping
        default_billing
      }
    }
  }
`,Z=async()=>await s(F,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?f(t.errors):w(t)}).catch(_),G=`
  query GET_COUNTRIES_QUERY {
    countries {
      two_letter_abbreviation
      full_name_locale
      available_regions {
        id
        code
        name
      }
    }
    storeConfig {
      countries_with_required_region
      optional_zip_countries
    }
  }
`,W=async()=>{const t="_account_countries",r=sessionStorage.getItem(t);return r?JSON.parse(r):await s(G,{method:"GET",cache:"no-cache"}).then(n=>{var u;if((u=n.errors)!=null&&u.length)return f(n.errors);const o=q(n);return sessionStorage.setItem(t,JSON.stringify(o)),o}).catch(_)},V=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,Y=async t=>{const{addressId:r,...n}=t;return r?await s(V,{method:"POST",variables:{id:Number(r),input:g(n,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(o=>{var u,i,c;return(u=o.errors)!=null&&u.length?f(o.errors):((c=(i=o==null?void 0:o.data)==null?void 0:i.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(_):""},B=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,d=async t=>await s(B,{method:"POST",variables:{id:t}}).then(r=>{var n;return(n=r.errors)!=null&&n.length?f(r.errors):r.data.deleteCustomerAddress}).catch(_);export{_ as a,k as b,P as c,K as d,z as e,s as f,J as g,f as h,Z as i,W as j,d as k,b as l,g as m,S as n,L as r,j as s,$ as t,Y as u};
