/*! Copyright 2024 Adobe
All Rights Reserved. */
import{h as i}from"./network-error.js";import{f as s,h as o}from"./fetch-graphql.js";import{t as R}from"./transform-attributes-form.js";import{a as c}from"./convertCase.js";const m=`
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
`,f=async n=>await s(m,{method:"GET",cache:"force-cache",variables:{entityType:n}}).then(t=>{var e,r,a;return(e=t.errors)!=null&&e.length?o(t.errors):R((a=(r=t==null?void 0:t.data)==null?void 0:r.attributesList)==null?void 0:a.items)}).catch(i),_=`
  fragment OrderReturn on Return {
    __typename
    uid
    status
    number
    created_at
  }
`,T=`
mutation REQUEST_RETURN_ORDER($input: RequestReturnInput!) {
  requestReturn(input: $input) {
    return {
      ...OrderReturn
    }
  }
}
${_}`,y=async n=>{const t=c(n,"snakeCase",{});return await s(T,{method:"POST",variables:{input:t}}).then(e=>{var u;if((u=e.errors)!=null&&u.length)return o(e.errors);const{created_at:r,...a}=e.data.requestReturn.return;return{...a,createdAt:r}}).catch(i)};export{f as g,y as r};
