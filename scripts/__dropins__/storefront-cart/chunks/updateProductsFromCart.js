/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as m,f as i,h as T}from"./resetCart.js";import{C as _,t as p}from"./refreshCart.js";import{events as n}from"@dropins/tools/event-bus.js";import{a as I}from"./acdl.js";import{CART_FRAGMENT as u}from"../fragments.js";const C=`
  mutation UPDATE_PRODUCTS_FROM_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemUpdateInput!]!,
      ${_}
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
    
  ${u}
`,h=async e=>{const s=m.cartId;if(!s)throw Error("Cart ID is not set");return i(C,{variables:{cartId:s,cartItems:e.map(({uid:a,quantity:t})=>({cart_item_uid:a,quantity:t}))}}).then(({errors:a,data:t})=>{var c;const o=[...((c=t==null?void 0:t.addProductsToCart)==null?void 0:c.user_errors)??[],...a??[]];if(o.length>0)return T(o);const r=p(t.updateCartItems.cart);return n.emit("cart/updated",r),n.emit("cart/data",r),r&&I(r,e,m.locale??"en-US"),r})};export{h as u};
