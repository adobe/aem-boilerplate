import{k as n,M as e,c as d,l}from"./fixtures.js";import{C as o,t as c}from"./getCart.graphql.js";const p=`
  mutation setBillingAddress($cartId: String!, $input: BillingAddressInput!) {
    setBillingAddressOnCart(
      input: { cart_id: $cartId, billing_address: $input }
    ) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${o}
`,m=async({signal:a,input:s})=>{const t=n.cartId,{address:i,same_as_shipping:r}=s;if(!t)throw new e;if(!r&&!i)throw new d;return await l({type:"mutation",query:p,options:{signal:a,variables:{cartId:t,input:s}},path:"setBillingAddressOnCart.cart",signalType:"cart",transformer:c})};export{m as s};
