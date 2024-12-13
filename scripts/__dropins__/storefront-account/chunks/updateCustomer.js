/*! Copyright 2024 Adobe
All Rights Reserved. */
import{n as y,f as l,m as C,l as o,k as x}from"./removeCustomerAddress.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as F}from"../fragments.js";import{c as V}from"./getStoreConfig.js";import"@dropins/tools/event-bus.js";import{merge as k}from"@dropins/tools/lib.js";const B=t=>{var r,u,i,d,h,E,_,f,S,T,w,g,O,P,e,A,M,U,R,N,b,$,G,v,c,D;const m=(i=(u=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:u.custom_attributes)==null?void 0:i.reduce((I,n)=>(I[y(n.code)]=n.value??"",I),{}),a={email:((h=(d=t==null?void 0:t.data)==null?void 0:d.customer)==null?void 0:h.email)||"",firstName:((_=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:_.firstname)||"",lastName:((S=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:S.lastname)||"",middleName:((w=(T=t==null?void 0:t.data)==null?void 0:T.customer)==null?void 0:w.middlename)||"",gender:((O=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:O.gender)||"1",dateOfBirth:((e=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:e.date_of_birth)||"",prefix:((M=(A=t==null?void 0:t.data)==null?void 0:A.customer)==null?void 0:M.prefix)||"",suffix:((R=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:R.suffix)||"",createdAt:((b=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:b.created_at)||"",...m};return k(a,(D=(c=(v=(G=($=V)==null?void 0:$.getConfig())==null?void 0:G.models)==null?void 0:v.CustomerDataModelShort)==null?void 0:c.transformer)==null?void 0:D.call(c,t.data))},L=`
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
`,X=async()=>await l(L,{method:"GET",cache:"no-cache"}).then(t=>{var m;return(m=t.errors)!=null&&m.length?C(t.errors):B(t)}).catch(o),H=`
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
`,Y=async({currentPassword:t,newPassword:m})=>await l(H,{method:"POST",variables:{currentPassword:t,newPassword:m}}).then(a=>{var r,u,i;return(r=a.errors)!=null&&r.length?C(a.errors):((i=(u=a==null?void 0:a.data)==null?void 0:u.changeCustomerPassword)==null?void 0:i.email)||""}).catch(o),W=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,Z=async({email:t,password:m})=>await l(W,{method:"POST",variables:{email:t,password:m}}).then(a=>{var r,u,i,d;return(r=a.errors)!=null&&r.length?C(a.errors):((d=(i=(u=a==null?void 0:a.data)==null?void 0:u.updateCustomerEmail)==null?void 0:i.customer)==null?void 0:d.email)||""}).catch(o),q=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
      }
    }
  }
`,s=async t=>await l(q,{method:"POST",variables:{input:x(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",custom_attributesV2:"custom_attributes"})}}).then(m=>{var a,r,u,i;return(a=m.errors)!=null&&a.length?C(m.errors):((i=(u=(r=m==null?void 0:m.data)==null?void 0:r.updateCustomerV2)==null?void 0:u.customer)==null?void 0:i.email)||""}).catch(o);export{Z as a,s as b,X as g,Y as u};
