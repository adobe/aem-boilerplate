/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a}from"./validateCompanyEmail.js";import{f as d,h as l}from"./network-error.js";import{h as g}from"./fetch-error.js";const u=`
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
`,p=e=>{var o,t,i;const r={};if(e.regionCode&&e.regionCode.trim())r.region_code=e.regionCode.trim(),e.regionId&&(r.region_id=typeof e.regionId=="string"?parseInt(e.regionId,10):e.regionId);else if(e.region&&typeof e.region=="string"&&e.region.includes(",")){const[n,c]=e.region.split(",");r.region_code=n.trim(),r.region_id=parseInt(c.trim(),10)}else if(e.region&&e.region.trim()){const n=e.region.trim();if(/^\d+$/.test(n))throw new Error("Region selection error: Missing region code. Please ensure regions are properly loaded.");r.region=n,r.region_code=n}if(!r.region_code)throw new Error("Region code is required. Please select a state/province or enter a region name.");return{company_name:e.companyName,company_email:e.companyEmail,legal_name:e.legalName,vat_tax_id:e.vatTaxId,reseller_id:e.resellerId,legal_address:{street:Array.isArray(e.street)?e.street.filter(n=>n&&n.trim()!==""):[e.street].filter(n=>n&&n.trim()!==""),city:e.city,region:r,postcode:e.postcode,country_id:e.countryCode,telephone:e.addressTelephone},company_admin:{email:e.adminEmail,firstname:((o=e.adminFirstname)==null?void 0:o.trim())||"",lastname:((t=e.adminLastname)==null?void 0:t.trim())||"",job_title:e.adminJobTitle,telephone:e.adminWorkTelephone,gender:e.adminGender?typeof e.adminGender=="string"?parseInt(e.adminGender,10):e.adminGender:void 0,custom_attributes:((i=e.adminCustomAttributes)==null?void 0:i.map(n=>({attribute_code:n.attribute_code,value:n.value})))||[]}}},T=async e=>{var r;try{const o=p(e),t=await d(u,{method:"POST",variables:{input:o}});return(r=t.errors)!=null&&r.length?{success:!1,errors:t.errors.map(n=>n.message)}:{success:!0,company:a(t)}}catch(o){return console.error("Failed to create company:",o),{success:!1,errors:["Failed to create company. Please try again."]}}},m=`
    query getStoreConfig {
        storeConfig {
            default_country
            store_code
        }
    }
`,_="US",s={defaultCountry:_,storeCode:""},E=async()=>await d(m,{method:"GET"}).then(e=>{var r;return(r=e.errors)!=null&&r.length?g(e.errors):y(e)}).catch(l),y=e=>{var t;if(!((t=e==null?void 0:e.data)!=null&&t.storeConfig))return s;const{default_country:r,store_code:o}=e.data.storeConfig;return{defaultCountry:r||s.defaultCountry,storeCode:o||s.storeCode}};export{_ as D,s as S,T as c,E as g};
//# sourceMappingURL=transform-store-config.js.map
