/*! Copyright 2025 Adobe
All Rights Reserved. */
import{t as S,a as f,b as E}from"./chunks/synchronizeCheckout.js";import{d as j,c as Y,g as J,i as W,e as X,r as Z,s as tt}from"./chunks/synchronizeCheckout.js";import{s as p,M as l,c as I,d as c,Q as A,a as M,e as T}from"./chunks/errors.js";import{D as st,F as it,I as rt,p as at,n as nt,o as ot,S as dt,U as pt,k as ct,l as gt,m as ht,g as mt,r as _t,f as ut,i as lt,j as At}from"./chunks/errors.js";import"@dropins/tools/lib.js";import{a as y}from"./chunks/setShippingMethods.js";import{s as St}from"./chunks/setShippingMethods.js";import"@dropins/tools/event-bus.js";import{A as O}from"./chunks/checkout.js";import{g as Et,i as It,s as Mt}from"./chunks/setGuestEmailOnCart.js";import{s as yt}from"./chunks/setBillingAddress.js";import{s as xt}from"./chunks/setPaymentMethod.js";import{CHECKOUT_DATA_FRAGMENT as C}from"./fragments.js";import{g as x}from"./chunks/values.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const G=`
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
`,N=e=>e?e.filter(t=>!!t).map(t=>({id:t.agreement_id,name:t.name,mode:O[t.mode],text:t.checkbox_text,content:{value:t.content,html:t.is_html,height:t.content_height??null}})):[],K=async e=>{var h,m,_,u;const t=p.cartId,r=((h=e==null?void 0:e.criteria)==null?void 0:h.country_code)??((m=p.config)==null?void 0:m.defaultCountry);if(!t)throw new l;if(!r)throw new I;const{region_id:s,region_name:o,zip:a}=(e==null?void 0:e.criteria)??{},i=s||o?{region_id:typeof s=="string"?parseInt(s,10):s,region_code:o}:void 0,n={country_code:r,...a&&{postcode:a},...i&&{region:{...i.region_id&&{region_id:i.region_id},...i.region_code&&{region_code:i.region_code}}}},d={country_id:r,region:(_=n.region)==null?void 0:_.region_code,region_id:(u=n.region)==null?void 0:u.region_id,postcode:a},g=await c({options:{variables:{cartId:t,address:n}},path:"estimateShippingMethods",query:G,queueName:A.ShippingEstimate,transformer:S,type:"mutation"});return M.value={address:y(d),options:g},g},$=`
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
`,P=async()=>await c({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:$,transformer:N,type:"query"}),U=`
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

  ${C}
`,v=`
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

  ${C}
`,z=async({address:e,customerAddressId:t,pickupLocationCode:r})=>{const s=p.cartId;if(!s)throw new l;const o=()=>{if(t)return{customer_address_id:t};if(r)return{pickup_location_code:r};if(!e)throw new T;return{address:f(e)}},a=x("isBillToShipping"),i=a?v:U,n=a?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart",d={cartId:s,shippingAddressInput:o()};return await c({type:"mutation",query:i,options:{variables:d},path:n,queueName:A.CartUpdate,transformer:E})};export{st as DEFAULT_COUNTRY,it as FetchError,rt as InvalidArgument,at as MissingBillingAddress,l as MissingCart,I as MissingCountry,nt as MissingEmail,ot as MissingPaymentMethod,T as MissingShippinghAddress,dt as STORE_CONFIG_DEFAULTS,pt as UnexpectedError,j as authenticateCustomer,Y as config,K as estimateShippingMethods,ct as fetchGraphQl,J as getCart,P as getCheckoutAgreements,gt as getConfig,Et as getCustomer,ht as getStoreConfig,mt as getStoreConfigCache,W as initialize,X as initializeCheckout,It as isEmailAvailable,_t as removeFetchGraphQlHeader,Z as resetCheckout,yt as setBillingAddress,ut as setEndpoint,lt as setFetchGraphQlHeader,At as setFetchGraphQlHeaders,Mt as setGuestEmailOnCart,xt as setPaymentMethod,z as setShippingAddress,St as setShippingMethodsOnCart,tt as synchronizeCheckout};
