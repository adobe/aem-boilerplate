/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as o,f as m,h as l}from"./chunks/resetCart.js";import{g as $,r as Q,d as H,a as k,b as z,c as V}from"./chunks/resetCart.js";import{C as T,t as f,c as g}from"./chunks/refreshCart.js";import{g as j,b as q,d as B,e as J,i as K,a as W,r as X}from"./chunks/refreshCart.js";import{events as C}from"@dropins/tools/event-bus.js";import{CART_FRAGMENT as h}from"./fragments.js";import{b as A,a as I,c as _}from"./chunks/acdl.js";import{u as Z}from"./chunks/updateProductsFromCart.js";import{g as rt,b as at,a as et}from"./chunks/getEstimateShipping.js";import{g as ot}from"./chunks/getEstimatedTotals.js";import{g as E}from"./chunks/persisted-data.js";import{A as nt,a as ct}from"./chunks/applyCouponsToCart.js";import{a as Ct,r as mt}from"./chunks/removeGiftCardFromCart.js";import{s as ut}from"./chunks/setGiftOptionsOnCart.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/lib.js";const G=`
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
`,y=async a=>{let r=!1;const i=o.cartId||await R().then(s=>(r=!0,s));return m(G,{variables:{cartId:i,cartItems:a.map(({sku:s,parentSku:e,quantity:n,optionsUIDs:t,enteredOptions:c})=>({sku:s,parent_sku:e,quantity:n,selected_options:t,entered_options:c}))}}).then(({errors:s,data:e})=>{var c;const n=[...((c=e==null?void 0:e.addProductsToCart)==null?void 0:c.user_errors)??[],...s??[]];if(n.length>0)return l(n);const t=f(e.addProductsToCart.cart);if(C.emit("cart/updated",t),C.emit("cart/data",t),t){const p=t.items.filter(d=>a.some(({sku:u})=>u===d.topLevelSku));r?A(t,p,o.locale??"en-US"):I(t,p,o.locale??"en-US")}return t})},S=`
    mutation CREATE_GUEST_CART_MUTATION {
        createGuestCart {
          cart {
            id
          }
        }
    }
`,R=async()=>{const{disableGuestCart:a}=g.getConfig();if(a)throw new Error("Guest cart is disabled");return await m(S).then(({data:r})=>{const i=r.createGuestCart.cart.id;return o.cartId=i,i})},F=()=>{const a=o.locale??"en-US",r=E();r&&_(r,a)};export{nt as ApplyCouponsStrategy,y as addProductsToCart,ct as applyCouponsToCart,Ct as applyGiftCardToCart,g as config,R as createGuestCart,m as fetchGraphQl,j as getCartData,E as getCartDataFromCache,$ as getConfig,rt as getCountries,q as getCustomerCartPayload,at as getEstimateShipping,ot as getEstimatedTotals,B as getGuestCartPayload,et as getRegions,J as getStoreConfig,K as initialize,W as initializeCart,F as publishShoppingCartViewEvent,X as refreshCart,Q as removeFetchGraphQlHeader,mt as removeGiftCardFromCart,H as resetCart,k as setEndpoint,z as setFetchGraphQlHeader,V as setFetchGraphQlHeaders,ut as setGiftOptionsOnCart,Z as updateProductsFromCart};
