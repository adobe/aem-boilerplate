/*! Copyright 2024 Adobe
All Rights Reserved. */
import{t as _,a as f,b as h}from"./chunks/synchronizeCheckout.js";import{d as k,c as z,g as Q,e as R,i as K,f as P,r as j,s as L}from"./chunks/synchronizeCheckout.js";import{s as l,M as m,a as A,d as p,b as C}from"./chunks/fetch-graphql.js";import{D as J,F as V,I as W,f as X,c as Z,e as tt,S as st,U as et,j as it,k as at,l as rt,r as nt,g as ot,h as pt,i as dt}from"./chunks/fetch-graphql.js";import{d as S,i as y}from"./chunks/store-config.js";import"./chunks/ServerErrorSignal.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{i as gt,s as ht}from"./chunks/setGuestEmailOnCart.js";import{a as M}from"./chunks/setBillingAddress.js";import{s as mt}from"./chunks/setBillingAddress.js";import{s as _t}from"./chunks/setPaymentMethod.js";import{CHECKOUT_DATA_FRAGMENT as I}from"./fragments.js";import{s as At}from"./chunks/setShippingMethods.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/signals.js";const T=`
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
`,N=async a=>{var g;const s=l.cartId,{criteria:r}=a||{},{country_code:e,region_id:t,region_name:i,zip:n}=r||{},o=e||((g=S.value.data)==null?void 0:g.defaultCountry);if(!s)throw new m;if(!o)throw new A;const d=typeof t=="string"?parseInt(t,10):t,c=t||i?{...d&&{region_id:d},...i&&{region_code:i}}:void 0,u={country_code:o,...n&&{postcode:n},...c&&{region:c}};return await p({type:"mutation",query:T,options:{variables:{cartId:s,address:u}},path:"estimateShippingMethods",signalType:"estimateShippingMethods",transformer:_})},E=`
  mutation setShippingAddress($input: SetShippingAddressesOnCartInput!) {
    setShippingAddressesOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${I}
`,q=async({address:a,customerAddressId:s,pickupLocationCode:r})=>{const e=l.cartId;if(!e)throw new m;const t={cart_id:e,shipping_addresses:[]};if(s)t.shipping_addresses.push({customer_address_id:s});else if(r)t.shipping_addresses.push({pickup_location_code:r});else{if(!a)throw new C;t.shipping_addresses.push({address:f(a)})}const i=await p({type:"mutation",query:E,options:{variables:{input:t}},path:"setShippingAddressesOnCart.cart",queueName:"cartUpdate",signalType:"cart",transformer:h});return y.value?await p({type:"mutation",query:M,options:{variables:{input:{cart_id:e,billing_address:{same_as_shipping:!0}}}},path:"setBillingAddressOnCart.cart",queueName:"cartUpdate",signalType:"cart",transformer:h}):i};export{J as DEFAULT_COUNTRY,V as FetchError,W as InvalidArgument,X as MissingBillingAddress,m as MissingCart,A as MissingCountry,Z as MissingEmail,tt as MissingPaymentMethod,C as MissingShippinghAddress,st as STORE_CONFIG_DEFAULTS,et as UnexpectedError,k as authenticateCustomer,z as config,N as estimateShippingMethods,it as fetchGraphQl,Q as getCart,at as getConfig,R as getCustomer,rt as getStoreConfig,K as initialize,P as initializeCheckout,gt as isEmailAvailable,nt as removeFetchGraphQlHeader,j as resetCheckout,mt as setBillingAddress,ot as setEndpoint,pt as setFetchGraphQlHeader,dt as setFetchGraphQlHeaders,ht as setGuestEmailOnCart,_t as setPaymentMethod,q as setShippingAddress,At as setShippingMethodsOnCart,L as synchronizeCheckout};
