import{events as C}from"@dropins/tools/event-bus.js";import{FetchGraphQL as T}from"@dropins/tools/fetch-graphql.js";const b=t=>t.replace(/_([a-z])/g,(e,r)=>r.toUpperCase()),A=t=>t.replace(/([A-Z])/g,e=>`_${e.toLowerCase()}`),a=(t,e,r)=>{const n=["string","boolean","number"],o=e==="camelCase"?b:A;return Array.isArray(t)?t.map(i=>n.includes(typeof i)||i===null?i:typeof i=="object"?a(i,e,r):i):t!==null&&typeof t=="object"?Object.entries(t).reduce((i,[c,_])=>{const u=r&&r[c]?r[c]:o(c);return i[u]=n.includes(typeof _)||_===null?_:a(_,e,r),i},{}):t},{setEndpoint:x,setFetchGraphQlHeader:B,removeFetchGraphQlHeader:Q,setFetchGraphQlHeaders:j,fetchGraphQl:s,getConfig:k}=new T().getMethods(),p=`
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
`,R=`
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
`,f=t=>{throw t instanceof DOMException&&t.name==="AbortError"||C.emit("error",{source:"auth",type:"network",error:t}),t},h=t=>{const e=t.map(r=>r.message).join(" ");throw Error(e)},S=t=>{let e=[];for(const r of t)if(!(r.frontend_input!=="MULTILINE"||r.multiline_count<2))for(let n=2;n<=r.multiline_count;n++){const o={...r,is_required:!1,name:`${r.code}_multiline_${n}`,code:`${r.code}_multiline_${n}`,id:`${r.code}_multiline_${n}`};e.push(o)}return e},y=t=>{var i,c,_;const e=((c=(i=t==null?void 0:t.data)==null?void 0:i.attributesForm)==null?void 0:c.items)||[];if(!e.length)return[];const r=(_=e.filter(u=>{var l;return!((l=u.frontend_input)!=null&&l.includes("HIDDEN"))}))==null?void 0:_.map(({code:u,...l})=>{const m=u!=="country_id"?u:"country_code";return{...l,name:m,id:m,code:m}}),n=S(r);return r.concat(n).map(u=>{var g;const l=u.code==="middlename"?"middleName":u.code==="firstname"?"firstName":u.code==="lastname"?"lastName":b(u.code),m=(g=u.options)==null?void 0:g.map(E=>({isDefault:E.is_default,text:E.label,value:E.value}));return a({...u,options:m,customUpperCode:l},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((u,l)=>u.orderNumber-l.orderNumber)},v=t=>{const e={};for(const r in t){const n=t[r];!Array.isArray(n)||n.length===0||(r==="custom_attributesV2"?n.forEach(o=>{typeof o=="object"&&"value"in o&&(e[o==null?void 0:o.code]=o==null?void 0:o.value)}):n.length>1?n.forEach((o,i)=>{i===0?e[r]=o:e[`${r}_multiline_${i+1}`]=o}):e[r]=n[0])}return e},d=t=>{var e,r,n;return a({firstname:(t==null?void 0:t.firstname)||"",lastname:(t==null?void 0:t.lastname)||"",city:(t==null?void 0:t.city)||"",company:(t==null?void 0:t.company)||"",country_code:(t==null?void 0:t.country_code)||"",region:{region:((e=t==null?void 0:t.region)==null?void 0:e.region)||"",region_code:((r=t==null?void 0:t.region)==null?void 0:r.region_code)||"",region_id:((n=t==null?void 0:t.region)==null?void 0:n.region_id)||""},telephone:(t==null?void 0:t.telephone)||"",id:(t==null?void 0:t.id)||"",vat_id:(t==null?void 0:t.vat_id)||"",postcode:(t==null?void 0:t.postcode)||"",default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...v(t)},"camelCase",{})},O=t=>{var r,n;const e=((n=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:n.addresses)||[];return e.length?e.map(d).sort((o,i)=>(Number(i.defaultBilling)||Number(i.defaultShipping))-(Number(o.defaultBilling)||Number(o.defaultShipping))):[]},$=t=>{var c,_;if(!((_=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&_.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:e,storeConfig:r}=t.data,n=r==null?void 0:r.countries_with_required_region.split(","),o=r==null?void 0:r.optional_zip_countries.split(",");return{availableCountries:e.filter(({two_letter_abbreviation:u,full_name_locale:l})=>!!(u&&l)).map(u=>{const{two_letter_abbreviation:l,full_name_locale:m}=u;return{value:l,text:m}}).sort((u,l)=>u.text.localeCompare(l.text)),countriesWithRequiredRegion:n,optionalZipCountries:o}},N=t=>{var r,n;return(n=(r=t==null?void 0:t.data)==null?void 0:r.country)!=null&&n.available_regions?t.data.country.available_regions.filter(o=>{if(!o)return!1;const{id:i,code:c,name:_}=o;return!!(i&&c&&_)}).map(o=>{const{id:i}=o;return{id:i,text:o.name,value:`${o.code},${o.id}`}}):[]},H=async t=>await s(t!=="shortRequest"?p:R,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?h(e.errors):y(e)}).catch(f),G=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input:$input) {
      firstname
    }
  }
`,L=async t=>await s(G,{method:"POST",variables:{input:a(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname"})}}).then(e=>{var r,n,o;return(r=e.errors)!=null&&r.length?h(e.errors):((o=(n=e==null?void 0:e.data)==null?void 0:n.createCustomerAddress)==null?void 0:o.firstname)||""}).catch(f),I=`
  query GET_CUSTOMER_ADDRESS {
    customer {
      addresses {
        firstname
        lastname
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
`,P=async()=>await s(I,{method:"GET",cache:"no-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?h(t.errors):O(t)}).catch(f),M=`
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
`,z=async()=>await s(M,{method:"GET",cache:"no-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?h(t.errors):$(t)}).catch(f),U=`
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
`,Z=async t=>await s(U,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?h(e.errors):N(e)}).catch(f),w=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!,
  $input: CustomerAddressInput) {
    updateCustomerAddress(id:$id, input:$input) {
      firstname
   }
  }
`,K=async t=>{const{addressId:e,...r}=t;return e?await s(w,{method:"POST",variables:{id:e,input:a(r,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname"})}}).then(n=>{var o,i,c;return(o=n.errors)!=null&&o.length?h(n.errors):((c=(i=n==null?void 0:n.data)==null?void 0:i.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(f):""},q=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id:$id)
  }
`,W=async t=>await s(q,{method:"POST",variables:{id:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?h(e.errors):e.data.deleteCustomerAddress}).catch(f);export{B as a,j as b,H as c,L as d,P as e,s as f,k as g,z as h,Z as i,W as j,a as k,h as l,f as m,b as n,A as o,Q as r,x as s,d as t,K as u};
