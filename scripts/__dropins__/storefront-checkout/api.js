/*! Copyright 2025 Adobe
All Rights Reserved. */
import{t as v,a as N,b as $}from"./chunks/synchronizeCheckout.js";import{d as se,c as ie,g as re,i as ae,e as ne,r as oe,s as de}from"./chunks/synchronizeCheckout.js";import{s as h,M as E,b as U,d as g,Q as M,c as b}from"./chunks/errors.js";import{D as ce,F as he,I as ge,o as me,m as le,n as _e,S as ue,U as Ae,j as fe,k as Se,l as Ce,g as Ee,r as Me,e as Ie,f as Te,i as ye}from"./chunks/errors.js";import"@dropins/tools/lib.js";import{t as F,a as S}from"./chunks/setShippingMethods.js";import{s as xe}from"./chunks/setShippingMethods.js";import{events as C}from"@dropins/tools/event-bus.js";import{g as I}from"./chunks/values.js";import{A as w}from"./chunks/checkout.js";import{g as ve,i as Ne,s as $e}from"./chunks/setGuestEmailOnCart.js";import{s as be}from"./chunks/setBillingAddress.js";import{s as we}from"./chunks/setPaymentMethod.js";import{CHECKOUT_DATA_FRAGMENT as T}from"./fragments.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const k=`
  mutation estimateShippingMethods(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(input: { cart_id: $cartId, address: $address }) {
      carrier_title
      carrier_code
      method_title
      method_code
      available
      amount {
        currency
        value
      }
      price_excl_tax {
        currency
        value
      }
      price_incl_tax {
        currency
        value
      }
      error_message
    }
  }
`,D=t=>t?t.filter(e=>!!e).map(e=>({id:e.agreement_id,name:e.name,mode:w[e.mode],text:e.checkbox_text,content:{value:e.content,html:e.is_html,height:e.content_height??null}})):[],W=async t=>{var m,l,_,u;const e=h.cartId,a=((m=t==null?void 0:t.criteria)==null?void 0:m.country_code)??((l=h.config)==null?void 0:l.defaultCountry);if(!e)throw new E;if(!a)throw new U;const{region_id:s,region_name:p,zip:n}=(t==null?void 0:t.criteria)??{},i=s||p?{region_id:typeof s=="string"?parseInt(s,10):s,region_code:p}:void 0,d={country_code:a,...n&&{postcode:n},...i&&{region:{...i.region_id&&{region_id:i.region_id},...i.region_code&&{region_code:i.region_code}}}},c={country_id:a,region:(_=d.region)==null?void 0:_.region_code,region_id:(u=d.region)==null?void 0:u.region_id,postcode:n},y=S(c);return g({options:{variables:{cartId:e,address:d}},path:"estimateShippingMethods",query:k,queueName:M.ShippingEstimate,transformer:v,type:"mutation"}).then(r=>{const O=r.length>0,x=S(c);let A=null;if(O){const o=I("selectedShippingMethod"),G=r.find(f=>f.code===(o==null?void 0:o.code)&&f.carrier.code===(o==null?void 0:o.carrier.code));A=F(G??r[0])}return C.emit("shipping/estimate",{address:x,availableShippingMethods:r,shippingMethod:A,success:!0}),r}).catch(r=>{throw C.emit("shipping/estimate",{address:y,shippingMethod:null,availableShippingMethods:[],success:!1}),r})},H=`
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
`,X=async()=>await g({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:H,transformer:D,type:"query"}),R=`
  mutation setShippingAddress(
    $cartId: String!
    $shippingAddressInput: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddressInput] }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${T}
`,B=`
  mutation SET_SHIPPING_ADDRESS_ON_CART_AND_USE_AS_BILLING_MUTATION(
    $cartId: String!
    $shippingAddressInput: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddressInput] }
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

  ${T}
`,Z=async({address:t,customerAddressId:e,pickupLocationCode:a})=>{const s=h.cartId;if(!s)throw new E;const p=()=>{if(e)return{customer_address_id:e};if(a)return{pickup_location_code:a};if(!t)throw new b;return{address:N(t)}},n=I("isBillToShipping"),i=n?B:R,d=n?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart",c={cartId:s,shippingAddressInput:p()};return await g({type:"mutation",query:i,options:{variables:c},path:d,queueName:M.CartUpdate,transformer:$})};export{ce as DEFAULT_COUNTRY,he as FetchError,ge as InvalidArgument,me as MissingBillingAddress,E as MissingCart,U as MissingCountry,le as MissingEmail,_e as MissingPaymentMethod,b as MissingShippinghAddress,ue as STORE_CONFIG_DEFAULTS,Ae as UnexpectedError,se as authenticateCustomer,ie as config,W as estimateShippingMethods,fe as fetchGraphQl,re as getCart,X as getCheckoutAgreements,Se as getConfig,ve as getCustomer,Ce as getStoreConfig,Ee as getStoreConfigCache,ae as initialize,ne as initializeCheckout,Ne as isEmailAvailable,Me as removeFetchGraphQlHeader,oe as resetCheckout,be as setBillingAddress,Ie as setEndpoint,Te as setFetchGraphQlHeader,ye as setFetchGraphQlHeaders,$e as setGuestEmailOnCart,we as setPaymentMethod,Z as setShippingAddress,xe as setShippingMethodsOnCart,de as synchronizeCheckout};
