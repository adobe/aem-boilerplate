/*! Copyright 2026 Adobe
All Rights Reserved. */
import{s as C,f as u,h as i}from"./resetCart.js";import{t as T}from"./refreshCart.js";import{events as s}from"@dropins/tools/event-bus.js";import{CART_FRAGMENT as A}from"../fragments.js";const _=`
mutation APPLY_COUPONS_TO_CART_MUTATION(
    $cartId: String!, 
    $couponCodes: [String!]!, 
    $type: ApplyCouponsStrategy!,
    $pageSize: Int! = 100,
    $currentPage: Int! = 1,
    $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
   applyCouponsToCart(
    input: {
      cart_id: $cartId
      coupon_codes: $couponCodes 
      type: $type
    }
  ) {
    cart {
      ...CART_FRAGMENT
    }

  }
}
${A}
`;var m=(r=>(r.APPEND="APPEND",r.REPLACE="REPLACE",r))(m||{});const f=async(r,p)=>{const e=C.cartId;if(!e)throw Error("Cart ID is not set");return u(_,{variables:{cartId:e,couponCodes:r,type:p}}).then(({errors:c,data:t})=>{var n;const a=[...((n=t==null?void 0:t.applyCouponsToCart)==null?void 0:n.user_errors)??[],...c??[]];if(a.length>0)return i(a);const o=T(t.applyCouponsToCart.cart);return s.emit("cart/updated",o),s.emit("cart/data",o),o})};export{m as A,f as a};
//# sourceMappingURL=applyCouponsToCart.js.map
