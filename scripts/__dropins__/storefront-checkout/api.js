/*! Copyright 2025 Adobe
All Rights Reserved. */
import{t as E,a as f,b as C}from"./chunks/synchronizeCheckout.js";import{d as X,c as Z,g as tt,i as et,e as st,r as it,s as rt}from"./chunks/synchronizeCheckout.js";import{s as p,S as T}from"./chunks/subscription-email-statuses.js";import{g as nt}from"./chunks/subscription-email-statuses.js";import"@dropins/tools/lib.js";import{a as I}from"./chunks/setShippingMethods.js";import{s as dt}from"./chunks/setShippingMethods.js";import{M as _,b as M,d,Q as A,s as y,i as N,c as b,e as O}from"./chunks/IsBillToShippingSignal.js";import{D as pt,F as gt,I as mt,o as ht,n as ut,S as lt,U as _t,k as At,l as St,m as Et,r as ft,f as Ct,g as Tt,j as It}from"./chunks/IsBillToShippingSignal.js";import"@dropins/tools/event-bus.js";import{A as w}from"./chunks/checkout.js";import{g as yt,i as Nt,s as bt}from"./chunks/setGuestEmailOnCart.js";import{s as wt}from"./chunks/setBillingAddress.js";import{s as Gt}from"./chunks/setPaymentMethod.js";import{CHECKOUT_DATA_FRAGMENT as S}from"./fragments.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const x=`
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
`,G=t=>t?t.filter(e=>!!e).map(e=>({id:e.agreement_id,name:e.name,mode:w[e.mode],text:e.checkbox_text,content:{value:e.content,html:e.is_html,height:e.content_height??null}})):[],L=async t=>{var m,h,u,l;const e=p.cartId,r=((m=t==null?void 0:t.criteria)==null?void 0:m.country_code)??((h=p.config)==null?void 0:h.defaultCountry);if(!e)throw new _;if(!r)throw new M;const{region_id:s,region_name:o,zip:a}=(t==null?void 0:t.criteria)??{},i=s||o?{region_id:typeof s=="string"?parseInt(s,10):s,region_code:o}:void 0,n={country_code:r,...a&&{postcode:a},...i&&{region:{...i.region_id&&{region_id:i.region_id},...i.region_code&&{region_code:i.region_code}}}},c={country_id:r,region:(u=n.region)==null?void 0:u.region_code,region_id:(l=n.region)==null?void 0:l.region_id,postcode:a},g=await d({options:{variables:{cartId:e,address:n}},path:"estimateShippingMethods",query:x,queueName:A.ShippingEstimate,transformer:E,type:"mutation"});return y.value={address:I(c),options:g},g},$=`
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
`,V=async()=>await d({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:$,transformer:G,type:"query"}),U=`
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

  ${S}
`,j=async({address:t,customerAddressId:e,pickupLocationCode:r})=>{const s=p.cartId;if(!s)throw new _;const o=()=>{if(e)return{customer_address_id:e};if(r)return{pickup_location_code:r};if(!t)throw new b;return{address:f(t)}},a=N.peek(),i=a?v:U,n=a?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart",c={cartId:s,shippingAddressInput:o()};return await d({type:"mutation",query:i,options:{variables:c},path:n,queueName:A.CartUpdate,transformer:C})},F=`
  mutation subscribeEmailToNewsletter($email: String!) {
    subscribeEmailToNewsletter(email: $email) {
      status
    }
  }
`,Y=async t=>{if(!t)throw new O;return await d({defaultValueOnFail:T.Error,options:{variables:{email:t}},path:"subscribeEmailToNewsletter.status",query:F,type:"mutation"})};export{pt as DEFAULT_COUNTRY,gt as FetchError,mt as InvalidArgument,ht as MissingBillingAddress,_ as MissingCart,M as MissingCountry,O as MissingEmail,ut as MissingPaymentMethod,b as MissingShippinghAddress,lt as STORE_CONFIG_DEFAULTS,_t as UnexpectedError,X as authenticateCustomer,Z as config,L as estimateShippingMethods,At as fetchGraphQl,tt as getCart,V as getCheckoutAgreements,St as getConfig,yt as getCustomer,Et as getStoreConfig,nt as getStoreConfigCache,et as initialize,st as initializeCheckout,Nt as isEmailAvailable,ft as removeFetchGraphQlHeader,it as resetCheckout,wt as setBillingAddress,Ct as setEndpoint,Tt as setFetchGraphQlHeader,It as setFetchGraphQlHeaders,bt as setGuestEmailOnCart,Gt as setPaymentMethod,j as setShippingAddress,dt as setShippingMethodsOnCart,Y as subscribeEmailToNewsletter,rt as synchronizeCheckout};
