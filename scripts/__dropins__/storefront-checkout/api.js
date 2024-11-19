/*! Copyright 2024 Adobe
All Rights Reserved. */
import{t as _,a as A,b as g}from"./chunks/synchronizeCheckout.js";import{d as Q,c as R,g as q,e as K,i as P,f as j,r as L,s as Y}from"./chunks/synchronizeCheckout.js";import{s as m,M as u,a as C,d as p,b as S}from"./chunks/fetch-graphql.js";import{D as V,F as W,I as X,f as Z,c as tt,e as st,S as et,U as it,j as at,k as rt,l as nt,r as ot,g as pt,h as dt,i as ct}from"./chunks/fetch-graphql.js";import{a as y,i as M}from"./chunks/store-config.js";import"./chunks/ServerErrorSignal.js";import"@dropins/tools/lib.js";import{events as l}from"@dropins/tools/event-bus.js";import{i as gt}from"./chunks/isEmailAvailable.js";import{p as mt}from"./chunks/placeOrder2.js";import{a as I}from"./chunks/setBillingAddress.js";import{s as ft}from"./chunks/setBillingAddress.js";import{s as At}from"./chunks/setGuestEmailOnCart.js";import{s as St}from"./chunks/setPaymentMethod.js";import{CHECKOUT_DATA_FRAGMENT as T}from"./fragments.js";import{s as Mt}from"./chunks/setShippingMethods.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/signals.js";const v=`
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
`,D=async r=>{var h;const e=m.cartId,{criteria:n}=r||{},{country_code:i,region_id:t,region_name:s,zip:o}=n||{},a=i||((h=y.value.data)==null?void 0:h.defaultCountry);if(!e)throw new u;if(!a)throw new C;const d=typeof t=="string"?parseInt(t,10):t,c=t||s?{...d&&{region_id:d},...s&&{region_code:s}}:void 0,f={country_code:a,...o&&{postcode:o},...c&&{region:c}};return await p({type:"mutation",query:v,options:{variables:{cartId:e,address:f}},path:"estimateShippingMethods",signalType:"estimateShippingMethods",transformer:_})},E=`
  mutation setShippingAddress($input: SetShippingAddressesOnCartInput!) {
    setShippingAddressesOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${T}
`,H=async({address:r,customerAddressId:e,pickupLocationCode:n})=>{const i=m.cartId;if(!i)throw new u;const t={cart_id:i,shipping_addresses:[]};if(e)t.shipping_addresses.push({customer_address_id:e});else if(n)t.shipping_addresses.push({pickup_location_code:n});else{if(!r)throw new S;t.shipping_addresses.push({address:A(r)})}const s=await p({type:"mutation",query:E,options:{variables:{input:t}},path:"setShippingAddressesOnCart.cart",signalType:"cart",transformer:g});if(!M.value)return l.emit("checkout/updated",s||null),s;const a=await p({type:"mutation",query:I,options:{variables:{input:{cart_id:i,billing_address:{same_as_shipping:!0}}}},path:"setBillingAddressOnCart.cart",signalType:"cart",transformer:g});return l.emit("checkout/updated",a||null),a};export{V as DEFAULT_COUNTRY,W as FetchError,X as InvalidArgument,Z as MissingBillingAddress,u as MissingCart,C as MissingCountry,tt as MissingEmail,st as MissingPaymentMethod,S as MissingShippinghAddress,et as STORE_CONFIG_DEFAULTS,it as UnexpectedError,Q as authenticateCustomer,R as config,D as estimateShippingMethods,at as fetchGraphQl,q as getCart,rt as getConfig,K as getCustomer,nt as getStoreConfig,P as initialize,j as initializeCheckout,gt as isEmailAvailable,mt as placeOrder,ot as removeFetchGraphQlHeader,L as resetCheckout,ft as setBillingAddress,pt as setEndpoint,dt as setFetchGraphQlHeader,ct as setFetchGraphQlHeaders,At as setGuestEmailOnCart,St as setPaymentMethod,H as setShippingAddress,Mt as setShippingMethodsOnCart,Y as synchronizeCheckout};
