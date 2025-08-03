/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as a,f as l,h as m}from"./resetCart.js";import{t as T}from"./refreshCart.js";import{events as s}from"@dropins/tools/event-bus.js";import{b as C}from"./acdl.js";import{CART_FRAGMENT as O}from"../fragments.js";const $=`
  mutation SET_GIFT_OPTIONS_ON_CART_MUTATION(
  $cartId: String!, 
  $giftMessage: GiftMessageInput, 
  $giftWrappingId: ID, 
  $giftReceiptIncluded: Boolean!, 
  $printedCardIncluded: Boolean!,   
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
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
${O}
`,R=async d=>{const r=a.cartId;if(!r)throw Error("Cart ID is not set");const{recipientName:o,senderName:p,message:c,giftReceiptIncluded:f,printedCardIncluded:g,giftWrappingId:I,isGiftWrappingSelected:u}=d;return l($,{variables:{cartId:r,giftMessage:{from:p,to:o,message:c},giftWrappingId:u?I:null,giftReceiptIncluded:f,printedCardIncluded:g}}).then(({errors:_,data:e})=>{var n;const i=[...((n=e==null?void 0:e.addProductsToCart)==null?void 0:n.user_errors)??[],..._??[]];if(i.length>0)return m(i);const t=T(e.setGiftOptionsOnCart.cart);return s.emit("cart/updated",t),s.emit("cart/data",t),t&&C(t,[],a.locale??"en-US"),t})};export{R as s};
//# sourceMappingURL=setGiftOptionsOnCart.js.map
