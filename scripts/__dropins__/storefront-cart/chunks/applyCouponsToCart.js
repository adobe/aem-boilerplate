/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as c,f as T,h as A}from"./resetCart.js";import{C as _,t as i}from"./getStoreConfig.js";import{events as n}from"@dropins/tools/event-bus.js";import{CART_FRAGMENT as u}from"../fragments.js";const P=`
mutation APPLY_COUPONS_TO_CART_MUTATION(
    $cartId: String!, 
    $couponCodes: [String!]!, 
    $type: ApplyCouponsStrategy!,
    ${_}
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
${u}
`;var m=(r=>(r.APPEND="APPEND",r.REPLACE="REPLACE",r))(m||{});const f=async(r,p)=>{const a=c.cartId;if(!a)throw Error("Cart ID is not set");return T(P,{variables:{cartId:a,couponCodes:r,type:p}}).then(({errors:C,data:t})=>{var e;const s=[...((e=t==null?void 0:t.applyCouponsToCart)==null?void 0:e.user_errors)??[],...C??[]];if(s.length>0)return A(s);const o=i(t.applyCouponsToCart.cart);return n.emit("cart/updated",o),n.emit("cart/data",o),o})};export{m as A,f as a};
