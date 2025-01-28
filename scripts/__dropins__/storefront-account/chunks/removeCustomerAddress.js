/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as b}from"@dropins/tools/event-bus.js";import{FetchGraphQL as E}from"@dropins/tools/fetch-graphql.js";const m=t=>t.replace(/_([a-z])/g,(r,n)=>n.toUpperCase()),S=t=>t.replace(/([A-Z])/g,r=>`_${r.toLowerCase()}`),h=(t,r,n)=>{const o=["string","boolean","number"],u=r==="camelCase"?m:S;return Array.isArray(t)?t.map(i=>o.includes(typeof i)||i===null?i:typeof i=="object"?h(i,r,n):i):t!==null&&typeof t=="object"?Object.entries(t).reduce((i,[c,a])=>{const e=n&&n[c]?n[c]:u(c);return i[e]=o.includes(typeof a)||a===null?a:h(a,r,n),i},{}):t},{setEndpoint:Q,setFetchGraphQlHeader:j,removeFetchGraphQlHeader:k,setFetchGraphQlHeaders:J,fetchGraphQl:s,getConfig:K}=new E().getMethods(),p=`
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
`,C=`
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
`,f=t=>{throw t instanceof DOMException&&t.name==="AbortError"||b.emit("error",{source:"auth",type:"network",error:t}),t},_=t=>{const r=t.map(n=>n.message).join(" ");throw Error(r)},T=t=>{let r=[];for(const n of t)if(!(n.frontend_input!=="MULTILINE"||n.multiline_count<2))for(let o=2;o<=n.multiline_count;o++){const u={...n,is_required:!1,name:`${n.code}_multiline_${o}`,code:`${n.code}_multiline_${o}`,id:`${n.code}_multiline_${o}`};r.push(u)}return r},y=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return m(t)}},A=t=>{var r;return t!=null&&t.options?(r=t==null?void 0:t.options)==null?void 0:r.map(n=>({isDefault:(n==null?void 0:n.is_default)??!1,text:(n==null?void 0:n.label)??"",value:(n==null?void 0:n.value)??""})):[]},R=t=>{var i,c,a;const r=((c=(i=t==null?void 0:t.data)==null?void 0:i.attributesForm)==null?void 0:c.items)||[];if(!r.length)return[];const n=(a=r.filter(e=>{var l;return!((l=e.frontend_input)!=null&&l.includes("HIDDEN"))}))==null?void 0:a.map(({code:e,...l})=>{const g=e!=="country_id"?e:"country_code";return{...l,name:g,id:g,code:g}}),o=T(n);return n.concat(o).map(e=>({code:e==null?void 0:e.code,name:e==null?void 0:e.name,id:e==null?void 0:e.id,label:(e==null?void 0:e.label)??"",entityType:e==null?void 0:e.entity_type,className:(e==null?void 0:e.frontend_class)??"",defaultValue:(e==null?void 0:e.default_value)??"",fieldType:e==null?void 0:e.frontend_input,multilineCount:(e==null?void 0:e.multiline_count)??0,orderNumber:Number(e==null?void 0:e.sort_order)||0,isHidden:!1,isUnique:(e==null?void 0:e.is_unique)??!1,required:(e==null?void 0:e.is_required)??!1,validateRules:(e==null?void 0:e.validate_rules)??[],options:A(e),customUpperCode:y(e==null?void 0:e.code)})).sort((e,l)=>Number(e.orderNumber)-Number(l.orderNumber))},v=t=>{const r={};for(const n in t){const o=t[n];!Array.isArray(o)||o.length===0||(n==="custom_attributesV2"?o.forEach(u=>{typeof u=="object"&&"value"in u&&(r[u==null?void 0:u.code]=u==null?void 0:u.value)}):o.length>1?o.forEach((u,i)=>{i===0?r[n]=u:r[`${n}_multiline_${i+1}`]=u}):r[n]=o[0])}return r},N=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",middlename:(t==null?void 0:t.middlename)??""}),O=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??""}),I=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),$=t=>{var n,o,u;return h({...N(t),...O(t),...I(t),city:(t==null?void 0:t.city)??"",region:{region:((n=t==null?void 0:t.region)==null?void 0:n.region)??"",region_code:((o=t==null?void 0:t.region)==null?void 0:o.region_code)??"",region_id:((u=t==null?void 0:t.region)==null?void 0:u.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...v(t)},"camelCase",{})},U=t=>{var o,u;const r=((u=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:u.addresses)||[];return r.length?r.map($).sort((i,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(i.defaultBilling)||Number(i.defaultShipping))):[]},G=t=>{var c,a;if(!((a=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&a.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:r,storeConfig:n}=t.data,o=n==null?void 0:n.countries_with_required_region.split(","),u=n==null?void 0:n.optional_zip_countries.split(",");return{availableCountries:r.filter(({two_letter_abbreviation:e,full_name_locale:l})=>!!(e&&l)).map(e=>{const{two_letter_abbreviation:l,full_name_locale:g}=e;return{value:l,text:g}}).sort((e,l)=>e.text.localeCompare(l.text)),countriesWithRequiredRegion:o,optionalZipCountries:u}},M=t=>{var n,o;return(o=(n=t==null?void 0:t.data)==null?void 0:n.country)!=null&&o.available_regions?t.data.country.available_regions.filter(u=>{if(!u)return!1;const{id:i,code:c,name:a}=u;return!!(i&&c&&a)}).map(u=>{const{id:i}=u;return{id:i,text:u.name,value:`${u.code},${u.id}`}}):[]},L=async t=>{const r=`_account_attributesForm_${t}`,n=sessionStorage.getItem(r);return n?JSON.parse(n):await s(t!=="shortRequest"?p:C,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(o=>{var i;if((i=o.errors)!=null&&i.length)return _(o.errors);const u=R(o);return sessionStorage.setItem(r,JSON.stringify(u)),u}).catch(f)},w=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,P=async t=>await s(w,{method:"POST",variables:{input:h(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(r=>{var n,o,u;return(n=r.errors)!=null&&n.length?_(r.errors):((u=(o=r==null?void 0:r.data)==null?void 0:o.createCustomerAddress)==null?void 0:u.firstname)||""}).catch(f),q=`
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
`,z=async()=>await s(q,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?_(t.errors):U(t)}).catch(f),x=`
  query GET_COUNTRIES_QUERY {
    countries {
      two_letter_abbreviation
      full_name_locale
    }
    storeConfig {
      countries_with_required_region
      optional_zip_countries
    }
  }
`,Z=async()=>{const t="_account_countries",r=sessionStorage.getItem(t);return r?JSON.parse(r):await s(x,{method:"GET",cache:"no-cache"}).then(n=>{var u;if((u=n.errors)!=null&&u.length)return _(n.errors);const o=G(n);return sessionStorage.setItem(t,JSON.stringify(o)),o}).catch(f)},F=`
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
`,W=async t=>{const r=`_account_regions_${t}`,n=sessionStorage.getItem(r);return n?JSON.parse(n):await s(F,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(o=>{var i;if((i=o.errors)!=null&&i.length)return _(o.errors);const u=M(o);return sessionStorage.setItem(r,JSON.stringify(u)),u}).catch(f)},d=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,Y=async t=>{const{addressId:r,...n}=t;return r?await s(d,{method:"POST",variables:{id:r,input:h(n,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(o=>{var u,i,c;return(u=o.errors)!=null&&u.length?_(o.errors):((c=(i=o==null?void 0:o.data)==null?void 0:i.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(f):""},V=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,X=async t=>await s(V,{method:"POST",variables:{id:t}}).then(r=>{var n;return(n=r.errors)!=null&&n.length?_(r.errors):r.data.deleteCustomerAddress}).catch(f);export{j as a,J as b,L as c,P as d,z as e,s as f,K as g,Z as h,W as i,X as j,f as k,_ as l,m,h as n,S as o,k as r,Q as s,$ as t,Y as u};
