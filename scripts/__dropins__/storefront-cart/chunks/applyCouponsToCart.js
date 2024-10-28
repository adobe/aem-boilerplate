import{s as c,f as C,h as T}from"./resetCart.js";import{C as _,t as i}from"./getStoreConfig.js";import{events as n}from"@dropins/tools/event-bus.js";import{CART_FRAGMENT as A}from"../fragments.js";const u=`
mutation APPLY_COUPONS_TO_CART_MUTATION(
    $cartId: String!, 
    $couponCodes: [String!]!, 
    ${_}
  ) {
   applyCouponsToCart(
    input: {
      cart_id: $cartId
      coupon_codes: $couponCodes 
      type: REPLACE 
    }
  ) {
    cart {
      ...CART_FRAGMENT
    }

  }
}
${A}
`,N=async p=>{const o=c.cartId;if(!o)throw Error("Cart ID is not set");return C(u,{variables:{cartId:o,couponCodes:p}}).then(({errors:e,data:r})=>{var s;const a=[...((s=r==null?void 0:r.applyCouponsToCart)==null?void 0:s.user_errors)??[],...e??[]];if(a.length>0)return T(a);const t=i(r.applyCouponsToCart.cart);return n.emit("cart/updated",t),n.emit("cart/data",t),t})};export{N as a};
