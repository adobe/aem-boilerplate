/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as m,h as p}from"./network-error.js";import{h as u}from"./fetch-error.js";import{t as _}from"./validateCompanyEmail.js";const y=`
    query getStoreConfig {
        storeConfig {
            default_country
            store_code
        }
    }
`,C="US",d={defaultCountry:C,storeCode:""},G=async()=>await m(y,{method:"GET"}).then(e=>{var n;return(n=e.errors)!=null&&n.length?u(e.errors):h(e)}).catch(p),h=e=>{var t;if(!((t=e==null?void 0:e.data)!=null&&t.storeConfig))return d;const{default_country:n,store_code:r}=e.data.storeConfig;return{defaultCountry:n||d.defaultCountry,storeCode:r||d.storeCode}},T=`
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
`,E=e=>{var s,i,a,c,l;const n=(s=e.regionCode)==null?void 0:s.trim(),r=(i=e.region)==null?void 0:i.trim();let t;if(n)t={region_code:n,...e.regionId&&{region_id:typeof e.regionId=="string"?parseInt(e.regionId,10):e.regionId}};else if(r!=null&&r.includes(",")){const[o,g]=r.split(",");t={region_code:o.trim(),region_id:parseInt(g.trim(),10)}}else{if(r&&/^\d+$/.test(r))throw new Error("Region selection error: Missing region code. Please ensure regions are properly loaded.");r?t={region:r,region_code:r}:t={region:"",region_code:"",region_id:0}}return{company_name:e.companyName||"",company_email:e.companyEmail||"",legal_name:e.legalName,vat_tax_id:e.vatTaxId,reseller_id:e.resellerId,legal_address:{street:Array.isArray(e.street)?e.street.filter(o=>typeof o=="string"&&o.trim()!==""):[e.street].filter(o=>typeof o=="string"&&o.trim()!==""),city:e.city||"",region:t,postcode:e.postcode||"",country_id:e.countryCode||"",telephone:e.addressTelephone},company_admin:{email:e.adminEmail||"",firstname:((a=e.adminFirstname)==null?void 0:a.trim())||"",lastname:((c=e.adminLastname)==null?void 0:c.trim())||"",job_title:e.adminJobTitle,telephone:e.adminWorkTelephone,gender:e.adminGender?typeof e.adminGender=="string"?parseInt(e.adminGender,10):e.adminGender:void 0,custom_attributes:((l=e.adminCustomAttributes)==null?void 0:l.map(o=>({attribute_code:o.attribute_code,value:o.value})))||[]}}},S=async e=>{var n;try{const r=E(e),t=await m(T,{method:"POST",variables:{input:r}});return(n=t.errors)!=null&&n.length?{success:!1,errors:t.errors.map(i=>i.message)}:{success:!0,company:_(t)}}catch(r){return console.error("Failed to create company:",r),{success:!1,errors:["Failed to create company. Please try again."]}}};export{C as D,d as S,S as c,G as g};
//# sourceMappingURL=createCompany.js.map
