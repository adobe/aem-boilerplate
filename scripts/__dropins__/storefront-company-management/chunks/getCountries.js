/*! Copyright 2025 Adobe
All Rights Reserved. */
import{d as _,b as C,f as A,h as g,e as y}from"./fetchUserPermissions.js";const f=`
  query validateCompanyEmail($email: String!) {
    isCompanyEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,O=async e=>{try{const a=await _(f,{variables:{email:e}});return a.errors?{isValid:!1,error:"Unable to validate email"}:{isValid:a.data.isCompanyEmailAvailable.is_email_available,error:a.data.isCompanyEmailAvailable.is_email_available?void 0:"This email is already used by another company"}}catch{return{isValid:!1,error:"Unable to validate email"}}},p=e=>{var s;if(!(e!=null&&e.data))throw new Error("Invalid response: missing data");const a="updateCompany"in e.data?(s=e.data.updateCompany)==null?void 0:s.company:e.data.company;if(!a)throw new Error("Invalid response: missing company data");const r="customer"in e.data?e.data.customer:void 0,o=a.legal_address?{street:Array.isArray(a.legal_address.street)?a.legal_address.street.filter(t=>t&&t.trim()!==""):[],city:(a.legal_address.city||"").trim(),region:a.legal_address.region?{region:(a.legal_address.region.region||"").trim(),regionCode:(a.legal_address.region.region_code||"").trim(),regionId:a.legal_address.region.region_id?Number(a.legal_address.region.region_id):0}:void 0,countryCode:(a.legal_address.country_code||"").toUpperCase().trim(),postcode:(a.legal_address.postcode||"").trim(),telephone:a.legal_address.telephone?a.legal_address.telephone.trim():void 0}:void 0,n=r==null?void 0:r.role,d=C(n),i={id:(a.id||"").toString(),name:(a.name||"").trim(),email:(a.email||"").trim().toLowerCase(),legalName:a.legal_name?a.legal_name.trim():void 0,vatTaxId:a.vat_tax_id?a.vat_tax_id.trim():void 0,resellerId:a.reseller_id?a.reseller_id.trim():void 0,legalAddress:o,companyAdmin:a.company_admin?{id:(a.company_admin.id||"").toString(),firstname:(a.company_admin.firstname||"").trim(),lastname:(a.company_admin.lastname||"").trim(),email:(a.company_admin.email||"").trim().toLowerCase(),jobTitle:a.company_admin.job_title?a.company_admin.job_title.trim():void 0}:void 0,salesRepresentative:a.sales_representative?{firstname:(a.sales_representative.firstname||"").trim(),lastname:(a.sales_representative.lastname||"").trim(),email:(a.sales_representative.email||"").trim().toLowerCase()}:void 0,availablePaymentMethods:Array.isArray(a.available_payment_methods)?a.available_payment_methods.filter(t=>t&&typeof t.code=="string"&&typeof t.title=="string").map(t=>({code:t.code.trim(),title:t.title.trim()})).filter(t=>t.code.length>0&&t.title.length>0):void 0,availableShippingMethods:Array.isArray(a.available_shipping_methods)?a.available_shipping_methods.filter(t=>t&&typeof t.code=="string"&&typeof t.title=="string").map(t=>({code:t.code.trim(),title:t.title.trim()})).filter(t=>t.code.length>0&&t.title.length>0):void 0,canEditAccount:d.canEditAccount,canEditAddress:d.canEditAddress,permissionsFlags:d,customerRole:n,customerStatus:r==null?void 0:r.status};if(d.canViewAccount){if(!i.id)throw new Error("Company ID is required");if(!i.name)throw new Error("Company name is required");if(!i.email)throw new Error("Company email is required")}return i},v=e=>{var i,s;if(!((s=(i=e==null?void 0:e.data)==null?void 0:i.countries)!=null&&s.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:a,storeConfig:r}=e.data,o=r==null?void 0:r.countries_with_required_region.split(","),n=r==null?void 0:r.optional_zip_countries.split(",");return{availableCountries:a.filter(({two_letter_abbreviation:t,full_name_locale:m})=>!!(t&&m)).map(t=>{const{two_letter_abbreviation:m,full_name_locale:l,available_regions:c}=t,h=Array.isArray(c)&&c.length>0;return{value:m,text:l,availableRegions:h?c:void 0}}).sort((t,m)=>t.text.localeCompare(m.text)),countriesWithRequiredRegion:o,optionalZipCountries:n}},E=`
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
`,b=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    id
    firstname
    lastname
    email
    job_title
  }
`,u=e=>{const a=e.has("Magento_Company::view_account"),r=e.has("Magento_Company::view_address"),o=e.has("Magento_Company::contacts"),n=e.has("Magento_Company::payment_information"),d=e.has("Magento_Company::shipping_information"),i=[],s=[];return a&&(i.push("...COMPANY_BASIC_INFO_FRAGMENT"),s.push(N)),r&&(i.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),s.push(E)),o&&(i.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),i.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }"),s.push(b),s.push(M)),n&&i.push("available_payment_methods { code title }"),d&&i.push("available_shipping_methods { code title }"),{fields:i,usedFragments:s}},I=e=>{const{fields:a,usedFragments:r}=u(e);return a.length===0?`
      query GET_COMPANY_DYNAMIC {
        company { __typename }
      }
    `:`${`
    query GET_COMPANY_DYNAMIC {
      company {
        ${a.join(`
        `)}
      }
    }
  `}
${r.join(`
`)}`},T=e=>{const{fields:a,usedFragments:r}=u(e);return a.length===0?`
      mutation UPDATE_COMPANY_DYNAMIC($input: CompanyUpdateInput!) {
        updateCompany(input: $input) {
          company { __typename }
        }
      }
    `:`${`
    mutation UPDATE_COMPANY_DYNAMIC($input: CompanyUpdateInput!) {
      updateCompany(input: $input) {
        company {
          ${a.join(`
          `)}
        }
      }
    }
  `}
${r.join(`
`)}`},w=async()=>await A().then(async({allowedIds:e,roleResponse:a})=>{var i,s,t;const r=I(e),o=await _(r,{method:"GET",cache:"no-cache"});if((i=o.errors)!=null&&i.length)return g(o.errors);const n=(s=o==null?void 0:o.data)==null?void 0:s.company;return n&&Object.keys(n).some(m=>m!=="__typename")?(o.data.customer=(t=a==null?void 0:a.data)==null?void 0:t.customer,p(o)):null}).catch(y),Y=async e=>await A().then(async({allowedIds:a,roleResponse:r})=>{var i,s;const o=T(a),n={};if(e.name!==void 0&&(n.company_name=e.name),e.email!==void 0&&(n.company_email=e.email),e.legalName!==void 0&&(n.legal_name=e.legalName),e.vatTaxId!==void 0&&(n.vat_tax_id=e.vatTaxId),e.resellerId!==void 0&&(n.reseller_id=e.resellerId),e.legalAddress!==void 0&&a.has("Magento_Company::edit_address")){let t;Array.isArray(e.legalAddress.street)?(t=[...e.legalAddress.street],e.legalAddress.street2&&t.push(e.legalAddress.street2)):t=[e.legalAddress.street,e.legalAddress.street2].filter(l=>typeof l=="string"&&l.trim().length>0),t=t.filter(l=>l&&typeof l=="string"&&l.trim().length>0);let m;if(e.legalAddress.region&&typeof e.legalAddress.region=="object"){const l=e.legalAddress.region;l.region===l.regionCode?m={region:l.region,region_code:l.regionCode,region_id:0}:m={region:l.region,region_code:l.regionCode}}else e.legalAddress.regionCode&&e.legalAddress.region!==e.legalAddress.regionCode?m={region:e.legalAddress.region||e.legalAddress.regionCode,region_code:e.legalAddress.regionCode}:e.legalAddress.region&&(m={region:e.legalAddress.region,region_code:e.legalAddress.region,region_id:0});n.legal_address={street:t,city:e.legalAddress.city,region:m,country_id:e.legalAddress.countryCode,postcode:e.legalAddress.postcode,telephone:e.legalAddress.telephone}}const d=await _(o,{method:"POST",variables:{input:n}});return(i=d.errors)!=null&&i.length?g(d.errors):(d.data.customer=(s=r==null?void 0:r.data)==null?void 0:s.customer,p(d))}).catch(y),S=`
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
`,F=async()=>{const e="_company_countries",a=sessionStorage.getItem(e);return a?JSON.parse(a):await _(S,{method:"GET"}).then(r=>{var n;if((n=r.errors)!=null&&n.length)return g(r.errors);const o=v(r);return sessionStorage.setItem(e,JSON.stringify(o)),o}).catch(y)};export{w as a,F as g,Y as u,O as v};
//# sourceMappingURL=getCountries.js.map
