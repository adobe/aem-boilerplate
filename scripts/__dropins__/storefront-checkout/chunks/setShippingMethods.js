import{k as a,M as s,l as p}from"./fixtures.js";import{C as r,t as n}from"./getCart.graphql.js";import"@dropins/tools/event-bus.js";const o=`
  mutation setShippingMethods(
    $cartId: String!
    $shippingMethods: [ShippingMethodInput]!
  ) {
    setShippingMethodsOnCart(
      input: { cart_id: $cartId, shipping_methods: $shippingMethods }
    ) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${r}
`,c=async i=>{const t=a.cartId;if(!t)throw new s;return await p({type:"mutation",query:o,options:{variables:{cartId:t,shippingMethods:i}},path:"setShippingMethodsOnCart.cart",signalType:"cart",transformer:n})};export{c as s};
