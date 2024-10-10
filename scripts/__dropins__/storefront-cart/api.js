import{s,f as p,h as T}from"./chunks/resetCart.js";import{g as $,r as v,d as Q,a as H,b as k,c as z}from"./chunks/resetCart.js";import{C as l,t as f,c as g,g as h,a as I}from"./chunks/getStoreConfig.js";import{b as j,e as q,i as B,d as J}from"./chunks/getStoreConfig.js";import{events as d}from"@dropins/tools/event-bus.js";import{CART_FRAGMENT as _}from"./fragments.js";import{c as A,p as E}from"./chunks/acdl.js";import{u as L}from"./chunks/updateProductsFromCart.js";import{g as W,b as X,a as Z}from"./chunks/getEstimateShipping.js";import{g as rt}from"./chunks/getEstimatedTotals.js";import{g as et}from"./chunks/persisted-data.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/lib.js";const R=`
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
`,b=async r=>{let o=!1;const c=s.cartId||await G().then(e=>(o=!0,e));return p(R,{variables:{cartId:c,cartItems:r.map(({sku:e,parentSku:a,quantity:n,optionsUIDs:t,enteredOptions:i})=>({sku:e,parent_sku:a,quantity:n,selected_options:t,entered_options:i}))}}).then(({errors:e,data:a})=>{var i;const n=[...((i=a==null?void 0:a.addProductsToCart)==null?void 0:i.user_errors)??[],...e??[]];if(n.length>0)return T(n);const t=f(a.addProductsToCart.cart);if(d.emit("cart/updated",t),d.emit("cart/data",t),t){const m=t.items.filter(C=>r.some(({sku:u})=>u===C.sku));o?A(t,m,s.locale??"en-US"):E(t,m,s.locale??"en-US")}return t})},P=`
    mutation CREATE_EMPTY_CART_MUTATION {
        createEmptyCart
    }
`,G=async()=>{const{disableGuestCart:r}=g.getConfig();if(r)throw new Error("Guest cart is disabled");return await p(P).then(({data:o})=>{const c=o.createEmptyCart;return s.cartId=c,c})},F=async()=>{const r=s.authenticated?await h():await I();return d.emit("cart/updated",r),d.emit("cart/data",r),r};export{b as addProductsToCart,g as config,G as createEmptyCart,p as fetchGraphQl,j as getCartData,et as getCartDataFromCache,$ as getConfig,W as getCountries,h as getCustomerCartPayload,X as getEstimateShipping,rt as getEstimatedTotals,I as getGuestCartPayload,Z as getRegions,q as getStoreConfig,B as initialize,J as initializeCart,F as refreshCart,v as removeFetchGraphQlHeader,Q as resetCart,H as setEndpoint,k as setFetchGraphQlHeader,z as setFetchGraphQlHeaders,L as updateProductsFromCart};
