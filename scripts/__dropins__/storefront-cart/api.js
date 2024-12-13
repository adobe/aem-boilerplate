/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as o,f as d,h as l}from"./chunks/resetCart.js";import{g as $,r as Q,d as H,a as k,b as z,c as V}from"./chunks/resetCart.js";import{C as T,t as g,c as f}from"./chunks/refreshCart.js";import{g as j,b as q,d as B,e as J,i as K,a as W,r as X}from"./chunks/refreshCart.js";import{events as C}from"@dropins/tools/event-bus.js";import{CART_FRAGMENT as h}from"./fragments.js";import{b as A,a as I,c as _}from"./chunks/acdl.js";import{u as Z}from"./chunks/updateProductsFromCart.js";import{g as rt,b as at,a as et}from"./chunks/getEstimateShipping.js";import{g as ot}from"./chunks/getEstimatedTotals.js";import{g as E}from"./chunks/persisted-data.js";import{A as it,a as ct}from"./chunks/applyCouponsToCart.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/lib.js";const S=`
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemInput!]!,
      ${T}
    ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: $cartItems
    ) {
      cart {
        ...CART_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }
    
  ${h}
`,F=async a=>{let r=!1;const n=o.cartId||await R().then(s=>(r=!0,s));return d(S,{variables:{cartId:n,cartItems:a.map(({sku:s,parentSku:e,quantity:i,optionsUIDs:t,enteredOptions:c})=>({sku:s,parent_sku:e,quantity:i,selected_options:t,entered_options:c}))}}).then(({errors:s,data:e})=>{var c;const i=[...((c=e==null?void 0:e.addProductsToCart)==null?void 0:c.user_errors)??[],...s??[]];if(i.length>0)return l(i);const t=g(e.addProductsToCart.cart);if(C.emit("cart/updated",t),C.emit("cart/data",t),t){const p=t.items.filter(m=>a.some(({sku:u})=>u===m.topLevelSku));r?A(t,p,o.locale??"en-US"):I(t,p,o.locale??"en-US")}return t})},G=`
    mutation CREATE_GUEST_CART_MUTATION {
        createGuestCart {
          cart {
            id
          }
        }
    }
`,R=async()=>{const{disableGuestCart:a}=f.getConfig();if(a)throw new Error("Guest cart is disabled");return await d(G).then(({data:r})=>{const n=r.createGuestCart.cart.id;return o.cartId=n,n})},M=()=>{const a=o.locale??"en-US",r=E();r&&_(r,a)};export{it as ApplyCouponsStrategy,F as addProductsToCart,ct as applyCouponsToCart,f as config,R as createGuestCart,d as fetchGraphQl,j as getCartData,E as getCartDataFromCache,$ as getConfig,rt as getCountries,q as getCustomerCartPayload,at as getEstimateShipping,ot as getEstimatedTotals,B as getGuestCartPayload,et as getRegions,J as getStoreConfig,K as initialize,W as initializeCart,M as publishShoppingCartViewEvent,X as refreshCart,Q as removeFetchGraphQlHeader,H as resetCart,k as setEndpoint,z as setFetchGraphQlHeader,V as setFetchGraphQlHeaders,Z as updateProductsFromCart};
