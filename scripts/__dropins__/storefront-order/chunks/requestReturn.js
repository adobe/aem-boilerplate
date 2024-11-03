import{h as u}from"./network-error.js";import{f as n,h as i}from"./fetch-graphql.js";import{t as s}from"./transform-attributes-form.js";import{a as o}from"./convertCase.js";const m=`
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
`,p=async r=>await n(m,{method:"GET",cache:"force-cache",variables:{entityType:r}}).then(t=>{var e;return(e=t.errors)!=null&&e.length?i(t.errors):s(t.data.attributesList.items??[])}).catch(u),c=`
mutation REQUEST_RETURN_ORDER($input: RequestReturnInput!) {
  requestReturn(input: $input) {
    return {
    uid
    items {
      uid
      status
      request_quantity
      quantity
      order_item {
      id
      eligible_for_return
      product_sku
      product_sku
      product_type
      quantity_returned
      status
      }
    }
    number
    status
    comments {
      uid
      author_name
      text
      created_at
    }
    customer {
      firstname
      lastname
      email
    }
    }
  }
}
`,h=async r=>{const t=o(r,"snakeCase",{});return console.log("input",t),await n(c,{method:"POST",variables:{input:t}}).then(e=>{var a;return(a=e.errors)!=null&&a.length?i(e.errors):e}).catch(u)};export{p as g,h as r};
