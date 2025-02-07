/*! Copyright 2025 Adobe
All Rights Reserved. */
import{d as l,t as M,a as T,b as E}from"./chunks/synchronizeCheckout.js";import{e as Y,c as J,g as V,f as W,i as X,h as Z,r as tt,s as st}from"./chunks/synchronizeCheckout.js";import{M as A,a as y,b as O}from"./chunks/errors.js";import{F as it,I as rt,e as at,c as nt,d as ot,U as pt}from"./chunks/errors.js";import{s as d}from"./chunks/store-config.js";import{g as ct}from"./chunks/store-config.js";import{s as $,i as _}from"./chunks/transform-store-config.js";import{D as ht,S as mt,j as ut,k as _t,l as lt,r as At,f as St,g as ft,h as Ct}from"./chunks/transform-store-config.js";import"@dropins/tools/lib.js";import{a as v,t as N}from"./chunks/setShippingMethods.js";import{s as Mt}from"./chunks/setShippingMethods.js";import{events as x}from"@dropins/tools/event-bus.js";import{i as Et,s as yt}from"./chunks/setGuestEmailOnCart.js";import{s as $t}from"./chunks/setBillingAddress.js";import{s as Nt}from"./chunks/setPaymentMethod.js";import{CHECKOUT_DATA_FRAGMENT as S}from"./fragments.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const U=`
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
`,q=async r=>{var h,m,u;const s=d.cartId,{criteria:a}=r||{},{country_code:n,region_id:t,region_name:e,zip:o}=a||{},p=n||((h=d.config)==null?void 0:h.defaultCountry);if(!s)throw new A;if(!p)throw new y;const c=typeof t=="string"?parseInt(t,10):t,g=t||e?{...c&&{region_id:c},...e&&{region_code:e}}:void 0,i={country_code:p,...o&&{postcode:o},...g&&{region:g}},f={country_id:i.country_code,region:(m=i.region)==null?void 0:m.region_code,region_id:(u=i.region)==null?void 0:u.region_id,postcode:i.postcode},C=await l({type:"mutation",query:U,options:{variables:{cartId:s,address:i}},path:"estimateShippingMethods",signalType:"estimateShippingMethods",transformer:M});return setTimeout(()=>{const I={address:v(f),shippingMethod:N($.value)};x.emit("shipping/estimate",I)},0),C},D=`
  mutation SET_SHIPPING_ADDRESS_ON_CART_MUTATION(
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

  ${S}
`,G=`
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

  ${S}
`,K=async({address:r,customerAddressId:s,pickupLocationCode:a})=>{const n=d.cartId;if(!n)throw new A;const t=()=>{if(s)return{customer_address_id:s};if(a)return{pickup_location_code:a};if(!r)throw new O;return{address:T(r)}},e=_.value?G:D,o=_.value?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart",p={cartId:n,shippingAddressInput:t()};return await l({type:"mutation",query:e,options:{variables:p},path:o,queueName:"cartUpdate",signalType:"cart",transformer:E})};export{ht as DEFAULT_COUNTRY,it as FetchError,rt as InvalidArgument,at as MissingBillingAddress,A as MissingCart,y as MissingCountry,nt as MissingEmail,ot as MissingPaymentMethod,O as MissingShippinghAddress,mt as STORE_CONFIG_DEFAULTS,pt as UnexpectedError,Y as authenticateCustomer,J as config,q as estimateShippingMethods,ut as fetchGraphQl,V as getCart,_t as getConfig,W as getCustomer,lt as getStoreConfig,ct as getStoreConfigCache,X as initialize,Z as initializeCheckout,Et as isEmailAvailable,At as removeFetchGraphQlHeader,tt as resetCheckout,$t as setBillingAddress,St as setEndpoint,ft as setFetchGraphQlHeader,Ct as setFetchGraphQlHeaders,yt as setGuestEmailOnCart,Nt as setPaymentMethod,K as setShippingAddress,Mt as setShippingMethodsOnCart,st as synchronizeCheckout};
