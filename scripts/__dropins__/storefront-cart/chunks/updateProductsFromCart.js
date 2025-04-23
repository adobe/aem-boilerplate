/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as I,f as p,h as _}from"./resetCart.js";import{C as h,t as f}from"./refreshCart.js";import{events as d}from"@dropins/tools/event-bus.js";import{g as A}from"./persisted-data.js";import{CART_FRAGMENT as C}from"../fragments.js";import{a as l}from"./acdl.js";const E=`
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemInput!]!,
      ${h}
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
    
  ${C}
`,U=`
  mutation UPDATE_PRODUCTS_FROM_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemUpdateInput!]!,
      ${h}
    ) {
    updateCartItems(
      input: {
        cart_id: $cartId
        cart_items: $cartItems
      }
    ) {
      cart {
        ...CART_FRAGMENT
      }

    }
  }

  ${C}
`,N=async m=>{const a=I.cartId,n=A(),o=0;let s=[];if(!a)throw Error("Cart ID is not set");const r=m.filter(t=>t.optionsUIDs&&t.optionsUIDs.length>0);if(!n.items)throw console.error("Cart items are null or undefined"),Error("Error filtering existing cart items.");if(s=n.items.filter(t=>r.some(e=>e.uid===t.uid)),r.length>0&&s.length===0)throw Error("Invalid Cart Item UID: No matching cart entry found");if(r.length>0&&s.length>0)return p(E,{variables:{cartId:a,cartItems:r.map(({sku:t,parentSku:e,quantity:i,optionsUIDs:c,enteredOptions:u})=>({sku:t,parent_sku:e,quantity:i,selected_options:c,entered_options:u}))}}).then(({errors:t,data:e})=>{var c;const i=[...((c=e==null?void 0:e.addProductsToCart)==null?void 0:c.user_errors)??[],...t??[]];return i.length>0?_(i):T(a,r.map(({uid:u})=>({uid:u,quantity:o}))).catch(u=>{throw Error(`Failed to update products in cart: ${u}`)})}).then(t=>{d.emit("cart/updated",t),d.emit("cart/data",t),t&&l(t,m,I.locale??"en-US")}).catch(t=>{throw Error(`Failed to add products to cart: ${t}`)});if(r.length===0)return T(a,m).catch(t=>{throw Error(`Error updating cart: ${t}`)})},T=async(m,a)=>p(U,{variables:{cartId:m,cartItems:a.map(({uid:n,quantity:o,giftOptions:s})=>({cart_item_uid:n,quantity:o,...s}))}}).then(({errors:n,data:o})=>{var t;const s=[...((t=o==null?void 0:o.updateCartItems)==null?void 0:t.user_errors)??[],...n??[]];if(s.length>0)return _(s);const r=f(o.updateCartItems.cart);if(d.emit("cart/updated",r),d.emit("cart/data",r),r){const e=r.items.filter(i=>a.some(c=>c.uid===i.uid));e.length>0&&d.emit("cart/product/updated",e)}return r&&l(r,a,I.locale??"en-US"),r});export{E as A,N as u};
