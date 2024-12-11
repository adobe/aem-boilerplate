/*! Copyright 2024 Adobe
All Rights Reserved. */
import{d as p,t as f,a as _,b as m}from"./chunks/synchronizeCheckout.js";import{e as k,c as z,g as Q,f as R,i as K,h as P,r as j,s as L}from"./chunks/synchronizeCheckout.js";import{M as l,a as A,b as C}from"./chunks/errors.js";import{F as J,I as V,e as W,c as X,d as Z,U as tt}from"./chunks/errors.js";import{s as d}from"./chunks/store-config.js";import{g as et}from"./chunks/store-config.js";import{i as S}from"./chunks/transform-store-config.js";import{D as rt,S as at,h as nt,j as ot,k as pt,r as dt,d as ct,f as gt,g as ht}from"./chunks/transform-store-config.js";import"./chunks/ServerErrorSignal.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{i as lt,s as ut}from"./chunks/setGuestEmailOnCart.js";import{a as y}from"./chunks/setBillingAddress.js";import{s as _t}from"./chunks/setBillingAddress.js";import{s as Ct}from"./chunks/setPaymentMethod.js";import{CHECKOUT_DATA_FRAGMENT as M}from"./fragments.js";import{s as yt}from"./chunks/setShippingMethods.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const I=`
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
`,N=async r=>{var h;const s=d.cartId,{criteria:a}=r||{},{country_code:e,region_id:t,region_name:i,zip:n}=a||{},o=e||((h=d.config)==null?void 0:h.defaultCountry);if(!s)throw new l;if(!o)throw new A;const c=typeof t=="string"?parseInt(t,10):t,g=t||i?{...c&&{region_id:c},...i&&{region_code:i}}:void 0,u={country_code:o,...n&&{postcode:n},...g&&{region:g}};return await p({type:"mutation",query:I,options:{variables:{cartId:s,address:u}},path:"estimateShippingMethods",signalType:"estimateShippingMethods",transformer:f})},T=`
  mutation setShippingAddress($input: SetShippingAddressesOnCartInput!) {
    setShippingAddressesOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${M}
`,q=async({address:r,customerAddressId:s,pickupLocationCode:a})=>{const e=d.cartId;if(!e)throw new l;const t={cart_id:e,shipping_addresses:[]};if(s)t.shipping_addresses.push({customer_address_id:s});else if(a)t.shipping_addresses.push({pickup_location_code:a});else{if(!r)throw new C;t.shipping_addresses.push({address:_(r)})}const i=await p({type:"mutation",query:T,options:{variables:{input:t}},path:"setShippingAddressesOnCart.cart",queueName:"cartUpdate",signalType:"cart",transformer:m});return S.value?await p({type:"mutation",query:y,options:{variables:{input:{cart_id:e,billing_address:{same_as_shipping:!0}}}},path:"setBillingAddressOnCart.cart",queueName:"cartUpdate",signalType:"cart",transformer:m}):i};export{rt as DEFAULT_COUNTRY,J as FetchError,V as InvalidArgument,W as MissingBillingAddress,l as MissingCart,A as MissingCountry,X as MissingEmail,Z as MissingPaymentMethod,C as MissingShippinghAddress,at as STORE_CONFIG_DEFAULTS,tt as UnexpectedError,k as authenticateCustomer,z as config,N as estimateShippingMethods,nt as fetchGraphQl,Q as getCart,ot as getConfig,R as getCustomer,pt as getStoreConfig,et as getStoreConfigCache,K as initialize,P as initializeCheckout,lt as isEmailAvailable,dt as removeFetchGraphQlHeader,j as resetCheckout,_t as setBillingAddress,ct as setEndpoint,gt as setFetchGraphQlHeader,ht as setFetchGraphQlHeaders,ut as setGuestEmailOnCart,Ct as setPaymentMethod,q as setShippingAddress,yt as setShippingMethodsOnCart,L as synchronizeCheckout};
