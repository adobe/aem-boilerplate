import{s,f as d,h as T}from"./chunks/resetCart.js";import{g as $,r as v,d as Q,a as H,b as k,c as z}from"./chunks/resetCart.js";import{C as l,t as f,c as g,g as h,a as I}from"./chunks/getStoreConfig.js";import{b as j,e as q,i as B,d as J}from"./chunks/getStoreConfig.js";import{events as m}from"@dropins/tools/event-bus.js";import{CART_FRAGMENT as _}from"./fragments.js";import{c as A,p as E}from"./chunks/acdl.js";import{u as L}from"./chunks/updateProductsFromCart.js";import{g as W,b as X,a as Z}from"./chunks/getEstimateShipping.js";import{g as rt}from"./chunks/getEstimatedTotals.js";import{g as et}from"./chunks/persisted-data.js";import{a as ot}from"./chunks/applyCouponsToCart.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/lib.js";const R=`
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
    
  ${_}
`,b=async r=>{let o=!1;const n=s.cartId||await y().then(e=>(o=!0,e));return d(R,{variables:{cartId:n,cartItems:r.map(({sku:e,parentSku:a,quantity:c,optionsUIDs:t,enteredOptions:i})=>({sku:e,parent_sku:a,quantity:c,selected_options:t,entered_options:i}))}}).then(({errors:e,data:a})=>{var i;const c=[...((i=a==null?void 0:a.addProductsToCart)==null?void 0:i.user_errors)??[],...e??[]];if(c.length>0)return T(c);const t=f(a.addProductsToCart.cart);if(m.emit("cart/updated",t),m.emit("cart/data",t),t){const p=t.items.filter(C=>r.some(({sku:u})=>u===C.sku));o?A(t,p,s.locale??"en-US"):E(t,p,s.locale??"en-US")}return t})},P=`
    mutation CREATE_EMPTY_CART_MUTATION {
        createEmptyCart
    }
`,y=async()=>{const{disableGuestCart:r}=g.getConfig();if(r)throw new Error("Guest cart is disabled");return await d(P).then(({data:o})=>{const n=o.createEmptyCart;return s.cartId=n,n})},x=async()=>{const r=s.authenticated?await h():await I();return m.emit("cart/updated",r),m.emit("cart/data",r),r};export{b as addProductsToCart,ot as applyCouponsToCart,g as config,y as createEmptyCart,d as fetchGraphQl,j as getCartData,et as getCartDataFromCache,$ as getConfig,W as getCountries,h as getCustomerCartPayload,X as getEstimateShipping,rt as getEstimatedTotals,I as getGuestCartPayload,Z as getRegions,q as getStoreConfig,B as initialize,J as initializeCart,x as refreshCart,v as removeFetchGraphQlHeader,Q as resetCart,H as setEndpoint,k as setFetchGraphQlHeader,z as setFetchGraphQlHeaders,L as updateProductsFromCart};
