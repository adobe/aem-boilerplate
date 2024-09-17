import{k as e,M as r,b as n,l as s}from"./fixtures.js";import{C as o,t as i}from"./getCart.graphql.js";const m=`
  mutation setPaymentMethod($cartId: String!, $paymentMethod: String!) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: { code: $paymentMethod } }
    ) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${o}
`,h=async t=>{const a=e.cartId;if(!a)throw new r;if(!t)throw new n;return await s({type:"mutation",query:m,options:{variables:{cartId:a,paymentMethod:t}},path:"setPaymentMethodOnCart.cart",signalType:"cart",transformer:i})};export{h as s};
