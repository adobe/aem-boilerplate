/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as c,a as l}from"./fetch-error.js";import{f as h,i as M,a as A}from"./validateCompanyEmail.js";import{f as g}from"./fetch-graphql.js";const f=`
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
`,y=async()=>await g(f,{method:"GET",cache:"no-cache"}).then(e=>{var t,d,n;if((t=e.errors)!=null&&t.length)return c(e.errors);const a=(n=(d=e==null?void 0:e.data)==null?void 0:d.customer)==null?void 0:n.role,r=h((a==null?void 0:a.permissions)||[]);return M(a)&&["Magento_Company::view_account","Magento_Company::edit_account","Magento_Company::view_address","Magento_Company::edit_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information"].forEach(s=>r.add(s)),{allowedIds:r,roleResponse:e}}).catch(l),E=`
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
`,p=`
  fragment COMPANY_SALES_REPRESENTATIVE_FRAGMENT on CompanySalesRepresentative {
    firstname
    lastname
    email
  }
`,u=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    firstname
    lastname
    email
    job_title
  }
`,C=e=>{const a=e.has("Magento_Company::view_account"),r=e.has("Magento_Company::view_address"),o=e.has("Magento_Company::contacts"),t=e.has("Magento_Company::payment_information"),d=e.has("Magento_Company::shipping_information"),n=[],s=[];return a&&(n.push("...COMPANY_BASIC_INFO_FRAGMENT"),s.push(N)),r&&(n.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),s.push(E)),o&&(n.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),n.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }"),s.push(u),s.push(p)),t&&n.push("available_payment_methods { code title }"),d&&n.push("available_shipping_methods { code title }"),{fields:n,usedFragments:s}},T=e=>{const{fields:a,usedFragments:r}=C(e);return a.length===0?`
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
`)}`},I=e=>{const{fields:a,usedFragments:r}=C(e);return a.length===0?`
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
`)}`},Y=async()=>await y().then(async({allowedIds:e,roleResponse:a})=>{var n,s,_;const r=T(e),o=await g(r,{method:"GET",cache:"no-cache"});if((n=o.errors)!=null&&n.length)return c(o.errors);const t=(s=o==null?void 0:o.data)==null?void 0:s.company;return t&&Object.keys(t).some(m=>m!=="__typename")?(o.data.customer=(_=a==null?void 0:a.data)==null?void 0:_.customer,A(o)):null}).catch(l),G=async e=>await y().then(async({allowedIds:a,roleResponse:r})=>{var n,s;const o=I(a),t={};if(e.name!==void 0&&(t.company_name=e.name),e.email!==void 0&&(t.company_email=e.email),e.legalName!==void 0&&(t.legal_name=e.legalName),e.vatTaxId!==void 0&&(t.vat_tax_id=e.vatTaxId),e.resellerId!==void 0&&(t.reseller_id=e.resellerId),e.legalAddress!==void 0&&a.has("Magento_Company::edit_address")){let _;Array.isArray(e.legalAddress.street)?(_=[...e.legalAddress.street],e.legalAddress.street2&&_.push(e.legalAddress.street2)):_=[e.legalAddress.street,e.legalAddress.street2].filter(i=>typeof i=="string"&&i.trim().length>0),_=_.filter(i=>i&&typeof i=="string"&&i.trim().length>0);let m;if(e.legalAddress.region&&typeof e.legalAddress.region=="object"){const i=e.legalAddress.region;i.region===i.regionCode?m={region:i.region,region_code:i.regionCode,region_id:0}:m={region:i.region,region_code:i.regionCode}}else e.legalAddress.regionCode&&e.legalAddress.region!==e.legalAddress.regionCode?m={region:e.legalAddress.region||e.legalAddress.regionCode,region_code:e.legalAddress.regionCode}:e.legalAddress.region&&(m={region:e.legalAddress.region,region_code:e.legalAddress.region,region_id:0});t.legal_address={street:_,city:e.legalAddress.city,region:m,country_id:e.legalAddress.countryCode,postcode:e.legalAddress.postcode,telephone:e.legalAddress.telephone}}const d=await g(o,{method:"POST",variables:{input:t}});return(n=d.errors)!=null&&n.length?c(d.errors):(d.data.customer=(s=r==null?void 0:r.data)==null?void 0:s.customer,A(d))}).catch(l);export{y as f,Y as g,G as u};
//# sourceMappingURL=updateCompany.js.map
