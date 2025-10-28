/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as _}from"./fetchUserPermissions.js";import{f as m,h as A,a as c}from"./fetch-error.js";import{t as C}from"./validateCompanyEmail.js";const f=`
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
`,h=`
  fragment COMPANY_SALES_REPRESENTATIVE_FRAGMENT on CompanySalesRepresentative {
    firstname
    lastname
    email
  }
`,M=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    id
    firstname
    lastname
    email
    job_title
  }
`,y=e=>{const r=e.has("Magento_Company::view_account"),s=e.has("Magento_Company::view_address"),a=e.has("Magento_Company::contacts"),o=e.has("Magento_Company::payment_information"),l=e.has("Magento_Company::shipping_information"),t=[],d=[];return r&&(t.push("...COMPANY_BASIC_INFO_FRAGMENT"),d.push(N)),s&&(t.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),d.push(f)),a&&(t.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),t.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }"),d.push(M),d.push(h)),o&&t.push("available_payment_methods { code title }"),l&&t.push("available_shipping_methods { code title }"),{fields:t,usedFragments:d}},E=e=>{const{fields:r,usedFragments:s}=y(e);return r.length===0?`
      query GET_COMPANY_DYNAMIC {
        company { __typename }
      }
    `:`${`
    query GET_COMPANY_DYNAMIC {
      company {
        ${r.join(`
        `)}
      }
    }
  `}
${s.join(`
`)}`},p=e=>{const{fields:r,usedFragments:s}=y(e);return r.length===0?`
      mutation UPDATE_COMPANY_DYNAMIC($input: CompanyUpdateInput!) {
        updateCompany(input: $input) {
          company { __typename }
        }
      }
    `:`${`
    mutation UPDATE_COMPANY_DYNAMIC($input: CompanyUpdateInput!) {
      updateCompany(input: $input) {
        company {
          ${r.join(`
          `)}
        }
      }
    }
  `}
${s.join(`
`)}`};async function I(){return await _().then(async({allowedIds:e,roleResponse:r})=>{var t,d,i;const s=E(e),a=await m(s,{method:"GET",cache:"no-cache"});if((t=a.errors)!=null&&t.length)return A(a.errors);const o=(d=a==null?void 0:a.data)==null?void 0:d.company;return o&&Object.keys(o).some(g=>g!=="__typename")?(a!=null&&a.data&&((i=r==null?void 0:r.data)!=null&&i.customer)&&(a.data.customer=r.data.customer),C(a)):null}).catch(c)}const O=async e=>await _().then(async({allowedIds:r,roleResponse:s})=>{var t,d;const a=p(r),o={};if(e.name!==void 0&&(o.company_name=e.name),e.email!==void 0&&(o.company_email=e.email),e.legalName!==void 0&&(o.legal_name=e.legalName),e.vatTaxId!==void 0&&(o.vat_tax_id=e.vatTaxId),e.resellerId!==void 0&&(o.reseller_id=e.resellerId),e.legalAddress!==void 0&&r.has("Magento_Company::edit_address")){let i;Array.isArray(e.legalAddress.street)?(i=[...e.legalAddress.street],e.legalAddress.street2&&i.push(e.legalAddress.street2)):i=[e.legalAddress.street,e.legalAddress.street2].filter(n=>typeof n=="string"&&n.trim().length>0),i=i.filter(n=>n&&typeof n=="string"&&n.trim().length>0);let g;if(e.legalAddress.region&&typeof e.legalAddress.region=="object"){const n=e.legalAddress.region;n.region===n.regionCode?g={region:n.region,region_code:n.regionCode,region_id:0}:g={region:n.region,region_code:n.regionCode}}else e.legalAddress.regionCode&&e.legalAddress.region!==e.legalAddress.regionCode?g={region:e.legalAddress.region||e.legalAddress.regionCode,region_code:e.legalAddress.regionCode}:e.legalAddress.region&&(g={region:e.legalAddress.region,region_code:e.legalAddress.region,region_id:0});o.legal_address={street:i,city:e.legalAddress.city,region:g,country_id:e.legalAddress.countryCode,postcode:e.legalAddress.postcode,telephone:e.legalAddress.telephone}}const l=await m(a,{method:"POST",variables:{input:o}});return(t=l.errors)!=null&&t.length?A(l.errors):(l.data.customer=(d=s==null?void 0:s.data)==null?void 0:d.customer,C(l))}).catch(c);export{I as g,O as u};
//# sourceMappingURL=updateCompany.js.map
