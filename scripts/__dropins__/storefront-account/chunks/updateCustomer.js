import{n as $,f as d,l,m as _,k as I}from"./removeCustomerAddress.js";const y=t=>{var r,m,u,c,i,h,C,f,o,e,E,g,T,S,w,n,O,P,b,A,R,U,N;const a=(u=(m=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:m.custom_attributes)==null?void 0:u.reduce((G,M)=>(G[$(M.code)]=M.value??"",G),{});return{email:((i=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:i.email)||"",firstName:((C=(h=t==null?void 0:t.data)==null?void 0:h.customer)==null?void 0:C.firstname)||"",lastName:((o=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:o.lastname)||"",middleName:((E=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:E.middlename)||"",gender:(T=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:T.gender,dob:((w=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:w.dob)||"",dateOfBirth:((O=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:O.date_of_birth)||"",prefix:((b=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:b.prefix)||"",suffix:((R=(A=t==null?void 0:t.data)==null?void 0:A.customer)==null?void 0:R.suffix)||"",createdAt:((N=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:N.created_at)||"",...a}},v=t=>{var a,r,m,u;return{minLength:+((r=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:r.minimum_password_length)||3,requiredCharacterClasses:+((u=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:u.required_character_classes_number)||0}},x=`
  fragment BasicCustomerInfo on Customer {
    date_of_birth
    dob
    email
    firstname
    gender
    lastname
    middlename
    prefix
    suffix
    created_at
  }
`,D=`
  query GET_CUSTOMER {
  customer {
    ...BasicCustomerInfo
      custom_attributes {
    ... on AttributeValue {
        code
        value
      }
      code
     }
    }
  }
${x}`,k=async()=>await d(D,{method:"GET",cache:"no-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?l(t.errors):y(t)}).catch(_),q=`
  mutation CHANGE_CUSTOMER_PASSWORD($currentPassword: String!, $newPassword: String!) {
    changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      email
    }
  }
`,H=async({currentPassword:t,newPassword:a})=>await d(q,{method:"POST",variables:{currentPassword:t,newPassword:a}}).then(r=>{var m,u,c;return(m=r.errors)!=null&&m.length?l(r.errors):((c=(u=r==null?void 0:r.data)==null?void 0:u.changeCustomerPassword)==null?void 0:c.email)||""}).catch(_),F=`
  query GET_STORE_CONFIG {
    storeConfig {
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
    }
  }
`,W=async()=>await d(F,{method:"GET",cache:"force-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?l(t.errors):v(t)}).catch(_),V=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String! $password: String!) {
    updateCustomerEmail(email:$email password:$password) {
      customer {
       email
      }
    }
  }
`,K=async({email:t,password:a})=>await d(V,{method:"POST",variables:{email:t,password:a}}).then(r=>{var m,u,c,i;return(m=r.errors)!=null&&m.length?l(r.errors):((i=(c=(u=r==null?void 0:r.data)==null?void 0:u.updateCustomerEmail)==null?void 0:c.customer)==null?void 0:i.email)||""}).catch(_),B=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input:$input) {
      customer {
       email
      }
    }
  }
`,Q=async t=>await d(B,{method:"POST",variables:{input:I(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",custom_attributesV2:"custom_attributes"})}}).then(a=>{var r,m,u,c;return(r=a.errors)!=null&&r.length?l(a.errors):((c=(u=(m=a==null?void 0:a.data)==null?void 0:m.updateCustomerV2)==null?void 0:u.customer)==null?void 0:c.email)||""}).catch(_);export{W as a,K as b,Q as c,k as g,H as u};
