/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as a,f as T,h as m}from"./resetCart.js";import{C as u,t as C}from"./refreshCart.js";import{events as s}from"@dropins/tools/event-bus.js";import{a as O}from"./acdl.js";import{CART_FRAGMENT as N}from"../fragments.js";const A=`
  mutation SET_GIFT_OPTIONS_ON_CART_MUTATION($cartId: String!, $giftMessage: GiftMessageInput, $giftWrappingId: ID, $giftReceiptIncluded: Boolean!, $printedCardIncluded: Boolean!, ${u}) {
 setGiftOptionsOnCart(
    input: {
     cart_id: $cartId
     gift_message: $giftMessage
     gift_wrapping_id: $giftWrappingId
     gift_receipt_included: $giftReceiptIncluded
     printed_card_included: $printedCardIncluded
    }
  ) {
    cart {
      ...CART_FRAGMENT
    }
  }
}
${N}
`,E=async d=>{const e=a.cartId;if(!e)throw Error("Cart ID is not set");const{recipientName:o,senderName:p,message:c,giftReceiptIncluded:f,printedCardIncluded:g,giftWrappingId:I,isGiftWrappingSelected:_}=d;return T(A,{variables:{cartId:e,giftMessage:{from:p,to:o,message:c},giftWrappingId:_?I:null,giftReceiptIncluded:f,printedCardIncluded:g}}).then(({errors:l,data:r})=>{var n;const i=[...((n=r==null?void 0:r.addProductsToCart)==null?void 0:n.user_errors)??[],...l??[]];if(i.length>0)return m(i);const t=C(r.setGiftOptionsOnCart.cart);return s.emit("cart/updated",t),s.emit("cart/data",t),t&&O(t,[],a.locale??"en-US"),t})};export{E as s};
//# sourceMappingURL=setGiftOptionsOnCart.js.map
