/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as T}from"@dropins/tools/event-bus.js";import{FetchGraphQL as I}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:U,setFetchGraphQlHeader:q,removeFetchGraphQlHeader:x,setFetchGraphQlHeaders:$,fetchGraphQl:p,getConfig:j}=new I().getMethods(),w=`
  query validateCompanyEmail($email: String!) {
    isCompanyEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,Q=async e=>{try{const a=await p(w,{variables:{email:e}});return a.errors?{isValid:!1,error:"Unable to validate email"}:{isValid:a.data.isCompanyEmailAvailable.is_email_available,error:a.data.isCompanyEmailAvailable.is_email_available?void 0:"This email is already used by another company"}}catch{return{isValid:!1,error:"Unable to validate email"}}},E=e=>{var A;if(!(e!=null&&e.data))throw new Error("Invalid response: missing data");const a="updateCompany"in e.data?(A=e.data.updateCompany)==null?void 0:A.company:e.data.company;if(!a)throw new Error("Invalid response: missing company data");const n="customer"in e.data?e.data.customer:void 0,o=a.legal_address?{street:Array.isArray(a.legal_address.street)?a.legal_address.street.filter(r=>r&&r.trim()!==""):[],city:(a.legal_address.city||"").trim(),region:a.legal_address.region?{region:(a.legal_address.region.region||"").trim(),regionCode:(a.legal_address.region.region_code||"").trim(),regionId:a.legal_address.region.region_id?Number(a.legal_address.region.region_id):0}:void 0,countryCode:(a.legal_address.country_code||"").toUpperCase().trim(),postcode:(a.legal_address.postcode||"").trim(),telephone:a.legal_address.telephone?a.legal_address.telephone.trim():void 0}:void 0,t=n==null?void 0:n.role,s=((r=[])=>{const m=new Set,g=[...r];for(;g.length;){const c=g.pop();if(c&&(typeof c.id=="string"&&m.add(c.id),Array.isArray(c.children)&&c.children.length))for(const h of c.children)g.push(h)}return m})((t==null?void 0:t.permissions)||[]),l=(t==null?void 0:t.id)==="0"||typeof(t==null?void 0:t.id)=="number"&&t.id===0||(t==null?void 0:t.name)==="Company Administrator",i={canViewAccount:l||s.has("Magento_Company::view_account"),canEditAccount:l||s.has("Magento_Company::edit_account"),canViewAddress:l||s.has("Magento_Company::view_address"),canEditAddress:l||s.has("Magento_Company::edit_address"),canViewContacts:l||s.has("Magento_Company::contacts"),canViewPaymentInformation:l||s.has("Magento_Company::payment_information"),canViewShippingInformation:l||s.has("Magento_Company::shipping_information")},d={id:(a.id||"").toString(),name:(a.name||"").trim(),email:(a.email||"").trim().toLowerCase(),legalName:a.legal_name?a.legal_name.trim():void 0,vatTaxId:a.vat_tax_id?a.vat_tax_id.trim():void 0,resellerId:a.reseller_id?a.reseller_id.trim():void 0,legalAddress:o,companyAdmin:a.company_admin?{id:(a.company_admin.id||"").toString(),firstname:(a.company_admin.firstname||"").trim(),lastname:(a.company_admin.lastname||"").trim(),email:(a.company_admin.email||"").trim().toLowerCase(),jobTitle:a.company_admin.job_title?a.company_admin.job_title.trim():void 0}:void 0,salesRepresentative:a.sales_representative?{firstname:(a.sales_representative.firstname||"").trim(),lastname:(a.sales_representative.lastname||"").trim(),email:(a.sales_representative.email||"").trim().toLowerCase()}:void 0,availablePaymentMethods:Array.isArray(a.available_payment_methods)?a.available_payment_methods.filter(r=>r&&typeof r.code=="string"&&typeof r.title=="string").map(r=>({code:r.code.trim(),title:r.title.trim()})).filter(r=>r.code.length>0&&r.title.length>0):void 0,availableShippingMethods:Array.isArray(a.available_shipping_methods)?a.available_shipping_methods.filter(r=>r&&typeof r.code=="string"&&typeof r.title=="string").map(r=>({code:r.code.trim(),title:r.title.trim()})).filter(r=>r.code.length>0&&r.title.length>0):void 0,canEditAccount:i.canEditAccount,canEditAddress:i.canEditAddress,permissionsFlags:i,customerRole:t,customerStatus:n==null?void 0:n.status};if(i.canViewAccount){if(!d.id)throw new Error("Company ID is required");if(!d.name)throw new Error("Company name is required");if(!d.email)throw new Error("Company email is required")}return d},O=e=>{var s,l;if(!((l=(s=e==null?void 0:e.data)==null?void 0:s.countries)!=null&&l.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:a,storeConfig:n}=e.data,o=n==null?void 0:n.countries_with_required_region.split(","),t=n==null?void 0:n.optional_zip_countries.split(",");return{availableCountries:a.filter(({two_letter_abbreviation:i,full_name_locale:d})=>!!(i&&d)).map(i=>{const{two_letter_abbreviation:d,full_name_locale:A,available_regions:r}=i,m=Array.isArray(r)&&r.length>0;return{value:d,text:A,availableRegions:m?r:void 0}}).sort((i,d)=>i.text.localeCompare(d.text)),countriesWithRequiredRegion:o,optionalZipCountries:t}},P=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          children {
            id
            children {
              id
              children {
                id
                children { id }
              }
            }
          }
        }
      }
      status
    }
  }
`,u=`
  fragment COMPANY_LEGAL_ADDRESS_FRAGMENT on CompanyLegalAddress {
    street
    city
    region {
      region
      region_code
      region_id
    }
    country_code
    postcode
    telephone
  }
`,v=`
  fragment COMPANY_BASIC_INFO_FRAGMENT on Company {
    id
    name
    email
    legal_name
    vat_tax_id
    reseller_id
  }
`,M=`
  fragment COMPANY_SALES_REPRESENTATIVE_FRAGMENT on CompanySalesRepresentative {
    firstname
    lastname
    email
  }
`,N=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    id
    firstname
    lastname
    email
    job_title
  }
`,G=`
  fragment COMPANY_FULL_FRAGMENT on Company {
    ...COMPANY_BASIC_INFO_FRAGMENT
    legal_address {
      ...COMPANY_LEGAL_ADDRESS_FRAGMENT
    }
    company_admin {
      ...COMPANY_ADMIN_FRAGMENT
    }
    sales_representative {
      ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT
    }
    available_payment_methods {
      code
      title
    }
    available_shipping_methods {
      code
      title
    }
  }
  ${v}
  ${u}
  ${N}
  ${M}
`,R=(e=[])=>{const a=new Set,n=[...e];for(;n.length;){const o=n.pop();if(o&&(typeof o.id=="string"&&a.add(o.id),Array.isArray(o.children)&&o.children.length))for(const t of o.children)n.push(t)}return a},F=e=>{const a=e.has("Magento_Company::view_account"),n=e.has("Magento_Company::view_address"),o=e.has("Magento_Company::contacts"),t=e.has("Magento_Company::payment_information"),_=e.has("Magento_Company::shipping_information"),s=[...a?["...COMPANY_BASIC_INFO_FRAGMENT"]:[]];if(n&&s.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),o&&(s.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),s.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }")),t&&s.push("available_payment_methods { code title }"),_&&s.push("available_shipping_methods { code title }"),s.length===0)return`
      query GET_COMPANY_DYNAMIC {
        company { __typename }
      }
    `;const l=`
    query GET_COMPANY_DYNAMIC {
      company {
        ${s.join(`
        `)}
      }
    }
  `,i=a?[v]:[];return s.some(d=>d.startsWith("legal_address"))&&i.push(u),s.some(d=>d.startsWith("company_admin"))&&i.push(N),s.some(d=>d.startsWith("sales_representative"))&&i.push(M),`${l}
${i.join(`
`)}`};let y=null,f=null;const k=()=>{f=null},B=async(e=!0)=>e&&f?f:y||(y=(async()=>{var a,n,o,t,_,s;try{const l=await p(P,{method:"GET",cache:"no-cache"});if((a=l.errors)!=null&&a.length)return null;const i=(o=(n=l==null?void 0:l.data)==null?void 0:n.customer)==null?void 0:o.role,d=R((i==null?void 0:i.permissions)||[]);((i==null?void 0:i.id)==="0"||typeof(i==null?void 0:i.id)=="number"&&(i==null?void 0:i.id)===0||(i==null?void 0:i.name)==="Company Administrator")&&["Magento_Company::view_account","Magento_Company::view_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information"].forEach(C=>d.add(C));const r=F(d),m=await p(r,{method:"GET",cache:"no-cache"});if((t=m.errors)!=null&&t.length)return null;const g=(_=m==null?void 0:m.data)==null?void 0:_.company;if(!(g&&Object.keys(g).some(C=>C!=="__typename")))return null;m.data.customer=(s=l==null?void 0:l.data)==null?void 0:s.customer;const h=E(m);return f=h,h}catch{return null}finally{y=null}})(),y),S=e=>{throw e instanceof DOMException&&e.name==="AbortError"||T.emit("error",{source:"company",type:"network",error:e}),e},b=e=>{const a=e.map(n=>n.message).join(" ");throw Error(a)},Y=`
  mutation UPDATE_COMPANY($input: CompanyUpdateInput!) {
    updateCompany(input: $input) {
      company {
        ...COMPANY_FULL_FRAGMENT
      }
    }
  }
  ${G}
`,W=async e=>{const a={};if(e.name!==void 0&&(a.company_name=e.name),e.email!==void 0&&(a.company_email=e.email),e.legalName!==void 0&&(a.legal_name=e.legalName),e.vatTaxId!==void 0&&(a.vat_tax_id=e.vatTaxId),e.resellerId!==void 0&&(a.reseller_id=e.resellerId),e.legalAddress!==void 0){let n;Array.isArray(e.legalAddress.street)?(n=[...e.legalAddress.street],e.legalAddress.street2&&n.push(e.legalAddress.street2)):n=[e.legalAddress.street,e.legalAddress.street2].filter(t=>typeof t=="string"&&t.trim().length>0),n=n.filter(t=>t&&typeof t=="string"&&t.trim().length>0);let o;if(e.legalAddress.region&&typeof e.legalAddress.region=="object"){const t=e.legalAddress.region;t.region===t.regionCode?o={region:t.region,region_code:t.regionCode,region_id:0}:o={region:t.region,region_code:t.regionCode}}else e.legalAddress.regionCode&&e.legalAddress.region!==e.legalAddress.regionCode?o={region:e.legalAddress.region||e.legalAddress.regionCode,region_code:e.legalAddress.regionCode}:e.legalAddress.region&&(o={region:e.legalAddress.region,region_code:e.legalAddress.region,region_id:0});a.legal_address={street:n,city:e.legalAddress.city,region:o,country_id:e.legalAddress.countryCode,postcode:e.legalAddress.postcode,telephone:e.legalAddress.telephone}}return await p(Y,{method:"POST",variables:{input:a}}).then(n=>{var o;return(o=n.errors)!=null&&o.length?b(n.errors):E(n)}).catch(S)},L=`
  query getCountries {
    countries {
      id
      two_letter_abbreviation
      three_letter_abbreviation
      full_name_locale
      full_name_english
      available_regions {
        id
        code
        name
      }
    }
    storeConfig {
      countries_with_required_region
      optional_zip_countries
    }
  }
`,H=async()=>{const e="_company_countries",a=sessionStorage.getItem(e);return a?JSON.parse(a):await p(L,{method:"GET"}).then(n=>{var t;if((t=n.errors)!=null&&t.length)return b(n.errors);const o=O(n);return sessionStorage.setItem(e,JSON.stringify(o)),o}).catch(S)};export{B as a,q as b,x as c,$ as d,j as e,p as f,H as g,k as r,U as s,W as u,Q as v};
//# sourceMappingURL=getCountries.js.map
