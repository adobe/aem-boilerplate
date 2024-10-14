import{h as l}from"./network-error.js";import{c as m,d as _,f,h as T}from"./fetch-graphql.js";const b=o=>{let e=[];for(const t of o)if(!(t.frontend_input!=="MULTILINE"||t.multiline_count<2))for(let s=2;s<=t.multiline_count;s++){const a={...t,name:`${t.code}_${s}`,code:`${t.code}_${s}`,id:`${t.code}_${s}`};e.push(a)}return e},h=o=>{var u,c,d;const e=((c=(u=o==null?void 0:o.data)==null?void 0:u.attributesForm)==null?void 0:c.items)||[];if(!e.length)return[];const t=(d=e.filter(r=>{var n;return!((n=r.frontend_input)!=null&&n.includes("HIDDEN"))}))==null?void 0:d.map(({code:r,...n})=>{const i=r!=="country_id"?r:"country_code";return{...n,name:i,id:i,code:i}}),s=b(t);return t.concat(s).map(r=>{const n=m(r.code);return _({...r,customUpperCode:n},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((r,n)=>r.orderNumber-n.orderNumber)},E=`
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
      attributesForm(formCode: customer_register_address) {
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
`,I=async o=>await f(o!=="shortRequest"?E:C,{method:"GET",cache:"force-cache",variables:{formCode:o}}).then(e=>{var t;return(t=e.errors)!=null&&t.length?T(e.errors):h(e)}).catch(l);export{I as g};
