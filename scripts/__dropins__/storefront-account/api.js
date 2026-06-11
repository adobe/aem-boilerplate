/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as Z}from"@dropins/tools/event-bus.js";import{Initializer as X,merge as Q}from"@dropins/tools/lib.js";import{FetchGraphQL as tt}from"@dropins/tools/fetch-graphql.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as rt,CUSTOMER_ORDER_FRAGMENT as at,ADDRESS_FRAGMENT as ot,ORDER_SUMMARY_FRAGMENT as nt}from"./fragments.js";const Y=new X({init:async t=>{const r={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};Y.config.setConfig({...r,...t})},listeners:()=>[]}),y=Y.config,{setEndpoint:ar,setFetchGraphQlHeader:or,removeFetchGraphQlHeader:nr,setFetchGraphQlHeaders:ir,fetchGraphQl:d,getConfig:ur}=new tt().getMethods(),it=`
  query GET_ATTRIBUTES_FORM($formCode: String!) {
    attributesForm(formCode: $formCode) {
      items {
        code
        default_value
        entity_type
        frontend_class
        frontend_input
        is_required
        is_unique
        label
        options {
          is_default
          label
          value
        }
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
      }
      errors {
        type
        message
      }
    }
  }
`,ut=`
  query GET_ATTRIBUTES_FORM_SHORT {
    attributesForm(formCode: "customer_register_address") {
      items {
        frontend_input
        label
        code
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
        }
      }
    }
  }
`,g=t=>{throw t instanceof DOMException&&t.name==="AbortError"||Z.emit("error",{source:"auth",type:"network",error:t}),t},h=t=>{const r=t.map(a=>a.message).join(" ");throw Error(r)},B=t=>t.replace(/_([a-z])/g,(r,a)=>a.toUpperCase()),ct=t=>t.replace(/([A-Z])/g,r=>`_${r.toLowerCase()}`),O=(t,r,a)=>{const o=["string","boolean","number"],n=r==="camelCase"?B:ct;return Array.isArray(t)?t.map(u=>o.includes(typeof u)||u===null?u:typeof u=="object"?O(u,r,a):u):t!==null&&typeof t=="object"?Object.entries(t).reduce((u,[c,_])=>{const i=a&&a[c]?a[c]:n(c);return u[i]=o.includes(typeof _)||_===null?_:O(_,r,a),u},{}):t},et=t=>{let r=[];for(const a of t)if(!(a.frontend_input!=="MULTILINE"||a.multiline_count<2))for(let o=2;o<=a.multiline_count;o++){const n={...a,is_required:!1,name:`${a.code}_multiline_${o}`,code:`${a.code}_multiline_${o}`,id:`${a.code}_multiline_${o}`};r.push(n)}return r},lt=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return B(t)}},_t=t=>{var r;return t!=null&&t.options?(r=t==null?void 0:t.options)==null?void 0:r.map(a=>({isDefault:(a==null?void 0:a.is_default)??!1,text:(a==null?void 0:a.label)??"",value:(a==null?void 0:a.value)??""})):[]},st=t=>{var u,c,_;const r=((c=(u=t==null?void 0:t.data)==null?void 0:u.attributesForm)==null?void 0:c.items)||[];if(!r.length)return[];const a=(_=r.filter(i=>{var s;return!((s=i.frontend_input)!=null&&s.includes("HIDDEN"))}))==null?void 0:_.map(({code:i,...s})=>{const f=i!=="country_id"?i:"country_code";return{...s,name:f,id:f,code:f}}),o=et(a);return a.concat(o).map(i=>({code:i==null?void 0:i.code,name:i==null?void 0:i.name,id:i==null?void 0:i.id,label:(i==null?void 0:i.label)??"",entityType:i==null?void 0:i.entity_type,className:(i==null?void 0:i.frontend_class)??"",defaultValue:(i==null?void 0:i.default_value)??"",fieldType:i==null?void 0:i.frontend_input,multilineCount:(i==null?void 0:i.multiline_count)??0,orderNumber:Number(i==null?void 0:i.sort_order)||0,isHidden:!1,isUnique:(i==null?void 0:i.is_unique)??!1,required:(i==null?void 0:i.is_required)??!1,validateRules:(i==null?void 0:i.validate_rules)??[],options:_t(i),customUpperCode:lt(i==null?void 0:i.code)})).sort((i,s)=>Number(i.orderNumber)-Number(s.orderNumber))},ft=t=>{const r={};for(const a in t){const o=t[a];!Array.isArray(o)||o.length===0||(a==="custom_attributesV2"?o.forEach(n=>{typeof n=="object"&&"value"in n&&(r[n==null?void 0:n.code]=n==null?void 0:n.value)}):o.length>1?o.forEach((n,u)=>{u===0?r[a]=n:r[`${a}_multiline_${u+1}`]=n}):r[a]=o[0])}return r},dt=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",middlename:(t==null?void 0:t.middlename)??""}),gt=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??"",uid:(t==null?void 0:t.uid)??""}),ht=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),L=t=>{var a,o,n;return O({...dt(t),...gt(t),...ht(t),city:(t==null?void 0:t.city)??"",region:{region:((a=t==null?void 0:t.region)==null?void 0:a.region)??"",region_code:((o=t==null?void 0:t.region)==null?void 0:o.region_code)??"",region_id:((n=t==null?void 0:t.region)==null?void 0:n.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...ft(t)},"camelCase",{})},Et=t=>{var o,n;const r=((n=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:n.addresses)||[];return r.length?r.map(L).sort((u,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(u.defaultBilling)||Number(u.defaultShipping))):[]},St=t=>{var o,n,u,c,_,i,s,f,E,S,T,C,N,I,M,p,U,w,$,v,x,D,G,P,F,R,k;const r=(u=(n=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:n.custom_attributes)==null?void 0:u.filter(A=>A).reduce((A,m)=>{var e;const q=B(m.code);return(e=m.selected_options)!=null&&e.length?A[q]=m.selected_options[0].value??"":A[q]=m.value??"",A},{}),a={email:((_=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:_.email)||"",firstName:((s=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:s.firstname)||"",lastName:((E=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:E.lastname)||"",middleName:((T=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:T.middlename)||"",gender:((N=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:N.gender)||"1",dateOfBirth:((M=(I=t==null?void 0:t.data)==null?void 0:I.customer)==null?void 0:M.date_of_birth)||"",prefix:((U=(p=t==null?void 0:t.data)==null?void 0:p.customer)==null?void 0:U.prefix)||"",suffix:(($=(w=t==null?void 0:t.data)==null?void 0:w.customer)==null?void 0:$.suffix)||"",createdAt:((x=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:x.created_at)||"",allowRemoteShoppingAssistance:(G=(D=t==null?void 0:t.data)==null?void 0:D.customer)==null?void 0:G.allow_remote_shopping_assistance,...r};return Q(a,(k=(R=(F=(P=y==null?void 0:y.getConfig())==null?void 0:P.models)==null?void 0:F.CustomerDataModelShort)==null?void 0:R.transformer)==null?void 0:k.call(R,t.data))},mt=t=>{var c,_;if(!((_=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&_.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:r,storeConfig:a}=t.data,o=a==null?void 0:a.countries_with_required_region.split(","),n=a==null?void 0:a.optional_zip_countries.split(",");return{availableCountries:r.filter(({two_letter_abbreviation:i,full_name_locale:s})=>!!(i&&s)).map(i=>{const{two_letter_abbreviation:s,full_name_locale:f,available_regions:E}=i,S=Array.isArray(E)&&E.length>0;return{value:s,text:f,availableRegions:S?E:void 0}}).sort((i,s)=>i.text.localeCompare(s.text)),countriesWithRequiredRegion:o,optionalZipCountries:n}},Tt=t=>{var o,n;const r=(n=(o=t==null?void 0:t.data)==null?void 0:o.country)==null?void 0:n.available_regions;return r?r.filter(u=>{if(!u)return!1;const{id:c,code:_,name:i}=u;return!!(c&&_&&i)}).map(u=>{const{id:c}=u;return{id:c,text:u.name,value:`${u.code},${u.id}`}}):[]},Ct=(t,r="en-US",a={})=>{const o={day:"2-digit",month:"2-digit",year:"numeric"},n=/^\d{4}-\d{2}-\d{2}$/.test(t.trim()),u={...o,...n?{timeZone:"UTC"}:{},...a},c=new Date(t.trim());return isNaN(c.getTime())?"Invalid Date":new Intl.DateTimeFormat(r,u).format(c)},At=(t,r="en-US",a={})=>{const n={...{hour:"2-digit",minute:"2-digit"},...a},u=new Date(t);return isNaN(u.getTime())?"Invalid Time":new Intl.DateTimeFormat(r,n).format(u)},b={value:0,currency:"USD"},bt=t=>{var r,a,o,n,u,c,_,i,s,f;return{subtotal:((r=t==null?void 0:t.total)==null?void 0:r.subtotal)??b,grandTotal:((a=t==null?void 0:t.total)==null?void 0:a.grand_total)??b,grandTotalExclTax:((o=t==null?void 0:t.total)==null?void 0:o.grand_total_excl_tax)??b,totalGiftcard:((n=t==null?void 0:t.total)==null?void 0:n.total_giftcard)??b,subtotalExclTax:((u=t==null?void 0:t.total)==null?void 0:u.subtotal_excl_tax)??b,subtotalInclTax:((c=t==null?void 0:t.total)==null?void 0:c.subtotal_incl_tax)??b,taxes:((_=t==null?void 0:t.total)==null?void 0:_.taxes)??[],totalTax:((i=t==null?void 0:t.total)==null?void 0:i.total_tax)??b,totalShipping:((s=t==null?void 0:t.total)==null?void 0:s.total_shipping)??b,discounts:((f=t==null?void 0:t.total)==null?void 0:f.discounts)??[]}},Rt=t=>{var n,u,c,_,i,s,f,E,S,T,C,N,I,M,p,U,w,$,v,x,D,G,P,F,R,k,A,m,q;if(!((u=(n=t.data)==null?void 0:n.customer)!=null&&u.orders))return null;const r=((_=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:_.returns)??[],o={items:(((f=(s=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:s.orders)==null?void 0:f.items)??[]).map(e=>{var z;return{adminAssistedOrder:(e==null?void 0:e.admin_assisted_order)??null,items:e==null?void 0:e.items.map(l=>{var V,H,J;return{status:(l==null?void 0:l.status)??"",productName:(l==null?void 0:l.product_name)??"",id:l==null?void 0:l.id,quantityOrdered:(l==null?void 0:l.quantity_ordered)??0,quantityShipped:(l==null?void 0:l.quantity_shipped)??0,quantityInvoiced:(l==null?void 0:l.quantity_invoiced)??0,sku:(l==null?void 0:l.product_sku)??"",urlKey:(l==null?void 0:l.product_url_key)??"",topLevelSku:((V=l==null?void 0:l.product)==null?void 0:V.sku)??"",product:{smallImage:{url:((J=(H=l==null?void 0:l.product)==null?void 0:H.small_image)==null?void 0:J.url)??""}}}}),token:e==null?void 0:e.token,email:e==null?void 0:e.email,shippingMethod:e==null?void 0:e.shipping_method,paymentMethods:(e==null?void 0:e.payment_methods)??[],shipments:(e==null?void 0:e.shipments)??[],id:e==null?void 0:e.id,carrier:e==null?void 0:e.carrier,status:e==null?void 0:e.status,number:e==null?void 0:e.number,returns:(z=r==null?void 0:r.items)==null?void 0:z.filter(l=>l.order.id===e.id),orderDate:Ct(e.order_date),orderTime:At(e.order_date),shippingAddress:L(e.shipping_address),billingAddress:L(e.billing_address),total:bt(e)}}),pageInfo:{pageSize:((C=(T=(S=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:S.orders)==null?void 0:T.page_info)==null?void 0:C.page_size)??10,totalPages:((p=(M=(I=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:I.orders)==null?void 0:M.page_info)==null?void 0:p.total_pages)??1,currentPage:((v=($=(w=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:w.orders)==null?void 0:$.page_info)==null?void 0:v.current_page)??1},totalCount:((G=(D=(x=t==null?void 0:t.data)==null?void 0:x.customer)==null?void 0:D.orders)==null?void 0:G.total_count)??0,dateOfFirstOrder:((R=(F=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:F.orders)==null?void 0:R.date_of_first_order)??""};return Q(o,(q=(m=(A=(k=y==null?void 0:y.getConfig())==null?void 0:k.models)==null?void 0:A.OrderHistoryModel)==null?void 0:m.transformer)==null?void 0:q.call(m,t.data))},yt=t=>{var r,a,o,n,u,c,_,i,s,f,E,S,T,C;return{baseMediaUrl:(a=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:a.base_media_url,minLength:+((n=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:n.minimum_password_length)||3,requiredCharacterClasses:+((c=(u=t==null?void 0:t.data)==null?void 0:u.storeConfig)==null?void 0:c.required_character_classes_number)||0,storeCode:((i=(_=t==null?void 0:t.data)==null?void 0:_.storeConfig)==null?void 0:i.store_code)??"",shoppingAssistanceEnabled:((f=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:f.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((S=(E=t==null?void 0:t.data)==null?void 0:E.storeConfig)==null?void 0:S.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((C=(T=t==null?void 0:t.data)==null?void 0:T.storeConfig)==null?void 0:C.shopping_assistance_checkbox_tooltip)||""}},cr=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),Ot={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function Nt(t){try{return JSON.parse(t)}catch{return null}}function W(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function K(t){return!(t!=null&&t.trim())||W(t)==="UNKNOWN"}function j(t){if(t!=null&&t.trim())return Ot[W(t)]}function It(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}function Mt(t,r){var n,u;const a=(n=t==null?void 0:t.brand)==null?void 0:n.trim(),o=(u=t==null?void 0:t.type)==null?void 0:u.trim();if(!K(a)){const c=j(a);return c||It(a)}if(!K(o)){const c=j(o);return c||o}return r.payment_method_code}function pt(t){if(!t)return!1;const r=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!r)return!1;const a=Number.parseInt(r[1],10),o=Number.parseInt(r[2],10);if(a<1||a>12)return!1;const n=new Date(o,a,0,23,59,59,999);return Date.now()>n.getTime()}function Ut(t,r){return r.some(a=>t.payment_method_code===a||t.payment_method_code.startsWith(`${a}_`))}function wt(t,r){var o;const a=n=>{if(!n)return"";const u=n.replaceAll(/\D/g,"");return u.length>=4?u.slice(-4):""};if(t){const n=a(t.maskedCC)||a(t.lastFour)||a(t.last_four)||a(t.ccLast4)||a(t.cc_last4);if(n)return n}return((o=r.match(/\d{4}/g))==null?void 0:o.at(-1))??""}function $t(t){const r=t.replaceAll(/[^a-zA-Z0-9]/g,"");return r.length>=4?r.slice(-4).toUpperCase():r.padEnd(4,"0").slice(0,4).toUpperCase()}function vt(t){if(!t.public_hash)return null;const r=Nt(t.details),a=Mt(r,t),o=wt(r,t.details)||$t(t.public_hash);return{publicHash:t.public_hash,cardBrand:a,lastFourDigits:o,expired:pt(r==null?void 0:r.expirationDate)}}function xt(t,r){return(r!=null&&r.length?t.filter(o=>Ut(o,r)):t).map(o=>vt(o)).filter(o=>o!==null)}function Dt(t){var a,o,n,u,c,_;const r=(o=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:o.admin_assistance_actions;return r?{totalCount:r.total_count||0,items:((n=r.items)==null?void 0:n.map(i=>({action:i.action||"",date:i.date||"",details:i.details||""})))||[],pageInfo:{currentPage:((u=r.page_info)==null?void 0:u.current_page)||1,pageSize:((c=r.page_info)==null?void 0:c.page_size)||10,totalPages:((_=r.page_info)==null?void 0:_.total_pages)||1}}:null}const er=async t=>{const r=`_account_attributesForm_${t}`,a=sessionStorage.getItem(r);return a?JSON.parse(a):await d(t!=="shortRequest"?it:ut,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(o=>{var u;if((u=o.errors)!=null&&u.length)return h(o.errors);const n=st(o);return sessionStorage.setItem(r,JSON.stringify(n)),n}).catch(g)},Gt=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      uid
    }
  }
`,lr=async t=>await d(Gt,{method:"POST",variables:{input:O(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(r=>{var o,n;if((o=r.errors)!=null&&o.length)return h(r.errors);const a=(n=r==null?void 0:r.data)==null?void 0:n.createCustomerAddress;return{firstname:(a==null?void 0:a.firstname)??"",uid:(a==null?void 0:a.uid)??""}}).catch(g),Pt=`
  query GET_CUSTOMER_ADDRESS {
    customer {
      addresses {
        firstname
        lastname
        middlename
        fax
        prefix
        suffix
        city
        company
        country_code
        region {
          region
          region_code
          region_id
        }
        custom_attributesV2 {
          ... on AttributeValue {
            code
            value
          }
        }
        telephone
        id
        vat_id
        postcode
        street
        default_shipping
        default_billing
        uid
      }
    }
  }
`,_r=async()=>await d(Pt,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):Et(t)}).catch(g),Ft=`
  query GET_COUNTRIES_QUERY {
    countries {
      two_letter_abbreviation
      full_name_locale
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
`,sr=async()=>{const t="_account_countries",r=sessionStorage.getItem(t);return r?JSON.parse(r):await d(Ft,{method:"GET",cache:"no-cache"}).then(a=>{var n;if((n=a.errors)!=null&&n.length)return h(a.errors);const o=mt(a);return sessionStorage.setItem(t,JSON.stringify(o)),o}).catch(g)},kt=`
  query GET_REGIONS($countryCode: String!) {
    country(id: $countryCode) {
      id
      available_regions {
        id
        code
        name
      }
    }
  }
`,fr=async t=>{const r=`_account_regions_${t}`,a=sessionStorage.getItem(r);return a?JSON.parse(a):await d(kt,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(o=>{var u;if((u=o.errors)!=null&&u.length)return h(o.errors);const n=Tt(o);return sessionStorage.setItem(r,JSON.stringify(n)),n}).catch(g)},qt=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,dr=async t=>{const{addressId:r,...a}=t;return r?await d(qt,{method:"POST",variables:{id:Number(r),input:O(a,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(o=>{var n,u,c;return(n=o.errors)!=null&&n.length?h(o.errors):((c=(u=o==null?void 0:o.data)==null?void 0:u.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(g):""},Lt=`
  query GET_CUSTOMER {
    customer {
      ...BASIC_CUSTOMER_INFO_FRAGMENT
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
        ... on AttributeSelectedOptions {
          code
          selected_options {
            value
          }
        }
        code
      }
    }
  }
  ${rt}
`,gr=async()=>await d(Lt,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):St(t)}).catch(g),Bt=`
  query GET_ADMIN_ASSISTANCE_ACTIONS($currentPage: Int, $pageSize: Int) {
    customer {
      admin_assistance_actions(
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        total_count
        items {
          action
          date
          details
        }
        page_info {
          current_page
          page_size
          total_pages
        }
      }
    }
  }
`,hr=async(t,r)=>await d(Bt,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:r}}).then(a=>{var o;return(o=a.errors)!=null&&o.length?h(a.errors):Dt(a)}).catch(g),zt=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,Er=async t=>await d(zt,{method:"POST",variables:{id:t}}).then(r=>{var a;return(a=r.errors)!=null&&a.length?h(r.errors):r.data.deleteCustomerAddress}).catch(g),Vt=`
  query getCustomerPaymentTokens {
    customerPaymentTokens {
      items {
        details
        public_hash
        payment_method_code
        type
      }
    }
  }
`,Sr=async t=>await d(Vt,{method:"GET",cache:"no-cache"}).then(r=>{var o,n,u;if((o=r.errors)!=null&&o.length)return h(r.errors);const a=((u=(n=r.data)==null?void 0:n.customerPaymentTokens)==null?void 0:u.items)??[];return xt(a,t)}).catch(g),Ht=`
  mutation deletePaymentToken($public_hash: String!) {
    deletePaymentToken(public_hash: $public_hash) {
      result
    }
  }
`,mr=async t=>await d(Ht,{method:"POST",variables:{public_hash:t}}).then(r=>{var a,o,n;return(a=r.errors)!=null&&a.length?h(r.errors):!!((n=(o=r.data)==null?void 0:o.deletePaymentToken)!=null&&n.result)}).catch(g),Jt=`
  query GET_CUSTOMER_ORDERS_LIST(
    $currentPage: Int
    $pageSize: Int
    $filter: CustomerOrdersFilterInput
    $sort: CustomerOrderSortInput
  ) {
    customer {
      returns {
        items {
          uid
          number
          order {
            id
          }
        }
      }
      orders(
        currentPage: $currentPage
        pageSize: $pageSize
        filter: $filter
        sort: $sort
      ) {
        page_info {
          page_size
          total_pages
          current_page
        }
        date_of_first_order
        total_count
        items {
          ...CUSTOMER_ORDER_FRAGMENT
          shipping_address {
            ...ADDRESS_FRAGMENT
          }
          billing_address {
            ...ADDRESS_FRAGMENT
          }
          total {
            ...ORDER_SUMMARY_FRAGMENT
          }
        }
      }
    }
  }
  ${at}
  ${ot}
  ${nt}
`,Kt={sort_direction:"DESC",sort_field:"CREATED_AT"},Tr=async(t,r,a)=>{const o=r.includes("viewAll")?{}:{order_date:JSON.parse(r)};return await d(Jt,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:a,filter:o,sort:Kt}}).then(n=>Rt(n)).catch(g)},jt=`
  mutation CHANGE_CUSTOMER_PASSWORD(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      email
    }
  }
`,Cr=async({currentPassword:t,newPassword:r})=>await d(jt,{method:"POST",variables:{currentPassword:t,newPassword:r}}).then(a=>{var o,n,u;return(o=a.errors)!=null&&o.length?h(a.errors):((u=(n=a==null?void 0:a.data)==null?void 0:n.changeCustomerPassword)==null?void 0:u.email)||""}).catch(g),Qt=`
  query GET_STORE_CONFIG {
    storeConfig {
      base_media_url
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      shopping_assistance_enabled
      shopping_assistance_checkbox_title
      shopping_assistance_checkbox_tooltip
    }
  }
`,Ar=async()=>await d(Qt,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):yt(t)}).catch(g),Yt=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,br=async({email:t,password:r})=>await d(Yt,{method:"POST",variables:{email:t,password:r}}).then(a=>{var o,n,u,c;return(o=a.errors)!=null&&o.length?h(a.errors):((c=(u=(n=a==null?void 0:a.data)==null?void 0:n.updateCustomerEmail)==null?void 0:u.customer)==null?void 0:c.email)||""}).catch(g),Wt=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,Rr=async t=>await d(Wt,{method:"POST",variables:{input:O(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(r=>{var a,o,n,u;return(a=r.errors)!=null&&a.length?h(r.errors):((u=(n=(o=r==null?void 0:r.data)==null?void 0:o.updateCustomerV2)==null?void 0:n.customer)==null?void 0:u.email)||""}).catch(g);export{ct as a,B as b,O as c,y as config,lr as createCustomerAddress,mr as deletePaymentToken,d as fetchGraphQl,hr as getAdminAssistanceActions,er as getAttributesForm,ur as getConfig,sr as getCountries,gr as getCustomer,_r as getCustomerAddress,Sr as getCustomerPaymentTokens,Tr as getOrderHistoryList,fr as getRegions,Ar as getStoreConfig,Y as initialize,Er as removeCustomerAddress,nr as removeFetchGraphQlHeader,ar as setEndpoint,or as setFetchGraphQlHeader,ir as setFetchGraphQlHeaders,cr as t,Rr as updateCustomer,dr as updateCustomerAddress,br as updateCustomerEmail,Cr as updateCustomerPassword};
//# sourceMappingURL=api.js.map
