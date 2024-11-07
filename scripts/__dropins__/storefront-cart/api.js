/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s,f as d,h as T}from"./chunks/resetCart.js";import{g as $,r as v,d as Q,a as H,b as k,c as z}from"./chunks/resetCart.js";import{C as l,t as f,c as g,g as h,a as A}from"./chunks/getStoreConfig.js";import{b as j,e as q,i as B,d as J}from"./chunks/getStoreConfig.js";import{events as p}from"@dropins/tools/event-bus.js";import{CART_FRAGMENT as I}from"./fragments.js";import{c as _,p as E}from"./chunks/acdl.js";import{u as L}from"./chunks/updateProductsFromCart.js";import{g as W,b as X,a as Z}from"./chunks/getEstimateShipping.js";import{g as at}from"./chunks/getEstimatedTotals.js";import{g as et}from"./chunks/persisted-data.js";import{A as ot,a as nt}from"./chunks/applyCouponsToCart.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/lib.js";const R=`
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemInput!]!,
      ${l}
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
    
  ${I}
`,b=async a=>{let o=!1;const n=s.cartId||await P().then(e=>(o=!0,e));return d(R,{variables:{cartId:n,cartItems:a.map(({sku:e,parentSku:r,quantity:c,optionsUIDs:t,enteredOptions:i})=>({sku:e,parent_sku:r,quantity:c,selected_options:t,entered_options:i}))}}).then(({errors:e,data:r})=>{var i;const c=[...((i=r==null?void 0:r.addProductsToCart)==null?void 0:i.user_errors)??[],...e??[]];if(c.length>0)return T(c);const t=f(r.addProductsToCart.cart);if(p.emit("cart/updated",t),p.emit("cart/data",t),t){const m=t.items.filter(C=>a.some(({sku:u})=>u===C.sku));o?_(t,m,s.locale??"en-US"):E(t,m,s.locale??"en-US")}return t})},y=`
    mutation CREATE_EMPTY_CART_MUTATION {
        createEmptyCart
    }
`,P=async()=>{const{disableGuestCart:a}=g.getConfig();if(a)throw new Error("Guest cart is disabled");return await d(y).then(({data:o})=>{const n=o.createEmptyCart;return s.cartId=n,n})},x=async()=>{const a=s.authenticated?await h():await A();return p.emit("cart/updated",a),p.emit("cart/data",a),a};export{ot as ApplyCouponsStrategy,b as addProductsToCart,nt as applyCouponsToCart,g as config,P as createEmptyCart,d as fetchGraphQl,j as getCartData,et as getCartDataFromCache,$ as getConfig,W as getCountries,h as getCustomerCartPayload,X as getEstimateShipping,at as getEstimatedTotals,A as getGuestCartPayload,Z as getRegions,q as getStoreConfig,B as initialize,J as initializeCart,x as refreshCart,v as removeFetchGraphQlHeader,Q as resetCart,H as setEndpoint,k as setFetchGraphQlHeader,z as setFetchGraphQlHeaders,L as updateProductsFromCart};
