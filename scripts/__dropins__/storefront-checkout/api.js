/*! Copyright 2025 Adobe
All Rights Reserved. */
import{d as l,t as I,a as T,b as M}from"./chunks/synchronizeCheckout.js";import{e as it,c as rt,g as nt,f as at,i as ot,h as dt,r as pt,s as ct}from"./chunks/synchronizeCheckout.js";import{M as A,a as y,b as O}from"./chunks/errors.js";import{F as gt,I as mt,e as ut,c as _t,d as lt,U as At}from"./chunks/errors.js";import{s as p}from"./chunks/state.js";import{g as ft}from"./chunks/state.js";import{s as x,g as G,i as _}from"./chunks/transform-store-config.js";import{D as Et,S as It,l as Tt,m as Mt,r as yt,h as Ot,j as xt,k as Gt}from"./chunks/transform-store-config.js";import"@dropins/tools/lib.js";import{a as N,t as v}from"./chunks/setShippingMethods.js";import{s as vt}from"./chunks/setShippingMethods.js";import{events as U}from"@dropins/tools/event-bus.js";import{A as $}from"./chunks/checkout.js";import{h as D}from"./chunks/setGuestEmailOnCart.js";import{i as $t,s as Dt}from"./chunks/setGuestEmailOnCart.js";import{s as Rt}from"./chunks/setBillingAddress.js";import{s as wt}from"./chunks/setPaymentMethod.js";import{CHECKOUT_DATA_FRAGMENT as S}from"./fragments.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/store-config.js";import"@dropins/tools/signals.js";const F=`
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
`,R=e=>e?e.filter(t=>!!t).map(t=>({id:t.agreement_id,name:t.name,mode:$[t.mode],text:t.checkbox_text,content:{value:t.content,html:t.is_html,height:t.content_height??null}})):[],X=async e=>{var g,m,u;const t=p.cartId,{criteria:n}=e||{},{country_code:a,region_id:s,region_name:i,zip:o}=n||{},d=a||((g=p.config)==null?void 0:g.defaultCountry);if(!t)throw new A;if(!d)throw new y;const c=typeof s=="string"?parseInt(s,10):s,h=s||i?{...c&&{region_id:c},...i&&{region_code:i}}:void 0,r={country_code:d,...o&&{postcode:o},...h&&{region:h}},f={country_id:r.country_code,region:(m=r.region)==null?void 0:m.region_code,region_id:(u=r.region)==null?void 0:u.region_id,postcode:r.postcode},C=await l({type:"mutation",query:F,options:{variables:{cartId:t,address:r}},path:"estimateShippingMethods",signalType:"estimateShippingMethods",transformer:I});return setTimeout(()=>{const E={address:N(f),shippingMethod:v(x.value)};U.emit("shipping/estimate",E)},0),C},k=`
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
`,Z=async()=>G(k,{method:"GET",cache:"no-cache"}).then(({errors:e,data:t})=>(e&&D(e),R(t.checkoutAgreements))),w=`
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
`,H=`
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
`,tt=async({address:e,customerAddressId:t,pickupLocationCode:n})=>{const a=p.cartId;if(!a)throw new A;const s=()=>{if(t)return{customer_address_id:t};if(n)return{pickup_location_code:n};if(!e)throw new O;return{address:T(e)}},i=_.value?H:w,o=_.value?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart",d={cartId:a,shippingAddressInput:s()};return await l({type:"mutation",query:i,options:{variables:d},path:o,queueName:"cartUpdate",signalType:"cart",transformer:M})};export{Et as DEFAULT_COUNTRY,gt as FetchError,mt as InvalidArgument,ut as MissingBillingAddress,A as MissingCart,y as MissingCountry,_t as MissingEmail,lt as MissingPaymentMethod,O as MissingShippinghAddress,It as STORE_CONFIG_DEFAULTS,At as UnexpectedError,it as authenticateCustomer,rt as config,X as estimateShippingMethods,G as fetchGraphQl,nt as getCart,Z as getCheckoutAgreements,Tt as getConfig,at as getCustomer,Mt as getStoreConfig,ft as getStoreConfigCache,ot as initialize,dt as initializeCheckout,$t as isEmailAvailable,yt as removeFetchGraphQlHeader,pt as resetCheckout,Rt as setBillingAddress,Ot as setEndpoint,xt as setFetchGraphQlHeader,Gt as setFetchGraphQlHeaders,Dt as setGuestEmailOnCart,wt as setPaymentMethod,tt as setShippingAddress,vt as setShippingMethodsOnCart,ct as synchronizeCheckout};
