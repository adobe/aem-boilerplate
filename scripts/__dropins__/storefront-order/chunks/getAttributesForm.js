import{h as l}from"./network-error.js";import{f as m,h as _}from"./fetch-graphql.js";import{c as f,a as T}from"./convertCase.js";const b=o=>{let e=[];for(const t of o)if(!(t.frontend_input!=="MULTILINE"||t.multiline_count<2))for(let i=2;i<=t.multiline_count;i++){const a={...t,name:`${t.code}_${i}`,code:`${t.code}_${i}`,id:`${t.code}_${i}`};e.push(a)}return e},h=o=>{var u,c,d;const e=((c=(u=o==null?void 0:o.data)==null?void 0:u.attributesForm)==null?void 0:c.items)||[];if(!e.length)return[];const t=(d=e.filter(r=>{var n;return!((n=r.frontend_input)!=null&&n.includes("HIDDEN"))}))==null?void 0:d.map(({code:r,...n})=>{const s=r!=="country_id"?r:"country_code";return{...n,name:s,id:s,code:s}}),i=b(t);return t.concat(i).map(r=>{const n=f(r.code);return T({...r,customUpperCode:n},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((r,n)=>r.orderNumber-n.orderNumber)},E=`
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
`,p=`
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
`,R=async o=>await m(o!=="shortRequest"?E:p,{method:"GET",cache:"force-cache",variables:{formCode:o}}).then(e=>{var t;return(t=e.errors)!=null&&t.length?_(e.errors):h(e)}).catch(l);export{R as g};
