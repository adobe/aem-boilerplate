/*! Copyright 2026 Adobe
All Rights Reserved. */
import{CUSTOMER_INFORMATION_FRAGMENT as O}from"../fragments.js";import{f as s,h as u}from"./network-error.js";import{s as b}from"./setReCaptchaToken.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{merge as N}from"@dropins/tools/lib.js";import{c as p,h as S}from"./getAdobeCommerceOptimizerData.js";import{t as F}from"./transform-attributes-form.js";const I=`
  mutation CREATE_CUSTOMER($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${O}
`,U=`
  mutation CREATE_CUSTOMER_V2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${O}
`,g=(r,e)=>{var a,i,c,n,C,l,E,T,_,f,R,A,h,d,m,M;let o;if(e){const{data:t}=r;o={firstName:((i=(a=t==null?void 0:t.createCustomerV2)==null?void 0:a.customer)==null?void 0:i.firstname)??"",lastName:((n=(c=t==null?void 0:t.createCustomerV2)==null?void 0:c.customer)==null?void 0:n.lastname)??"",email:((l=(C=t==null?void 0:t.createCustomerV2)==null?void 0:C.customer)==null?void 0:l.email)??"",customAttributes:((E=t==null?void 0:t.createCustomerV2)==null?void 0:E.custom_attributes)??[],errors:(r==null?void 0:r.errors)??[]}}else{const{data:t}=r;o={firstName:((_=(T=t==null?void 0:t.createCustomer)==null?void 0:T.customer)==null?void 0:_.firstname)??"",lastName:((R=(f=t==null?void 0:t.createCustomer)==null?void 0:f.customer)==null?void 0:R.lastname)??"",email:((h=(A=t==null?void 0:t.createCustomer)==null?void 0:A.customer)==null?void 0:h.email)??"",errors:(r==null?void 0:r.errors)??[]}}return N(o,(M=(m=(d=p.getConfig().models)==null?void 0:d.CustomerModel)==null?void 0:m.transformer)==null?void 0:M.call(m,r))},$=r=>{if(!r.dob)return r;const{dob:e,...o}=r;return{...o,date_of_birth:e}},x=async(r,e)=>{await b();const o=await s(e?U:I,{method:"POST",variables:{input:{...$(r)}}}).catch(u);return g(o,e)},v=`
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
`,Q=async r=>await s(v,{method:"GET",cache:"force-cache",variables:{formCode:r}}).then(e=>{var o;return(o=e.errors)!=null&&o.length?S(e.errors):F(e)}).catch(u),y=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,j=async r=>await s(y,{method:"POST",variables:{input:r}}).then(e=>{var o;return(o=e.errors)!=null&&o.length?S(e.errors):e.data.createCustomerAddress.firstname||""}).catch(u);export{j as a,x as c,Q as g};
//# sourceMappingURL=createCustomerAddress.js.map
