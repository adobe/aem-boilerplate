import{a as r,g as s,u as e,k as l,M as n,l as o}from"./fixtures.js";import"@dropins/tools/event-bus.js";import{C as m,t as c}from"./getCart.graphql.js";const u=a=>!!(a!=null&&a.is_email_available),E=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,h=a=>{if(!(!a||a.length===0))throw Error(a.map(t=>t.message).join(" "))},A=async a=>{if(!a)throw new r;const{data:t,errors:i}=await s(E,{method:"GET",cache:"no-cache",variables:{email:a}}).catch(e);return i&&h(i),u(t.isEmailAvailable)},p=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${m}
`,C=async a=>{const t=l.cartId;if(!t)throw new n;return await o({type:"mutation",query:p,options:{variables:{cartId:t,email:a}},path:"setGuestEmailOnCart.cart",signalType:"cart",transformer:c})};export{A as i,C as s};
