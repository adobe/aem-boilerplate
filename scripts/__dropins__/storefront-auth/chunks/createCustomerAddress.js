/*! Copyright 2024 Adobe
All Rights Reserved. */
import{CUSTOMER_INFORMATION_FRAGMENT as N}from"../fragments.js";import{f as m,h as u}from"./network-error.js";import{s as I}from"./setReCaptchaToken.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{merge as U}from"@dropins/tools/lib.js";import{c as g}from"./initialize.js";import{t as $}from"./transform-attributes-form.js";import{h as F}from"./getStoreConfig.js";const v=`
  mutation CREATE_CUSTOMER($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${N}
`,y=`
  mutation CREATE_CUSTOMER_V2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${N}
`,G=(r,e)=>{var i,a,c,n,C,l,f,E,T,_,R,A,h,S,b,M,O,d,s,p;let o;if(e){const{data:t}=r;o={firstName:((a=(i=t==null?void 0:t.createCustomerV2)==null?void 0:i.customer)==null?void 0:a.firstname)??"",lastName:((n=(c=t==null?void 0:t.createCustomerV2)==null?void 0:c.customer)==null?void 0:n.lastname)??"",email:((l=(C=t==null?void 0:t.createCustomerV2)==null?void 0:C.customer)==null?void 0:l.email)??"",isSubscribed:((E=(f=t==null?void 0:t.createCustomerV2)==null?void 0:f.customer)==null?void 0:E.is_subscribed)??!1,customAttributes:((T=t==null?void 0:t.createCustomerV2)==null?void 0:T.custom_attributes)??[],errors:(r==null?void 0:r.errors)??[]}}else{const{data:t}=r;o={firstName:((R=(_=t==null?void 0:t.createCustomer)==null?void 0:_.customer)==null?void 0:R.firstname)??"",lastName:((h=(A=t==null?void 0:t.createCustomer)==null?void 0:A.customer)==null?void 0:h.lastname)??"",email:((b=(S=t==null?void 0:t.createCustomer)==null?void 0:S.customer)==null?void 0:b.email)??"",isSubscribed:((O=(M=t==null?void 0:t.createCustomer)==null?void 0:M.customer)==null?void 0:O.is_subscribed)??!1,errors:(r==null?void 0:r.errors)??[]}}return U(o,(p=(s=(d=g.getConfig().models)==null?void 0:d.CustomerModel)==null?void 0:s.transformer)==null?void 0:p.call(s,r))},H=async(r,e)=>{await I();const o=await m(e?y:v,{method:"POST",variables:{input:{...r}}}).catch(u);return G(o,e)},V=`
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
`,J=async r=>await m(V,{method:"GET",cache:"force-cache",variables:{formCode:r}}).then(e=>{var o;return(o=e.errors)!=null&&o.length?F(e.errors):$(e)}).catch(u),w=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,K=async r=>await m(w,{method:"POST",variables:{input:r}}).then(e=>{var o;return(o=e.errors)!=null&&o.length?F(e.errors):e.data.createCustomerAddress.firstname||""}).catch(u);export{K as a,H as c,J as g};
