/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as i}from"./network-error.js";import{f as u,h as s}from"./fetch-graphql.js";import{t as m}from"./transform-attributes-form.js";const n=`
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
`,_=`
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
`,T=async r=>await u(r!=="shortRequest"?n:_,{method:"GET",cache:"force-cache",variables:{formCode:r}}).then(t=>{var e,o,a;return(e=t.errors)!=null&&e.length?s(t.errors):m((a=(o=t==null?void 0:t.data)==null?void 0:o.attributesForm)==null?void 0:a.items)}).catch(i);export{T as g};
