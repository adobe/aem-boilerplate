/*! Copyright 2024 Adobe
All Rights Reserved. */
import{h as i,a as _}from"./network-error.js";import{f as o,h as s}from"./fetch-graphql.js";import{t as d}from"./transform-attributes-form.js";import{REQUEST_RETURN_ORDER_FRAGMENT as m}from"../fragments.js";import{merge as l}from"@dropins/tools/lib.js";import{c as f}from"./initialize.js";const h=r=>{var a,n,E,c,R,T;if(!((n=(a=r==null?void 0:r.data)==null?void 0:a.requestReturn)!=null&&n.return))return{};const{created_at:e,...t}=r.data.requestReturn.return,u={...t,createdAt:e};return l(u,(T=(R=(c=(E=f.getConfig())==null?void 0:E.models)==null?void 0:c.RequestReturnModel)==null?void 0:R.transformer)==null?void 0:T.call(R,r.data.requestReturn.return))},U=`
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
`,g=async r=>await o(U,{method:"GET",cache:"force-cache",variables:{entityType:r}}).then(e=>{var t,u,a;return(t=e.errors)!=null&&t.length?s(e.errors):d((a=(u=e==null?void 0:e.data)==null?void 0:u.attributesList)==null?void 0:a.items)}).catch(i),q=`
  mutation REQUEST_RETURN_ORDER($input: RequestReturnInput!) {
    requestReturn(input: $input) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
      }
    }
  }
  ${m}
`,O=async r=>{const e=_(r,"snakeCase",{});return await o(q,{method:"POST",variables:{input:e}}).then(t=>{var u;return(u=t.errors)!=null&&u.length?s(t.errors):h(t)}).catch(i)},S=`
  mutation REQUEST_RETURN_GUEST_ORDER($input: RequestGuestReturnInput!) {
    requestGuestReturn(input: $input) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
      }
    }
  }
  ${m}
`,v=async r=>{const e=_(r,"snakeCase",{});return await o(S,{method:"POST",variables:{input:e}}).then(t=>{var n;if((n=t.errors)!=null&&n.length)return s(t.errors);const{created_at:u,...a}=t.data.requestGuestReturn.return;return{...a,createdAt:u}}).catch(i)};export{v as a,g,O as r};
