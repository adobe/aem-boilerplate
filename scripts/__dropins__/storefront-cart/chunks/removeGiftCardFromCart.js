/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as i,f as c,h as d}from"./resetCart.js";import{t as _}from"./refreshCart.js";import{events as n}from"@dropins/tools/event-bus.js";import{b as T}from"./acdl.js";import{CART_FRAGMENT as f}from"../fragments.js";const p=`
  mutation APPLY_GIFT_CARD_ON_CART_MUTATION(
      $cartId: String!, 
      $giftCardCode: String!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
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
${f}
`,E=async s=>{const e=i.cartId;if(!e)throw Error("Cart ID is not set");return c(p,{variables:{cartId:e,giftCardCode:s}}).then(({errors:C,data:t})=>{var o;const a=[...((o=t==null?void 0:t.applyGiftCardToCart)==null?void 0:o.user_errors)??[],...C??[]];if(a.length>0)return d(a);const r=_(t.applyGiftCardToCart.cart);return n.emit("cart/updated",r),n.emit("cart/data",r),r&&T(r,[],i.locale??"en-US"),r})},I=`
  mutation REMOVE_GIFT_CARD_ON_CART_MUTATION(
  $cartId: String!, 
  $giftCardCode: String!,   
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
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
${f}
`,g=async s=>{const e=i.cartId;if(!e)throw Error("Cart ID is not set");return c(I,{variables:{cartId:e,giftCardCode:s}}).then(({errors:C,data:t})=>{var o;const a=[...((o=t==null?void 0:t.addProductsToCart)==null?void 0:o.user_errors)??[],...C??[]];if(a.length>0)return d(a);const r=_(t.removeGiftCardFromCart.cart);return n.emit("cart/updated",r),n.emit("cart/data",r),r&&T(r,[],i.locale??"en-US"),r})};export{E as a,g as r};
//# sourceMappingURL=removeGiftCardFromCart.js.map
