/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as m,h as _,c as g}from"./validateCompanyEmail.js";const E=`
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
`,A=(e=[])=>{const a=new Set,t=[...e];for(;t.length;){const i=t.pop();if(i&&(typeof i.id=="string"&&a.add(i.id),Array.isArray(i.children)&&i.children.length))for(const r of i.children)t.push(r)}return a},h=e=>(e==null?void 0:e.id)==="0"||typeof(e==null?void 0:e.id)=="number"&&(e==null?void 0:e.id)===0||(e==null?void 0:e.name)==="Company Administrator",M=e=>{const a=A((e==null?void 0:e.permissions)||[]),t=h(e);return{canViewAccount:t||a.has("Magento_Company::view_account"),canEditAccount:t||a.has("Magento_Company::edit_account"),canViewAddress:t||a.has("Magento_Company::view_address"),canEditAddress:t||a.has("Magento_Company::edit_address"),canViewContacts:t||a.has("Magento_Company::contacts"),canViewPaymentInformation:t||a.has("Magento_Company::payment_information"),canViewShippingInformation:t||a.has("Magento_Company::shipping_information")}},p=async()=>await m(E,{method:"GET",cache:"no-cache"}).then(e=>{var r,d,o;if((r=e.errors)!=null&&r.length)return _(e.errors);const a=(o=(d=e==null?void 0:e.data)==null?void 0:d.customer)==null?void 0:o.role,t=A((a==null?void 0:a.permissions)||[]);return h(a)&&["Magento_Company::view_account","Magento_Company::edit_account","Magento_Company::view_address","Magento_Company::edit_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information"].forEach(s=>t.add(s)),{allowedIds:t,roleResponse:e}}).catch(g),u=e=>{var s;if(!(e!=null&&e.data))throw new Error("Invalid response: missing data");const a="updateCompany"in e.data?(s=e.data.updateCompany)==null?void 0:s.company:e.data.company;if(!a)throw new Error("Invalid response: missing company data");const t="customer"in e.data?e.data.customer:void 0,i=a.legal_address?{street:Array.isArray(a.legal_address.street)?a.legal_address.street.filter(n=>n&&n.trim()!==""):[],city:(a.legal_address.city||"").trim(),region:a.legal_address.region?{region:(a.legal_address.region.region||"").trim(),regionCode:(a.legal_address.region.region_code||"").trim(),regionId:a.legal_address.region.region_id?Number(a.legal_address.region.region_id):0}:void 0,countryCode:(a.legal_address.country_code||"").toUpperCase().trim(),postcode:(a.legal_address.postcode||"").trim(),telephone:a.legal_address.telephone?a.legal_address.telephone.trim():void 0}:void 0,r=t==null?void 0:t.role,d=M(r),o={id:(a.id||"").toString(),name:(a.name||"").trim(),email:(a.email||"").trim().toLowerCase(),legalName:a.legal_name?a.legal_name.trim():void 0,vatTaxId:a.vat_tax_id?a.vat_tax_id.trim():void 0,resellerId:a.reseller_id?a.reseller_id.trim():void 0,legalAddress:i,companyAdmin:a.company_admin?{id:(a.company_admin.id||"").toString(),firstname:(a.company_admin.firstname||"").trim(),lastname:(a.company_admin.lastname||"").trim(),email:(a.company_admin.email||"").trim().toLowerCase(),jobTitle:a.company_admin.job_title?a.company_admin.job_title.trim():void 0}:void 0,salesRepresentative:a.sales_representative?{firstname:(a.sales_representative.firstname||"").trim(),lastname:(a.sales_representative.lastname||"").trim(),email:(a.sales_representative.email||"").trim().toLowerCase()}:void 0,availablePaymentMethods:Array.isArray(a.available_payment_methods)?a.available_payment_methods.filter(n=>n&&typeof n.code=="string"&&typeof n.title=="string").map(n=>({code:n.code.trim(),title:n.title.trim()})).filter(n=>n.code.length>0&&n.title.length>0):void 0,availableShippingMethods:Array.isArray(a.available_shipping_methods)?a.available_shipping_methods.filter(n=>n&&typeof n.code=="string"&&typeof n.title=="string").map(n=>({code:n.code.trim(),title:n.title.trim()})).filter(n=>n.code.length>0&&n.title.length>0):void 0,canEditAccount:d.canEditAccount,canEditAddress:d.canEditAddress,permissionsFlags:d,customerRole:r,customerStatus:t==null?void 0:t.status};if(d.canViewAccount){if(!o.id)throw new Error("Company ID is required");if(!o.name)throw new Error("Company name is required");if(!o.email)throw new Error("Company email is required")}return o},v=e=>{var o,s;if(!((s=(o=e==null?void 0:e.data)==null?void 0:o.countries)!=null&&s.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:a,storeConfig:t}=e.data,i=t==null?void 0:t.countries_with_required_region.split(","),r=t==null?void 0:t.optional_zip_countries.split(",");return{availableCountries:a.filter(({two_letter_abbreviation:n,full_name_locale:c})=>!!(n&&c)).map(n=>{const{two_letter_abbreviation:c,full_name_locale:l,available_regions:y}=n,f=Array.isArray(y)&&y.length>0;return{value:c,text:l,availableRegions:f?y:void 0}}).sort((n,c)=>n.text.localeCompare(c.text)),countriesWithRequiredRegion:i,optionalZipCountries:r}},N=`
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
`,I=`
  fragment COMPANY_BASIC_INFO_FRAGMENT on Company {
    id
    name
    email
    legal_name
    vat_tax_id
    reseller_id
  }
`,S=`
  fragment COMPANY_SALES_REPRESENTATIVE_FRAGMENT on CompanySalesRepresentative {
    firstname
    lastname
    email
  }
`,w=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    firstname
    lastname
    email
    job_title
  }
`,C=e=>{const a=e.has("Magento_Company::view_account"),t=e.has("Magento_Company::view_address"),i=e.has("Magento_Company::contacts"),r=e.has("Magento_Company::payment_information"),d=e.has("Magento_Company::shipping_information"),o=[],s=[];return a&&(o.push("...COMPANY_BASIC_INFO_FRAGMENT"),s.push(I)),t&&(o.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),s.push(N)),i&&(o.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),o.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }"),s.push(w),s.push(S)),r&&o.push("available_payment_methods { code title }"),d&&o.push("available_shipping_methods { code title }"),{fields:o,usedFragments:s}},T=e=>{const{fields:a,usedFragments:t}=C(e);return a.length===0?`
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
${t.join(`
`)}`},b=e=>{const{fields:a,usedFragments:t}=C(e);return a.length===0?`
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
${t.join(`
`)}`},G=async()=>await p().then(async({allowedIds:e,roleResponse:a})=>{var o,s,n;const t=T(e),i=await m(t,{method:"GET",cache:"no-cache"});if((o=i.errors)!=null&&o.length)return _(i.errors);const r=(s=i==null?void 0:i.data)==null?void 0:s.company;return r&&Object.keys(r).some(c=>c!=="__typename")?(i.data.customer=(n=a==null?void 0:a.data)==null?void 0:n.customer,u(i)):null}).catch(g),Y=async e=>await p().then(async({allowedIds:a,roleResponse:t})=>{var o,s;const i=b(a),r={};if(e.name!==void 0&&(r.company_name=e.name),e.email!==void 0&&(r.company_email=e.email),e.legalName!==void 0&&(r.legal_name=e.legalName),e.vatTaxId!==void 0&&(r.vat_tax_id=e.vatTaxId),e.resellerId!==void 0&&(r.reseller_id=e.resellerId),e.legalAddress!==void 0&&a.has("Magento_Company::edit_address")){let n;Array.isArray(e.legalAddress.street)?(n=[...e.legalAddress.street],e.legalAddress.street2&&n.push(e.legalAddress.street2)):n=[e.legalAddress.street,e.legalAddress.street2].filter(l=>typeof l=="string"&&l.trim().length>0),n=n.filter(l=>l&&typeof l=="string"&&l.trim().length>0);let c;if(e.legalAddress.region&&typeof e.legalAddress.region=="object"){const l=e.legalAddress.region;l.region===l.regionCode?c={region:l.region,region_code:l.regionCode,region_id:0}:c={region:l.region,region_code:l.regionCode}}else e.legalAddress.regionCode&&e.legalAddress.region!==e.legalAddress.regionCode?c={region:e.legalAddress.region||e.legalAddress.regionCode,region_code:e.legalAddress.regionCode}:e.legalAddress.region&&(c={region:e.legalAddress.region,region_code:e.legalAddress.region,region_id:0});r.legal_address={street:n,city:e.legalAddress.city,region:c,country_id:e.legalAddress.countryCode,postcode:e.legalAddress.postcode,telephone:e.legalAddress.telephone}}const d=await m(i,{method:"POST",variables:{input:r}});return(o=d.errors)!=null&&o.length?_(d.errors):(d.data.customer=(s=t==null?void 0:t.data)==null?void 0:s.customer,u(d))}).catch(g),O=`
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
`,F=async()=>{const e="_company_countries",a=sessionStorage.getItem(e);return a?JSON.parse(a):await m(O,{method:"GET"}).then(t=>{var r;if((r=t.errors)!=null&&r.length)return _(t.errors);const i=v(t);return sessionStorage.setItem(e,JSON.stringify(i)),i}).catch(g)};export{G as a,p as f,F as g,Y as u};
//# sourceMappingURL=getCountries.js.map
