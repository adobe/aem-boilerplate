import{events as n}from"@dropins/tools/event-bus.js";import{l,k as a,j as d,q as c,p as f}from"./fixtures.js";import{Initializer as m}from"@dropins/tools/lib.js";import{a as i}from"./getCustomer.js";const _=e=>e?e.filter(Boolean).filter(r=>(r==null?void 0:r.label)&&(r==null?void 0:r.value)).map(r=>({text:r.label,value:r.value})):[],g=e=>e?e.filter(Boolean).filter(t=>(t==null?void 0:t.name)&&(t==null?void 0:t.value)):[],v=e=>e?e.filter(Boolean).map(r=>({code:r.code,defaultValue:r.default_value||void 0,frontendInput:r.frontend_input||void 0,isDisabled:!1,isRequired:r.is_required,label:r.label||void 0,multilineCount:r.multiline_count||void 0,options:_(r.options),sortOrder:r.sort_order||void 0,validateRules:g(r.validate_rules)})):[],p=e=>{if(e)return e.filter(t=>!!t).filter(t=>{const{two_letter_abbreviation:r,full_name_locale:s}=t;return!!r&&!!s}).map(t=>{const{two_letter_abbreviation:r,full_name_locale:s}=t;return{value:r,label:s}})},y=`
  query fetchAddressFormFields {
    attributesForm(formCode: "customer_register_address") {
      items {
        frontend_input
        code
        label
        default_value
        is_required
        options {
          label
          value
          is_default
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
        message
        type
      }
    }
  }
`,b=async()=>await l({type:"query",query:y,options:{method:"GET",cache:"no-cache"},path:"attributesForm.items",signalType:"addressFormFields",transformer:v,defaultValueOnFail:[]}),h=`
query getCountries {
    countries {
      two_letter_abbreviation
      full_name_locale
    }
}`,C=async()=>await l({type:"query",query:h,options:{method:"GET",cache:"no-cache"},path:"countries",signalType:"countryList",transformer:p,defaultValueOnFail:[]}),F=()=>[n.on("cart/initialized",e=>{const t=(e==null?void 0:e.id)||null;a.cartId=t,t?i():o()},{eager:!0}),n.on("cart/data",e=>{const t=(e==null?void 0:e.id)||null;t!==a.cartId&&(a.cartId=t,t?i():o())},{eager:!0}),n.on("authenticated",e=>{a.authenticated=e,e||I()},{eager:!0})],u=new m({init:async e=>{const t={guestViewCookieExpirationDays:30,...e};u.config.setConfig(t),q()},listeners:F}),V=u.config,q=async()=>Promise.all([d(),C(),b()]),o=()=>{a.cartId=null,c.value={pending:!1,data:null}},I=()=>{a.authenticated=!1,f.value={pending:!1,data:null}};export{q as a,I as b,V as c,b as f,C as g,u as i,o as r};
