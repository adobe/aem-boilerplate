/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as h,f as C,h as f}from"./resetCart.js";import{C as l,t as U}from"./refreshCart.js";import{events as d}from"@dropins/tools/event-bus.js";import{g as R}from"./persisted-data.js";import{CART_FRAGMENT as E}from"../fragments.js";import{a as A}from"./acdl.js";const D=`
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
    
  ${E}
`,O=`
  mutation UPDATE_PRODUCTS_FROM_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemUpdateInput!]!,
      ${l}
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

  ${E}
`,g=(a,c)=>{const n=[];return a.filter(r=>r.errors&&c.some(o=>o===r.uid)).forEach(r=>{var o;(o=r.errors)==null||o.forEach(e=>{n.push({message:e.message,path:[r.uid],extensions:{category:e.code}})})}),n},w=async a=>{const c=h.cartId,n=R(),r=0;let o=[];if(!c)throw Error("Cart ID is not set");const e=a.filter(t=>t.optionsUIDs&&t.optionsUIDs.length>0);if(!n.items)throw console.error("Cart items are null or undefined"),Error("Error filtering existing cart items.");if(o=n.items.filter(t=>e.some(s=>s.uid===t.uid)),e.length>0&&o.length===0)throw Error("Invalid Cart Item UID: No matching cart entry found");if(e.length>0&&o.length>0)return C(D,{variables:{cartId:c,cartItems:e.map(({sku:t,parentSku:s,quantity:u,optionsUIDs:m,enteredOptions:i})=>({sku:t,parent_sku:s,quantity:u,selected_options:m,entered_options:i}))}}).then(({errors:t,data:s})=>{var i,p,T;const u=g(((p=(i=s==null?void 0:s.addProductsToCart)==null?void 0:i.cart)==null?void 0:p.itemsV2.items)||[],e.map(I=>I.uid)),m=[...((T=s==null?void 0:s.addProductsToCart)==null?void 0:T.user_errors)??[],...t??[],...u];return m.length>0?f(m):_(c,e.map(({uid:I})=>({uid:I,quantity:r}))).catch(I=>{throw Error(`Failed to update products in cart: ${I}`)})}).then(t=>{d.emit("cart/updated",t),d.emit("cart/data",t),t&&A(t,a,h.locale??"en-US")}).catch(t=>{throw Error(`Failed to add products to cart: ${t}`)});if(e.length===0)return _(c,a).catch(t=>{throw Error(t)})},_=async(a,c)=>C(O,{variables:{cartId:a,cartItems:c.map(({uid:n,quantity:r,giftOptions:o})=>({cart_item_uid:n,quantity:r,...o}))}}).then(({errors:n,data:r})=>{var s,u,m;const o=g(((u=(s=r==null?void 0:r.updateCartItems)==null?void 0:s.cart)==null?void 0:u.itemsV2.items)||[],c.map(i=>i.uid)),e=[...((m=r==null?void 0:r.updateCartItems)==null?void 0:m.user_errors)??[],...n??[],...o],t=(r==null?void 0:r.updateCartItems)&&U(r.updateCartItems.cart);if(t&&d.emit("cart/data",t),e.length>0)return f(e);if(d.emit("cart/updated",t),t){const i=t.items.filter(p=>c.some(T=>T.uid===p.uid));i.length>0&&d.emit("cart/product/updated",i)}return t&&A(t,c,h.locale??"en-US"),t});export{D as A,w as u};
