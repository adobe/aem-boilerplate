/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as M}from"@dropins/tools/event-bus.js";import{FetchGraphQL as N}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:j,setFetchGraphQlHeader:x,removeFetchGraphQlHeader:U,setFetchGraphQlHeaders:Q,fetchGraphQl:f,getConfig:$}=new N().getMethods(),b=`
  query validateCompanyEmail($email: String!) {
    isCompanyEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,k=async e=>{try{const a=await f(b,{variables:{email:e}});return a.errors?{isValid:!1,error:"Unable to validate email"}:{isValid:a.data.isCompanyEmailAvailable.is_email_available,error:a.data.isCompanyEmailAvailable.is_email_available?void 0:"This email is already used by another company"}}catch{return{isValid:!1,error:"Unable to validate email"}}},u=e=>{var c;if(!(e!=null&&e.data))throw new Error("Invalid response: missing data");const a="updateCompany"in e.data?(c=e.data.updateCompany)==null?void 0:c.company:e.data.company;if(!a)throw new Error("Invalid response: missing company data");const t="customer"in e.data?e.data.customer:void 0,o=a.legal_address?{street:Array.isArray(a.legal_address.street)?a.legal_address.street.filter(i=>i&&i.trim()!==""):[],city:(a.legal_address.city||"").trim(),region:a.legal_address.region?{region:(a.legal_address.region.region||"").trim(),regionCode:(a.legal_address.region.region_code||"").trim(),regionId:a.legal_address.region.region_id?Number(a.legal_address.region.region_id):0}:void 0,countryCode:(a.legal_address.country_code||"").toUpperCase().trim(),postcode:(a.legal_address.postcode||"").trim(),telephone:a.legal_address.telephone?a.legal_address.telephone.trim():void 0}:void 0,n=t==null?void 0:t.role,s=((i=[])=>{const y=new Set,A=[...i];for(;A.length;){const _=A.pop();if(_&&(typeof _.id=="string"&&y.add(_.id),Array.isArray(_.children)&&_.children.length))for(const p of _.children)A.push(p)}return y})((n==null?void 0:n.permissions)||[]),l=(n==null?void 0:n.id)==="0"||typeof(n==null?void 0:n.id)=="number"&&n.id===0||(n==null?void 0:n.name)==="Company Administrator",r=l||s.has("Magento_Company::edit_account")||s.has("Magento_Company::edit_address"),d={canViewAccount:l||s.has("Magento_Company::view_account"),canEditAccount:l||s.has("Magento_Company::edit_account"),canViewAddress:l||s.has("Magento_Company::view_address"),canEditAddress:l||s.has("Magento_Company::edit_address"),canViewContacts:l||s.has("Magento_Company::contacts"),canViewPaymentInformation:l||s.has("Magento_Company::payment_information"),canViewShippingInformation:l||s.has("Magento_Company::shipping_information")},m={id:(a.id||"").toString(),name:(a.name||"").trim(),email:(a.email||"").trim().toLowerCase(),legal_name:a.legal_name?a.legal_name.trim():void 0,vat_tax_id:a.vat_tax_id?a.vat_tax_id.trim():void 0,reseller_id:a.reseller_id?a.reseller_id.trim():void 0,legal_address:o,company_admin:a.company_admin?{id:(a.company_admin.id||"").toString(),firstname:(a.company_admin.firstname||"").trim(),lastname:(a.company_admin.lastname||"").trim(),email:(a.company_admin.email||"").trim().toLowerCase(),job_title:a.company_admin.job_title?a.company_admin.job_title.trim():void 0}:void 0,sales_representative:a.sales_representative?{firstname:(a.sales_representative.firstname||"").trim(),lastname:(a.sales_representative.lastname||"").trim(),email:(a.sales_representative.email||"").trim().toLowerCase()}:void 0,available_payment_methods:Array.isArray(a.available_payment_methods)?a.available_payment_methods.filter(i=>i&&typeof i.code=="string"&&typeof i.title=="string").map(i=>({code:i.code.trim(),title:i.title.trim()})).filter(i=>i.code.length>0&&i.title.length>0):void 0,available_shipping_methods:Array.isArray(a.available_shipping_methods)?a.available_shipping_methods.filter(i=>i&&typeof i.code=="string"&&typeof i.title=="string").map(i=>({code:i.code.trim(),title:i.title.trim()})).filter(i=>i.code.length>0&&i.title.length>0):void 0,canEdit:r,permissionsFlags:d,customerRole:n,customerStatus:t==null?void 0:t.status};if(d.canViewAccount){if(!m.id)throw new Error("Company ID is required");if(!m.name)throw new Error("Company name is required");if(!m.email)throw new Error("Company email is required")}return m},w=e=>{var s,l;if(!((l=(s=e==null?void 0:e.data)==null?void 0:s.countries)!=null&&l.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:a,storeConfig:t}=e.data,o=t==null?void 0:t.countries_with_required_region.split(","),n=t==null?void 0:t.optional_zip_countries.split(",");return{availableCountries:a.filter(({two_letter_abbreviation:r,full_name_locale:d})=>!!(r&&d)).map(r=>{const{two_letter_abbreviation:d,full_name_locale:m,available_regions:c}=r,i=Array.isArray(c)&&c.length>0;return{value:d,text:m,availableRegions:i?c:void 0}}).sort((r,d)=>r.text.localeCompare(d.text)),countriesWithRequiredRegion:o,optionalZipCountries:n}},S=`
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
`,I=`
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
`,O=`
  fragment COMPANY_BASIC_INFO_FRAGMENT on Company {
    id
    name
    email
    legal_name
    vat_tax_id
    reseller_id
  }
`,T=`
  fragment COMPANY_SALES_REPRESENTATIVE_FRAGMENT on CompanySalesRepresentative {
    firstname
    lastname
    email
  }
`,P=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    id
    firstname
    lastname
    email
    job_title
  }
`,G=(e=[])=>{const a=new Set,t=[...e];for(;t.length;){const o=t.pop();if(o&&(typeof o.id=="string"&&a.add(o.id),Array.isArray(o.children)&&o.children.length))for(const n of o.children)t.push(n)}return a},R=e=>{const a=e.has("Magento_Company::view_account"),t=e.has("Magento_Company::view_address"),o=e.has("Magento_Company::contacts"),n=e.has("Magento_Company::payment_information"),g=e.has("Magento_Company::shipping_information"),s=[...a?["...COMPANY_BASIC_INFO_FRAGMENT"]:[]];if(t&&s.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),o&&(s.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),s.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }")),n&&s.push("available_payment_methods { code title }"),g&&s.push("available_shipping_methods { code title }"),s.length===0)return`
      query GET_COMPANY_DYNAMIC {
        company { __typename }
      }
    `;const l=`
    query GET_COMPANY_DYNAMIC {
      company {
        ${s.join(`
        `)}
      }
    }
  `,r=a?[O]:[];return s.some(d=>d.startsWith("legal_address"))&&r.push(I),s.some(d=>d.startsWith("company_admin"))&&r.push(P),s.some(d=>d.startsWith("sales_representative"))&&r.push(T),`${l}
${r.join(`
`)}`};let h=null,C=null;const F=()=>{C=null},Y=async(e=!0)=>e&&C?C:h||(h=(async()=>{var a,t,o,n,g,s;try{const l=await f(S,{method:"GET",cache:"no-cache"});if((a=l.errors)!=null&&a.length)return null;const r=(o=(t=l==null?void 0:l.data)==null?void 0:t.customer)==null?void 0:o.role,d=G((r==null?void 0:r.permissions)||[]);((r==null?void 0:r.id)==="0"||typeof(r==null?void 0:r.id)=="number"&&(r==null?void 0:r.id)===0||(r==null?void 0:r.name)==="Company Administrator")&&["Magento_Company::view_account","Magento_Company::view_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information"].forEach(p=>d.add(p));const c=R(d),i=await f(c,{method:"GET",cache:"no-cache"});if((n=i.errors)!=null&&n.length)return null;const y=(g=i==null?void 0:i.data)==null?void 0:g.company;if(!(y&&Object.keys(y).some(p=>p!=="__typename")))return null;i.data.customer=(s=l==null?void 0:l.data)==null?void 0:s.customer;const _=u(i);return C=_,_}catch{return null}finally{h=null}})(),h),B=Object.freeze(Object.defineProperty({__proto__:null,getCompany:Y,resetCompanyCache:F},Symbol.toStringTag,{value:"Module"})),v=e=>{throw e instanceof DOMException&&e.name==="AbortError"||M.emit("error",{source:"company",type:"network",error:e}),e},E=e=>{const a=e.map(t=>t.message).join(" ");throw Error(a)},L=`
  mutation UPDATE_COMPANY($input: CompanyUpdateInput!) {
    updateCompany(input: $input) {
      company { __typename }
    }
  }
`,W=async e=>{const a={};if(e.name!==void 0&&(a.company_name=e.name),e.email!==void 0&&(a.company_email=e.email),e.legal_name!==void 0&&(a.legal_name=e.legal_name),e.vat_tax_id!==void 0&&(a.vat_tax_id=e.vat_tax_id),e.reseller_id!==void 0&&(a.reseller_id=e.reseller_id),e.legal_address!==void 0){let t;Array.isArray(e.legal_address.street)?(t=[...e.legal_address.street],e.legal_address.street_2&&t.push(e.legal_address.street_2)):t=[e.legal_address.street,e.legal_address.street_2].filter(Boolean),t=t.filter(n=>n&&typeof n=="string"&&n.trim().length>0);let o;if(e.legal_address.region&&typeof e.legal_address.region=="object"){const n=e.legal_address.region;n.region===n.region_code?o={region:n.region,region_code:n.region_code,region_id:0}:o={region:n.region,region_code:n.region_code}}else e.legal_address.region_code&&e.legal_address.region!==e.legal_address.region_code?o={region:e.legal_address.region||e.legal_address.region_code,region_code:e.legal_address.region_code}:e.legal_address.region&&(o={region:e.legal_address.region,region_code:e.legal_address.region,region_id:0});a.legal_address={street:t,city:e.legal_address.city,region:o,country_id:e.legal_address.country_code,postcode:e.legal_address.postcode,telephone:e.legal_address.telephone}}return await f(L,{method:"POST",variables:{input:a}}).then(t=>{var o;return(o=t.errors)!=null&&o.length?E(t.errors):u(t)}).catch(v)},D=`
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
`,z=async()=>{const e="_company_countries",a=sessionStorage.getItem(e);return a?JSON.parse(a):await f(D,{method:"GET",cache:"no-cache"}).then(t=>{var n;if((n=t.errors)!=null&&n.length)return E(t.errors);const o=w(t);return sessionStorage.setItem(e,JSON.stringify(o)),o}).catch(v)};export{Y as a,x as b,Q as c,$ as d,F as e,f,z as g,B as h,U as r,j as s,W as u,k as v};
//# sourceMappingURL=getCountries.js.map
