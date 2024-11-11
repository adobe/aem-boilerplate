import{h as i}from"./network-error.js";import{f as s,h as o}from"./fetch-graphql.js";import{t as c}from"./transform-attributes-form.js";import{a as m}from"./convertCase.js";const d=`
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
`,E=async u=>await s(d,{method:"GET",cache:"force-cache",variables:{entityType:u}}).then(t=>{var e,r,a;return(e=t.errors)!=null&&e.length?o(t.errors):c(((a=(r=t==null?void 0:t.data)==null?void 0:r.attributesList)==null?void 0:a.items)??[])}).catch(i),l=`
mutation REQUEST_RETURN_ORDER($input: RequestReturnInput!) {
  requestReturn(input: $input) {
    return {
      uid
      status
      number
      created_at
    }
  }
}
`,f=async u=>{const t=m(u,"snakeCase",{});return await s(l,{method:"POST",variables:{input:t}}).then(e=>{var n;if((n=e.errors)!=null&&n.length)return o(e.errors);const{created_at:r,...a}=e.data.requestReturn.return;return{...a,createdAt:r}}).catch(i)};export{E as g,f as r};
