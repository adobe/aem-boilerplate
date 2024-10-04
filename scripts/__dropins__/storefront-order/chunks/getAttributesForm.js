import{e as l,d as m,f as _,h as f,a as T}from"./fetch-graphql.js";const b=o=>{let t=[];for(const e of o)if(!(e.frontend_input!=="MULTILINE"||e.multiline_count<2))for(let s=2;s<=e.multiline_count;s++){const i={...e,name:`${e.code}_${s}`,code:`${e.code}_${s}`,id:`${e.code}_${s}`};t.push(i)}return t},h=o=>{var u,c,d;const t=((c=(u=o==null?void 0:o.data)==null?void 0:u.attributesForm)==null?void 0:c.items)||[];if(!t.length)return[];const e=(d=t.filter(r=>{var n;return!((n=r.frontend_input)!=null&&n.includes("HIDDEN"))}))==null?void 0:d.map(({code:r,...n})=>{const a=r!=="country_id"?r:"country_code";return{...n,name:a,id:a,code:a}}),s=b(e);return e.concat(s).map(r=>{const n=l(r.code);return m({...r,customUpperCode:n},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((r,n)=>r.orderNumber-n.orderNumber)},E=`
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
`,y=async o=>await _(o!=="shortRequest"?E:C,{method:"GET",cache:"force-cache",variables:{formCode:o}}).then(t=>{var e;return(e=t.errors)!=null&&e.length?f(t.errors):h(t)}).catch(T);export{y as g};
