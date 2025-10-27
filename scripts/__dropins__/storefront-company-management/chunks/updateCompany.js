/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as _,a as m}from"./fetch-error.js";import{f as A}from"./fetchUserPermissions.js";import{t as c}from"./validateCompanyEmail.js";import{f as y}from"./fetch-graphql.js";const f=`
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
    firstname
    lastname
    email
    job_title
  }
`,C=e=>{const a=e.has("Magento_Company::view_account"),s=e.has("Magento_Company::view_address"),r=e.has("Magento_Company::contacts"),t=e.has("Magento_Company::payment_information"),l=e.has("Magento_Company::shipping_information"),o=[],d=[];return a&&(o.push("...COMPANY_BASIC_INFO_FRAGMENT"),d.push(N)),s&&(o.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),d.push(f)),r&&(o.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),o.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }"),d.push(M),d.push(h)),t&&o.push("available_payment_methods { code title }"),l&&o.push("available_shipping_methods { code title }"),{fields:o,usedFragments:d}},p=e=>{const{fields:a,usedFragments:s}=C(e);return a.length===0?`
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
${s.join(`
`)}`},E=e=>{const{fields:a,usedFragments:s}=C(e);return a.length===0?`
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
${s.join(`
`)}`},O=async()=>await A().then(async({allowedIds:e,roleResponse:a})=>{var o,d,i;const s=p(e),r=await y(s,{method:"GET",cache:"no-cache"});if((o=r.errors)!=null&&o.length)return _(r.errors);const t=(d=r==null?void 0:r.data)==null?void 0:d.company;return t&&Object.keys(t).some(g=>g!=="__typename")?(r.data.customer=(i=a==null?void 0:a.data)==null?void 0:i.customer,c(r)):null}).catch(m),Y=async e=>await A().then(async({allowedIds:a,roleResponse:s})=>{var o,d;const r=E(a),t={};if(e.name!==void 0&&(t.company_name=e.name),e.email!==void 0&&(t.company_email=e.email),e.legalName!==void 0&&(t.legal_name=e.legalName),e.vatTaxId!==void 0&&(t.vat_tax_id=e.vatTaxId),e.resellerId!==void 0&&(t.reseller_id=e.resellerId),e.legalAddress!==void 0&&a.has("Magento_Company::edit_address")){let i;Array.isArray(e.legalAddress.street)?(i=[...e.legalAddress.street],e.legalAddress.street2&&i.push(e.legalAddress.street2)):i=[e.legalAddress.street,e.legalAddress.street2].filter(n=>typeof n=="string"&&n.trim().length>0),i=i.filter(n=>n&&typeof n=="string"&&n.trim().length>0);let g;if(e.legalAddress.region&&typeof e.legalAddress.region=="object"){const n=e.legalAddress.region;n.region===n.regionCode?g={region:n.region,region_code:n.regionCode,region_id:0}:g={region:n.region,region_code:n.regionCode}}else e.legalAddress.regionCode&&e.legalAddress.region!==e.legalAddress.regionCode?g={region:e.legalAddress.region||e.legalAddress.regionCode,region_code:e.legalAddress.regionCode}:e.legalAddress.region&&(g={region:e.legalAddress.region,region_code:e.legalAddress.region,region_id:0});t.legal_address={street:i,city:e.legalAddress.city,region:g,country_id:e.legalAddress.countryCode,postcode:e.legalAddress.postcode,telephone:e.legalAddress.telephone}}const l=await y(r,{method:"POST",variables:{input:t}});return(o=l.errors)!=null&&o.length?_(l.errors):(l.data.customer=(d=s==null?void 0:s.data)==null?void 0:d.customer,c(l))}).catch(m);export{O as g,Y as u};
//# sourceMappingURL=updateCompany.js.map
