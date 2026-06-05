/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as Z}from"@dropins/tools/event-bus.js";import{Initializer as X,merge as Y}from"@dropins/tools/lib.js";import{FetchGraphQL as tt}from"@dropins/tools/fetch-graphql.js";const Q=new X({init:async t=>{const r={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};Q.config.setConfig({...r,...t})},listeners:()=>[]}),R=Q.config,{setEndpoint:rr,setFetchGraphQlHeader:ar,removeFetchGraphQlHeader:nr,setFetchGraphQlHeaders:or,fetchGraphQl:d,getConfig:ir}=new tt().getMethods(),rt=`
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
`,at=`
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
`,g=t=>{throw t instanceof DOMException&&t.name==="AbortError"||Z.emit("error",{source:"auth",type:"network",error:t}),t},h=t=>{const r=t.map(a=>a.message).join(" ");throw Error(r)},L=t=>t.replace(/_([a-z])/g,(r,a)=>a.toUpperCase()),nt=t=>t.replace(/([A-Z])/g,r=>`_${r.toLowerCase()}`),O=(t,r,a)=>{const n=["string","boolean","number"],o=r==="camelCase"?L:nt;return Array.isArray(t)?t.map(u=>n.includes(typeof u)||u===null?u:typeof u=="object"?O(u,r,a):u):t!==null&&typeof t=="object"?Object.entries(t).reduce((u,[e,_])=>{const i=a&&a[e]?a[e]:o(e);return u[i]=n.includes(typeof _)||_===null?_:O(_,r,a),u},{}):t},ot=t=>{let r=[];for(const a of t)if(!(a.frontend_input!=="MULTILINE"||a.multiline_count<2))for(let n=2;n<=a.multiline_count;n++){const o={...a,is_required:!1,name:`${a.code}_multiline_${n}`,code:`${a.code}_multiline_${n}`,id:`${a.code}_multiline_${n}`};r.push(o)}return r},it=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return L(t)}},ut=t=>{var r;return t!=null&&t.options?(r=t==null?void 0:t.options)==null?void 0:r.map(a=>({isDefault:(a==null?void 0:a.is_default)??!1,text:(a==null?void 0:a.label)??"",value:(a==null?void 0:a.value)??""})):[]},et=t=>{var u,e,_;const r=((e=(u=t==null?void 0:t.data)==null?void 0:u.attributesForm)==null?void 0:e.items)||[];if(!r.length)return[];const a=(_=r.filter(i=>{var s;return!((s=i.frontend_input)!=null&&s.includes("HIDDEN"))}))==null?void 0:_.map(({code:i,...s})=>{const f=i!=="country_id"?i:"country_code";return{...s,name:f,id:f,code:f}}),n=ot(a);return a.concat(n).map(i=>({code:i==null?void 0:i.code,name:i==null?void 0:i.name,id:i==null?void 0:i.id,label:(i==null?void 0:i.label)??"",entityType:i==null?void 0:i.entity_type,className:(i==null?void 0:i.frontend_class)??"",defaultValue:(i==null?void 0:i.default_value)??"",fieldType:i==null?void 0:i.frontend_input,multilineCount:(i==null?void 0:i.multiline_count)??0,orderNumber:Number(i==null?void 0:i.sort_order)||0,isHidden:!1,isUnique:(i==null?void 0:i.is_unique)??!1,required:(i==null?void 0:i.is_required)??!1,validateRules:(i==null?void 0:i.validate_rules)??[],options:ut(i),customUpperCode:it(i==null?void 0:i.code)})).sort((i,s)=>Number(i.orderNumber)-Number(s.orderNumber))},ct=t=>{const r={};for(const a in t){const n=t[a];!Array.isArray(n)||n.length===0||(a==="custom_attributesV2"?n.forEach(o=>{typeof o=="object"&&"value"in o&&(r[o==null?void 0:o.code]=o==null?void 0:o.value)}):n.length>1?n.forEach((o,u)=>{u===0?r[a]=o:r[`${a}_multiline_${u+1}`]=o}):r[a]=n[0])}return r},lt=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",middlename:(t==null?void 0:t.middlename)??""}),_t=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??"",uid:(t==null?void 0:t.uid)??""}),st=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),B=t=>{var a,n,o;return O({...lt(t),..._t(t),...st(t),city:(t==null?void 0:t.city)??"",region:{region:((a=t==null?void 0:t.region)==null?void 0:a.region)??"",region_code:((n=t==null?void 0:t.region)==null?void 0:n.region_code)??"",region_id:((o=t==null?void 0:t.region)==null?void 0:o.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...ct(t)},"camelCase",{})},ft=t=>{var n,o;const r=((o=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:o.addresses)||[];return r.length?r.map(B).sort((u,e)=>(Number(e.defaultBilling)||Number(e.defaultShipping))-(Number(u.defaultBilling)||Number(u.defaultShipping))):[]},dt=t=>{var n,o,u,e,_,i,s,f,m,E,T,C,N,p,M,I,U,v,x,w,$,D,G,P,F,y,k;const r=(u=(o=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:o.custom_attributes)==null?void 0:u.filter(A=>A).reduce((A,S)=>{var c;const q=L(S.code);return(c=S.selected_options)!=null&&c.length?A[q]=S.selected_options[0].value??"":A[q]=S.value??"",A},{}),a={email:((_=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:_.email)||"",firstName:((s=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:s.firstname)||"",lastName:((m=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:m.lastname)||"",middleName:((T=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:T.middlename)||"",gender:((N=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:N.gender)||"1",dateOfBirth:((M=(p=t==null?void 0:t.data)==null?void 0:p.customer)==null?void 0:M.date_of_birth)||"",prefix:((U=(I=t==null?void 0:t.data)==null?void 0:I.customer)==null?void 0:U.prefix)||"",suffix:((x=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:x.suffix)||"",createdAt:(($=(w=t==null?void 0:t.data)==null?void 0:w.customer)==null?void 0:$.created_at)||"",allowRemoteShoppingAssistance:(G=(D=t==null?void 0:t.data)==null?void 0:D.customer)==null?void 0:G.allow_remote_shopping_assistance,...r};return Y(a,(k=(y=(F=(P=R==null?void 0:R.getConfig())==null?void 0:P.models)==null?void 0:F.CustomerDataModelShort)==null?void 0:y.transformer)==null?void 0:k.call(y,t.data))},gt=t=>{var e,_;if(!((_=(e=t==null?void 0:t.data)==null?void 0:e.countries)!=null&&_.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:r,storeConfig:a}=t.data,n=a==null?void 0:a.countries_with_required_region.split(","),o=a==null?void 0:a.optional_zip_countries.split(",");return{availableCountries:r.filter(({two_letter_abbreviation:i,full_name_locale:s})=>!!(i&&s)).map(i=>{const{two_letter_abbreviation:s,full_name_locale:f,available_regions:m}=i,E=Array.isArray(m)&&m.length>0;return{value:s,text:f,availableRegions:E?m:void 0}}).sort((i,s)=>i.text.localeCompare(s.text)),countriesWithRequiredRegion:n,optionalZipCountries:o}},ht=t=>{var n,o;const r=(o=(n=t==null?void 0:t.data)==null?void 0:n.country)==null?void 0:o.available_regions;return r?r.filter(u=>{if(!u)return!1;const{id:e,code:_,name:i}=u;return!!(e&&_&&i)}).map(u=>{const{id:e}=u;return{id:e,text:u.name,value:`${u.code},${u.id}`}}):[]},mt=(t,r="en-US",a={})=>{const n={day:"2-digit",month:"2-digit",year:"numeric"},o=/^\d{4}-\d{2}-\d{2}$/.test(t.trim()),u={...n,...o?{timeZone:"UTC"}:{},...a},e=new Date(t.trim());return isNaN(e.getTime())?"Invalid Date":new Intl.DateTimeFormat(r,u).format(e)},Et=(t,r="en-US",a={})=>{const o={...{hour:"2-digit",minute:"2-digit"},...a},u=new Date(t);return isNaN(u.getTime())?"Invalid Time":new Intl.DateTimeFormat(r,o).format(u)},b={value:0,currency:"USD"},St=t=>{var r,a,n,o,u,e,_,i,s,f;return{subtotal:((r=t==null?void 0:t.total)==null?void 0:r.subtotal)??b,grandTotal:((a=t==null?void 0:t.total)==null?void 0:a.grand_total)??b,grandTotalExclTax:((n=t==null?void 0:t.total)==null?void 0:n.grand_total_excl_tax)??b,totalGiftcard:((o=t==null?void 0:t.total)==null?void 0:o.total_giftcard)??b,subtotalExclTax:((u=t==null?void 0:t.total)==null?void 0:u.subtotal_excl_tax)??b,subtotalInclTax:((e=t==null?void 0:t.total)==null?void 0:e.subtotal_incl_tax)??b,taxes:((_=t==null?void 0:t.total)==null?void 0:_.taxes)??[],totalTax:((i=t==null?void 0:t.total)==null?void 0:i.total_tax)??b,totalShipping:((s=t==null?void 0:t.total)==null?void 0:s.total_shipping)??b,discounts:((f=t==null?void 0:t.total)==null?void 0:f.discounts)??[]}},Tt=t=>{var o,u,e,_,i,s,f,m,E,T,C,N,p,M,I,U,v,x,w,$,D,G,P,F,y,k,A,S,q;if(!((u=(o=t.data)==null?void 0:o.customer)!=null&&u.orders))return null;const r=((_=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:_.returns)??[],n={items:(((f=(s=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:s.orders)==null?void 0:f.items)??[]).map(c=>{var z;return{adminAssistedOrder:(c==null?void 0:c.admin_assisted_order)??null,items:c==null?void 0:c.items.map(l=>{var V,H,J;return{status:(l==null?void 0:l.status)??"",productName:(l==null?void 0:l.product_name)??"",id:l==null?void 0:l.id,quantityOrdered:(l==null?void 0:l.quantity_ordered)??0,quantityShipped:(l==null?void 0:l.quantity_shipped)??0,quantityInvoiced:(l==null?void 0:l.quantity_invoiced)??0,sku:(l==null?void 0:l.product_sku)??"",urlKey:(l==null?void 0:l.product_url_key)??"",topLevelSku:((V=l==null?void 0:l.product)==null?void 0:V.sku)??"",product:{smallImage:{url:((J=(H=l==null?void 0:l.product)==null?void 0:H.small_image)==null?void 0:J.url)??""}}}}),token:c==null?void 0:c.token,email:c==null?void 0:c.email,shippingMethod:c==null?void 0:c.shipping_method,paymentMethods:(c==null?void 0:c.payment_methods)??[],shipments:(c==null?void 0:c.shipments)??[],id:c==null?void 0:c.id,carrier:c==null?void 0:c.carrier,status:c==null?void 0:c.status,number:c==null?void 0:c.number,returns:(z=r==null?void 0:r.items)==null?void 0:z.filter(l=>l.order.id===c.id),orderDate:mt(c.order_date),orderTime:Et(c.order_date),shippingAddress:B(c.shipping_address),billingAddress:B(c.billing_address),total:St(c)}}),pageInfo:{pageSize:((C=(T=(E=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:E.orders)==null?void 0:T.page_info)==null?void 0:C.page_size)??10,totalPages:((I=(M=(p=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:p.orders)==null?void 0:M.page_info)==null?void 0:I.total_pages)??1,currentPage:((w=(x=(v=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:v.orders)==null?void 0:x.page_info)==null?void 0:w.current_page)??1},totalCount:((G=(D=($=t==null?void 0:t.data)==null?void 0:$.customer)==null?void 0:D.orders)==null?void 0:G.total_count)??0,dateOfFirstOrder:((y=(F=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:F.orders)==null?void 0:y.date_of_first_order)??""};return Y(n,(q=(S=(A=(k=R==null?void 0:R.getConfig())==null?void 0:k.models)==null?void 0:A.OrderHistoryModel)==null?void 0:S.transformer)==null?void 0:q.call(S,t.data))},Ct=t=>{var r,a,n,o,u,e,_,i,s,f,m,E,T,C;return{baseMediaUrl:(a=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:a.base_media_url,minLength:+((o=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:o.minimum_password_length)||3,requiredCharacterClasses:+((e=(u=t==null?void 0:t.data)==null?void 0:u.storeConfig)==null?void 0:e.required_character_classes_number)||0,storeCode:((i=(_=t==null?void 0:t.data)==null?void 0:_.storeConfig)==null?void 0:i.store_code)??"",shoppingAssistanceEnabled:((f=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:f.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((E=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:E.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((C=(T=t==null?void 0:t.data)==null?void 0:T.storeConfig)==null?void 0:C.shopping_assistance_checkbox_tooltip)||""}},ur=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),At={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function bt(t){try{return JSON.parse(t)}catch{return null}}function W(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function K(t){return!(t!=null&&t.trim())||W(t)==="UNKNOWN"}function j(t){if(t!=null&&t.trim())return At[W(t)]}function yt(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}function Rt(t,r){var o,u;const a=(o=t==null?void 0:t.brand)==null?void 0:o.trim(),n=(u=t==null?void 0:t.type)==null?void 0:u.trim();if(!K(a)){const e=j(a);return e||yt(a)}if(!K(n)){const e=j(n);return e||n}return r.payment_method_code}function Ot(t){if(!t)return!1;const r=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!r)return!1;const a=Number.parseInt(r[1],10),n=Number.parseInt(r[2],10);if(a<1||a>12)return!1;const o=new Date(n,a,0,23,59,59,999);return Date.now()>o.getTime()}function Nt(t,r){return r.some(a=>t.payment_method_code===a||t.payment_method_code.startsWith(`${a}_`))}function pt(t,r){var n;const a=o=>{if(!o)return"";const u=o.replaceAll(/\D/g,"");return u.length>=4?u.slice(-4):""};if(t){const o=a(t.maskedCC)||a(t.lastFour)||a(t.last_four)||a(t.ccLast4)||a(t.cc_last4);if(o)return o}return((n=r.match(/\d{4}/g))==null?void 0:n.at(-1))??""}function Mt(t){const r=t.replaceAll(/[^a-zA-Z0-9]/g,"");return r.length>=4?r.slice(-4).toUpperCase():r.padEnd(4,"0").slice(0,4).toUpperCase()}function It(t){if(!t.public_hash)return null;const r=bt(t.details),a=Rt(r,t),n=pt(r,t.details)||Mt(t.public_hash);return{publicHash:t.public_hash,cardBrand:a,lastFourDigits:n,expired:Ot(r==null?void 0:r.expirationDate)}}function Ut(t,r){return(r!=null&&r.length?t.filter(n=>Nt(n,r)):t).map(n=>It(n)).filter(n=>n!==null)}function vt(t){var a,n,o,u,e,_;const r=(n=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:n.admin_assistance_actions;return r?{totalCount:r.total_count||0,items:((o=r.items)==null?void 0:o.map(i=>({action:i.action||"",date:i.date||"",details:i.details||""})))||[],pageInfo:{currentPage:((u=r.page_info)==null?void 0:u.current_page)||1,pageSize:((e=r.page_info)==null?void 0:e.page_size)||10,totalPages:((_=r.page_info)==null?void 0:_.total_pages)||1}}:null}const er=async t=>{const r=`_account_attributesForm_${t}`,a=sessionStorage.getItem(r);return a?JSON.parse(a):await d(t!=="shortRequest"?rt:at,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(n=>{var u;if((u=n.errors)!=null&&u.length)return h(n.errors);const o=et(n);return sessionStorage.setItem(r,JSON.stringify(o)),o}).catch(g)},xt=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      uid
    }
  }
`,cr=async t=>await d(xt,{method:"POST",variables:{input:O(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(r=>{var n,o;if((n=r.errors)!=null&&n.length)return h(r.errors);const a=(o=r==null?void 0:r.data)==null?void 0:o.createCustomerAddress;return{firstname:(a==null?void 0:a.firstname)??"",uid:(a==null?void 0:a.uid)??""}}).catch(g),wt=`
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
`,lr=async()=>await d(wt,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):ft(t)}).catch(g),$t=`
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
`,_r=async()=>{const t="_account_countries",r=sessionStorage.getItem(t);return r?JSON.parse(r):await d($t,{method:"GET",cache:"no-cache"}).then(a=>{var o;if((o=a.errors)!=null&&o.length)return h(a.errors);const n=gt(a);return sessionStorage.setItem(t,JSON.stringify(n)),n}).catch(g)},Dt=`
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
`,sr=async t=>{const r=`_account_regions_${t}`,a=sessionStorage.getItem(r);return a?JSON.parse(a):await d(Dt,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(n=>{var u;if((u=n.errors)!=null&&u.length)return h(n.errors);const o=ht(n);return sessionStorage.setItem(r,JSON.stringify(o)),o}).catch(g)},Gt=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,fr=async t=>{const{addressId:r,...a}=t;return r?await d(Gt,{method:"POST",variables:{id:Number(r),input:O(a,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(n=>{var o,u,e;return(o=n.errors)!=null&&o.length?h(n.errors):((e=(u=n==null?void 0:n.data)==null?void 0:u.updateCustomerAddress)==null?void 0:e.firstname)||""}).catch(g):""},Pt=`
  fragment BASIC_CUSTOMER_INFO_FRAGMENT on Customer {
    date_of_birth
    email
    firstname
    gender
    lastname
    middlename
    prefix
    suffix
    created_at
    allow_remote_shopping_assistance
  }
`,Ft=`
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
  ${Pt}
`,dr=async()=>await d(Ft,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):dt(t)}).catch(g),kt=`
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
`,gr=async(t,r)=>await d(kt,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:r}}).then(a=>{var n;return(n=a.errors)!=null&&n.length?h(a.errors):vt(a)}).catch(g),qt=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,hr=async t=>await d(qt,{method:"POST",variables:{id:t}}).then(r=>{var a;return(a=r.errors)!=null&&a.length?h(r.errors):r.data.deleteCustomerAddress}).catch(g),Bt=`
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
`,mr=async t=>await d(Bt,{method:"GET",cache:"no-cache"}).then(r=>{var n,o,u;if((n=r.errors)!=null&&n.length)return h(r.errors);const a=((u=(o=r.data)==null?void 0:o.customerPaymentTokens)==null?void 0:u.items)??[];return Ut(a,t)}).catch(g),Lt=`
  mutation deletePaymentToken($public_hash: String!) {
    deletePaymentToken(public_hash: $public_hash) {
      result
    }
  }
`,Er=async t=>await d(Lt,{method:"POST",variables:{public_hash:t}}).then(r=>{var a,n,o;return(a=r.errors)!=null&&a.length?h(r.errors):!!((o=(n=r.data)==null?void 0:n.deletePaymentToken)!=null&&o.result)}).catch(g),zt=`
  fragment ADDRESS_FRAGMENT on OrderAddress {
    city
    company
    country_code
    fax
    firstname
    lastname
    middlename
    postcode
    prefix
    region
    region_id
    street
    suffix
    telephone
    vat_id
  }
`,Vt=`
  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    grand_total {
      value
      currency
    }
    grand_total_excl_tax {
      value
      currency
    }
    total_giftcard {
      currency
      value
    }
    subtotal_excl_tax {
      currency
      value
    }
    subtotal_incl_tax {
      currency
      value
    }
    taxes {
      amount {
        currency
        value
      }
      rate
      title
    }
    total_tax {
      currency
      value
    }
    total_shipping {
      currency
      value
    }
    discounts {
      amount {
        currency
        value
      }
      label
    }
  }
`,Ht=`
  fragment CUSTOMER_ORDER_FRAGMENT on CustomerOrder {
    admin_assisted_order
    token
    email
    shipping_method
    payment_methods {
      name
      type
    }
    shipments {
      id
      number
      tracking {
        title
        number
        carrier
      }
    }
    number
    id
    order_date
    carrier
    status
    items {
      status
      product_name
      id
      quantity_ordered
      quantity_shipped
      quantity_invoiced
      product_sku
      product_url_key
      product {
        sku
        small_image {
          url
        }
      }
    }
  }
`,Jt=`
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
  ${Ht}
  ${zt}
  ${Vt}
`,Kt={sort_direction:"DESC",sort_field:"CREATED_AT"},Sr=async(t,r,a)=>{const n=r.includes("viewAll")?{}:{order_date:JSON.parse(r)};return await d(Jt,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:a,filter:n,sort:Kt}}).then(o=>Tt(o)).catch(g)},jt=`
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
`,Tr=async({currentPassword:t,newPassword:r})=>await d(jt,{method:"POST",variables:{currentPassword:t,newPassword:r}}).then(a=>{var n,o,u;return(n=a.errors)!=null&&n.length?h(a.errors):((u=(o=a==null?void 0:a.data)==null?void 0:o.changeCustomerPassword)==null?void 0:u.email)||""}).catch(g),Yt=`
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
`,Cr=async()=>await d(Yt,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):Ct(t)}).catch(g),Qt=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,Ar=async({email:t,password:r})=>await d(Qt,{method:"POST",variables:{email:t,password:r}}).then(a=>{var n,o,u,e;return(n=a.errors)!=null&&n.length?h(a.errors):((e=(u=(o=a==null?void 0:a.data)==null?void 0:o.updateCustomerEmail)==null?void 0:u.customer)==null?void 0:e.email)||""}).catch(g),Wt=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,br=async t=>await d(Wt,{method:"POST",variables:{input:O(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(r=>{var a,n,o,u;return(a=r.errors)!=null&&a.length?h(r.errors):((u=(o=(n=r==null?void 0:r.data)==null?void 0:n.updateCustomerV2)==null?void 0:o.customer)==null?void 0:u.email)||""}).catch(g);export{zt as A,Pt as B,Ht as C,Vt as O,nt as a,L as b,O as c,R as config,cr as createCustomerAddress,Er as deletePaymentToken,d as fetchGraphQl,gr as getAdminAssistanceActions,er as getAttributesForm,ir as getConfig,_r as getCountries,dr as getCustomer,lr as getCustomerAddress,mr as getCustomerPaymentTokens,Sr as getOrderHistoryList,sr as getRegions,Cr as getStoreConfig,Q as initialize,hr as removeCustomerAddress,nr as removeFetchGraphQlHeader,rr as setEndpoint,ar as setFetchGraphQlHeader,or as setFetchGraphQlHeaders,ur as t,br as updateCustomer,fr as updateCustomerAddress,Ar as updateCustomerEmail,Tr as updateCustomerPassword};
//# sourceMappingURL=api.js.map
