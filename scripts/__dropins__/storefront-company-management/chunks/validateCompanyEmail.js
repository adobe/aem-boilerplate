/*! Copyright 2025 Adobe
All Rights Reserved. */
import{b as p}from"./company-permissions.js";import{f as c,h as y}from"./network-error.js";import{h as u}from"./fetch-error.js";const E=i=>{var s;if(!(i!=null&&i.data))throw new Error("Invalid response: missing data");const e="updateCompany"in i.data?(s=i.data.updateCompany)==null?void 0:s.company:i.data.company;if(!e)throw new Error("Invalid response: missing company data");const t="customer"in i.data?i.data.customer:void 0,n=e.legal_address?{street:Array.isArray(e.legal_address.street)?e.legal_address.street.filter(a=>a&&a.trim()!==""):[],city:(e.legal_address.city||"").trim(),region:e.legal_address.region?{region:(e.legal_address.region.region||"").trim(),regionCode:(e.legal_address.region.region_code||"").trim(),regionId:e.legal_address.region.region_id?Number(e.legal_address.region.region_id):0}:void 0,countryCode:(e.legal_address.country_code||"").toUpperCase().trim(),postcode:(e.legal_address.postcode||"").trim(),telephone:e.legal_address.telephone?e.legal_address.telephone.trim():void 0}:void 0,r=t==null?void 0:t.role,l=p(r),o={id:(e.id||"").toString(),name:(e.name||"").trim(),email:(e.email||"").trim().toLowerCase(),legalName:e.legal_name?e.legal_name.trim():void 0,vatTaxId:e.vat_tax_id?e.vat_tax_id.trim():void 0,resellerId:e.reseller_id?e.reseller_id.trim():void 0,legalAddress:n,companyAdmin:e.company_admin?{id:(e.company_admin.id||"").toString(),firstname:(e.company_admin.firstname||"").trim(),lastname:(e.company_admin.lastname||"").trim(),email:(e.company_admin.email||"").trim().toLowerCase(),jobTitle:e.company_admin.job_title?e.company_admin.job_title.trim():void 0}:void 0,salesRepresentative:e.sales_representative?{firstname:(e.sales_representative.firstname||"").trim(),lastname:(e.sales_representative.lastname||"").trim(),email:(e.sales_representative.email||"").trim().toLowerCase()}:void 0,availablePaymentMethods:Array.isArray(e.available_payment_methods)?e.available_payment_methods.filter(a=>a&&typeof a.code=="string"&&typeof a.title=="string").map(a=>({code:a.code.trim(),title:a.title.trim()})).filter(a=>a.code.length>0&&a.title.length>0):void 0,availableShippingMethods:Array.isArray(e.available_shipping_methods)?e.available_shipping_methods.filter(a=>a&&typeof a.code=="string"&&typeof a.title=="string").map(a=>({code:a.code.trim(),title:a.title.trim()})).filter(a=>a.code.length>0&&a.title.length>0):void 0,canEditAccount:l.canEditAccount,canEditAddress:l.canEditAddress,permissionsFlags:l,customerRole:r,customerStatus:t==null?void 0:t.status};if(l.canViewAccount){if(!o.id)throw new Error("Company ID is required");if(!o.name)throw new Error("Company name is required");if(!o.email)throw new Error("Company email is required")}return o},A=i=>{var n,r,l,o,s;if(!((r=(n=i==null?void 0:i.data)==null?void 0:n.createCompany)!=null&&r.company))throw new Error("Invalid createCompany response: missing company data");const e=i.data.createCompany.company;if(!e.legal_address)throw new Error("Legal address is required for company registration");if(!e.company_admin)throw new Error("Company admin is required for company registration");return{id:e.id,name:e.name,email:e.email,legalName:e.legal_name,vatTaxId:e.vat_tax_id,resellerId:e.reseller_id,legalAddress:{street:e.legal_address.street||[],city:e.legal_address.city||"",region:{regionCode:((l=e.legal_address.region)==null?void 0:l.region_code)||"",region:(o=e.legal_address.region)==null?void 0:o.region,regionId:(s=e.legal_address.region)==null?void 0:s.region_id},countryCode:e.legal_address.country_code||"",postcode:e.legal_address.postcode||"",telephone:e.legal_address.telephone},companyAdmin:{id:e.company_admin.id,firstname:e.company_admin.firstname,lastname:e.company_admin.lastname,email:e.company_admin.email,jobTitle:e.company_admin.job_title,telephone:e.company_admin.telephone}}},v=i=>{var o,s;if(!((s=(o=i==null?void 0:i.data)==null?void 0:o.countries)!=null&&s.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:e,storeConfig:t}=i.data,n=t==null?void 0:t.countries_with_required_region.split(","),r=t==null?void 0:t.optional_zip_countries.split(",");return{availableCountries:e.filter(({two_letter_abbreviation:a,full_name_locale:d})=>!!(a&&d)).map(a=>{const{two_letter_abbreviation:d,full_name_locale:_,available_regions:m}=a,g=Array.isArray(m)&&m.length>0;return{value:d,text:_,availableRegions:g?m:void 0}}).sort((a,d)=>a.text.localeCompare(d.text)),countriesWithRequiredRegion:n,optionalZipCountries:r}},h=`
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
`,I=async()=>{const i="_company_countries",e=sessionStorage.getItem(i);return e?JSON.parse(e):await c(h,{method:"GET"}).then(t=>{var r;if((r=t.errors)!=null&&r.length)return u(t.errors);const n=v(t);return sessionStorage.setItem(i,JSON.stringify(n)),n}).catch(y)},f=`
  query validateCompanyEmail($email: String!) {
    isCompanyEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,R=async i=>{try{const e=await c(f,{variables:{email:i}});return e.errors?{isValid:!1,error:"Unable to validate email"}:{isValid:e.data.isCompanyEmailAvailable.is_email_available,error:e.data.isCompanyEmailAvailable.is_email_available?void 0:"This email is already used by another company"}}catch{return{isValid:!1,error:"Unable to validate email"}}};export{E as a,I as g,A as t,R as v};
//# sourceMappingURL=validateCompanyEmail.js.map
