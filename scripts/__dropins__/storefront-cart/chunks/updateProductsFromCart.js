/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as m,f as i,h as p}from"./resetCart.js";import{C as _,t as I}from"./refreshCart.js";import{events as n}from"@dropins/tools/event-bus.js";import{a as T}from"./acdl.js";import{CART_FRAGMENT as u}from"../fragments.js";const C=`
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
`,h=async s=>{const o=m.cartId;if(!o)throw Error("Cart ID is not set");return i(C,{variables:{cartId:o,cartItems:s.map(({uid:e,quantity:t,giftOptions:a})=>({cart_item_uid:e,quantity:t,...a}))}}).then(({errors:e,data:t})=>{var c;const a=[...((c=t==null?void 0:t.updateCartItems)==null?void 0:c.user_errors)??[],...e??[]];if(a.length>0)return p(a);const r=I(t.updateCartItems.cart);return n.emit("cart/updated",r),n.emit("cart/data",r),r&&T(r,s,m.locale??"en-US"),r})};export{h as u};
