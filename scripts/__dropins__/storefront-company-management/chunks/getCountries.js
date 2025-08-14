/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as E}from"@dropins/tools/event-bus.js";import{FetchGraphQL as v}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:F,setFetchGraphQlHeader:P,removeFetchGraphQlHeader:w,setFetchGraphQlHeaders:L,fetchGraphQl:_,getConfig:I}=new v().getMethods(),f=`
  query validateCompanyEmail($email: String!) {
    isCompanyEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,Y=async e=>{try{const a=await _(f,{variables:{email:e}});return a.errors?{isValid:!1,error:"Unable to validate email"}:{isValid:a.data.isCompanyEmailAvailable.is_email_available,error:a.data.isCompanyEmailAvailable.is_email_available?void 0:"This email is already used by another company"}}catch{return{isValid:!1,error:"Unable to validate email"}}},g=e=>{throw e instanceof DOMException&&e.name==="AbortError"||E.emit("error",{source:"company",type:"network",error:e}),e},y=e=>{const a=e.map(r=>r.message).join(" ");throw Error(a)},C=`
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
`,N=`
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
`,u=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    id
    firstname
    lastname
    email
    job_title
  }
`,A=`
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
    payment_methods
    available_payment_methods {
      code
      title
    }
  }
  ${N}
  ${C}
  ${u}
  ${M}
`,b=`
  query GET_COMPANY {
    company {
      ...COMPANY_FULL_FRAGMENT
    }
    customer {
      role {
        id
        name
        permissions {
          id
          text
        }
      }
      status
    }
  }
  ${A}
`,h=e=>{var s,n;if(!(e!=null&&e.data))throw new Error("Invalid response: missing data");const a="updateCompany"in e.data?(s=e.data.updateCompany)==null?void 0:s.company:e.data.company;if(!a)throw new Error("Invalid response: missing company data");const r="customer"in e.data?e.data.customer:void 0,o=a.legal_address?{street:Array.isArray(a.legal_address.street)?a.legal_address.street.filter(i=>i&&i.trim()!==""):[],city:(a.legal_address.city||"").trim(),region:a.legal_address.region?{region:(a.legal_address.region.region||"").trim(),regionCode:(a.legal_address.region.region_code||"").trim(),regionId:a.legal_address.region.region_id?Number(a.legal_address.region.region_id):0}:void 0,countryCode:(a.legal_address.country_code||"").toUpperCase().trim(),postcode:(a.legal_address.postcode||"").trim(),telephone:a.legal_address.telephone?a.legal_address.telephone.trim():void 0}:void 0,t=r==null?void 0:r.role,m=((n=t==null?void 0:t.permissions)==null?void 0:n.map(i=>i.text))||[],d=m.includes("Magento_Company::company_edit")||m.includes("Magento_Company::edit_company_profile")||(t==null?void 0:t.name)==="Company Administrator",l={id:(a.id||"").toString(),name:(a.name||"").trim(),email:(a.email||"").trim().toLowerCase(),legal_name:a.legal_name?a.legal_name.trim():void 0,vat_tax_id:a.vat_tax_id?a.vat_tax_id.trim():void 0,reseller_id:a.reseller_id?a.reseller_id.trim():void 0,legal_address:o,company_admin:a.company_admin?{id:(a.company_admin.id||"").toString(),firstname:(a.company_admin.firstname||"").trim(),lastname:(a.company_admin.lastname||"").trim(),email:(a.company_admin.email||"").trim().toLowerCase(),job_title:a.company_admin.job_title?a.company_admin.job_title.trim():void 0}:void 0,sales_representative:a.sales_representative?{firstname:(a.sales_representative.firstname||"").trim(),lastname:(a.sales_representative.lastname||"").trim(),email:(a.sales_representative.email||"").trim().toLowerCase()}:void 0,payment_methods:Array.isArray(a.payment_methods)?a.payment_methods.filter(i=>i&&typeof i=="string").map(i=>i.trim()).filter(i=>i.length>0):void 0,available_payment_methods:Array.isArray(a.available_payment_methods)?a.available_payment_methods.filter(i=>i&&typeof i.code=="string"&&typeof i.title=="string").map(i=>({code:i.code.trim(),title:i.title.trim()})).filter(i=>i.code.length>0&&i.title.length>0):void 0,canEdit:d,customerRole:t,customerStatus:r==null?void 0:r.status};if(!l.id)throw new Error("Company ID is required");if(!l.name)throw new Error("Company name is required");if(!l.email)throw new Error("Company email is required");return l},T=e=>{var d,l;if(!((l=(d=e==null?void 0:e.data)==null?void 0:d.countries)!=null&&l.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:a,storeConfig:r}=e.data,o=r==null?void 0:r.countries_with_required_region.split(","),t=r==null?void 0:r.optional_zip_countries.split(",");return{availableCountries:a.filter(({two_letter_abbreviation:s,full_name_locale:n})=>!!(s&&n)).map(s=>{const{two_letter_abbreviation:n,full_name_locale:i,available_regions:c}=s,p=Array.isArray(c)&&c.length>0;return{value:n,text:i,availableRegions:p?c:void 0}}).sort((s,n)=>s.text.localeCompare(n.text)),countriesWithRequiredRegion:o,optionalZipCountries:t}},x=async()=>await _(b,{method:"GET",cache:"no-cache"}).then(e=>{var a;return(a=e.errors)!=null&&a.length?y(e.errors):h(e)}).catch(g),R=`
  mutation UPDATE_COMPANY($input: CompanyUpdateInput!) {
    updateCompany(input: $input) {
      company {
        ...COMPANY_FULL_FRAGMENT
      }
    }
  }
  ${A}
`,D=async e=>{const a={};if(e.name!==void 0&&(a.company_name=e.name),e.email!==void 0&&(a.company_email=e.email),e.legal_name!==void 0&&(a.legal_name=e.legal_name),e.vat_tax_id!==void 0&&(a.vat_tax_id=e.vat_tax_id),e.reseller_id!==void 0&&(a.reseller_id=e.reseller_id),e.legal_address!==void 0){let r;Array.isArray(e.legal_address.street)?(r=[...e.legal_address.street],e.legal_address.street_2&&r.push(e.legal_address.street_2)):r=[e.legal_address.street,e.legal_address.street_2].filter(Boolean),r=r.filter(t=>t&&typeof t=="string"&&t.trim().length>0);let o;if(e.legal_address.region&&typeof e.legal_address.region=="object"){const t=e.legal_address.region;t.region===t.region_code?o={region:t.region,region_code:t.region_code,region_id:0}:o={region:t.region,region_code:t.region_code}}else e.legal_address.region_code&&e.legal_address.region!==e.legal_address.region_code?o={region:e.legal_address.region||e.legal_address.region_code,region_code:e.legal_address.region_code}:e.legal_address.region&&(o={region:e.legal_address.region,region_code:e.legal_address.region,region_id:0});a.legal_address={street:r,city:e.legal_address.city,region:o,country_id:e.legal_address.country_code,postcode:e.legal_address.postcode,telephone:e.legal_address.telephone}}return Object.keys(e).forEach(r=>{["name","email","legal_name","vat_tax_id","reseller_id","legal_address"].includes(r)||(a[r]=e[r])}),await _(R,{method:"POST",variables:{input:a}}).then(r=>{var o;return(o=r.errors)!=null&&o.length?y(r.errors):h(r)}).catch(g)},O=`
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
`,U=async()=>{const e="_company_countries",a=sessionStorage.getItem(e);return a?JSON.parse(a):await _(O,{method:"GET",cache:"no-cache"}).then(r=>{var t;if((t=r.errors)!=null&&t.length)return y(r.errors);const o=T(r);return sessionStorage.setItem(e,JSON.stringify(o)),o}).catch(g)};export{x as a,P as b,L as c,I as d,_ as f,U as g,w as r,F as s,D as u,Y as v};
//# sourceMappingURL=getCountries.js.map
