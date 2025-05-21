/*! Copyright 2025 Adobe
All Rights Reserved. */
import{t as y,a as O,b as x}from"./chunks/synchronizeCheckout.js";import{d as et,c as st,g as it,i as rt,e as nt,r as at,s as ot}from"./chunks/synchronizeCheckout.js";import{s as g,M as S,b as G,d as m,Q as C,c as N}from"./chunks/errors.js";import{D as pt,F as ct,I as ht,o as gt,m as mt,n as _t,S as lt,U as ut,j as At,k as ft,l as St,g as Ct,r as Mt,e as Et,f as It,i as Tt}from"./chunks/errors.js";import"@dropins/tools/lib.js";import{t as $,a as v}from"./chunks/setShippingMethods.js";import{s as Ot}from"./chunks/setShippingMethods.js";import{g as M}from"./chunks/values.js";import{events as U}from"@dropins/tools/event-bus.js";import{A as F}from"./chunks/checkout.js";import{g as Gt,i as Nt,s as $t}from"./chunks/setGuestEmailOnCart.js";import{s as Ut}from"./chunks/setBillingAddress.js";import{s as bt}from"./chunks/setPaymentMethod.js";import{CHECKOUT_DATA_FRAGMENT as E}from"./fragments.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const b=`
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
`,w=e=>e?e.filter(t=>!!t).map(t=>({id:t.agreement_id,name:t.name,mode:F[t.mode],text:t.checkbox_text,content:{value:t.content,html:t.is_html,height:t.content_height??null}})):[],J=async e=>{var _,l,u,A;const t=g.cartId,r=((_=e==null?void 0:e.criteria)==null?void 0:_.country_code)??((l=g.config)==null?void 0:l.defaultCountry);if(!t)throw new S;if(!r)throw new G;const{region_id:s,region_name:p,zip:n}=(e==null?void 0:e.criteria)??{},i=s||p?{region_id:typeof s=="string"?parseInt(s,10):s,region_code:p}:void 0,o={country_code:r,...n&&{postcode:n},...i&&{region:{...i.region_id&&{region_id:i.region_id},...i.region_code&&{region_code:i.region_code}}}},c={country_id:r,region:(u=o.region)==null?void 0:u.region_code,region_id:(A=o.region)==null?void 0:A.region_id,postcode:n},d=await m({options:{variables:{cartId:t,address:o}},path:"estimateShippingMethods",query:b,queueName:C.ShippingEstimate,transformer:y,type:"mutation"}),I=d.length>0,T=v(c);let h=null;if(I){const a=M("selectedShippingMethod");h=d.find(f=>f.code===(a==null?void 0:a.code)&&f.carrier.code===(a==null?void 0:a.carrier.code))??d[0]}return U.emit("shipping/estimate",{address:T,shippingMethod:h?$(h):null,availableShippingMethods:d}),d},k=`
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
`,W=async()=>await m({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:k,transformer:w,type:"query"}),D=`
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

  ${E}
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

  ${E}
`,X=async({address:e,customerAddressId:t,pickupLocationCode:r})=>{const s=g.cartId;if(!s)throw new S;const p=()=>{if(t)return{customer_address_id:t};if(r)return{pickup_location_code:r};if(!e)throw new N;return{address:O(e)}},n=M("isBillToShipping"),i=n?H:D,o=n?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart",c={cartId:s,shippingAddressInput:p()};return await m({type:"mutation",query:i,options:{variables:c},path:o,queueName:C.CartUpdate,transformer:x})};export{pt as DEFAULT_COUNTRY,ct as FetchError,ht as InvalidArgument,gt as MissingBillingAddress,S as MissingCart,G as MissingCountry,mt as MissingEmail,_t as MissingPaymentMethod,N as MissingShippinghAddress,lt as STORE_CONFIG_DEFAULTS,ut as UnexpectedError,et as authenticateCustomer,st as config,J as estimateShippingMethods,At as fetchGraphQl,it as getCart,W as getCheckoutAgreements,ft as getConfig,Gt as getCustomer,St as getStoreConfig,Ct as getStoreConfigCache,rt as initialize,nt as initializeCheckout,Nt as isEmailAvailable,Mt as removeFetchGraphQlHeader,at as resetCheckout,Ut as setBillingAddress,Et as setEndpoint,It as setFetchGraphQlHeader,Tt as setFetchGraphQlHeaders,$t as setGuestEmailOnCart,bt as setPaymentMethod,X as setShippingAddress,Ot as setShippingMethodsOnCart,ot as synchronizeCheckout};
