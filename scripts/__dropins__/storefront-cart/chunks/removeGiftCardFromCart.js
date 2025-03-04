/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as i,f as n,h as _}from"./resetCart.js";import{C as d,t as T}from"./refreshCart.js";import{events as C}from"@dropins/tools/event-bus.js";import{a as f}from"./acdl.js";import{CART_FRAGMENT as A}from"../fragments.js";const m=`
  mutation APPLY_GIFT_CARD_ON_CART_MUTATION($cartId: String!, $giftCardCode: String!, ${d}) {
 applyGiftCardToCart(
    input: {
     cart_id: $cartId
     gift_card_code: $giftCardCode
    }
  ) {
    cart {
      ...CART_FRAGMENT
    }
  }
}
${A}
`,N=async c=>{const a=i.cartId;if(!a)throw Error("Cart ID is not set");return n(m,{variables:{cartId:a,giftCardCode:c}}).then(({errors:s,data:t})=>{var e;const o=[...((e=t==null?void 0:t.applyGiftCardToCart)==null?void 0:e.user_errors)??[],...s??[]];if(o.length>0)return _(o);const r=T(t.applyGiftCardToCart.cart);return C.emit("cart/updated",r),C.emit("cart/data",r),r&&f(r,[],i.locale??"en-US"),r})},p=`
  mutation REMOVE_GIFT_CARD_ON_CART_MUTATION($cartId: String!, $giftCardCode: String!, ${d}) {
 removeGiftCardFromCart(
    input: {
     cart_id: $cartId
     gift_card_code: $giftCardCode
    }
  ) {
    cart {
      ...CART_FRAGMENT
    }
  }
}
${A}
`,E=async c=>{const a=i.cartId;if(!a)throw Error("Cart ID is not set");return n(p,{variables:{cartId:a,giftCardCode:c}}).then(({errors:s,data:t})=>{var e;const o=[...((e=t==null?void 0:t.addProductsToCart)==null?void 0:e.user_errors)??[],...s??[]];if(o.length>0)return _(o);const r=T(t.removeGiftCardFromCart.cart);return C.emit("cart/updated",r),C.emit("cart/data",r),r&&f(r,[],i.locale??"en-US"),r})};export{N as a,E as r};
