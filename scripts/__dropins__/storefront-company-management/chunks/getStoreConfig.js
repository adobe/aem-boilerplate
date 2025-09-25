/*! Copyright 2025 Adobe
All Rights Reserved. */
import{t as c,h as a,a as l}from"./getCountries.js";import{f as s}from"./fetch-graphql.js";const g=`
  mutation CreateCompany($input: CompanyCreateInput!) {
    createCompany(input: $input) {
      company {
        id
        name
        email
        legal_name
        vat_tax_id
        reseller_id
        legal_address {
          street
          city
          region {
            region_code
            region
            region_id
          }
          postcode
          country_code
          telephone
        }
        company_admin {
          id
          firstname
          lastname
          email
          job_title
          telephone
        }
      }
    }
  }
`,u=e=>{var t;const n={};if(e.regionCode&&e.regionCode.trim())n.region_code=e.regionCode.trim(),e.regionId&&(n.region_id=typeof e.regionId=="string"?parseInt(e.regionId,10):e.regionId);else if(e.region&&typeof e.region=="string"&&e.region.includes(",")){const[r,i]=e.region.split(",");n.region_code=r.trim(),n.region_id=parseInt(i.trim(),10)}else if(e.region&&e.region.trim()){const r=e.region.trim();if(/^\d+$/.test(r))throw new Error("Region selection error: Missing region code. Please ensure regions are properly loaded.");n.region=r,n.region_code=r}if(!n.region_code)throw new Error("Region code is required. Please select a state/province or enter a region name.");return{company_name:e.companyName,company_email:e.companyEmail,legal_name:e.legalName,vat_tax_id:e.vatTaxId,reseller_id:e.resellerId,legal_address:{street:Array.isArray(e.street)?e.street.filter(r=>r&&r.trim()!==""):[e.street].filter(r=>r&&r.trim()!==""),city:e.city,region:n,postcode:e.postcode,country_id:e.countryCode,telephone:e.addressTelephone},company_admin:{email:e.adminEmail,firstname:e.adminFirstname,lastname:e.adminLastname,job_title:e.adminJobTitle,telephone:e.adminWorkTelephone,gender:e.adminGender?typeof e.adminGender=="string"?parseInt(e.adminGender,10):e.adminGender:void 0,custom_attributes:((t=e.adminCustomAttributes)==null?void 0:t.map(r=>({attribute_code:r.attribute_code,value:r.value})))||[]}}},h=async e=>{var n;try{const t=u(e),r=await s(g,{method:"POST",variables:{input:t}});return(n=r.errors)!=null&&n.length?{success:!1,errors:r.errors.map(d=>d.message)}:{success:!0,company:c(r)}}catch(t){return console.error("Failed to create company:",t),{success:!1,errors:["Failed to create company. Please try again."]}}},p=`
    query getStoreConfig {
        storeConfig {
            default_country
            store_code
        }
    }
`,_=e=>{var r;if(!((r=e==null?void 0:e.data)!=null&&r.storeConfig))return o;const{default_country:n,store_code:t}=e.data.storeConfig;return{defaultCountry:n||o.defaultCountry,storeCode:t||o.storeCode}},m="US",o={defaultCountry:m,storeCode:""},I=async()=>await s(p,{method:"GET"}).then(e=>{var n;return(n=e.errors)!=null&&n.length?a(e.errors):_(e)}).catch(l);export{m as D,o as S,h as c,I as g};
//# sourceMappingURL=getStoreConfig.js.map
