/*! Copyright 2026 Adobe
All Rights Reserved. */
import{l as F,f as e,h as C,a as _,m as k}from"./removeCustomerAddress.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as B}from"../fragments.js";import{c as L}from"./initialize.js";import"@dropins/tools/event-bus.js";import{merge as V}from"@dropins/tools/lib.js";const H=t=>{var r,i,u,d,h,f,E,S,T,w,g,O,P,A,M,U,b,R,N,$,n,v,G,y,l,D;const m=(u=(i=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:i.custom_attributes)==null?void 0:u.filter(c=>c).reduce((c,o)=>{var x;const I=F(o.code);return(x=o.selected_options)!=null&&x.length?c[I]=o.selected_options[0].value??"":c[I]=o.value??"",c},{}),a={email:((h=(d=t==null?void 0:t.data)==null?void 0:d.customer)==null?void 0:h.email)||"",firstName:((E=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:E.firstname)||"",lastName:((T=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:T.lastname)||"",middleName:((g=(w=t==null?void 0:t.data)==null?void 0:w.customer)==null?void 0:g.middlename)||"",gender:((P=(O=t==null?void 0:t.data)==null?void 0:O.customer)==null?void 0:P.gender)||"1",dateOfBirth:((M=(A=t==null?void 0:t.data)==null?void 0:A.customer)==null?void 0:M.date_of_birth)||"",prefix:((b=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:b.prefix)||"",suffix:((N=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:N.suffix)||"",createdAt:((n=($=t==null?void 0:t.data)==null?void 0:$.customer)==null?void 0:n.created_at)||"",...m};return V(a,(D=(l=(y=(G=(v=L)==null?void 0:v.getConfig())==null?void 0:G.models)==null?void 0:y.CustomerDataModelShort)==null?void 0:l.transformer)==null?void 0:D.call(l,t.data))},W=`
  query GET_CUSTOMER {
    customer {
      ...BASIC_CUSTOMER_INFO_FRAGMENT
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
        ... on AttributeSelectedOptions {
          code
          selected_options {
            value
          }
        }
        code
      }
    }
  }
  ${B}
`,Z=async()=>await e(W,{method:"GET",cache:"no-cache"}).then(t=>{var m;return(m=t.errors)!=null&&m.length?C(t.errors):H(t)}).catch(_),q=`
  mutation CHANGE_CUSTOMER_PASSWORD(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      email
    }
  }
`,s=async({currentPassword:t,newPassword:m})=>await e(q,{method:"POST",variables:{currentPassword:t,newPassword:m}}).then(a=>{var r,i,u;return(r=a.errors)!=null&&r.length?C(a.errors):((u=(i=a==null?void 0:a.data)==null?void 0:i.changeCustomerPassword)==null?void 0:u.email)||""}).catch(_),K=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,p=async({email:t,password:m})=>await e(K,{method:"POST",variables:{email:t,password:m}}).then(a=>{var r,i,u,d;return(r=a.errors)!=null&&r.length?C(a.errors):((d=(u=(i=a==null?void 0:a.data)==null?void 0:i.updateCustomerEmail)==null?void 0:u.customer)==null?void 0:d.email)||""}).catch(_),Q=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
      }
    }
  }
`,tt=async t=>await e(Q,{method:"POST",variables:{input:k(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(m=>{var a,r,i,u;return(a=m.errors)!=null&&a.length?C(m.errors):((u=(i=(r=m==null?void 0:m.data)==null?void 0:r.updateCustomerV2)==null?void 0:i.customer)==null?void 0:u.email)||""}).catch(_);export{p as a,tt as b,Z as g,s as u};
//# sourceMappingURL=updateCustomer.js.map
