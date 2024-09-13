import{s,f as p,h as T}from"./chunks/resetCart.js";import{g as $,r as v,d as Q,a as H,b as k,c as z}from"./chunks/resetCart.js";import{C as g,a as l,t as f}from"./chunks/CartFragment.js";import{events as m}from"@dropins/tools/event-bus.js";import{c as h,p as I}from"./chunks/acdl.js";import{c as _,g as E,a as A}from"./chunks/getStoreConfig.js";import{b as j,e as q,i as B,d as J}from"./chunks/getStoreConfig.js";import{u as L}from"./chunks/updateProductsFromCart.js";import{g as W,b as X,a as Z}from"./chunks/getEstimateShipping.js";import{g as at}from"./chunks/getEstimatedTotals.js";import{g as et}from"./chunks/persisted-data.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/lib.js";const R=`
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemInput!]!,
      ${g}
    ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: $cartItems
    ) {
      cart {
        ...CartFragment
      }
      user_errors {
        code
        message
      }
    }
  }
  ${l}
`,b=async a=>{let o=!1;const n=s.cartId||await O().then(e=>(o=!0,e));return p(R,{variables:{cartId:n,cartItems:a.map(({sku:e,parentSku:r,quantity:c,optionsUIDs:t,enteredOptions:i})=>({sku:e,parent_sku:r,quantity:c,selected_options:t,entered_options:i}))}}).then(({errors:e,data:r})=>{var i;const c=[...((i=r==null?void 0:r.addProductsToCart)==null?void 0:i.user_errors)??[],...e??[]];if(c.length>0)return T(c);const t=f(r.addProductsToCart.cart);if(m.emit("cart/updated",t),m.emit("cart/data",t),t){const d=t.items.filter(C=>a.some(({sku:u})=>u===C.sku));o?h(t,d,s.locale??"en-US"):I(t,d,s.locale??"en-US")}return t})},P=`
    mutation CREATE_EMPTY_CART_MUTATION {
        createEmptyCart
    }
`,O=async()=>{const{disableGuestCart:a}=_.getConfig();if(a)throw new Error("Guest cart is disabled");return await p(P).then(({data:o})=>{const n=o.createEmptyCart;return s.cartId=n,n})},F=async()=>{const a=s.authenticated?await E():await A();return m.emit("cart/updated",a),m.emit("cart/data",a),a};export{b as addProductsToCart,_ as config,O as createEmptyCart,p as fetchGraphQl,j as getCartData,et as getCartDataFromCache,$ as getConfig,W as getCountries,E as getCustomerCartPayload,X as getEstimateShipping,at as getEstimatedTotals,A as getGuestCartPayload,Z as getRegions,q as getStoreConfig,B as initialize,J as initializeCart,F as refreshCart,v as removeFetchGraphQlHeader,Q as resetCart,H as setEndpoint,k as setFetchGraphQlHeader,z as setFetchGraphQlHeaders,L as updateProductsFromCart};
