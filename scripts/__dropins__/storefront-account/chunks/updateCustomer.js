/*! Copyright 2026 Adobe
All Rights Reserved. */
import{l as n,f as C,h as o,a as h,m as x}from"./removeCustomerAddress.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as F}from"../fragments.js";import{c as V}from"./initialize.js";import"@dropins/tools/event-bus.js";import{merge as B}from"@dropins/tools/lib.js";const L=t=>{var r,u,i,d,_,f,E,S,T,w,e,g,O,P,A,M,U,R,b,N,$,G,v,D,c,I;const m=(i=(u=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:u.custom_attributes)==null?void 0:i.filter(l=>l).reduce((l,y)=>(l[n(y.code)]=y.value??"",l),{}),a={email:((_=(d=t==null?void 0:t.data)==null?void 0:d.customer)==null?void 0:_.email)||"",firstName:((E=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:E.firstname)||"",lastName:((T=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:T.lastname)||"",middleName:((e=(w=t==null?void 0:t.data)==null?void 0:w.customer)==null?void 0:e.middlename)||"",gender:((O=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:O.gender)||"1",dateOfBirth:((A=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:A.date_of_birth)||"",prefix:((U=(M=t==null?void 0:t.data)==null?void 0:M.customer)==null?void 0:U.prefix)||"",suffix:((b=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:b.suffix)||"",createdAt:(($=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:$.created_at)||"",...m};return B(a,(I=(c=(D=(v=(G=V)==null?void 0:G.getConfig())==null?void 0:v.models)==null?void 0:D.CustomerDataModelShort)==null?void 0:c.transformer)==null?void 0:I.call(c,t.data))},k=`
  query GET_CUSTOMER {
    customer {
      ...BASIC_CUSTOMER_INFO_FRAGMENT
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
        code
      }
    }
  }
  ${F}
`,X=async()=>await C(k,{method:"GET",cache:"no-cache"}).then(t=>{var m;return(m=t.errors)!=null&&m.length?o(t.errors):L(t)}).catch(h),H=`
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
`,Y=async({currentPassword:t,newPassword:m})=>await C(H,{method:"POST",variables:{currentPassword:t,newPassword:m}}).then(a=>{var r,u,i;return(r=a.errors)!=null&&r.length?o(a.errors):((i=(u=a==null?void 0:a.data)==null?void 0:u.changeCustomerPassword)==null?void 0:i.email)||""}).catch(h),W=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,Z=async({email:t,password:m})=>await C(W,{method:"POST",variables:{email:t,password:m}}).then(a=>{var r,u,i,d;return(r=a.errors)!=null&&r.length?o(a.errors):((d=(i=(u=a==null?void 0:a.data)==null?void 0:u.updateCustomerEmail)==null?void 0:i.customer)==null?void 0:d.email)||""}).catch(h),q=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
      }
    }
  }
`,s=async t=>await C(q,{method:"POST",variables:{input:x(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(m=>{var a,r,u,i;return(a=m.errors)!=null&&a.length?o(m.errors):((i=(u=(r=m==null?void 0:m.data)==null?void 0:r.updateCustomerV2)==null?void 0:u.customer)==null?void 0:i.email)||""}).catch(h);export{Z as a,s as b,X as g,Y as u};
//# sourceMappingURL=updateCustomer.js.map
