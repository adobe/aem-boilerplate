/*! Copyright 2024 Adobe
All Rights Reserved. */
import{events as b}from"@dropins/tools/event-bus.js";import{FetchGraphQL as C}from"@dropins/tools/fetch-graphql.js";const S=t=>t.replace(/_([a-z])/g,(n,e)=>e.toUpperCase()),p=t=>t.replace(/([A-Z])/g,n=>`_${n.toLowerCase()}`),g=(t,n,e)=>{const r=["string","boolean","number"],o=n==="camelCase"?S:p;return Array.isArray(t)?t.map(i=>r.includes(typeof i)||i===null?i:typeof i=="object"?g(i,n,e):i):t!==null&&typeof t=="object"?Object.entries(t).reduce((i,[c,a])=>{const u=e&&e[c]?e[c]:o(c);return i[u]=r.includes(typeof a)||a===null?a:g(a,n,e),i},{}):t},{setEndpoint:k,setFetchGraphQlHeader:H,removeFetchGraphQlHeader:J,setFetchGraphQlHeaders:K,fetchGraphQl:s,getConfig:L}=new C().getMethods(),T=`
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
`,A=`
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
`,_=t=>{throw t instanceof DOMException&&t.name==="AbortError"||b.emit("error",{source:"auth",type:"network",error:t}),t},f=t=>{const n=t.map(e=>e.message).join(" ");throw Error(n)},y=t=>{let n=[];for(const e of t)if(!(e.frontend_input!=="MULTILINE"||e.multiline_count<2))for(let r=2;r<=e.multiline_count;r++){const o={...e,is_required:!1,name:`${e.code}_multiline_${r}`,code:`${e.code}_multiline_${r}`,id:`${e.code}_multiline_${r}`};n.push(o)}return n},R=t=>{var i,c,a;const n=((c=(i=t==null?void 0:t.data)==null?void 0:i.attributesForm)==null?void 0:c.items)||[];if(!n.length)return[];const e=(a=n.filter(u=>{var l;return!((l=u.frontend_input)!=null&&l.includes("HIDDEN"))}))==null?void 0:a.map(({code:u,...l})=>{const m=u!=="country_id"?u:"country_code";return{...l,name:m,id:m,code:m}}),r=y(e);return e.concat(r).map(u=>{var E;const l=u.code==="middlename"?"middleName":u.code==="firstname"?"firstName":u.code==="lastname"?"lastName":S(u.code),m=(E=u.options)==null?void 0:E.map(h=>({isDefault:h.is_default,text:h.label,value:h.value}));return g({...u,options:m,customUpperCode:l},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((u,l)=>u.orderNumber-l.orderNumber)},v=t=>{const n={};for(const e in t){const r=t[e];!Array.isArray(r)||r.length===0||(e==="custom_attributesV2"?r.forEach(o=>{typeof o=="object"&&"value"in o&&(n[o==null?void 0:o.code]=o==null?void 0:o.value)}):r.length>1?r.forEach((o,i)=>{i===0?n[e]=o:n[`${e}_multiline_${i+1}`]=o}):n[e]=r[0])}return n},N=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",middlename:(t==null?void 0:t.middlename)??""}),O=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??""}),I=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),$=t=>{var e,r,o;return g({...N(t),...O(t),...I(t),city:(t==null?void 0:t.city)??"",region:{region:((e=t==null?void 0:t.region)==null?void 0:e.region)??"",region_code:((r=t==null?void 0:t.region)==null?void 0:r.region_code)??"",region_id:((o=t==null?void 0:t.region)==null?void 0:o.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...v(t)},"camelCase",{})},G=t=>{var r,o;const n=((o=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:o.addresses)||[];return n.length?n.map($).sort((i,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(i.defaultBilling)||Number(i.defaultShipping))):[]},M=t=>{var c,a;if(!((a=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&a.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:n,storeConfig:e}=t.data,r=e==null?void 0:e.countries_with_required_region.split(","),o=e==null?void 0:e.optional_zip_countries.split(",");return{availableCountries:n.filter(({two_letter_abbreviation:u,full_name_locale:l})=>!!(u&&l)).map(u=>{const{two_letter_abbreviation:l,full_name_locale:m}=u;return{value:l,text:m}}).sort((u,l)=>u.text.localeCompare(l.text)),countriesWithRequiredRegion:r,optionalZipCountries:o}},U=t=>{var e,r;return(r=(e=t==null?void 0:t.data)==null?void 0:e.country)!=null&&r.available_regions?t.data.country.available_regions.filter(o=>{if(!o)return!1;const{id:i,code:c,name:a}=o;return!!(i&&c&&a)}).map(o=>{const{id:i}=o;return{id:i,text:o.name,value:`${o.code},${o.id}`}}):[]},P=async t=>{const n=`_account_attributesForm_${t}`,e=sessionStorage.getItem(n);return e?JSON.parse(e):await s(t!=="shortRequest"?T:A,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(r=>{var i;if((i=r.errors)!=null&&i.length)return f(r.errors);const o=R(r);return sessionStorage.setItem(n,JSON.stringify(o)),o}).catch(_)},w=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,d=async t=>await s(w,{method:"POST",variables:{input:g(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(n=>{var e,r,o;return(e=n.errors)!=null&&e.length?f(n.errors):((o=(r=n==null?void 0:n.data)==null?void 0:r.createCustomerAddress)==null?void 0:o.firstname)||""}).catch(_),x=`
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
`,z=async()=>await s(x,{method:"GET",cache:"no-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?f(t.errors):G(t)}).catch(_),F=`
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
`,Z=async()=>{const t="_account_countries",n=sessionStorage.getItem(t);return n?JSON.parse(n):await s(F,{method:"GET",cache:"no-cache"}).then(e=>{var o;if((o=e.errors)!=null&&o.length)return f(e.errors);const r=M(e);return sessionStorage.setItem(t,JSON.stringify(r)),r}).catch(_)},q=`
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
`,W=async t=>{const n=`_account_regions_${t}`,e=sessionStorage.getItem(n);return e?JSON.parse(e):await s(q,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(r=>{var i;if((i=r.errors)!=null&&i.length)return f(r.errors);const o=U(r);return sessionStorage.setItem(n,JSON.stringify(o)),o}).catch(_)},V=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,Y=async t=>{const{addressId:n,...e}=t;return n?await s(V,{method:"POST",variables:{id:n,input:g(e,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(r=>{var o,i,c;return(o=r.errors)!=null&&o.length?f(r.errors):((c=(i=r==null?void 0:r.data)==null?void 0:i.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(_):""},B=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,X=async t=>await s(B,{method:"POST",variables:{id:t}}).then(n=>{var e;return(e=n.errors)!=null&&e.length?f(n.errors):n.data.deleteCustomerAddress}).catch(_);export{H as a,K as b,P as c,d,z as e,s as f,L as g,Z as h,W as i,X as j,g as k,_ as l,f as m,S as n,p as o,J as r,k as s,$ as t,Y as u};
