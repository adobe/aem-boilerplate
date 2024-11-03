import{h as a}from"./network-error.js";import{f as i,h as o}from"./fetch-graphql.js";import{t as s}from"./transform-attributes-form.js";const u=`
  query GET_ATTRIBUTES_LIST($entityType: AttributeEntityTypeEnum!) {
    attributesList(entityType: $entityType) {
      items {
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
        ... on ReturnItemAttributeMetadata {
          sort_order
        }
        code
        label
        default_value
        frontend_input
        is_unique
        is_required
        options {
          is_default
          label
          value
        }
      }
      errors {
        type
        message
      }
    }
  }
`,T=async r=>await i(u,{method:"GET",cache:"force-cache",variables:{entityType:r}}).then(t=>{var e;return(e=t.errors)!=null&&e.length?o(t.errors):s(t.data.attributesList.items??[])}).catch(a);export{T as g};
