/*! Copyright 2024 Adobe
All Rights Reserved. */
import{b as _,a as f,t as g}from"./chunks/synchronizeCheckout.js";import{c as N,e as Q,g as R,d as q,i as K,f as P,r as j,s as L}from"./chunks/synchronizeCheckout.js";import{M as m,c as C,d as o,e as S}from"./chunks/fetch-graphql.js";import{D as J,F as V,I as W,b as X,f as Z,a as tt,S as st,U as et,i as it,j as rt,k as at,r as nt,s as ot,g as pt,h as dt}from"./chunks/fetch-graphql.js";import{s as l,a as A,i as y}from"./chunks/store-config.js";import"./chunks/ServerErrorSignal.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import{i as ht}from"./chunks/isEmailAvailable.js";import{p as mt}from"./chunks/placeOrder2.js";import{a as M}from"./chunks/setBillingAddress.js";import{s as ut}from"./chunks/setBillingAddress.js";import{s as ft}from"./chunks/setGuestEmailOnCart.js";import{s as St}from"./chunks/setPaymentMethod.js";import{CHECKOUT_DATA_FRAGMENT as I}from"./fragments.js";import{s as yt}from"./chunks/setShippingMethods.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/signals.js";const T=`
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
`,D=async r=>{var h;const s=l.cartId,{criteria:a}=r||{},{country_code:e,region_id:t,region_name:i,zip:n}=a||{},p=e||((h=A.value.data)==null?void 0:h.defaultCountry);if(!s)throw new m;if(!p)throw new C;const d=typeof t=="string"?parseInt(t,10):t,c=t||i?{...d&&{region_id:d},...i&&{region_code:i}}:void 0,u={country_code:p,...n&&{postcode:n},...c&&{region:c}};return await o({type:"mutation",query:T,options:{variables:{cartId:s,address:u}},path:"estimateShippingMethods",signalType:"estimateShippingMethods",transformer:_})},E=`
  mutation setShippingAddress($input: SetShippingAddressesOnCartInput!) {
    setShippingAddressesOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${I}
`,H=async({address:r,customerAddressId:s,pickupLocationCode:a})=>{const e=l.cartId;if(!e)throw new m;const t={cart_id:e,shipping_addresses:[]};if(s)t.shipping_addresses.push({customer_address_id:s});else if(a)t.shipping_addresses.push({pickup_location_code:a});else{if(!r)throw new S;t.shipping_addresses.push({address:f(r)})}const i=await o({type:"mutation",query:E,options:{variables:{input:t}},path:"setShippingAddressesOnCart.cart",signalType:"cart",transformer:g});return y.value?await o({type:"mutation",query:M,options:{variables:{input:{cart_id:e,billing_address:{same_as_shipping:!0}}}},path:"setBillingAddressOnCart.cart",signalType:"cart",transformer:g}):i};export{J as DEFAULT_COUNTRY,V as FetchError,W as InvalidArgument,X as MissingBillingAddress,m as MissingCart,C as MissingCountry,Z as MissingEmail,tt as MissingPaymentMethod,S as MissingShippinghAddress,st as STORE_CONFIG_DEFAULTS,et as UnexpectedError,N as authenticateCustomer,Q as config,D as estimateShippingMethods,it as fetchGraphQl,R as getCart,rt as getConfig,q as getCustomer,at as getStoreConfig,K as initialize,P as initializeCheckout,ht as isEmailAvailable,mt as placeOrder,nt as removeFetchGraphQlHeader,j as resetCheckout,ut as setBillingAddress,ot as setEndpoint,pt as setFetchGraphQlHeader,dt as setFetchGraphQlHeaders,ft as setGuestEmailOnCart,St as setPaymentMethod,H as setShippingAddress,yt as setShippingMethodsOnCart,L as synchronizeCheckout};
