/*! Copyright 2026 Adobe
All Rights Reserved. */
import{signal as ve,computed as ee}from"@dropins/tools/signals.js";import{events as h}from"@dropins/tools/event-bus.js";import{merge as te,Initializer as qe,deepmerge as we}from"@dropins/tools/lib.js";import{ESTIMATE_SHIPPING_METHOD_FRAGMENT as $e,CHECKOUT_DATA_FRAGMENT as y,CUSTOMER_FRAGMENT as Ue,NEGOTIABLE_QUOTE_FRAGMENT as T}from"./fragments.js";import{FetchGraphQL as De}from"@dropins/tools/fetch-graphql.js";const Re={authenticated:!1,cartId:null,config:null,initialized:!1,quoteId:null},s=new Proxy(Re,{set(e,t,n){return e[t]=n,!0},get(e,t){return e[t]}});function On(){return s.quoteId!==null}const Qe=async(e=!1)=>{s.authenticated=e},Ge=`
  mutation estimateShippingMethods(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(input: { cart_id: $cartId, address: $address }) {
      ...ESTIMATE_SHIPPING_METHOD_FRAGMENT
    }
  }

  ${$e}
`;function Pe({code:e,...t}){return{code:e,...t}}function xe({code:e,...t}){return{code:e,...t}}const Be=e=>{if("carrier_code"in e&&"method_code"in e)return e;const t=e,{carrierCode:n,methodCode:r,...i}=t;return{carrier_code:n,method_code:r,...i}};function Le(e){return e.map(Be)}function G(e){var t;return{fax:e.fax,middlename:e.middleName,prefix:e.prefix,suffix:e.suffix,vat_id:e.vatId,city:e.city,custom_attributes:((t=e.customAttributes)==null?void 0:t.map(n=>({attribute_code:n.code,value:n.value})))||[],company:e.company,country_code:e.countryCode,firstname:e.firstName,lastname:e.lastName,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook,street:e.street,telephone:e.telephone}}function Fe(e){const{customerAddressId:t,pickupLocationCode:n,address:r}=e,i={};return t?{customer_address_id:t}:(n&&(i.pickup_location_code=n),!n&&r&&(i.address=G(r)),i)}function ke(e){const{customerAddressUid:t,address:n}=e,r={};return t?{customer_address_uid:t}:(n&&(r.address=G(n)),r)}function je(e){const{customerAddressId:t,sameAsShipping:n=!1,useForShipping:r=!1,address:i}=e;let o={use_for_shipping:r,same_as_shipping:n};return!n&&t?(o.customer_address_id=t,o):(!n&&i&&(o.address=G(i)),o)}function Ve(e){const{customerAddressUid:t,sameAsShipping:n=!1,useForShipping:r=!1,address:i}=e;let o={use_for_shipping:r,same_as_shipping:n};return!n&&t?(o.customer_address_uid=t,o):(!n&&i&&(o.address=G(i)),o)}const He=e=>e?"code"in e&&"value"in e:!1,ne=e=>e?e.filter(He).map(t=>{const{code:n,value:r}=t;return{code:n,value:r}}):[],re=e=>{if(!e)return;const{code:t,title:n,...r}=e;return{code:t,title:n,additionalData:r}},ie=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:n,title:r,...i}=t;return{code:n,title:r,additionalData:i}})},se=e=>{const t=e.street.filter(Boolean);return{city:e.city,company:e.company||void 0,country:ue(e.country),customAttributes:ne(e.custom_attributes),fax:e.fax||void 0,firstName:e.firstname,id:(e==null?void 0:e.id)||void 0,lastName:e.lastname,middleName:e.middlename||void 0,postCode:e.postcode||void 0,prefix:e.prefix||void 0,region:ce(e.region),street:t,suffix:e.suffix||void 0,telephone:e.telephone||void 0,uid:e.uid,vatId:e.vat_id||void 0}},ze=e=>{if(e)return se(e)},Xe=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:n,selected_shipping_method:r,same_as_billing:i,...o}=t;return{...se(o),availableShippingMethods:F(n),selectedShippingMethod:me(r),sameAsBilling:i}}),vn=e=>{var t,n;if(e)return{city:e.city,company:e.company,countryCode:e.country.code,customAttributes:e.customAttributes||[],firstName:e.firstName,lastName:e.lastName,postcode:e.postCode,region:(t=e.region)==null?void 0:t.code,regionId:(n=e.region)==null?void 0:n.id,street:e.street,telephone:e.telephone,vatId:e.vatId,prefix:e.prefix,suffix:e.suffix,middleName:e.middleName,fax:e.fax}},N=e=>{var n,r,i;if(!e)return;const t={type:"cart",availablePaymentMethods:ie(e.available_payment_methods),billingAddress:ze(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:re(e.selected_payment_method),shippingAddresses:Xe(e.shipping_addresses),isGuest:!s.authenticated};return te(t,(i=(r=(n=$.getConfig().models)==null?void 0:n.CartModel)==null?void 0:r.transformer)==null?void 0:i.call(r,e))},Ke=e=>!e||!(e!=null&&e.available_credit)||e.available_credit.value==null||!e.available_credit.currency?null:{availableCredit:{value:e.available_credit.value,currency:e.available_credit.currency},exceedLimit:(e==null?void 0:e.exceed_limit)||!1},oe=e=>{const t=e.street.filter(Boolean);return{city:e.city,company:e.company||void 0,country:ue(e.country),customAttributes:ne(e.custom_attributes),customerAddressUid:e.customer_address_uid||void 0,fax:e.fax||void 0,firstName:e.firstname,lastName:e.lastname,middleName:e.middlename||void 0,postCode:e.postcode||void 0,prefix:e.prefix||void 0,region:ce(e.region),street:t,suffix:e.suffix||void 0,telephone:e.telephone||void 0,uid:e.uid,vatId:e.vat_id||void 0}},Ye=e=>{if(e)return oe(e)},We=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:n,selected_shipping_method:r,...i}=t;return{...oe(i),availableShippingMethods:F(n),selectedShippingMethod:me(r)}});var ae=(e=>(e.MANUAL="manual",e.AUTO="auto",e))(ae||{}),M=(e=>(e.EXCLUDING_TAX="EXCLUDING_TAX",e.INCLUDING_EXCLUDING_TAX="INCLUDING_AND_EXCLUDING_TAX",e.INCLUDING_TAX="INCLUDING_TAX",e))(M||{});const Je=e=>e?e.filter(t=>!!t).map(t=>({id:t.agreement_id,name:t.name,mode:ae[t.mode],text:t.checkbox_text,content:{value:t.content,html:t.is_html,height:t.content_height??null}})):[],ue=e=>({code:(e==null?void 0:e.code)??"",label:(e==null?void 0:e.label)??""}),Ze=e=>{var n,r,i;if(!e)return null;const t={firstName:e.firstname||"",lastName:e.lastname||"",email:e.email||""};return te(t,(i=(r=(n=$.getConfig().models)==null?void 0:n.CustomerModel)==null?void 0:r.transformer)==null?void 0:i.call(r,e))},et=e=>!!(e!=null&&e.is_email_available),w=e=>e?{type:"quote",availablePaymentMethods:ie(e.available_payment_methods),billingAddress:Ye(e.billing_address),email:e.email??"",isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,name:e.name,selectedPaymentMethod:re(e.selected_payment_method),shippingAddresses:We(e.shipping_addresses),status:e.status,uid:e.uid}:null,ce=e=>{if(!(!(e!=null&&e.code)||!(e!=null&&e.label)))return{code:e.code,name:e.label,id:e.region_id??void 0}};function tt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var nt=function(t){return rt(t)&&!it(t)};function rt(e){return!!e&&typeof e=="object"}function it(e){var t=Object.prototype.toString.call(e);return t==="[object RegExp]"||t==="[object Date]"||at(e)}var st=typeof Symbol=="function"&&Symbol.for,ot=st?Symbol.for("react.element"):60103;function at(e){return e.$$typeof===ot}function ut(e){return Array.isArray(e)?[]:{}}function q(e,t){return t.clone!==!1&&t.isMergeableObject(e)?S(ut(e),e,t):e}function ct(e,t,n){return e.concat(t).map(function(r){return q(r,n)})}function lt(e,t){if(!t.customMerge)return S;var n=t.customMerge(e);return typeof n=="function"?n:S}function dt(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter(function(t){return Object.propertyIsEnumerable.call(e,t)}):[]}function X(e){return Object.keys(e).concat(dt(e))}function le(e,t){try{return t in e}catch{return!1}}function pt(e,t){return le(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))}function ht(e,t,n){var r={};return n.isMergeableObject(e)&&X(e).forEach(function(i){r[i]=q(e[i],n)}),X(t).forEach(function(i){pt(e,i)||(le(e,i)&&n.isMergeableObject(t[i])?r[i]=lt(i,n)(e[i],t[i],n):r[i]=q(t[i],n))}),r}function S(e,t,n){n=n||{},n.arrayMerge=n.arrayMerge||ct,n.isMergeableObject=n.isMergeableObject||nt,n.cloneUnlessOtherwiseSpecified=q;var r=Array.isArray(t),i=Array.isArray(e),o=r===i;return o?r?n.arrayMerge(e,t,n):ht(e,t,n):q(t,n)}S.all=function(t,n){if(!Array.isArray(t))throw new Error("first argument should be an array");return t.reduce(function(r,i){return S(r,i,n)},{})};var mt=S,gt=mt;const de=tt(gt),ft={arrayMerge:(e,t,n)=>{const r=e.slice();return t.forEach((i,o)=>{typeof r[o]>"u"?r[o]=n.cloneUnlessOtherwiseSpecified(i,n):n.isMergeableObject(i)?r[o]=de(e[o],i,n):e.indexOf(i)===-1&&r.push(i)}),r}};function _t(e,t){return t?de(e,t,ft):e}const K=e=>({countryCode:e.country_id,postCode:e.postcode||"",...e.region_id?{regionId:Number(e.region_id)}:{...e.region?{region:e.region}:{}}}),It=e=>({carrierCode:e.carrier.code||"",methodCode:e.code||"",amount:e.amount,amountExclTax:e.amountExclTax,amountInclTax:e.amountInclTax}),yt=e=>{var n,r,i;const t=F(e);return _t(t,(i=(r=(n=$.getConfig().models)==null?void 0:n.EstimateShippingModel)==null?void 0:r.transformer)==null?void 0:i.call(r,e))},At=(e,t)=>e.amount.value-t.amount.value,Et=e=>e==null,pe=e=>!(!e||!e.method_code||!e.method_title||Et(e.amount.value)||!e.amount.currency),he=e=>({amount:{value:e.amount.value,currency:e.amount.currency},title:e.method_title,code:e.method_code,carrier:{code:e.carrier_code,title:e.carrier_title},value:`${e.carrier_code} - ${e.method_code}`,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}},...e.original_amount&&{originalAmount:{value:e.original_amount.value,currency:e.original_amount.currency}}}),me=e=>{if(pe(e))return he(e)},F=e=>e?e.filter(pe).map(t=>he(t)).sort(At):[];var E=(e=>(e.Updates="updates",e.Default="default",e.ShippingEstimate="shippingEstimate",e))(E||{});const Q=new Map,x=new Map,b=ve(new Set),ge=new Map;ge.set("updates",e=>{h.emit("checkout/updated",e)});async function Ct(e){x.set(e,!0);const t=Q.get(e);let n;for(;t.length>0;){const o=t.shift();try{const a=await o.requestFn();o.resolve(a),n=a}catch(a){o.reject(a)}}x.set(e,!1);const r=new Set(b.value);r.delete(e),b.value=r;const i=ge.get(e);i&&n&&i(n)}function Mt(e,t="default"){Q.has(t)||Q.set(t,[]);const n=Q.get(t),r=new Promise((o,a)=>{n.push({requestFn:e,resolve:o,reject:a})}),i=new Set(b.value);return i.add(t),b.value=i,x.get(t)||Ct(t),r}const qn=ee(()=>b.value.has("updates")),wn=ee(()=>b.value.has("shippingEstimate")),St=["sender_email","recipient_email"];function bt(e){return e.filter(t=>!t.path||!St.some(n=>{var r;return((r=t.path)==null?void 0:r.at(-1))===n}))}class Tt extends Error{constructor(t){super(t.map(n=>n.message).join(" ")),this.name="FetchError"}}class I extends Error{constructor(t){super(t),this.name="InvalidInput"}}class A extends I{constructor(t){super(`${t} is required.`)}}class k extends A{constructor(){super("Cart ID")}}class Nt extends I{constructor(){super("Either Cart ID or Quote ID is required.")}}class fe extends Error{constructor(){super("User is not authenticated")}}class Ot extends A{constructor(){super("Negotiable Quote ID")}}class vt extends A{constructor(){super("Email")}}class qt extends A{constructor(){super("Payment method code")}}class _e extends A{constructor(){super("Shipping address")}}class wt extends A{constructor(){super("Shipping method")}}class Ie extends A{constructor(){super("Billing address")}}class $t extends A{constructor(){super("Country Code")}}var v=(e=>(e.INVALID_INPUT="INVALID_INPUT",e.SERVER_ERROR="SERVER_ERROR",e.UNAUTHENTICATED="UNAUTHENTICATED",e.UNKNOWN_ERROR="UNKNOWN_ERROR",e.QUOTE_DATA_ERROR="QUOTE_DATA_ERROR",e.QUOTE_PERMISSION_DENIED="QUOTE_PERMISSION_DENIED",e.PERMISSION_DENIED="PERMISSION_DENIED",e))(v||{});const Ut=["PlaceOrderError"],Dt=[{code:"INVALID_INPUT",matches:e=>e instanceof I},{code:"UNAUTHENTICATED",matches:e=>e instanceof fe},{code:"SERVER_ERROR",matches:e=>!e||typeof e!="object"||!("name"in e)?!1:Ut.includes(e.name)}];function $n(e){const t=Dt.find(n=>n.matches(e));return t?t.code:v.UNKNOWN_ERROR}function Rt(e,t){return t.split(".").reduce((n,r)=>n&&n[r]!==void 0?n[r]:void 0,e)}async function m(e){const{defaultValueOnFail:t,options:n,path:r,query:i,queueName:o,transformer:a,type:g}=e;try{const u=async()=>{const{data:l,errors:c}=await jt(i,{method:g==="query"?"GET":"POST",cache:g==="query"?"no-cache":void 0,...n});if(c){const f=bt(c);if(f.length>0)throw new Tt(f)}let d=Rt(l,r);if(d===void 0)throw new Error(`No data found at path: ${r}`);return a?a(d):d};return g==="mutation"?await Mt(u,o):await u()}catch(u){if(t!==void 0)return t;throw u}}function Qt(){return h.lastPayload("checkout/initialized")??null}function Gt(){return h.lastPayload("checkout/updated")??null}function ye(){return Gt()??Qt()}function Un(){var t;const e=ye();return!!((t=e==null?void 0:e.shippingAddresses)!=null&&t.length)}function Dn(){const e=ye();return(e==null?void 0:e.email)??null}const j={EMAIL:/^[a-z0-9,!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9,!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9-]+\.)+[a-z]{2,}$/i,NOT_EMPTY:/^(?!\s*$).+/},Rn=e=>j.EMAIL.test(e),Qn=e=>j.NOT_EMPTY.test(e),Gn={NOT_EMPTY:j.NOT_EMPTY.source},Pt={email:"",isBillToShipping:void 0,selectedPaymentMethod:null,selectedShippingMethod:null};function Pn(e){const n={...h.lastPayload("checkout/values")??Pt,...e};h.emit("checkout/values",n)}function Ae(e){const t=h.lastPayload("checkout/values");return t&&e in t?t[e]:null}const xt=`
  query getStoreConfig {
    storeConfig {
      default_country
      is_checkout_agreements_enabled
      is_guest_checkout_enabled
      is_one_page_checkout_enabled
      shopping_cart_display_shipping
    }
  }
`,Bt="US",B={defaultCountry:Bt,agreementsEnabled:!0,shoppingCartDisplaySetting:{shipping:M.EXCLUDING_TAX}},Lt=async()=>await m({defaultValueOnFail:B,options:{method:"GET",cache:"no-cache"},path:"storeConfig",query:xt,transformer:kt,type:"query"}),xn=()=>s.config;function Ft(e){switch(e){case 1:return M.EXCLUDING_TAX;case 2:return M.INCLUDING_TAX;case 3:return M.INCLUDING_EXCLUDING_TAX;default:return M.EXCLUDING_TAX}}function kt(e){if(!e)return B;const{default_country:t,is_checkout_agreements_enabled:n,shopping_cart_display_shipping:r}=e;return{defaultCountry:t||B.defaultCountry,agreementsEnabled:n,shoppingCartDisplaySetting:{shipping:Ft(r)}}}const Bn=async e=>{var l,c,d,f;const t=s.cartId,n=((l=e==null?void 0:e.criteria)==null?void 0:l.country_code)??((c=s.config)==null?void 0:c.defaultCountry);if(!t)throw new k;if(!n)throw new $t;const{region_id:r,region_name:i,zip:o}=(e==null?void 0:e.criteria)??{},a=r||i?{region_id:typeof r=="string"?parseInt(r,10):r,region_code:i}:void 0,g={country_code:n,...o&&{postcode:o},...a&&{region:{...a.region_id&&{region_id:a.region_id},...a.region_code&&{region_code:a.region_code}}}},u={country_id:n,region:(d=g.region)==null?void 0:d.region_code,region_id:(f=g.region)==null?void 0:f.region_id,postcode:o},p=K(u);return m({options:{variables:{cartId:t,address:g}},path:"estimateShippingMethods",query:Ge,queueName:E.ShippingEstimate,transformer:yt,type:"mutation"}).then(_=>{const{defaults:U,shipping:D}=$.getConfig(),V=D!=null&&D.filterOptions?_.filter(D.filterOptions):_,Ne=V.length>0,Oe=K(u);let H=null;if(Ne){const C=Ae("selectedShippingMethod");let O=_.find(z=>z.code===(C==null?void 0:C.code)&&z.carrier.code===(C==null?void 0:C.carrier.code));!O&&(U!=null&&U.selectedShippingMethod)&&(O=U.selectedShippingMethod(_)??void 0),O||(O=_[0]),H=It(O)}return h.emit("shipping/estimate",{address:Oe,availableShippingMethods:_,shippingMethod:H,success:!0}),V}).catch(_=>{throw h.emit("shipping/estimate",{address:p,shippingMethod:null,availableShippingMethods:[],success:!1}),_})},{setEndpoint:Ln,setFetchGraphQlHeader:Fn,removeFetchGraphQlHeader:kn,setFetchGraphQlHeaders:jn,fetchGraphQl:jt,getConfig:Vn}=new De().getMethods(),Vt=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${y}
`,Ht=`
  query getCustomerCart {
    cart: customerCart {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${y}
`,Ee=async()=>{const e=s.cartId,t=s.authenticated===!1,n=t?Vt:Ht,r=t?{cartId:e}:{};if(t&&!e)throw new k;return await m({type:"query",query:n,options:{method:"POST",cache:"no-cache",variables:r},path:"cart",transformer:N})},zt=`
  query GET_CHECKOUT_AGREEMENTS {
    checkoutAgreements {
      agreement_id
      checkbox_text
      content
      content_height
      is_html
      mode
      name
    }
  }
`,Hn=async()=>await m({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:zt,transformer:Je,type:"query"}),Xt=`
  query getCompanyCredit {
    company {
      credit {
        exceed_limit
        available_credit {
          value
          currency
        }
      }
    }
  }
`,zn=async()=>await m({type:"query",query:Xt,options:{method:"GET",cache:"no-cache"},path:"company.credit",transformer:Ke,defaultValueOnFail:null}),Kt=`
  query getCustomer {
    customer {
      ...CUSTOMER_FRAGMENT
    }
  }

  ${Ue}
`,Xn=async()=>s.authenticated?await m({options:{method:"GET",cache:"no-cache"},path:"customer",query:Kt,transformer:Ze,type:"query"}):null,Yt=`
  query getNegotiableQuote($quoteId: ID!) {
    negotiableQuote(uid: $quoteId) {
      ...NEGOTIABLE_QUOTE_FRAGMENT
    }
  }

  ${T}
`,Ce=async(e={})=>{const t=e.uid??s.quoteId;if(s.authenticated===!1)throw new fe;if(!t)throw new Ot;return await m({type:"query",query:Yt,options:{method:"GET",cache:"no-cache",variables:{quoteId:t}},path:"negotiableQuote",transformer:w})},R={eager:!0},Wt=e=>{var a,g;const t=((g=(a=e==null?void 0:e.features)==null?void 0:a.b2b)==null?void 0:g.quotes)??!1;return[["authenticated",(u=!1)=>{var l,c,d;if(Qe(u),!t||u)return;const p=(d=(c=(l=e==null?void 0:e.features)==null?void 0:l.b2b)==null?void 0:c.routeLogin)==null?void 0:d.call(c);p&&window.location.assign(p)},R],...t?[["quote-management/quote-data/initialized",u=>{var p,l,c,d;if(!u.quote.canCheckout){const f=((d=(c=(l=(p=e==null?void 0:e.langDefinitions)==null?void 0:p.default)==null?void 0:l.Checkout)==null?void 0:c.Quote)==null?void 0:d.permissionDenied)||"You do not have permission to checkout with this quote.";h.emit("checkout/error",{message:f,code:v.QUOTE_PERMISSION_DENIED});return}L(u.quote)},R],["quote-management/quote-data/error",()=>{var p,l,c,d;const u=((d=(c=(l=(p=e==null?void 0:e.langDefinitions)==null?void 0:p.default)==null?void 0:l.Checkout)==null?void 0:c.Quote)==null?void 0:d.dataError)||"We were unable to retrieve the quote data. Please try again later.";h.emit("checkout/error",{message:u,code:v.QUOTE_DATA_ERROR})}]]:[["cart/initialized",L,R],["cart/reset",be],["cart/updated",Te],["auth/permissions",u=>{var p,l,c,d;if(u.admin!==!0&&!u["Magento_Sales::place_order"]){const f=((d=(c=(l=(p=e==null?void 0:e.langDefinitions)==null?void 0:p.default)==null?void 0:l.Checkout)==null?void 0:c.ServerError)==null?void 0:d.permissionDenied)||"You do not have permission to complete checkout. Please contact your administrator for assistance.";h.emit("checkout/error",{message:f,code:v.PERMISSION_DENIED})}},R]]].map(([u,p,l])=>h.on(u,p,l))},Jt=new URL(window.location.href),Zt=Jt.searchParams.get("quoteId");s.quoteId=Zt;const Me=new qe({init:async(e={})=>{Me.config.setConfig(we({defaults:{isBillToShipping:!0,selectedShippingMethod:t=>t.length>0?t[0]:null},features:{b2b:{quotes:!1}}},e))},listeners:Wt}),$=Me.config,Se=e=>"id"in e,en=async e=>{try{return Se(e)?(s.cartId=e.id,s.quoteId=null,await Ee()??null):(s.cartId=null,s.quoteId=e.uid,await Ce()??null)}catch(t){return console.error("Checkout initialization failed:",t),null}},L=async e=>{if(s.initialized){await Te(e);return}s.config||(s.config=await Lt());const t=e?await en(e):null;s.initialized=!0,h.emit("checkout/initialized",t)},tn=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,Kn=async e=>{if(!e)throw new vt;return await m({options:{method:"GET",cache:"no-cache",variables:{email:e}},path:"isEmailAvailable",query:tn,transformer:et,type:"query"})},be=()=>{s.initialized&&(s.cartId=null,s.quoteId=null,h.emit("checkout/updated",null))},nn=`
  mutation setBillingAddress(
    $cartId: String!
    $billingAddress: BillingAddressInput!
  ) {
    setBillingAddressOnCart(
      input: { cart_id: $cartId, billing_address: $billingAddress }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${y}
`,rn=`
  mutation setBillingAddressOnQuote(
    $quoteId: ID!
    $billingAddress: NegotiableQuoteBillingAddressInput!
  ) {
    setNegotiableQuoteBillingAddress(
      input: { quote_uid: $quoteId, billing_address: $billingAddress }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${T}
`,P=()=>{const{cartId:e,quoteId:t}=s;if(!e&&!t)throw new Nt},Y=(e,t,n,r,i,o)=>async a=>await m({type:"mutation",query:n,options:{variables:{[t]:e,billingAddress:i(a)}},path:o,queueName:E.Updates,transformer:r}),sn=({address:e,customerAddressId:t,customerAddressUid:n,sameAsShipping:r=!1})=>{if(!t&&n)throw new I("customerAddressUid is not supported");if(!r&&!t&&!e)throw new Ie},on=({address:e,customerAddressId:t,customerAddressUid:n,sameAsShipping:r=!1})=>{if(!n&&t)throw new I("customerAddressId is not supported");if(!r&&!n&&!e)throw new Ie},an=e=>{const t=!!s.cartId,n=!!s.quoteId;t?sn(e):n&&on(e)},Yn=async e=>(P(),an(e),await(!!s.cartId?Y(s.cartId,"cartId",nn,N,je,"setBillingAddressOnCart.cart"):Y(s.quoteId,"quoteId",rn,w,Ve,"setNegotiableQuoteBillingAddress.quote"))(e)),un=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${y}
`,Wn=async e=>{const t=s.cartId;if(!t)throw new k;return await m({options:{variables:{cartId:t,email:e}},path:"setGuestEmailOnCart.cart",query:un,queueName:E.Updates,transformer:N,type:"mutation"})},cn=`
  mutation setPaymentMethodOnCart(
    $cartId: String!
    $input: PaymentMethodInput!
  ) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: $input }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${y}
`,ln=`
  mutation setPaymentMethodOnQuote(
    $quoteId: ID!
    $input: NegotiableQuotePaymentMethodInput!
  ) {
    setNegotiableQuotePaymentMethod(
      input: { quote_uid: $quoteId, payment_method: $input }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${T}
`,W=(e,t,n,r,i,o)=>async a=>await m({type:"mutation",query:n,options:{variables:{[t]:e,input:i(a)}},path:o,queueName:E.Updates,transformer:r}),dn=e=>{if(!e.code)throw new qt},Jn=async e=>(P(),dn(e),await(!!s.cartId?W(s.cartId,"cartId",cn,N,Pe,"setPaymentMethodOnCart.cart"):W(s.quoteId,"quoteId",ln,w,xe,"setNegotiableQuotePaymentMethod.quote"))(e)),pn=`
  mutation setShippingAddressOnCartAndUseAsBilling(
    $cartId: String!
    $shippingAddress: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddress] }
    ) {
      cart {
        id
      }
    }

    setBillingAddressOnCart(
      input: { cart_id: $cartId, billing_address: { same_as_shipping: true } }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${y}
`,hn=`
  mutation setShippingAddressOnCart(
    $cartId: String!
    $shippingAddress: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddress] }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${y}
`,mn=`
  mutation setShippingAddressOnQuote(
    $quoteId: ID!
    $shippingAddress: NegotiableQuoteShippingAddressInput!
  ) {
    setNegotiableQuoteShippingAddress(
      input: { quote_uid: $quoteId, shipping_addresses: [$shippingAddress] }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${T}
`,gn=`
  mutation setShippingAddressOnQuoteAndUseAsBilling(
    $quoteId: ID!
    $shippingAddress: NegotiableQuoteShippingAddressInput!
  ) {
    setNegotiableQuoteShippingAddress(
      input: { quote_uid: $quoteId, shipping_addresses: [$shippingAddress] }
    ) {
      quote {
        uid
      }
    }

    setNegotiableQuoteBillingAddress(
      input: {
        quote_uid: $quoteId
        billing_address: { same_as_shipping: true }
      }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${T}
`,fn=({address:e,customerAddressId:t,customerAddressUid:n,pickupLocationCode:r})=>{if(!t&&n)throw new I("customerAddressUid is not supported");if(!t&&!r&&!e)throw new _e},_n=({address:e,customerAddressId:t,customerAddressUid:n,pickupLocationCode:r})=>{if(r)throw new I("pickup location is not supported in quotes");if(!n&&t)throw new I("customerAddressId is not supported in quotes");if(!n&&!e)throw new _e},In=e=>{const t=!!s.cartId,n=!!s.quoteId;t?fn(e):n&&_n(e)},J=(e,t,n,r,i,o)=>async a=>await m({type:"mutation",query:n,options:{variables:{[t]:e,shippingAddress:i(a)}},path:o,queueName:E.Updates,transformer:r}),Zn=async e=>{P(),In(e);const{defaults:t}=$.getConfig(),n=Ae("isBillToShipping")??(t==null?void 0:t.isBillToShipping);return await(!!s.cartId?J(s.cartId,"cartId",n?pn:hn,N,Fe,n?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart"):J(s.quoteId,"quoteId",n?gn:mn,w,ke,n?"setNegotiableQuoteBillingAddress.quote":"setNegotiableQuoteShippingAddress.quote"))(e)},yn=`
  mutation setShippingMethodsOnCart(
    $cartId: String!
    $shippingMethods: [ShippingMethodInput]!
  ) {
    setShippingMethodsOnCart(
      input: { cart_id: $cartId, shipping_methods: $shippingMethods }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${y}
`,An=`
  mutation setShippingMethodsOnQuote(
    $quoteId: ID!
    $shippingMethods: [ShippingMethodInput]!
  ) {
    setNegotiableQuoteShippingMethods(
      input: { quote_uid: $quoteId, shipping_methods: $shippingMethods }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${T}
`,Z=(e,t,n,r,i)=>async o=>await m({type:"mutation",query:n,queueName:E.Updates,options:{variables:{[t]:e,shippingMethods:Le(o)}},path:i,transformer:r}),En=e=>{if(!Array.isArray(e)||e.length===0)throw new wt},er=async e=>(P(),En(e),await(!!s.cartId?Z(s.cartId,"cartId",yn,N,"setShippingMethodsOnCart.cart"):Z(s.quoteId,"quoteId",An,w,"setNegotiableQuoteShippingMethods.quote"))(e)),Cn=async e=>{try{return Se(e)?(s.cartId=e.id,s.quoteId=null,await Ee()??null):(s.cartId=null,s.quoteId=e.uid,await Ce()??null)}catch(t){return console.error("Checkout synchronization failed:",t),null}},Te=async e=>{if(!s.initialized)return L(e);if(e===null){be();return}const t=await Cn(e);h.emit("checkout/updated",t)};export{ae as A,Bt as DEFAULT_COUNTRY,v as E,B as STORE_CONFIG_DEFAULTS,M as T,qn as a,Qe as authenticateCustomer,wn as b,Un as c,$ as config,Ae as d,Rn as e,Bn as estimateShippingMethods,Dn as f,jt as fetchGraphQl,Gt as g,Ee as getCart,Hn as getCheckoutAgreements,zn as getCompanyCredit,Vn as getConfig,Xn as getCustomer,Ce as getNegotiableQuote,Lt as getStoreConfig,xn as getStoreConfigCache,Gn as h,On as i,Me as initialize,L as initializeCheckout,Kn as isEmailAvailable,vn as j,ye as k,de as l,$n as m,Pn as n,kn as removeFetchGraphQlHeader,be as resetCheckout,s,Yn as setBillingAddress,Ln as setEndpoint,Fn as setFetchGraphQlHeader,jn as setFetchGraphQlHeaders,Wn as setGuestEmailOnCart,Jn as setPaymentMethod,Zn as setShippingAddress,er as setShippingMethods,er as setShippingMethodsOnCart,Te as synchronizeCheckout,It as t,Qn as v};
//# sourceMappingURL=api.js.map
