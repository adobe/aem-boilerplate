import{C as n,k as e,M as d,c as l,l as o,t as c}from"./getCart.graphql.js";const g=`
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
  ${n}
`,A=async({signal:a,input:s})=>{const t=e.cartId,{address:i,same_as_shipping:r}=s;if(!t)throw new d;if(!r&&!i)throw new l;return await o({type:"mutation",query:g,options:{signal:a,variables:{cartId:t,input:s}},path:"setBillingAddressOnCart.cart",signalType:"cart",transformer:c})};export{A as s};
