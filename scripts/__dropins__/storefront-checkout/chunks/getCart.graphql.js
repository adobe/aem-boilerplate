import{events as b}from"@dropins/tools/event-bus.js";import{signal as o,effect as S}from"@dropins/tools/signals.js";import{FetchGraphQL as N}from"@dropins/tools/fetch-graphql.js";class G extends Error{constructor(t){super(t.map(s=>s.message).join(" ")),this.name="FetchError"}}class p extends Error{constructor(t){super(t),this.name="InvalidArgument"}}class _e extends Error{constructor(t){super(t),this.name="UnexpectedError"}}class fe extends p{constructor(){super("Cart ID is required")}}class he extends p{constructor(){super("Email is required")}}class ge extends p{constructor(){super("Payment method code is required")}}class me extends p{constructor(){super("Billing address is required")}}class ve extends p{constructor(){super("Country Code is required")}}const m=[];function L(e){return new Promise((t,s)=>{m.push(e);const r=()=>{m[0]===e?e().then(t).catch(s).finally(()=>m.shift()):setTimeout(r,100)};r()})}const R=["sender_email","recipient_email"];function O(e){return e.filter(t=>!t.path||!R.some(s=>{var r;return((r=t.path)==null?void 0:r.at(-1))===s}))}const T=e=>{throw e instanceof DOMException&&e.name==="AbortError"||b.emit("error",{source:"checkout",type:"network",error:e}),e},U=o({data:void 0,pending:!1}),q=o({checked:!0,setByUser:!1}),h=o({pending:!1,data:void 0});S(()=>{var e;(e=h.value.data)!=null&&e.isVirtual&&(q.value={checked:!1,setByUser:!1})});S(()=>{h.value.pending||b.emit("checkout/data",h.value.data||null)});const X=o({data:void 0,pending:!1}),P=o({pending:!1,data:void 0}),k=o({pending:!1,data:void 0}),w=o({pending:!1,data:void 0}),ye=o(void 0),F=o({data:void 0,pending:!1}),H={cart:h,customer:P,estimateShippingMethods:k,regions:w,storeConfig:F,countryList:X,addressFormFields:U};function B(e,t){return t.split(".").reduce((s,r)=>s&&s[r]!==void 0?s[r]:void 0,e)}const E={cart:null,customer:null,estimateShippingMethods:null,regions:null,storeConfig:null,countryList:null,addressFormFields:null};async function W(e){const{defaultValueOnFail:t,query:s,options:r,path:n,signalType:d,type:g,transformer:_}=e,a=H[d],v=Symbol();E[d]=v,a.value={...a.value,pending:!0};try{const{data:f,errors:y}=await(g==="mutation"?L(()=>I(s,r).catch(T)):I(s,{method:"GET",cache:"no-cache",...r}).catch(T));if(y){const C=O(y);if(C.length>0)throw new G(C)}let u=B(f,n);if(u===void 0)throw new Error(`No data found at path: ${n}`);return _&&(u=_(u)),a.value={...a.value,data:u},setTimeout(()=>{a.value={...a.value,pending:E[d]===v?!1:a.value.pending}},0),u}catch(f){if(t)return a.value={pending:!1,data:t},t;if(f.name==="AbortError")return;throw a.value={...a.value,pending:!1},f}}const Q={cartId:null,authenticated:!1},Ce=new Proxy(Q,{set(e,t,s){return e[t]=s,!0},get(e,t){return e[t]}}),$=e=>{if(e)return{code:e.code,title:e.title}},V=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:s,title:r}=t;return{code:s,title:r}})},Z=e=>e==null,j=(e,t)=>e.amount.value-t.amount.value,x=e=>!(!e||!e.method_code||!e.method_title||Z(e.amount.value)||!e.amount.currency),D=e=>({amount:{value:e.amount.value,currency:e.amount.currency},title:e.method_title,code:e.method_code,carrier:{code:e.carrier_code,title:e.carrier_title},value:`${e.carrier_code} - ${e.method_code}`,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}}}),z=e=>{if(x(e))return D(e)},Y=e=>{if(e)return e.filter(x).map(t=>D(t)).sort(j)},K=e=>e?!!e.code&&!!e.label:!1,J=e=>{if(!K(e))return;const{code:t,label:s,region_id:r}=e;return r?{code:t,name:s,id:r}:{code:t,name:s}},ee=e=>{const{code:t,label:s}=e;return{value:t,label:s}},te=e=>e?"code"in e&&"value"in e:!1,se=e=>e.filter(te).map(t=>{const{code:s,value:r}=t;return{code:s,value:r}}),A=e=>{const t=e.street.filter(Boolean);return{firstName:e.firstname,lastName:e.lastname,company:e.company||void 0,city:e.city,street:t,postCode:e.postcode||void 0,vatId:e.vat_id||void 0,telephone:e.telephone||void 0,region:J(e.region),country:ee(e.country),customAttributes:se(e.custom_attributes)}},re=e=>{if(e)return A(e)},ie=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:s,selected_shipping_method:r,...n}=t;return{...A(n),availableShippingMethods:Y(s),selectedShippingMethod:z(r)}}),Te=e=>({availablePaymentMethods:V(e.available_payment_methods),billingAddress:re(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:$(e.selected_payment_method),shippingAddresses:ie(e.shipping_addresses)}),ae=`
  query getStoreConfig {
    storeConfig {
      countries_with_required_region
      default_country
      display_state_if_optional
      is_guest_checkout_enabled
      is_one_page_checkout_enabled
      locale
      optional_zip_countries
      shopping_cart_display_shipping
      store_code
    }
  }
`;var c=(e=>(e.EXCLUDING_TAX="EXCLUDING_TAX",e.INCLUDING_EXCLUDING_TAX="INCLUDING_AND_EXCLUDING_TAX",e.INCLUDING_TAX="INCLUDING_TAX",e))(c||{});const oe="US",l={defaultCountry:oe,countriesWithRequiredRegion:[],displayStateIfOptional:!1,countriesWithOptionalZipCode:[],isGuestCheckoutEnabled:!1,isOnePageCheckoutEnabled:!1,shoppingCartDisplaySetting:{shipping:c.EXCLUDING_TAX}},Ee=async()=>await W({type:"query",query:ae,options:{method:"GET",cache:"no-cache"},path:"storeConfig",signalType:"storeConfig",transformer:le,defaultValueOnFail:l});function ne(e){switch(e){case 1:return c.EXCLUDING_TAX;case 2:return c.INCLUDING_TAX;case 3:return c.INCLUDING_EXCLUDING_TAX;default:return c.EXCLUDING_TAX}}function le(e){if(!e)return l;const{default_country:t,countries_with_required_region:s,display_state_if_optional:r,optional_zip_countries:n,is_guest_checkout_enabled:d,is_one_page_checkout_enabled:g,shopping_cart_display_shipping:_}=e;return{defaultCountry:t||l.defaultCountry,countriesWithRequiredRegion:(s==null?void 0:s.split(","))||l.countriesWithRequiredRegion,displayStateIfOptional:r||l.displayStateIfOptional,countriesWithOptionalZipCode:(n==null?void 0:n.split(","))||l.countriesWithOptionalZipCode,isGuestCheckoutEnabled:d||l.isGuestCheckoutEnabled,isOnePageCheckoutEnabled:g||l.isOnePageCheckoutEnabled,shoppingCartDisplaySetting:{shipping:ne(_)}}}const{setEndpoint:Ie,setFetchGraphQlHeader:be,removeFetchGraphQlHeader:Se,setFetchGraphQlHeaders:xe,fetchGraphQl:I,getConfig:De}=new N().getMethods();var i=(e=>(e.Boolean="BOOLEAN",e.Date="DATE",e.Datetime="DATETIME",e.File="FILE",e.Gallery="GALLERY",e.Hidden="HIDDEN",e.Image="IMAGE",e.MediaImage="MEDIA_IMAGE",e.Multiline="MULTILINE",e.Multiselect="MULTISELECT",e.Price="PRICE",e.Select="SELECT",e.Text="TEXT",e.Textarea="TEXTAREA",e.Undefined="UNDEFINED",e.Weight="WEIGHT",e))(i||{}),ce=(e=>(e.DateRangeMax="DATE_RANGE_MAX",e.DateRangeMin="DATE_RANGE_MIN",e.FileExtensions="FILE_EXTENSIONS",e.InputValidation="INPUT_VALIDATION",e.MaxFileSize="MAX_FILE_SIZE",e.MaxImageHeight="MAX_IMAGE_HEIGHT",e.MaxImageWidth="MAX_IMAGE_WIDTH",e.MaxTextLength="MAX_TEXT_LENGTH",e.MinTextLength="MIN_TEXT_LENGTH",e))(ce||{});const Ae=[{frontendInput:i.Text,code:"firstname",label:"First Name",isRequired:!0,isDisabled:!1,options:[],validateRules:[],sortOrder:10},{frontendInput:i.Text,code:"lastname",label:"Last Name",isRequired:!0,isDisabled:!1,options:[],validateRules:[],sortOrder:20},{frontendInput:i.Text,code:"company",label:"Company",isRequired:!1,isDisabled:!1,options:[],validateRules:[],sortOrder:30},{frontendInput:i.Multiline,code:"street",label:"Street Address",isRequired:!0,isDisabled:!1,options:[],validateRules:[],sortOrder:40},{frontendInput:i.Text,code:"city",label:"City",isRequired:!0,isDisabled:!1,options:[],validateRules:[],sortOrder:50},{frontendInput:i.Select,code:"country_id",label:"Country",isRequired:!0,isDisabled:!1,options:[{text:"United States",value:"US"},{text:"Spain",value:"ES"},{text:"France",value:"FR"}],validateRules:[],sortOrder:60},{frontendInput:i.Text,code:"region",label:"State/Province",isRequired:!1,isDisabled:!1,options:[],validateRules:[],sortOrder:70},{frontendInput:i.Hidden,code:"region_id",label:"State/Province",isRequired:!1,isDisabled:!1,options:[],validateRules:[],sortOrder:80},{frontendInput:i.Text,code:"postcode",label:"Zip/Postal Code",isRequired:!1,isDisabled:!1,options:[],validateRules:[],sortOrder:90},{frontendInput:i.Text,code:"telephone",label:"Phone Number",isRequired:!0,isDisabled:!1,options:[],validateRules:[],sortOrder:100},{frontendInput:i.Text,code:"vat_id",label:"VAT Number",isRequired:!1,isDisabled:!1,options:[],validateRules:[],sortOrder:110}],M=`
  fragment CheckoutData on Cart {
    is_virtual
    email
    total_quantity
    billing_address {
      city
      country {
        code
        label
      }
      firstname
      lastname
      company
      postcode
      vat_id
      region {
        region_id
        code
        label
      }
      street
      telephone
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
      }
    }
    shipping_addresses {
      firstname
      lastname
      company
      street
      city
      postcode
      vat_id
      region {
        region_id
        code
        label
      }
      country {
        code
        label
      }
      telephone
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
      }
      available_shipping_methods {
        amount {
          currency
          value
        }
        available
        carrier_code
        carrier_title
        error_message
        method_code
        method_title
        price_excl_tax {
          value
          currency
        }
        price_incl_tax {
          value
          currency
        }
      }
      selected_shipping_method {
        amount {
          value
          currency
        }
        carrier_code
        carrier_title
        method_code
        method_title
        price_excl_tax {
          value
          currency
        }
        price_incl_tax {
          value
          currency
        }
      }
    }
    available_payment_methods {
      code
      title
    }
    selected_payment_method {
      code
      title
    }
  }
`,Me=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      ...CheckoutData
    }
  }
  ${M}
`,Ne=`
  query getCustomerCart {
    cart: customerCart {
      id
      ...CheckoutData
    }
  }
  ${M}
`;export{i as A,ye as B,M as C,oe as D,k as E,G as F,p as I,fe as M,l as S,c as T,_e as U,ce as V,he as a,ge as b,me as c,ve as d,be as e,xe as f,I as g,De as h,Ae as i,Ee as j,Ce as k,W as l,F as m,h as n,P as o,T as p,Me as q,Se as r,Ie as s,Te as t,Ne as u,q as v,U as w,Y as x,w as y,X as z};
